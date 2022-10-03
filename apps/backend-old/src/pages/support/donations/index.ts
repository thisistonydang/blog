import { get_error_message } from "@tonydangblog/error-handling";
import { supabase_server_client } from "@lib/db/supabase-server-client";

export const get = async (): Promise<Response> => {
  let data = [];
  try {
    const res = await supabase_server_client
      .from("one_time_donation")
      .select("display_name, amount");
    if (res.error) throw new Error(res.error.message);
    data = res.data;
  } catch (error: unknown) {
    console.log(get_error_message(error));
  }
  return new Response(JSON.stringify({ donations: data }));
};
