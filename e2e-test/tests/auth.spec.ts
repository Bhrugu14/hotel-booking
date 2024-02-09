import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("Should Allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Login User" })).toBeVisible();
  await page.locator("[name=email]").fill("bhrugu@test.com");
  await page.locator("[name=password]").fill("password123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
});

test("Should Allow the user to register", async ({ page }) => {
  const testEmail = `test-register-${Math.random() * 90000 + 10000}@test.com`;
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Login User" })).toBeVisible();
  await page.getByRole("link", { name: "Register" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();
  await page.locator("[name=firstName]").fill("Hello");
  await page.locator("[name=lastName]").fill("Testing");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
});
