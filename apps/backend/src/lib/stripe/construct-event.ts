import CryptoJS from "crypto-js";
import type { Stripe } from "stripe";

import { get_error_message } from "@tonydangblog/error-handling";
import type { Env } from "@lib/types/env";

/**
 * Returns a Stripe event given a Request and environmental variables.
 *
 * Returns null if Request signature is invalid or if the Request itself is
 * otherwise invalid.
 */
export async function construct_event(
  request: Request,
  env: Env
): Promise<Stripe.Event | null> {
  try {
    const payload = await request.text();
    const sig = request.headers.get("stripe-signature")?.split(",") as string[];
    const timestamp = sig[0].split("=")[1];
    const signature = sig[1].split("=")[1];
    const expected_signature = CryptoJS.enc.Hex.stringify(
      CryptoJS.HmacSHA256(`${timestamp}.${payload}`, env.STRIPE_ENDPOINT_SECRET)
    );
    if (signature === expected_signature) return JSON.parse(payload);
    throw new Error("invalid signature");
  } catch (error: unknown) {
    console.log(get_error_message(error));
    return null;
  }
}
