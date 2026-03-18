import Link from "next/link"
import { XCircle } from "lucide-react"

export default function CancelPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
          <XCircle className="w-10 h-10 text-red-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#fafafa] mb-2">Payment Cancelled</h1>
          <p className="text-[#a1a1aa]">
            Your payment was cancelled. Your cart has been saved.
          </p>
        </div>
        <div className="flex gap-3 w-full">
          <Link
            href="/cart"
            className="flex-1 py-2.5 rounded-xl bg-[#6366f1] text-white text-sm font-semibold text-center hover:bg-[#4f46e5] transition-colors"
          >
            Return to Cart
          </Link>
          <Link
            href="/"
            className="flex-1 py-2.5 rounded-xl border border-[#3f3f46] text-[#a1a1aa] text-sm font-semibold text-center hover:text-[#fafafa] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}
