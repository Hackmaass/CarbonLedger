import { test, expect } from "@playwright/test";

test("Carbon footprint calculation flow", async ({ page }) => {
  // Mock the calculate API
  await page.route("**/api/calculate", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        total_annual_kg: 5000,
        total_annual_tonnes: 5.0,
        breakdown_kg: {
          transport: 2000,
          home: 1500,
          diet: 1000,
          consumption: 500,
        },
        comparison: {
          ratio_to_global_average: 1.1,
          ratio_to_sustainable_target: 2.0,
          sustainable_target_annual_kg: 2500,
        },
      }),
    });
  });

  // Start at the home page
  await page.goto("http://localhost:5173/");

  // Navigate to AI Analysis
  await page.getByRole("link", { name: /AI Analysis/i }).click();

  // Check the title
  await expect(page.getByRole("heading", { name: "AI Analysis" })).toBeVisible();

  // Fill the form (assuming default inputs are fine, we just click submit)
  await page.getByRole("button", { name: /Calculate footprint/i }).click();

  // Wait for the result section
  const resultHeading = page.getByRole("heading", { name: "Your estimated footprint" });
  await expect(resultHeading).toBeVisible();

  // Verify focus management moved to the result section
  await expect(page.getByRole("region", { name: "Your estimated footprint" })).toBeFocused();

  // Check that the mocked values appear
  await expect(page.getByText("5.0 CO₂e")).toBeVisible();
});
