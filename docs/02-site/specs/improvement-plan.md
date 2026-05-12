> **Status:** Historical review | **Last validated:** 2026-05-12
>
> **Current-state warning:** This plan predates the current App Router/Supabase-first architecture and May 11 pricing decisions. Use `docs/CURRENT_STATE.md` for current truth before executing any item here.
>

---
purpose: Master implementation todo list for taking nexa.paragu-ai.com from current state to production-ready — 183 items across 13 sections
last_updated: 2026-05-07
version: 1.0
cross_refs:
  - DEEP_AUDIT.md (technical issues driving this plan)
  - STAKEHOLDER-QA.md (client-validated decisions needed)
  - LAUNCH.md (launch checklist)
---

# Complete Implementation Plan

> Master todo list for taking nexa.paragu-ai.com from 2/10 to production-ready.
> Every item is concrete, estimated, and actionable.

## Tier System

| Icon | Meaning |
|------|---------|
| P0 | Blocks launch — conversion killer, legal risk, or 404 |
| P1 | High impact — trust/conversion damage if missing |
| P2 | Should do — quality polish, SEO, UX |
| P3 | Nice to have — deferrable |

## Section 1: Render Existing Content (no client input needed)

**New section components to build (P1-P2):**
- FaqSection — accordion for /faq (15 Q&A pairs), structured data
- BlogSection — post grid for /blog (6 posts with image, excerpt)
- BlogPostSection — individual /blog/[slug] pages
- TeamSection — member cards for /sobre (5 members)
- PrivacyAccordion — /privacidad GDPR items
- GlossarySection — /glosario (7 terms, A-Z filter)
- GuidesSection — /recursos (download CTAs, actual PDFs)
- PillarsSection — generic pillar grid for why-country pages
- ProcessTimeline — visual timeline for /proceso
- WizardSection — interactive intake (P3)
- ComparisonSection — country comparison table (P3)

**Image resolution fixes (P1):** Verify ALL @src: and @img: references in content resolve correctly.

**Page config updates (P1-P2):** 14 page config files need updated section component references.

## Section 2: Replace Placeholder Content (needs client input)

**Stats numbers — P0:** +500 families, +10 years, 98% success — need real numbers.
**Team — P0:** Replace 5 role titles with real names, replace AI-generated headshots, add credentials.
**Pricing — P0:** Old 4-tier model is deprecated. Core service is `$1,500` complete price and internal/private unless Sonia approves publication.
**Testimonials — P0:** Replace 5 AI-generated portraits. Either real photos with GDPR consent or quote-only.
**Content claims — P0:** "Mas de 200 familias neerlandesas" — confirm or remove.

## Section 3: Conversion Path

3.1 Calendly/Booking — P0: create account, event, update site.json
3.2 WhatsApp — P0: confirm number, add floating button on all pages
3.3 Contact form — P0: implemented route posts to HubSpot Forms API and logs fallback; no Supabase `leads` insert exists
3.4 Lead capture — P1: newsletter signup, Mailchimp sync

## Section 4: Trust & Credibility

4.1 Legal pages — P0: privacy policy review, TOS creation, SEPRELAD determination
4.2 Contact info — P0: physical address, office hours
4.3 Social proof — P1: verify LinkedIn/Instagram, link in footer
4.4 Office photos — P2: real photos for /sobre gallery

## Section 5: SEO (36 items)

5.1 Meta tags — P1: titles and descriptions for all 24+ pages
5.2 Structured data — P1: Organization, FAQPage, LocalBusiness JSON-LD
5.3 Technical SEO — P1: sitemap.xml, robots.txt, canonicals, hreflang

## Section 6: Analytics & Monitoring (8 items)

6.1 GA4 — P1: verify measurement ID, add gtag with consent gating, configure 5 conversion events
6.2 Conversion tracking — P2: Calendly events, form abandonment, UTM persistence
6.3 Error monitoring — P2: console error logging, 404 tracking, performance monitoring

## Section 7: Multi-Language (12 items)

7.1 Locale routing — P1: URL prefix routing (/en/, /nl/, /de/), language switcher
7.2 Content parity — P2: translate blog posts, program descriptions, FAQ, native-speaker review
7.3 Per-locale pages — P2: homepage and key pages translated to 4 locales

## Section 8: Design & UX Polish (14 items)

Mobile responsive testing, hero image rendering, mobile hamburger menu (P1), typography consistency, spacing rhythm, color consistency, accessibility contrast.

## Section 9: Performance (10 items)

Images: WebP content-type, lazy loading, responsive srcset, compress large PNGs (logo-dark.png 893KB). Loading: 350ms response time. Bundling: code-split large sections.

## Section 10: Infrastructure & Deployment (11 items)

Docker: HEALTHCHECK, restart policy, log rotation, pin Node.js version.
CI/CD: GitHub Actions auto-deploy, build validation.
Monitoring: uptime, error alerting, resource monitoring.
Security: CSP headers (P1), rate limiting (P1), HTTPS redirect.

## Section 11: Content Creation (11 items)

Blog posts (P0-P1): 6 existing posts rendered from content. Blog cover images.
Downloadable resources (P2): 3 PDF guides for lead magnets.
Landing pages (P2): /inversor, /empresa, /lifestyle, /trust.

## Section 12: Brand & Visual Identity (3 items)

Professional logo design (P2): primary, icon mark, monochrome, favicon, OG image, social profiles.
Brand guidelines (P3): 1-page guide with logo usage, colors, typography, tone of voice.

## Section 13: Legal & Compliance (8 items)

P0: Attorney review of privacy policy, TOS drafted, SEPRELAD determination.
P1: GDPR consent forms, data retention policy, disclaimers for tax calculator, testimonials, pricing.
P2: Cookie policy with granular controls.

## Summary Stats

| Category | P0 | P1 | P2 | P3 | Total |
|----------|----|----|----|----|-------|
| 1. Render content | 0 | 11 | 8 | 2 | 21 |
| 2. Replace placeholders | 10 | 5 | 3 | 0 | 18 |
| 3. Conversion path | 6 | 6 | 2 | 0 | 14 |
| 4. Trust & credibility | 6 | 7 | 4 | 0 | 17 |
| 5. SEO | 0 | 24 | 12 | 0 | 36 |
| 6. Analytics | 0 | 3 | 5 | 0 | 8 |
| 7. Multi-language | 0 | 2 | 10 | 0 | 12 |
| 8. Design & UX | 1 | 1 | 12 | 0 | 14 |
| 9. Performance | 0 | 0 | 10 | 0 | 10 |
| 10. Infra & deploy | 0 | 2 | 9 | 0 | 11 |
| 11. Content creation | 1 | 6 | 4 | 0 | 11 |
| 12. Brand & visual | 0 | 0 | 2 | 1 | 3 |
| 13. Legal & compliance | 4 | 3 | 1 | 0 | 8 |
| **Total** | **28** | **70** | **82** | **3** | **183** |
