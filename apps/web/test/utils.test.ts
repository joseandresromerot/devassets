import { describe, it, expect } from "vitest"
import { formatPrice } from "@/lib/utils"

describe("formatPrice", () => {
  it("should format cents as USD currency", () => {
    expect(formatPrice(4900)).toBe("$49.00")
    expect(formatPrice(1999)).toBe("$19.99")
    expect(formatPrice(0)).toBe("$0.00")
  })

  it("should handle prices over $100", () => {
    expect(formatPrice(10000)).toBe("$100.00")
    expect(formatPrice(79900)).toBe("$799.00")
  })
})
