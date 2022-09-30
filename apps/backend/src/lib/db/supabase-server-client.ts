import { createClient } from "@supabase/supabase-js";

export const supabase_server_client = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_KEY
);
