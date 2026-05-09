# Nexa Paraguay — Hardcoded Data Audit

## Already Abstracted ✅
- `@ai-whisperers/sections` — 30+ section components (SectionsRenderer uses factory pattern)
- `src/sections/` — removed, imported from base package

## 1. i18n / Locale Data (could extract to @ai-whisperers/i18n)
- **`src/lib/locales.ts`** — LOCALES, DEFAULT_LOCALE, LOCALE_FLAGS, LOCALE_NAMES
- **`src/components/CookieBanner.tsx`** — 4-locale hardcoded strings (lines 28-52)
- **`src/components/GatewayPopup.tsx`** — 4-locale hardcoded strings (lines 11-16)
- **`src/components/FeedbackSection.tsx`** — 4-locale hardcoded `tr()` function (lines 11-18)
- **`src/middleware.ts`** — LOCALES/DEFAULT hardcoded (lines 3-5) — duplicates locales.ts

## 2. Design Tokens (duplicated — extract to @ai-whisperers/design)
- **`src/lib/theme.ts`** — BRAND tokens (navy, gold, shadows, gradients) — 43 lines
- **`src/theme.ts`** — FULL theme object (colors, radii, shadows, fonts, spacing, sizes, breakpoints, transitions) — 82 lines
- **DUPLICATED** — both files define nearly the same colors (primary=#1B2A4A, accent=#C9A96E, etc.)

## 3. Reusable UI Components (extract to @ai-whisperers/ui)
- **`src/components/ui.tsx`** — Button, SectionHeading, Section, AccentLine — generic, nothing Nexa-specific

## 4. App-wide Config
- **`src/app/layout.tsx`** — metadataBase hardcoded to 'nexaparaguay.com', title hardcoded 'Nexa Paraguay', Google Fonts hardcoded
- **`src/app/sitemap.ts`** — BASE URL hardcoded 'https://nexa.paragu-ai.com'
- **`src/app/api/contact/route.ts`** — rate limit hardcoded (10/hour, 1hr window)

## 5. Content Resolvers (duplicated — 2 versions)
- **`src/lib/content-resolver.ts`** — resolveContent, resolveImage, resolveConfig, localizedField
- **`src/components/content.ts`** — resolveContent, resolveImage (same functions, less features)
- **DUPLICATED** — content.ts is an older simpler version, content-resolver.ts has more features

## 6. Type Definitions
- **`src/types.ts`** — SiteContent, PageSectionContent, all data shapes (256 lines) — could live in @ai-whisperers/sections or a types package
- `src/lib/content-types.ts` in the base package has similar types

## 7. Booking Form Data
- **`src/components/BookingFormSection.tsx`** — DEFAULT_PROGRAMS (lines 5-9), DEFAULT_STEP_LABELS (line 12), all form labels

## 8. Blog Pattern
- **`src/app/[locale]/blog/[slug]/page.tsx`** — blog post rendering with inline prose styles

## Priority Order for Extraction

### P0 — Remove duplication (low effort, high impact)
1. Delete `src/components/content.ts` — superseded by `src/lib/content-resolver.ts`
2. Merge `src/lib/theme.ts` and `src/theme.ts` — one file, source of truth

### P1 — Extract to @ai-whisperers packages (medium effort, reusable)
3. `@ai-whisperers/i18n` — LOCALES array, flags, names, middleware locale helpers
4. `@ai-whisperers/design` — brand tokens (colors, shadows, fonts, spacing, transitions)
5. `@ai-whisperers/ui` — Button, SectionHeading, Section, AccentLine (generic components)

### P2 — Refactor into existing packages
6. Add `createSectionsRenderer` locale helpers to base package
7. Standardize type definitions between `src/types.ts` and base package's content-types.ts

### P3 — Defer (Nexa-specific, already clean enough)
8. Sitemap BASE URL — fine where it is
9. Blog pattern — works fine, low reuse value
10. API route rate limits — config-specific
11. Booking form DEFAULT_PROGRAMS — fine as fallback
