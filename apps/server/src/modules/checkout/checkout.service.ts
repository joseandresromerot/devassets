import { stripe } from "../../lib/stripe"
import { prisma } from "../../lib/prisma"

export const createCheckoutSession = async (userId: string, successUrl: string, cancelUrl: string) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  })

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty")
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error("User not found")

  const lineItems = cart.items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.name,
        description: item.product.description.slice(0, 500),
        images: [item.product.imageUrl],
        metadata: { productId: item.product.id },
      },
      unit_amount: item.product.price,
    },
    quantity: 1,
  }))

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: user.email,
    line_items: lineItems,
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    metadata: { userId },
  })

  return { url: session.url, sessionId: session.id }
}
