# Client Analysis: Nexa Paraguay — Luana

## Executive Summary

Nexa Paraguay is a relocation services startup serving European clients (primarily Dutch, Belgian, German, Spanish) moving to Paraguay. The founder, Luana, is married to a Dutch national and personally navigated the complex relocation process. The business is in pre-revenue launch phase — no real clients yet, site was built with placeholder content and fabricated stats that she's now rejected.

**Core tension:** She wants a professional, trustworthy website that reflects a real business. But without real clients, data, or case studies, every claim risks being "bullshit" (her word). Her feedback shows a strong ethical compass — she'd rather have an empty section than a fake one.

## What She Wants

**A radically simple site.** Not a SaaS landing page with calculators and gimmicks. A service business site that says: **"This is what we do, this is how it works, contact us if you want to know more."**

- Hero: clean statement of services, no trust badges with fake numbers
- Services: the 3 categories with 9 services as approved copy
- Process: 5 steps (her "Ideal Path to Residency" text)
- About: her personal story (founder who lived it)
- Blog: content about Paraguay immigration, stats, comparisons
- CTA: contact/consultation booking
- Feedback space — not testimonials she doesn't have

**Specifically rejected:**
- Intake wizard / quiz ("¿Qué querés hacer?") — unnecessary
- Tax calculator — irrelevant for a service business
- Fake stats (47k residencias, 63% growth, 189% community) — fabricated
- Testimonials section with no real clients
- Programas nav item (confusing with Servicios)
- Benelux nav item (too specific for primary nav)
- Recursos mega-menu (overcomplicated)
- Mixed ES/EN on about page
- "Un sistema integral no una gestoría de trámites" — didn't resonate

## Business Model

- **Services:** 9 professional services in 3 categories (Legal, Tax/Banking, Real Estate)
- **Programs:** 4 packaged options (Base, Business, Investor, Land) — not visible on homepage anymore per her request
- **Pricing:** Not public (removed per her feedback)
- **Target:** EU citizens, primarily Netherlands/Belgium/Germany, high-income (100k+ EUR)
- **Revenue model:** Service fees per program (not commission-based)
- **Status:** Pre-launch. Site is live but no paying clients yet.

## What's Missing

| Gap | Impact | What to do |
|-----|--------|-----------|
| **No real clients** | Can't use testimonials, no social proof | Feedback form + wait for first cohort |
| **No real data** | Can't claim stats publicly | Blog about market trends instead |
| **No pricing** | May reduce conversion | Intentional — she doesn't want prices public |
| **No booking system** | Manual contact-only | BookingFormSection exists but not pushed |
| **No newsletter** | No lead nurturing channel | Listed in onboarding but not built |
| **No CRM** | Can't track leads | Pending (#31 on roadmap) |
| **No referral program** | No word-of-mouth mechanics | #75 on roadmap |

## Competitive Position

Her real differentiator (based on her story and feedback):
1. **Founder lived it** — She's not a lawyer selling services, she's someone who went through the process and built a solution
2. **NL/BE specialization** — Dutch-language service is rare in the Paraguay relocation space
3. **Single-trip model** — The "Operational Day" where everything happens in one visit is a genuine innovation over competitors who require multiple trips
4. **Service range** — 9 services across 3 domains means clients don't need to coordinate multiple vendors

## Immediate Priorities (her language, her priorities)

1. **Keep the site simple** — Done. Nav cleaned, fabricated data removed, feedback space added
2. **Blog as real content engine** — Market stats, immigration trends, comparisons go here, not on the homepage
3. **Get the first real client** — Everything else (testimonials, case studies, stats, referral) depends on this
4. **Build the feedback/comments system** — Replace the empty space with a real feature

## Technical State

- Next.js 16 + PPR — fastest possible load, static shell + streaming content
- Tailwind v4 — 31 components, zero inline styles
- 4 locales (es/en/nl/de) — all sync'd
- Docker Swarm + Traefik on VPS
- Hermes cron: healthcheck (10min), content update (daily), SEO monitor (weekly)
- All security done: CSP, HSTS, rate limiting, cookie consent, GDPR pages
- **She likes the current visual design** ("más lindo que el anterior")

## Key Risk

The site is polished but the business has zero clients. Every section that says "we helped X families" or shows stats is a liability until real data exists. Her instinct to remove everything fake is correct — but it leaves the site feeling thin. The blog needs to carry the weight of demonstrating expertise until the first case study is real.
