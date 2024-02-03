import { supabase } from "@lib/db/supabase";
import { getJwtPayloadFromRequest } from "@lib/jwt/getJwtPayloadFromRequest";
import { send_email } from "@lib/mailchannels/send_email";
import type { Env } from "@lib/types/env";

import type { Contact } from "../_types/contact";

export default async function verify(
  request: Request,
  env: Env,
): Promise<Response> {
  const payload = await getJwtPayloadFromRequest(request, env);

  if (payload) {
    // Fetch contact from database.
    let res = await supabase(env)
      .from("contact")
      .select("*")
      .match({ contact_id: payload.id });
    if (res.error) return Response.redirect(`${env.BLOG_URL}/whoops`, 303);
    const contact: Contact = res.data[0];

    // Verify contact and subscribe if not banned.
    if (contact && !contact.is_banned) {
      res = await supabase(env)
        .from("contact")
        .update({ is_verified: true, is_subscriber: true })
        .match({ contact_id: payload.id });
      if (res.error) return Response.redirect(`${env.BLOG_URL}/whoops`, 303);

      // Send me an email notification.
      await send_email(
        env,
        "tony@tonydang.blog",
        "Tony",
        "New Subscriber",
        `Name: ${contact.name}<br>Email: ${contact.email}`,
      );

      return Response.redirect(`${env.BLOG_URL}/list/verify/success`, 303);
    }
  }

  return Response.redirect(`${env.BLOG_URL}/list/verify/expired`, 303);
}
