// @vitest-environment miniflare

import { describe, expect, it } from "vitest";

import { env } from "@lib/testing/env";

import { send_verification_email } from "../index";

describe("send_verification_email", () => {
  it("returns null body and 202 status when not in production", async () => {
    // GIVEN Non-production environment.
    expect(env.MODE).to.equal("test");

    // WHEN send_verification_email is called.
    const res = await send_verification_email(
      env,
      "email",
      "name",
      "preferred_name",
      "contact_id"
    );

    // THEN Null response with 202 status is returned.
    expect(res.body).to.be.null;
    expect(res.status).to.equal(202);
  });
});
