import { expect, test } from "@playwright/test";

test("landing page renders and validates required fields", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Scan 2 Pass")).toBeVisible();

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByText("Email is required.")).toBeVisible();
  await expect(page.getByText("First name is required.")).toBeVisible();
  await expect(page.getByText("Last name is required.")).toBeVisible();
});
