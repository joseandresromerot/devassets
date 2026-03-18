import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest"
import { prisma } from "../../lib/prisma"
import { getProducts, getProductById } from "./products.service"

const testProduct = {
  name: "Test Template",
  description: "A test template",
  price: 2900,
  category: "template",
  imageUrl: "https://example.com/image.jpg",
  fileKey: "test.zip",
  tags: ["React", "TypeScript"],
  featured: false,
}

beforeAll(async () => {
  await prisma.product.deleteMany()
})

afterAll(async () => {
  await prisma.product.deleteMany()
  await prisma.$disconnect()
})

describe("getProducts", () => {
  beforeEach(async () => {
    await prisma.product.deleteMany()
  })

  it("should return all products when no category filter", async () => {
    await prisma.product.createMany({
      data: [
        { ...testProduct, name: "Product A", category: "template" },
        { ...testProduct, name: "Product B", category: "ui-kit" },
      ],
    })

    const products = await getProducts()
    expect(products).toHaveLength(2)
  })

  it("should filter products by category", async () => {
    await prisma.product.createMany({
      data: [
        { ...testProduct, name: "Template 1", category: "template" },
        { ...testProduct, name: "UI Kit 1", category: "ui-kit" },
      ],
    })

    const templates = await getProducts("template")
    expect(templates).toHaveLength(1)
    expect(templates[0].category).toBe("template")
  })

  it("should return featured products first", async () => {
    await prisma.product.createMany({
      data: [
        { ...testProduct, name: "Regular", featured: false },
        { ...testProduct, name: "Featured", featured: true },
      ],
    })

    const products = await getProducts()
    expect(products[0].name).toBe("Featured")
  })
})

describe("getProductById", () => {
  it("should return a product by id", async () => {
    const created = await prisma.product.create({ data: testProduct })
    const product = await getProductById(created.id)
    expect(product).not.toBeNull()
    expect(product?.name).toBe("Test Template")
  })

  it("should return null for non-existent id", async () => {
    const product = await getProductById("nonexistent-id")
    expect(product).toBeNull()
  })
})
