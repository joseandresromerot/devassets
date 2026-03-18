import { test, expect } from "@playwright/test"

// Note: Full cart/checkout flows require Google OAuth authentication.
// These tests cover the unauthenticated cart experience and cart page structure.
// Authenticated flows are covered by manual testing with real Google OAuth.

test.describe("Cart (unauthenticated)", () => {
  test("should redirect unauthenticated user from /cart to home", async ({ page }) => {
    await page.goto("/cart")
    await expect(page).toHaveURL("/")
  })

  test("should show sign in prompt on product page when not logged in", async ({ page }) => {
    await page.goto("/")
    const firstCard = page.locator("[data-testid='product-card']").first()
    await firstCard.click()

    // The add to cart button should either say "Add to Cart" or "Sign in to buy"
    const btn = page.getByRole("button", { name: /add to cart|sign in/i })
    await expect(btn).toBeVisible()
  })

  test("should show sign in button in navbar when not authenticated", async ({ page }) => {
    await page.goto("/")
    const signInBtn = page.getByRole("button", { name: /sign in/i })
    await expect(signInBtn).toBeVisible()
  })
})
