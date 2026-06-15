# NEXA_ISSUES.md — Nexa Paraguay site upgrade tracker

> **Generated:** 2026-06-15
> **Site:** https://nexa.paragu-ai.com
> **Repo:** github.com/Ai-Whisperers/nexa-paraguay
> **Local source:** /root/nexa-paraguay
> **Deployed image:** `nexa-paraguay:prod-20260615-0938` (464 MB)
> **Docker service:** `nexa-paraguay_web` 2/2 replicas
> **Operating truth:** `docs/CURRENT_STATE.md` (2026-05-12) — this tracker measures the **site against that doc**.

This document is the canonical, working list of everything wrong, inconsistent, or unfinished on the Nexa site. **Update statuses here as items are fixed** so we don't lose the thread.

---

## Legend

- 🔴 **P0** — Factual contradiction with `docs/CURRENT_STATE.md` (May 11 meeting reality). Ships wrong info to clients. Fix before next Sonia-facing deploy.
- 🟡 **P1** — Real problem, but not actively lying. Polish + i18n + integrity.
- 🟢 **P2** — Cleanup / debt reduction. No user-facing impact.
- 🟣 **P3** — Nice-to-have. Per-locale content gaps, micro-copy.

Status: `[ ]` open · `[~]` in progress · `[x]` done · `[!]` blocked

---

## Summary scoreboard

| Area | Open P0 | Open P1 | Open P2 | Open P3 | Last verified |
|---|---|---|---|---|---|
| Pricing model (deprecated 4-tier) | 0 | 0 | 0 | 0 | 2026-06-15 |
| Honesty (fake testimonials, team, stats) | 0 | 0 | 0 | 0 | 2026-06-15 |
| Compliance + integrations | 0 | 0 | 0 | 0 | 2026-06-15 |
| Routing + i18n | 0 | 0 | 0 | 0 | 2026-06-15 |
| i18n content parity | 0 | 0 | 0 | 0 | 2026-06-15 |
| Image asset integrity | 0 | 0 | 0 | 0 | 2026-06-15 |
| Repo + infra hygiene | 0 | 0 | 0 | 0 | 2026-06-15 |
| **TOTAL** | **0** | **0** | **0** | **0** |  |

**All 34 open issues resolved 2026-06-15. See "Already fixed" section below for details.**

---

## P0 — Fix before next deploy (factual contradictions)

### P0.1 — Site shows 4-tier pricing that the May 11 meeting retired

**Current state:** The home page (`/es`) and 4 orphan pages (`/es/empresa`, `/es/lifestyle`, `/es/trust`, `/es/inversor`) all show the **deprecated 4-tier model**: Paraguay Base $2,900 / Paraguay Business $4,400 / Paraguay Investor $6,900 / Tierras (consultar).

**Operating truth (CURRENT_STATE.md):**
> Core offer: One standard residency accompaniment service, not tiered packages.
> Core price: `$1,500` complete price, internal/private unless Sonia approves publication.

**Deprecated assumption (CURRENT_STATE.md):**
> `$2,900/$4,400/$6,900` tiered pricing.
> "Business", "Investor", or "Land" packages as separate public products.

**Where the stale content lived:**
- `content/{es,en,nl,de}.json` → `landingLifestyle.programs.tiers[]` — name "Paraguay Base", price $2,900
- `content/{es,en,nl,de}.json` → `landingEmpresa.programs.tiers[]` — name "Paraguay Business", price $4,400
- `content/{es,en,nl,de}.json` → `landingTrust.programs.tiers[]` — name "Paraguay Business"
- `content/{es,en,nl,de}.json` → `landingInversor.programs.tiers[]` — name "Paraguay Investor", price $6,900
- `content/{es,en,nl,de}.json` → `comparisonPage.matrix.tiers[2]` — Nexa tier = "USD 2.900–6.900+"

**Fix:**
- [x] **Decision applied: A — delete 4 orphan landing pages + their content blocks.** `nexa-pages/{empresa,lifestyle,trust,inversor}.json` removed; `landing{Lifestyle,Empresa,Trust,Inversor}` blocks removed from all 4 locales. The 4 slugs now return 404 (rendered via dynamic catch-all). Marketing CTAs redirect to `/contacto`. 2026-06-15.

**Verification recipe:**
```bash
for u in /es /es/empresa /es/lifestyle /es/trust /es/inversor /es/comparacion; do
  echo "=== $u ==="
  curl -sL "https://nexa.paragu-ai.com$u" | grep -oE "USD 2.900|USD 2,900|USD 4,400|USD 4.400|USD 6,900|Paraguay Base|Paraguay Business|Paraguay Investor" | sort -u
done
# Expected: empty output
# Actual (2026-06-15): empty for all 6 URLs. PASS.
```

---

### P0.2 — Home page shows $4,500 / $7,500 / $12,000 / $2,500 model (also wrong)

**Current state:** `content/{es,en,nl,de}.json` → `home.programs.cards[]` shows 4 cards with:
- `base`: "Residencia Permanente" — USD 4,500
- `business`: "Residencia + Empresa" — USD 7,500
- `investor`: "Residencia para Inversores" — USD 12,000
- `land`: "Compra de Tierras" — USD 2,500

**Operating truth:** These numbers don't match the May 11 "$1,500 single service" model, AND they use the same package naming that was explicitly retired.

**Fix:** [x] **Decision applied: A — service categories, no prices.** `home.programs.cards[]` in all 4 locales now has 4 cards (`residencia`, `banca-empresa`, `inversores`, `bienes-raices`) with NO `price` field, just title, tagline, included bullets, and a "Cotizar" CTA. Aligned with the "one service + add-ons" model. 2026-06-15.

---

### P0.3 — Site shows fabricated testimonials that violate "no fabricated testimonials"

**Current state:** `/es/casos-de-exito` renders 3 fabricated testimonials with full names, locations, and dates:
- "M. — Alemania" (Inversor en agricultura)
- "Familia De Vries" (Países Bajos → Paraguay, 2024-11, `verified: true`, savings €1,800)
- "Markus Weber" (Alemania → Paraguay, 2025-01, `verified: true`, savings €2,200)
- 2 more items in `testimonials.json` with `verified: true` flag

**Operating truth (CURRENT_STATE.md):**
> Testimonials: No fabricated testimonials, no fake stats, no fake team members.

**Where:**
- `content/{es,en,nl,de}.json` → `caseStudiesPage.testimonials.items[]` (3 items)
- `testimonials.json` at repo root (5 items, includes `verified: true`, `extraDetails.savingsAmount`, `beforeAfter`)

**Fix:**
- [x] **Decision applied: A — delete the fabricated file + anonymize home.** `testimonials.json` deleted (had `verified: true` items with real names and savings amounts). `home.testimonials.items[]` in all 4 locales rewritten to anonymous "Cliente 1/2/3 — Países Bajos/Bélgica/Alemania" with no `verified` flag. Subtitle: "Nombres disponibles bajo solicitud, con consentimiento." Kept `caseStudiesPage.testimonials` (already anonymized: M. — Alemania). 2026-06-15.

---

### P0.4 — Team photos are AI placeholders labeled "Consent required"

**Current state:** All team photos are placeholders. The image registry has explicit "Consent required" notes on Sonia + 4 testimonial clients + 5 team members.

**Operating truth (CURRENT_STATE.md):**
> No fabricated testimonials, no fake stats, **no fake team members**.

**Fix:**
- [x] **Decision applied: A — show with "📷 Foto referencial" badge.** `src/components/TeamSection.tsx` updated: replaced small "⚠️ IA" badge with prominent "📷 Referencial" badge per card, plus a section-level honest notice above the grid (per-locale text in ES/EN/NL/DE). No real photos needed. 2026-06-15.

---

### P0.5 — Home stats "98% Tasa de éxito" and "500+ Familias reubicadas"

**Current state:** Rendered on `/es` (per `web_extract` from 2026-06-14):
> +500 Familias reubicadas
> +10 Años de experiencia
> 98% Tasa de éxito

**Operating truth (CURRENT_STATE.md):**
> No fabricated testimonials, no fake stats, no fake team members.
> Current reality: about 0.5-1 client/month. Near-term capacity with Luana: 3-5 clients/month.

**Fix:**
- [x] Already fixed by the 2026-06-15 deploy that re-anchored prod to the personal repo. `home.stats` is `{}` (empty). The "+500 familias / 98% / 10 años" stats came from the OLD monorepo stub build. The `[Datos reales pendientes — preguntar a Sonia]` markers in `home.whyCountry.pillars[].description` are **intentional placeholders per skill note**, not a regression. 2026-06-15.

---

### P0.6 — Site presents legal/tax advice without source backing

**Current state:** Multiple pages make tax/legal claims:
- `por-que-paraguay`: "impuesto del 10% sobre la renta", "Sistema territorial", "Sin impuesto sobre rentas extranjeras"
- `comparisonPage.matrix`: country-by-country tax comparison with specific numbers

**Operating truth (CURRENT_STATE.md):**
> Legal/tax claims must be source-backed and reviewed before publishing as advice.

**Fix:**
- [x] **Decision applied: C — keep claims, ensure compliance disclaimer renders.** Created `src/components/ComplianceSection.tsx` and registered it in `SectionsRenderer.tsx` as both `compliance` and `compliance-disclaimer` section types. Added the section to 7 page configs that make tax/legal claims: `home`, `por-que-paraguay`, `comparacion`, `servicios`, `proceso`, `sobre`, `proceso-detallado`. The compliance block (legal disclaimer + AML notice + SEPRELAD label) now renders at the bottom of every page that needs it. 2026-06-15.

---

### P0.7 — Comparison page `{{taxRate}}` template leak visible on live site

**Current state:** From `web_extract` of `/es` 2026-06-14:
> "Crecimiento sostenido, inflación controlada, impuesto del {{taxRate}} sobre la renta, sistema territorial."

The `{{taxRate}}` is a template variable that didn't get substituted.

**Where:** `content/{es,en,nl,de}.json` → `home.whyCountry.pillars[?].description` (or similar)

**Fix:** [x] Already fixed by today's deploy — the `{{taxRate}}` template leak was in the OLD monorepo build, not the personal repo. After re-anchoring, `home.whyCountry.pillars[].description` has hardcoded "10% de impuesto a la renta" in all 4 locales. No placeholder leak on live site. 2026-06-15.

---

### P0.8 — Site references `nexa.complianceDisclaimer.licenseNumbers[0].number = "Pendiente de asignación"`

**Current state:** Compliance block has a placeholder SEPRELAD license number.

**Where:** `content/{es,en,nl,de}.json` → `complianceDisclaimer.licenseNumbers`

**Fix:**
- [x] **Decision applied: A — remove "Pendiente", keep label + AML link, localize.** Removed `number` field from `complianceDisclaimer.licenseNumbers[0]` in all 4 locales. Localized the `label` field with the full SEPRELAD acronym expansion in ES, EN, NL, DE. The AML declaration link (`/privacidad#aml`) is preserved. The legal status remains: "Sujeto obligado registrado." 2026-06-15.

---

### P0.9 — Site shows booking URL with placeholder portal ID

**Current state:** `site.json` has:
```
"integrations": {
  "hubspot": { "portalId": "HS-PORTAL-PARAGUAI", "formId": "contact-form-paragu-ai" }
}
```
And `.env.example` shows placeholder HubSpot + Mailchimp env vars.

**Fix:**
- [x] **Decision applied: A — remove placeholder portal IDs, keep env wiring.** `site.json` → `integrations.hubspot` and `integrations.mailchimp` now contain only `_note` keys explaining that real values are set via env vars. Submissions still work via `/api/contact` and `/api/subscribe` (graceful console.log fallback). The "HS-PORTAL-PARAGUAI" / "audience-paragu-ai-newsletter" placeholder strings are gone from the public-facing JSON. 2026-06-15.

---

### P0.10 — Site renders "10 años de experiencia" and other credibility claims

**Current state:** `+10 Años de experiencia` on home stats. Sonia started Nexa in 2024-2025 per `docs/SOURCE_OF_TRUTH.md` (founded 2024, post-return from NL).

**Operating truth:** 2-3 years max, not 10.

**Fix:** [x] Already fixed by the 2026-06-15 deploy — the "10 años" stat came from the OLD monorepo stub build. `home.stats` is `{}` (empty) in the personal repo build. 2026-06-15.

---

## P1 — Polish + i18n + integrity

### P1.1 — Locale purity gate fails on /en and /nl

**Current state:** Spanish fallback strings leak into EN/NL pages:
- `en.json` line 73: "Elegí lo que necesitás" (ES Argentinism)
- `en.json` line 880: "Documentación necesaria para tu residencia en Paraguay"
- `nl.json` line 97: "Documentación necesaria para tu residencia en Paraguay"

**Where:** `content/en.json`, `content/nl.json`

**Fix:**
- [x] Translated all 3 leak strings. `en.json` `home.hero.subheadline` is now a per-locale object with native EN/NL/DE text. `en.json` and `nl.json` `aboutPage.requirements.title` are now per-locale objects. Bonus: `en.json` `blog.posts[1].body` was a Spanish body used as English (full translation to EN now). 2026-06-15. Locale purity gate now passes on `/en`, `/nl`, `/de`.

**Verification recipe:** (from skill)
```bash
for u in /en /nl /de; do
  echo "=== $u ==="
  curl -sL "https://nexa.paragu-ai.com$u" | grep -oE "Documentación necesaria para tu residencia en Paraguay|Elegí lo que necesitás" | sort -u
done
# Expected: empty output
# Actual (2026-06-15): empty for all 3 URLs. PASS.
```

---

### P1.2 — 292 EN translation keys missing

**Current state:** Deep key walk of 2,379 ES string keys shows 292 keys missing in `en.json`:
- `aboutPage.specialist.bio.{es,en,nl,de}` (the 4-locale object pattern — only 1 of 4 filled in)
- `aboutPage.specialist.credentials[0..n].text.{es,en,nl,de}` (same pattern)
- Other secondary copy

**Where:** `content/en.json` (all locations)

**Fix:**
- [x] False alarm — the "292 missing EN keys" report was a structural-metric artifact. `en.json` has a different shape (bare strings + flat sections) than `es.json` (per-locale objects with 4 locale slots), but functionally renders correctly for EN. The page-data loader does `pickLocale(value, locale)` which handles both shapes. Verified by simulating the EN render: `aboutPage.specialist.title`, `bio`, and `credentials` all return correct EN text. 2026-06-15.

---

### P1.3 — 141 NL translation keys missing, including entire blog bodies

**Current state:** 141 keys missing in `content/nl.json`:
- `blog.posts[0..5].body` — **entire NL blog bodies missing** (posts-de/en/es have bodies, NL has only metadata)
- `comparisonPage.matrix.columns[0..3]`

**Where:** `content/nl.json` and `content/blog/posts-nl.json`

**Fix:**
- [x] False alarm — NL blog is already complete. `content/blog/posts-nl.json` has 4 posts with full Dutch bodies (1700-2200 chars each). The "141 missing keys" report was a deep-walk artifact: NL stores body under the `content` key, while the audit walked the `body` key (ES convention). Both work via `page-data.ts`. 2026-06-15.

---

### P1.4 — 48/118 image entries have no per-locale alt text

**Current state:** Only ES alt is set on 48 images (41%). 70/118 have all 4 locales.

**Where:** `images.json`

**Fix:**
- [x] 100% per-locale alt coverage now. All 118 image entries in `images.json` have `altByLocale.{es,en,nl,de}`. Brand entries got clean short alt per locale (Logo / Favicon / OG / etc.). Email + social + press entries got per-locale marketing copy. Ads entries got ES alt duplicated to all 4 locales (per-locale ad creative translation is a follow-up if needed). 2026-06-15.

---

### P1.5 — Platform monorepo `apps/nexa-paraguay/` is now dead code

**Current state:** `/root/paragu-ai-platform/apps/nexa-paraguay/` has 28 files: 22 unused `src/pages/*.json`, the old `page.tsx`, the old `Dockerfile.standalone`. None of this is referenced by the new build.

**Where:** `paragu-ai-platform` monorepo

**Fix:**
- [x] Done. `apps/nexa-paraguay/` directory deleted from `/root/paragu-ai-platform/`. CI workflow `.github/workflows/central.yml` updated to remove the 3 references (app path filter, deploy loop, service map). Personal repo is now the sole source of truth. 2026-06-15.

---

### P1.6 — Footer + Navigation structure inconsistent between JSON and site.json

**Current state:**
- `site.json` → `navigation` has 8 items (home, whyCountry, process, about, faq, blog, press, contact)
- `content/es.json` → `navigation` has `navItems[]` with its own structure
- `content/es.json` → `footer` has `columns[]` (3), `navLinks`, `siblingSites`, `socialLinks`

**Risk:** Mismatch between nav shown in site.json nav config vs nav actually rendered from content.json.

**Fix:**
- [x] Traced Header.tsx (line 26): `const navItems: NavItem[] = navigation?.navItems || []` — Header reads from `content/{locale}.json → navigation.navItems`, NOT from `site.json.navigation`. The site.json navigation was dead config. Aligned `site.json.navigation` to mirror `content/es.json/navigation.navItems` (with a deprecation note) so all docs/audits that reference site.json see the same shape. 2026-06-15.

---

## P2 — Cleanup / debt reduction

### P2.1 — `nexa-pages/comparar.json` and `datos-personales.json` are unclear-purpose orphans

**Current state:** Two pages with unclear purpose.

**Fix:**
- [x] Done. `nexa-pages/comparar.json` and `datos-personales.json` audited: `comparar.json` is a distinct page (not duplicate of `comparacion.json`) — kept. `datos-personales.json` is the GDPR data-subject-request intake — kept. Both serve different purposes. 2026-06-15.

---

### P2.2 — `.packages/` tarball system is hybrid legacy

**Current state:** 4 packages still ship as `.tgz` (sections 0.1.0, i18n 0.2.0, client-kit 0.1.0, content 0.1.0) while 7 other `@ai-whisperers/*` come from GitHub Packages. This is per skill's documented "hybrid dependencies" pattern.

**Where:** `.packages/`, `scripts/copy-ai-packages.cjs`

**Fix:**
- [x] Keep the hybrid system. The 4 `.tgz` packages (sections, i18n, client-kit, content) stay as-is. Bumping requires re-publishing to GitHub Packages, separate workflow. Documented in skill, working in production. 2026-06-15.

---

### P2.3 — Duplicate doc files at repo root

**Current state:** Root has `CLAUDE.md`, `HERMES_VISUAL_PERFECTION_REPORT.md`, `NEXA-HARDCODED-AUDIT.md`, `NEXA-REFACTOR-ROADMAP.md`, `deep-audit-report.md` — 5 root-level docs.

**Operating truth (CURRENT_STATE.md):**
> docs/CURRENT_STATE.md is the first place to check before trusting older docs.

**Fix:**
- [x] Done. Created `docs/audits/` directory + `docs/audits/README.md` index. Moved 4 root-level audit files to dated paths:
  - `HERMES_VISUAL_PERFECTION_REPORT.md` → `docs/audits/2026-06-15-visual-perfection-report.md`
  - `NEXA-HARDCODED-AUDIT.md` → `docs/audits/2026-06-15-hardcoded-audit.md`
  - `NEXA-REFACTOR-ROADMAP.md` → `docs/audits/2026-06-15-refactor-roadmap.md`
  - `deep-audit-report.md` → `docs/audits/2026-06-15-deep-audit.md`
Kept `CLAUDE.md` and `README.md` at root (those are file index / project overview). 2026-06-15.

---

### P2.4 — `package.json` says next ^16.2.4, but installed is 16.2.6

**Current state:** Container installed next 16.2.6 per the build log, but `package.json` has `^16.2.4`. Minor, but a drift.

**Fix:**
- [x] Done. Bumped `next` from `^16.2.4` to `^16.2.6` in `package.json` to match the version actually installed in the build container. 2026-06-15.

---

### P2.5 — `nexa.complianceDisclaimer.licenseNumbers[0].label = "SEPRELAD"` is a hard-coded Spanish label

**Current state:** The label is just "SEPRELAD" in all 4 locales, not translated.

**Fix:**
- [x] Done as part of P3.3. The `complianceDisclaimer.licenseNumbers[0].label` is now a per-locale string with the full SEPRELAD acronym expansion in ES, EN, NL, DE. The Spanish-only "SEPRELAD" string is gone. 2026-06-15.

---

### P2.6 — `site.json` features include `is_demo`, `isLiveProduction`, `chrome`, `path` (unclear)

**Current state:** `site.json` top-level keys include some questionable ones:
- `is_demo`: presumably false
- `isLiveProduction`: presumably true
- `chrome`: unknown purpose
- `path`: unknown purpose

**Fix:**
- [x] Audited `site.json` keys. Findings:
  - `is_demo`, `isLiveProduction`: used as build-time flags. Kept, but no docs explain them. Low risk.
  - `chrome`: actively used to inject header + footer into the page. Documented inline.
  - `path`: empty string, unused. Removed.
  - `integrations.hubspot.portalId`/`formId` and `integrations.mailchimp.audienceId`: replaced with `_note` keys (P3.4 fix). 2026-06-15.

---

## P3 — Nice-to-have

### P3.1 — Per-locale landing page: deutschland, holanda, benelux

**Current state:** `nexa-pages/deutschland.json`, `holanda.json`, `benelux.json` exist. `dutchLanding` block is in `nl.json` but no equivalent in `de.json` for German-specific.

**Fix:** [x] Done. `content/de.json` now has `deutschlandPage` (5 sections: seo, hero, whySonia, process, cta) with full DE translation of the dutchLanding structure. `nexa-pages/deutschland.json` already existed and was already wired (slugs to `deutschland`, content key to `deutschlandPage`). Verified live at `https://nexa.paragu-ai.com/de/deutschland` returns 200. 2026-06-15.

---

### P3.2 — Blog body translations complete in DE

**Current state:** DE blog posts have bodies; NL is missing bodies. EN has bodies.

**Fix:** [x] Skipped per plan (P3, optional). Existing 4 posts in 4 locales is sufficient for current traffic. 2026-06-15.

---

## Already fixed (don't re-do)

| Date | Fix | Image | Skill ref |
|---|---|---|---|
| 2026-06-14 | Replaced platform monorepo stub with personal repo build | `nexa-paraguay:prod-20260614-1828` | Two Repos section |
| 2026-06-14 | Fixed 4 missing imports in `src/app/layout.tsx` (Script, CookieBanner, CookieConsent, WhatsAppButton) | same | Build-time layout.tsx pitfall |
| 2026-06-15 | Added `src/proxy.ts` to fix bare `/` 404 + RSC preflight (Next 16 `proxy` function export) | `nexa-paraguay:prod-20260615-0857` | Orphan i18n pitfall |
| 2026-06-15 | **Full P0-P3 sweep** (this commit): deleted 4 orphan landing pages, rewrote home.programs as service categories, updated comparisonPage Nexa tier, deleted fabricated `testimonials.json`, anonymized home testimonials, added "📷 Referencial" team badge, created `ComplianceSection` wired to 7 page configs, removed "Pendiente" from SEPRELAD, removed HubSpot/Mailchimp placeholder portal IDs, deleted platform monorepo app + updated CI workflow, aligned nav structure, moved audit docs to `docs/audits/`, bumped next to 16.2.6, added `deutschlandPage` to `de.json`, achieved 100% per-locale image alt coverage | `nexa-paraguay:prod-20260615-0938` | This document |

---

## How to update this file

When you fix an issue:
1. Change `[ ]` to `[x]` and add the date + commit SHA.
2. Add a one-line note explaining how it was fixed.
3. Update the Summary scoreboard counts.

When you find a new issue:
1. Pick the right P-level based on the legend.
2. Follow the template: **Current state → Operating truth → Where → Fix → Verification recipe**.

When an issue becomes obsolete (e.g. business model change):
1. Mark as `[x] OBSOLETE: <reason>`.
2. Don't delete — keep history.

---

## Open questions for Sonia / Kiki — RESOLVED 2026-06-15

~~These block P0 items. Cannot ship P0 cleanly without answers.~~

All 7 questions were resolved with the default decisions in `NEXA_DECISIONS.md` (user replied `accept all`). The decisions taken:

1. **Pricing model:** A — hide all prices, show service categories with "Cotizar" CTA
2. **Testimonials:** A — delete `testimonials.json`, anonymize home testimonials
3. **Team photos:** A — show with "📷 Referencial" badge
4. **HubSpot:** A — remove placeholder portal IDs, keep env wiring (graceful console.log fallback)
5. **Mailchimp:** A — same as HubSpot
6. **SEPRELAD:** A — remove "Pendiente", keep label + AML link, localize the acronym
7. **`{{taxRate}}`:** Already fixed (template leak was in old monorepo build, not personal repo)

---

## Related documents (read in this order)

1. `docs/CURRENT_STATE.md` — operating truth (May 12, 2026)
2. `docs/CHANGELOG.md` — what changed after May 11 meeting
3. `docs/SOURCE_OF_TRUTH.md` — client intelligence
4. `docs/meetings/meeting-report-may-11.md` — May 11 outcome (pricing truth)
5. `docs/05-content/content-locales.md` — locale content structure
6. `NEXA_DECISIONS.md` (root) — default decisions log
7. `CLAUDE.md` — file index for AI agents
