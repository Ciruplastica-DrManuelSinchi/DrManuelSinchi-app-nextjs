# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Medical/aesthetic clinic website for "Ciruplástica" (Dr. Manuel Sinchi) - a plastic surgery, aesthetic medicine, and reconstructive surgery practice in Lima, Peru. Built with Next.js 14 App Router.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

### Tech Stack
- Next.js 14 with App Router (TypeScript)
- Tailwind CSS with custom design tokens
- Framer Motion for animations
- lucide-react for icons

### Route Structure
The site uses file-based routing organized by medical procedure categories:
- `/cirugia-plastica-facial/[procedure]` - Facial procedures (rinoplastia, blefaroplastia, etc.)
- `/cirugia-plastica-corporal/[procedure]` - Body procedures (lipoescultura, mamoplastia, etc.)
- `/medicina-estetica/[procedure]` - Aesthetic medicine (botox, acido-hialuronico, etc.)
- `/cirugia-reconstructiva/[procedure]` - Reconstructive surgery

### ProcedurePage Template Pattern
Individual procedure pages use a reusable template system:

1. **Template**: `src/app/components/templates/procedure-page/ProcedurePage.tsx` - Full-page component with hero, info, benefits, before/after gallery, doctor section, process timeline, videos, FAQ, and CTA sections.

2. **Types**: `src/app/components/templates/procedure-page/types.ts` - Defines `ProcedureData` interface and default values for doctor/CTA sections.

3. **Usage**: Each procedure page (e.g., `rinoplastia/page.tsx`) defines a `ProcedureData` object and passes it to `<ProcedurePage data={...} />`.

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
Static data lives in `src/data/`:
- `navigation.ts` - Menu structure
- `procedures.ts` - Procedure listings
- `testimonials.ts` - Patient testimonials
- `faq.ts` - FAQ content

### Design System
Custom Tailwind config in `tailwind.config.ts` defines:
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
