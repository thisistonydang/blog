import { loadEnv } from "vite";

import type { Env } from "@lib/types/env";

export const production_env = loadEnv(
  "production",
  `${process.cwd()}/apps/backend/.production_env`, // Path to backend production .env file from root repo
  "" // Allow environmental variables without 'VITE_' prefix to be loaded
) as unknown as Env;
