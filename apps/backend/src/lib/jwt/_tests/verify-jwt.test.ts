import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { env } from "@lib/testing/env";

import { sign_jwt } from "../sign-jwt";
import { verify_jwt } from "../verify-jwt";

describe("verify_jwt", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns null if invalid JWT expiration", async () => {
    // GIVEN JWT created with 1 minute expiration.
    const sign_time = new Date();
    vi.setSystemTime(sign_time);
    const jwt = await sign_jwt(env, { test: "eeeeeeee" }, "1min");

    // WHEN JWT is verified >= 1 minute from sign date.
    const verify_time = new Date(sign_time.getTime() + 60 * 1000);
    vi.setSystemTime(verify_time);
    const payload = await verify_jwt(env, jwt);

    // THEN Null is returned.
    expect(payload).to.be.null;
  });

  it("returns null if invalid JWT string", async () => {
    // GIVEN Invalid JWT string.

    // WHEN JWT is verified.
    const payload = await verify_jwt(env, "invalid_jwt");

    // THEN Null is returned.
    expect(payload).to.be.null;
  });

  it("returns payload if valid JWT", async () => {
    // GIVEN Valid JWT.
    const jwt = await sign_jwt(env, { test: "test" });

    // WHEN JWT is verified.
    const payload = await verify_jwt(env, jwt);

    // THEN Payload is returned.
    expect(payload?.test).to.equal("test");
  });
});
