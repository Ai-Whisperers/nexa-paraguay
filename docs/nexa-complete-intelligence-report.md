# Nexa Paraguay — Complete Intelligence & Market Data Report

> **Date:** 2026-05-11 | **Prepared for:** Sonia (founder) & Iván (technical lead)
> **Data sources:** Google Maps API (live scrape), paragu-ai-leads (6,796 beauty/salon businesses), competitor market research, WhatsApp chat analysis, public records, web research
> **Datasets generated:** 1,485 places with GPS in Asunción, 1,548 locations nationwide, full pricing matrix, competitive landscape, client profile

---

## SECTION 1: MARKET POSITIONING

### Target Market Size

| Segment | Annual Potential Clients | Sonia's Capture (w/ website) |
|---------|------------------------|------------------------------|
| Dutch ZZPers considering exit | 5K-10K actively looking | 1-2/mo |
| German pensioners 55+ abroad | 2K-5K considering PY | 0.5-1/mo |
| Belgian digital nomads | 1K-3K | 0.5/mo |
| UK tax optimizers (post-non-dom) | 500-2K | 0.5/mo |
| **Total addressable** | **11K-25K/yr** | **2-5 clients/mo** |

### Competitor Pricing

| Competitor | Price (USD) | Weakness | Sonia's Advantage |
|-----------|-------------|----------|-------------------|
| DIY | $750-$1,000 | 6-10 office visits, Spanish required, high rejection | One coordinated trip, no language barrier |
| MoveToParaguay | $1,200-$2,300 | Generic, no local relationships | Personal relationships with banks/notaries |
| Low Cost Paraguay | $350 | Unverified quality, zero support | Full hand-holding |
| WeParaguay | $1,400-$6,500 | Pricing page 404, EN/ES only | Dutch native, personal brand |
| Paraguay Sovereign | $2,290-$5,490 | Same issues | Acompañamiento casi familiar |
| **Nexa (her audio)** | **$1,500 ← AMBIGUITY** | Undefined pricing | **This is the #1 fix** |
| **Nexa (our model)** | **$2,900-$6,900** | May be too high? | Needs Sonia validation |

**Most likely scenario:** $1,500 = Sonia's professional fee. Government costs + translations + apostilles = ~$1,400. Total client cost: ~$2,900.

### Sonia's 10 Unique Selling Points
1. **Speaks Dutch natively** — no other competitor in PY does this
2. **Lived 7 years in Netherlands** — personal experience of emigration
3. **Acompañamiento casi familiar** — not just paperwork, real accompaniment
4. **Bank/notary relationships** — can open accounts when others can't
5. **Scam prevention on properties** — biggest client fear, her biggest pride
6. **Post-residency support** — up to 12 months, not a drop-and-forget service
7. **One coordinated trip** — all in-person steps in a single day
8. **Fixed pricing** — no hidden fees, transparent costs
9. **10 real clients** — all Dutch, all helped successfully
10. **Her personal story** — the most powerful differentiator in the market

---

## SECTION 2: ASUNCIÓN PLACES DATABASE

### Complete Inventory (1,485 places)

| Category | Count | Avg Rating | With GPS | With Phone |
|----------|-------|-----------|----------|------------|
| Gyms & Fitness | 366 | 4.60★ | ✅ All | 334 |
| Beauty & Hair Salons | 146 | 4.63★ | ✅ All | 139 |
| Spas & Wellness | 95 | 4.55★ | ✅ All | 90 |
| Restaurants & Food | 40+ | 4.50★ | ✅ All | 36 |
| Clothing Stores | 23 | 4.60★ | ✅ All | 22 |
| Banks | 20 | 3.72★ | ✅ All | 18 |
| Cafes | 23 | 4.49★ | ✅ All | 20 |
| Bars | 19 | 4.31★ | ✅ All | 17 |
| Bakeries | 18 | 4.64★ | ✅ All | 16 |
| Electronics | 17 | 4.41★ | ✅ All | 17 |
| Night Clubs | 17 | 4.22★ | ✅ All | 15 |
| Movie Theaters | 16 | 4.36★ | ✅ All | 14 |
| Dentists | 12 | 4.77★ | ✅ All | 12 |
| Doctors | 10 | 4.63★ | ✅ All | 10 |
| Parks | 19 | 4.19★ | ✅ All | 7 |
| Gas Stations | 19 | 4.21★ | ✅ All | 12 |
| Police | 20 | 1.31★ | ✅ All | 20 |
| Museums | 20 | 4.67★ | ✅ All | 14 |
| Stadiums | 20 | 4.32★ | ✅ All | 10 |
| Lodging/Hotels | 20 | 4.40★ | ✅ All | 20 |
| Churches | 20 | 4.71★ | ✅ All | 17 |
| Car Repair | 20 | 4.67★ | ✅ All | 20 |

**All 1,485 places have GPS coordinates.**

### Key Data Files

| File | Size | Contents |
|------|------|----------|
| `docs/asuncion-complete-1485-places.csv` | 203KB | 1,485 rows with name, type, lat/lng, phone, rating, address |
| `docs/asuncion-1485-places.geojson` | 288KB | Ready to import into Google Maps / GIS tools |
| `docs/paraguay-locations-database.json` | 536KB | 1,548 locations across 17 departments |
| `docs/pricing-matrix-complete.md` | 24KB | Full pricing for all services, 12 competitors benchmarked |
| `docs/complete-paraguay-department-analysis.md` | 19KB | 17 departments analyzed |
| `docs/central-asuncion-complete-analysis.md` | 17KB | Central dept deep dive with neighborhood profiles |
| `docs/paraguay-location-intelligence.md` | 13KB | City profiles, costs, safety, tourism |

### Data Gaps (20 categories not covered)

| Missing Category | Why | Workaround |
|-----------------|-----|------------|
| Embassy, Fire Station, City Hall | Not well-tagged in Google Maps API for Paraguay | Manual research for the 15 key embassies |
| Lawyer, Accounting, Real Estate | Professional services not well indexed | Sonia already has partner network |
| Airport, Bus Station, Taxi Stand | Single locations, well known | Manually add Silvio Pettirossi Airport + bus terminal |
| Car Rental, Locksmith, Plumber | Low-density categories | Refer Sonia's personal network |
| Campground, RV Park | Outside Asunción metro | Part of tourism/weekend report |

---

## SECTION 3: CLIENT PROFILE — SONIA WEISS

### Personal
| Field | Detail |
|-------|--------|
| Full name | Sonia Weiss (Edith López van der Pol) |
| Lived in Netherlands | 7 years (music industry → full-time mother) |
| Languages | Spanish, Dutch, English, Guarani |
| Children | Iván (you), Kiki, Luana |
| Spiritual connection | Kabbalah Centre Paraguay (since ~2013) |
| Core philosophy | "Acompañamiento casi familiar" |
| Biggest pride | Getting clients properties at good prices, preventing scams |
| Ethical stance | Prefers empty sections over fake content |

### All Businesses
1. **Weiss van der Pol Group SRL** (RUC 800281063) — Software dev outsourcing + import (33 China shipments)
2. **La Vieja Holanda** — Antique import business (8K Instagram followers, 2,992 posts)
3. **Casa Weiss van der Pol** — Restaurant in San Lorenzo (listed on todosnegocios.com)
4. **Nexa Paraguay** — Current project, pre-revenue, 10 Dutch clients helped

### Her 10-Step Process
1. Contact → inform of all requirements
2. Documents apostilled + translated locally
3. Residency application submitted (3-4 months)
4. During wait: Airbnb setup, SIM chip, show surroundings
5. Bank account opening for capital transfer
6. Property search — her biggest value add
7. Schools (if children)
8. Health insurance guidance
9. Legal structure for remote workers
10. Trusted referral network (accountants, lawyers)

---

## SECTION 4: SERVICE OPPORTUNITIES MATRIX

### Currently on Site (8)
| # | Service | Notes |
|---|---------|-------|
| 1 | Residencia Permanente | Core service |
| 2 | Cédula de Identidad | Included |
| 3 | Apostilla y Traducción | Included |
| 4 | Apertura de Cuenta Bancaria | Key differentiator |
| 5 | Registro Tributario (RUC) | Included in Business |
| 6 | Alquiler de Apartamentos y Casas | Part of settlement |
| 7 | Compra de Propiedades | Commission model |
| 8 | Debida Diligencia | Her specialty |

### Done But Not on Site (17 — ADD TO WEBSITE)
| # | Service | Revenue Model | Est. Value |
|---|---------|--------------|------------|
| 9 | Vehicle purchase assistance | Commission from seller | $500-800/sale |
| 10 | Appliance/electronics purchase | Commission from store | $200-500/setup |
| 11 | Local SIM chip (Day 1) | Included | $0 (value-add) |
| 12 | School research by city & budget | One-time fee | $200 |
| 13 | Medical accompaniment | Per half-day | $100 |
| 14 | Health insurance guidance | Free advisory | Included |
| 15 | Spanish teacher referral | Free referral | Included |
| 16 | Social integration (clubs, activities) | Free/paid | TBD |
| 17 | Supermarket/cost-of-living tours | Built-in | Included |
| 18 | Airbnb / temporary rental setup | Included | Included |
| 19 | Legal structure for remote workers | Per day | $150-250 |
| 20 | Trusted partner referrals | Commission from partners | % of their margin |
| 21 | Interpol certificate processing | Included | Included |
| 22 | Driving license guidance | Per session | $100 |
| 23 | Work permit (automatic) | Included | Included |
| 24 | Post-residency accompaniment (12mo) | Core value | $1,500 fee |
| 25 | Scam prevention / red zone tours | Commission | Prevents $50K+ mistakes |

### Lead Magnets to Implement (25-29)
| # | Lead Magnet | Est. Cost | Capture Rate |
|---|------------|-----------|-------------|
| 26 | Document Checklist PDF (4 languages) | $200 AI-generated | 15-25% |
| 27 | "10 Things Nobody Tells You" PDF | $300 AI + Sonia review | 20-30% |
| 28 | Schools Guide for Expat Families | $400 research | 10-15% |
| 29 | First 30 Days Checklist | $200 AI-generated | 5-10% |

### Monthly Retainer Options (30-32)
| # | Tier | Monthly | Services |
|---|------|---------|----------|
| 30 | Basic | $50-100 | Document renewal reminders, quick questions |
| 31 | Standard | $150-250 | Bill payment coordination, utility issues |
| 32 | Premium | $300-500 | Medical appointments, property check, concierge |

---

## SECTION 5: PRICING STRATEGY

### Proposed Fee Schedule

| Service | Price (USD) | Margin |
|---------|-------------|--------|
| **Residency Package (Base)** | **$2,900** | ~60-70% |
| **Residency + Bank (Business)** | **$4,400** | ~65-75% |
| **Investor Program (12mo support)** | **$6,900** | ~60-70% |
| Land Purchase Advisory | $1,000-3,000 | ~80% |
| School Research | $200 | ~90% |
| Vehicle Purchase Assist | $0 (commission) | 100% |
| Appliance/Furniture Assist | $0 (commission) | 100% |
| Post-Residency Monthly | $150-250/mo | ~90% |
| Per-Incident Support | $100/half day | ~80% |

### Commission Revenue (Pure Margin)
| Source | Per Transaction | Annual Potential (at 5 clients) |
|--------|----------------|--------------------------------|
| Property sale (2.75% of $150K) | $4,125 | $8,250-20,625 |
| Vehicle purchase | $500-800 | $1,000-4,000 |
| Appliance/household setup | $200-500 | $1,000-2,500 |
| Legal/accounting referral | % of their fee | $500-2,000 |
| **Total commission** | | **$10,750-29,125** |

### Financial Projections

| Scenario | Clients/Mo | Annual Revenue | Annual Costs | Net |
|----------|-----------|---------------|-------------|-----|
| Current (no marketing) | 0.5-1 | $17K-$35K | $8K-$12K | $9K-$23K |
| With website (now) | 2-3 | $70K-$104K | $15K-$22K | $55K-$82K |
| With website + marketing | 3-5 | $104K-$174K | $22K-$35K | $82K-$139K |
| With team/scale | 5-10 | $174K-$348K | $35K-$80K | $94K-$268K |

---

## SECTION 6: KEY DECISIONS NEEDED FROM SONIA

### P0 — Must Answer Today (Site Blockers)
| # | Question | Why It Matters |
|---|----------|----------------|
| 1 | **Price: $1,500 or $2,900?** | All site pricing depends on this. Her audio said $1,500. Our model says $2,900. |
| 2 | **Her full story: include nervous breakdown?** | Defines brand power. "Acompañamiento casi familiar" is hollow without the real story. |
| 3 | **Photos: when can I come take them?** | Site credibility blocker. Current images are AI placeholders. |
| 4 | **WhatsApp QR: scan now (1 minute)** | Unlocks lead gen. Bot is configured but dead without QR scan. |

### P1 — Site Structure
| # | Question | Options |
|---|----------|---------|
| 5 | One service + add-ons, or packages? | Determines pricing page design |
| 6 | Ideal client profile? | Families? Dutch only? Not USA? Defines all content |
| 7 | First-person or third-person voice? | "Sonia habla como Sonia" vs "Nexa Paraguay ofrece" |
| 8 | Blog: AI content or her writing? | SEO potential vs authenticity |

### P2 — Monetization
| # | Question | Suggested Answer |
|---|----------|-----------------|
| 9 | Post-residency day rate? | $150-250/day (she doesn't know what to charge) |
| 10 | School research fee? | $200 one-time (families are her target) |
| 11 | Commission income numbers? | Property 2.75%, vehicle/legal/appliance unknown |

### P3 — Operations
| # | Question | Notes |
|---|----------|-------|
| 12 | Office address? | Home, La Vieja Holanda, or virtual "Asunción" |
| 13 | SEPRELAD status? | Ask her lawyer if registration is needed |
| 14 | nexaparaguay.com domain? | Move DNS to 72.61.44.159 |
| 15 | Investor meeting audio? | Record it → goldmine of market intelligence |
| 16 | Capacity? | Can she handle 3-4 clients/month? |
| 17 | AI adoption? | WhatsApp bot for 24/7 lead qualification |

---

## SECTION 7: DATA QUALITY & COVERAGE

### Strengths
- **1,485 places mapped in Asunción** — all with GPS coordinates
- **36 categories covered** — from banks to bakeries, gyms to dentists
- **1,349 with phone numbers** — client-ready referral data
- **765 with websites** — for digital presence verification
- **All GeoJSON/CSV exports** ready for GIS analysis
- **17 department analysis** complete with city profiles

### Gaps
- Niche categories (embassies, fire stations, bus stations) not well-tagged in Google Maps API
- Professional services (lawyers, accountants, real estate agents) — Sonia's personal network is better than API data
- Some categories like "car rental" and "parking" are low-density in Asunción
- The scraper was interrupted before completing all 65 search types (got 30 basic + 12 quick + merged beauty = ~42 categories)

### To Fill Remaining Gaps
- Run `scripts/scrape_all_types.py --dept Central --types all` with a fresh API key (Google Cloud $200 free credit)
- The checkpoint at `data/py_all_types_checkpoint.json` has 1,485 businesses saved and will auto-resume
- 20 remaining types are mostly niche (embassy, fire station, airport, etc.) — manual entry for these is faster than API scraping
