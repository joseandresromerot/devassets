import { Suspense } from "react"
import { publicFetch } from "@/lib/api"
import { ProductCard } from "@/components/products/product-card"
import { CategoryFilter } from "@/components/products/category-filter"
import type { Product } from "@devassets/types"

type Props = {
  searchParams: Promise<{ category?: string }>
}

export default async function Home({ searchParams }: Props) {
  const { category } = await searchParams
  const products: Product[] = await publicFetch(
    `/api/products${category ? `?category=${category}` : ""}`
  )

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#fafafa] mb-4 leading-tight">
          Premium Digital Assets
          <br />
          <span className="text-[#6366f1]">for Developers</span>
        </h1>
        <p className="text-[#a1a1aa] text-lg max-w-xl">
          Hand-crafted templates, UI kits, icon packs, and starter kits to accelerate your next
          project.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Suspense fallback={null}>
          <CategoryFilter />
        </Suspense>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20 text-[#71717a]">No products found.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
