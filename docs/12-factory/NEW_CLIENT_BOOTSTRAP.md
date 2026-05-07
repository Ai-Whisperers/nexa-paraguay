# New Client Bootstrap — The Factory Playbook

**Status:** Draft | **Last validated:** 2026-05-07 | **Scope:** Creating a new client site from the Core Framework

---

## Overview

This is the step-by-step process for scaffolding a new client site using the `@ai-whisperers/*` Core Framework pattern. Nexa Paraguay is the reference implementation — follow its structure.

## Prerequisites

- Access to `@ai-whisperers/*` Core Framework (GitHub Packages or local `file:` link)
- VPS with Docker Swarm + Traefik configured
- Cloudflare account for DNS + CDN
- Domain name pointed to VPS
- Content brief from client (target audience, services, brand colors)

## Step 1: Scaffold the Repository

```bash
# Create repo from template
mkdir client-name && cd client-name
git init
npm init -y

# Copy reference structure from nexa-paraguay
cp -r /root/nexa-paraguay/src .
cp -r /root/nexa-paraguay/public .
cp -r /root/nexa-paraguay/content .
cp -r /root/nexa-paraguay/nexa-pages .
cp -r /root/nexa-paraguay/docs .
cp /root/nexa-paraguay/tsconfig.json .
cp /root/nexa-paraguay/next.config.js .
cp /root/nexa-paraguay/Dockerfile .
cp /root/nexa-paraguay/docker-compose.yml .
```

## Step 2: Configure Package Dependencies

Add `@ai-whisperers/*` packages to `package.json`. Only add what's needed:

```json
{
  "dependencies": {
    "@ai-whisperers/client-kit": "^0.1.0",
    "next": "^16.2.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

Key rule: Only import packages you actually use. Nexa currently imports 9 but only uses 1 (`client-kit`). The other 8 are candidates for removal.

## Step 3: Configure Brand Theme

Edit `src/theme.ts` with client colors:

```typescript
export const theme = {
  colors: {
    primary: '#CLIENT_NAVY',     // ← Change this
    accent: '#CLIENT_GOLD',       // ← Change this
    bg: '#CLIENT_LIGHT',          // ← Change this
    // ... keep rest
  }
}
```

The theme exports 20+ color tokens, 5 border radii, 3 shadows, 2 fonts, 6 spacing values, 6 max-width sizes, 2 breakpoints.

## Step 4: Create Content JSON

Create `content/es.json` with the full content structure. Use Nexa's structure as a template:

```json
{
  "siteName": "Client Name",
  "navigation": { "navItems": [...], "ctaText": "...", "ctaHref": "..." },
  "footer": { "businessName": "...", "columns": [...], "email": "..." },
  "home": { "hero": {...}, "trust": {...}, "programs": {...}, "services": {...}, ... },
  "servicesPage": { "hero": {...}, "detail": {...}, "cta": {...} },
  "aboutPage": { "hero": {...}, "story": {...}, "team": {...}, "cta": {...} },
  "faqPage": { "hero": {...}, "full": { "items": [...] }, "cta": {...} }
}
```

## Step 5: Create Images Manifest

Create `images.json` following this structure:

```json
{
  "basePath": "/images",
  "images": {
    "brand": { "logo": { "src": "/images/brand/logo.svg", ... } },
    "hero": { "home": { "src": "/images/hero/home.webp", ... } },
    "trust": { "certificate": { "src": "/images/trust/certificate.webp", ... } },
    "team": { "director": { "src": "/images/team/director.webp", ... } },
    "testimonials": { "client1": { "src": "/images/testimonials/client1.webp", ... } }
  }
}
```

Images on disk go in `public/images/`. The manifest maps content references (`@img:hero.home`) to disk paths (`/images/hero/home.webp`).

## Step 6: Create Page Configs

For each page, create a JSON file in `nexa-pages/`:

```json
{
  "slug": "page-name",
  "titleKey": "pageName.seo.title",
  "descriptionKey": "pageName.seo.description",
  "sections": [
    {"id": "hero", "content": "pageName.hero"},
    {"id": "services", "content": "pageName.services"},
    {"id": "faq", "content": "pageName.full"},
    {"id": "cta-banner", "content": "pageName.cta"}
  ]
}
```

Section `id` values map to SECTION_MAP in `src/pages/[slug].tsx`. Available IDs:

| ID | Component | Content Pattern |
|----|-----------|----------------|
| `hero` | HeroSection | `$PAGE.hero` |
| `stats-counter` | StatsSection | `$PAGE.stats` |
| `trust-signals` | TrustSection | `$PAGE.trust` |
| `programs-comparison` | ProgramsSection | `$PAGE.programs` |
| `services` | ServicesSection | `$PAGE.services` |
| `why-destination` | WhyCountrySection | `$PAGE.whyCountry` |
| `features` | FeaturesSection | `$PAGE.beneluxDesk` |
| `process-timeline` | ProcessSection | `$PAGE.process` |
| `testimonials` | TestimonialsSection | `$PAGE.testimonials` |
| `cta-banner` | CtaBanner | `$PAGE.finalCta` |
| `tax-savings-calculator` | TaxCalculatorSection | `$PAGE.taxCalculator` |
| `faq` | FaqSection | `$PAGE.full` |
| `blog-index` | BlogSection | `$PAGE.index` |
| `team` | TeamSection | `$PAGE.team` |
| `privacy-accordion` | PrivacyAccordion | `$PAGE.body` |
| `glossary` | GlossarySection | `$PAGE.glossary` |
| `newsletter-signup` | NewsletterSection | `resourcesPage.newsletter` |
| `story` | StorySection | `$PAGE.story` |
| `pillars` | PillarsSection | `$PAGE.pillars` |
| `page-hero` | PageHeroSection | `$PAGE.hero` |
| `highlights` | HighlightSection | `$PAGE.differentiators` |
| `comparison-table` | ComparisonSection | `$PAGE.matrix` |
| `guides` | GuidesSection | `$PAGE.guides` |
| `booking-embed` | BookingEmbedSection | `$PAGE.booking` |
| `contact` | ContactDetailsSection | `$PAGE.contact` |
| `gallery` | GallerySection | `$PAGE.highlights` |

Full registry at `docs/02-site/COMPONENT_REGISTRY.md`.

## Step 7: Configure site.json

```json
{
  "name": "client-name",
  "domain": "client-domain.com",
  "locales": ["es"],
  "defaultLocale": "es",
  "features": { "blog": true, "faq": true, "team": true },
  "bookingUrl": "https://wa.me/WhatsAppNumber",
  "social": {
    "linkedin": "https://linkedin.com/company/...",
    "instagram": "https://instagram.com/..."
  }
}
```

## Step 8: Add Custom Components

If the client needs section types not in the registry, add new components to `src/components/sections-extra.tsx` and register them in SECTION_MAP in both `[slug].tsx` and `index.tsx`.

A new component follows this pattern:

```typescript
export function MySection({ pageContent, data, images }: SectionComponentProps) {
  const d = data || pageContent || {}
  if (!d.title) return null
  return (
    <section style={{ padding: theme.spacing.section }}>
      <div style={{ maxWidth: theme.sizes.contentWidth, margin: '0 auto' }}>
        <h2 style={{ color: theme.colors.primary }}>{d.title}</h2>
        {d.items?.map((item: any, i: number) => (
          <div key={i}>{/* render */}</div>
        ))}
      </div>
    </section>
  )
}
```

## Step 9: Deploy

### Standalone (Docker Swarm)

```bash
docker build -t client-name:prod --no-cache .
docker service create --name client_web --publish 3000 client-name:prod
```

### Multi-tenant (paragu-ai-builder)

1. Add site config to builder's `sites/` directory
2. Create content at `sites/client-name/`
3. Push to auto-deploy via GitHub Actions

## Step 10: Add Documentation

For each new client, create:

- `docs/01-client/client-intelligence.json` — Core facts, contacts, vertical
- `docs/03-brand/brand-guide.md` — Colors, fonts, logo usage
- `docs/04-images/images-manifest.md` — All images cataloged
- `docs/05-content/content-locales.md` — Locale structure
- `docs/08-integrations/*.md` — Platform integrations
- `docs/10-deployment/deployment-runbook.md` — How to build and deploy

## Template Checklist

- [ ] Repo scaffolded from reference
- [ ] `package.json` with only needed `@ai-whisperers/*` packages
- [ ] `src/theme.ts` configured with client brand
- [ ] `content/es.json` with all page content
- [ ] `images.json` created with image manifest
- [ ] `nexa-pages/*.json` for each page route
- [ ] `site.json` configured with domain + features
- [ ] `public/images/` populated with assets
- [ ] Dockerfile builds successfully
- [ ] All pages return 200 on deploy
- [ ] Basic docs created

## Common Pitfalls

1. **Missing images.json → Docker** — The Dockerfile MUST copy `images.json` into the runtime image. Without it, `resolveImage()` returns empty strings and no images render.

2. **buildPageContent was removed** — The old system used `buildPageContent()` to reconstruct `{hero: {...}, trust: {...}}` for sections. This was removed in favor of direct data-passing. If upgrading from an older fork, update the dispatch logic in `[slug].tsx`.

3. **Multi-tenant image paths** — In the builder, image basePath differs. The standalone uses `/images/` directly. The builder uses `/sites/client-name/images/`. The `images.json` basePath field handles this.

4. **File: protocol dependencies in Docker** — `file:/root/ai-whisperers-base/packages/*` paths must exist at build time. For CI, publish to GitHub Packages and reference version numbers instead.

5. **Cache is per-process** — The 60s TTL cache in `lib/loader.ts` is in-memory per Node.js process. With multiple replicas (Docker Swarm), each process warms its own cache. Not suitable for high-throughput production without a shared cache layer.
