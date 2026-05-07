> **Status:** Current | **Last validated:** 2026-05-07
>

# Nexa Paraguay — Image Generation Prompt Library

**Purpose:** Ready-to-paste prompts for generating every image Nexa Paraguay needs  
**Source:** docs/IMAGE_GENERATION_PROMPTS.md (original 1137-line master)  
**Last updated:** 2026-05-07  
**Cross-refs:** [images-manifest.md](../04-images/images-manifest.md)

---

This is a categorized reference. For the full prompt library including all technical specs, style blocks, and aspect ratios, see the master file at `docs/IMAGE_GENERATION_PROMPTS.md` in the repo root.

## Image Categories

| Category | Count | Status |
|---|---|---|
| brand/ | 9 items (logo, favicon, OG, Twitter, etc.) | ✅ Done |
| hero/ | 6 items (home + 5 localized variants) | ✅ Done |
| why-paraguay/ | 10 items (economic, investment, lifestyle, tax, etc.) | ✅ Done |
| process/ | 9 items (consultation, documents, arrival, banking, etc.) | ✅ Done |
| team/ | 6 items (5 team portraits + 1 group shot) | ⚠️ All AI placeholders |
| office/ | 5 items (exterior, meeting room, signing, huddle, reception) | ⚠️ AI placeholders |
| trust/ | 4 items (migraciones, cedula, certificate, registry) | ⚠️ AI placeholders |
| blog/ | Multiple per-post images | 🟡 Varies |
| testimonials/ | 3 client portrait posters | ⚠️ AI placeholders |
| social/ | 6 generic templates | ✅ Done |
| ads/ | 22 paid-ad creatives | ✅ Done |

## Priority for Image Replacement

| Priority | Category | Why |
|---|---|---|
| P0 | team/ | Real team photos — trust signal, replaces 6 AI portraits |
| P0 | testimonials/ | Real client photos — needed for production flip |
| P1 | office/ | Real office photos — credibility |
| P1 | trust/ | Real institutional photos — migraciones, registry |
| P2 | blog/ | Per-post hero images |
| P3 | why-paraguay/ | Already good quality AI images |

## Prompt Style Block

Append this to every prompt for visual consistency:

```
Editorial commercial photography, shot on Sony A7 IV with 35mm f/1.8 lens, natural daylight
with soft bounce fill, shallow depth of field where appropriate, slight film grain,
color-graded to restrained navy-and-champagne palette (deep navy #1B2A4A in shadows,
warm champagne #C9A96E in highlights, neutral whites), institutional but warm mood,
European real-estate / private-banking aesthetic, high resolution, tack sharp, no text overlays,
no logos on subjects, no watermark.
```

## Output Format

| Use | Format | Dimensions |
|---|---|---|
| Web | .webp | 1920×1080 (hero), 800×600 (content) |
| Fallback | .png | Same dimensions |
| Print/Source | .jpg (optional) | 2x resolution |

See `docs/IMAGE_GENERATION_PROMPTS.md` for the complete prompt library (1,137 lines, 90+ prompts).
