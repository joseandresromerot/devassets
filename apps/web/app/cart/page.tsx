import { api } from "@/lib/api"
import { CartView } from "@/components/cart/cart-view"
import type { Cart } from "@devassets/types"

export default async function CartPage() {
  let cart: Cart
  try {
    cart = await api.get("/api/cart")
  } catch {
    cart = { id: "", items: [] }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
      <h1 className="text-3xl font-bold text-[#fafafa] mb-8">Your Cart</h1>
      <CartView initialCart={cart} />
    </div>
  )
}
