import { getJwtPayloadFromRequestParams } from "@lib/jwt/getJwtPayloadFromRequestParams";
import { send_email } from "@lib/mailchannels/send_email";
import type { Env } from "@lib/types/env";

export default async function send(
  request: Request,
  env: Env,
): Promise<Response> {
  const payload = await getJwtPayloadFromRequestParams(request, env);
  if (!payload) return new Response("Invalid JWT.", { status: 400 });

  // Extract claims from payload.
  const { email, name, subject, html } = payload;

  // Check payload claims are valid.
  if (
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
    `"${subject}" email sent to ${name} <${email}>`,
    `Email sent:<br><br>${html}`,
  );

  return mailChannelsRes;
}
