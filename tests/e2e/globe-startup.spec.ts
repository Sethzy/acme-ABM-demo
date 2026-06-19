import { expect, test } from "@playwright/test";

test("root page has one stable globe canvas and no poster placeholder", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Expand into SEA markets/i })).toBeVisible();
  await expect(page.locator(".hero-globe-placeholder")).toHaveCount(0);
  await expect(page.locator(".hero-globe-canvas canvas")).toHaveCount(1);
  await expect(page.locator(".hero-globe-canvas[data-ready='true']")).toHaveCount(1);
});

test("legacy /3d route redirects to root", async ({ page }) => {
  await page.goto("/3d");

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { name: /Expand into SEA markets/i })).toBeVisible();
});

test("reduced-motion still renders one ready static globe", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator(".hero-globe-canvas canvas")).toHaveCount(1);
  await expect(page.locator(".hero-globe-canvas[data-ready='true']")).toHaveCount(1);
});
