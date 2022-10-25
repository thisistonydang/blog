// @vitest-environment miniflare

import { describe, expect, it } from "vitest";

import { env } from "@lib/testing/env";

import { send_email } from "../send-email";

const SKIP_EMAIL = process.env.SKIP_EMAIL;

describe("send_email", () => {
  it.skipIf(SKIP_EMAIL)("can send an email", async () => {
    // GIVEN N/A.

    // WHEN An email is sent.
    const date = new Intl.DateTimeFormat(undefined, {
      dateStyle: "short",
      timeStyle: "long",
    }).format(new Date());
    const res = await send_email(
      env,
      "tonytadang@gmail.com",
      `[Test] ${date} from send-email.test.ts`,
      `This is a test email sent on ${date} from send-email.test.ts.`
    );

    // THEN Response with message id is returned.
    expect(res.$metadata.httpStatusCode).to.equal(200);
    expect(res.MessageId).to.be.a("string");
  });

  it("returns error on exceptions", async () => {
    // GIVEN N/A.

    // WHEN An email without recipient is sent.
    const res = await send_email(
      env,
      "",
      "[Test] This email should not be sent",
      "body"
    );

    // THEN Response with error is returned.
    expect(res.$metadata.httpStatusCode).to.equal(400);
    expect(res.MessageId).to.be.undefined;
  });
});
