import { supabase } from "@lib/db/supabase";
import { verify_jwt } from "@lib/jwt/verify-jwt";
import type { Env } from "@lib/types/env";

export default async function (request: Request, env: Env): Promise<Response> {
  let payload;
  const jwt = new URL(request.url).searchParams.get("jwt");
  if (jwt) payload = await verify_jwt(env, jwt);

  if (payload) {
    let res = await supabase(env)
      .from("contact")
      .select("*")
      .match({ contact_id: payload.id });
    if (res.error) return Response.redirect(`${env.BLOG_URL}/whoops`, 303);
    const contact = res.data[0];

    if (contact && !contact.is_banned) {
      res = await supabase(env)
        .from("contact")
        .update({ is_verified: true, is_subscriber: true })
        .match({ contact_id: payload.id });
      if (res.error) return Response.redirect(`${env.BLOG_URL}/whoops`, 303);
      return Response.redirect(`${env.BLOG_URL}/list/verify/success`, 303);
    }
  }
  return Response.redirect(`${env.BLOG_URL}/list/verify/expired`, 303);
}
