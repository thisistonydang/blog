import { describe, expect, it } from "vitest";

import { sign_jwt } from "@lib/jwt/sign-jwt";
import { env } from "@lib/testing/env";

import { getJwtPayloadFromRequestJson } from "../getJwtPayloadFromRequestJson";

describe("getJwtPayloadFromRequestJson", async () => {
  const jwt = await sign_jwt(env, { foo: "bar" });

  it.each([
    // Has valid JWT.
    [true, jwt, false, "bar"],

    // Has JWT but invalid.
    [true, "invalid_jwt", true, undefined],

    // No JWT.
    [false, jwt, true, undefined],
  ])(
    "hasJwt: %s, jwt: %s, isPayloadNull: %s, expectedFoo: %s",
  );
});
