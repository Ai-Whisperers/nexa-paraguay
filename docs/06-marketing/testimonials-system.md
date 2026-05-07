# Testimonials System — Collection, Display & Referrer Program

**Purpose:** Defines the testimonial collection process, JSON schema, display
component specification, and client referrer program for the website.

**Last updated:** 2026-04

**Cross-references:** `comparisons.md`, `email-sequences.md`,
`/root/nexa-paraguay/testimonials.json`,
`/root/nexa-paraguay/marketing/testimonials-system.md` (source)

---

## Current Status

| Source | Count | Status |
|--------|-------|--------|
| Placeholder (AI-generated) | 5 | Replace with real |
| Real (consented) | 0 | Need collection |
| With video | 0 | Need recording |

**Note:** Current testimonials.json contains AI-generated placeholders
consented for pre-launch use. Replace with real client quotes after first
post-launch wave completes the program and opts in.

## Categories to Collect

| Category | Key Questions | Target |
|----------|---------------|--------|
| Tax Success | "How much are you saving?" | NL/BE/DE clients, 60K+ income |
| Process | "Any surprises?" | All clients |
| Banking | "Did you have issues?" | Clients who struggled pre-Nexa |
| Family | "Schools? Safety?" | Family clients |
| Business | "Would you recommend?" | Business program clients |

## JSON Schema (Production)

The enhanced schema supports:
- Multi-language quotes (en/es)
- Category-based filtering (tax-success, process, banking, family, business)
- Country-based filtering (nl/be/de/es/ar/br/other)
- Program filtering (base/business/investor)
- Consent tracking (showFullName, showCountry, showVideo)
- Stats block (totalClients: 250, satisfactionRate: 98, avgRating: 4.9)

## Display Component

**Component:** `<TestimonialsGrid>`

Props: variant (grid/carousel/featured), filterBy (country/category/program),
showVideo, maxItems, locale

**Filter UI:** Country (NL/BE/DE/ES/AR/ALL), Category (Tax/Process/Banking/
Family/Business), Program (Base/Business/Investor), Has Video

## Tracking Events

`testimonial_view`, `testimonial_filter`, `testimonial_video_play`,
`testimonial_video_complete`, `testimonial_cta_click`

## Client Referrer Program

| Reward | Condition |
|--------|-----------|
| 500 credit | Referred client closes |
| 250 credit | Referred client books consult |
| 100 credit | Referred client submits form |
