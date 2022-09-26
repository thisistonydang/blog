import { z } from "zod";
import { get_error_message } from "@tonydangblog/error-handling";

type Post = ({ request }: { request: Request }) => Promise<Response>;
export const post: Post = async ({ request }) => {
  const { name, email } = await request.json();

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
      const issue_name = issue.path[0];
      if (issue_name) body[issue_name] = issue.message;
    });
    return new Response(JSON.stringify(body));
  }

  const body = await create_contact(form.data.name, form.data.email);
  return new Response(JSON.stringify(body));
};

/** Create contact via SendFox API. */
const create_contact = async (
  name: string,
  email: string
): Promise<{ [key: string]: string }> => {
  try {
    const url = `https://api.sendfox.com/contacts?email=${email}&first_name=${name}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.SENDFOX_ACCESS_TOKEN}`,
        Accept: "application/json",
      },
    });
    if (res.status === 200) {
      const data = await res.json();
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
      const data = await res.json();
      if (data.email[0] === "The email must be a valid email address.") {
        return { email: "Invalid email" };
      }
    }
    throw new Error("Whoops, something went wrong...");
  } catch (error: unknown) {
    return { error: get_error_message(error) };
  }
};
