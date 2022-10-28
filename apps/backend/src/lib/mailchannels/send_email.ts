import type { Env } from "@lib/types/env";

/**
 * Send email via MailChannels.
 *
 * @param env - Cloudflare worker environmental variables.
 * @param email - Email address of recipient.
 * @param name - Name of recipient.
 * @param subject - Subject line of email.
 * @param html - HTML body of email.
 */
export async function send_email(
  env: Env,
  email: string,
  name: string,
  subject: string,
  html: string
): Promise<Response> {
  if (env.MODE !== "production") return new Response(null);
  return await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      from: { email: "tony@tonydang.blog", name: "Tony Dang" },
      personalizations: [
        {
          to: [{ email, name }],
          dkim_domain: "tonydang.blog",
          dkim_selector: "mc",
          dkim_private_key: env.MC_DKIM_PRIVATE_KEY,
        },
      ],
      subject,
      content: [{ type: "text/html", value: html }],
    }),
  });
}
