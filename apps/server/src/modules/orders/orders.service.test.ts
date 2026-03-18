import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { prisma } from "../../lib/prisma"
import { getOrders, getOrderBySessionId } from "./orders.service"

let userId: string
let productId: string

beforeAll(async () => {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany({ where: { email: "orders-test@example.com" } })

  const user = await prisma.user.create({
    data: { email: "orders-test@example.com", name: "Orders Test User" },
  })
  userId = user.id

  const product = await prisma.product.create({
    data: {
      name: "Order Product",
      description: "desc",
      price: 2900,
      category: "template",
      imageUrl: "https://example.com/img.jpg",
      fileKey: "test.zip",
      tags: [],
      featured: false,
    },
  })
  productId = product.id

  await prisma.order.create({
    data: {
      userId,
      stripeSessionId: "cs_test_session_123",
      status: "COMPLETED",
      total: 2900,
      items: {
        create: [{ productId, price: 2900 }],
      },
    },
  })
})

afterAll(async () => {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany({ where: { email: "orders-test@example.com" } })
  await prisma.$disconnect()
})

describe("getOrders", () => {
  it("should return orders for a user", async () => {
    const orders = await getOrders(userId)
    expect(orders).toHaveLength(1)
    expect(orders[0].items).toHaveLength(1)
    expect(orders[0].status).toBe("COMPLETED")
  })

  it("should return empty array for user with no orders", async () => {
    const orders = await getOrders("nonexistent-user-id")
    expect(orders).toHaveLength(0)
  })
})

describe("getOrderBySessionId", () => {
  it("should return order by stripe session id", async () => {
    const order = await getOrderBySessionId(userId, "cs_test_session_123")
    expect(order).not.toBeNull()
    expect(order?.total).toBe(2900)
  })

  it("should return null for wrong user", async () => {
    const order = await getOrderBySessionId("wrong-user", "cs_test_session_123")
    expect(order).toBeNull()
  })
})
