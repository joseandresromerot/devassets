import { Package } from "lucide-react"

export const Footer = () => (
  <footer className="border-t border-[#3f3f46]/50 bg-[#09090b] py-8 mt-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-[#6366f1] flex items-center justify-center">
          <Package className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm font-semibold text-[#fafafa]">DevAssets</span>
      </div>
      <p className="text-sm text-[#71717a]">
        © {new Date().getFullYear()} DevAssets. Premium digital assets for developers.
      </p>
    </div>
  </footer>
)
