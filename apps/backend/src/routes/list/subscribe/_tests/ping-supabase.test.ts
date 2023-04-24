import { describe, expect, it } from "vitest";

import { supabase } from "@lib/db/supabase";
import { production_env } from "@lib/testing/production_env";

describe("ping-supabase", () => {
  it("pings supabase", async () => {
    // GIVEN test name and email.
    const name = "Kari";
    const email = "merry.cat4054@fastmail.com";

    // WHEN contact is deleted.
    await supabase(production_env).from("contact").delete().match({ email });

    // THEN contact does not exist in db.
    let res = await supabase(production_env)
      .from("contact")
      .select("*")
      .match({ email });
    expect(res.data).to.deep.equal([]);

    // WHEN contact is added.
    await supabase(production_env).from("contact").insert({
      name,
      preferred_name: name,
      email,
      is_verified: true,
      is_subscriber: true,
      is_banned: false,
      mailing_list_id: 0,
    });

    // THEN contact is added to db.
    res = await supabase(production_env)
      .from("contact")
      .select("*")
      .match({ email });
    expect(res.data?.[0].name).to.equal(name);
  });
});
