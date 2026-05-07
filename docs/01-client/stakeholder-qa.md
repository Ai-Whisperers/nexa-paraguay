> **Status:** Current | **Last validated:** 2026-05-07
>

---
purpose: Pre-launch Q&A packet for Nexa Paraguay leadership — every open question blocking production launch with proposed answers grounded in the codebase
last_updated: 2026-05-07
version: 1.0
cross_refs:
  - STAKEHOLDER-REVIEW.md (per-role checklist version)
  - DNS.md (DNS cutover sequence)
  - LAUNCH.md (12 blocking items tracked during build)
---

# Stakeholder Q&A Packet

**For:** Nexa Paraguay leadership (commercial director Europe, operations director Paraguay, legal counsel)
**Audience:** Decision-makers who need to confirm, modify, or reject defaults built into the site
**Staging URL:** https://staging.nexaparaguay.com
**Proposed production URL:** https://nexaparaguay.com

## Legend

| Symbol | Meaning |
|--------|---------|
| 🔴 | Blocks production launch — needs answer before cutover |
| 🟡 | Built with reasonable default, improvable later |
| 🟢 | Fully built, just needs "go" |
| 📌 | Conscious choice required; we cannot pick for you |

## Section A — Brand & Identity

### A1. Company name 🔴
**Proposed answer:** "Nexa Paraguay" — single two-word brand used in siteName (4 locales), navigation, footer, WhatsApp, email, social handles, legal entity. Confirm commercial name, legal entity difference, and tagline.

### A2. Logo 🔴
**Proposed answer:** Text-only wordmark in Playfair Display, navy #1B2A4A — temporary placeholder. Request SVG/PNG logo suite, icon mark, monochrome version, favicon set.

### A3. Color palette 🟢
Navy #1B2A4A (primary) + gold #C9A96E (secondary/accent). White backgrounds, warm off-white surfaces. Institutional, trust-coded, European-feel.

### A4. Typography 🟢
Playfair Display (headings) + Inter (body). Loads from Google Fonts. "Trustworthy but modern" pairing.

## Section B — Services & Offerings

### B1. Program tiers — 4 packages 🔴
- **Paraguay Base:** Residencia permanente + cédula + pre-validacion documental + jornada operativa de 1 dia + acompanamiento logistico
- **Paraguay Business** (Mas elegido): USD 4,400+ — everything in Base + company formation + RUC + bank account + real-estate tour + fees/VAT included
- **Paraguay Investor Program:** USD 6,900+ — everything in Business + 12mo accounting + 12mo legal/tax advisory + investment analysis
- **Compra de Tierras:** Land purchase advisory — price TBD

### B2. Pricing — retail 🔴
Current prices reflect LEALTIS wholesale cost. Need: retail prices per tier, currency (USD only or dual EUR), IVA inclusion disclosure, "+\" semantics, payment terms.

### B3. Process duration 🟡
Site claims 8-12 semanas. Real range may be 10-16 weeks depending on document cleanliness and Migraciones backlog.

### B4. Process steps 🟡
5-step model: Consulta inicial → Validacion documental → Jornada operativa (1 day) → Sociedad y banca → Entrega y seguimiento.

### B5. FAQ content 🟡
15 FAQ items in Spanish. Each is a legal/commercial claim — team must review for accuracy.

### B6. Additional services not offered 📌
Items not currently listed: family relocation, tax optimization (absorbed into Investor), real estate financing, citizenship path (5yr), property management, remote-work coaching.

## Section C — Legal & Compliance

### C1. Legal entity of record 🔴
Need: full legal name, RUC, registered address, governing law, dispute jurisdiction. Currently placeholder "Nexa Paraguay" in footer and privacy policy.

### C2. Privacy policy review 🔴
10-item accordion covering data collection, retention, user rights, processors. Needs attorney review. Verify processor list (Supabase, Cloudflare, Resend), data residency claim, retention period (3yr stated).

### C3. SEPRELAD / AML 🔴
Paraguay AML regulation may apply to Nexa's bundled consulting model. Need formal legal opinion. If obligated: KYC upload step needed in intake flow.

### C4. Terms of service 🟡
No /terms page exists. Privacy checkbox covers only privacy policy. Need to decide: add TOS page or rely on intake contract.

### C5. Cookie banner 🟡
GDPR-compliant: no analytics until consent. "Preferencias" button is placeholder (no modal). Consider granular consent UI and explicit cookie table.

## Section D — Integrations

### D1. HubSpot 🔴
No env vars set. Leads fall back to Supabase table. Need portal ID + form GUID, or alternative CRM.

### D2. Mailchimp 🔴
No API key or list ID. Marketing-consent checkbox collects to Supabase only. Need audience setup + welcome automation.

### D3. Calendly 🔴
Hardcoded URL https://calendly.com/nexaparaguay/consulta returns 404. Account must be created. Every "Agendar consulta gratuita" CTA (9+ locations) depends on this.

### D4. GA4 🔴
Measurement ID G-XE49GLEP34 exists as env var placeholder but no gtag script loads. Need GA4 property + default events.

### D5. WhatsApp number 🔴
Current value: 595000000000 (placeholder). Real number needed: 595982515138 (from improvement plan).

### D6. Email hola@nexaparaguay.com 🔴
Referenced in 8 places. Needs verified inbox. MX records + DKIM/SPF for DNS cutover.

### D7. Social profile URLs 🟡
LinkedIn and Instagram URLs declared. Need verification of ownership.

## Section E — Content & Translation

### E1. German translation quality 🔴
Flagged as machine-translated in _meta. ~20,000 words. Decision: ship MT with "Beta-ubersetzung" badge, or disable DE locale until professional translation.

### E2. Blog translation 🟡
10 Spanish blog posts ready. 0 English, 0 Dutch, 0 German. Recommend translating posts 1 and 6 first for European prospects.

### E3. Testimonials 🟡
Section currently hidden (features.testimonials: false). 5 placeholder testimonials need replacement with real, consented customer stories.

### E4. Tone of voice 🟡
ES: formal "usted". EN: formal "you", marketing-polished. NL: formal "u" (business). DE: MT, tone uneven. British English spelling defaulted.

## Section F — Media & Photography

### F1. Hero image 🔴
Asuncion skyline at golden hour. Needs licensing confirmation or replacement with real photo shoot (EUR 500-1500).

### F2. Pillar images 🟡
3 images in why-paraguay folder. Need licensing verification.

### F3. Team photos 🟡
5 AI-generated placeholder portraits on /sobre. Need real photos + names.
