# Nexa Paraguay — Image Manifest

> Canonical reference for every image asset on the Nexa Paraguay site.
> Placeholders show required dimensions and purpose. Real photos to be sourced by Kiki.

## Brand Assets
**Location:** `public/images/brand/`

| File | Dimensions | Format | Purpose | Status |
|------|-----------|--------|---------|--------|
| `logo.svg` | any | SVG | Header logo + schema.org logo | ✅ Exists |
| `logo-dark.svg` | any | SVG | Dark version for light backgrounds | ⚠️ Missing |
| `favicon.webp` | 32×32 64×64 | WebP | Site favicon (browser tab) | ✅ Exists |
| `og-default.svg` | 1200×630 | SVG | Default OpenGraph image for SEO | ✅ Exists |

## Team Photos
**Location:** `public/images/team/`

| File | Dimensions | Format | Purpose | Status |
|------|-----------|--------|---------|--------|
| `founder.jpg` | 600×800 min | JPG/WebP | Founder (Willem van der Berg) — About page | ⚠️ Missing |
| `team-2.jpg` | 600×800 min | JPG/WebP | Second team member — About page | ⚠️ Missing |
| `team-3.jpg` | 600×800 min | JPG/WebP | Third team member — About page | ⚠️ Missing |

**Requirements:** Professional headshots, friendly/approachable, consistent lighting

## Hero Images
**Location:** `public/images/heroes/`

| File | Key | Dimensions | Purpose | Status |
|------|-----|-----------|---------|--------|
| `home-hero-es.jpg` | heroHome | 1920×1080 | ES home hero | ⚠️ Missing |
| `home-hero-en.jpg` | heroHome | 1920×1080 | EN home hero | ⚠️ Missing |
| `home-hero-nl.jpg` | heroHome | 1920×1080 | NL home hero | ⚠️ Missing |
| `home-hero-de.jpg` | heroHome | 1920×1080 | DE home hero | ⚠️ Missing |

**Style:** Asunción city skyline or Paraguay landscape at golden hour. NOT stock photos.
**Fallback:** `public/images/heroes/default-hero.jpg` (shared fallback)

## Process / Timeline Icons
**Location:** `public/images/process/` or SVG inline in components

| File / Icon | Key | Dimensions | Purpose | Status |
|-------------|-----|-----------|---------|--------|
| `step-1-consultation.svg` | step1 | 80×80 | Process: Initial consultation | ⚠️ Missing |
| `step-2-document.svg` | step2 | 80×80 | Process: Document preparation | ⚠️ Missing |
| `step-3-application.svg` | step3 | 80×80 | Process: Application submission | ⚠️ Missing |
| `step-4-approval.svg` | step4 | 80×80 | Process: Approval + arrival | ⚠️ Missing |
| `flag-es.svg` | flagEs | 48×32 | Language switcher ES | ✅ Existing |
| `flag-en.svg` | flagEn | 48×32 | Language switcher EN | ✅ Existing |
| `flag-nl.svg` | flagNl | 48×32 | Language switcher NL | ✅ Existing |
| `flag-de.svg` | flagDe | 48×32 | Language switcher DE | ✅ Existing |

## Testimonial / Partner Photos
**Location:** `public/images/testimonials/`

| File | Dimensions | Purpose | Status |
|------|-----------|---------|--------|
| `client-[n]-[locale].jpg` | 200×200 min | Client photos (anonymized with consent) | ⚠️ All missing |
| `testimonial-bg.jpg` | 1920×800 | Background for testimonial section | ⚠️ Missing |

**Note:** Client photos need written consent. Consider using abstract avatars instead.

## Blog Cover Images
**Location:** `public/images/blog/` or stored in Supabase `site_images`

| File | Post slug | Dimensions | Status |
|------|----------|-----------|--------|
| `[post-slug]-cover.jpg` | per post | 1200×630 | ⚠️ Per-post |
| `blog-placeholder.jpg` | fallback | 1200×630 | ⚠️ Missing |

## Location Images
**Location:** `public/images/locations/`

| File | Dimensions | Purpose | Status |
|------|-----------|---------|--------|
| `asuncion-aerial.jpg` | 1920×1080 | Asunción aerial / city view | ⚠️ Missing |
| `asuncion-office.jpg` | 1200×800 | Office exterior | ⚠️ Missing |
| `paraguay-map.svg` | any | SVG map of Paraguay | ⚠️ Missing |
| `asuncion-condado.jpg` | 800×600 | Neighborhood photo (Condado) | ⚠️ Missing |
| `asuncion-boulevard.jpg` | 800×600 | Neighborhood photo (Boulevard) | ⚠️ Missing |

## UI / Section Assets
**Location:** `public/images/sections/`

| File | Dimensions | Purpose | Status |
|------|-----------|--------|--------|
| `messaging-cta-bg.jpg` | 800×600 | Messaging CTA section background | ⚠️ Missing |
| `booking-bg.jpg` | 1920×800 | Booking section background | ⚠️ Missing |
| `comparison-table-header.jpg` | 1200×400 | Countries comparison page header | ⚠️ Missing |

## Partners / Logos
**Location:** `public/images/partners/` or configured in `content/{locale}.json`

Content JSON field: `partnersLogos` — array of `{ name, logoUrl, website }` objects.
Currently stored in JSON content, not as files.

## Placeholder Slots in JSON Content
Every image referenced in content JSON should have a placeholder entry here.

### `content/en.json` placeholders
```json
{
  "hero": { "image": "MISSING: /images/heroes/home-hero-en.jpg (1920×1080)" },
  "aboutPage": { "coverImage": "MISSING: /images/about-cover.jpg (1920×600)" },
  "founderPage": { "photo": "MISSING: /images/team/founder.jpg (600×800)" },
  "whyCountryPage": { "image": "MISSING: /images/locations/asuncion-aerial.jpg (1920×1080)" }
}
```

## Supabase Image Table (`site_images`)
Use the `site_images` table in Supabase for metadata tracking once migration 004 is applied.
```
id | path | url | alt | width | height | size_bytes | category | credit
```

## Image Optimization Requirements

### Formats
- Photos: **WebP** (preferred), JPEG (fallback)
- Graphics/Icons: **SVG** (infinitely scalable)
- No PNG for photos (only for screenshots/transparencies)

### Sizes
- Hero images: max 200KB WebP
- Blog covers: max 80KB WebP
- Team photos: max 100KB WebP
- Thumbnails: max 20KB WebP

### Alt text
All images MUST have descriptive alt text in the content JSON:
```json
{ "alt": "Aerial view of Asunción at sunset with the Paraguay River in the foreground" }
```

## Missing Image Placeholder (CSS)
While real images are being sourced, use this CSS fallback:
```css
.missing-image {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
}
```

Add to `globals.css`:
```css
.missing-image::after {
  content: attr(data-placeholder);
}
```

## Cron Job Reference
Missing images to be checked by a nightly cron (see `cron-jobs` task):
```
URL: https://nexa.paragu-ai.com/api/health/images
Expected response: { ok: true, missing: ["hero-en.jpg", ...] }
```

## Photo Brief for Kiki

### Asunción Aerial Photo
- Golden hour (sunset or sunrise) over Asunción
- Show the city skyline + Paraguay River
- High resolution, license-free (Unsplash, Pexels, or paid stock)
- Search: "Asunción Paraguay aerial" or "Asunción skyline at sunset"

### Founder Headshot
- Professional but approachable
- Warm/friendly tone, not corporate-stiff
- Either in Asunción (preferred) or neutral background
- Look: European entrepreneur in South America
- Search: "Dutch entrepreneur Paraguay" or "founder portrait professional casual"

### Team Photos (×2 more)
- Same style as founder headshot
- Can be headshots or half-body
- Consistent lighting/style with founder photo

### Lifestyle Photos (for blog/landing pages)
- Asunción neighborhood life: coffee shops, parks, restaurants
- Business setting: modern office or meeting
- Family life in Paraguay
- "Quality of life" imagery: outdoor spaces, weather, community
- Search: "Asunción Paraguay lifestyle", "Paraguay quality of life"

---

*Last updated: 2026-06-02 — Run `npm run images:audit` to regenerate this manifest.*