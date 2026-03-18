import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { getProducts, getProductById } from "./products.service"

export const productsRoutes = async (app: FastifyInstance) => {
  app.get("/", async (request, reply) => {
    const querySchema = z.object({
      category: z.string().optional(),
    })
    const { category } = querySchema.parse(request.query)
    const products = await getProducts(category)
    return reply.send(products)
  })

  app.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const product = await getProductById(request.params.id)
    if (!product) return reply.status(404).send({ error: "Product not found" })
    return reply.send(product)
  })
}
