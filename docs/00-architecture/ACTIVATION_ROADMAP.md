# Activation Roadmap — From Dormant to Production

**Status:** Historical roadmap | **Last validated:** 2026-05-12

> **Current-state warning:** Locale routing is already App Router based and handled through `src/proxy.ts` plus `src/app/[locale]/`. Treat any `getServerSideProps` or “only ES is served” guidance below as historical.

---

## Philosophy

Nothing gets deleted without client confirmation. Every dormant asset is an **unactivated feature**, not dead weight. This document maps the activation path for each.

---

## 1. Multi-Locale Activation (en, nl, de)

**Current state:** 4 locale files exist (`es.json`, `en.json`, `nl.json`, `de.json`) but only `es.json` is served. `site.json` has `locales: ['nl','en','de','es']`.

**Blockers:**
- No locale detection in middleware or `getServerSideProps`
- No locale routing (`/en/`, `/nl/`, `/de/`)
- `en.json/nl.json/de.json` may have stale contents (haven't been validated against `es.json`)

**Activation path:**
1. Audit `en.json`/`nl.json`/`de.json` for key parity with `es.json` (all keys must match)
2. Add locale detection to middleware (Accept-Language header → redirect)
3. Add `/en/`, `/nl/`, `/de/` route prefixes in `getServerSideProps`
4. Persist locale choice in cookie
5. Test each locale on all 24+ pages

**Timeline:** 2-3 days | **Effort:** Medium | **Impact:** High (4x content reach)

---

## 2. Dormant Package Activation

| Package | Activation Trigger | Effort | Notes |
|---------|-------------------|--------|-------|
| `@ai-whisperers/auth` | Client requests member portal or admin login | 1d | Add login page + JWT middleware |
| `@ai-whisperers/commerce` | Client wants to sell products/packages online | 2d | Add product catalog + checkout |
| `@ai-whisperers/i18n` | Multi-locale routing (see above) | 1d | Replace manual JSON loading with package |
| `@ai-whisperers/seo` | Need automated meta/schema generation | 0.5d | Replace manual `<Head>` tags |
| `@ai-whisperers/theme` | Need to share brand tokens across clients | 1d | Port `src/theme.ts` back to package |
| `@ai-whisperers/ui` | Building shared component library | 2d+ | Extract generic components from Nexa |
| `@ai-whisperers/messaging` | Move from direct wa.me links to API | 1d | Evolution API + webhook handler |

**Current state:** All 8 packages are installed but have zero imports. They add ~50MB to `node_modules` but don't affect runtime bundle (tree-shaken by Next.js). **No action needed** until a feature requires them.

---

## 3. Unreferenced Image Categories

9 image categories (82 images) exist in the manifest but aren't referenced by any content. They're **pre-generated assets** ready for use.

| Category | Images | Purpose | Activation Trigger |
|----------|--------|---------|-------------------|
| `ads/` | 22 | Meta ad creatives (feed + story, 4 locales) | When ad campaigns launch |
| `blog/` | 8 | Blog post covers (healthcare, schools, neighborhoods, banca, etc.) | When corresponding blog posts are written |
| `brand/` | 10 | Logo variants, favicon, OG images, social cards | Already partially active (logo.svg used) |
| `email/` | 7 | Email nurture sequence headers | When Mailchimp sequences deploy |
| `office/` | 5 | Office exterior, meeting room, reception photos | When gallery section is built |
| `press/` | 3 | Brand book cover, infographics | When press section gets content |
| `process/` | 9 | Additional process step visuals | When process section expands |
| `social/` | 6 | Instagram/LinkedIn post templates | When social media management starts |
| `testimonials/` | 10 | Client portrait photos, video posters | When real testimonials collected |

**Deletion risk:** Zero. All assets are less than 1MB total and were AI-generated. Keeping them costs nothing and avoids regeneration effort.

---

## 4. Content Gap Activation

Fields marked as "missing" by the audit are actually handled by the component fallback chains. For example:
- `glossaryPage.glossary.items[].term` → component falls back to `q`, which exists
- `testimonials.items[].image` → component renders a placeholder initial instead
- `guides.items[].fileUrl` → component shows "Próximamente" when empty

**To fill gaps:** Each gap requires client-provided content (real team photos, real testimonials, real guide PDFs). We cannot generate these — they need client input.

| Gap | What's Needed | Client Action |
|-----|--------------|--------------|
| Team member photos | Real headshots | Client provides or approves AI portraits |
| Testimonial images | Client photos + GDPR consent | Client collects from existing clients |
| Guide PDFs | Downloadable files | Client creates or provides source docs |
| Blog post bodies | Full article content | Client writes or approves generated drafts |
| Pricing | Final retail prices | Commercial director sign-off |

---

## 5. Content Validation (es.json vs component expectations)

All 26 components render with existing content. The fallback chains (`q→pregunta→question→title`, `data || pageContent`, etc.) ensure every section displays something meaningful even when exact keys are missing.

**Status:** ✅ All pages render. 0 blank pages. 0 500 errors.

---

## Summary

| Asset | Status | Action |
|-------|--------|--------|
| 8 `@ai-whisperers/*` packages | Installed, unimported | Keep. Activate per-feature. |
| 82 unreferenced images | On disk, in manifest, unused | Keep. Ready for campaign/content launch. |
| 3 unused locale files | `en.json`, `nl.json`, `de.json` | Keep. Audit for key parity, then activate routing. |
| Content gaps (team photos, pricing, testimonials) | Placeholders active | Needs client input to fill. |
| Process gallery → highlights mismatch | Fixed ✅ | Component now matches content shape. |
| Team memberImage field | Fixed ✅ | Aliased from existing imageUrl. |
| Glossary term/definition | Fixed ✅ | Aliased from existing q/a. |

## Policy Documented

From this point forward:

1. **No deletion without confirmation** — The `docs/00-architecture/RESOURCE_OPTIMIZATION.md` uses "Archive to `/assets/archive/`" language but the Activation Roadmap overrides: keep everything, activate when needed.

2. **Placeholders are acceptable** — Team initials, "Próximamente", demo stats, and AI-generated portraits are valid for demo/pre-launch. Flag them clearly in `docs/` as `Status: Draft` or `Status: Placeholder`.

3. **Client sign-off required for** — Real team photos, real testimonials (GDPR), real pricing, real case studies, domain cutover, and any deletion.

