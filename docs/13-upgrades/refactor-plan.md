# Nexa Paraguay — Architecture Refactor Plan

## Current State (Problems)

| Problem | Impact |
|---------|--------|
| 31 components all import `useRouter` from `next/router` | App Router incompatible — ALL must change to `next/navigation` |
| Theme values hardcoded as JS object `theme.ts` with inline styles | Can't use Tailwind's built-in color/utility system |
| SectionsRenderer has 200-line fallback for unknown sections | Duplicated logic, harder to maintain, inline JSX |
| Locale detection happens inside each component via router | Should be one middleware, then passed as prop/context |
| App Router files at `src/app/` keep getting deleted | Filesystem race — mkdir + write racing with cleanup |

## Implementation Status

### ✅ Phase 1 — Complete (May 8, 2026)

| Item | Status | Details |
|------|--------|---------|
| App Router layout.tsx | ✅ Done | Minimal with Tailwind classes: `font-inter bg-background text-text` |
| Locale middleware | ✅ Done | URL prefix > cookie > Accept-Language, redirects to /{locale}/path |
| [locale]/page.tsx | ✅ Done | ISR 1h, 4 locales static pre-rendered |
| [locale]/[slug]/page.tsx | ✅ Done | Dynamic, ISR 1h |
| [locale]/blog/[slug]/page.tsx | ✅ Done | Blog post pages with Tailwind |
| sitemap.ts (hreflang) | ✅ Done | Generates per-locale sitemap with alternates |
| api/contact/route.ts | ✅ Done | POST endpoint |
| admin/page.tsx | ✅ Done | Stub |
| SectionsRenderer.tsx (clean) | ✅ Done | 31 registered via dynamic import + GenericSection fallback |
| page-data.ts (server-only) | ✅ Done | Pure fs-based, no client imports |
| globals.css | ✅ Done | Tailwind 4 `@theme` with all color variables |

### 🔄 Phase 2 — In Progress

| Item | Status | Details |
|------|--------|---------|
| sections.tsx (11 components) | Partial | Theme imports removed, some inline styles migrated. 136 remaining style={} props |
| sections-extra.tsx (20 components) | Pending | 211 inline styles, 281 theme token refs. ~14h effort |
| Header.tsx | Done | Has 'use client', uses usePathname, locale switch works |
| Footer.tsx | Pending | 16 inline styles |
| GatewayPopup.tsx | Pending | 16 inline styles |

### ⏳ Phase 3 — Pending

| Item | Status | Details |
|------|--------|---------|
| Remove 200-line fallback from SectionsRenderer | Empty | GenericSection still exists as fallback |
| Register ALL sections as dedicated components | Empty | Every content shape needs its own component |
| Generic text/card/image sections | Empty | 3-4 reusable generic components replace the monolith |
| Add typed SectionProps interface | Empty | All sections receive typed props |

## Architecture (Current)

```
src/
├── app/
│   ├── layout.tsx              # ✅ Root layout
│   ├── globals.css             # ✅ Tailwind 4 @theme
│   ├── middleware.ts           # ✅ Locale detection
│   ├── sitemap.ts              # ✅ Hreflang sitemap
│   ├── [locale]/page.tsx      # ✅ Home page (ISR 1h)
│   ├── [locale]/[slug]/page.tsx # ✅ Dynamic pages (ISR 1h)
│   ├── [locale]/blog/[slug]/page.tsx # ✅ Blog pages
│   ├── api/contact/route.ts   # ✅ Contact API
│   └── admin/page.tsx         # ✅ Admin stub
├── components/
│   ├── SectionsRenderer.tsx    # ✅ Clean registry + GenericSection
│   ├── sections.tsx            # 🔄 Partial migration (136 of 130 inline styles remain)
│   ├── sections-extra.tsx      # ❌ Full migration needed (211 inline styles)
│   ├── Header.tsx             # ✅ Ready (usePathname, 'use client')
│   ├── Footer.tsx             # ❌ 16 inline styles
│   ├── GatewayPopup.tsx       # ❌ 16 inline styles
│   ├── ErrorBoundary.tsx      # ✅ Clean
│   └── content.tsx            # ✅ No changes
└── lib/
    ├── page-data.ts           # ✅ Server-only
    └── loader.ts              # ✅ No changes
```

## Migration Script

The script at `/root/nexa-paraguay/scripts/migrate-to-tailwind.py` analyzes all components and generates a migration report at `/root/nexa-paraguay/docs/13-upgrades/migration-report.json`.

### Analysis Summary (from migration report)

| File | Inline Styles | Theme Import | useRouter | Est. Hours |
|------|--------------|-------------|-----------|-----------|
| sections-extra.tsx | 211 | YES | YES | ~14.6h |
| sections.tsx | 130 | YES | no | ~8.7h |
| Footer.tsx | 16 | no | no | ~1.1h |
| GatewayPopup.tsx | 16 | no | no | ~1.1h |
| Header.tsx | 15 | no | no | ~1.0h |
| **TOTAL** | **388** | **2/7** | **1/7** | **~28.5h** |

### Priority Map

Priority order for migration (highest ROI first):

1. **HeroSection** (sections.tsx) — First impression, biggest SEO impact, 12 inline styles
2. **CtaBanner** — Second highest conversion impact, 8 inline styles
3. **TestimonialsSection** — Social proof on every page, 6 inline styles
4. **BlogSection** (sections-extra.tsx) — Uses useRouter, needs both fixes, 9 inline styles
5. **sections-extra.tsx remaining 19** — Bulk of the work, ~191 inline styles
6. **Footer.tsx** — Low effort, high visibility
7. **GatewayPopup.tsx** — Low effort

### Theme → Tailwind Conversion

See `globals.css` for the full `@theme` block. Key values:

| JS Theme | Tailwind | CSS Value |
|----------|----------|-----------|
| c.primary | text-primary / bg-primary | #1B2A4A |
| c.accent | text-accent / bg-accent | #C9A96E |
| c.bgLight / r.xxl | bg-surface-alt / rounded-2xl | #F5F5F0 / 24px |
| r.sm / r.md / r.lg | rounded-sm / rounded-lg / rounded-2xl | 8px / 12px / 24px |
| r.full / c.whatsapp | rounded-full / text-[#25D366] | 50% / custom |
| s.section / s.padding | py-24 / p-8 | 96px / 32px |
| s.gap | gap-8 | 32px |
| sz.maxWidth / sz.pageWidth | max-w-6xl / max-w-4xl | 1152px / 896px |
| sz.card | max-w-sm | 384px |
| fontWeight 400/500/600/700/800 | font-normal/medium/semibold/bold/extrabold | |
| textTransform uppercase | uppercase | |
| textAlign center | text-center | |
| lineHeight 1.6/1.7 | leading-relaxed | |
| lineHeight 1.2 | leading-tight | |

## Files to Keep (no changes)

- `src/components/Footer.tsx` — 16 low-effort inline styles
- `src/components/GatewayPopup.tsx` — 16 low-effort inline styles
- `src/components/ErrorBoundary.tsx` — already clean
- `src/lib/loader.ts` — no changes needed
- `src/lib/page-data.ts` — already server-only
- `src/types.ts` — no changes needed
- `src/theme.ts` — reference only (values are now in CSS @theme)
