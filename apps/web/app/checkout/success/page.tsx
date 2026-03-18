import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { api } from "@/lib/api"
import { formatPrice } from "@/lib/utils"
import type { Order } from "@devassets/types"

type Props = { searchParams: Promise<{ session_id?: string }> }

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams

  let order: Order | null = null
  if (session_id) {
    try {
      order = await api.get(`/api/orders/session/${session_id}`)
    } catch {
      // order might still be processing
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-[#fafafa] mb-2">Payment Successful!</h1>
          <p className="text-[#a1a1aa]">
            Thank you for your purchase. Your assets are ready to download.
          </p>
        </div>

        {order && (
          <div className="w-full p-5 rounded-2xl bg-[#18181b] border border-[#3f3f46]/50 text-left">
            <h2 className="font-semibold text-[#fafafa] mb-3">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-[#a1a1aa]">{item.product.name}</span>
                  <span className="text-[#fafafa]">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#3f3f46] pt-3 flex justify-between font-bold">
              <span className="text-[#fafafa]">Total</span>
              <span className="text-[#fafafa]">{formatPrice(order.total)}</span>
            </div>
          </div>
        )}

        <div className="flex gap-3 w-full">
          <Link
            href="/orders"
            className="flex-1 py-2.5 rounded-xl bg-[#6366f1] text-white text-sm font-semibold text-center hover:bg-[#4f46e5] transition-colors"
          >
            View My Orders
          </Link>
          <Link
            href="/"
            className="flex-1 py-2.5 rounded-xl border border-[#3f3f46] text-[#a1a1aa] text-sm font-semibold text-center hover:text-[#fafafa] hover:border-[#6366f1]/40 transition-colors"
          >
            Browse More
          </Link>
        </div>
      </div>
    </div>
  )
}
