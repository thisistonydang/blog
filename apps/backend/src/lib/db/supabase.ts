import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Env } from "@lib/types/env";

export const supabase = (env: Env): SupabaseClient =>
  createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
