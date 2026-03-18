import { test, expect } from "@playwright/test"

test.describe("Products browsing", () => {
  test("should display products on the home page", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("heading", { name: /premium digital assets/i })).toBeVisible()
    await expect(page.locator("[data-testid='product-card']").first()).toBeVisible()
  })

  test("should navigate to product detail page", async ({ page }) => {
    await page.goto("/")
    const firstCard = page.locator("[data-testid='product-card']").first()
    await firstCard.click()
    await expect(page).toHaveURL(/\/products\//)
    await expect(page.getByRole("heading")).toBeVisible()
  })

  test("should display product price in USD format", async ({ page }) => {
    await page.goto("/")
    const priceEl = page.locator("[data-testid='product-price']").first()
    await expect(priceEl).toBeVisible()
    await expect(priceEl).toContainText("$")
  })

  test("should show featured badge on featured products", async ({ page }) => {
    await page.goto("/")
    const featured = page.getByText("Featured").first()
    await expect(featured).toBeVisible()
  })

  test("should filter products by category", async ({ page }) => {
    await page.goto("/products")
    const templateFilter = page.getByRole("button", { name: /template/i })
    if (await templateFilter.isVisible()) {
      await templateFilter.click()
      const cards = page.locator("[data-testid='product-card']")
      await expect(cards.first()).toBeVisible()
    }
  })
})
