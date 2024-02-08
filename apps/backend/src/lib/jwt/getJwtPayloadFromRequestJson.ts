import { verify_jwt } from "@lib/jwt/verify-jwt";

import type { JWTPayload } from "jose";
import type { Env } from "@lib/types/env";

/**
 * Retrieves the JWT payload from a JSON request.
 *
 * Returns null if the JWT is invalid.
 *
 * This function assumes the JWT is sent as a JSON object (i.e. {"jwt": "TOKEN"}).
 *
 * @param request - Incoming request.
 * @param env - Cloudflare worker environmental variables.
 */
export async function getJwtPayloadFromRequestJson(
  request: Request,
  env: Env,
): Promise<JWTPayload | null> {
  try {
    const { jwt }: { jwt: string } = await request.json();
    const payload = await verify_jwt(env, jwt);

    return payload;
  } catch {
    return null;
  }
}
