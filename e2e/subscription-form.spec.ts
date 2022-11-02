import { test, expect } from "@playwright/test";

test.describe("subscription form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("can sign up to mailing list", async ({ page }) => {
    const name_input = page.locator('[name="name"]');

    name_input.scrollIntoViewIfNeeded();
    await name_input.fill("Tony");
    await page
      .locator('[name="email"]')
      .fill("layouts_main_subscription_form@tonydang.blog");
    await page.locator('text="SUBMIT"').click();

    const text =
      "Thank you for signing up for my mailing list! Please check for a confirmation sent to your inbox to verify your email.";
    await expect(page.locator(`text="${text}"`)).toHaveText(text);
  });
});
