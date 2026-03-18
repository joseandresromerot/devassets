# DevAssets Web

Next.js 15 frontend for the DevAssets marketplace.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Auth:** NextAuth v5 with Google OAuth
- **Testing:** Vitest + React Testing Library

## Environment Variables

Create `apps/web/.env.local`:

```env
NEXTAUTH_SECRET=your-secret-here
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
```

## Getting Started

```bash
pnpm dev
```

Open http://localhost:3000.

## Project Structure

```
web/
├── app/
│   ├── api/          # API route proxies (cart, checkout)
│   ├── cart/         # Cart page
│   ├── orders/       # Order history
│   └── products/     # Product listing & detail pages
├── components/
│   ├── cart/
│   ├── layout/       # Navbar
│   └── products/     # ProductCard, CategoryFilter
├── lib/
│   ├── auth.ts       # NextAuth config
│   ├── api.ts        # Server fetch helpers
│   └── utils.ts      # formatPrice and cn utilities
└── test/             # Unit tests
```

## Testing

```bash
pnpm test
```

Tests cover:
- `ProductCard` component rendering
- `formatPrice` utility
