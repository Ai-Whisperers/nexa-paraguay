# Nexa Paraguay — AI Agent Guide

**Live:** https://nexa.paragu-ai.com  
**Repo:** github.com/Ai-Whisperers/nexa-paraguay  
**Docker service:** nexa_web (1 replica)  
**Local dev:** `http://localhost:3000`  

## Core Architecture

- **Framework:** Next.js 16 App Router (React 19, TypeScript 5)
- **Content:** Supabase-first with file fallback — `site_content` via REST when env vars exist, then `content/{locale}.json`
- **File fallback:** `content/{locale}.json`, `nexa-pages/{slug}.json`, `images.json`, `site.json`, `testimonials.json`
- **Loading:** In-memory LRU cache with 30s TTL
- **Section overrides:** Component overrides live in `src/components/` and are registered in `src/components/SectionsRenderer.tsx`
- **Locales:** 4 complete — ES, EN, NL, DE (all 34 sections, all properly translated)
- **Styling:** Tailwind CSS v4 with `@theme` tokens in `src/app/globals.css`
- **Current state:** `docs/CURRENT_STATE.md` is the first place to check before trusting older docs

## Key Files

| File | Purpose |
|------|---------|
| `content/{locale}.json` | All text content per locale (34 sections each) |
| `nexa-pages/{slug}.json` | Page configs — section ordering + content key references |
| `images.json` | Image manifest — 82+ entries across 14 categories |
| `site.json` | Domain, features, booking URL, social links |
| `src/lib/page-data.ts` | Supabase-first content loader with JSON fallback |
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
| **Current State** | `docs/CURRENT_STATE.md` |
| **Client Profile** | `docs/01-client/profile/sonia-weiss-complete-profile.md`, `docs/01-client/profile/client-intelligence.json` |
| **Services Matrix** | `docs/01-client/services/services-opportunities-matrix.md` (210 items) |
| **Pricing** | `docs/meetings/meeting-report-may-11.md` §1; old pricing docs are deprecated |
| **Asunción Data** | `docs/09-market-intelligence/location/asuncion-complete-1485-places.csv` (1,485 places with GPS) |
| **Full Report** | `docs/09-market-intelligence/research/nexa-complete-intelligence-report.md` |
| **Location Intel** | `docs/09-market-intelligence/location/central-asuncion-complete-analysis.md` |
| **Department Analysis** | `docs/09-market-intelligence/location/complete-paraguay-department-analysis.md` |
| **Location DB** | `docs/09-market-intelligence/location/paraguay-locations-database.json` (1,548 nationwide) |
| **Meeting Prep** | `docs/meetings/meeting-may-11-questions.md` (51 questions) |
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
| See full profile | `docs/01-client/profile/sonia-weiss-complete-profile.md` |

## Critical Notes

- **Pricing resolved:** Core residency accompaniment is `$1,500` complete price, internal/private unless Sonia approves publication. Old `$2,900-$6,900` tier docs are deprecated.
- **No real photos on site** — all AI placeholders. Need to take photos.
- **WhatsApp bot QR not scanned** — QR ready but bot is dead. Scan from WhatsApp Settings → Linked Devices.
- **nexaparaguay.com** still points to Shopify — needs DNS A record to `72.61.44.159`.
- **SEPRELAD** registration status unknown — ask her lawyer.
- **Content source:** Supabase `site_content` is primary when env vars are configured; JSON files are the safe fallback and source for page configs/images.
- **GA4 measurement ID:** G-XE49GLEP34.
- **Section overrides** live in `src/components/` and are registered in `SectionsRenderer.tsx`.
- **Secrets:** Rotate any previously committed Supabase service-role key. Never commit real `SUPABASE_SERVICE_ROLE_KEY` values.

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
