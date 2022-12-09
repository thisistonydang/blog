import { supabase } from "@lib/db/supabase";
import { verify_jwt } from "@lib/jwt/verify-jwt";
import { send_email } from "@lib/mailchannels/send_email";
import type { Env } from "@lib/types/env";

import type { Contact } from "../_types/contact";

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
    const contact: Contact = res.data[0];

    if (contact && !contact.is_banned) {
      res = await supabase(env)
        .from("contact")
        .update({ is_verified: true, is_subscriber: true })
        .match({ contact_id: payload.id });
      if (res.error) return Response.redirect(`${env.BLOG_URL}/whoops`, 303);
      send_email(
        env,
        "tony@tonydang.blog",
        "Tony",
        "New Subscriber",
        `Name: ${contact.name}<br>Email: ${contact.email}`
      );
      return Response.redirect(`${env.BLOG_URL}/list/verify/success`, 303);
    }
  }
  return Response.redirect(`${env.BLOG_URL}/list/verify/expired`, 303);
}
