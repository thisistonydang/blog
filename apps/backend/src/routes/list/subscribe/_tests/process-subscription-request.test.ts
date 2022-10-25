// @vitest-environment miniflare

import { afterAll, describe, expect, it } from "vitest";

import { supabase } from "@lib/db/supabase";
import { env } from "@lib/testing/env";

import { process_subscription_request } from "../index";

const SKIP_EMAIL = process.env.SKIP_EMAIL;
const unverified_email = "new.hope7149@fastmail.com";
const new_contact_email = "merry.cat4054@fastmail.com";

afterAll(async () => {
  await supabase(env)
    .from("contact")
    .delete()
    .match({ email: unverified_email });
  await supabase(env)
    .from("contact")
    .delete()
    .match({ email: new_contact_email });
});

describe("process_subscription_request", () => {
  it.skipIf(SKIP_EMAIL)(
    "updates contact info if existing unverified contact",
    async () => {
      // GIVEN An existing unverified contact.
      await supabase(env).from("contact").insert({
        name: "is_NOT_verified",
        preferred_name: "is_NOT_verified",
        email: unverified_email,
      });

      // WHEN Subscription request is processed.
      await process_subscription_request(env, "new hope", unverified_email);
      const { data } = await supabase(env)
        .from("contact")
        .select("*")
        .match({ email: unverified_email });

      // THEN Contact info is updated in db.
      expect(data?.[0].name).to.equal("new hope");
      expect(data?.[0].preferred_name).to.equal("new");
    }
  );
  it.skipIf(SKIP_EMAIL)("adds new contact to database", async () => {
    // GIVEN New contact.

    // WHEN Subscription request is processed.
    await process_subscription_request(env, "merry cat", new_contact_email);
    const { data } = await supabase(env)
      .from("contact")
      .select("*")
      .match({ email: new_contact_email });

    // THEN New contact is added to db.
    expect(data?.[0].name).to.equal("merry cat");
    expect(data?.[0].preferred_name).to.equal("merry");
  });
});
