import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const products = [
  {
    name: "React Dashboard Template",
    description:
      "A fully responsive admin dashboard built with React and Tailwind CSS. Includes 15+ pages: analytics, user management, settings, and more. Dark mode included.",
    price: 4900,
    category: "template",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    fileKey: "react-dashboard.zip",
    tags: ["React", "Tailwind CSS", "TypeScript", "Dashboard"],
    featured: true,
  },
  {
    name: "Next.js SaaS Starter",
    description:
      "Production-ready SaaS boilerplate with auth, billing, and team management built-in. Includes Stripe integration, NextAuth, Prisma, and a complete onboarding flow.",
    price: 7900,
    category: "starter",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    fileKey: "nextjs-saas-starter.zip",
    tags: ["Next.js", "Stripe", "Prisma", "TypeScript"],
    featured: true,
  },
  {
    name: "Tailwind UI Component Kit",
    description:
      "50+ hand-crafted UI components built with Tailwind CSS. Buttons, forms, modals, cards, navbars, and more. Copy-paste ready, fully accessible.",
    price: 2900,
    category: "ui-kit",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    fileKey: "tailwind-ui-kit.zip",
    tags: ["Tailwind CSS", "HTML", "Components", "Accessible"],
    featured: false,
  },
  {
    name: "Icon Pack Pro",
    description:
      "1,000+ pixel-perfect icons in SVG and PNG formats. Available in outline, solid, and duotone styles. Optimized for web and mobile use.",
    price: 1900,
    category: "icon-pack",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    fileKey: "icon-pack-pro.zip",
    tags: ["SVG", "Icons", "Design Assets"],
    featured: false,
  },
  {
    name: "Landing Page Bundle",
    description:
      "5 high-converting landing page templates for SaaS, apps, and agencies. Built with Next.js and Tailwind CSS. Easy to customize and deploy to Vercel.",
    price: 3900,
    category: "template",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    fileKey: "landing-page-bundle.zip",
    tags: ["Next.js", "Tailwind CSS", "Landing Page"],
    featured: true,
  },
  {
    name: "Mobile App UI Kit",
    description:
      "A complete React Native UI kit with 80+ screens across common app patterns: onboarding, auth, feed, profile, settings, and more. iOS & Android ready.",
    price: 3400,
    category: "ui-kit",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    fileKey: "mobile-app-ui-kit.zip",
    tags: ["React Native", "Mobile", "iOS", "Android"],
    featured: false,
  },
  {
    name: "Figma Design System",
    description:
      "A production-grade Figma design system with 200+ components, 4 color themes, typography scale, spacing tokens, and developer handoff documentation.",
    price: 4900,
    category: "ui-kit",
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80",
    fileKey: "figma-design-system.zip",
    tags: ["Figma", "Design System", "Tokens", "UI"],
    featured: false,
  },
  {
    name: "Node.js API Starter",
    description:
      "Fastify + Prisma + PostgreSQL API boilerplate with JWT auth, role-based access control, request validation, and full test setup with Vitest.",
    price: 5900,
    category: "starter",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    fileKey: "nodejs-api-starter.zip",
    tags: ["Node.js", "Fastify", "Prisma", "TypeScript"],
    featured: true,
  },
]

async function main() {
  console.log("Seeding products...")
  await prisma.product.deleteMany()

  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  console.log(`Created ${products.length} products.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
