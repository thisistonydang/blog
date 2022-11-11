import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("a11y", () => {
  const paths = ["/", "/posts", "/about", "/now", "/contact", "/support"];

  for (const path of paths) {
    test(`'${path}' is accessible`, async ({ page }) => {
      await page.goto(path);
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
