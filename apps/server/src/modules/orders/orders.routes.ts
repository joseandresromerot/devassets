import type { FastifyInstance } from "fastify"
import { getOrders, getOrderBySessionId } from "./orders.service"

export const ordersRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch {
      reply.status(401).send({ error: "Unauthorized" })
    }
  })

  app.get("/", async (request, reply) => {
    const { userId } = request.user as { userId: string }
    const orders = await getOrders(userId)
    return reply.send(orders)
  })

  app.get<{ Params: { sessionId: string } }>("/session/:sessionId", async (request, reply) => {
    const { userId } = request.user as { userId: string }
    const order = await getOrderBySessionId(userId, request.params.sessionId)
    if (!order) return reply.status(404).send({ error: "Order not found" })
    return reply.send(order)
  })
}
