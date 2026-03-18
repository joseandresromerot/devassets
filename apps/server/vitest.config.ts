import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    fileParallelism: false,
    env: {
      DATABASE_URL: "postgresql://postgres:postgres@localhost:5434/devassets_test",
      JWT_SECRET: "test-secret",
      STRIPE_SECRET_KEY: "sk_test_placeholder",
      STRIPE_WEBHOOK_SECRET: "whsec_placeholder",
    },
  },
})
