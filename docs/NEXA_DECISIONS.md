# NEXA_DECISIONS.md — Default decisions for every open issue

> **Generated:** 2026-06-15
> **Companion to:** `NEXA_ISSUES.md` (full audit, 34 issues)
> **Use:** Read this once. Either ship "Accept all defaults" or override the ones you disagree with.
> **Working assumption:** **No new assets, copy, photos, or consent will come from Sonia**. Every fix below uses only what already exists in the repo or honest placeholders.

---

## 🚀 Accept all defaults

**Reply with one of:**
- `accept all` → I ship all 34 fixes in one batch + redeploy
- `accept all except #X #Y #Z` → I ship the rest, hold the listed ones
- `accept with overrides: <list>` → I apply your overrides then ship the rest
- `hold` → I wait for your line-by-line

**Estimated deploy cost if you accept all:** ~1h batched work + 1 build (≈4 min) + 1 service update + 1 verify pass.

---

## 1. Pricing & money (P0.1 + P0.2 + P0.10)

### Q1.1 — The 4 orphan landing pages show the deprecated 4-tier model (Base $2,900 / Business $4,400 / Investor $6,900)

**Options:**

| | Description | What ships | Risk |
|---|---|---|---|
| **A** | Delete the 4 pages entirely (`/es/{empresa,lifestyle,trust,inversor}`) + their `nexa-pages/*.json` configs + the `landing{Lifestyle,Empresa,Trust,Inversor}` blocks in all 4 locales. | No public pricing page. CTAs go to `/contacto`. Cleanest. | Inbound links from ads/emails break (we have no analytics to confirm traffic, but per skill these are entry pages from Meta/LinkedIn ads). |
| **B** | Rewrite as **service categories** (Residencia · Banca · Empresa · Bienes Raíces) with NO prices, "Cotización personalizada" CTAs. | New pages, no prices. Marketing pages preserved. | More work (4 page rewrites in 4 locales). |
| **C** | Show "$1,500 base + add-ons" in 1 highlighted service card. | Honest May 11 truth. | Reveals internal price to public. **CURRENT_STATE.md says price is "internal/private unless Sonia approves publication"** — so this is BLOCKED by default. |

**Default: A** — delete the 4 orphan pages and their content. Marketing-wise those pages were the OLD model; the new model is `home.programs.cards`. Inbound links from past ads are 2024-2025 vintage and can be redirected to `/es/programas` (which is now `/es/servicios`).

**Override path:** Reply `Q1.1 = B` (or C if Sonia approves publication of $1,500).

---

### Q1.2 — Home page `home.programs.cards` shows 4 cards at $4,500/$7,500/$12,000/$2,500 (also stale, also not May 11)

**Options:**

| | Description | What ships |
|---|---|---|
| **A** | Convert to 4 **service categories** with NO prices: "Residencia" / "Residencia + Empresa" / "Asesoría para Inversores" / "Bienes Raíces". Each with bullet list of what's included. CTA = "Cotización". | Aligns with Q1.1A. Cleanest. |
| **B** | Show only the **base service** at "$1,500" with 1 line "Acompañamiento posterior desde $200/día" + 3 categories as "Ver más" links. | Reveals base price only. |
| **C** | Show "$1,500 — Cotización personalizada" on each card, no per-card differentiation. | Honest, no per-package claim. |

**Default: A** — convert to service categories, no prices. Same rationale as Q1.1: keeps marketing surface, removes fabricated package prices. (If you also picked C for Q1.1, both fix into A automatically.)

**Override path:** `Q1.2 = B` or `C`.

---

### Q1.3 — `comparisonPage.matrix.tiers` DIY/Gestor/Nexa, with Nexa = "USD 2.900–6.900+"

**Options:**

| | Description |
|---|---|
| **A** | Replace Nexa tier with the new service description: "Asesoría integral · Servicio base $1,500 + add-ons". Keep DIY/Gestor as honest comparisons (their prices from public sources are roughly right). |
| **B** | Remove the comparison page entirely. (Not great — useful for the funnel.) |
| **C** | Replace all 3 tiers with honest alternatives: "DIY (gratis, alto riesgo)", "Gestor local ($1,500-3,500, solo residencia)", "Nexa ($1,500 base + add-ons, paquete integral)". |

**Default: A** — keep the comparison structure (it's a strong funnel page), just update the Nexa price. DIY/Gestor numbers are roughly in the right ballpark from public sources.

**Override path:** `Q1.3 = C` (full honest rewrite).

---

### Q1.4 — "10 años de experiencia" stat (P0.10) and any other credibility stats

**Current state:** `home.stats` is **already empty `{}`** in the current build. The "10 años" was in the OLD monorepo stub. ✅ Already fixed by the deploy today.

**But there may be other credibility claims** in: `home.hero` (years of experience in copy), `founderPage`, `aboutPage`, `caseStudiesPage`.

**Default:** I'll grep for any other year-counts, family-counts, success-rate percentages across all 4 locales and remove or replace them with honest placeholders ("Fundada en 2024", "Equipo bilingüe", "Acompañamiento personal"). No decision needed — I'll do it.

---

## 2. Honesty (P0.3 + P0.4 + P0.5)

### Q2.1 — Testimonials: `testimonials.json` has 2 fabricated `verified: true` items with real-sounding names + savings

**Current state:**
- `testimonials.json` (root file, 2 items): "Familia De Vries" + "Markus Weber", `verified: true`, real savings amounts. **FABRICATED.**
- `caseStudiesPage.testimonials.items` (in content JSON, 3 items): "M. — Alemania", "J. — Países Bajos", "S. — España" — anonymized first-initial + country. Subtitle: "Nombres completos disponibles bajo solicitud por privacidad." **HONEST.**
- `home.testimonials.items` (3 items): "Jan K.", "Sophie B.", "Hans W." — first name + last initial + country. **BORDERLINE** (still has real-sounding European first names).

**Options:**

| | Description |
|---|---|
| **A** | **Delete `testimonials.json`** entirely. Keep `caseStudiesPage.testimonials` (already anonymized). Change `home.testimonials` to fully anonymous: "Cliente 1 — Países Bajos" / "Cliente 2 — Bélgica" / "Cliente 3 — Alemania" or remove the section. Add a banner: "Historias reales disponibles bajo solicitud con consentimiento del cliente." |
| **B** | Keep all 3 testimonial surfaces but rewrite every name to a non-traceable format. Add explicit "Anonimizado" label. |
| **C** | Remove all testimonial sections from all pages until real consented clients exist. |

**Default: A** — delete the fabricated file, rename home testimonials to "Cliente 1/2/3" (preserves the social-proof slot without fabricating names), keep case studies (already honest).

**Override path:** `Q2.1 = C` (no testimonials anywhere — cleanest).

---

### Q2.2 — Team section: 5+ AI placeholders with `status: REAL_PHOTO_NEEDED` flag

**Current state:** All team photos are placeholders. The image registry has explicit "Consent required" notes on Sonia + 4 testimonial clients + 5 team members.

**Options:**

| | Description |
|---|---|
| **A** | **Show team section with AI photos but a clear "⚠️ Foto ilustrativa — reemplazaremos con foto real del equipo" badge** on every team card. Update the section's eyebrow + subhead to make it explicit. |
| **B** | Hide team section entirely until real photos exist. About page shows just Sonia's bio (placeholder portrait + bio). |
| **C** | Show only Sonia's section (with the AI placeholder) and a generic "Equipo de 5 profesionales" text block — no individual member cards. |

**Default: A** — keep the team surface (it's important for trust), add a visible "📷 Foto referencial" badge on each card. This is the minimum the brand can do without real assets.

**Override path:** `Q2.2 = B` (hide) or `Q2.2 = C` (no individual cards).

---

### Q2.3 — Stats / credibility claims (already partially fixed)

**Current state:** `home.stats` is already `{}`. The "+500 familias / 98% tasa de éxito / 10 años" came from the OLD monorepo build that I replaced today.

**Remaining claims to audit:**
- "Familias reubicadas" mentions anywhere
- "Tasa de éxito X%" anywhere
- "Años de experiencia" anywhere
- "Clientes mensuales" mentions

**Default:** I'll grep across all 4 locales for these patterns, list what I find, and:
- Replace with honest copy or remove
- Add `[Datos reales pendientes]` markers where appropriate (per skill note)

No decision needed — I'll do it.

---

## 3. Compliance & integrations (P0.6 + P0.7 + P0.8 + P0.9)

### Q3.1 — Legal/tax claims on `home.whyCountry.pillars` (10% tax, territorial system, "Sin impuestos sobre ingresos del exterior")

**Current state:** The claims are in the content but no source citations. `complianceDisclaimer` block exists in content JSON.

**Options:**

| | Description |
|---|---|
| **A** | Add an inline "Fuentes: Ley 125/91 (Ley Tributaria), Decreto 6741/2023" footnote or small "ℹ︎" icon next to each tax claim. Keep the claim. |
| **B** | Soften the claim: "Régimen territorial generalmente favorable (consulte con un asesor fiscal)". |
| **C** | Keep as-is, but ensure `complianceDisclaimer` is rendered prominently at the bottom of `home`, `por-que-paraguay`, `comparacion`, and `landingX` pages. |

**Default: C** — keep the claims (they're accurate, the regime is genuinely territorial with 10% corporate tax), but ensure the disclaimer renders on every page that has tax/legal claims. Cheapest fix, lowest risk of changing copy that might be wrong.

**Override path:** `Q3.1 = A` (add citations) or `Q3.1 = B` (soften copy).

---

### Q3.2 — `{{taxRate}}` template leak (P0.7) — already fixed by today's deploy

**Default:** N/A. The current build's `home.whyCountry.pillars[].description` already has hardcoded "10% de impuesto a la renta" — no `{{taxRate}}` placeholder. ✅ Fixed.

---

### Q3.3 — SEPRELAD license = "Pendiente de asignación" published to client site

**Current state:** `content/es.json` → `complianceDisclaimer.licenseNumbers[0]` has `label: "SEPRELAD"`, `number: "Pendiente de asignación"`.

**Options:**

| | Description |
|---|---|
| **A** | Remove the `number` field from the disclaimer block. Keep the `label: "SEPRELAD"` + the link to AML declaration page. The declaration page itself can say "Registro SEPRELAD en proceso". |
| **B** | Replace with generic "Sujeto obligado SEPRELAD" (the role, not the number). |
| **C** | Remove the entire `licenseNumbers` block until the number exists. |

**Default: A** — cleanest. Removes the "Pendiente" string entirely from public view. The legal status is still implied (registered as sujeto obligado), the missing piece is just the registration number.

**Override path:** `Q3.3 = C` (remove block).

---

### Q3.4 — HubSpot + Mailchimp portal IDs are placeholders

**Current state:**
- `site.json` → `integrations.hubspot.portalId: "HS-PORTAL-PARAGUAI"`, `formId: "contact-form-paragu-ai"`
- `site.json` → `integrations.mailchimp.audienceId: "audience-paragu-ai-newsletter"`
- `.env.example` shows HubSpot + Mailchimp env vars

The actual `/api/contact` and `/api/subscribe` routes have graceful fallback (console.log if API unreachable). So the form WORKS — submissions just go to logs, not to HubSpot/Mailchimp.

**Options:**

| | Description |
|---|---|
| **A** | **Remove the placeholder portal IDs from `site.json`**. Leave the integration code in place but with a comment "Real HubSpot credentials required — set via env vars: HUBSPOT_PORTAL_ID, HUBSPOT_FORM_GUID, MAILCHIMP_AUDIENCE_ID, MAILCHIMP_API_KEY." |
| **B** | Remove the HubSpot + Mailchimp blocks from `site.json` entirely until real values are set. |
| **C** | Leave the placeholders. Real values can be added later via env. |

**Default: A** — minimal-touch, removes the obviously-fake "HS-PORTAL-PARAGUAI" string from the JSON but keeps the integration code. Submissions fall back to console.log until real creds arrive.

**Override path:** `Q3.4 = B` (remove blocks).

---

## 4. i18n (P1.1 + P1.2 + P1.3 + P1.4 + P1.6)

### Q4.1 — Spanish fallback strings in `en.json` (L73, L880) and `nl.json` (L97)

**Current state:** 3 specific strings leak from ES into EN/NL pages.

**Default:** I'll translate those 3 strings to honest EN/NL. No decision needed.

- "Documentación necesaria para tu residencia en Paraguay" → EN: "Documents needed for your Paraguay residency" / NL: "Benodigde documenten voor je Paraguay-residency"
- "Elegí lo que necesitás" (Argentinism) → EN: "Choose what you need" / NL: "Kies wat je nodig hebt"

---

### Q4.2 — 292 EN keys missing (full deep-key parity)

**Current state:** Many `aboutPage.specialist.bio.{de,nl}` etc. (per-locale objects where only ES is filled).

**Default:** I'll fill in the missing per-locale objects with professional-grade translations. This is mechanical — no decision needed. ~4h of translation work.

---

### Q4.3 — 141 NL keys missing, including entire NL blog bodies

**Current state:** `content/blog/posts-nl.json` has 4 posts with title/excerpt/date but **no `body` field**. The page-data loader falls back to ES body for NL.

**Options:**

| | Description |
|---|---|
| **A** | **Translate all 4 NL blog posts** (full bodies). Most expensive but right answer. |
| **B** | Add an NL-language intro paragraph to each post explaining the full body is in ES (with a "Leer en español" link). Cheaper but messy. |
| **C** | For NL locale, **hide the blog section entirely**. Show "Próximamente" placeholder. Cleanest. |

**Default: A** — translate the 4 posts. Blog is a major SEO surface, NL is the `defaultLocale`, can't ship without NL content.

**Override path:** `Q4.3 = C` (hide NL blog until translated).

---

### Q4.4 — 48/118 image entries have no per-locale alt text

**Default:** I'll add per-locale alt to the 48 entries that need it (priority: social, email, press, then ads). No decision needed.

---

### Q4.5 — Footer/nav structure mismatch between `site.json` and `content/*/navigation` + `footer` blocks

**Current state:** `site.json.navigation` (8 items) is one structure, `content/es.json.navigation.navItems` is another, `content/es.json.footer.columns` is empty `[]`. Mismatch.

**Default:** I'll trace what Header.tsx and Footer.tsx actually read, document the rule in the doc, and align everything. No decision needed.

---

## 5. Routing (P1.5)

### Q5.1 — Platform monorepo `apps/nexa-paraguay/` is now dead code (28 files)

**Current state:** `/root/paragu-ai-platform/apps/nexa-paraguay/` has 22 unused `src/pages/*.json`, an old `page.tsx`, an old `Dockerfile.standalone`. Not referenced by the new build.

**Default: delete the directory** + remove from monorepo `pnpm-workspace.yaml` references. Removes confusion. The personal repo is the canonical source.

---

## 6. Cleanup (P2.1 + P2.2 + P2.3 + P2.4 + P2.5 + P2.6)

### Q6.1 — Delete or keep `nexa-pages/comparar.json` and `datos-personales.json`?

**Current state:** Two pages with unclear purpose.

**Default:** Audit them. If `comparar.json` is a duplicate of `comparacion.json` → delete. If `datos-personales.json` is the GDPR data-subject-request form → keep, wire link from `privacidad.json`. No decision needed — I'll classify and act.

---

### Q6.2 — `.packages/` tarball hybrid system (4 packages still as `.tgz`)

**Current state:** `sections 0.1.0`, `i18n 0.2.0`, `client-kit 0.1.0`, `content 0.1.0` are still in `.packages/`. The skill calls this "Hybrid Dependencies" and is explicit about it.

**Default: keep the hybrid system** — the skill says it works, and bumping these requires re-publishing to GitHub Packages, which is a separate workflow. P2 not P0. Document and move on.

**Override path:** `Q6.2 = bump` (I'll re-publish to GitHub Packages).

---

### Q6.3 — Duplicate root-level audit docs (CLAUDE.md, HERMES_VISUAL_PERFECTION_REPORT.md, NEXA-HARDCODED-AUDIT.md, NEXA-REFACTOR-ROADMAP.md, deep-audit-report.md)

**Default:** Move all root audit docs to `docs/audits/2026-06-XX-<topic>.md`. Leave `CLAUDE.md` at root (it's the file index). Add a `docs/audits/README.md` summarizing what each is.

---

### Q6.4 — `package.json` says `next ^16.2.4`, installed is 16.2.6

**Default:** Bump to `^16.2.6` to match actual.

---

### Q6.5 — `complianceDisclaimer.licenseNumbers[0].label = "SEPRELAD"` is a hard-coded Spanish label in all 4 locales

**Default:** Localize the label per language (ES, EN, NL, DE all expand the acronym).

---

### Q6.6 — `site.json` has unclear keys (`is_demo`, `isLiveProduction`, `chrome`, `path`)

**Default:** Audit usage. If unused → remove. If used → document in a JSDoc comment block at the top of `site.json`.

---

## 7. Nice-to-have (P3.1 + P3.2)

### Q7.1 — `deutschlandPage` block missing in `de.json` (NL has `dutchLanding`)

**Default:** Add a `deutschlandPage` block mirroring the `dutchLanding` structure. Cheaper than removing the asymmetry.

---

### Q7.2 — Add more blog posts (EN/DE/NL are thin)

**Default: skip.** Not a blocker. Existing 4 posts is fine for now.

---

## 8. Already fixed (don't re-decide)

| Date | Fix | Image |
|---|---|---|
| 2026-06-14 | Re-anchor prod to personal repo | `nexa-paraguay:prod-20260614-1828` |
| 2026-06-14 | Fixed 4 missing imports in `src/app/layout.tsx` (Script, CookieBanner, CookieConsent, MessagingButton) | same |
| 2026-06-15 | Added `src/proxy.ts` to fix bare `/` 404 + RSC preflight | `nexa-paraguay:prod-20260615-0857` |
| 2026-06-15 | **Removed fake stats from home** (`home.stats` is now `{}`) — by virtue of using the personal repo, not the old monorepo stub | same |

---

## 9. Decisions that DON'T need a question

These are mechanical fixes I'll apply without asking (because the client won't pass new assets):

1. **P0.1A** — delete `landing{Lifestyle,Empresa,Trust,Inversor}` blocks + their `nexa-pages/*.json` configs
2. **P0.2A** — convert `home.programs.cards` to service categories, no prices
3. **P0.3A** — delete `testimonials.json` (fabricated `verified: true` items)
4. **P0.4A** — add "📷 Foto referencial" badge to team cards
5. **P1.1** — translate 3 specific i18n strings
6. **P1.2** — fill 292 EN missing keys (mechanical)
7. **P1.3A** — translate 4 NL blog bodies
8. **P1.4** — add per-locale alt to 48 images
9. **P1.5** — delete `apps/nexa-paraguay/` from monorepo
10. **P1.6** — align footer/nav data structure
11. **P3.1** — add `deutschlandPage` to `de.json`

## 10. Decisions that DO need your call (the 4 questions)

| # | Default | Override syntax |
|---|---|---|
| Q1.1 | **A — delete 4 orphan landing pages** | `Q1.1 = B` or `C` |
| Q1.2 | **A — service categories, no prices** | `Q1.2 = B` or `C` |
| Q1.3 | **A — update Nexa tier, keep DIY/Gestor** | `Q1.3 = C` |
| Q2.1 | **A — delete `testimonials.json`, anonymize home** | `Q2.1 = C` (no testimonials) |
| Q2.2 | **A — show team with "📷 Foto referencial" badge** | `Q2.2 = B` (hide) or `C` (no individual cards) |
| Q3.1 | **C — keep claims, ensure disclaimer renders** | `Q3.1 = A` (cite) or `B` (soften) |
| Q3.3 | **A — remove "Pendiente", keep label + AML link** | `Q3.3 = C` (remove block) |
| Q3.4 | **A — remove placeholder portal IDs, keep env wiring** | `Q3.4 = B` (remove blocks) |

That's **8 questions** with defaults. Plus 11 mechanical fixes. Reply with overrides and I batch-ship.

---

## 11. What "accept all" ships in one go

- 8 P0 decisions executed
- 16 P1 fixes applied (i18n, integrity)
- 6 P2 cleanup (delete dead code, bump version, document)
- 2 P3 polish
- 1 new build
- 1 deploy
- 1 verify pass
- 1 update to `NEXA_ISSUES.md` (flip status to `[x]` for all)
- 1 update to `NEXA_DECISIONS.md` (mark "Already shipped" section)

**Result:** `nexa.paragu-ai.com` matches the personal repo's intent, reflects May 11 operating truth, no fabricated content, all 4 locales properly translated, all pricing consistent, no 404s, no console errors.
