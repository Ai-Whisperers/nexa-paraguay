# Nexa Paraguay — AI Agent Guide

**Live:** https://nexa.paragu-ai.com  
**Repo:** github.com/Ai-Whisperers/nexa-paraguay  
**Docker service:** nexa_web (1 replica)

## Core Architecture

- **Framework:** `@ai-whisperers/*` package ecosystem (client imports via npm `file:` links)
- **Pages Router** (Next.js 16, React 19, TypeScript 5)
- **Content:** JSON-driven — `content/es.json`, `nexa-pages/*.json`, `images.json`, `site.json`
- **Loading:** `src/lib/loader.ts` with 60s in-memory TTL cache (replaces raw `readFileSync`)
- **Section map:** 26 components in `SECTION_MAP` (see `docs/02-site/COMPONENT_REGISTRY.md`)
- **Types:** 30+ interfaces in `src/types.ts` define the full data contract
- **Styling:** `src/theme.ts` — 20+ color tokens, all inline styles reference this

## Key Files

| File | Purpose |
|------|---------|
| `content/es.json` | All text content (100KB, 15+ page sections) |
| `content/en.json`, `nl.json`, `de.json` | Multi-locale content (currently only ES served) |
| `nexa-pages/*.json` | Page configs — section ordering + content key references |
| `images.json` | Image manifest — 82 entries across 14 categories |
| `site.json` | Domain, features, booking URL, social links |
| `src/pages/[slug].tsx` | Main page renderer — SSR, SECTION_MAP dispatch |
| `src/pages/index.tsx` | Homepage renderer (separate file) |
| `src/pages/blog/[slug].tsx` | Individual blog post renderer — MDX-driven SSR |
| `src/lib/loader.ts` | Shared JSON loader with 60s cache |
| `src/types.ts` | 30+ TypeScript interfaces |
| `src/theme.ts` | Brand design tokens |
| `scripts/screenshot-all.mjs` | Full-page screenshot automation — builds, starts server, captures 22 pages |
| `docs/06-marketing/testimonials-google-form.md` | Google Form template for collecting client testimonials |
| `content/blog/posts-en.json` | English full-article blog posts (translated from ES) |
| `content/blog/posts-nl.json` | Dutch full-article blog posts (translated from ES) |
| `content/blog/posts-de.json` | German full-article blog posts (translated from ES) |
| `blog/en/*.mdx` | 16 English MDX blog articles (6 originals + 10 translated from ES) |
| `blog/nl/*.mdx` | 11 Dutch MDX blog articles (1 original + 10 translated from ES) |
| `blog/de/*.mdx` | 10 German MDX blog articles (translated from ES) |

## Build & Deploy

```bash
npm run build
npm run screenshots      # Full-page screenshot automation (22 pages → screenshots/<iter>/)
docker build -t nexa-paraguay:prod --no-cache .
docker service update --force --image nexa-paraguay:prod nexa_web
```

Requires `NODE_AUTH_TOKEN` for `@ai-whisperers/client-kit` (if building with unpublished packages).

## Documentation (docs/)

| Category | Contents |
|----------|----------|
| `00-architecture/` | Core framework, bridge points, data flow, standards |
| `01-client/` | Stakeholder info, intake, questionnaire responses |
| `02-site/` | Architecture, audit, improvement plan, DNS, component registry |
| `03-brand/` | Brand guide, tokens, image prompts, social assets |
| `04-images/` | Image manifest (111 images), prompt library |
| `05-content/` | Locales, blog catalog, editorial calendar |
| `06-marketing/` | Comparisons, email nurture, FAQ, lead magnets, ads, testimonials |
| `07-seo/` | Keyword strategy, content gaps |
| `08-integrations/` | HubSpot, Mailchimp, GA4, WhatsApp AI bridge |
| `09-market-intelligence/` | Solstein analysis, market sizing, competition, financial model |
| `10-deployment/` | Deployment runbook, CI/CD |
| `11-launch/` | Launch runbook, pre-launch checklist |
| `12-factory/` | NEW_CLIENT_BOOTSTRAP.md — template for creating new client repos |

## Critical Notes

- `is_demo: true` in site.json — flip when placeholders replaced
- Team portraits, testimonials, and stock imagery are AI placeholders as of May 2026
- Nexa's primary domain (nexaparaguay.com) still points to Shopify — needs DNS A record to 72.61.44.159
- GA4 measurement ID: G-XE49GLEP34
- See `docs/00-architecture/ARCHITECTURE.md` for the Core-to-Client bridge explanation

## WhatsApp AI Bot Setup

| Item | Value |
|------|-------|
| Bridge URL | https://whatsapp-ai.sunstein.cloud |
| Nexa client instance | `client-nexa-paraguay-5138` (phone: 595982515138) |
| Mode | `ventas` (sales) — auto-qualifies leads |
| Personality | Loaded with full FAQ, programs, tax data, qualification flow |
| Evolution instance | `nexa-paraguay` |
| QR scan image | `public/qr-nexa-whatsapp.png` |
| **NEXT STEP** | Team must scan QR from WhatsApp (Settings → Linked Devices) |

After QR scan: AI responds in EN/NL/DE/ES, qualifies leads (hot/warm/cold), books consultations. See `docs/08-integrations/whatsapp-ai-bridge.md`.
