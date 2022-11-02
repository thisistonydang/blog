import { supabase } from "@lib/db/supabase";

export default async function () {
  await supabase.from("contact").delete().neq("email", "");
}
