"use client"

import { useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { ShoppingCart, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type Props = { productId: string }

export const AddToCartButton = ({ productId }: Props) => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  const handleClick = async () => {
    if (!session) {
      signIn("google")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      })

      if (!res.ok) {
        const data = await res.json()
        toast.error(data.error || "Failed to add to cart")
        return
      }

      setAdded(true)
      toast.success("Added to cart!")
      setTimeout(() => setAdded(false), 2000)
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
        added
          ? "bg-green-600 text-white"
          : "bg-[#6366f1] text-white hover:bg-[#4f46e5]"
      )}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : added ? (
        <><Check className="w-5 h-5" /> Added to Cart</>
      ) : (
        <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
      )}
    </button>
  )
}
