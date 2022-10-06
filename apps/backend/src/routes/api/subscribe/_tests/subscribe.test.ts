import { describe, expect, it } from "vitest";

import { env } from "../../../../lib/testing/env";
import api_route from "../index";

describe("/api/subscribe", () => {
  [
    {
      name: "Terry",
      email: "new.hope7149@fastmail.com",
      expected: {
        unsubscribed: `It looks like this email has been unsubscribed from my
          mailing list. If you would like to resubscribe, please send me an
          email at tony@tonydang.blog and I will re-add you.`,
      },
    },
    {
      name: "Terry",
      email: "terrydang.blog@gmail.com",
      expected: { confirmed: "Thank you for signing up for my mailing list!" },
    },
    {
      name: "Terry",
      email: "white.moon8474@fastmail.com",
      expected: {
        success: `Thank you for signing up for my mailing list! Please check for
        a confirmation sent to your inbox to verify your email.`,
      },
    },
    {
      name: "Terry",
      email: "terrydang.blog+random@gmail.com",
      expected: { email: "Invalid email" },
    },
    {
      name: "",
      email: "terrydang.blog@gmail.com",
      expected: { name: "Name is required" },
    },
    {
      name: "0123456789 0123456789 0123456789 0123456789 0123456789",
      email: "terrydang.blog@gmail.com",
      expected: { name: "Name exceeds 50 max length" },
    },
    {
      name: "Terry",
      email: "t@t",
      expected: { email: "Invalid email" },
    },
  ].forEach(({ name, email, expected }) => {
    it("returns expected json response", async () => {
      // GIVEN Name and email for request.

      // WHEN Request is made to api route.
      const request = new Request("https://tonydang.blog", {
        method: "POST",
        body: JSON.stringify({ name, email }),
      });
      const res = await api_route(request, env);
      const data = await res.json();

      // THEN Reponse json is as expected.
      expect(data).to.deep.equal(expected);
    });
  });
});
