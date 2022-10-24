import { supabase } from "@lib/db/supabase";
import { env } from "@lib/testing/env";

export async function setup() {
  await supabase(env).from("contact").delete().neq("email", "");
}
