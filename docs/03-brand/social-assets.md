---
purpose: Inventory of 6 pre-rendered social media templates with per-locale caption sets (ES/EN/NL/DE) for Instagram, LinkedIn, and Facebook
last_updated: 2026-05-07
version: 1.0
cross_refs:
  - BRAND-GUIDE.md (brand identity)
  - ADS_ASSETS.md (paid ad creatives)
  - IMAGE_GENERATION_PROMPTS.md (generation prompts)
  - CONTENT_CALENDAR.yml (scheduling)
---

# Social Asset Library

Inventory of 6 pre-rendered social templates in images/social/. Indexed in images.json under social.*. These are generic templates (no faces) — safe to ship without consent forms.

## Assets

| Key | Filename | Aspect | Platforms | Caption Angle |
|-----|----------|--------|-----------|---------------|
| social.villaMorra | villa-morra.png | 1:1 | Instagram Feed, LinkedIn | Neighborhood deep-dive — Villa Morra |
| social.carmelitas | carmelitas.png | 1:1 | Instagram Feed, Facebook | Neighborhood deep-dive — Carmelitas |
| social.sanBernardino | san-bernardino.png | 1:1 | Instagram Feed/Story | Weekend lifestyle — San Ber |
| social.dataTip | data-tip.png | 1:1 | LinkedIn, Instagram carousel | Data/fact angle — tax, 10% corporate |
| social.btsOffice | bts-office.png | 1:1 | Instagram, LinkedIn (team) | Behind-the-scenes office life |
| social.clientJourney | client-journey.png | 1:1 | LinkedIn, Instagram carousel | Process narrative — case artifacts |

## Caption Strategy

Each template has 4 seed captions per locale (ES/EN/NL/DE), kept under 220 chars. Rotate through options over successive weeks.

### social.villaMorra
Where European clients actually settle. Walkable cafes, corporate towers, international schools.

### social.carmelitas
Family-friendly, treelined, embassy district. 15 min from airport.

### social.sanBernardino
45 min from Asuncion. Weekend escape with lake, jacarandas, terraces.

### social.dataTip
Territorial tax system. 10% corporate rate. Cost of living vs purchasing power. MERCOSUR access.

### social.btsOffice
Monday morning in Asuncion. Pre-validation before client boards the plane. One team, one table.

### social.clientJourney
Passport, cedula, folder, key — a closed case. 8-12 weeks end to end.

## Technical Notes

- All assets are 1:1 PNG (best for Instagram Feed + LinkedIn post)
- For Stories/Reels: cut a 9:16 version from the same brief on demand
- Keep type safe within the middle 80% when cropping; platform UI chrome eats the outer 10%
- Scheduler feed: run `npm run export:content-calendar -- nexa-paraguay` to regenerate calendar.json from CONTENT_CALENDAR.yml
