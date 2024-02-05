import { describe, expect, it } from "vitest";

import { sign_jwt } from "@lib/jwt/sign-jwt";
import { env } from "@lib/testing/env";

import { getJwtPayloadFromRequest } from "../getJwtPayloadFromRequest";

describe("getJwtPayloadFromRequest", async () => {
  const jwt = await sign_jwt(env, { foo: "bar" });

  it.each([
    // Valid jwt.
    [true, jwt, false, "bar"],

    // Invalid jwt.
    [true, "invalid_jwt", true, undefined],

    // No jwt.
    [false, jwt, true, undefined],
  ])(
    "hasJwt: %s, jwt: %s, isPayloadNull: %s, expectedFoo: %s",
    async (hasJwt, jwt, isPayloadNull, expectedFoo) => {
      // GIVEN Whether the request has a JWT query parameter and whether the JWT is valid.

      // WHEN Trying to retrieve the JWT payload from the request.
      const request = new Request(
        `https://tonydang.blog/?${hasJwt ? "jwt" : "blah"}=${jwt}`,
      );
      const payload = await getJwtPayloadFromRequest(request, env);

      // THEN Expected payload is returned.
      expect(payload === null).to.equal(isPayloadNull);
      expect(payload?.foo).to.equal(expectedFoo);
    },
  );
});
