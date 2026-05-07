# Nexa Paraguay — Content Locales Structure

**Purpose:** Document the 4-locale content system  
**Source:** content/ directory  
**Last updated:** 2026-05-07  
**Cross-refs:** [blog-posts.md](./blog-posts.md), [seo-keyword-strategy.md](../07-seo/seo-keyword-strategy.md)

---

## Locales

| Locale | File | Size | Status |
|---|---|---|---|
| English | content/en.json | Reference | ✅ Complete |
| Spanish | content/es.json | Largest | ✅ Complete |
| Dutch | content/nl.json | Medium | 🟡 Partial |
| German | content/de.json | Smallest | 🟡 Minimal |

## Content Keys Structure

Each locale JSON file contains translation keys organized by page section:
- `navigation.*` — nav bar labels
- `hero.*` — hero section headlines and subtitles
- `services.*` — service descriptions
- `programs.*` — program names, prices, features
- `process.*` — process step descriptions
- `faq.*` — Q&A pairs
- `footer.*` — copyright, contact
- `blog.*` — blog post metadata
- `meta.*` — SEO titles, descriptions

## Translation Quality

| Pair | Quality | Notes |
|---|---|---|
| EN → ES | ✅ Human-reviewed | Spanish translations verified |
| EN → NL | 🟡 Machine + some review | Dutch needs human pass |
| EN → DE | 🟡 Machine | German needs full human review |

## German Content Gap

German has almost no blog content. Given Germany ranks #3 for European residency seekers (1,652 residencies in 2025), this is a significant missed opportunity. Recommended: create DE translations of top 5 EN blog posts.

## Image Alt Text

All images in images.json have 4-locale alt text via `altByLocale` property. When adding new translations, ensure alt text is updated in images.json, not just content JSON files.
