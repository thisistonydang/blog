import { describe, expect, it } from "vitest";

import type { Stripe } from "stripe";

import { supabase } from "@lib/db/supabase";
import { env } from "@lib/testing/env";

import { handle_one_time_donation } from "../handle-one-time-donation";

describe("handle_one_time_donation", () => {
  [
    {
      email: "handle@one_time_donation",
      expected: null,
    },
    {
      email: null,
      expected:
        'null value in column "email" of relation "one_time_donation" violates not-null constraint',
    },
  ].forEach(({ email, expected }) => {
    it("returns error string if unsuccessful, else returns null", async () => {
      // GIVEN no row with test email in one_time_donation table.
      await supabase(env).from("one_time_donation").delete().match({ email });
      let res = await supabase(env)
        .from("one_time_donation")
        .select("*")
        .match({ email });
      expect(res.data?.length).to.equal(0);

      // WHEN A mock Stripe.Checkout.Session is handled.
      const session = {
        customer_details: { name: " test  one_time_donation", email },
        amount_total: 500,
      } as Stripe.Checkout.Session;
      const error = await handle_one_time_donation(session, env);

      // THEN Error message or null is returned as expected.
      expect(error).to.equal(expected);

      // AND THEN donation is inserted into one_time_donation table if no error.
      res = await supabase(env)
        .from("one_time_donation")
        .select("*")
        .match({ email });
      if (!error) {
        expect(res.data?.[0]?.name).to.equal("test one_time_donation");
        expect(res.data?.[0]?.email).to.equal("handle@one_time_donation");
        expect(res.data?.[0]?.display_name).to.equal("test");
        expect(res.data?.[0]?.amount).to.equal(500);
      }
    });
  });
});
