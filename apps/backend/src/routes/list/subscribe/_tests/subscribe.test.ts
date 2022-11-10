import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { supabase } from "@lib/db/supabase";
import { env } from "@lib/testing/env";

import api_route from "../index";

const subscribed_email = "/list/subscribe#1@tonydang.blog";
const banned_email = "/list/subscribe#2@tonydang.blog";
const verified_email = "/list/subscribe3#@tonydang.blog";
const unverified_email = "/list/subscribe#4@tonydang.blog";
const new_contact_email = "/list/subscribe#5@tonydang.blog";

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

describe("/list/subscribe", () => {
  it.each([
    ["", "tony@tonydang.blog", { name: "Name is required" }],
    [
      "0123456789 0123456789 0123456789 0123456789 0123456789",
      "tony@tonydang.blog",
      { name: "Name exceeds 50 max length" },
    ],
    ["Terry", "t@t", { email: "Invalid email" }],
    [
      "Tony",
      subscribed_email,
      { confirmed: "Thank you for signing up for my mailing list!" },
    ],
    [
      "Tony",
      banned_email,
      { confirmed: "Thank you for signing up for my mailing list!" },
    ],
    [
      "Tony",
      verified_email,
      {
        unsubscribed: `It looks like this email has been unsubscribed from my
        mailing list. If you would like to resubscribe, please send me an email
        at tony@tonydang.blog and I will re-add you.`,
      },
    ],
    [
      "existing_non_verified_contact",
      unverified_email,
      {
        success: `Thank you for signing up for my mailing list! Please check
  for a confirmation sent to your inbox to verify your email.`,
      },
    ],
    [
      "new_contact",
      new_contact_email,
      {
        success: `Thank you for signing up for my mailing list! Please check
  for a confirmation sent to your inbox to verify your email.`,
      },
    ],
  ])(`name: '%s' + email: '%s' -> %j`, async (name, email, expected) => {
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
  });
});
