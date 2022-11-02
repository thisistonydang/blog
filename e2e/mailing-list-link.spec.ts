import { test, expect } from "@playwright/test";

test.describe("mailing list link", () => {
  const paths = ["/", "/bee-snapped"];

  for (const path of paths) {
    test(`[${path}] shows subscription form`, async ({ page }) => {
      await page.goto(path);
      await page.locator('a[href="#subscription-form"]').click();
      await expect(page.locator("#subscription-form")).toBeVisible();
    });
  }
});
