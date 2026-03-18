"use client"

import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { ShoppingCart, LogIn, LogOut, Package, User } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export const Navbar = () => {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#3f3f46]/50 bg-[#09090b]/90 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#6366f1] flex items-center justify-center">
            <Package className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-[#fafafa] text-lg">DevAssets</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
          >
            Browse
          </Link>
          {session && (
            <Link
              href="/orders"
              className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
            >
              Orders
            </Link>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {session && (
            <Link
              href="/cart"
              className="flex items-center gap-1.5 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
            </Link>
          )}

          {session ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 cursor-pointer"
              >
                {session.user?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "User"}
                    className="w-8 h-8 rounded-full border border-[#3f3f46]"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#27272a] border border-[#3f3f46] flex items-center justify-center">
                    <User className="w-4 h-4 text-[#a1a1aa]" />
                  </div>
                )}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#18181b] border border-[#3f3f46] rounded-xl shadow-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#3f3f46]">
                    <p className="text-sm font-medium text-[#fafafa] truncate">
                      {session.user?.name}
                    </p>
                    <p className="text-xs text-[#71717a] truncate">{session.user?.email}</p>
                  </div>
                  <Link
                    href="/orders"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a] transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    My Orders
                  </Link>
                  <button
                    onClick={() => { setMenuOpen(false); signOut() }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a] transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn("google", { callbackUrl: window.location.href })}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors",
                "bg-[#6366f1] text-white hover:bg-[#4f46e5]"
              )}
            >
              <LogIn className="w-4 h-4" />
              Sign in
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
