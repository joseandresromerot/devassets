import { NextRequest, NextResponse } from "next/server"
import { api } from "@/lib/api"

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const cart = await api.post("/api/cart/items", body)
    return NextResponse.json(cart, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to add item"
    const status = message === "Unauthorized" ? 401 : 400
    return NextResponse.json({ error: message }, { status })
  }
}
