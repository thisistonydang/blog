// @vitest-environment miniflare

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { supabase } from "@lib/db/supabase";
import { env } from "@lib/testing/env";

import api_route from "../index";

const SENDS_EMAIL = process.env.TEST_EMAIL;

beforeAll(async () => {
  // SETUP Clear contact table and add test data.
  await supabase(env).from("contact").delete().neq("email", "blah");
  await supabase(env)
    .from("contact")
    .insert([
      {
        name: "is_subscriber",
        preferred_name: "is_subscriber",
        email: "is_subscriber@tonydang.blog",
        is_subscriber: true,
      },
    ]);
  await supabase(env)
    .from("contact")
    .insert([
      {
        name: "is_banned",
        preferred_name: "is_banned",
        email: "is_banned@tonydang.blog",
        is_banned: true,
      },
    ]);
  await supabase(env)
    .from("contact")
    .insert([
      {
        name: "is_verified",
        preferred_name: "is_verified",
        email: "is_verified@tonydang.blog",
        is_verified: true,
      },
    ]);
  await supabase(env)
    .from("contact")
    .insert([
      {
        name: "is_NOT_verified",
        preferred_name: "is_NOT_verified",
        email: "white.moon8474@fastmail.com",
      },
    ]);
});

afterAll(async () => {
  // TEARDOWN Clear contact table.
  await supabase(env).from("contact").delete().neq("email", "blah");
});

describe.each([
  {
    name: "",
    email: "terrydang.blog@gmail.com",
    expected: { name: "Name is required" },
  },
  {
    name: "0123456789 0123456789 0123456789 0123456789 0123456789",
    email: "terrydang.blog@gmail.com",
    expected: { name: "Name exceeds 50 max length" },
  },
  {
    name: "Terry",
    email: "t@t",
    expected: { email: "Invalid email" },
  },
  {
    name: "Tony",
    email: "is_subscriber@tonydang.blog",
    expected: { confirmed: "Thank you for signing up for my mailing list!" },
  },
  {
    name: "Tony",
    email: "is_banned@tonydang.blog",
    expected: { confirmed: "Thank you for signing up for my mailing list!" },
  },
  {
    name: "Tony",
    email: "is_verified@tonydang.blog",
    expected: {
      unsubscribed: `It looks like this email has been unsubscribed from my
        mailing list. If you would like to resubscribe, please send me an email
        at tony@tonydang.blog and I will re-add you.`,
    },
  },
  {
    name: "existing_non_verified_contact",
    email: "white.moon8474@fastmail.com",
    expected: {
      success: `Thank you for signing up for my mailing list! Please check
  for a confirmation sent to your inbox to verify your email.`,
    },
  },
  {
    name: "new_contact",
    email: "new.hope7149@fastmail.com",
    expected: {
      success: `Thank you for signing up for my mailing list! Please check
  for a confirmation sent to your inbox to verify your email.`,
    },
  },
])("/list/subscribe", ({ name, email, expected }) => {
  it.skipIf(SENDS_EMAIL && expected.success)(
    `name: '${name}' + email: '${email}' -> expected json`,
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
