import { createAuthClient } from "@neondatabase/auth";
import { SupabaseAuthAdapter } from "@neondatabase/auth/vanilla";
import { get } from "svelte/store";

import { attempts, currentStreak, finishes, longestStreak } from "../_stores/appState";
import {
  activeAttemptId,
  addGameToast,
  attemptStarting,
  authStatus,
  competitiveError,
  competitiveStats,
  competitiveUser,
  emptyStats,
  gameToasts,
  leaderboard,
  onlineCount,
  onlinePlayers,
  resultSubmitting,
  type CompetitiveStats,
  type Leaderboard,
  type OnlinePlayer,
} from "../_stores/competitiveState";

const authUrl = import.meta.env.PUBLIC_NEON_AUTH_URL;
const apiUrl = import.meta.env.PUBLIC_POSSIBLE_GAME_API_URL;
const wsUrl = import.meta.env.PUBLIC_POSSIBLE_GAME_WS_URL;
const oauthReturnKey = "possible_game_oauth_return";

function createClient() {
  return createAuthClient(authUrl, {
    adapter: SupabaseAuthAdapter(),
  });
}

type AuthClient = ReturnType<typeof createClient>;

class ApiRequestError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

let authClient: AuthClient | null = null;
let socket: WebSocket | null = null;
let heartbeat: ReturnType<typeof setInterval> | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let reconnectAttempt = 0;
let realtimeClosed = true;
let realtimeGeneration = 0;
const receivedResultEventIds = new Set<number>();

function client() {
  if (!authUrl) throw new Error("Neon Auth is not configured.");
  authClient ??= createClient();
  return authClient;
}

function errorMessage(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "Something went wrong. Please try again.";
}

function syncStats(stats: CompetitiveStats): void {
  competitiveStats.set(stats);
  attempts.set(stats.attempts);
  finishes.set(stats.finishes);
  currentStreak.set(stats.currentStreak);
  longestStreak.set(stats.longestStreak);
}

async function getToken(): Promise<string> {
  const result = await client().getSession();
  if (result.error || !result.data.session?.access_token) {
    throw new Error(result.error?.message ?? "Your session expired.");
  }
  return result.data.session.access_token;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!apiUrl) throw new Error("The Possible Game API is not configured.");
  const token = await getToken();
  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const body = (await response.json().catch(() => ({}))) as T & {
    error?: string;
  };
  if (!response.ok) {
    throw new ApiRequestError(response.status, body.error ?? "The request failed.");
  }
  return body;
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function canRetry(error: unknown): boolean {
  return !(error instanceof ApiRequestError) || error.status === 429 || error.status >= 500;
}

async function refreshOnlinePlayers(): Promise<void> {
  const presence = await apiFetch<{
    online: number;
    players: OnlinePlayer[];
  }>("/api/online");
  onlineCount.set(presence.online);
  onlinePlayers.set(presence.players);
}

export async function loadCompetitiveData(): Promise<void> {
  const data = await apiFetch<{
    user: { id: string; name: string };
    stats: CompetitiveStats;
    leaderboard: Leaderboard;
    online: number;
    players?: OnlinePlayer[];
  }>("/api/bootstrap");
  competitiveUser.update((user) => ({ ...data.user, email: user?.email }));
  syncStats(data.stats);
  leaderboard.set(data.leaderboard);
  onlineCount.set(data.online);
  onlinePlayers.set(data.players ?? []);
}

export async function initializeCompetitiveAuth(): Promise<void> {
  sessionStorage.removeItem(oauthReturnKey);
  authStatus.set("checking");
  competitiveError.set("");

  try {
    const result = await client().getSession();
    const session = result.data.session;
    if (!session?.user) {
      competitiveUser.set(null);
      authStatus.set("signed_out");
      return;
    }

    competitiveUser.set({
      id: session.user.id,
      name: session.user.user_metadata.name ?? session.user.email,
      email: session.user.email,
    });
    await loadCompetitiveData();
    authStatus.set("signed_in");
    connectRealtime();
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 403) {
      try {
        competitiveError.set("");
        await signOut();
        return;
      } catch {
        // Show the original account error if the incompatible session cannot be cleared.
      }
    }
    competitiveError.set(errorMessage(error));
    authStatus.set("error");
  }
}

export async function signInWithGitHub(): Promise<void> {
  competitiveError.set("");
  const redirectTo = window.location.href;
  sessionStorage.setItem(oauthReturnKey, redirectTo);

  try {
    const result = await client().signInWithOAuth({
      provider: "github",
      options: { redirectTo },
    });
    if (result.error) throw new Error(result.error.message);
  } catch (error) {
    sessionStorage.removeItem(oauthReturnKey);
    throw error;
  }
}

export async function signOut(): Promise<void> {
  const result = await client().signOut();
  if (result.error) throw new Error(result.error.message);
  closeRealtime();
  competitiveUser.set(null);
  competitiveStats.set(emptyStats);
  leaderboard.set({ leaders: [], current: null });
  onlineCount.set(0);
  onlinePlayers.set([]);
  activeAttemptId.set(null);
  gameToasts.set([]);
  authStatus.set("signed_out");
}

export async function startCompetitiveAttempt(): Promise<boolean> {
  if (get(attemptStarting) || get(activeAttemptId)) return false;
  attemptStarting.set(true);
  competitiveError.set("");

  try {
    const result = await apiFetch<{ id: string }>("/api/attempts", {
      method: "POST",
    });
    activeAttemptId.set(result.id);
    return true;
  } catch (error) {
    competitiveError.set(errorMessage(error));
    addGameToast("Could not start the game.");
    return false;
  } finally {
    attemptStarting.set(false);
  }
}

export async function completeCompetitiveAttempt(result: "died" | "finished"): Promise<void> {
  const attemptId = get(activeAttemptId);
  if (!attemptId || get(resultSubmitting)) return;
  resultSubmitting.set(true);

  let retryCount = 0;
  let retryToastShown = false;

  try {
    while (get(activeAttemptId) === attemptId) {
      try {
        const data = await apiFetch<{
          stats: CompetitiveStats;
          leaderboard: Leaderboard;
        }>(`/api/attempts/${attemptId}/result`, {
          method: "POST",
          body: JSON.stringify({ result }),
        });
        syncStats(data.stats);
        leaderboard.set(data.leaderboard);
        activeAttemptId.set(null);
        return;
      } catch (error) {
        competitiveError.set(errorMessage(error));
        if (!canRetry(error)) {
          activeAttemptId.set(null);
          addGameToast("Your result could not be saved.");
          return;
        }

        if (!retryToastShown) {
          retryToastShown = true;
          addGameToast("Saving your result. Waiting for a connection...");
        }
        const delay = Math.min(1000 * 2 ** retryCount++, 15_000);
        await wait(delay);
      }
    }
  } finally {
    resultSubmitting.set(false);
  }
}

function handleRealtimeMessage(event: MessageEvent<string>): void {
  try {
    const message = JSON.parse(event.data) as
      | { type: "presence"; online: number; players?: OnlinePlayer[] }
      | {
          type: "result";
          eventId?: number;
          userId: string;
          displayName: string;
          result: "died" | "finished";
        }
      | { type: "ping" };

    if (message.type === "presence") {
      onlineCount.set(message.online);
      if (message.players) {
        onlinePlayers.set(message.players);
      } else {
        void refreshOnlinePlayers().catch(() => undefined);
      }
      return;
    }

    if (message.type === "result") {
      if (message.eventId !== undefined) {
        if (receivedResultEventIds.has(message.eventId)) return;
        receivedResultEventIds.add(message.eventId);
        if (receivedResultEventIds.size > 100) {
          const oldestEventId = receivedResultEventIds.values().next().value;
          if (oldestEventId !== undefined) receivedResultEventIds.delete(oldestEventId);
        }
      }

      if (message.userId !== get(competitiveUser)?.id) {
        addGameToast(
          `${message.displayName} ${message.result === "finished" ? "finished!" : "died."}`,
        );
      }
      void apiFetch<Leaderboard>("/api/leaderboard")
        .then((value) => leaderboard.set(value))
        .catch(() => undefined);
    }
  } catch {
    // Ignore malformed server messages.
  }
}

function scheduleRealtimeReconnect(generation: number): void {
  if (realtimeClosed || generation !== realtimeGeneration) return;
  const delay = Math.min(1000 * 2 ** reconnectAttempt++, 15_000);
  reconnectTimer = setTimeout(() => void openRealtime(generation), delay);
}

async function openRealtime(generation: number): Promise<void> {
  if (realtimeClosed || generation !== realtimeGeneration || !wsUrl) return;

  try {
    const token = await getToken();
    if (realtimeClosed || generation !== realtimeGeneration) return;

    const nextSocket = new WebSocket(`${wsUrl}/ws`);
    let socketHeartbeat: ReturnType<typeof setInterval> | null = null;
    socket = nextSocket;

    nextSocket.onopen = () => {
      if (realtimeClosed || generation !== realtimeGeneration) {
        nextSocket.close();
        return;
      }

      nextSocket.send(JSON.stringify({ type: "auth", token }));
      socketHeartbeat = setInterval(() => {
        if (nextSocket.readyState === WebSocket.OPEN) {
          nextSocket.send(JSON.stringify({ type: "heartbeat" }));
        }
      }, 20_000);
      heartbeat = socketHeartbeat;
    };
    nextSocket.onmessage = (event) => {
      if (generation === realtimeGeneration) {
        reconnectAttempt = 0;
        handleRealtimeMessage(event);
      }
    };
    nextSocket.onerror = () => nextSocket.close();
    nextSocket.onclose = () => {
      if (socketHeartbeat) clearInterval(socketHeartbeat);
      if (heartbeat === socketHeartbeat) heartbeat = null;
      if (socket === nextSocket) socket = null;
      scheduleRealtimeReconnect(generation);
    };
  } catch {
    scheduleRealtimeReconnect(generation);
  }
}

export function connectRealtime(): void {
  closeRealtime();
  realtimeClosed = false;
  const generation = ++realtimeGeneration;
  void openRealtime(generation);
}

export function closeRealtime(): void {
  realtimeClosed = true;
  realtimeGeneration += 1;
  if (reconnectTimer) clearTimeout(reconnectTimer);
  if (heartbeat) clearInterval(heartbeat);
  reconnectTimer = null;
  heartbeat = null;
  const activeSocket = socket;
  socket = null;
  activeSocket?.close();
}
