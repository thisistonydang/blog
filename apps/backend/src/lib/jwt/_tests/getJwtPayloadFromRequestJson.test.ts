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
    async (hasJwt, jwt, isPayloadNull, expectedFoo) => {
      // GIVEN Whether the json request has a `jwt` key and whether the JWT is valid.

      // WHEN Trying to retrieve the JWT payload from the request.
      const request = new Request("https://tonydang.blog/", {
        method: "POST",
        body: JSON.stringify(hasJwt ? { jwt } : { invalidJwtKey: jwt }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const payload = await getJwtPayloadFromRequestJson(request, env);

      // THEN Expected payload is returned.
      expect(payload === null).to.equal(isPayloadNull);
      expect(payload?.foo).to.equal(expectedFoo);
    },
  );
});
