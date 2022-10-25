// @vitest-environment miniflare

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { supabase } from "@lib/db/supabase";
import { env } from "@lib/testing/env";

import api_route from "../index";

const SKIP_EMAIL = process.env.SKIP_EMAIL;
const subscribed_email = "is_subscriber@tonydang.blog";
const banned_email = "is_banned@tonydang.blog";
const verified_email = "is_verified@tonydang.blog";
const unverified_email = "past.koala8232@fastmail.com";
const new_contact_email = "wise.job2121@fastmail.com";

beforeAll(async () => {
  await supabase(env)
    .from("contact")
    .insert([
      {
        name: "is_subscriber",
        preferred_name: "is_subscriber",
        email: subscribed_email,
        is_verified: false,
        is_subscriber: true,
        is_banned: false,
      },
      {
        name: "is_banned",
        preferred_name: "is_banned",
        email: banned_email,
        is_verified: false,
        is_subscriber: false,
        is_banned: true,
      },
      {
        name: "is_verified",
        preferred_name: "is_verified",
        email: verified_email,
        is_verified: true,
        is_subscriber: false,
        is_banned: false,
      },
      {
        name: "is_NOT_verified",
        preferred_name: "is_NOT_verified",
        email: unverified_email,
        is_verified: false,
        is_subscriber: false,
        is_banned: false,
      },
    ]);
});

afterAll(async () => {
  await supabase(env)
    .from("contact")
    .delete()
    .match({ email: subscribed_email });
  await supabase(env).from("contact").delete().match({ email: banned_email });
  await supabase(env).from("contact").delete().match({ email: verified_email });
  await supabase(env)
    .from("contact")
    .delete()
    .match({ email: unverified_email });
  await supabase(env)
    .from("contact")
    .delete()
    .match({ email: new_contact_email });
});

describe.each([
  {
    name: "",
    email: "tony@tonydang.blog",
    expected: { name: "Name is required" },
  },
  {
    name: "0123456789 0123456789 0123456789 0123456789 0123456789",
    email: "tony@tonydang.blog",
    expected: { name: "Name exceeds 50 max length" },
  },
  {
    name: "Terry",
    email: "t@t",
    expected: { email: "Invalid email" },
  },
  {
    name: "Tony",
    email: subscribed_email,
    expected: { confirmed: "Thank you for signing up for my mailing list!" },
  },
  {
    name: "Tony",
    email: banned_email,
    expected: { confirmed: "Thank you for signing up for my mailing list!" },
  },
  {
    name: "Tony",
    email: verified_email,
    expected: {
      unsubscribed: `It looks like this email has been unsubscribed from my
        mailing list. If you would like to resubscribe, please send me an email
        at tony@tonydang.blog and I will re-add you.`,
    },
  },
  {
    name: "existing_non_verified_contact",
    email: unverified_email,
    expected: {
      success: `Thank you for signing up for my mailing list! Please check
  for a confirmation sent to your inbox to verify your email.`,
    },
  },
  {
    name: "new_contact",
    email: new_contact_email,
    expected: {
      success: `Thank you for signing up for my mailing list! Please check
  for a confirmation sent to your inbox to verify your email.`,
    },
  },
])("/list/subscribe", ({ name, email, expected }) => {
  it.skipIf(SKIP_EMAIL && expected.success)(
    `name: '${name}' + email: '${email}' -> ${JSON.stringify(expected)}`,
    async () => {
      // GIVEN Name and email for request.

      // WHEN Request is made to api route.
      const request = new Request("https://tonydang.blog/list/subscribe", {
        method: "POST",
        body: JSON.stringify({ name, email }),
      });
      const res = await api_route(request, env);
      const data = await res.json();

      // THEN Reponse json is as expected.
      expect(data).to.deep.equal(expected);
    }
  );
});
