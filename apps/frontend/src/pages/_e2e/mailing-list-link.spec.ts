import { test, expect } from "@playwright/test";

test.describe("home page mailing list link", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows subscription form", async ({ page }) => {
    const subscription_form = page.locator("#subscription-form");

    await page.locator('a[href="#subscription-form"]').click();

    await expect(subscription_form).toBeVisible();
  });
});
