# DevAssets

A digital marketplace for developers to buy and sell premium digital assets — templates, UI kits, icon packs, and more.

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS v4 |
| Backend | Fastify, TypeScript, Node.js |
| Database | PostgreSQL, Prisma ORM |
| Auth | NextAuth v5 (Google OAuth) |
| Payments | Stripe Checkout |
| Monorepo | pnpm workspaces |

## Project Structure

```
devassets/
├── apps/
│   ├── web/          # Next.js frontend
│   └── server/       # Fastify REST API
├── packages/
│   └── types/        # Shared TypeScript types
├── e2e/              # Playwright E2E tests
└── docker-compose.yml
```

## Prerequisites

- Node.js 22+
- pnpm 10+
- Docker (for local PostgreSQL)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start PostgreSQL
docker compose up -d

# Set up environment variables (see apps/web/.env.local and apps/server/.env)

# Run database migrations & seed
cd apps/server
pnpm exec prisma migrate dev
pnpm exec prisma db seed

# Start development servers
pnpm dev
```

- Web: http://localhost:3000
- API: http://localhost:3001

## Testing

```bash
# Backend integration tests (requires Docker running)
pnpm --filter @devassets/server test

# Frontend unit tests
pnpm --filter @devassets/web test

# E2E tests (requires web running on localhost:3000)
pnpm test:e2e
```

## Key Features

- Browse and purchase digital products
- Google OAuth authentication
- Server-side cart stored in database
- Stripe Checkout for payments
- Webhook-based order confirmation
- Order history per user
