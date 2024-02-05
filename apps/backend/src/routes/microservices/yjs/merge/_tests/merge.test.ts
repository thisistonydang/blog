import { describe, expect, it } from "vitest";
import { fromUint8Array } from "js-base64";
import * as Y from "yjs";

import { sign_jwt } from "@lib/jwt/sign-jwt";
import { env } from "@lib/testing/env";

import api_route from "../index";
