import { loadEnv } from "vite";
import type { Env } from "@lib/types/env";

export const env = loadEnv(
  "development",
  `${process.cwd()}/apps/backend`, // Path to backend .env file from root repo
  "" // Allow environmental variables without 'VITE_' prefix to be loaded
) as unknown as Env;
