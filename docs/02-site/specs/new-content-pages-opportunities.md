# Nexa Paraguay — New Pages & Content Opportunities

> **Based on:** All research data — 1,485 places mapped, 32 services identified, 12 competitors analyzed, Messaging chat analysis, client profile
> **Status:** Some pages have content JSONs but no nexa-pages config yet. Others need to be created from scratch.

---

## SECTION 1: LANDING PAGES (Content Exists, Needs Page Config)

These 4 landing pages have full content in the JSONs but no `nexa-pages/` config. They're designed for specific ad campaigns.

### 1.1 /inversor — Investor Program Landing

**Purpose:** LinkedIn ads targeting European investors. Focus on tax optimization.

| Section | Content Status | Notes |
|---------|---------------|-------|
| Hero | ✅ In JSON | "Camino estructurado para inversores" |
| Process | ✅ In JSON | 5-step process |
| Programs | ✅ In JSON | Tier comparison |
| Trust | ✅ In JSON | Credentials |
| CTA | ✅ In JSON | Book consultation |
| **→ nexa-pages/inversor.json** | ❌ Missing | Needs config file |

**Implementation:**
```json
{
  "id": "inversor",
  "sections": [
    {"id": "header", "content": "navigation"},
    {"id": "hero", "content": "landingInversor.hero"},
    {"id": "process-timeline", "content": "landingInversor"},
    {"id": "trust-signals", "content": "landingInversor"},
    {"id": "cta-banner", "content": "landingInversor"},
    {"id": "footer", "content": "footer"}
  ]
}
```

### 1.2 /empresa — Company Formation Landing

**Purpose:** Ads targeting entrepreneurs. Focus on EAS company, bank account.

**needs:** `nexa-pages/empresa.json` (content at `landingEmpresa.*`)

### 1.3 /lifestyle — Lifestyle Landing

**Purpose:** Ads targeting retirees / digital nomads. Focus on quality of life, costs.

**needs:** `nexa-pages/lifestyle.json` (content at `landingLifestyle.*`)

### 1.4 /trust — Trust & Credibility Landing

**Purpose:** Ads targeting skeptical prospects. Focus on legality, partners, track record.

**needs:** `nexa-pages/trust.json` (content at `landingTrust.*`)

---

## SECTION 2: HIGH-VALUE NEW PAGES (No Content Yet)

### 2.5 /familias — Families Page

**Target:** European families with children (Sonia's preferred client type)

**Why:** Sonia explicitly said families are her ideal clients but the site has NOTHING specific for them.

**Content needed:**
```
- Hero: "Tu mudanza a Paraguay con toda la familia"
- School comparison table (from docs/school-comparison.html)
- Healthcare guide for families
- Child safety in Paraguay
- Family activities, parks, sports
- Cost breakdown: family of 4
- Testimonial from family client (if Sonia gets consent)
- CTA: "Agendá una consulta familiar gratuita"
```

**Data available:**
- 8 international schools with tuition ✅
- 19 parks with GPS coordinates ✅
- Hospital rankings ✅
- Cost analysis for families (from pricing docs) ✅

### 2.6 /costos — Cost of Living Calculator

**Target:** Budget-conscious prospects

**Content:**
```
- Interactive cost calculator (rent + food + school + health + transport)
- Comparison to European cities (Amsterdam, Berlin, Madrid)
- Monthly budget by lifestyle profile
```

### 2.7 /nl/holanda — Dutch-Specific Page (NL only)

**Target:** Dutch prospects (Sonia's core market)

**Why:** Sonia speaks Dutch, lived 7 years in NL. This should be her strongest landing page.

**Content needed:**
```
- "Waarom Nederlandse ondernemers kiezen voor Paraguay" (why Dutch entrepreneurs choose PY)
- Sonia's story in Dutch (first person)
- Box 3 comparison (NL 36% → PY 0%)
- Dutch tax emigration explained simply
- Dutch community in Paraguay (Facebook group 400+ members)
- Dutch schools (St. Mary's / Goethe for NL kids)
- "Ik ben Sonia. Ik woonde 7 jaar in Nederland."
```

**Data available:**
- Full Sonia profile ✅
- Dutch channel analysis ✅
- Competitor analysis ✅
- Dutch tax research ✅

### 2.8 /de/deutschland — German-Specific Page (DE only)

**Target:** German prospects (growing market segment)

**Why:** 230K+ German pensioners already abroad. Natural PY target.

**Content needed:**
- "Warum deutsche Rentner und Unternehmer nach Paraguay ziehen"
- German pension taxation vs PY territorial system
- German community in Paraguay
- Colegio Goethe partnership

### 2.9 /proceso-detallado — Detailed Process Page

**Target:** Prospects who want detail before booking

**Content:**
- Day-by-day timeline of the operational trip
- Document requirements checklist (printable)
- Cost breakdown (government fees vs Sonia's fee)
- FAQ specific to each step
- Video walkthrough (if Sonia records one)

### 2.10 /paraguay-vs — Interactive Comparison Page

**Target:** Prospects comparing destinations

**Content:**
- Paraguay vs Portugal (NHR abolished → PY wins)
- Paraguay vs Spain (Digital Nomad Visa → PY wins)
- Paraguay vs Panama ($200K investment vs PY $0)
- Paraguay vs Uruguay ($525K investment vs PY $0)
- Interactive slider: "Where do you save more?"

**Data available from research:**
- Full competitor pricing comparison ✅
- Portugal NHR analysis ✅
- Spain DNV requirements ✅
- Panama/ Uruguay costs ✅

### 2.11 /testimonios — Testimonials Page

**Target:** Social proof seekers

**Content:**
- Sonia's 10 client stories (anonymized)
- Before/after: tax situation
- Before/after: quality of life
- Video testimonials (when available)

### 2.12 /guias — Guides Hub

**Target:** SEO traffic + lead capture

**Content:**
- Guide 1: "10 cosas que nadie te dice sobre mudarte a Paraguay" (lead magnet)
- Guide 2: "Checklist de documentos para residencia" (lead magnet)
- Guide 3: "Guía de colegios internacionales" (lead magnet)
- Guide 4: "Primeros 30 días en Paraguay" (lead magnet)
- All available as downloadable PDFs

---

## SECTION 3: BLOG POSTS FROM RESEARCH (SEO Content)

Based on our research, these blog posts would rank well:

### For the Dutch Market (NL):

| Topic | Keywords | Why It Would Rank |
|-------|----------|-------------------|
| "Box 3 belasting ontwijken verhuizen Paraguay" | box 3, belasting, emigratie | High-volume search, low competition |
| "ZZP Nederland verlaten Paraguay 2026" | ZZP, DBA, handhaving, emigratie | DBA crisis is current news |
| "Portugal NHR afgeschaft alternatief Paraguay" | Portugal, NHR, alternatief | Trending topic |
| "Belastingvrij wonen Paraguay mythe of realiteit" | belastingvrij, Paraguay, wonen | Myth-busting = high engagement |
| "Kosten levensonderhoud Asunción 2026" | kosten, Asunción, levensonderhoud | Comparison content |
| "Nederlandse community Paraguay" | Nederlanders, community, expat | Long-tail, high conversion |
| "Hoe krijg ik een verblijfsvergunning Paraguay" | verblijfsvergunning, stap voor stap | How-to, high search volume |
| "Digital nomad Paraguay vs Spanje" | digital nomad, vergelijking | Comparison content |

### For the German Market (DE):

| Topic | Keywords |
|-------|----------|
| "Steuerfrei leben in Paraguay 2026" | steuerfrei, Paraguay, Auswanderung |
| "Rente in Paraguay besteuerung" | Rente, Paraguay, Steuer |
| "Paraguay vs Portugal Auswanderung" | Auswanderung, Vergleich |
| "Lebenshaltungskosten Paraguay Asunción" | Lebenshaltungskosten, Paraguay |
| "Deutsche Auswanderer Paraguay Erfahrungen" | Auswanderer, Erfahrungen |

### For the English Market (EN):

| Topic | Keywords |
|-------|----------|
| "Paraguay Digital Nomad Visa 2026" | digital nomad, visa, Paraguay |
| "Paraguay vs Portugal cost of living" | comparison, cost, living |
| "Paraguay tax free foreign income" | tax, foreign income, territorial |
| "Moving to Paraguay with family guide" | moving, family, guide |
| "Best neighborhoods in Asuncion for expats" | neighborhoods, expat, Asunción |

---

## SECTION 4: IMPLEMENTATION PRIORITY

| Priority | Page | Effort | Impact | Dependencies |
|----------|------|--------|--------|-------------|
| **P0** | Add 4 missing landing pages (inversor, empresa, lifestyle, trust) | 30 min | High | None — content exists |
| **P0** | /nl/holanda (Dutch-specific) | 2 hours | Very High | Sonia's pricing decision |
| **P1** | /familias (families page) | 2-3 hours | High | School data complete |
| **P1** | /testimonios | 1 hour | Medium | Needs client consent |
| **P2** | /paraguay-vs (comparison page) | 2 hours | Medium | All data available |
| **P2** | /guias (guides hub + lead magnets) | 4 hours | High | PDF generation |
| **P2** | /de/deutschland (German-specific) | 2 hours | Medium | German blog content |
| **P3** | Blog posts (20 articles) | Ongoing | Medium | Sonia's input on voice |
| **P3** | /proceso-detallado | 1 hour | Medium | All data available |
| **P3** | /costos (calculator) | 3 hours | Low | Interactive dev needed |

---

## SECTION 5: TOTAL NEW CONTENT INVENTORY

| Type | Count | Status |
|------|-------|--------|
| Landing pages (content exists, needs config) | 4 | ❌ Missing nexa-pages config |
| New dedicated pages (need full build) | 8 | ❌ Not started |
| Blog posts (NL market) | 10 | 📝 Topics researched |
| Blog posts (DE market) | 5 | 📝 Topics researched |
| Blog posts (EN market) | 5 | 📝 Topics researched |
| Downloadable guides (lead magnets) | 4 | ❌ Content exists, needs PDF generation |
| **Total** | **36** | |
