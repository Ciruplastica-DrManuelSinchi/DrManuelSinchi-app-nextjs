# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Medical/aesthetic clinic website for "Ciruplástica" (Dr. Manuel Sinchi) - a plastic surgery, aesthetic medicine, and reconstructive surgery practice in Lima, Peru. Built with Next.js 14 App Router.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build (runs prisma generate first)
npm run lint     # Run ESLint
npm run start    # Start production server
npx prisma db push    # Push schema changes to database
npx prisma studio     # Open Prisma Studio GUI
npx tsx prisma/seed.ts  # Seed database
```

## Architecture

### Tech Stack
- Next.js 14 with App Router (TypeScript)
- Tailwind CSS with custom design tokens
- Framer Motion for animations
- Prisma ORM with PostgreSQL
- NextAuth.js v5 (beta) for authentication
- next-intl for i18n (es/en, locale prefix `as-needed`)
- Cloudinary for image uploads
- Resend for transactional emails
- TipTap for rich text editing (blog)
- Culqi for payment processing (Peru)

### Route Groups & Authentication

The app uses Next.js route groups to separate concerns:

- `(auth)/` — Login, register, password reset pages. Redirects to dashboard/admin if already authenticated.
- `(protected)/` — Authenticated routes (dashboard, profile, admin). Uses `SessionProvider` wrapper. Admin routes (`/admin/*`) get their own layout without Header/Footer.
- Root-level procedure routes — Public pages (`/cirugia-plastica-facial/...`, `/blog`, `/reservar`, etc.) served without locale prefix.

**Middleware** (`src/middleware.ts`) handles:
- Role-based redirects: ADMINs accessing public pages → `/admin`; patients accessing `/admin` → `/dashboard`
- Auth guards on protected routes
- i18n locale detection via cookie (`NEXT_LOCALE`), defaulting to `es`
- Dynamic category rewrites: unknown 1-2 segment paths rewrite to `/categoria/[slug]` internally

### ProcedurePage Template Pattern

Individual procedure pages use a reusable template:

1. **Template**: `src/app/components/templates/procedure-page/ProcedurePage.tsx` — Full-page component with hero, info, benefits, before/after gallery, doctor section, process timeline, videos, FAQ, and CTA sections.
2. **Types**: `src/app/components/templates/procedure-page/types.ts` — `ProcedureData` interface and default values.
3. **Usage**: Each procedure page defines a `ProcedureData` object and renders `<ProcedurePage data={...} />`.

### Component Organization
```
src/app/components/
├── landing/          # Landing page sections (hero, trust-bar, procedures, etc.)
├── layout/           # Header, Footer, WhatsAppButton, MobileMenu
├── shared/           # Reusable cards (ProcedureCard, TestimonialCard, VideoCard)
├── templates/        # Full-page templates (procedure-page)
└── ui/               # Primitives (Button, Card, Badge, Accordion, ImageSlider)
```

Each component has its own folder with a `.tsx` file and corresponding `.module.css` for styles.

### Data Layer

**Database (Prisma)**: Users, Bookings, Payments, Procedures, ProcedureCategories, RealCases (before/after), BlockedSlots, BlogPosts, BlogCategories. Schema in `prisma/schema.prisma`.

**Static data** in `src/data/`: navigation, procedures, testimonials, FAQ content.

**API routes** in `src/app/api/`:
- `auth/` — Registration, email verification, password reset
- `admin/` — CRUD for procedures, categories, users, bookings, cases, stats
- `bookings/` — Patient booking flow with availability checks, payment, cancellation
- `blog/` — Blog posts and categories
- `upload/` — Cloudinary image uploads
- `cron/cleanup-holds` — Expires unpaid bookings

### Key Libraries (`src/lib/`)
- `auth.ts` — NextAuth configuration
- `prisma.ts` — Prisma client singleton
- `cloudinary.ts` — Image upload helpers
- `google-calendar.ts` — Calendar event sync for bookings
- `email.ts` — Resend email sending
- `excel-generator.ts`, `pdf-generator.ts` — Export reports

### Design System
Custom Tailwind config in `tailwind.config.ts`:
- **Colors**: `primary` (purple #391142) and `accent` (gold #d4a853) palettes
- **Fonts**: `font-display` (Playfair Display) for headings, `font-body` (Montserrat) for text
- **Shadows**: `shadow-soft`, `shadow-medium`, `shadow-strong`, `shadow-card`
- **Gradients**: `bg-hero-gradient`, `bg-cta-gradient`

### Path Alias
`@/*` maps to `./src/*` (configured in tsconfig.json)

## Adding a New Procedure Page

1. Create `src/app/[category]/[procedure]/page.tsx`
2. Define `ProcedureData` object with required fields (hero, info, benefits, process, faqs, etc.)
3. Export default component: `<ProcedurePage data={procedureData} />`
4. Add procedure images to `public/images/procedures/`
