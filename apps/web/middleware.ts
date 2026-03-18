import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

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
