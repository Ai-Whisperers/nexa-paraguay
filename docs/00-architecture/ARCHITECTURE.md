# Architecture — Current App

> **Status:** Current  
> **Last validated:** 2026-05-12  
> **Canonical reference:** `docs/CURRENT_STATE.md`

## Overview

Nexa Paraguay is a standalone Next.js 16 App Router site. It uses shared `@ai-whisperers/*` packages for sections, i18n, UI/admin helpers, SEO, theme, and Messaging-related capabilities, while keeping the client-specific content, page ordering, section overrides, and deployment configuration inside this repository.

```
Request
  -> src/proxy.ts locale redirect
  -> src/app/[locale]/page.tsx or src/app/[locale]/[slug]/page.tsx
  -> src/lib/page-data.ts
       -> Supabase site_content when env vars exist
       -> JSON file fallback when Supabase is unavailable
  -> src/components/SectionsRenderer.tsx
       -> @ai-whisperers/sections base renderer
       -> local component overrides
```

## Runtime Layers

| Layer | Current implementation |
|---|---|
| Routing | `src/app/[locale]/page.tsx`, `src/app/[locale]/[slug]/page.tsx`, and `src/app/[locale]/blog/[slug]/page.tsx` |
| Locale handling | `src/proxy.ts` redirects unprefixed routes to a locale using `@ai-whisperers/i18n` |
| Content loading | `src/lib/page-data.ts` queries Supabase REST first, then falls back to local JSON |
| Page configuration | `nexa-pages/{slug}.json` remains file-based |
| Images | `images.json` remains file-based; `src/lib/supabase.ts` exposes Supabase storage helpers |
| Rendering | `src/components/SectionsRenderer.tsx` composes shared renderer plus local overrides |
| Styling | Tailwind CSS v4 with tokens in `src/app/globals.css` |
| APIs | Contact, subscribe, content, revalidate, and data-deletion routes in `src/app/api/` |

## Content Model

Supabase is the primary runtime source only when these env vars are configured:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

If either value is missing, `src/lib/page-data.ts` returns `null` from the Supabase path and loads local JSON files instead. This keeps local development and Docker builds functional without baking Supabase credentials into the image.

Files still used in both modes:

- `content/{locale}.json`
- `content/blog/posts-{locale}.json`
- `nexa-pages/{slug}.json`
- `images.json`
- `testimonials.json`

## Package Bridge Points

| Package | Current use |
|---|---|
| `@ai-whisperers/sections` | Base section renderer created by `createSectionsRenderer()` |
| `@ai-whisperers/i18n` | Locale constants, default locale, cookie name, and locale handling |
| `@ai-whisperers/client-kit` | Local packaged dependency used by admin/content tooling |
| `@ai-whisperers/admin`, `auth`, `ui`, `seo`, `theme`, `messaging` | Not imported by current code and removed from `package.json` until a feature needs them |

Local section overrides currently registered in `src/components/SectionsRenderer.tsx`:

- `process-timeline` / `process`
- `team`
- `story`
- `page-hero` / `hero`
- `cta-banner` / `cta`
- `booking-embed`
- `blog` / `blog-index`
- `faq`
- `contact` / `contact-details`

## Deployment Architecture

The current production path is Docker Swarm behind Traefik:

```
GitHub Actions
  -> npm ci
  -> npm run build
  -> docker build
  -> push ghcr.io/ai-whisperers/nexa-paraguay:<sha>
  -> docker service update nexa_web-staging
  -> docker service update nexa_web
```

The active live domain is `https://nexa.paragu-ai.com`. The `nexaparaguay.com` cutover is a DNS task, not an app rewrite.

## Known Risks

- Previously committed Supabase service-role keys must be treated as exposed and rotated.
- Some older docs still describe Pages Router, Cloudflare Pages, and file-only content. Those docs are historical unless explicitly updated after 2026-05-12.
- Contact form submissions go to HubSpot and log fallback; they do not currently insert into a Supabase `leads` table.

