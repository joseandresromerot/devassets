"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingBag, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { formatPrice } from "@/lib/utils"
import type { Cart } from "@devassets/types"

type Props = { initialCart: Cart }

export const CartView = ({ initialCart }: Props) => {
  const [cart, setCart] = useState(initialCart)
  const [checkingOut, setCheckingOut] = useState(false)
  const [removing, setRemoving] = useState<string | null>(null)

  const total = cart.items.reduce((sum, item) => sum + item.product.price, 0)

  const removeItem = async (productId: string) => {
    setRemoving(productId)
    try {
      const res = await fetch(`/api/cart/items/${productId}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      const updated: Cart = await res.json()
      setCart(updated)
      toast.success("Item removed")
    } catch {
      toast.error("Failed to remove item")
    } finally {
      setRemoving(null)
    }
  }

  const checkout = async () => {
    setCheckingOut(true)
    try {
      const res = await fetch("/api/checkout/session", { method: "POST" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      window.location.href = data.url
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Checkout failed")
      setCheckingOut(false)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <ShoppingBag className="w-16 h-16 text-[#3f3f46]" />
        <h2 className="text-xl font-semibold text-[#fafafa]">Your cart is empty</h2>
        <p className="text-[#71717a]">Browse our products and add something you love.</p>
        <Link
          href="/"
          className="mt-2 px-6 py-2.5 rounded-xl bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#4f46e5] transition-colors"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Items */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {cart.items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 p-4 rounded-2xl bg-[#18181b] border border-[#3f3f46]/50"
          >
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#27272a] shrink-0">
              <Image
                src={item.product.imageUrl}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.product.id}`}
                className="font-semibold text-[#fafafa] hover:text-[#6366f1] transition-colors line-clamp-1"
              >
                {item.product.name}
              </Link>
              <p className="text-xs text-[#6366f1] uppercase tracking-wide mt-0.5">
                {item.product.category}
              </p>
              <p className="text-lg font-bold text-[#fafafa] mt-2">
                {formatPrice(item.product.price)}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.product.id)}
              disabled={removing === item.product.id}
              className="text-[#71717a] hover:text-red-400 transition-colors cursor-pointer disabled:opacity-50 self-start"
            >
              {removing === item.product.id ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="h-fit p-6 rounded-2xl bg-[#18181b] border border-[#3f3f46]/50">
        <h2 className="text-lg font-bold text-[#fafafa] mb-4">Order Summary</h2>
        <div className="space-y-2 mb-6">
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-[#a1a1aa] truncate mr-4">{item.product.name}</span>
              <span className="text-[#fafafa] shrink-0">{formatPrice(item.product.price)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-[#3f3f46] pt-4 mb-6 flex justify-between">
          <span className="font-bold text-[#fafafa]">Total</span>
          <span className="font-bold text-xl text-[#fafafa]">{formatPrice(total)}</span>
        </div>
        <button
          onClick={checkout}
          disabled={checkingOut}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#6366f1] text-white font-semibold hover:bg-[#4f46e5] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {checkingOut ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
          ) : (
            "Checkout"
          )}
        </button>
        <p className="text-xs text-[#71717a] text-center mt-3">Powered by Stripe</p>
      </div>
    </div>
  )
}
