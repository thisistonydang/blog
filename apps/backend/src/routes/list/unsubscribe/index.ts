import { supabase } from "@lib/db/supabase";
import type { Env } from "@lib/types/env";

export default async function (request: Request, env: Env): Promise<Response> {
  const { error } = await supabase(env)
    .from("contact")
    .update({ is_verified: true, is_subscriber: false })
    .match({ contact_id: new URL(request.url).searchParams.get("id") });

  if (error) return Response.redirect(`${env.BLOG_URL}/whoops`, 303);

  return Response.redirect(`${env.BLOG_URL}/list/unsubscribe/success`, 303);
}
