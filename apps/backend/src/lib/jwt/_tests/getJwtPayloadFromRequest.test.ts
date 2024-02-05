import { describe, expect, it } from "vitest";

import { sign_jwt } from "@lib/jwt/sign-jwt";
import { env } from "@lib/testing/env";

import { getJwtPayloadFromRequest } from "../getJwtPayloadFromRequest";

describe("getJwtPayloadFromRequest", () => {
  it.each([
    // Valid jwt.
    [true, true, false, "bar"],

    // Invalid jwt.
    [true, false, true, undefined],

    // No jwt.
    [false, true, true, undefined],
  ])(
    "hasJwt: %s, isValidJwt: %s, isPayloadNull: %s, expectedFoo: %s",
    async (hasJwt, isValidJwt, isPayloadNull, expectedFoo) => {
      // GIVEN Whether the request has a JWT query parameter and whether the JWT is valid.

      // WHEN Trying to retrieve the JWT payload from the request.
      const jwt = await sign_jwt(env, { foo: "bar" });
      const request = new Request(
        `https://tonydang.blog/?${hasJwt ? "jwt" : "blah"}=${
          isValidJwt ? jwt : "invalid_jwt"
        }`,
      );
      const payload = await getJwtPayloadFromRequest(request, env);

      // THEN Expected payload is returned.
      expect(payload === null).to.equal(isPayloadNull);
      expect(payload?.foo).to.equal(expectedFoo);
    },
  );
});
