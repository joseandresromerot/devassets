export type ProductCategory = "template" | "ui-kit" | "icon-pack" | "starter"

export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: ProductCategory
  imageUrl: string
  tags: string[]
  featured: boolean
  createdAt: string
}

export type CartItem = {
  id: string
  product: Product
  createdAt: string
}

export type Cart = {
  id: string
  items: CartItem[]
}

export type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED"

export type OrderItem = {
  id: string
  price: number
  product: Product
}

export type Order = {
  id: string
  stripeSessionId: string
  status: OrderStatus
  total: number
  createdAt: string
  items: OrderItem[]
}
