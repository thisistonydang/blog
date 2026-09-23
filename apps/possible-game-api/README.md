# Possible Game API

Authenticated statistics, leaderboard, and real-time presence for Possible Game:

```text
/possible-game/
```

## Services

- Managed Neon Auth with GitHub OAuth
- Neon Postgres for profiles, attempts, scores, events, and presence
- Neon Function `possiblegame` for the REST API and WebSocket server

GitHub authentication is required for every game. All game statistics are stored in Neon Postgres.

## Local development

From the repository root:

```bash
neon env pull
pnpm --filter @blog/possible-game-api db:migrate
neon dev
pnpm frontend:dev
```

The root `.env.local` also needs these public aliases:

```text
PUBLIC_NEON_AUTH_URL=<NEON_AUTH_BASE_URL>
PUBLIC_POSSIBLE_GAME_API_URL=<NEON_FUNCTION_POSSIBLEGAME_BASE_URL without trailing slash>
PUBLIC_POSSIBLE_GAME_WS_URL=<the Function URL using ws:// or wss://>
```

The frontend reads the root environment file through Astro's `vite.envDir` setting.

## Database changes

```bash
pnpm --filter @blog/possible-game-api db:generate
pnpm --filter @blog/possible-game-api db:migrate
```

Commit generated migrations under `apps/possible-game-api/drizzle`.

## Deploy

```bash
neon config plan
pnpm --filter @blog/possible-game-api db:migrate
neon deploy
```

After deployment:

1. Add the frontend production origin as a trusted Neon Auth domain.
2. Create a GitHub OAuth app whose callback is `{NEON_AUTH_BASE_URL}/callback/github`.
3. Add its credentials with `neon neon-auth oauth-provider add --provider-id github`.
