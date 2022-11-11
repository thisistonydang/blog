import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("HamburgeMenu", () => {
  test("is accessible when opened", async ({ page, isMobile }) => {
    test.skip(!isMobile ?? false);

    await page.goto("/");
    await page.locator('[aria-label="toggle hamburger menu"]').click();
    await page.locator("nav >> visible=true").waitFor();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include("nav")
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
