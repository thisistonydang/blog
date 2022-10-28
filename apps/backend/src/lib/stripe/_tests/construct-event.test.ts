// @vitest-environment miniflare

import { describe, expect, it } from "vitest";

import { buf2hex } from "@lib/crypto/buf2hex";
import { env } from "@lib/testing/env";

import { construct_event } from "../construct-event";

describe("construct_event", () => {
  it.each([
    // Valid payload and valid signature
    [JSON.stringify({ id: 12345 }), "", { id: 12345 }],

    // Valid payload but INVALID signature
    [JSON.stringify({ id: 12345 }), "blah", null],

    // INVALID payload
    ["", "", null],
  ])(
    "payload: %j + signature_invalidator: '%s' -> %j",
    async (payload, signature_invalidator, expected) => {
      // GIVEN Requst with stripe signature.
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
        new TextEncoder().encode(`timestamp.${payload}${signature_invalidator}`)
      );
      const v1 = buf2hex(signed_payload);
      const stripe_signature = `t=timestamp,v1=${v1}`;
      const request = new Request("https://tonydang.blog", {
        method: "POST",
        body: payload,
        headers: { "stripe-signature": stripe_signature },
      });

      // WHEN event is constructed from request.
      const event = await construct_event(request, env);

      // THEN event is returned if valid, else null is returned.
      expect(event).to.deep.equal(expected);
    }
  );
});
