import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isAuthenticated = !!req.auth
  const isProtected = ["/cart", "/orders", "/checkout"].some((path) =>
    req.nextUrl.pathname.startsWith(path)
  )

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
