import { waitUntil } from "@neon/functions";
import { upgradeWebSocket } from "@neon/functions/hono";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { z } from "zod";

import { pool } from "./db/client.js";

const allowedOrigins = new Set([
  "https://tonydang.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

const jwks = createRemoteJWKSet(new URL(process.env.NEON_AUTH_JWKS_URL!));
const issuer = new URL(process.env.NEON_AUTH_BASE_URL!).origin;

const resultSchema = z.object({
  result: z.enum(["died", "finished"]),
});

type Identity = {
  id: string;
  name: string;
};

type AppEnv = {
  Variables: {
    identity: Identity;
  };
};

type StatsRow = {
  attempts: number;
  finishes: number;
  current_streak: number;
  longest_streak: number;
};

type LeaderboardRow = StatsRow & {
  user_id: string;
  display_name: string;
  finish_rate: number | string;
  rank: number | string;
};

class ApiError extends Error {
  constructor(
    readonly status: 400 | 401 | 403 | 404 | 409 | 429 | 502,
    message: string,
  ) {
    super(message);
  }
}

async function verifyToken(token: string | null): Promise<Identity | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, jwks, { issuer });
    if (typeof payload.sub !== "string") return null;
    return { id: payload.sub, name: "" };
  } catch {
    return null;
  }
}

async function getGitHubUsername(accountId: string): Promise<string> {
  const response = await fetch(`https://api.github.com/user/${accountId}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "possible-game",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!response.ok) {
    throw new ApiError(502, "Could not load your GitHub username");
  }

  const profile = (await response.json()) as { login?: unknown };
  if (typeof profile.login !== "string" || !/^[a-z\d](?:[a-z\d-]{0,38})$/i.test(profile.login)) {
    throw new ApiError(502, "GitHub returned an invalid username");
  }
  return profile.login;
}

async function ensurePlayer(identity: Identity): Promise<Identity> {
  const account = await pool.query<{ account_id: string }>(
    `
      select "accountId" as account_id
      from neon_auth.account
      where "userId" = $1::uuid and "providerId" = 'github'
      limit 1
    `,
    [identity.id],
  );
  if (!account.rows[0]) {
    throw new ApiError(403, "A GitHub account is required");
  }

  const existing = await pool.query<{
    display_name: string;
    updated_at: Date;
  }>(
    `
      select display_name, updated_at
      from possible_game_profiles
      where user_id = $1
    `,
    [identity.id],
  );

  let username = existing.rows[0]?.display_name;
  const shouldRefresh =
    !existing.rows[0] || Date.now() - existing.rows[0].updated_at.getTime() > 24 * 60 * 60 * 1000;
  if (shouldRefresh) {
    try {
      username = await getGitHubUsername(account.rows[0].account_id);
    } catch (error) {
      if (!username) throw error;
    }
  }

  if (shouldRefresh) {
    await pool.query(
      `
        insert into possible_game_profiles (user_id, display_name)
        values ($1, $2)
        on conflict (user_id) do update
        set display_name = excluded.display_name, updated_at = now()
      `,
      [identity.id, username],
    );
  }
  await pool.query(
    `
      insert into possible_game_stats (user_id)
      values ($1)
      on conflict (user_id) do nothing
    `,
    [identity.id],
  );

  return { ...identity, name: username! };
}

function serializeStats(row: StatsRow) {
  return {
    attempts: row.attempts,
    finishes: row.finishes,
    currentStreak: row.current_streak,
    longestStreak: row.longest_streak,
    finishRate: row.attempts ? row.finishes / row.attempts : 0,
  };
}

function serializeLeaderboardRow(row: LeaderboardRow) {
  return {
    userId: row.user_id,
    displayName: row.display_name,
    ...serializeStats(row),
    finishRate: Number(row.finish_rate),
    rank: Number(row.rank),
  };
}

async function getStats(userId: string) {
  const result = await pool.query<StatsRow>(
    `
      select attempts, finishes, current_streak, longest_streak
      from possible_game_stats
      where user_id = $1
    `,
    [userId],
  );
  return serializeStats(result.rows[0]);
}

const rankedPlayersSql = `
  with ranked as (
    select
      s.user_id,
      p.display_name,
      s.attempts,
      s.finishes,
      s.current_streak,
      s.longest_streak,
      case when s.attempts = 0 then 0
        else s.finishes::numeric / s.attempts
      end as finish_rate,
      rank() over (
        order by
          s.longest_streak desc,
          case when s.attempts = 0 then 0
            else s.finishes::numeric / s.attempts
          end desc,
          s.finishes desc,
          p.created_at asc
      ) as rank
    from possible_game_stats s
    join possible_game_profiles p on p.user_id = s.user_id
    where s.attempts > 0
  )
`;

async function getLeaderboard(userId: string) {
  const [leaders, current] = await Promise.all([
    pool.query<LeaderboardRow>(`${rankedPlayersSql} select * from ranked order by rank limit 25`),
    pool.query<LeaderboardRow>(`${rankedPlayersSql} select * from ranked where user_id = $1`, [
      userId,
    ]),
  ]);

  return {
    leaders: leaders.rows.map(serializeLeaderboardRow),
    current: current.rows[0] ? serializeLeaderboardRow(current.rows[0]) : null,
  };
}

async function getOnlinePlayers() {
  const result = await pool.query<{ user_id: string; display_name: string }>(
    `
      select user_id, max(display_name) as display_name
      from possible_game_presence
      where last_seen_at > now() - interval '45 seconds'
      group by user_id
      order by lower(max(display_name)), user_id
    `,
  );

  return result.rows.map((row) => ({
    userId: row.user_id,
    displayName: row.display_name,
  }));
}

const app = new Hono<AppEnv>();

app.get("/health", (c) => c.json({ ok: true }));

app.use(
  "/api/*",
  cors({
    origin: (origin) => (allowedOrigins.has(origin) ? origin : ""),
    allowHeaders: ["Authorization", "Content-Type"],
    allowMethods: ["GET", "POST", "OPTIONS"],
  }),
);

app.use("/api/*", async (c, next) => {
  const authorization = c.req.header("authorization");
  const token = authorization?.toLowerCase().startsWith("bearer ") ? authorization.slice(7) : null;
  const verifiedIdentity = await verifyToken(token);
  if (!verifiedIdentity) return c.json({ error: "Unauthorized" }, 401);

  try {
    c.set("identity", await ensurePlayer(verifiedIdentity));
  } catch (error) {
    if (error instanceof ApiError) {
      return c.json({ error: error.message }, error.status);
    }
    throw error;
  }
  await next();
});

app.get("/api/bootstrap", async (c) => {
  const identity = c.get("identity");
  const [stats, leaderboard, players] = await Promise.all([
    getStats(identity.id),
    getLeaderboard(identity.id),
    getOnlinePlayers(),
  ]);

  return c.json({
    user: identity,
    stats,
    leaderboard,
    online: players.length,
    players,
  });
});

app.get("/api/leaderboard", async (c) => {
  return c.json(await getLeaderboard(c.get("identity").id));
});

app.get("/api/online", async (c) => {
  const players = await getOnlinePlayers();
  return c.json({ online: players.length, players });
});

app.post("/api/attempts", async (c) => {
  const identity = c.get("identity");
  const client = await pool.connect();

  try {
    await client.query("begin");
    await client.query("select pg_advisory_xact_lock(hashtextextended($1, 0))", [identity.id]);

    const openAttempt = await client.query<{ id: string; started_at: Date }>(
      `
        select id, started_at
        from possible_game_attempts
        where user_id = $1 and completed_at is null
        for update
      `,
      [identity.id],
    );
    const activeAttempt = openAttempt.rows[0];
    if (activeAttempt && Date.now() - activeAttempt.started_at.getTime() <= 4 * 60 * 60 * 1000) {
      await client.query("commit");
      return c.json({ id: activeAttempt.id, startedAt: activeAttempt.started_at });
    }
    if (activeAttempt) {
      await client.query("delete from possible_game_attempts where id = $1", [activeAttempt.id]);
    }

    const recentAttempt = await client.query<{ exists: boolean }>(
      `
        select exists (
          select 1 from possible_game_attempts
          where user_id = $1 and started_at > now() - interval '2 seconds'
        ) as exists
      `,
      [identity.id],
    );
    if (recentAttempt.rows[0]?.exists) {
      throw new ApiError(429, "Please wait before starting another attempt");
    }

    const result = await client.query<{ id: string; started_at: Date }>(
      `
        insert into possible_game_attempts (user_id)
        values ($1)
        returning id, started_at
      `,
      [identity.id],
    );
    await client.query("commit");

    return c.json(
      {
        id: result.rows[0].id,
        startedAt: result.rows[0].started_at,
      },
      201,
    );
  } catch (error) {
    await client.query("rollback");
    if (error instanceof ApiError) {
      return c.json({ error: error.message }, error.status);
    }
    throw error;
  } finally {
    client.release();
  }
});

app.post("/api/attempts/:id/result", async (c) => {
  const parsed = resultSchema.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: "Invalid result" }, 400);

  const identity = c.get("identity");
  const attemptId = c.req.param("id");
  const client = await pool.connect();

  try {
    await client.query("begin");
    const attemptResult = await client.query<{
      completed_at: Date | null;
      result: "died" | "finished" | null;
      started_at: Date;
    }>(
      `
        select started_at, completed_at, result
        from possible_game_attempts
        where id = $1 and user_id = $2
        for update
      `,
      [attemptId, identity.id],
    );

    const attempt = attemptResult.rows[0];
    if (!attempt) throw new ApiError(404, "Attempt not found");

    if (attempt.completed_at) {
      if (attempt.result !== parsed.data.result) {
        throw new ApiError(409, "Attempt already completed");
      }
      await client.query("commit");
      return c.json({
        stats: await getStats(identity.id),
        leaderboard: await getLeaderboard(identity.id),
      });
    }

    const elapsedMs = Date.now() - attempt.started_at.getTime();
    if (parsed.data.result === "finished" && elapsedMs < 30_000) {
      throw new ApiError(400, "Finish was too fast to be valid");
    }
    if (elapsedMs > 4 * 60 * 60 * 1000) {
      throw new ApiError(400, "Attempt expired");
    }

    await client.query(
      `
        update possible_game_attempts
        set completed_at = now(), result = $1
        where id = $2
      `,
      [parsed.data.result, attemptId],
    );

    if (parsed.data.result === "finished") {
      await client.query(
        `
          update possible_game_stats
          set
            attempts = attempts + 1,
            finishes = finishes + 1,
            current_streak = current_streak + 1,
            longest_streak = greatest(longest_streak, current_streak + 1),
            updated_at = now()
          where user_id = $1
        `,
        [identity.id],
      );
    } else {
      await client.query(
        `
          update possible_game_stats
          set
            attempts = attempts + 1,
            current_streak = 0,
            updated_at = now()
          where user_id = $1
        `,
        [identity.id],
      );
    }

    await client.query(
      `
        insert into possible_game_events (user_id, display_name, result)
        values ($1, $2, $3)
      `,
      [identity.id, identity.name, parsed.data.result],
    );
    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    if (error instanceof ApiError) {
      return c.json({ error: error.message }, error.status);
    }
    throw error;
  } finally {
    client.release();
  }

  return c.json({
    stats: await getStats(identity.id),
    leaderboard: await getLeaderboard(identity.id),
  });
});

const sockets = new Map<WebSocket, { connectionId: string; identity: Identity }>();
let lastEventId: number | null = null;
let lastPresenceSignature = "";
let polling = false;
let lastCleanupAt = 0;

function send(socket: WebSocket, message: unknown): void {
  if (socket.readyState === socket.OPEN) socket.send(JSON.stringify(message));
}

function broadcast(message: unknown): void {
  for (const socket of sockets.keys()) send(socket, message);
}

function resetRealtimeStateIfIdle(): void {
  if (sockets.size === 0) {
    lastEventId = null;
    lastPresenceSignature = "";
  }
}

async function initializeRealtimeEventCursor(): Promise<void> {
  if (lastEventId !== null) return;
  const latest = await pool.query<{ id: number | string }>(
    "select coalesce(max(id), 0) as id from possible_game_events",
  );
  if (lastEventId === null) lastEventId = Number(latest.rows[0]?.id ?? 0);
}

async function registerPresence(connectionId: string, identity: Identity): Promise<void> {
  await pool.query(
    `
      insert into possible_game_presence
        (connection_id, user_id, display_name, last_seen_at)
      values ($1, $2, $3, now())
      on conflict (connection_id) do update
      set last_seen_at = now(), display_name = excluded.display_name
    `,
    [connectionId, identity.id, identity.name],
  );
}

async function pollRealtime(): Promise<void> {
  if (polling || sockets.size === 0) return;
  polling = true;

  try {
    if (Date.now() - lastCleanupAt > 15_000) {
      lastCleanupAt = Date.now();
      await pool.query(
        `delete from possible_game_presence
         where last_seen_at <= now() - interval '45 seconds'`,
      );
    }

    if (lastEventId === null) {
      await initializeRealtimeEventCursor();
    } else {
      const events = await pool.query<{
        id: number | string;
        user_id: string;
        display_name: string;
        result: "died" | "finished";
      }>(
        `
          select id, user_id, display_name, result
          from possible_game_events
          where id > $1
          order by id
        `,
        [lastEventId],
      );

      for (const event of events.rows) {
        lastEventId = Number(event.id);
        broadcast({
          type: "result",
          eventId: Number(event.id),
          userId: event.user_id,
          displayName: event.display_name,
          result: event.result,
        });
      }
    }

    const players = await getOnlinePlayers();
    const presenceSignature = JSON.stringify(players);
    if (presenceSignature !== lastPresenceSignature) {
      lastPresenceSignature = presenceSignature;
      broadcast({ type: "presence", online: players.length, players });
    }
  } finally {
    polling = false;
  }
}

const poller = setInterval(() => {
  pollRealtime().catch((error) => console.error("[realtime poll]", error));
}, 1000);
poller.unref?.();

app.use("/ws", async (c, next) => {
  if (c.req.header("upgrade")?.toLowerCase() !== "websocket") {
    await next();
    return;
  }

  const origin = c.req.header("origin");
  if (origin && !allowedOrigins.has(origin)) return c.text("Forbidden", 403);
  await next();
});

app.get(
  "/ws",
  upgradeWebSocket(() => {
    const connectionId = crypto.randomUUID();
    let identity: Identity | null = null;
    let authenticating = false;
    let authenticationTimeout: ReturnType<typeof setTimeout> | null = null;

    function clearAuthenticationTimeout(): void {
      if (authenticationTimeout) clearTimeout(authenticationTimeout);
      authenticationTimeout = null;
    }

    return {
      onOpen(_event, ws) {
        if (!ws.raw) return;
        authenticationTimeout = setTimeout(() => ws.raw?.close(1008, "Authentication required"), 10_000);
      },
      onMessage(event, ws) {
        if (!ws.raw || typeof event.data !== "string") return;
        try {
          const message = JSON.parse(event.data) as { type?: string; token?: unknown };
          if (message.type === "auth" && !identity && !authenticating) {
            if (typeof message.token !== "string") {
              ws.raw.close(1008, "Invalid authentication");
              return;
            }

            authenticating = true;
            const rawSocket = ws.raw;
            waitUntil(
              (async () => {
                try {
                  const verifiedIdentity = await verifyToken(message.token as string);
                  if (!verifiedIdentity) {
                    rawSocket.close(1008, "Unauthorized");
                    return;
                  }
                  const player = await ensurePlayer(verifiedIdentity);
                  await initializeRealtimeEventCursor();
                  await registerPresence(connectionId, player);
                  if (rawSocket.readyState !== rawSocket.OPEN) {
                    await pool.query(
                      "delete from possible_game_presence where connection_id = $1",
                      [connectionId],
                    );
                    return;
                  }

                  identity = player;
                  clearAuthenticationTimeout();
                  sockets.set(rawSocket, { connectionId, identity: player });
                  const players = await getOnlinePlayers();
                  send(rawSocket, { type: "presence", online: players.length, players });
                } catch {
                  rawSocket.close(1011, "Authentication failed");
                } finally {
                  authenticating = false;
                }
              })(),
            );
            return;
          }

          if (message.type === "heartbeat" && identity) {
            waitUntil(registerPresence(connectionId, identity));
          }
        } catch {
          ws.raw.close(1003, "Invalid message");
        }
      },
      onClose(_event, ws) {
        clearAuthenticationTimeout();
        if (ws.raw) sockets.delete(ws.raw);
        resetRealtimeStateIfIdle();
        if (identity) {
          waitUntil(
            pool.query("delete from possible_game_presence where connection_id = $1", [connectionId]),
          );
        }
      },
      onError(_event, ws) {
        clearAuthenticationTimeout();
        if (ws.raw) sockets.delete(ws.raw);
        resetRealtimeStateIfIdle();
      },
    };
  }),
  (c) => c.text("Connect over WebSocket"),
);

app.onError((error, c) => {
  console.error(error);
  return c.json({ error: "Internal server error" }, 500);
});

export default app;
