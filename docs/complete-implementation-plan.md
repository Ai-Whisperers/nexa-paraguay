# Nexa Paraguay — Complete Implementation Plan

> **Version:** 1.0 | **Date:** 2026-05-11
> **Purpose:** Build everything Sonia needs — client tools, site features, business infrastructure, and data.
> **Total items:** 27 across 4 phases | **Estimated time:** 2-3 weeks part-time
> **Architecture:** Next.js 16 App Router, file-based content (`content/{locale}.json`), section overrides in `src/components/`
> **Key constraint:** Sonia must answer pricing/story/persona questions before Phase 2 can ship

---

## PHASE 0: SONIA'S DECISIONS (1 meeting, ~1 hour)

These must be resolved before any content/monetization work. All questions are in `docs/01-client/meeting-may-11-questions.md`.

### Task 0.1: Hold the 51-question meeting with Sonia

**Objective:** Get answers to all pricing, story, and strategy questions

**Files:**
- Reference: `docs/01-client/meeting-may-11-questions.md`
- Output: Update `docs/SOURCE_OF_TRUTH.md` and `docs/pricing-matrix-complete.md`
- Output: Create `docs/meeting-outcome-YYYY-MM-DD.md`

**Key decisions needed (P0):**
1. **Price: $1,500 vs $2,900** — update all site pricing
2. **Her story: full (nervous breakdown included) vs PG version** — rewrite About page
3. **One service + add-ons vs packages** — restructure services page
4. **Ideal client: families? Dutch only? Not USA?** — redefine all targeting

**Meeting agenda (60 min):**
| Minute | Block | Questions |
|--------|-------|-----------|
| 0-3 | Opening | Context setting |
| 3-15 | Pricing | P1-P8 (12 min) — **critical** |
| 15-23 | Competition | P9-P14 (8 min) |
| 23-31 | Her story | P15-P19 (8 min) |
| 31-43 | Content | P20-P27 (12 min) |
| 43-51 | Legal/ops | P28-P33 (8 min) |
| 51-60 | Strategy | P34-P39 (9 min) |

---

## PHASE 1: CLIENT-FACING TOOLS (Week 1)

These are deliverables Sonia can use immediately — no site deployment needed.

### Task 1.1: Generate printable emergency card (DONE)

**Files:**
- Create: `docs/emergency-card.html` ✅
- Script: `scripts/generate-emergency-card.py` ✅

**Status:** ✅ Complete — print A4, cut into 4 cards (NL/EN/ES/DE)

### Task 1.2: Create 30-day post-arrival plan PDF generator

**Objective:** Build a simple HTML page Sonia can print or share as PDF. Lists Week 1-4 actions per day.

**Files:**
- Create: `scripts/generate-30day-plan.py`
- Output: `docs/30-day-arrival-plan.html`

**Content (from `docs/client-tools-deliverables.md` §1.3):**

```python
#!/usr/bin/env python3
"""Generate 30-day post-arrival plan printable"""

plan = {
    "Week 1: Legal Foundation": [
        {"day": "Day 1", "action": "Arrival, SIM chip, Airbnb check-in", "done": False},
        {"day": "Day 1", "action": "Meet Sonia, document review", "done": False},
        {"day": "Day 2", "action": "Residency filing at Migraciones", "done": False},
        {"day": "Day 2", "action": "Cédula provisional fingerprints", "done": False},
        {"day": "Day 3", "action": "RUC registration at SET", "done": False},
        {"day": "Day 3", "action": "Bank account opening with Sonia", "done": False},
        {"day": "Day 3", "action": "Supermarket tour with Sonia", "done": False},
    ],
    "Week 2: Financial Setup": [
        {"day": "Day 8", "action": "Online banking activation", "done": False},
        {"day": "Day 9", "action": "Health insurance enrollment", "done": False},
        {"day": "Day 10", "action": "First utility bills payment setup", "done": False},
    ],
    # ... etc
}
# Generate as HTML table with checkboxes
```

**Verification:** Open in browser, print as PDF, should show 30-day checklist with checkboxes.

### Task 1.3: Build client welcome checklist (printable)

**Objective:** One-page checklist of documents to bring. Generate in all 4 languages.

**Files:**
- Create: `scripts/generate-checklist.py`
- Output: `docs/checklist-client.html`

**Content (from `docs/client-tools-deliverables.md` §1.2):**
Table with: Document ❘ Apostille? ❘ Translation? ❘ Notes ❘ ✅ Done

Generate 4 versions by swapping language strings.

### Task 1.4: Build neighborhood scorecard visual

**Objective:** Visual comparison of Asunción neighborhoods — safety, rent, schools, hospitals, walkability.

**Files:**
- Create: `scripts/generate-neighborhood-scorecard.py`
- Output: `docs/neighborhood-scorecard.html`

**Data (from `docs/client-tools-deliverables.md` §2.3):**
Grid with stars and color coding. Green = best for families, Blue = best for singles, Gold = premium.

### Task 1.5: Build school comparison table

**Files:**
- Create: `scripts/generate-school-table.py`
- Output: `docs/school-comparison.html`

**Data:** All 8 schools from `docs/client-tools-deliverables.md` §3

### Task 1.6: Build bank comparison table

**Files:**
- Create: `scripts/generate-bank-table.py`
- Output: `docs/bank-comparison.html`

**Data:** 5 banks from `docs/client-tools-deliverables.md` §2.4

### Task 1.7: Generate Spanish phrase sheet (NL→ES)

**Files:**
- Output: `docs/spanish-phrase-sheet.html`

**Content:** 20 phrases from `docs/client-tools-deliverables.md` §5

### Task 1.8: Build cultural adaptation guide

**Files:**
- Output: `docs/cultural-guide.html`

**Content:** 10 cultural differences from `docs/client-tools-deliverables.md` §7

---

## PHASE 2: SITE FEATURES (Week 1-2)

### Task 2.1: Add 17 missing services to the JSON content

**Objective:** Sonia offers 17 services that aren't on the site. Add them to all 4 locale JSONs.

**Files:**
- Modify: `content/es.json`
- Modify: `content/en.json`
- Modify: `content/nl.json`
- Modify: `content/de.json`
- Modify: `nexa-pages/servicios.json` (if service page needs reconfig)

**Services to add:**
1. `vehiclePurchase` — Vehicle purchase assistance (commission model)
2. `appliancePurchase` — Appliance/electronics setup
3. `schoolResearch` — School research by city & budget
4. `medicalAccompaniment` — Medical accompaniment
5. `healthInsurance` — Health insurance guidance
6. `spanishTeacher` — Spanish teacher referral
7. `socialIntegration` — Social integration help
8. `simCardSetup` — SIM card activation Day 1
9. `supermarketTour` — Supermarket/cost-of-living orientation
10. `airbnbSetup` — Temporary rental coordination
11. `legalStructure` — Legal structure for remote workers
12. `partnerReferral` — Trusted partner network
13. `drivingLicense` — Driving license guidance
14. `postResidencySupport` — 12-month post-residency support
15. `scamPrevention` — Property scam prevention / red zone tours
16. `interpolCertificate` — Interpol certificate processing
17. `workPermit` — Work permit (automatic with residency)

**Implementation example (add to `content/es.json` `servicesPage.services` groups):**
```json
{
  "title": "Servicios Adicionales",
  "subtitle": "Servicios que Sonia ofrece sin costo adicional (comisión de proveedores)",
  "items": [
    {
      "id": "vehiclePurchase",
      "title": "Compra de Vehículo",
      "description": "Te acompañamos a encontrar el vehículo ideal al mejor precio. Sin costo para vos — la comisión la paga el vendedor.",
      "benefits": ["Sin costo para el cliente", "Precios negociados", "Evitá estafas", "Gestión de papeles"]
    },
    {
      "id": "schoolResearch",
      "title": "Investigación de Colegios",
      "description": "Investigamos colegios por ciudad y presupuesto. Desde colegios públicos hasta internacionales.",
      "price": "USD 200 (único pago)"
    }
  ]
}
```

**Verification:** Build site, check `/es/servicios` shows new services in correct language.

### Task 2.2: Create lead magnet infrastructure

**Objective:** Build email capture + PDF delivery for 4 lead magnets.

**Files:**
- Create: `src/app/api/lead-magnet/route.ts`
- Create: `public/lead-magnets/checklist-documentos.pdf`
- Create: `public/lead-magnets/10-things-paraguay.pdf`
- Create: `public/lead-magnets/schools-guide.pdf`
- Create: `public/lead-magnets/first-30-days.pdf`

**Lead magnets:**
1. **Document Checklist PDF** (4 languages) — $200 AI-generated content
2. **"10 Things Nobody Tells You About Moving to Paraguay"** PDF — $300 AI + Sonia review
3. **Schools Guide for Expat Families** PDF — $400 research
4. **First 30 Days Checklist** PDF — $200 AI-generated

**API route:**
```typescript
// src/app/api/lead-magnet/route.ts
export async function POST(req: Request) {
  const { email, magnetId, locale } = await req.json()
  // 1. Save email to Supabase/JSON
  // 2. Send email with PDF attachment (or redirect to download)
  // 3. Track in CRM
}
```

**Implementation:**
```bash
mkdir -p public/lead-magnets
# Generate PDFs using Python (reportlab or weasyprint)
pip install --user weasyprint
```

**Verification:** Visit `/es/recursos`, enter email, receive PDF download.

### Task 2.3: Rewrite site in first-person voice (after Sonia confirms)

**Objective:** Change all third-person ("Nexa Paraguay ofrece") to first-person ("Yo te ayudo", "Mi servicio") if Sonia chooses that.

**Files:**
- Modify: `content/es.json` — rewrite hero, about, services, process sections
- Modify: `content/en.json` — same
- Modify: `content/nl.json` — same
- Modify: `content/de.json` — same

**Before:** "Nexa Paraguay ofrece servicios profesionales de reubicación."
**After:** "Yo te ayudo con tu mudanza a Paraguay. Viví el proceso con alguien que ya lo vivió."

**Verification:** Check all pages, tone should feel personal.

### Task 2.4: Take and replace real photos

**Objective:** Replace all AI placeholder images with real photos of Sonia.

**Files:**
- Replace: `public/images/team/*.webp` (5 team portraits)
- Replace: `public/images/hero/hero-es.webp` (hero background)
- Replace: `public/images/office/*.webp` (office photos)

**Action items:**
1. Schedule 15-min photo session with Sonia (cell phone is fine)
2. Take: headshot, full body, at her workspace/client meeting, street in Villa Morra
3. Resize to webp, replace files
4. Update `images.json` if file names change

**Verification:** All team section shows real photos, hero background is real.

### Task 2.5: Activate WhatsApp bot

**Objective:** Scan QR code. Takes 1 minute.

**Files:**
- Reference: `docs/08-integrations/whatsapp-ai-runbook.md`
- QR: `public/qr-nexa-whatsapp.png`

**Steps:**
1. Open WhatsApp on Sonia's phone
2. Settings → Linked Devices → Link a Device
3. Scan QR code from `public/qr-nexa-whatsapp.png`
4. Send test message: "Hola, quiero información sobre residencia"
5. Verify bot responds

**Verification:** Bot auto-replies to WhatsApp messages in ES/EN/NL/DE.

### Task 2.6: Add monthly retainer options to pricing page

**Files:**
- Modify: `content/es.json` (add retainer section)
- Modify: `content/en.json`, `nl.json`, `de.json`

**Tiers:**
```
Basic: $50-100/mo — document renewal reminders, quick questions
Standard: $150-250/mo — bill payment, utility issues, medical coordination
Premium: $300-500/mo — full concierge, property check, school liaison
```

### Task 2.7: SEO content for Dutch market

**Files:**
- Modify: `content/nl.json` (add SEO titles/descriptions targeting NL)
- Reference: `docs/07-seo/seo-keyword-strategy.md`

**Target keywords:** "verhuizen naar Paraguay", "belastingvrij wonen Paraguay", "residentie Paraguay aanvragen", "Nederlandse ondernemer Paraguay"

---

## PHASE 3: BUSINESS INFRASTRUCTURE (Week 2)

### Task 3.1: Set pricing (after Sonia confirms)

**Files:**
- Modify: `content/*.json` — update all price references
- Modify: `docs/pricing-matrix-complete.md` — confirm final prices
- Modify: `docs/09-market-intelligence/financial-model.md` — update projections

**Scenarios:** 
- If $1,500 → simplify site to single service + add-ons
- If $2,900 → keep tiered packages
- If $1,500 + $1,400 costs → itemize on pricing page

### Task 3.2: Move nexaparaguay.com DNS

**Files:**
- Reference: `docs/02-site/dns.md`
- Need: Access to domain registrar

**Steps:**
1. Get DNS panel access from Sonia
2. Add A record: `nexaparaguay.com → 72.61.44.159`
3. Add CNAME: `www.nexaparaguay.com → nexa.paragu-ai.com`
4. Remove Shopify redirect
5. Wait for propagation (5-30 min)
6. Verify: `curl -I https://nexaparaguay.com` returns 200

### Task 3.3: Resolve SEPRELAD status

**Files:**
- Modify: `content/es.json` (update compliance disclaimer)
- Reference: `docs/08-integrations/integration-setup-guide.md`

**Action:**
1. Ask Sonia to ask her lawyer: does her service need SEPRELAD registration?
2. If yes → update compliance page with registration number
3. If no → remove "registration pending" note

### Task 3.4: Define ideal client profile and update targeting

**Files:**
- Update: `docs/09-market-intelligence/customer_persona_dossiers.md`
- Update: All `content/*.json` targeting sections

**Decision needed:** Families? Dutch only? Not USA?

---

## PHASE 4: DATA & ANALYTICS (Ongoing)

### Task 4.1: Run full Google Maps scraper

**Objective:** Fill remaining 20 missing categories (embassy, fire station, airport, etc.)

**Files:**
- Script: `/home/ai-whisperers/paragu-ai-leads/scripts/scrape_all_types.py`
- Checkpoint: `/home/ai-whisperers/paragu-ai-leads/data/py_all_types_checkpoint.json`

**Command:**
```bash
cd /home/ai-whisperers/paragu-ai-leads && PYTHONPATH=. python3 scripts/scrape_all_types.py --phase exploratory --dept Central --types all
```

**Note:** API key `AIzaSyBDoR4xWtkeB-7T0tJt431rBFiEt5s7X9I` has remaining credits. The scraper auto-resumes from checkpoint.

### Task 4.2: Add 20 missing manual locations

**Files:**
- Modify: `docs/asuncion-complete-1485-places.csv`

**Manual additions needed:**
1. Silvio Pettirossi Airport (-25.2400, -57.5200)
2. Bus Terminal Asunción (-25.2800, -57.5800)
3. German Embassy (-25.2900, -57.5800)
4. Spanish Embassy (-25.2900, -57.5800)
5. US Embassy (-25.2950, -57.5850)
6. Dutch Honorary Consul (-25.2900, -57.5800)
7. Fire Station #1 (-25.2800, -57.5700)
8. Fire Station #2 (-25.2750, -57.5850)
9. Central Police Station (-25.2770, -57.5750)
10. Tourist Police (-25.2820, -57.5700)
11. Municipalidad de Asunción (-25.2810, -57.6350)
12. Palacio de Justicia (-25.2760, -57.5700)
13. SET/DNIT office (-25.2870, -57.5700)
14. Migraciones office (-25.2870, -57.5680)
15. Identificaciones (Policía) (-25.2780, -57.5730)
16. Asunción Golf Club (-25.2500, -57.5650)
17. Jockey Club (-25.2500, -57.5600)
18. Paraguayan Congress (-25.2800, -57.6350)
19. Shopping del Sol (-25.2480, -57.5650)
20. Paseo La Galería (-25.2500, -57.5600)

### Task 4.3: Wire up GA4

**Files:**
- Modify: `src/app/layout.tsx` (add Google Analytics script)
- Reference: `docs/08-integrations/ga4.md`

```tsx
// Add to layout.tsx
const gaId = process.env.NEXT_PUBLIC_GA4_ID || 'G-XE49GLEP34'

// Add Google Analytics script
<Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
<Script id="ga4-init" strategy="afterInteractive">
  {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`}
</Script>
```

### Task 4.4: Wire up HubSpot/Mailchimp

**Files:**
- Modify: Contact form API endpoint
- Reference: `docs/08-integrations/hubspot.md`, `docs/08-integrations/mailchimp.md`

**Requires:** API keys from Sonia

---

## SUMMARY TIMELINE

| Phase | Tasks | Time | Depends On |
|-------|-------|------|-----------|
| **P0** | Sonia decisions meeting | 1 hour | Nothing — DO FIRST |
| **P1.1** | Emergency card | DONE | Nothing |
| **P1.2-1.8** | Client tools (7 deliverables) | 2-3 hours | P0 (content decisions) |
| **P2.1** | Add 17 services to site | 2 hours | P0 (pricing confirmation) |
| **P2.2** | Lead magnets | 3-4 hours | P0 (what content to offer) |
| **P2.3** | First-person rewrite | 2 hours | P0 (voice choice) |
| **P2.4** | Real photos | 1 hour + shoot | P0 (schedule with Sonia) |
| **P2.5** | WhatsApp QR | **1 minute** | Nothing — DO NOW |
| **P2.6-2.7** | Retainers + SEO | 1-2 hours | P0 |
| **P3.1-3.4** | Business infrastructure | 2-3 hours | P0 (all decisions) |
| **P4.1-4.4** | Data & analytics | 2-4 hours | P0, API keys |

**Total:** ~20 hours of work + 1 meeting with Sonia.

---

## SUCCESS CRITERIA

| Criterion | Measured By |
|-----------|-------------|
| Client can print all tools | `docs/*.html` files exist and render |
| All 32 services on site | Check `/es/servicios` shows 32 items |
| Lead magnets capture emails | Submit form, receive PDF |
| Real photos replace AI | No more AI-generated team images |
| WhatsApp bot responds | Send "Hola" to +595 982 515 138, get reply |
| GA4 tracks visitors | Real-time report shows activity |
| DNS moved | `curl nexaparaguay.com` → 72.61.44.159 |
| Pricing confirmed | `content/*.json` has one consistent price |
| All 1,485 places in GeoJSON | File exists, valid GeoJSON |
| 20 missing categories added | CSV has 1,505+ rows |
