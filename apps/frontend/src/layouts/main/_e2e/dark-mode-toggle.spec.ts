import { test, expect } from "@playwright/test";

test.describe("dark mode toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("can toggle dark mode", async ({ page }) => {
    const html = page.locator("html");

    await page.locator('[aria-label="dark mode toggle"]').click();
    await expect(html).toHaveClass(/dark/);

    await page.locator('[aria-label="dark mode toggle"]').click();
    await expect(html).not.toHaveClass(/dark/);
  });
});
