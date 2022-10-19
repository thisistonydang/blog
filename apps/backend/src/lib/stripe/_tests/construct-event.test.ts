import { describe, expect, it } from "vitest";

import { buf2hex } from "../../crypto/buf2hex";
import { env } from "../../testing/env";
import { construct_event } from "../construct-event";

describe("construct_event", () => {
  [
    {
      // Valid payload and valid signature
      payload: JSON.stringify({ id: 12345 }),
      signature_invalidator: "",
      expected: { id: 12345 },
    },
    {
      // Valid payload but INVALID signature
      payload: JSON.stringify({ id: 12345 }),
      signature_invalidator: "blah",
      expected: null,
    },
    {
      // INVALID payload
      payload: "",
      signature_invalidator: "",
      expected: null,
    },
  ].forEach(({ payload, signature_invalidator, expected }) => {
    it("returns an event if valid signature, else returns null", async () => {
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
    });
  });
});
