import Stripe from "stripe";
import type { Env } from "@lib/types/env";

export const stripe = (env: Env): Stripe => {
  return new Stripe(env.STRIPE_API_KEY, {
    apiVersion: "2022-08-01",
    httpClient: Stripe.createFetchHttpClient(),
  });
};
