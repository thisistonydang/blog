import { loadEnv } from "vite";
import { describe, expect, it } from "vitest";

import type { Env } from "@lib/types/env";
import api_route from "../index";

interface Donation {
  display_name: string;
  amount: number;
}

describe("/support/donations api route", () => {
  it("returns json response with donations data", async () => {
    // GIVEN Development environmental vars.
    const env = loadEnv(
      "test",
      `${process.cwd()}/apps/backend`,
      ""
    ) as unknown as Env;

    // WHEN Request is made to api route.
    const request = new Request("https://tonydang.blog", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const res = await api_route(request, env);
    const data: { donations: Donation[] } = await res.json();

    // THEN Reponse json is as expected.
    expect(data.donations.length).to.be.above(1);
    expect(data.donations[0].display_name).to.a("string");
    expect(data.donations[0].amount).to.a("number");
  });
});
