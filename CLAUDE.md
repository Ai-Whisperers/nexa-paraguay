# Nexa Paraguay — AI Agent Guide

**Live:** https://nexa.paragu-ai.com  
**Repo:** github.com/Ai-Whisperers/nexa-paraguay  
**Docker service:** nexa_web (1 replica)  
**Local dev:** `http://localhost:3000`  

## Core Architecture

- **Framework:** Next.js 16 App Router (React 19, TypeScript 5)
- **Content:** Purely file-based — `content/{locale}.json`, `nexa-pages/{slug}.json`, `images.json`, `site.json`, `testimonials.json`
- **No database:** All content loads from JSON files via `src/lib/page-data.ts` (no Supabase)
- **Loading:** In-memory LRU cache with 30s TTL
- **Section overrides:** Component overrides live in `src/components/` and are registered in `src/components/SectionsRenderer.tsx`
- **Locales:** 4 complete — ES, EN, NL, DE (all 34 sections, all properly translated)
- **Styling:** Tailwind CSS v4 with `@theme` tokens in `src/app/globals.css`

## Key Files

| File | Purpose |
|------|---------|
| `content/{locale}.json` | All text content per locale (34 sections each) |
| `nexa-pages/{slug}.json` | Page configs — section ordering + content key references |
| `images.json` | Image manifest — 82+ entries across 14 categories |
| `site.json` | Domain, features, booking URL, social links |
| `src/lib/page-data.ts` | File-based content loader (no Supabase) |
| `src/components/SectionsRenderer.tsx` | Section registry with overrides |
| `src/components/ProcessSection.tsx` | Timeline component override |
| `src/components/TeamSection.tsx` | Team cards override |
| `src/components/StorySection.tsx` | Story layout override |
| `src/components/PageHeroSection.tsx` | Hero section override |
| `src/components/CtaBanner.tsx` | CTA banner override |
| `src/components/BlogSection.tsx` | Blog grid override |
| `src/components/FaqSection.tsx` | FAQ with categories override |
| `src/components/BookingEmbedSection.tsx` | Booking section override |
| `src/components/ContactDetailsSection.tsx` | Contact card override |
| `src/components/ExitPopup.tsx` | Exit popup (strings from content JSON) |

## Build & Deploy

### Local Development
```bash
npm run dev          # Dev server with Turbopack (compiles in ~350ms)
npm run build        # Production build
npm run start        # Production server
```

### Docker Deploy (VPS)
```bash
npm run build
docker build -t nexa-paraguay:prod --no-cache .
docker service update --force --image nexa-paraguay:prod nexa_web
```

### Screenshots
```bash
npm run screenshots  # Captures 22 pages
```

## Documentation

| Category | Key Files |
|----------|-----------|
| **Client Profile** | `docs/01-client/sonia-weiss-complete-profile.md`, `docs/01-client/client-intelligence.json` |
| **Services Matrix** | `docs/01-client/services-opportunities-matrix.md` (210 items) |
| **Pricing** | `docs/pricing-matrix-complete.md` (32 services, 12 competitors) |
| **Asunción Data** | `docs/asuncion-complete-1485-places.csv` (1,485 places with GPS) |
| **Full Report** | `docs/nexa-complete-intelligence-report.md` |
| **Location Intel** | `docs/central-asuncion-complete-analysis.md` |
| **Department Analysis** | `docs/complete-paraguay-department-analysis.md` |
| **Location DB** | `docs/paraguay-locations-database.json` (1,548 nationwide) |
| **Meeting Prep** | `docs/01-client/meeting-may-11-questions.md` (51 questions) |
| **Deployment** | `docs/10-deployment/deployment-runbook.md` |
| **Launch** | `docs/11-launch/launch-runbook.md` |
| **Full Index** | `docs/README.md` |

## Client: Sonia Weiss

| Field | Value |
|-------|-------|
| Known as | Sonia Weiss (tax: Sonia Edith López Charotti Ramírez) |
| Phone | +595 982 515 138 |
| Languages | Spanish, Dutch (7 yrs), English, Guarani |
| Background | 7 years in Netherlands (music industry → mother) |
| Businesses | WPG Group SRL, La Vieja Holanda, Casa Weiss, Nexa Paraguay |
| Children | Iván (you), Kiki, Luana |
| Referral commission | Properties 2.75%, vehicles/appliances (undocumented) |
| See full profile | `docs/01-client/sonia-weiss-complete-profile.md` |

## Critical Notes

- **Pricing AMBIGUITY:** Sonia said "$1,500 todo incluido" in audio. Our model says $2,900-$6,900. Most likely: $1,500 her fee + ~$1,400 costs = $2,900 total. **Must resolve with Sonia.**
- **No real photos on site** — all AI placeholders. Need to take photos.
- **WhatsApp bot QR not scanned** — QR ready but bot is dead. Scan from WhatsApp Settings → Linked Devices.
- **nexaparaguay.com** still points to Shopify — needs DNS A record to `72.61.44.159`.
- **SEPRELAD** registration status unknown — ask her lawyer.
- **All content is file-based** — edit `content/{locale}.json` for text, `nexa-pages/{slug}.json` for page config.
- **GA4 measurement ID:** G-XE49GLEP34 (not wired — gtag not loaded).
- **Section overrides** live in `src/components/` and are registered in `SectionsRenderer.tsx`.

## WhatsApp AI Bot

| Item | Value |
|------|-------|
| Bridge URL | https://whatsapp-ai.sunstein.cloud |
| Instance | `client-nexa-paraguay-5138` (phone: 595982515138) |
| Mode | `ventas` (sales) — auto-qualifies leads |
| Evolution instance | `nexa-paraguay` |
| QR scan image | `public/qr-nexa-whatsapp.png` |
| **NEXT STEP** | Scan QR from WhatsApp (Settings → Linked Devices) |

## Services Sonia Offers (32 total)

### On Site (8)
Residencia Permanente, Cédula, Apostilla y Traducción, Cuenta Bancaria, RUC, Alquiler, Compra de Propiedades, Debida Diligencia

### Off Site (17 — Add these!)
Vehicle purchase (commission), Appliance purchase, SIM chip, School research, Medical accompaniment, Health insurance, Spanish teacher, Social integration, Supermarket tours, Airbnb setup, Legal structure, Partner referrals, Interpol cert, Driving license, Work permit, Post-residency support (12mo), Scam prevention tours

### Revenue Opportunities (8)
Document Checklist PDF, "10 Things" PDF, Schools Guide, First 30 Days, Monthly retainer ($50-500/mo), Property commissions (2.75%), Vehicle/appliance commissions, Partner referral commissions
