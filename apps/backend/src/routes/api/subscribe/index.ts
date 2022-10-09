import { z } from "zod";
import { get_error_message } from "@tonydangblog/error-handling";
import type { Env } from "@lib/types/env";

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

  const body = await create_contact(
    form.data.name,
    form.data.email,
    env.SENDFOX_ACCESS_TOKEN
  );
  return new Response(JSON.stringify(body), {
    headers: { "Access-Control-Allow-Origin": env.BLOG_URL },
  });
}

/** Create contact via SendFox API. */
async function create_contact(
  name: string,
  email: string,
  token: string
): Promise<{ [key: string]: string }> {
  try {
    const url = `https://api.sendfox.com/contacts?email=${email}&first_name=${name}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    if (res.status === 200) {
      const data: { unsubscribed_at?: string; confirmed_at?: string } =
        await res.json();
      if (data.unsubscribed_at) {
        return {
          unsubscribed: `It looks like this email has been unsubscribed from my
          mailing list. If you would like to resubscribe, please send me an
          email at tony@tonydang.blog and I will re-add you.`,
        };
      }
      if (data.confirmed_at) {
        return { confirmed: `Thank you for signing up for my mailing list!` };
      }
      return {
        success: `Thank you for signing up for my mailing list! Please check for
        a confirmation sent to your inbox to verify your email.`,
      };
    }
    if (res.status === 400) {
      const data: { email?: string[] } = await res.json();
      if (data.email?.[0] === "The email must be a valid email address.") {
        return { email: "Invalid email" };
      }
    }
    throw new Error("Whoops, something went wrong...");
  } catch (error: unknown) {
    return { error: get_error_message(error) };
  }
}
