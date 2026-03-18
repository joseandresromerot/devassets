import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { getCart, addItemToCart, removeItemFromCart } from "./cart.service"

export const cartRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch {
      reply.status(401).send({ error: "Unauthorized" })
    }
  })

  app.get("/", async (request, reply) => {
    const { userId } = request.user as { userId: string }
    const cart = await getCart(userId)
    return reply.send(cart)
  })

  app.post("/items", async (request, reply) => {
    const { userId } = request.user as { userId: string }
    const { productId } = z.object({ productId: z.string() }).parse(request.body)

    try {
      const cart = await addItemToCart(userId, productId)
      return reply.status(201).send(cart)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to add item"
      return reply.status(400).send({ error: message })
    }
  })

  app.delete<{ Params: { productId: string } }>("/items/:productId", async (request, reply) => {
    const { userId } = request.user as { userId: string }
    try {
      const cart = await removeItemFromCart(userId, request.params.productId)
      return reply.send(cart)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to remove item"
      return reply.status(400).send({ error: message })
    }
  })
}
