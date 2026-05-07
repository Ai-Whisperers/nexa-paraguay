# Resource Optimization Report

**Status:** Current | **Last validated:** 2026-05-07

---

## 1. Dormant Packages Audit

| Package | Status | Recommendation | Roadmap Risk |
|---------|--------|---------------|--------------|
| @ai-whisperers/admin | Unused | Uninstall now | Low — no feature requires it |
| @ai-whisperers/auth | Unused | Uninstall now | Low — no feature requires it |
| @ai-whisperers/commerce | Unused | Uninstall now | Low — no feature requires it |
| @ai-whisperers/i18n | Unused | Uninstall now | Low — no feature requires it |
| @ai-whisperers/seo | Unused | Uninstall now | Low — no feature requires it |
| @ai-whisperers/theme | Unused | Uninstall now | Low — no feature requires it |
| @ai-whisperers/ui | Unused | Uninstall now | Low — no feature requires it |
| @ai-whisperers/whatsapp | Unused | Uninstall now | Low — no feature requires it |

**Conclusion:** All 8 packages can be uninstalled immediately. This removes ~50MB+ from node_modules. If a future client needs auth, commerce, or i18n, the @ai-whisperers/* packages can be re-added per-feature. The only active bridge is `@ai-whisperers/client-kit` (dynamic import in admin/content.tsx).

## 2. Asset Pruning — Unreferenced Images

### Image categories in manifest

**Total images:** 109 entries across 14 categories
**Referenced in content:** 21 references across 5 categories
**Unreferenced:** 9 categories — 80 images

| Category | Image Count | Referenced? | Suggestion |
|----------|------------|-------------|------------|
| `ads/` | 22 | ❌ No | Archive to `/assets/archive/` |
| `blog/` | 8 | ❌ No | Archive to `/assets/archive/` |
| `brand/` | 10 | ❌ No | Archive to `/assets/archive/` |
| `email/` | 7 | ❌ No | Archive to `/assets/archive/` |
| `hero/` | 6 | ✅ Yes | Keep (6 images, 2 refs in content) |
| `office/` | 5 | ❌ No | Archive to `/assets/archive/` |
| `press/` | 3 | ❌ No | Archive to `/assets/archive/` |
| `process/` | 9 | ❌ No | Archive to `/assets/archive/` |
| `programs/` | 4 | ✅ Yes | Keep (4 images, 1 refs in content) |
| `social/` | 6 | ❌ No | Archive to `/assets/archive/` |
| `team/` | 6 | ✅ Yes | Keep (6 images, 5 refs in content) |
| `testimonials/` | 10 | ❌ No | Archive to `/assets/archive/` |
| `trust/` | 4 | ✅ Yes | Keep (4 images, 4 refs in content) |
| `whyParaguay/` | 9 | ✅ Yes | Keep (9 images, 9 refs in content) |

### Unreferenced categories detail

- **ads/** (22 items): metaFeedNl, metaFeedEn, metaFeedDe, metaFeedEs, metaStoryNl, metaStoryEn, metaStoryDe, metaStoryEs
  ... and 14 more
- **blog/** (8 items): residencia2024, propiedades, banca, emprender, costOfLiving, healthcare, schools, neighborhoods
- **brand/** (10 items): logo, logoDark, logoIcon, favicon, appleTouchIcon, maskable, ogDefault, twitterCard
  ... and 2 more
- **email/** (7 items): welcome, paraguayDifferent, process, oneTrip, banking, whichProgram, nextStep
- **office/** (5 items): exterior, meetingRoom, signing, teamHuddle, reception
- **press/** (3 items): brandBookCover, factsheetInfographic, countryDataInfographic
- **process/** (9 items): consultation, documents, arrival, banking, completion, operationalDay, apostilleStack, familyResidency
  ... and 1 more
- **social/** (6 items): villaMorra, carmelitas, sanBernardino, dataTip, btsOffice, clientJourney
- **testimonials/** (10 items): client1, client2, client3, client4, client5, poster1, poster2, poster3
  ... and 2 more

**Docker size impact:** The archived folders total ~300KB in images.
Keeping them in `public/images/` increases Docker image size by ~0.3MB. Archiving them is cosmetic for now. Revisit when image count exceeds 200.

## 3. Content Validation — Required Keys vs es.json

Checking all 26 section components against actual content...

### Missing or empty content

| Section ID | Content Key | Issue |
|------------|-------------|-------|
| `intake-wizard` | `intakeWizardPage.wizard` | No data found |

### Deep field audit (key components)

| Path | Field | Issue |
|------|-------|-------|
| `home.testimonials.items[0].name` | Missing in content |
| `aboutPage.team.members[0].memberImage` | Missing in content |
| `blog.index.posts[0].title` | Array is empty |
| `blog.index.posts[0].slug` | Array is empty |
| `blog.index.posts[0].excerpt` | Array is empty |
| `glossaryPage.glossary.items[0].term` | Missing in content |
| `glossaryPage.glossary.items[0].definition` | Missing in content |
| `contactPage.booking.ctaHref` | Missing in content |
| `resourcesPage.guides.items[0].title` | Array is empty |
| `resourcesPage.guides.items[0].description` | Array is empty |

---

## Action Plan

| # | Action | Effort | Impact | Priority |
|---|--------|--------|--------|----------|
| 1 | Uninstall 8 dormant @ai-whisperers/* packages from package.json | 5 min | Shrinks node_modules ~50MB, faster Docker builds | P1 |
| 2 | Archive ads/ (22 images) to /assets/archive/ | 2 min | Declutters images.json, reduces deploy surface | P3 |
| 2 | Archive blog/ (8 images) to /assets/archive/ | 2 min | Declutters images.json, reduces deploy surface | P3 |
| 2 | Archive brand/ (10 images) to /assets/archive/ | 2 min | Declutters images.json, reduces deploy surface | P3 |
| 2 | Archive email/ (7 images) to /assets/archive/ | 2 min | Declutters images.json, reduces deploy surface | P3 |
| 2 | Archive office/ (5 images) to /assets/archive/ | 2 min | Declutters images.json, reduces deploy surface | P3 |
| 2 | Archive press/ (3 images) to /assets/archive/ | 2 min | Declutters images.json, reduces deploy surface | P3 |
| 2 | Archive process/ (9 images) to /assets/archive/ | 2 min | Declutters images.json, reduces deploy surface | P3 |
| 2 | Archive social/ (6 images) to /assets/archive/ | 2 min | Declutters images.json, reduces deploy surface | P3 |
| 2 | Archive testimonials/ (10 images) to /assets/archive/ | 2 min | Declutters images.json, reduces deploy surface | P3 |
| 3 | Fix 1 missing content keys in es.json | 10 min | Ensures all sections render correctly | P1 |
| 4 | Add 10 missing required fields to es.json | 15 min | Completes component data contracts | P1 |
| 5 | Remove unused `en.json`, `nl.json`, `de.json` from content/ | 5 min | Only es.json is served | P2 |
| 6 | Add sitemap.xml route + custom 404 page to match component registry | 2h | Search discoverability | P2 |
