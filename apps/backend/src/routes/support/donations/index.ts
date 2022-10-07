import { get_error_message } from "@tonydangblog/error-handling";
import type { Env } from "@lib/types/env";
import { supabase } from "../../../lib/db/supabase";

export default async (_request: Request, env: Env): Promise<Response> => {
  let data = [];
  try {
    const res = await supabase(env)
      .from("one_time_donation")
      .select("display_name, amount")
      .order("created_at", { ascending: false });
    if (res.error) throw new Error(res.error.message);
    data = res.data;
  } catch (error: unknown) {
    console.log(get_error_message(error));
  }
  return new Response(JSON.stringify({ donations: data }), {
    headers: { "Access-Control-Allow-Origin": env.BLOG_URL },
  });
};
