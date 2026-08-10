> **Status:** Current | **Last validated:** 2026-05-07
>

---
purpose: Complete brand identity guide for Nexa Paraguay — colors, typography, logo usage, tone of voice, and brand assets
last_updated: 2026-05-07
version: 1.0
cross_refs:
  - SITE_JSON.md (site configuration)
  - SOCIAL_ASSETS.md (social media templates)
  - images.json (brand image assets)
---

# Brand Guide — Nexa Paraguay

Navy blue + gold. Professional, international. 4 languages.

## Brand Name

- **Commercial name:** Nexa Paraguay (single two-word brand)
- **Legal entity:** TBD — pending client confirmation (RUC, address, jurisdiction)
- **Tagline (EN):** "Your Paraguay move, guided by experience"
- **Tagline (ES):** "Tu mudanza a Paraguay, guiada por la experiencia"
- **Tagline (NL):** "Je verhuizing naar Paraguay, begeleid door ervaring"
- **Tagline (DE):** "Ihr Umzug nach Paraguay, begleitet von Erfahrung"

## Color Palette

Source: `tokens.json` (palettes.default.colors)

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | #1B2A4A | Deep navy — hero background, CTA banner, headings, body text |
| Secondary | #C9A96E | Warm gold — buttons, accents, "Mas elegido" badge |
| Accent | #C9A96E | (same as secondary) |
| Background | #FFFFFF | Page background |
| Surface | #FFFFFF | Card background |
| Surface Light | #EDE8DB | Alt section background (warm off-white) |
| Text | #1B2A4A | Body text |
| Text Light | #333333 | Secondary body text |
| Text Muted | #6B6B6B | Captions, secondary copy |
| Success | #16a34a | Form success states |
| Error | #dc2626 | Form errors |

**Vibe:** Institutional, trust-coded, European-feel (navy + gold).
**Pairing note:** Navy reads as stability/law/compliance; gold as premium/quality.

## Typography

- **Headings:** Playfair Display (serif) — loaded from Google Fonts
- **Body:** Inter (sans-serif) — loaded from Google Fonts
- **Fallback strategy:** system fonts (serif/sans-serif stack in CSS)
- **CSP:** Google Fonts domain whitelisted

The pair reads as "trustworthy but modern." Playfair conveys institutional weight; Inter provides legibility at all sizes.

## Logo Suite

Current state: **Text-only wordmark** — "Nexa Paraguay" rendered in Playfair Display, navy #1B2A4A. No icon, no SVG. Temporary placeholder.

Requested assets from client:
- Primary SVG/PNG logo (horizontal, full color)
- Icon-only mark for favicon + social share (512x512)
- Monochrome version (white) for dark backgrounds
- favicon.ico + apple-touch-icon.png (180x180)

## Brand Assets (from images.json)

| Key | File | Purpose |
|-----|------|---------|
| brand.logo | logo.webp/png/svg | Primary logo |
| brand.logoDark | logo-dark.webp/png/svg | Monochrome white logo |
| brand.logoIcon | logo-icon.webp/png/svg | Standalone icon mark |
| brand.favicon | favicon.webp/png | Browser tab icon |
| brand.appleTouchIcon | apple-touch-icon.webp/png | iOS home screen |
| brand.maskable | maskable-512.webp/png | PWA maskable icon |
| brand.ogDefault | og-default.webp/png | Open Graph share card (1200x630) |
| brand.twitterCard | twitter-card.webp/png | Twitter summary card |
| brand.messagingSquare | messaging-square.webp/png | Messaging link preview |
| brand.placeholder | placeholder.webp/png | Branded fallback image |

All brand images have WebP primary + PNG fallback format.

## Tone of Voice

| Locale | Register | Notes |
|--------|----------|-------|
| ES | Formal "usted" | Professional-warm, respectful |
| EN | Formal "you" | Marketing-polished, aspirational |
| NL | Formal "u" (not "je") | Direct, matches Dutch business convention |
| DE | Formal "Sie" | Machine-translated — needs professional polish |

Spelling: British English for EN locale (metric, "centre", "colour").

## Site Configuration

From `site.json`:
- Domain: nexaparaguay.com
- Default locale: en
- Locales: nl, en, de, es
- Features: testimonials (true), blog (true), messagingFloat (true), heroImages (true), processImages (true)
- Contact: Messaging +595982515138, email hola@nexaparaguay.com
- Social: linkedin.com/company/nexa-paraguay, instagram.com/nexaparaguay
