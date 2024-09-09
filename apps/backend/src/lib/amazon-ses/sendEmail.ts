import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import type { Env } from "@lib/types/env";

/**
 * Send email via Amazon SES.
 *
 * @param env - Cloudflare worker environmental variables.
 * @param email - Email address of recipient.
 * @param name - Name of recipient.
 * @param subject - Subject line of email.
 * @param html - HTML body of email.
 */
export async function sendEmail(
  env: Env,
  email: string,
  name: string,
  subject: string,
  html: string,
): Promise<Response> {
  // Note: MailChannels returns 202 status code in production.
  if (env.MODE !== "production") return new Response(null, { status: 202 });

  // TODO: Allow dynamic sender.
  const sender = "Tony Dang <tony@tonydang.blog>";
  const recipient = name ? `${name} <${email}>` : email;

      ],
      subject,
      content: [{ type: "text/html", value: html }],
    }),
  });
}
