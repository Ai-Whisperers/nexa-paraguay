---
purpose: Per-role checklist for Week 7 stakeholder review — commercial director, operations director, legal, and marketing sign-offs before production launch
last_updated: 2026-05-07
version: 1.0
cross_refs:
  - STAKEHOLDER-QA.md (detailed Q&A with proposed answers)
  - DNS.md (DNS cutover sequence)
  - LAUNCH.md (launch checklist)
---

# Stakeholder Review Packet (Week 7)

**Staging URL:** https://staging.nexaparaguay.com

## Checklist for Commercial Director (Europe)

- [ ] NL hero copy: "Vestig uw onderneming in Paraguay." — correct?
- [ ] NL subhead mentions all four deliverables (residence/company/bank/land) — correct?
- [ ] Programs comparison: 4 tiers ordered Base → Business → Investor → Tierras; Business marked "Meest gekozen" — OK?
- [ ] Pricing: shows "USD 4.400+" and "USD 6.900+" with note about final Nexa price TBD — OK?
- [ ] Process: 5 steps, total duration "8-12 weken" — accurate?
- [ ] FAQ: 15 items present — review wording for NL and EN (DE flagged for translator polish)
- [ ] Contact form: 7 fields, privacy checkbox required — OK?
- [ ] Cookie banner: EN/NL/DE/ES localised — text acceptable?
- [ ] Blog: 10 Spanish seeds — which 3 to prioritise for translation first?

## Checklist for Operations Director (Paraguay)

- [ ] Asuncion photography plan — commissioned shoot dates?
- [ ] WhatsApp number +595 XXX XXX XXX — which number goes live?
- [ ] Calendly event "Consulta gratuita 30 min" created on the team calendar?
- [ ] Team member names + roles on /sobre — replace roles-only placeholders with real names?

## Checklist for Legal

- [ ] /privacidad page body: review all 5 key points, confirm GDPR wording
- [ ] /faq item "El proceso es 100% legal?" wording acceptable?
- [ ] /programas Compra-de-Tierras section — legal risk of "Conversacion exploratoria" CTA absent scope?
- [ ] SEPRELAD (AML) compliance status for lead handling?

## Checklist for Marketing

- [ ] GA4 property + conversion events (book_consultation_click, lead_submit) mapped?
- [ ] HubSpot property mapping (firstname/lastname/email/country/program_interest) — match our form fields?
- [ ] Mailchimp audience tag "nexa-paraguay-lead" + Customer Journey for the 7-email nurture — sequence activated?
- [ ] LinkedIn company page + Instagram @nexaparaguay — reserved?

## UX Spot-Checks on Staging (per locale)

For each of nl/en/de/es:

- [ ] Home → Contact CTA works, scrolls/redirects correctly
- [ ] Language switcher in header preserves current page across locales
- [ ] /programas comparison matrix renders all 4 tiers on desktop and stacks on mobile
- [ ] /proceso timeline renders 5 steps without overflow
- [ ] Footer has correct copyright year + privacy link
- [ ] Cookie banner only appears on first visit; choice persists on refresh
- [ ] GA4 fires ONLY after "Accept all" (verify in DevTools Network)
