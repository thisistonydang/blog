import type { Stripe } from "stripe";

import { get_error_message } from "@tonydangblog/error-handling";

import { buf2hex } from "@lib/crypto/buf2hex";
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

    // Generate expected signature.
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(env.STRIPE_ENDPOINT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signed_payload = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(`${timestamp}.${payload}`)
    );
    const expected_signature = buf2hex(signed_payload);

    if (signature === expected_signature) return JSON.parse(payload);
    throw new Error("invalid signature");
  } catch (error: unknown) {
    console.log(get_error_message(error));
    return null;
  }
}
