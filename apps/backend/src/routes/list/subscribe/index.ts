import { z } from "zod";

import { send_email } from "@lib/aws/send-email";
import { supabase } from "@lib/db/supabase";
import { sign_jwt } from "@lib/jwt/sign-jwt";
import type { Env } from "@lib/types/env";

import type { Contact } from "../_types/contact";

export default async function (request: Request, env: Env): Promise<Response> {
  const { name, email }: { name?: string; email?: string } =
    await request.json();

  const SubscriptionForm = z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name is required" })
      .max(50, { message: "Name exceeds 50 max length" })
      .transform((val) => val.replace(/\s+/g, " ")),
    email: z.string().trim().email({ message: "Invalid email" }),
  });

  const form = SubscriptionForm.safeParse({ name, email });

  if (!form.success) {
    const body: { [key: string]: string } = {};
    form.error.issues.forEach((issue): void => {
      body[issue.path[0]] = issue.message;
    });
    return new Response(JSON.stringify(body), {
      headers: { "Access-Control-Allow-Origin": env.BLOG_URL },
    });
  }

  const body = await process_subscription_request(
    env,
    form.data.name,
    form.data.email
  );
  return new Response(JSON.stringify(body), {
    headers: { "Access-Control-Allow-Origin": env.BLOG_URL },
  });
}

export async function process_subscription_request(
  env: Env,
  name: string,
  email: string
): Promise<{ [key: string]: string }> {
  const preferred_name = name.split(" ")[0];
  const success = `Thank you for signing up for my mailing list! Please check
  for a confirmation sent to your inbox to verify your email.`;

  // Check if contact already exists in db.
  let res = await supabase(env).from("contact").select("*").match({ email });
  if (res.error) return { error: res.error.message };

  // If contact exists...
  if (res.data?.[0]) {
    const contact: Contact = res.data[0];
    if (contact.is_subscriber || contact.is_banned)
      return { confirmed: "Thank you for signing up for my mailing list!" };

    if (contact.is_verified) {
      return {
        unsubscribed: `It looks like this email has been unsubscribed from my
        mailing list. If you would like to resubscribe, please send me an email
        at tony@tonydang.blog and I will re-add you.`,
      };
    }

    // If contact exists, but is NOT verified, update contact info and send
    // verification email.
    res = await supabase(env)
      .from("contact")
      .update({ name, preferred_name })
      .match({ email });
    if (res.error) return { error: res.error.message };
    const ses_res = await send_verification_email(
      env,
      email,
      preferred_name,
      contact.contact_id
    );
    if (ses_res.MessageId) return { success };
    return { error: "Whoops, something went wrong. Please try again later." };
  }

  // If contact does not exist, insert new contact and send verification email.
  const contact_id = crypto.randomUUID();
  res = await supabase(env)
    .from("contact")
    .insert([{ contact_id, name, preferred_name, email }]);
  if (res.error) return { error: res.error.message };
  const ses_res = await send_verification_email(
    env,
    email,
    preferred_name,
    contact_id
  );
  if (ses_res.MessageId) return { success };
  return { error: "Whoops, something went wrong. Please try again later." };
}

async function send_verification_email(
  env: Env,
  email: string,
  preferred_name: string,
  contact_id: string
) {
  const jwt = await sign_jwt(env, { id: contact_id }, "24hr");
  return send_email(
    env,
    email,
    `Hi ${preferred_name} - Please verify your email`,
    `Hi ${preferred_name} -<br><br>

    Thank you for signing up for updates from my blog!<br><br>

    Please confirm your subscription by clicking
    <a href="${env.BACKEND_URL}/list/verify?jwt=${jwt}">here</a>.<br><br>

    This link will expire in <b>24 hours</b>. If you received this in error or
    do not wish to subscribe, simply ignore this email and do not click the
    link.<br><br>

    --<br>
    Tony Dang<br>
    What I'm up to now: <a href="${env.BLOG_URL}/now">tonydang.blog/now</a>
    <br><br>

    <a href="${env.BACKEND_URL}/list/unsubscribe?id=${contact_id}">
      Unsubscribe
    </a>`
  );
}
