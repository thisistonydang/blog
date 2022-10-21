// @vitest-environment miniflare

import { describe, expect, it } from "vitest";

import { supabase } from "@lib/db/supabase";
import { sign_jwt } from "@lib/jwt/sign-jwt";
import { env } from "@lib/testing/env";

import api_route from "../index";

describe("/list/verify", () => {
  const uuid = crypto.randomUUID();
  it.each([
    // shows whoops page if id in JWT is invalid
    [false, uuid, "123", false, false, "/whoops"],
    // verifies and subscribes an contact
    [false, uuid, uuid, true, true, "/list/verify/success"],
    // shows expired link page if contact is banned
    [true, uuid, uuid, false, false, "/list/verify/expired"],
  ])(
    "processes email verification request",
    async (
      is_banned,
      contact_id,
      jwt_id,
      is_verified,
      is_subscriber,
      redirect_path
    ) => {
      // GIVEN contact in db.
      const email = "tony@tonydang.blog";
      await supabase(env).from("contact").delete().match({ email });
      await supabase(env).from("contact").insert({
        contact_id,
        name: "Tony Dang",
        preferred_name: "Tony",
        email,
        is_banned,
      });

      // WHEN Request is made to api route with jwt.
      const jwt = await sign_jwt(env, { id: jwt_id });
      const request = new Request(
        `https://tonydang.blog/list/verify?jwt=${jwt}`
      );
      const res = await api_route(request, env);
      const { data } = await supabase(env)
        .from("contact")
        .select("*")
        .match({ email });

      // THEN Request is processed and redirected.
      expect(data?.[0].is_verified).to.equal(is_verified);
      expect(data?.[0].is_subscriber).to.equal(is_subscriber);
      expect(res.status).to.equal(303);
      expect(res.headers.get("location")).to.include(redirect_path);
    }
  );
});
