# Nexa Paraguay — Hardcoded Data Audit

## Already Abstracted ✅
- `@ai-whisperers/sections` — 30+ section components (SectionsRenderer uses factory pattern)
- `@ai-whisperers/i18n` — locale system (LOCALES, DEFAULT_LOCALE, LOCALE_CONFIG, resolveLocale)
- `@ai-whisperers/i18n` — locale UI strings (CookieBanner, GatewayPopup, ExitPopup, FeedbackSection)
- `@ai-whisperers/content` — content resolvers (resolveContent, resolveImage, resolveConfig, localizedField)
- `@ai-whisperers/content` — JSON loader with TTL cache (loadJSON, loadContent)
- `@ai-whisperers/content` — page data loader (loadPageData, PageDataOptions, PageDataResult)
- `@ai-whisperers/content` — content types (SiteConfig, PageConfig, PageSection, ImageManifest)

## Duplication Removed ✅
- `src/components/content.ts` — deleted (superseded by content-resolver.ts → @ai-whisperers/content)
- `src/theme.ts` — merged into src/lib/theme.ts (single source of truth)
- `src/components/CookieBanner.tsx` — 4-locale strings replaced with @ai-whisperers/i18n
- `src/components/GatewayPopup.tsx` — 4-locale strings replaced with @ai-whisperers/i18n
- `src/components/FeedbackSection.tsx` — 4-locale tr() function replaced with @ai-whisperers/i18n
- `src/components/ExitPopupWrapper.tsx` — 4-locale TRANSLATIONS replaced with @ai-whisperers/i18n
- `src/components/ExitPopup.tsx` — hardcoded ES fallbacks removed (purely data-driven now)
- `src/lib/content-resolver.ts` — re-exports from @ai-whisperers/content
- `src/middleware.ts` — LOCALES/DEFAULT already consuming @ai-whisperers/i18n
- `src/lib/locales.ts` — already re-exporting from @ai-whisperers/i18n

## Remaining (intentionally Nexa-specific, low reuse value)
- **src/lib/theme.ts** — Brand tokens (navy, gold, shadows) — client-specific, stays in Nexa
- **src/components/ui.tsx** — Button, SectionHeading, Section, AccentLine — *could* extract to @ai-whisperers/ui when a second client needs them
- **src/app/layout.tsx** — metadataBase hardcoded 'nexaparaguay.com', Google Fonts — fine where it is
- **src/app/sitemap.ts** — BASE URL hardcoded 'https://nexa.paragu-ai.com' — fine where it is
- **src/app/api/contact/route.ts** — rate limit (10/hr) — config-specific, fine as-is
- **src/lib/page-data.ts** — custom loadPageData with testimonials injection — Nexa-specific
- **src/types.ts** — 30+ content interfaces — could align with @ai-whisperers/content types in future
- **BookingFormSection** DEFAULT_PROGRAMS — fine as fallback

## Package Summary

### @ai-whisperers/content — v0.1.0
Exports from main entry:
- `SiteConfig`, `PageConfig`, `PageSection`, `ImageManifest`, `LoadedContent` types
- `loadJSON(filePath, cache?)` — sync JSON loader with TTL
- `loadContent(filePath)` — convenience wrapper
- `loadPageData(locale, slug, options)` — orchestration loader
- `resolveContent(content, key)` — dot-notation content resolver
- `resolveImage(images, ref)` — image manifest path resolver (@img:, @src:)
- `resolveConfig(obj, key, locale?, default?)` — locale-aware config resolver
- `localizedField(obj, field, locale?)` — localized text field resolver

### @ai-whisperers/i18n — v0.2.0
Exports from main entry:
- `LOCALES`, `DEFAULT_LOCALE`, `LOCALE_COOKIE` constants
- `Locale` type, `LocaleConfig` interface, `LOCALE_CONFIG` map
- `resolveLocale(pathname, cookie?)` — middleware-friendly locale detection
- `isValidLocale(locale)` — type guard
- `useTranslations(locale)` — JSON-based dot-notation translator (El Viajero pattern)
- Language switcher component
- **New** `COOKIE_BANNER`, `GATEWAY_POPUP`, `EXIT_POPUP`, `FEEDBACK_SECTION` string sets
- **New** `getLocaleStrings(set, locale)` — get all strings for a locale
- **New** `t(set, locale, key, fallback?)` — get single string key
