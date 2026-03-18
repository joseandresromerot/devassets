import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export const GET = async () => {
  try {
    const cart = await api.get("/api/cart")
    return NextResponse.json(cart)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch cart"
    const status = message === "Unauthorized" ? 401 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
