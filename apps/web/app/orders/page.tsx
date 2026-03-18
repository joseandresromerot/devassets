import { api } from "@/lib/api"
import { formatPrice } from "@/lib/utils"
import { Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Order } from "@devassets/types"

export default async function OrdersPage() {
  let orders: Order[] = []
  try {
    orders = await api.get("/api/orders")
  } catch {
    orders = []
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
      <h1 className="text-3xl font-bold text-[#fafafa] mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <Package className="w-16 h-16 text-[#3f3f46]" />
          <h2 className="text-xl font-semibold text-[#fafafa]">No orders yet</h2>
          <p className="text-[#71717a]">Your purchase history will appear here.</p>
          <Link
            href="/"
            className="mt-2 px-6 py-2.5 rounded-xl bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#4f46e5] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl bg-[#18181b] border border-[#3f3f46]/50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#3f3f46]/50">
                <div>
                  <span className="text-xs text-[#71717a]">Order ID</span>
                  <p className="text-sm font-mono text-[#a1a1aa]">{order.id.slice(0, 16)}...</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#71717a]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <p className="text-lg font-bold text-[#fafafa]">{formatPrice(order.total)}</p>
                </div>
              </div>

              <div className="divide-y divide-[#3f3f46]/30">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#27272a] shrink-0">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#fafafa] truncate">{item.product.name}</p>
                      <p className="text-xs text-[#6366f1] uppercase tracking-wide">
                        {item.product.category}
                      </p>
                    </div>
                    <span className="text-[#fafafa] font-semibold shrink-0">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
