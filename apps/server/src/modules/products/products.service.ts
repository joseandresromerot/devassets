import { prisma } from "../../lib/prisma"

export const getProducts = async (category?: string) => {
  return prisma.product.findMany({
    where: category ? { category } : undefined,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  })
}

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({ where: { id } })
}
