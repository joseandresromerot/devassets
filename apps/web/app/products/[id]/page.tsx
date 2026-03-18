import { notFound } from "next/navigation"
import Image from "next/image"
import { publicFetch } from "@/lib/api"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@devassets/types"

type Props = { params: Promise<{ id: string }> }

export default async function ProductPage({ params }: Props) {
  const { id } = await params

  let product: Product
  try {
    product = await publicFetch(`/api/products/${id}`)
  } catch {
    notFound()
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-[#27272a]">
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-sm text-[#6366f1] font-semibold uppercase tracking-wider mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-[#fafafa] mb-4">{product.name}</h1>
          <p className="text-[#a1a1aa] leading-relaxed mb-6">{product.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-[#27272a] border border-[#3f3f46]/60 text-[#a1a1aa] text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#3f3f46]/50">
              <span className="text-3xl font-bold text-[#fafafa]">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-[#71717a]">One-time purchase</span>
            </div>

            <AddToCartButton productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
