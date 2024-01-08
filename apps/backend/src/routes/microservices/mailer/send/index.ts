import { verify_jwt } from "@lib/jwt/verify-jwt";
import { send_email } from "@lib/mailchannels/send_email";
import type { Env } from "@lib/types/env";

export default async function send(
  request: Request,
  env: Env,
): Promise<Response> {
  let payload;
  const jwt = new URL(request.url).searchParams.get("jwt");
  if (jwt) payload = await verify_jwt(env, jwt);

  if (payload) {
    const { app, email, name, subject, html } = payload;

    // Check payload claims are valid.
    if (
      typeof app !== "string" ||
      typeof email !== "string" ||
      typeof name !== "string" ||
      typeof subject !== "string" ||
      typeof html !== "string"
    ) {
      return new Response("Invalid payload.", { status: 400 });
    }

    // Send email via MailChannels.
    const mailChannelsRes = await send_email(env, email, name, subject, html);

    // Send me an email notification.
    await send_email(
      env,
      "tony@tonydang.blog",
      "Tony",
      `[${app}] '${subject}' email sent to ${name} <${email}>`,
      `Name: ${name}<br>Email: ${email}`,
    );

    return mailChannelsRes;
  }

  return new Response("Invalid JWT.", { status: 400 });
}
