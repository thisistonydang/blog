// @vitest-environment miniflare

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { env } from "@lib/testing/env";

import { sign_jwt } from "../sign-jwt";
import { verify_jwt } from "../verify-jwt";

describe("sign_jwt", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("defaults to 10 minute expiration", async () => {
    // GIVEN Current time.
    const date = new Date();
    vi.setSystemTime(date);

    // WHEN JWT is generated without explicit expiration.
    const jwt = await sign_jwt(env, {});
    const payload = await verify_jwt(env, jwt);

    // THEN Expiration is set to 10 minutes from issued time.
    expect(payload?.exp).to.be.closeTo(
      (date.getTime() + 60 * 10 * 1000) / 1000,
      1
    );
  });

  it("can set custom expiration", async () => {
    // GIVEN Current time.
    const date = new Date();
    vi.setSystemTime(date);

    // WHEN JWT is generated with custom expiration.
    const jwt = await sign_jwt(env, {}, "24hr");
    const payload = await verify_jwt(env, jwt);

    // THEN Expiration is set per custom expiration time.
    expect(payload?.exp).to.be.closeTo(
      (date.getTime() + 86400 * 1000) / 1000,
      1
    );
  });

  it("can set payload", async () => {
    // GIVEN N/A.

    // WHEN JWT is generated with payload.
    const jwt = await sign_jwt(env, { test: "test" });
    const payload = await verify_jwt(env, jwt);

    // THEN JWT contains payload info.
    expect(payload?.test).to.equal("test");
  });
});
