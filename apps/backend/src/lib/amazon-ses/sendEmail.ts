import { SESv2Client, SESv2ServiceException, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { get_error_message } from "@tonydangblog/error-handling";

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
  const successResponse = new Response("Success: Email sent.", { status: 200 });

  // Don't send email in development or test environment.
  if (env.MODE !== "production") return successResponse;

  // TODO: Allow dynamic sender and replyTo.
  const sender = "Tony Dang <tony@tonydang.blog>";
  const recipient = name ? `${name} <${email}>` : email;
  const replyTo = "Tony Dang <tony@tonydang.blog>";

  try {
    const client = new SESv2Client({
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
      region: "us-west-1",
    });

    const command = new SendEmailCommand({
      FromEmailAddress: sender,
      Destination: { ToAddresses: [recipient] },
      ReplyToAddresses: [replyTo],
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Html: { Data: html, Charset: "UTF-8" },
          },
        },
      },
    });

    const res = await client.send(command);
    console.log("res:", res);

    if (res.$metadata.httpStatusCode === 200 && res.MessageId) {
      return successResponse;
    }

    return new Response("Non-200 response and/or no MessageId from Amazon SES", { status: 500 });
  } catch (error) {
    console.log(error);

    const status = error instanceof SESv2ServiceException ? error.$metadata.httpStatusCode : 500;

    return new Response(get_error_message(error), { status });
  }
}
