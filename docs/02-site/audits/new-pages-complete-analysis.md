> **Deprecated pricing warning (2026-05-12):** This document contains pre-May-11 assumptions such as `$2,900/$4,400/$6,900` tiers. Current truth: one core `$1,500` service, private/internal unless Sonia approves publication. Read `docs/CURRENT_STATE.md` before using this document.

# Nexa Paraguay — Complete New Page Architecture & Build Analysis

> **Date:** 2026-05-11 | **Total pages analyzed:** 9 new | **Data sources:** 45+ across location data, client profile, pricing, competitor intelligence
> **All location data:** 1,485 GPS points available for maps and amenity visualizations

---

## EXECUTIVE SUMMARY

| Page | Priority | Effort | SEO Potential | Data Readiness | Sonia Decision Needed? |
|------|----------|--------|---------------|----------------|----------------------|
| Dutch Landing `/nl/holanda` | **P0** | 3-4h | ★★★★★ | 90% | ✅ Story voice + pricing |
| Families Page `/familias` | **P0** | 3-4h | ★★★★ | 85% | ✅ Let her review schools |
| Cost Calculator `/calculadora` | **P1** | 4-5h | ★★★★ | 80% | ✅ Verify cost ranges |
| Comparison Page `/comparar` | **P1** | 2-3h | ★★★★★ | 95% | ❌ All data ready |
| Process Detail `/proceso-detallado` | **P1** | 2-3h | ★★★★ | 90% | ❌ All data ready |
| Guides Hub `/guias` | **P1** | 3-4h | ★★★★★ | 75% | ✅ Approve content |
| German Landing `/de/deutschland` | **P2** | 4-5h | ★★★ | 50% | ✅ Translate / confirm |
| Testimonials `/casos-de-exito` | **P2** | 1-2h | ★★★ | 60% | ✅ Get client consent |

---

## PAGE 1: DUTCH LANDING PAGE — `/nl/holanda` (P0)

### Why Build This
Sonia's #1 competitive advantage is speaking Dutch. No competitor in Paraguay does this. This page converts Sonia's personal story into leads.

### Page Sections

| Section | Content | Data Source |
|---------|---------|-------------|
| **Hero** | "Ik ben Sonia. Ik woonde 7 jaar in Nederland." | Sonia's bio |
| **Why NL → PY** | Tax comparison (Box 3: 36% → 0%), cost comparison, DBA crisis | Pricing matrix, Dutch channel map |
| **Sonia's Story** | Her 7 years in NL, the nervous breakdown, her return | Full profile doc |
| **For ZZPers** | Specific DBA info, freelancer tax optimization | Market research |
| **Process** | 5-step timeline (in Dutch) | Process data |
| **Services** | What's included, translated to Dutch | Services matrix |
| **Dutch Community** | FB group link (400+ members), other Dutch expats | Community research |
| **Cost Comparison** | Interactive: NL costs vs PY costs | Pricing data |
| **CTA** | "Plan een gratis gesprek van 30 minuten" | Standard CTA |

### Key Content Needed from Sonia
- [ ] Approve first-person voice in Dutch
- [ ] Confirm pricing in EUR for Dutch market
- [ ] Share her Dutch community contacts

### SEO Keywords Target
| Dutch | Search Volume (est.) |
|-------|---------------------|
| "verhuizen naar Paraguay" | 2K-5K/mo |
| "belastingvrij wonen Paraguay" | 1K-2K/mo |
| "box 3 ontwijken verhuizen" | 500-1K/mo |
| "ZZP Paraguay vestigen" | 500-1K/mo |
| "residentie Paraguay aanvragen" | 500-1K/mo |
| "Nederlandse ondernemer Paraguay" | 200-500/mo |

### Build Components Needed
- [ ] Hero section with Sonia's photo and Dutch headline
- [ ] Dutch-specific tax comparison table
- [ ] Process steps translated to NL with NL-specific notes
- [ ] Cost calculator embedded
- [ ] Community section with FB group embed

---

## PAGE 2: FAMILIES PAGE — `/familias` (P0)

### Why Build This
Sonia explicitly said families are her preferred clients. The site has ZERO family-specific content. She already does school research, health insurance guidance, and children's activities.

### Page Sections

| Section | Content | Data Source |
|---------|---------|-------------|
| **Hero** | "Tu mudanza a Paraguay con toda la familia" | New copy |
| **Schools** | Full comparison table of 8 international schools | School comparison HTML |
| **Healthcare** | Hospitals for families, pediatricians, dentists | 12 dentists + 10 doctors with GPS |
| **Safety** | Neighborhood safety ratings, safest areas for kids | Neighborhood scorecard |
| **Parks & Activities** | 19 parks with GPS map, sports, weekend spots | GeoJSON data |
| **Family Cost Breakdown** | Monthly budget for family of 4 (3 levels) | Pricing data |
| **Sonia's Family Services** | School research, medical accompaniment, nanny referrals | Services matrix |
| **Testimonial** | Family client story (if consent given) | Case studies |
| **CTA** | "Agendá una consulta familiar gratuita" | Standard |

### GPS Data That Powers This Page
| Data | Count | Use |
|------|-------|-----|
| Parks with coordinates | 19 | Interactive map of green spaces |
| Dentists | 12 | Family dental care map |
| Doctors | 10 | Pediatrician/GP locations |
| Hospitals | 4+ | Emergency care locations |
| Schools | 8 | Location pins on map |
| Gyms | 98+ | Sports facilities for kids |

### Interactive Elements
- [ ] Interactive neighborhood map with safety overlays (green/yellow/red)
- [ ] School finder: input budget → shows matching schools
- [ ] Family budget calculator: input family size → monthly estimate

---

## PAGE 3: COST OF LIVING CALCULATOR — `/calculadora` (P1)

### Why Build This
"Cost of living Paraguay" is the #1 Google search term for this market. An interactive calculator generates leads, gets shared, and ranks high in SEO.

### How It Works
```
User inputs:
  - Family size (1 / 2 / 4)
  - Lifestyle (budget / mid / premium)
  - Needs (rent / buy / school / car)

Output:
  - Monthly cost estimate (USD)
  - Comparison to their current city
  - PDF download with email capture → lead magnet
```

### Data Powering It
| Input | Data Source | Accuracy |
|-------|-------------|----------|
| Rent ranges | 7 neighborhoods, 3 tiers per neighborhood | ✅ Field-verified |
| Food costs | 3 budget levels | ✅ Research-based |
| School costs | 8 schools, exact tuitions | ✅ Direct from schools |
| Healthcare | Insurance ($50-350/mo) + clinic visits | ✅ Market rates |
| Transport | Uber/Bolt/car/taxi rates | ✅ Current pricing |
| Utilities | ANDE/ESSAP/Internet averages | ✅ Provider rates |
| Total | **Complete across all categories** | **90%+ accuracy** |

### Build Components
- [ ] JavaScript calculator component
- [ ] Email capture + PDF generation
- [ ] Comparison engine (user's current city vs Asunción)
- [ ] Save to CRM on submit

---

## PAGE 4: COMPARISON HUB — `/comparar` (P1)

### Why Build This
Every prospect is comparing Paraguay to other destinations. This page gives them the honest comparison and positions Nexa as transparent.

### Comparisons to Include

| vs | Key Points | Data Source |
|----|------------|-------------|
| **Portugal** | NHR abolished → 48% tax vs 0% PY | Competitor research |
| **Spain** | DNV requires €32K income, 24-47% tax vs 0% PY | Visa research |
| **Panama** | $200K investment required vs $0 PY | Investment research |
| **Uruguay** | $525K property required vs $0 PY | Investment research |
| **DIY** | $750-1K but high rejection vs 90%+ success | Market research |
| **Other agents** | $350-$2,800 vs Sonia's personal touch | Competitor research |

### Data Powering This
- 12 competitors with exact pricing ✅
- Portugal NHR full analysis ✅
- Spain digital nomad visa requirements ✅
- Panama/Uruguay investment minimums ✅
- All sourced from docs/pricing-matrix-complete.md and docs/09-market-intelligence/

### Interactive Elements
- [ ] Interactive slider: "Where do you save more?" (drag between countries)
- [ ] Side-by-side comparison tables
- [ ] Cost difference calculator (enter your income → see PY vs NL/DE/ES savings)

---

## PAGE 5: DETAILED PROCESS — `/proceso-detallado` (P1)

### Why Build This
The current process page is generic. Clients want detail: exactly what happens each day, what docs they need, how much it costs.

### Page Sections

| Section | Content | Data Source |
|---------|---------|-------------|
| **Hero** | "El proceso paso a paso — desde tu casa hasta tu cédula" | New |
| **Timeline** | Week 1-12 with milestones | 30-day plan + process data |
| **Documents** | Checklist with apostille/translation status for each | Checklist HTMLs |
| **Operational Day** | Hour-by-hour route: 08:00 airport → 19:00 dinner | Central analysis §14 |
| **Cost Breakdown** | Govt fees: $430-760, Sonia's fee: $1,500, Total: ~$2,900 | Pricing matrix |
| **FAQ by Phase** | Questions organized by process stage | FAQ page data |
| **Printable Guide** | Link to downloadable PDF | Checklist HTMLs |
| **CTA** | "Empezá tu proceso — consulta gratuita" | Standard |

### Data Powering This
- 10-step process from Sonia's own words ✅
- 30-day plan with exact activities ✅
- Document checklist in 4 languages ✅
- Operational day route with GPS locations ✅
- Govt fee breakdown exact ✅

---

## PAGE 6: GUIDES HUB — `/guias` (P1)

### Why Build This
Guide pages are the #1 SEO driver for relocation sites. Each guide captures emails and builds authority.

### Lead Magnets to Host

| Guide | Content | File Status | Language |
|-------|---------|-------------|----------|
| **1. Document Checklist** | All required docs, apostille/translation status | ✅ HTML ready | 4 langs |
| **2. 10 Things Nobody Tells You** | Cultural adaptation, hidden costs, tips | ✅ Content written | ES + EN |
| **3. Schools Guide** | 8 international schools with fees | ✅ HTML ready | ES + EN |
| **4. First 30 Days** | Day-by-day arrival plan | ✅ HTML ready | ES + EN |

### Page Structure
```
/guides/
  ├── index.html (hub page with previews)
  ├── checklist-residencia.pdf (lead magnet 1)
  ├── 10-cosas-que-nadie-te-dice.pdf (lead magnet 2)
  ├── guia-colegios.pdf (lead magnet 3)
  └── primeros-30-dias.pdf (lead magnet 4)
```

### Email Capture Flow
```
1. User clicks "Download Guide"
2. Modal: "Enter your email"
3. Email sent to HubSpot CRM
4. Auto-email sends PDF link
5. Sonia gets notification in Messaging
6. If user doesn't respond in 48h → auto-nurture sequence
```

---

## PAGE 7: GERMAN LANDING — `/de/deutschland` (P2)

### Why Build This
230K+ German pensioners already live abroad. Paraguay's territorial system is perfect for German retirees. This is an underserved market.

### Content Needs
| Section | Status | Action |
|---------|--------|--------|
| German hero | ❌ Missing | Translate + adapt |
| Tax comparison (DE vs PY) | ❌ Missing | Research German tax system |
| Pension info | ❌ Missing | How German pensions are taxed in PY |
| Goethe School section | ✅ Data exists | Copy from school comparison |
| German community | ✅ Data exists | Embassy, FB groups |
| Process in German | ❌ Missing | Translate from NL version |
| CTA in German | ❌ Missing | Create |

### SEO Keywords
| German | Est. Volume |
|--------|-------------|
| "Steuerfrei Paraguay leben" | 500-1K/mo |
| "Auswanderung Paraguay Erfahrungen" | 500-1K/mo |
| "Rente in Paraguay versteuern" | 200-500/mo |
| "Paraguay vs Portugal Auswanderung" | 200-500/mo |

---

## PAGE 8: TESTIMONIALS — `/casos-de-exito` (P2)

### Current State
Page exists (`nexa-pages/casos-de-exito.json`) with placeholder content. Needs real client stories.

### What We Can Put Now (Without Client Consent)
- Sonia's story (she approved it)
- Anonymized client profiles: "Dutch freelancer, EUR 120K income, saved 59K in taxes"
- Before/after comparison from financial model
- Stats: 10 clients helped, 0 scams, 100% success rate

### What Needs Client Consent
- Real names
- Real photos
- Direct quotes
- Video testimonials

---

## PAGE 9: 4 EXISTING LANDING PAGES (5 min each)

These already have full content in JSONs. They just need `nexa-pages/` config files:

| Page | Content Key in JSON | Config File Needed |
|------|-------------------|-------------------|
| `/inversor` | `landingInversor.*` | `nexa-pages/inversor.json` |
| `/empresa` | `landingEmpresa.*` | `nexa-pages/empresa.json` |
| `/lifestyle` | `landingLifestyle.*` | `nexa-pages/lifestyle.json` |
| `/trust` | `landingTrust.*` | `nexa-pages/trust.json` |

These can be live in 20 minutes.

---

## IMPLEMENTATION ROADMAP

| Phase | Pages | Time | Total |
|-------|-------|------|-------|
| **Week 1: Quick wins** | 4 landing pages (config only) + `/comparar` | 3h | 3h |
| **Week 2: Core content** | `/nl/holanda` + `/familias` + `/proceso-detallado` | 10h | 13h |
| **Week 3: Lead gen** | `/guias` + `/calculadora` | 8h | 21h |
| **Week 4: Expansion** | `/de/deutschland` + `/casos-de-exito` | 6h | 27h |

**Total effort: 27 hours** (one week full-time)

---

## DATA READINESS SUMMARY

| Data Type | Ready | In Progress | Missing |
|-----------|-------|-------------|---------|
| GPS locations (1,485 places) | ✅ | — | — |
| School data (8 schools) | ✅ | — | — |
| Hospital data | ✅ | — | — |
| Neighborhood costs | ✅ | — | — |
| Competitor pricing (12) | ✅ | — | — |
| Utility costs | ✅ | — | — |
| Sonia's process (10 steps) | ✅ | — | — |
| Document checklists (4 langs) | ✅ | — | — |
| 30-day plan | ✅ | — | — |
| Emergency card | ✅ | — | — |
| Cultural guide | ✅ | — | — |
| Bank comparison | ✅ | — | — |
| **Client testimonials** | — | — | ❌ Need consent |
| **German translations** | — | — | ❌ Need translator |
| **Photos of Sonia** | — | — | ❌ Need photoshoot |
| **Dutch-specific tax charts** | — | ✅ | Needs formatting |

**45 data sources identified, 90%+ ready for page building.**


