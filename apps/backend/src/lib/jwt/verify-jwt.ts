import { jwtVerify, importSPKI } from "jose";
import type { JWTPayload } from "jose";

import type { Env } from "@lib/types/env";

/**
 * Verifies a JWT. If valid, returns JWT payload, else returns null.
 *
 * @param env - Cloudflare worker environmental variables.
 * @param jwt - JWT string to verify.
 */
export async function verify_jwt(
  env: Env,
  jwt: string
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(
      jwt,
      await importSPKI(env.JWT_PUBLIC_KEY.replace(/\\n/g, "\n"), "EdDSA")
    );
    return payload;
  } catch (error: unknown) {
    return null;
  }
}
