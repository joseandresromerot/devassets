import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest"
import { prisma } from "../../lib/prisma"
import { getCart, addItemToCart, removeItemFromCart, clearCart } from "./cart.service"

const testProduct = {
  name: "Test Product",
  description: "desc",
  price: 1900,
  category: "template",
  imageUrl: "https://example.com/img.jpg",
  fileKey: "test.zip",
  tags: [],
  featured: false,
}

let userId: string
let productId: string

beforeAll(async () => {
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany({ where: { email: "cart-test@example.com" } })

  const user = await prisma.user.create({
    data: { email: "cart-test@example.com", name: "Cart Test User" },
  })
  userId = user.id

  const product = await prisma.product.create({ data: testProduct })
  productId = product.id
})

afterAll(async () => {
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany({ where: { email: "cart-test@example.com" } })
  await prisma.$disconnect()
})

beforeEach(async () => {
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany({ where: { userId } })
})

describe("getCart", () => {
  it("should create a cart if none exists", async () => {
    const cart = await getCart(userId)
    expect(cart).toBeDefined()
    expect(cart.userId).toBe(userId)
    expect(cart.items).toHaveLength(0)
  })

  it("should return existing cart", async () => {
    await getCart(userId)
    const cart = await getCart(userId)
    expect(cart.userId).toBe(userId)
  })
})

describe("addItemToCart", () => {
  it("should add a product to the cart", async () => {
    const cart = await addItemToCart(userId, productId)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].product.id).toBe(productId)
  })

  it("should throw if product does not exist", async () => {
    await expect(addItemToCart(userId, "nonexistent-id")).rejects.toThrow("Product not found")
  })

  it("should throw if product already in cart", async () => {
    await addItemToCart(userId, productId)
    await expect(addItemToCart(userId, productId)).rejects.toThrow("Product already in cart")
  })
})

describe("removeItemFromCart", () => {
  it("should remove a product from the cart", async () => {
    await addItemToCart(userId, productId)
    const cart = await removeItemFromCart(userId, productId)
    expect(cart.items).toHaveLength(0)
  })
})

describe("clearCart", () => {
  it("should remove all items from the cart", async () => {
    await addItemToCart(userId, productId)
    await clearCart(userId)
    const cart = await getCart(userId)
    expect(cart.items).toHaveLength(0)
  })
})
