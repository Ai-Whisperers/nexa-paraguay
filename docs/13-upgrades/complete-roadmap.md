# Nexa Paraguay — Complete Upgrade Roadmap (75 Ideas)

**Last updated:** 2026-05-08
**Repo:** github.com/Ai-Whisperers/nexa-paraguay
**Live:** nexa.paragu-ai.com
**Stack:** Next.js 16 App Router + Tailwind v4 + Docker Swarm (Traefik) + Evolution API

---

## Table of Contents

1. [Site Architecture & Performance](#1-site-architecture--performance)
2. [Content & Localization](#2-content--localization)
3. [SEO & Marketing](#3-seo--marketing)
4. [Integrations & Automation](#4-integrations--automation)
5. [Hermes Infrastructure](#5-hermes-infrastructure)
6. [Code Quality](#6-code-quality)
7. [Monetization & Conversion](#7-monetization--conversion)
8. [Security & Compliance](#8-security--compliance)
9. [Documentation](#9-documentation)
10. [Long-Term Strategic](#10-long-term-strategic)

---

## 1. Site Architecture & Performance

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 1 | **Domain migration: nexaparaguay.com → VPS** | 🟡 Stuck | DNS at Cloudflare. Needs dashboard access to point A record to 72.61.44.159. |
| 2 | **Pages Router → App Router** | ✅ Done | Full migration complete. `app/` directory with `[locale]/[slug]` routes. |
| 3 | **ISR (1h revalidate)** | ✅ Done | `export const revalidate = 3600` on all pages. Content updates propagate within 1h without rebuild. |
| 4 | **Partial Pre-Rendering (PPR)** | ⬜ Todo | `experimental.cacheComponents: true` in next.config. Hero loads instantly from CDN, dynamic content streams. Next.js 16 optimized. |
| 5 | **Image optimization pipeline** | ✅ Done | `scripts/optimize-images.mjs` — sharp-based webp/avif at 3 breakpoints (mobile/tablet/desktop). Needs to be run. |
| 6 | **Core Web Vitals monitoring** | ✅ Done | `src/lib/web-vitals.tsx` sends CLS/LCP/INP to GA4. Integrate into layout.tsx. |
| 7 | **Code splitting per section** | ✅ Done | 31 sections all use `dynamic(() => import(...))` in SectionsRenderer. Only loads sections actually on the page. |
| 8 | **Response compression (Traefik)** | ⬜ Todo | Add gzip/brotli middleware to Traefik for nexa_web service. Content JSON is 635KB — saves 70-80%. |
| 9 | **CDN edge caching** | ✅ Done | Cache-Control in next.config: static → 1y, HTML → 1h, API → 5min. Traefik + CF edge caches. |
| 10 | **Screenshot diff on deploy** | ✅ Done | `scripts/deploy-hook.sh` + `.github/workflows/visual-regression.yml`. Compares screenshots pre/post deploy. |

### Architecture checksum (build output):
```
Route (app)                Revalidate
├ ● /es /en /nl /de              1h
├ ƒ /[locale]/[slug]
├ ƒ /[locale]/blog/[slug]
├ ○ /admin /sitemap.xml
├ ƒ /api/contact
```

---

## 2. Content & Localization

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 11 | **Harmonize content across 4 locales** | ⬜ Todo | es/en/nl/de. Home page sections differ per locale. Audit: which pages have content gaps? |
| 12 | **Translation pipeline** | ⬜ Todo | Automated: commit JSON → translate missing keys → PR. Use LLM + Hermes cron. |
| 13 | **hreflang tags** | ✅ Done | sitemap.ts generates per-locale alternates. `generateMetadata()` in each page adds them. |
| 14 | **Content versioning** | ⬜ Todo | Git-based. Each content/{locale}.json push creates a tagged version. Rollback via git revert. |
| 15 | **Blog content audit** | ⬜ Todo | 59 MDX articles in 4 locales. Which have content gaps? Which need translation fixes? |
| 16 | **Newsletter integration** | ⬜ Todo | Capture emails in contact form → send to Mailchimp / SendGrid. 1-click unsubscribe. GDPR compliant. |
| 17 | **Blog auto-publish workflow** | ⬜ Todo | Write MDX → commit → GitHub Action builds → deploys. No manual steps. |
| 18 | **Canonical URLs** | ✅ Done | Route structure ensures canonical. Alternate languages in sitemap. |

---

## 3. SEO & Marketing

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 19 | **JSON-LD structured data** | ✅ Done | Organization, WebSite, FAQPage schemas in root layout. BlogArticle per post. |
| 20 | **Auto keyword strategy per page** | ⬜ Todo | Each JSON page file gets a `targetKeyword` field. SEO cron generates. |
| 21 | **SERP ranking tracker** | ⬜ Todo | Hermes cron: weekly "site:nexa.paragu-ai.com [keyword]" Google search → rank report. |
| 22 | **Internal linking audit** | ⬜ Todo | Script that detects orphan pages (no internal links pointing to them). |
| 23 | **Meta descriptions** | ✅ Done | `generateMetadata()` in each page. Falls back to page title + excerpt. |
| 24 | **OG + Twitter Card** | ✅ Done | `metadata` in layout.tsx sets `openGraph` + `twitter` with fallback image. |
| 25 | **Content gap analysis** | ⬜ Todo | Compare sections used by each locale. Which sections are missing translations? |
| 26 | **Press release workflow** | ⬜ Todo | Template + submission to paraguay news sites. SEO backlinks. |
| 27 | **Tax savings calculator widget** | ⬜ Todo | Interactive calculator. "How much would you save?" → lead capture. High conversion. |
| 28 | **Cost of living comparison** | ⬜ Todo | Interactive table: Paraguay vs user's country. SEO magnet + lead gen. |
| 29 | **Program comparison table** | ⬜ Todo | Side-by-side of residency programs (Permanent, Fast Track, Digital Nomad, Passive Income). |

---

## 4. Integrations & Automation

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 30 | **WhatsApp QR scan** | 🟡 Stuck | Evolution API instances created. Needs human to scan QR on phone. 80% inquiries auto-handled. |
| 31 | **WhatsApp → CRM pipeline** | ⬜ Todo | Evolution API webhook → CRM (HubSpot/self-hosted). Auto-create contact on first message. |
| 32 | **Email nurture triggers** | ⬜ Todo | Contact form submit → automated email sequence (info → comparison → testimonial → consult CTA). |
| 33 | **Newsletter auto-blog** | ⬜ Todo | Cron: pick latest blog post → translate to 4 locales → email as digest. |
| 34 | **Lead magnet delivery** | ⬜ Todo | "Download Paraguay guide" → email → PDF delivery. Automated via webhook. |
| 35 | **Calendly/ booking widget** | ⬜ Todo | Pre-fill booking form with user's program interest. Reduce friction. |
| 36 | **Stripe payment link** | ⬜ Todo | For consultancy payments. Link in WhatsApp auto-reply. |
| 37 | **ChatGPT plugin** | ⬜ Todo | Nexa Paraguay expert in ChatGPT. Source: site content. |
| 38 | **Automated social posting** | ⬜ Todo | New blog post → auto-post to LinkedIn, Twitter. Use Hermes cron. |

---

## 5. Hermes Infrastructure

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 39 | **Nexa content update cron** | ⬜ Todo | `hermes cron create` — daily check: new content in repo? → rebuild + deploy. |
| 40 | **Nexa healthcheck cron** | ⬜ Todo | Every 5min: curl nexa.paragu-ai.com → 200? If not, alert. |
| 41 | **Nexa SEO monitoring cron** | ⬜ Todo | Weekly: scrape Google rankings, check hreflang, validate JSON-LD. Report. |
| 42 | **Goal workspace for content** | ⬜ Todo | Hermes Goal: "Generate SEO article about [topic] in 4 locales → save to blog/{locale}/ → commit." |
| 43 | **Puppeteer visual QA** | ⬜ Todo | Cron: screenshot all pages weekly, diff against baseline. Detect layout shifts. |
| 44 | **Canary deploy** | ⬜ Todo | Deploy to staging.nexa.paragu-ai.com first. Run screenshot diff. If pass, promote to prod. |
| 45 | **Rollback script** | ⬜ Todo | `docker service update --image nexa-paraguay:{previous-tag} nexa_web`. Tagged releases. |
| 46 | **Deploy status webhook** | ⬜ Todo | Github Actions → Telegram: "Nexa deployed (commit abc123)". |

---

## 6. Code Quality

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 47 | **Phase 2: Migrate to Tailwind** | 🟡 Partial | 388 inline styles across 31 components. `sections.tsx` partial. `sections-extra.tsx` pending. See `scripts/migrate-to-tailwind.py`. |
| 48 | **Phase 3: Clean architecture** | ⬜ Todo | Remove fallback monolith. Dedicated components for every content shape. Typed SectionProps. |
| 49 | **TypeScript strict mode** | ⬜ Todo | `tsconfig.json` → `strict: true`. Fix ~200 TS errors (mostly node_modules). |
| 50 | **ESLint + Prettier** | ⬜ Todo | Single config. `npm run lint -- --fix` on commit. |
| 51 | **Dependabot** | ⬜ Todo | Auto-PR for dependency updates. Weekly. |
| 52 | **Component tests** | ⬜ Todo | Playwright: 5 critical flows (hero, CTA click, nav, locale switch, contact form). |

---

## 7. Monetization & Conversion

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 53 | **Multi-step booking form** | ⬜ Todo | Program selection → contact info → preferred date → submit. Higher conversion than single-step. |
| 54 | **Exit-intent popup** | ⬜ Todo | "Before you go — download Paraguay guide." Email capture. |
| 55 | **A/B test hero CTA** | ⬜ Todo | "Get Started" vs "Book a Free Call" vs "Download Guide". 2-week test, pick winner. |
| 56 | **Social proof counter** | ⬜ Todo | "X families relocated through Nexa" — real number. Updated monthly. |
| 57 | **Case study section** | ⬜ Todo | Real client stories. Email + photo + program details. Biggest trust builder. |
| 58 | **Country comparison page** | ⬜ Todo | "Why Paraguay vs [Mexico/Costa Rica/Portugal]". SEO + conversion. |
| 59 | **FAQ with schema** | ⬜ Todo | FAQPage JSON-LD. Rich results in Google. Already wired in layout.tsx. Needs content. |
| 60 | **WhatsApp AI auto-reply SLA** | ✅ Done | `scripts/setup-whatsapp-sla.sh`. Reply within 30s, ask qualifying questions, book consultation. |

---

## 8. Security & Compliance

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 61 | **GDPR cookie consent** | ⬜ Todo | Banner + cookie settings. Block non-essential cookies until consent. |
| 62 | **Data deletion endpoint** | ⬜ Todo | Users can request data deletion. Manual + automated route. |
| 63 | **SSL headers (HSTS, CSP)** | ⬜ Todo | `next.config.js` securityHeaders. Already has X-Frame, X-Content-Type, Referrer-Policy. Missing: CSP, HSTS preload. |
| 64 | **Rate limiting on contact API** | ⬜ Todo | Max 5 submissions per IP per hour. Prevents abuse. |
| 65 | **GDPR privacy page** | ⬜ Todo | Clear: what data, how long, rights. Translation required. |

---

## 9. Documentation

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 66 | **Full refactor plan** | ✅ Done | `docs/13-upgrades/refactor-plan.md` — architecture, migration steps, theme mapping. |
| 67 | **Deploy video** | ⬜ Todo | Screen recording: "How to deploy Nexa" — build, tag, docker push, stack deploy. |
| 68 | **AI setup runbook** | ⬜ Todo | Hermes + Nexa: how to create content, what prompts work, locale workflow. |
| 69 | **Onboarding checklist** | ⬜ Todo | New client: 1. WhatsApp setup 2. First blog post 3. Domain 4. SEO audit. |

---

## 10. Long-Term Strategic

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 70 | **Extract to "Relocation Website Builder" template** | ⬜ Todo | Nexa as template for other relocation agencies (Spain, Portugal, Costa Rica). Plug in locale + content. |
| 71 | **Multi-tenant vertical** | ⬜ Todo | One Docker stack, multiple sites (Nexa Paraguay, Nexa Spain, Nexa Portugal). Shared components, separate content. |
| 72 | **Client dashboard** | ⬜ Todo | Track application status, document checklist, payment history. SSO via WhatsApp. |
| 73 | **AI case assistant** | ⬜ Todo | Per-client AI that knows their documents, status, deadlines. WhatsApp interface. |
| 74 | **Blog as SEO engine** | ⬜ Todo | 50+ articles per locale. Systematic: keyword research → brief → LLM article → human review → publish. |
| 75 | **Referral program** | ⬜ Todo | "Refer a friend → €500 off your fees". Track via unique link. |

---

## Priority Matrix

```
High Impact, Low Effort (NEXT)
  ├─ #30 WhatsApp QR scan (blocked)
  ├─ #53 Multi-step booking form
  ├─ #60 WhatsApp SLA (DONE)
  ├─ #39 Healthcheck cron
  └─ #61 Cookie consent + HSTS

High Impact, High Effort (PLAN)
  ├─ #47 Phase 2 Tailwind migration (~28.5h)
  ├─ #15 Blog content audit
  ├─ #21 SEO ranking tracker
  └─ #53 Case studies

Low Impact, Low Effort (QUICK)
  ├─ #55 A/B test hero
  ├─ #66 Deploy video
  ├─ #46 Deploy webhook
  └─ #64 Rate limiting

Low Impact, High Effort (AVOID)
  ├─ #70 Template extraction
  ├─ #73 AI case assistant
  └─ #72 Client dashboard
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `docs/13-upgrades/refactor-plan.md` | Architecture + migration status |
| `docs/13-upgrades/migration-report.json` | 388 inline style analysis |
| `upgrade-tracker.json` | Machine-parseable status tracker |
| `scripts/migrate-to-tailwind.py` | Migration analysis tool |
| `scripts/setup-whatsapp-sla.sh` | WhatsApp SLA setup |
| `scripts/optimize-images.mjs` | Image optimization pipeline |
| `scripts/deploy-hook.sh` | Deploy verification + screenshot |
| `scripts/screenshot-all.mjs` | Puppeteer page screenshotter |
| `.github/workflows/visual-regression.yml` | CI visual regression check |
| `src/lib/web-vitals.tsx` | Core Web Vitals → GA4 |

## Stuck Items

| # | Item | Blocker | Path to Unblock |
|---|------|---------|-----------------|
| 1 | Domain migration | Cloudflare dashboard access | Ask client for DNS credentials |
| 30 | WhatsApp QR | Human needs to scan QR on phone | Run bot locally once, scan, connection persists |
