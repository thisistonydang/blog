import { z } from "zod";
import { stripe } from "../../../lib/stripe/stripe";
import type { Env } from "@lib/types/env";

export default async function (request: Request, env: Env): Promise<Response> {
  const form_data = await request.formData();
  const BuyMeACoffeeForm = z.object({
    qty: z.preprocess(Number, z.number().int().min(1).max(1000)),
  });
  const form = BuyMeACoffeeForm.safeParse({ qty: form_data.get("qty") });

  const location = form.success
    ? await create_checkout_url(form.data.qty, env)
    : `${env.BLOG_URL}/support`;

  return new Response(null, { status: 303, headers: { location } });
}

async function create_checkout_url(qty: number, env: Env): Promise<string> {
  const session = await stripe(env).checkout.sessions.create({
    line_items: [{ price: env.STRIPE_ONE_TIME_DONATION_PRICE, quantity: qty }],
    mode: "payment",
    submit_type: "donate",
    success_url: `${env.BLOG_URL}/support/successful-one-time-donation`,
    cancel_url: `${env.BLOG_URL}/support`,
  });
  return session.url ?? `${env.BLOG_URL}/support`;
}
