import { describe, expect, it } from "vitest";

import { buf2hex } from "../../../../lib/crypto/buf2hex";
import { supabase } from "../../../../lib/db/supabase";
import { env } from "../../../../lib/testing/env";
import api_route from "../index";

describe("/webhooks/stripe", () => {
  [
    {
      // Already handled event
      id: 123,
      type: "checkout.session.completed",
      name: "Tony",
      signature_invalidator: "",
      expected: new Response(null, { status: 204 }),
    },
    {
      // Invalid event id
      id: null,
      type: "checkout.session.completed",
      name: "Tony",
      signature_invalidator: "",
      expected: new Response("invalid event id", { status: 400 }),
    },
    {
      // Invalid session object (customer name is null)
      id: 456,
      type: "checkout.session.completed",
      name: null,
      signature_invalidator: "",
      expected: new Response("invalid session object", { status: 400 }),
    },
    {
      // Not yet handled event that needs to be handled
      id: 456,
      type: "checkout.session.completed",
      name: "Tony",
      signature_invalidator: "",
      expected: new Response(null, { status: 201 }),
    },
    {
      // Not yet handled event, but does not need to be handled
      id: 456,
      type: "",
      name: "Tony",
      signature_invalidator: "",
      expected: new Response(null, { status: 204 }),
    },
    {
      // Event with invalid signature or request payload
      id: 456,
      type: "checkout.session.completed",
      name: "Tony",
      signature_invalidator: "blah",
      expected: new Response("invalid signature or request", { status: 400 }),
    },
  ].forEach(({ id, type, name, signature_invalidator, expected }) => {
    it("returns expected response", async () => {
      // GIVEN mock stripe event
      const stripe_event = {
        id: 123,
        type: "checkout.session.completed",
        data: {
          object: {
            customer_details: { name: "Tony", email: "tony@tonydang.blog" },
            amount_total: 500,
            success_url: `${env.BLOG_URL}/support/successful-one-time-donation`,
          },
        },
      };

      // Modify event per test case. Type assertions added to avoid tsc errors,
      // but value can be null for testing.
      stripe_event.id = id as number;
      stripe_event.type = type;
      stripe_event.data.object.customer_details.name = name as string;

      // AND GIVEN only one existing stripe_event with id = 123
      await supabase(env)
        .from("one_time_donation")
        .delete()
        .match({ email: "tony@tonydang.blog" });
      await supabase(env)
        .from("stripe_event")
        .delete()
        .neq("stripe_event_id", "blah");
      await supabase(env).from("stripe_event").insert({ stripe_event_id: 123 });
      const { data } = await supabase(env).from("stripe_event").select("*");
      expect(data?.length).to.equal(1);

      // WHEN A mock event request from Stripe is handled.
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
        new TextEncoder().encode(
          `timestamp.${JSON.stringify(stripe_event)}${signature_invalidator}`
        )
      );
      const v1 = buf2hex(signed_payload);
      const stripe_signature = `t=timestamp,v1=${v1}`;
      const request = new Request("https://tonydang.blog", {
        method: "POST",
        body: JSON.stringify(stripe_event),
        headers: { "stripe-signature": stripe_signature },
      });
      const res = await api_route(request, env);

      // THEN Expected response is returned.
      expect(res).to.deep.equal(expected);
    });
  });
});
