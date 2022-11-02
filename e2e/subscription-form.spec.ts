import { test, expect } from "@playwright/test";

import { supabase } from "@lib/db/supabase";

test.describe("subscription form", () => {
  const new_contact_email = "e2e_subscription_form#1@tonydang.blog";

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.afterAll(async () => {
    await supabase.from("contact").delete().match({ email: new_contact_email });
  });

  test("can sign up to mailing list", async ({ page }) => {
    const name_input = page.locator('[name="name"]');

    name_input.scrollIntoViewIfNeeded();
    await name_input.fill("Tony");
    await page.locator('[name="email"]').fill(new_contact_email);
    await page.locator('text="SUBMIT"').click();

    const text =
      "Thank you for signing up for my mailing list! Please check for a confirmation sent to your inbox to verify your email.";
    await expect(page.locator(`text="${text}"`)).toHaveText(text);
  });
});
