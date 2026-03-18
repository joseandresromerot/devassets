import { NextRequest, NextResponse } from "next/server"
import { api } from "@/lib/api"

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) => {
  try {
    const { productId } = await params
    const cart = await api.delete(`/api/cart/items/${productId}`)
    return NextResponse.json(cart)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to remove item"
    const status = message === "Unauthorized" ? 401 : 400
    return NextResponse.json({ error: message }, { status })
  }
}
