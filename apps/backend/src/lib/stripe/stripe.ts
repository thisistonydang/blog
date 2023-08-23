import Stripe from "stripe";
import type { Env } from "@lib/types/env";

export function stripe(env: Env): Stripe {
  return new Stripe(env.STRIPE_API_KEY, {
    apiVersion: "2022-11-15",
    httpClient: Stripe.createFetchHttpClient(),
  });
}
