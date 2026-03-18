import Fastify from "fastify"
import { corsPlugin } from "./plugins/cors"
import { authPlugin } from "./plugins/auth"
import { productsRoutes } from "./modules/products/products.routes"
import { cartRoutes } from "./modules/cart/cart.routes"
import { checkoutRoutes } from "./modules/checkout/checkout.routes"
import { ordersRoutes } from "./modules/orders/orders.routes"
import { webhooksRoutes } from "./modules/webhooks/webhooks.routes"

const app = Fastify({
  logger: {
    transport:
      process.env.NODE_ENV === "development"
        ? { target: "pino-pretty" }
        : undefined,
  },
})

async function bootstrap() {
  await corsPlugin(app)
  await authPlugin(app)

  // Preserve raw body for Stripe webhook signature verification
  app.addHook("preParsing", async (request, _reply, payload) => {
    const chunks: Buffer[] = []
    for await (const chunk of payload) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)))
    }
    const raw = Buffer.concat(chunks)
    ;(request as unknown as Record<string, unknown>).rawBody = raw
    const { Readable } = await import("stream")
    const stream = new Readable()
    stream.push(raw)
    stream.push(null)
    return stream
  })

  app.get("/health", async () => ({ status: "ok", version: "1.0.0" }))

  await app.register(productsRoutes, { prefix: "/api/products" })
  await app.register(cartRoutes, { prefix: "/api/cart" })
  await app.register(checkoutRoutes, { prefix: "/api/checkout" })
  await app.register(ordersRoutes, { prefix: "/api/orders" })
  await app.register(webhooksRoutes, { prefix: "/webhooks" })

  const port = Number(process.env.PORT) || 4000
  await app.listen({ port, host: "0.0.0.0" })
  app.log.info(`Server running on http://localhost:${port}`)
}

bootstrap().catch((err) => {
  process.stderr.write(`${err}\n`)
  process.exit(1)
})
