import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("can navigate to home page", async ({ page }) => {
    await page.goto("/posts");
    await page.locator("text=Td").click();
    await expect(page).toHaveURL("/");
    await expect(page).toHaveTitle("Tony Dang");
  });

  const nav_pages = [
    { name: "Posts", path: "/posts" },
    // { name: "About", path: "/about" },
    // { name: "Now", path: "/now" },
    // { name: "Contact", path: "/contact" },
    // { name: "Buy Me a Coffee?", path: "/support" },
  ];

  for (const nav_page of nav_pages) {
    test(`can navigate to '${nav_page.name}' page`, async ({ page }) => {
      // test.skip(isMobile ?? false);

      await page.locator(`nav >> text=${nav_page.name}`).click();
      await expect(page).toHaveURL(nav_page.path);
      await expect(page).toHaveTitle(`${nav_page.name} | Tony Dang`);
    });

    // test(`[mobile] can navigate to '${nav_page.name}' page`, async ({
    //   page,
    //   isMobile,
    // }) => {
    //   test.skip(!isMobile ?? false);

    //   await page.locator('[aria-label="toggle hamburger menu"]').click();
    //   await page
    //     .locator(`nav >> text=${nav_page.name} >> visible=true`)
    //     .click();
    //   await expect(page).toHaveURL(nav_page.path);
    //   await expect(page).toHaveTitle(`${nav_page.name} | Tony Dang`);
    // });
  }
});
