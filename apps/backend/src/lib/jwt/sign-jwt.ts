import { SignJWT, importPKCS8 } from "jose";
import type { JWTPayload } from "jose";

import type { Env } from "@lib/types/env";

/**
 * Returns a signed JWT string.
 *
 * @param env - Cloudflare worker environmental variables.
 * @param payload - Payload to sign.
 * @param expires_in - Time to expiration. Default 10 minutes.
 */
export async function sign_jwt(
  env: Env,
  payload: JWTPayload,
  expires_in = "10min"
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "EdDSA" })
    .setIssuedAt()
    .setExpirationTime(expires_in)
    .sign(
      await importPKCS8(env.JWT_PRIVATE_KEY.replace(/\\n/g, "\n"), "EdDSA")
    );
}
