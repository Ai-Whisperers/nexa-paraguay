# GPS Data Available for Sonia — Quick Reference

> **Purpose:** What location data we have, how Sonia can use it with clients, what's missing.

---

## 1. WHAT WE HAVE

### 1,521 Places in Asunción & Central Department

| Category | Count | Has Phone | Has GPS | Has Rating |
|----------|-------|-----------|---------|------------|
| 🏫 Schools | 48 | ✅ Most | ✅ All | ✅ |
| 🏥 Hospitals/Clinics | 32 | ✅ | ✅ | ✅ |
| 🏦 Banks | 24 | ✅ | ✅ | ✅ |
| 🛒 Supermarkets | 31 | ✅ | ✅ | ✅ |
| 💊 Pharmacies | 20 | ✅ | ✅ | ✅ |
| 🏬 Shopping Centers | 17 | ✅ | ✅ | ✅ |
| 🏨 Hotels | 14 | ✅ | ✅ | ✅ |
| 🏋️ Gyms | 13 | ✅ | ✅ | ✅ |
| 🌳 Parks/Museums | 38 | Mixed | ✅ | ✅ |
| 🚗 Car Rental | 6 | ✅ | ✅ | ✅ |
| ⛪ Churches | 5 | ✅ | ✅ | ✅ |
| 🏛️ Embassies/Consulates | 3 | ✅ | ✅ | ✅ |
| ✈️ Airport | 1 | ✅ | ✅ | ✅ |
| 🍽️ Restaurants (major) | 4 | ✅ | ✅ | ✅ |
| **Total identified** | **256** | — | — | — |
| **Generic (with phone)** | **~1,100** | ✅ | ✅ | ✅ |

### 1,548 Places Nationwide (JSON database)

Same data in JSON format with categories for easy filtering.

### Embassies, Hospitals, Schools, Malls (curated file)

A separate CSV with the most client-relevant places pre-filtered.

---

## 2. HOW SONIA CAN USE THIS WITH CLIENTS

### Use Case A — "Show me my neighborhood"

When a client says "I'm looking at a house in Villa Morra / San Lorenzo / Fernando de la Mora" — Sonia can open a map showing:

> *"Acá tenés todos los colegios, hospitales, supermercados y bancos cerca de tu nueva casa."*

**Value:** Immediate. Clients love seeing real data vs generic descriptions.

### Use Case B — School Research

Client with kids asks: "Where are the international schools?"

> 48 schools in the database. Can filter by rating, show distance from the client's chosen neighborhood.

### Use Case C — Healthcare Access

Retiree asks: "What hospitals are near me?"

> 32 hospitals/clinics + 20 pharmacies. Show them on a map.

### Use Case D — Daily Life Setup

First week in Paraguay — client needs: bank, supermarket, pharmacy, SIM card, restaurant.

> All in the database. Sonia can send a WhatsApp message with a Google Maps link pre-loaded.

### Use Case E — Property Due Diligence

Before a client decides where to buy, show:
- Which zones have the best school coverage
- Which zones have the closest hospitals
- Which zones are near shopping/transport hubs

---

## 3. WHAT'S MISSING (Needs to be added over time)

| Missing | Why It Matters | How to Get It |
|---------|---------------|---------------|
| **Neighborhood names** | Only 4 neighborhoods tagged. We need 50+ | Manual tagging from Google Maps |
| **Type categorization** | All 1,521 places say "establishment" | Need to map by name patterns (partial done: 256/1521) |
| **Bus routes/stops** | Public transport is key for some clients | Google Transit API |
| **Sonia's personal recommendations** | "This hospital I recommend", "this school has Dutch-speaking staff" | Sonia tells us, we tag manually |
| **Property prices by zone** | Clients ask "what can I get for $100K in Villa Morra?" | Real estate data |
| **Safety data** | "Is this neighborhood safe?" | Crime stats / Sonia's personal knowledge |
| **Expat community locations** | "Where do other Dutch families live?" | Sonia's network |
| **Photos of places** | Google Street View + Sonia's own photos | Manual curation |

---

## 4. QUICK WINS (What to Build This Week)

| What | How | Time | Value |
|------|-----|------|-------|
| **Google My Maps** — private map with all 1,500 places categorized | Upload CSV to Google My Maps. Sonia shares link with clients. | 30 min | 🔴 High |
| **School list PDF** — 48 schools with phone + address + rating | Export filtered data to PDF. Sonia emails clients. | 15 min | 🔴 High |
| **Hospital list PDF** — 32 hospitals/clinics | Same format | 15 min | 🔴 High |
| **"Neighborhood Scorecard" template** — for each zone: schools, hospitals, supermarkets count | Build from the data we have, leave safety/cost blank for Sonia to fill | 1 hr | 🟡 Medium |

---

## 5. FOR THE NEXT MEETING WITH SONIA

Ask: *"Tenemos un mapa con 1,500 lugares de Asunción (colegios, hospitales, bancos, supermercados). ¿Te gustaría usarlo con tus clientes? Podemos hacer un mapa privado que les compartís cuando están buscando casa."*

Expected answer: ✅ Yes. Sonia already has her own mental map of zones. This just digitizes it.
