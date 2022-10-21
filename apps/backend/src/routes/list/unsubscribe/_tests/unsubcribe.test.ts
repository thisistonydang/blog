// @vitest-environment miniflare

import { describe, expect, it } from "vitest";

import { supabase } from "@lib/db/supabase";
import { env } from "@lib/testing/env";

import api_route from "../index";

describe("/list/unsubscribe", () => {
  it("unsubscribes a contact", async () => {
    // GIVEN A subscribed contact.
    const email = "tony@tonydang.blog";
    const contact_id = crypto.randomUUID();
    await supabase(env).from("contact").delete().match({ email });
    await supabase(env).from("contact").insert({
      contact_id: contact_id,
      name: "Tony Dang",
      preferred_name: "Tony",
      email,
      is_subscriber: true,
    });
    let rows = await supabase(env).from("contact").select("*").match({ email });
    expect(rows.data?.[0].is_subscriber).to.be.true;

    // WHEN Request is made to api route with contact_id.
    const request = new Request(
      `https://tonydang.blog/list/unsubscribe?id=${contact_id}`
    );
    const res = await api_route(request, env);
    rows = await supabase(env).from("contact").select("*").match({ email });

    // THEN Contact is unsubscribed and redirected to confirmation page.
    expect(rows.data?.[0].is_subscriber).to.be.false;
    expect(res.status).to.equal(303);
    expect(res.headers.get("location")).to.include("/list/unsubscribe/success");
  });

  it("redirects to whoops page if error", async () => {
    // GIVEN N/A.

    // WHEN Request is made to api route without contact_id.
    const request = new Request("https://tonydang.blog/list/unsubscribe");
    const res = await api_route(request, env);

    // THEN User is redirected to whoops page.
    expect(res.status).to.equal(303);
    expect(res.headers.get("location")).to.include("/whoops");
  });
});
