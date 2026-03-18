import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export const POST = async () => {
  try {
    const result = await api.post("/api/checkout/session")
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed"
    const status = message === "Unauthorized" ? 401 : 400
    return NextResponse.json({ error: message }, { status })
  }
}
