import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { createCheckoutSession } from "./checkout.service"

export const checkoutRoutes = async (app: FastifyInstance) => {
  app.post("/session", async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch {
      return reply.status(401).send({ error: "Unauthorized" })
    }

    const { userId } = request.user as { userId: string }
    const webUrl = process.env.WEB_URL || "http://localhost:3000"

    const bodySchema = z.object({
      successUrl: z.string().url().optional(),
      cancelUrl: z.string().url().optional(),
    })

    const { successUrl, cancelUrl } = bodySchema.parse(request.body ?? {})

    try {
      const result = await createCheckoutSession(
        userId,
        successUrl ?? `${webUrl}/checkout/success`,
        cancelUrl ?? `${webUrl}/cart`
      )
      return reply.send(result)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Checkout failed"
      return reply.status(400).send({ error: message })
    }
  })
}
