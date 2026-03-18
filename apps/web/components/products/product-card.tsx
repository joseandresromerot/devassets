import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@devassets/types"

type Props = { product: Product }

export const ProductCard = ({ product }: Props) => (
  <Link
    href={`/products/${product.id}`}
    className="group flex flex-col rounded-2xl bg-[#18181b] border border-[#3f3f46]/50 overflow-hidden hover:border-[#6366f1]/40 transition-all duration-300 hover:-translate-y-1"
  >
    <div className="relative h-48 bg-[#27272a] overflow-hidden">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {product.featured && (
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#6366f1] text-white text-xs font-semibold">
          Featured
        </span>
      )}
    </div>

    <div className="flex flex-col flex-1 p-5">
      <span className="text-xs text-[#6366f1] font-semibold uppercase tracking-wider mb-1">
        {product.category}
      </span>
      <h3 className="font-bold text-[#fafafa] mb-2 group-hover:text-[#6366f1] transition-colors">
        {product.name}
      </h3>
      <p className="text-sm text-[#71717a] leading-relaxed flex-1 line-clamp-2">
        {product.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
        {product.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md bg-[#27272a] border border-[#3f3f46]/60 text-[#a1a1aa] text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#3f3f46]/50">
        <span className="text-xl font-bold text-[#fafafa]">{formatPrice(product.price)}</span>
        <span className="text-sm text-[#6366f1] font-medium group-hover:underline">
          View details →
        </span>
      </div>
    </div>
  </Link>
)
