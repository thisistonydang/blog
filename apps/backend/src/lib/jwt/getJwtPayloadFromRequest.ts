import { verify_jwt } from "@lib/jwt/verify-jwt";

import type { JWTPayload } from "jose";
import type { Env } from "@lib/types/env";

/**
 * Retrieves the JWT payload from a request.
 *
 * Returns null if the JWT is invalid.
 *
 * This function assumes the JWT is in the query string as "?jwt=<TOKEN>".
 *
 * @param request - Incoming request.
 * @param env - Cloudflare worker environmental variables.
 */
export async function getJwtPayloadFromRequest(
  request: Request,
  env: Env,
): Promise<JWTPayload | null> {
  const jwt = new URL(request.url).searchParams.get("jwt") ?? "";
  const payload = await verify_jwt(env, jwt);

  return payload;
}
