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

  try {
    // Merge the server and client documents into a single Yjs document.
    const doc = new Y.Doc();
    Y.applyUpdate(doc, toUint8Array(serverDocument));
    Y.applyUpdate(doc, toUint8Array(clientDocument));

    // Encode the document as a base64 update.
    const binaryDocument = Y.encodeStateAsUpdate(doc);
    const base64Document = fromUint8Array(binaryDocument);

    // Return the merged document in the response.
    const body = JSON.stringify({ document: base64Document });
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    return new Response("Error merging documents.", { status: 400 });
  }
}
