import { prisma } from "../../lib/prisma"

export const getOrders = async (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  })
}

export const getOrderBySessionId = async (userId: string, sessionId: string) => {
  return prisma.order.findFirst({
    where: { userId, stripeSessionId: sessionId },
    include: { items: { include: { product: true } } },
  })
}
