import { fromUint8Array, toUint8Array } from "js-base64";
import * as Y from "yjs";

import { verify_jwt } from "@lib/jwt/verify-jwt";
import type { Env } from "@lib/types/env";

export default async function merge(
  request: Request,
  env: Env,
): Promise<Response> {
}
