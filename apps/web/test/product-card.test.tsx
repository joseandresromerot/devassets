import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ProductCard } from "@/components/products/product-card"
import type { Product } from "@devassets/types"

const mockProduct: Product = {
  id: "prod-1",
  name: "React Dashboard",
  description: "A great dashboard template",
  price: 4900,
  category: "template",
  imageUrl: "https://example.com/img.jpg",
  tags: ["React", "TypeScript"],
  featured: true,
  createdAt: new Date().toISOString(),
}

describe("ProductCard", () => {
  it("should render product name and price", () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText("React Dashboard")).toBeInTheDocument()
    expect(screen.getByText("$49.00")).toBeInTheDocument()
  })

  it("should render Featured badge when product is featured", () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText("Featured")).toBeInTheDocument()
  })

  it("should not render Featured badge for non-featured products", () => {
    render(<ProductCard product={{ ...mockProduct, featured: false }} />)
    expect(screen.queryByText("Featured")).not.toBeInTheDocument()
  })

  it("should render product tags", () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
  })

  it("should render link to product detail page", () => {
    render(<ProductCard product={mockProduct} />)
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/products/prod-1")
  })
})
