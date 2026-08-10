# Nexa Paraguay — Current State

> **Status:** Current operating reference  
> **Last validated:** 2026-05-12  
> **Use this first:** This file supersedes older pricing, architecture, deployment, and launch assumptions unless a newer dated decision says otherwise.

## Current Business Truth

| Area | Current state |
|---|---|
| Core offer | One standard residency accompaniment service, not tiered packages |
| Core price | `$1,500` complete price, internal/private unless Sonia approves publication |
| Add-ons | Post-residency accompaniment is `$200/day` when mobilization is required; phone guidance remains free |
| Revenue upside | Property commission, vehicle/appliance referrals, partner referrals, and paid accompaniment |
| Target capacity | Current reality: about `0.5-1` client/month. Near-term capacity with Luana: `3-5` clients/month |
| Testimonials | No fabricated testimonials, no fake stats, no fake team members |
| Photos | Current site may still contain placeholders; real Sonia/local photos are still needed |
| Legal/tax claims | Must be source-backed and reviewed before publishing as advice |

## Current Technical Truth

| Area | Current state |
|---|---|
| Framework | Next.js 16 App Router, React 19, TypeScript 5 |
| Routes | Locale-prefixed App Router routes in `src/app/[locale]/` |
| Locale redirect | `src/proxy.ts` redirects unprefixed paths to the default/cookie locale |
| Content loader | `src/lib/page-data.ts` loads Supabase `site_content` first when env vars exist, then falls back to JSON files |
| File fallback | `content/{locale}.json`, `nexa-pages/{slug}.json`, `images.json`, `testimonials.json` |
| Cache | In-memory process cache with 30 second TTL and max 20 entries |
| Sections | `src/components/SectionsRenderer.tsx` wraps `@ai-whisperers/sections` and registers local overrides |
| Styling | Tailwind CSS v4 tokens in `src/app/globals.css` |
| Admin/content tooling | Supabase env vars are required for admin/content operations |

## Current Deployment Truth

| Area | Current state |
|---|---|
| Live URL | `https://nexa.paragu-ai.com` |
| Primary domain | `nexaparaguay.com` still needs DNS cutover away from Shopify |
| Runtime | Standalone Next.js server in Docker |
| Orchestrator | Docker Swarm service `nexa_web` |
| CI/CD | Local GitHub Actions exist in `.github/workflows/`, especially `deploy.yml` |
| Image registry | GitHub Container Registry: `ghcr.io/ai-whisperers/nexa-paraguay` |
| Deploy flow | Build image, push `latest` and commit SHA tags, update staging service, then promote to `nexa_web` |

## Current Integration Truth

| Integration | Current state |
|---|---|
| Supabase | Runtime content source if `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set; JSON fallback otherwise |
| HubSpot | `src/app/api/contact/route.ts` submits to HubSpot Forms API using `CRM_PORTAL_ID` and `CRM_ENDPOINT` |
| Contact fallback | If HubSpot fails, the API logs the lead and returns success; it does not insert into Supabase `leads` |
| Mailchimp | `src/app/api/subscribe/route.ts` uses `MAILCHIMP_API_KEY` and `MAILCHIMP_LIST_ID`; without API key it logs the subscription |
| GA4 | `NEXT_PUBLIC_GA4_ID` is configured for analytics |
| Messaging bot | QR/linking remains an operational dependency before bot is usable |

## Security And Privacy Rules

- The previously committed Supabase service-role key must be considered exposed and rotated in Supabase.
- Do not commit real `SUPABASE_SERVICE_ROLE_KEY`, HubSpot, Mailchimp, Telegram, or GitHub token values.
- Keep public anon keys out of docs unless intentionally published as non-secret configuration.
- Treat Sonia's legal name, phone, family information, religious affiliation, emotional history, import records, and client network as internal-only intelligence.
- Client-facing docs and deliverables must include source/date/reviewer metadata before use.
- `npm audit` currently reports moderate PostCSS advisories through Next.js and local `@ai-whisperers/*` tarballs with no npm-provided fix available. Re-check after the next Next.js/package refresh.

## Deprecated Assumptions

The following assumptions are obsolete and should not be used for current work:

- `$2,900/$4,400/$6,900` tiered pricing.
- “Business”, “Investor”, or “Land” packages as separate public products.
- Pages Router files such as `src/pages/[slug].tsx`.
- `getServerSideProps()` as the active page data flow.
- Cloudflare Pages as the active production deployment target.
- Supabase `leads` table as the implemented contact-form destination.

## High-Risk Docs To Read Carefully

These files may still be useful as history or source material, but they contain stale assumptions:

- `docs/09-market-intelligence/pricing/pricing-matrix-complete.md`
- `docs/09-market-intelligence/pricing/financial-model.md`
- `docs/09-market-intelligence/content-strategy/competitive_positioning.md`
- `docs/09-market-intelligence/research/nexa-complete-intelligence-report.md`
- `docs/00-architecture/ARCHITECTURE.md` and `docs/00-architecture/DATA_FLOW.md` before their 2026-05-12 rewrite
- Any document that says Cloudflare Pages, Pages Router, or Supabase `leads` is the current production path

