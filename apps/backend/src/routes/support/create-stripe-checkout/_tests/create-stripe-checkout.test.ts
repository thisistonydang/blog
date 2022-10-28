// @vitest-environment miniflare

import { describe, expect, it } from "vitest";

import { env } from "@lib/testing/env";

import api_route from "../index";

describe("/support/create-stripe-checkout", () => {
  it.each([
    ["redirects back to blog if form error", "0", "http://localhost:3000"],
    ["redirects to Stripe if no error", "1", "https://checkout.stripe.com"],
  ])("%s", async (_test_name, qty, expected) => {
    // GIVEN N/A.

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
