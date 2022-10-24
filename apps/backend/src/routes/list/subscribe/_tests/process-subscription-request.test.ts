// @vitest-environment miniflare

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { supabase } from "@lib/db/supabase";
import { env } from "@lib/testing/env";

import { process_subscription_request } from "../index";

const SENDS_EMAIL = process.env.TEST_EMAIL;

beforeAll(async () => {
  // SETUP Clear contact table and add test data.
  await supabase(env).from("contact").delete().neq("email", "blah");
});

afterAll(async () => {
  // TEARDOWN Clear contact table.
  await supabase(env).from("contact").delete().neq("email", "blah");
});

describe("process_subscription_request", () => {
  it.skipIf(SENDS_EMAIL)(
    "updates contact info if existing unverified contact",
    async () => {
      // GIVEN An existing unverified contact.
      const email = "white.moon8474@fastmail.com";
      await supabase(env)
        .from("contact")
        .insert([
          {
            name: "is_NOT_verified",
            preferred_name: "is_NOT_verified",
            email,
          },
        ]);

      // WHEN Subscription request is processed.
      await process_subscription_request(env, "first_name last_name", email);
      const { data } = await supabase(env)
        .from("contact")
        .select("*")
        .match({ email });

      // THEN Contact info is updated in db.
      expect(data?.[0].name).to.equal("first_name last_name");
      expect(data?.[0].preferred_name).to.equal("first_name");
    }
  );
  it.skipIf(SENDS_EMAIL)("adds new contact to database", async () => {
    // GIVEN New contact.
    const email = "new.hope7149@fastmail.com";

    // WHEN Subscription request is processed.
    await process_subscription_request(env, "first_name last_name", email);
    const { data } = await supabase(env)
      .from("contact")
      .select("*")
      .match({ email });

    // THEN New contact is added to db.
    expect(data?.[0].name).to.equal("first_name last_name");
    expect(data?.[0].preferred_name).to.equal("first_name");
  });
});
