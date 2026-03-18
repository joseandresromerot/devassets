import { prisma } from "../../lib/prisma"

const getOrCreateCart = async (userId: string) => {
  const existing = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  })
  if (existing) return existing

  return prisma.cart.create({
    data: { userId },
    include: { items: { include: { product: true } } },
  })
}

export const getCart = async (userId: string) => {
  return getOrCreateCart(userId)
}

export const addItemToCart = async (userId: string, productId: string) => {
  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) throw new Error("Product not found")

  const cart = await getOrCreateCart(userId)

  const existingItem = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  })
  if (existingItem) throw new Error("Product already in cart")

  await prisma.cartItem.create({
    data: { cartId: cart.id, productId },
  })

  return getCart(userId)
}

export const removeItemFromCart = async (userId: string, productId: string) => {
  const cart = await prisma.cart.findUnique({ where: { userId } })
  if (!cart) throw new Error("Cart not found")

  await prisma.cartItem.delete({
    where: { cartId_productId: { cartId: cart.id, productId } },
  })

  return getCart(userId)
}

export const clearCart = async (userId: string) => {
  const cart = await prisma.cart.findUnique({ where: { userId } })
  if (!cart) return
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
}
