> **Status:** Draft | **Last validated:** 2026-05-12
>
> **Current-state warning:** Read `docs/CURRENT_STATE.md` first. Rows below were updated for current integration/env names, but this remains a launch checklist, not a source of truth.
>

# Pre-Launch Inventory — Nexa Paraguay

> Structured checklist of all placeholder/shippable content, grouped by
> category with impact and status tracking. Every row must be resolved
> before flipping `is_demo: false`.

**Impact legend:** 🔴 BLOCKING | 🟠 SIGNIFICANT | 🟡 LOW  
**Cost legend:** ⏱️ <15 min | ⏱️⏱️ 1-2h | ⏱️⏱️⏱️ 4h+

## 1. Content & Translations

| # | Item | Impact | Current State | Needed | Status |
|---|---|---|---|---|---|
| 1.1 | DE locale quality | 🔴 | Machine translation (`_meta.translationQuality: "machine"`) | Professional human translation ~20k words, native DE review | [ ] |
| 1.2 | NL locale spot-check | 🟠 | Seeded ~18 months ago, not machine-flagged | Native NL read-through on 8 top pages | [ ] |
| 1.3 | EN locale spot-check | 🟠 | Not machine-flagged | Native EN read-through (lower priority) | [ ] |
| 1.4 | PT locale | 🟡 | Not shipped | Defer to Phase 2 | [ ] |

## 2. Images & Design

| # | Item | Impact | Current State | Needed | Status |
|---|---|---|---|---|---|
| 2.1 | Logo | 🔴 | Text-only Playfair wordmark placeholder | Real logo SVG + icon mark + favicon set | [ ] |
| 2.2 | Hero backgrounds (4 locales + mobile) | 🟠 | AI-generated `hero-bg*.webp` | Real Asuncion photography or licensed editorial stock | [ ] |
| 2.3 | "Why Paraguay" pillar images (4) | 🟠 | AI-generated `why-paraguay/*.webp` | Real photography per pillar | [ ] |
| 2.4 | Blog cover images (~10 posts) | 🟠 | AI-generated | Real editorial photography or stock | [ ] |
| 2.5 | Process step illustrations | 🟠 | AI-generated `process/*.webp` | Can stay AI or replace with icon-only (Lucide) | [ ] |
| 2.6 | Founder photo | 🟠 | Generic label, no photo | Real headshot 800x1000 + bio | [ ] |
| 2.7 | Senior lawyer photo | 🟠 | Placeholder name | Real photo + licence + bar registration | [ ] |
| 2.8 | Tax accountant photo | 🟠 | Placeholder name | Real photo + CPA credentials | [ ] |

## 3. Integrations & Endpoints

| # | Item | Impact | Current State | Needed | Status |
|---|---|---|---|---|---|
| 3.1 | Calendly URL | 🔴 | Placeholder `calendly.com/nexaparaguay/consulta` (404) | Real Calendly account + event type | [ ] |
| 3.2 | HubSpot portal + form ID | 🔴 | API route exists; placeholder IDs log fallback | `CRM_PORTAL_ID` + `CRM_ENDPOINT` env vars | [ ] |
| 3.3 | Mailchimp API key + list ID | 🔴 | Not configured -> newsletter fails soft | `MAILCHIMP_API_KEY` + `MAILCHIMP_LIST_ID` | [ ] |
| 3.4 | GA4 measurement ID | 🟠 | Measurement ID known (`G-XE49GLEP34`); verify firing after consent | `NEXT_PUBLIC_GA4_ID` env var | [ ] |
| 3.5 | Crisp live chat ID | 🟠 | Not configured | `NEXT_PUBLIC_CRISP_WEBSITE_ID` | [ ] |
| 3.6 | Messaging number | 🔴 | `+595 000 000 000` placeholder | Real Nexa Messaging Business line | [ ] |
| 3.7 | Contact phone + email | 🔴 | Placeholder values | Real contact details | [ ] |

## 4. Team & Testimonials

| # | Item | Impact | Current State | Needed | Status |
|---|---|---|---|---|---|
| 4.1 | Testimonial #1-5 | 🔴 | Anonymised initials + AI portraits | 3-5 real clients, signed consent, real quotes/portraits | [ ] |
| 4.2 | Testimonial portraits | 🔴 | AI-generated faces | Real photos or remove portraits (quote-only) | [ ] |
| 4.3 | Team page portraits | 🟠 | AI-generated | Real photos of every named team member | [ ] |
| 4.4 | GDPR consent for all people | 🔴 | No signed forms on file | Signed consent per person (per TESTIMONIALS_GATING.md) | [ ] |

## 5. Legal & Compliance (all 🔴)

| # | Item | Current State | Needed | Status |
|---|---|---|---|---|
| 5.1 | Privacy policy (`/privacidad`) | Draft, GDPR basics | Attorney review + stamp | [ ] |
| 5.2 | Terms of service | Not present in navigation | Attorney-drafted, wired into footer | [ ] |
| 5.3 | Compliance disclaimer | Exists as footer section | Attorney review of current copy | [ ] |
| 5.4 | SEPRELAD / AML registration | Unclear status | Confirm Nexa is reporting entity, update copy | [ ] |
| 5.5 | Client consent forms | No downloadable PDFs | Host in `/recursos`: consent template, intake form, KYC checklist | [ ] |

## 6. Pricing & Commercial Claims (all 🔴)

| # | Item | Current State | Needed | Status |
|---|---|---|---|---|
| 6.1 | Core residency price | `$1,500` complete price, internal/private | Keep off public site unless Sonia explicitly approves publishing | [ ] |
| 6.2 | Old Business tier | Deprecated | Remove from active site/content unless rebuilt as add-on | [ ] |
| 6.3 | Old Investor tier | Deprecated | Remove from active site/content unless rebuilt as add-on | [ ] |
| 6.4 | Property services | Commission-based add-on | Document scope and commission disclosure policy | [ ] |
| 6.5 | "Todo incluido" claims | Applies to core service only if exclusions are clear | Legal sign-off on accuracy + exclusions | [ ] |
| 6.6 | Tax savings calculator numbers | Hard-coded rates + generic bands | Legal review + disclaimer | [ ] |

## 7. Stats & Social Proof

| # | Item | Impact | Current State | Needed | Status |
|---|---|---|---|---|---|
| 7.1 | Total clients count | 🔴 | 250 (fabricated) | Real number or remove | [ ] |
| 7.2 | Satisfaction rate | 🔴 | 98% (fabricated) | Real NPS/CSAT or remove | [ ] |
| 7.3 | Average rating | 🔴 | 4.9 (fabricated) | Real data or remove | [ ] |
| 7.4 | Client-origin country list | 🟠 | Already cleaned | Confirm reflects reality | [ ] |

## 8. Resource Downloads

| # | Item | Impact | Current State | Needed | Status |
|---|---|---|---|---|---|
| 8.1 | Document checklist PDF | 🟠 | Listed, no file | Written content + PDF export | [ ] |
| 8.2 | Tax guide 2026 PDF | 🟠 | Listed, no file | Written + legal review + PDF export | [ ] |
| 8.3 | Investor Q&A PDF | 🟠 | Listed, no file | Polish from STAKEHOLDER-QA.md | [ ] |

## Summary

**Must-fix before launch (🔴 items):**
- [ ] All items in sections 1.1, 6 (Pricing), 7 (Stats)
- [ ] All items in sections 3 (Integrations), 5 (Legal)
- [ ] Logo (2.1)
- [ ] Team/testimonial photos with GDPR consent (4.1-4.4)

**Safe to ship and iterate (🟠/🟡 items):**
- Every 🟠 item can land in production; replace within 2 weeks.
- Every 🟡 item is fine indefinitely.

**Code flip required once checklist clears:**
```diff
// sites/nexa-paraguay/site.json
- "is_demo": true,
+ "is_demo": false,
// content/de.json
- "translationQuality": "machine",
+ "translationQuality": "human",
```
