import { loadEnv } from "vite";
import { describe, expect, it } from "vitest";

import type { Env } from "@lib/types/env";
import api_route from "../index";

describe("/support/create-stripe-checkout", () => {
  [
    { qty: "0", expected: "http://localhost:3000" },
    { qty: "1", expected: "https://checkout.stripe.com" },
  ].forEach(({ qty, expected }) => {
    it("returns expected json response", async () => {
      // GIVEN Development environmental vars.
      const env = loadEnv(
        "test",
        `${process.cwd()}/apps/backend`,
        ""
      ) as unknown as Env;

      // WHEN Request is made to api route with mocked request.formData.
      const request = new Request("https://tonydang.blog");
      const form_data_mock = async () => ({ get: () => qty });
      request.formData = form_data_mock as unknown as () => Promise<FormData>;
      const res = await api_route(request, env);

      // THEN Reponse json is as expected.
      expect(res.status).to.equal(303);
      expect(res.headers.get("location")).to.include(expected);
    });
  });
});