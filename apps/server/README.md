# DevAssets Server

Fastify REST API for the DevAssets marketplace.

## Stack

- **Framework:** Fastify v5
- **Language:** TypeScript
- **ORM:** Prisma 6
- **Database:** PostgreSQL
- **Payments:** Stripe
- **Testing:** Vitest (integration tests against real DB)

## Environment Variables

Create `apps/server/.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/devassets
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PORT=3001
```

## Getting Started

```bash
# Run migrations
pnpm exec prisma migrate dev

# Seed products
pnpm exec prisma db seed

# Start server
pnpm dev
```

API available at http://localhost:3001.

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/products` | No | List all products |
| GET | `/api/products/:id` | No | Get product by ID |
| GET | `/api/cart` | Yes | Get user's cart |
| POST | `/api/cart/items` | Yes | Add item to cart |
| DELETE | `/api/cart/items/:productId` | Yes | Remove item from cart |
| POST | `/api/checkout/session` | Yes | Create Stripe checkout session |
| GET | `/api/orders` | Yes | Get user's orders |
| GET | `/api/orders/:sessionId` | Yes | Get order by Stripe session ID |
| POST | `/api/webhooks/stripe` | No | Stripe webhook handler |

## Testing

```bash
# Start test database first
docker compose up -d

# Run tests
pnpm test
```

Tests use a separate `devassets_test` database (port 5434). Each test file manages its own setup/teardown against the real database — no mocks.

Test coverage:
- `products.service` — list and get by ID
- `cart.service` — create cart, add/remove items, clear
- `orders.service` — get orders, get by Stripe session ID
