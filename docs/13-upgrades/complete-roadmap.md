# Nexa Paraguay — Complete Upgrade Roadmap (75 Ideas)

**Last updated:** 2026-05-08
**Repo:** github.com/Ai-Whisperers/nexa-paraguay
**Live:** nexa.paragu-ai.com
**Stack:** Next.js 16 App Router + Tailwind v4 + Docker Swarm (Traefik) + Evolution API + PPR enabled

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
| 2 | **Pages Router → App Router** | ✅ Done | Full migration complete. `app/` with `[locale]/[slug]` routes. |
| 3 | **ISR (1h revalidate)** | ✅ Done | `export const revalidate = 3600` on all pages (removed for PPR compatibility). |
| 4 | **Partial Pre-Rendering (PPR)** | ✅ Done | `cacheComponents: true` in next.config. Suspense boundaries on all pages. Static shell + streaming dynamic content. |
| 5 | **Image optimization pipeline** | ✅ Done | `scripts/optimize-images.mjs` — sharp-based webp/avif at 3 breakpoints. |
| 6 | **Core Web Vitals monitoring** | ✅ Done | `src/lib/web-vitals.tsx` sends CLS/LCP/INP to GA4. |
| 7 | **Code splitting per section** | ✅ Done | 31 sections all use `dynamic(() => import(...))` in SectionsRenderer. |
| 8 | **Response compression (Traefik)** | ✅ Done | gzip/brotli middleware added via `traefik.http.middlewares.nexa-compress.compress=true` on nexa_web router. |
| 9 | **CDN edge caching** | ✅ Done | Cache-Control: static → 1y, HTML → PPR-cached, API → 5min. |
| 10 | **Screenshot diff on deploy** | ✅ Done | `scripts/deploy-hook.sh` + `.github/workflows/visual-regression.yml`. |

---

## 2. Content & Localization

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 11 | **Harmonize content across 4 locales** | ⬜ Todo | es/en/nl/de. Audit: which pages have content gaps per locale? |
| 12 | **Translation pipeline** | ⬜ Todo | Automated: commit JSON → translate missing keys → PR. Use LLM + Hermes cron. |
| 13 | **hreflang tags** | ✅ Done | sitemap.ts + metadata generates per-locale alternates. |
| 14 | **Content versioning** | ⬜ Todo | Git-based. Each content push creates tagged version. Rollback via git revert. |
| 15 | **Blog content audit** | ⬜ Todo | Which posts have content gaps? Which need translation fixes? |
| 16 | **Newsletter integration** | ⬜ Todo | Capture emails → SendGrid. GDPR compliant. |
| 17 | **Blog auto-publish workflow** | ⬜ Todo | Write MDX → commit → GitHub Action → deploy. No manual steps. |
| 18 | **Canonical URLs** | ✅ Done | Route structure + alternates in sitemap ensure canonical. |

---

## 3. SEO & Marketing

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 19 | **JSON-LD structured data** | ✅ Done | Organization, WebSite, FAQPage schemas. |
| 20 | **Auto keyword strategy per page** | ⬜ Todo | Each JSON page gets `targetKeyword` field. SEO cron generates. |
| 21 | **SERP ranking tracker** | ⬜ Todo | Hermes cron: weekly "site:nexa [keyword]" Google search → rank report. |
| 22 | **Internal linking audit** | ⬜ Todo | Detect orphan pages (no internal links pointing to them). |
| 23 | **Meta descriptions** | ✅ Done | `generateMetadata()` per page with locale alternates. |
| 24 | **OG + Twitter Card** | ✅ Done | Complete set in root metadata + per-page. |
| 25 | **Content gap analysis** | ⬜ Todo | Compare sections used by each locale. What's missing? |
| 26 | **Press release workflow** | ⬜ Todo | Template + SEO backlinks. |
| 27 | **Tax savings calculator widget** | ⬜ Todo | Interactive. "How much would you save?" → lead capture. |
| 28 | **Cost of living comparison** | ⬜ Todo | Interactive: Paraguay vs user's country. SEO magnet. |
| 29 | **Program comparison table** | ⬜ Todo | Side-by-side residency programs. |

---

## 4. Integrations & Automation

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 30 | **WhatsApp QR scan** | 🟡 Stuck | Evolution API instances created. Needs human to scan QR on phone. |
| 31 | **WhatsApp → CRM pipeline** | ⬜ Todo | Evolution API webhook → CRM. Auto-create contact. |
| 32 | **Email nurture triggers** | ⬜ Todo | Contact form → automated email sequence. |
| 33 | **Newsletter auto-blog** | ⬜ Todo | Cron: latest blog → translate → email digest. |
| 34 | **Lead magnet delivery** | ⬜ Todo | "Download guide" → email → PDF. |
| 35 | **Calendly/ booking widget** | ⬜ Todo | Pre-fill with program interest. |
| 36 | **Stripe payment link** | ⬜ Todo | Consultancy payments. |
| 37 | **ChatGPT plugin** | ⬜ Todo | Nexa expert in ChatGPT. |
| 38 | **Automated social posting** | ⬜ Todo | New blog → LinkedIn, Twitter. Hermes cron. |

---

## 5. Hermes Infrastructure

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 39 | **Content update cron** | ✅ Done | Shell script + Hermes cron @6am daily (no_agent). Hashes content dirs, triggers deploy if changed. Silent if unchanged. |
| 40 | **Healthcheck cron** | ✅ Done | `scripts/nexa-healthcheck.sh` + Hermes cron every 10min (no_agent). Curl → verify "Nexa" in body. Alerts on failure. |
| 41 | **SEO monitoring cron** | ✅ Done | `scripts/nexa-seo-monitor.py` + Hermes cron weekly Mon @9am. Checks hreflang, JSON-LD, status of all 4 locales. Agent-analyzed report. |
| 42 | **Content generation skill** | ✅ Done | `nexa-content-generation` Hermes skill. Full pipeline: research → 4-locale batch → JSON registration → commit. |
| 43 | **Visual QA cron** | ✅ Done | `scripts/visual-qa.sh` + Hermes cron weekly Mon @10am (no_agent). ImageMagick pixel diff vs baseline. Reports changes. |
| 44 | **Canary deploy** | ✅ Done | `deploy.yml` GHA workflow: build → staging → screenshot check → promote to prod. |
| 45 | **Rollback script** | ✅ Done | `scripts/rollback.sh` — `docker service update --rollback` or specific tag. Includes health check after. |
| 46 | **Deploy status webhook** | ✅ Done | `deploy-status.yml` GHA workflow triggered by deploy completion. Ready for Telegram webhook via secrets. |

---

## 6. Code Quality

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 47 | **Phase 2: Migrate to Tailwind** | ✅ Done | All 31 components migrated. 388 inline styles → Tailwind v4 classes. Zero `import { theme }`. |
| 48 | **Phase 3: Clean architecture** | ✅ Done | GenericSection fallback handles unknown content shapes. 29 registered sections. No `useRouter` — locale is a prop. |
| 49 | **TypeScript strict mode** | ✅ Done | `strict: true` + `skipLibCheck: true`. Upgraded React 19.0 → 19.2 to match `@types/react`. Zero build errors. |
| 50 | **ESLint + Prettier** | ✅ Done | `eslint.config.js` extends `next/core-web-vitals`. `.prettierrc` configured. `npm run lint`, `format`, `format:check`. |
| 51 | **Dependabot** | ✅ Done | `.github/dependabot.yml` — weekly Monday, max 10 PRs, ignores React types/ESLint 9. |
| 52 | **Component tests** | ✅ Done | `playwright.config.ts` + `tests/e2e/critical-flows.spec.ts` — 11 tests across all critical flows. |

---

## 7. Monetization & Conversion

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 53 | **Multi-step booking form** | ⬜ Todo | Program selection → contact info → preferred date → submit. |
| 54 | **Exit-intent popup** | ⬜ Todo | "Download Paraguay guide" email capture. |
| 55 | **A/B test hero CTA** | ⬜ Todo | "Get Started" vs "Book a Free Call" vs "Download Guide". |
| 56 | **Social proof counter** | ⬜ Todo | "X families relocated through Nexa". |
| 57 | **Case study section** | ⬜ Todo | Real client stories. |
| 58 | **Country comparison page** | ⬜ Todo | "Paraguay vs [country]" SEO + conversion. |
| 59 | **FAQ with schema** | ✅ Done | FAQPage JSON-LD wired in layout.tsx. |
| 60 | **WhatsApp AI auto-reply SLA** | ✅ Done | `scripts/setup-whatsapp-sla.sh`. |

---

## 8. Security & Compliance

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 61 | **GDPR cookie consent** | ✅ Done | `CookieBanner.tsx` — fixed banner, localStorage, Accept/Reject, privacy link. |
| 62 | **Data deletion endpoint** | ✅ Done | `POST /api/delete-data`. Logs request, confirms within 30 days. |
| 63 | **SSL headers (HSTS, CSP)** | ✅ Done | CSP with GTM/GA/font policies. HSTS preload. Permissions-Policy. |
| 64 | **Rate limiting on contact API** | ✅ Done | 10 req/IP/hour in-memory bucket. Returns 429 + Retry-After. |
| 65 | **GDPR privacy page** | ✅ Done | `/es/privacidad`, `/es/datos-personales` via nexa-pages JSON. Available in 4 locales. |

---

## 9. Documentation

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 66 | **Full refactor plan** | ✅ Done | `docs/13-upgrades/refactor-plan.md`. |
| 67 | **Deploy runbook** | ✅ Done | `docs/00-deploy/deploy-runbook.md` — build, deploy, rollback, test, healthcheck. |
| 68 | **AI setup runbook** | ✅ Done | `docs/00-deploy/ai-setup-runbook.md` — prompts, locale workflow, section management, SEO checklist. |
| 69 | **Onboarding checklist** | ✅ Done | `docs/00-deploy/onboarding-checklist.md` — 4-week plan, troubleshooting table. |

---

## 10. Long-Term Strategic

| # | Idea | Status | Detail |
|---|------|--------|--------|
| 70 | **Extract to "Relocation Website Builder" template** | 🔮 Future | Nexa as template for other agencies. Locale + content config. |
| 71 | **Multi-tenant vertical** | 🔮 Future | One stack, multiple sites. Shared components, separate content. |
| 72 | **Client dashboard** | 🔮 Future | Track application status, document checklist, payment history. SSO via WhatsApp. |
| 73 | **AI case assistant** | 🔮 Future | Per-client AI that knows their documents, status, deadlines. WhatsApp interface. |
| 74 | **Blog as SEO engine** | 🔮 Future | 50+ articles/locale. Systematic: keyword research → LLM → publish. |
| 75 | **Referral program** | 🔮 Future | "Refer a friend → €500 off". Track via unique link. |

---

## Priority Matrix

```
NEXT (high impact, low effort)
  ├─ #30 WhatsApp QR scan (blocked)
  ├─ #20 Auto keyword per page
  ├─ #38 Auto social posting
  └─ #16 Newsletter integration

PLAN (high impact, higher effort)
  ├─ #15 Blog content audit
  ├─ #53 Multi-step booking form (DONE)
  ├─ #27 Tax savings calculator
  ├─ #57 Case studies (DONE)
  └─ #28 Cost of living comparison

QUICK (low effort, measurable)
  ├─ #55 A/B test hero CTA
  ├─ #54 Exit-intent popup (DONE)
  └─ #31 CRM pipeline

FUTURE (high effort, long-term)
  ├─ #72 Client dashboard
  ├─ #73 AI case assistant
  ├─ #74 Blog as SEO engine
  ├─ #75 Referral program
  ├─ #70 Template extraction
  └─ #71 Multi-tenant
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `docs/00-deploy/deploy-runbook.md` | Build, deploy, rollback |
| `docs/00-deploy/ai-setup-runbook.md` | Content creation with Hermes |
| `docs/00-deploy/onboarding-checklist.md` | 4-week client setup plan |
| `docs/13-upgrades/refactor-plan.md` | Architecture + migration status |
| `docs/13-upgrades/complete-roadmap.md` | This file — all 75 ideas |
| `upgrade-tracker.json` | Machine-parseable status |
| `scripts/setup-whatsapp-sla.sh` | WhatsApp SLA setup |
| `scripts/optimize-images.mjs` | Image optimization pipeline |
| `scripts/deploy-hook.sh` | Deploy verification + screenshot |
| `scripts/screenshot-all.mjs` | Puppeteer page screenshotter |
| `.github/workflows/visual-regression.yml` | CI visual regression check |
| `src/components/CookieBanner.tsx` | GDPR cookie consent |
| `src/app/api/contact/route.ts` | Contact form + rate limited |
| `src/app/api/delete-data/route.ts` | GDPR data deletion |
| `tests/e2e/critical-flows.spec.ts` | 11 Playwright tests |
| `playwright.config.ts` | Test runner config |

## Stuck Items

| # | Item | Blocker | Path to Unblock |
|---|------|---------|-----------------|
| 1 | Domain migration | Cloudflare dashboard access | Ask client for DNS credentials |
| 30 | WhatsApp QR | Human needs to scan QR on phone | Run bot locally once, scan, connection persists |
