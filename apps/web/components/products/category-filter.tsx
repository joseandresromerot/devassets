"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

const categories = [
  { value: "", label: "All" },
  { value: "template", label: "Templates" },
  { value: "ui-kit", label: "UI Kits" },
  { value: "starter", label: "Starters" },
  { value: "icon-pack", label: "Icon Packs" },
]

export const CategoryFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get("category") ?? ""

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) params.set("category", value)
    else params.delete("category")
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleChange(cat.value)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer",
            current === cat.value
              ? "bg-[#6366f1] text-white"
              : "bg-[#27272a] text-[#a1a1aa] border border-[#3f3f46]/60 hover:text-[#fafafa]"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
