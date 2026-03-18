import { test, expect } from "@playwright/test"

test.describe("Authentication", () => {
  test("should show sign in button when not authenticated", async ({ page }) => {
    await page.goto("/")
    const signInBtn = page.getByRole("button", { name: /sign in/i })
    await expect(signInBtn).toBeVisible()
  })

  test("should redirect to home when accessing cart without auth", async ({ page }) => {
    await page.goto("/cart")
    await expect(page).toHaveURL("/")
  })

  test("should redirect to home when accessing orders without auth", async ({ page }) => {
    await page.goto("/orders")
    await expect(page).toHaveURL("/")
  })

  test("should show add to cart button that prompts sign in", async ({ page }) => {
    await page.goto("/")
    const firstCard = page.locator("[data-testid='product-card']").first()
    await firstCard.click()
    await expect(page).toHaveURL(/\/products\//)
    const addBtn = page.getByRole("button", { name: /add to cart/i })
    await expect(addBtn).toBeVisible()
  })
})
