import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("a11y", () => {
  const paths = [
    // Pages.
    "/",
    "/list/unsubscribe/success",
    "/list/verify/expired",
    "/list/verify/success",
    "/posts",
    "/projects",
    "/whoops",
    // Posts
    "/bee-snapped",
    "/ifsc-ages",
    "/ifsc-heights",
    "/ifsc-shoes",
    "/relay-results",
    "/subielife",
    // Projects
    "/climbing-board",
    "/particles",
  ];

  for (const path of paths) {
    test(`'${path}' is accessible`, async ({ page }) => {
      await page.goto(path);
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
