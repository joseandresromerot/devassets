import type { FastifyInstance } from "fastify"
import { stripe } from "../../lib/stripe"
import { prisma } from "../../lib/prisma"
import { clearCart } from "../cart/cart.service"

export const webhooksRoutes = async (app: FastifyInstance) => {
  app.addContentTypeParser("application/json", { parseAs: "buffer" }, (req, body, done) => {
    done(null, body)
  })

  app.post("/stripe", async (request, reply) => {
    const sig = request.headers["stripe-signature"]
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!sig || !webhookSecret) {
      return reply.status(400).send({ error: "Missing stripe signature" })
    }

    let event
    try {
      event = stripe.webhooks.constructEvent(request.body as Buffer, sig, webhookSecret)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Webhook error"
      return reply.status(400).send({ error: `Webhook Error: ${message}` })
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      const userId = session.metadata?.userId

      if (!userId) return reply.status(400).send({ error: "Missing userId in metadata" })

      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } },
      })

      if (!cart || cart.items.length === 0) {
        return reply.send({ received: true })
      }

      const total = cart.items.reduce((sum, item) => sum + item.product.price, 0)

      await prisma.order.create({
        data: {
          userId,
          stripeSessionId: session.id,
          status: "COMPLETED",
          total,
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              price: item.product.price,
            })),
          },
        },
      })

      await clearCart(userId)
    }

    return reply.send({ received: true })
  })
}
