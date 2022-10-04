import { createClient } from "@supabase/supabase-js";
import { get_error_message } from "@tonydangblog/error-handling";
import type { Env } from "@lib/types/env";

export default async (_request: Request, env: Env): Promise<Response> => {
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
  let data = [];
  try {
    const res = await supabase
      .from("one_time_donation")
      .select("display_name, amount");
    if (res.error) throw new Error(res.error.message);
    data = res.data;
  } catch (error: unknown) {
    console.log(get_error_message(error));
  }
  return new Response(JSON.stringify({ donations: data }), {
    headers: {
      "Access-Control-Allow-Origin": env.BLOG_URL,
    },
  });
};
