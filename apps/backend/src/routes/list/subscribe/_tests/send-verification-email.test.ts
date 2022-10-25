// @vitest-environment miniflare

import { describe, expect, it } from "vitest";

import { env } from "@lib/testing/env";

import { send_verification_email } from "../index";

const SKIP_EMAIL = process.env.SKIP_EMAIL;

describe("send_verification_email", () => {
  it.skipIf(SKIP_EMAIL)("sends verification email", async () => {
    // GIVEN N/A.

    // WHEN Verification email is sent.
    const res = await send_verification_email(
      env,
      "white.moon8474@fastmail.com",
      "test_send_verification_email",
      "123"
    );

    // THEN Email is successfully sent.
    expect(res.MessageId).to.be.a("string");
  });
});
