import { fromUint8Array, toUint8Array } from "js-base64";
import * as Y from "yjs";

import { getJwtPayloadFromRequest } from "@lib/jwt/getJwtPayloadFromRequest";
import type { Env } from "@lib/types/env";

export default async function merge(
  request: Request,
  env: Env,
): Promise<Response> {
  const payload = await getJwtPayloadFromRequest(request, env);
  if (!payload) return new Response("Invalid JWT.", { status: 400 });

  // Extract claims from payload.
  const { serverDocument, clientDocument } = payload;

  // Check payload claims are valid.
  if (
    typeof serverDocument !== "string" ||
    typeof clientDocument !== "string"
  ) {
    return new Response("Invalid payload.", { status: 400 });
  }

}
