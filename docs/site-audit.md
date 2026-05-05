# Nexa Paraguay — Complete Site Audit (May 5, 2026)

## EXECUTIVE SUMMARY

**Status:** Content restructured to match client questionnaire. Core pages (Home, Programs, Process, About) updated in all 4 locales. Landing pages updated. Critical gaps remain in analytics, SEO descriptions, navigation, and localizations flagged for professional translation.

---

## 1. PAGE INVENTORY

### Navigation (11 items linked)
| Label | Slug | Status |
|-------|------|--------|
| Home | `/` | ✅ |
| Programs | `/programas` | ✅ |
| Why Paraguay | `/por-que-paraguay` | ✅ |
| Process | `/proceso` | ✅ |
| About | `/sobre` | ✅ |
| FAQ | `/faq` | ✅ |
| Benelux | `/benelux` | ✅ |
| Blog | `/blog` | ✅ |
| Resources | `/recursos` | ✅ |
| Press | `/prensa` | ✅ |
| Contact | `/contacto` | ✅ |

### Orphan Pages (10 — NOT linked from navigation)
| Page | Content Key | Notes |
|------|-------------|-------|
| `asistente` | `intakeWizardPage` | ✅ Now has content. Missing from nav — should be linked or removed |
| `calidad-de-vida` | `qualityOfLifePage` | 🟡 Exists but not nav-linked. Footer links to it |
| `casos-de-exito` | `caseStudiesPage` | ❌ Has generic content. Not nav-linked |
| `comparacion` | `comparisonPage` | 🟡 Has content. Not nav-linked |
| `empresa` | `landingEmpresa` | ✅ Now updated. LinkedIn ad landing page |
| `fundador` | `founderPage` | ❌ Not nav-linked. Missing founder content matching new story? |
| `glosario` | `glossaryPage` | 🟡 Has content, footer-linked |
| `inversor` | `landingInversor` | ✅ LinkedIn ad landing page |
| `lifestyle` | `landingLifestyle` | ✅ LinkedIn ad landing page |
| `privacidad` | `privacyPage` | ✅ Has content. Not nav-linked (only footer) |
| `trust` | `landingTrust` | ✅ LinkedIn ad landing page |

**Action:** `asistente`, `calidad-de-vida`, `privacidad` should be in nav or footer or deleted. `fundador` needs founder content or should be removed.

---

## 2. SEO

### Page Titles & Descriptions

| Page | Title | Description | Status |
|------|-------|-------------|--------|
| Home | ✅ Updated (client-aligned) | Old: "Residency, company and bank account…" | 🟡 Description still references old "one program, one trip" narrative |
| Programs | ✅ OK | OK | ✅ |
| Process | ✅ Updated | ✅ Updated to match new steps | ✅ |
| About | ✅ OK | ✅ Updated with founder story | ✅ |
| FAQ | ✅ OK | OK | ✅ |
| Contact | ✅ OK | "Book a free 30-minute consultation" is fine | ✅ |

### Schema.org
- `schemaType: "LocalBusiness"` on homepage — ✅ set
- `schemaType: "Service"` on programs page — ✅ set
- No FAQ schema, no Article schema for blog posts — 🟡 missing
- **No local-business structured data** (address, phone, hours) in JSON-LD — ❌ missing

**Action:** Add FAQ schema, Article schema for blog, LocalBusiness JSON-LD with address/phone/hours.

---

## 3. CONTENT COMPLETENESS

### Locale Comparison
| Locale | Lines | Missing Keys vs EN |
|--------|-------|---------------------|
| en | 2405 | — (reference) |
| es | 2420 | None |
| nl | 2414 | `seo` (top-level `seo` key) — needs to be added |
| de | 2417 | `seo` (top-level `seo` key), notes says "Seeded MT output. Needs professional translation" |

**🟡 German has a warning: "Seeded MT output. Needs professional DE translation before production."** Flagged in LAUNCH.md item #8.

**🟡 nl.json and de.json missing the top-level `seo` object.** This contains `siteDescription`, `siteKeywords`, `ogImage`, etc. for meta tags.

### Content Quality
- Services: ✅ 3 groups, 9 items in all locales
- Story: ✅ 3 paragraphs in all locales
- Process: ✅ 5 steps in all locales
- Hero images: ✅ Localized per locale (en/es/nl/de)

---

## 4. SERVICES SECTION

**Status: ✅ Implemented from client responses**
- Homepage: ✅ Via `home.services` with variant `grouped-cards`
- Programs page: ✅ Also references `home.services`
- Dedicated services page: ❌ **Does not exist.** No `/servicios` page. Services only appear as a section embedded in Home and Programs pages.

---

## 5. STORY SECTION

**Status: ✅ Implemented from client responses**
- About page hero: Updated to "Experience Turned into Expertise"
- About page story section: Added with 3 paragraphs of founder narrative
- All 4 locales: ✅

---

## 6. PROCESS STEPS

**Status: ✅ Implemented from client responses**
1. Select Your Services ✅
2. Parallel Processing ✅
3. The Operational Day ✅
4. Cédula & Financial Activation ✅
5. Settlement & Lifestyle ✅

All 4 locales ✅. Home page + Process page + 4 landing pages all updated ✅.

---

## 7. LANDING PAGES (LinkedIn Ads)

| Page | Steps Updated | Hero Updated | Status |
|------|---------------|--------------|--------|
| `landingInversor` | ✅ 5 steps | ✅ | ✅ |
| `landingTrust` | ✅ 5 steps | ✅ | ✅ |
| `landingLifestyle` | ✅ 5 steps | ✅ | ✅ |
| `landingEmpresa` | ✅ 5 steps | ✅ | ✅ |

All now consistent with the main process narrative.

---

## 8. PRICING

4 tiers — unchanged from original. Client questionnaire didn't mention pricing changes:
| Package | Price | Description |
|---------|-------|-------------|
| Paraguay Base | USD 2,900 | Residency + ID |
| Paraguay Business | USD 4,400+ | Residency + company + bank |
| Paraguay Investor | USD 6,900+ | Business + 12mo support |
| Land Purchase | Quote on request | Full advisory |

**Note:** Client described 9 a-la-carte services, but site still sells 4 bundles. The services section shows a-la-carte, packages show bundles. This is the intended hierarchy but should be confirmed with client.

---

## 9. TESTIMONIALS

- `testimonials.json`: 2 items (actually checked at top of content/en.json in `home.testimonials`)
- 3 testimonials shown on homepage and programs page
- All AI-generated names (Marco W., Laura v.d. M., Carlos G.)
- No real client testimonials from the questionnaire
- **🟡 Not confirmed by client**

---

## 10. CONTACT

| Field | Value | Status |
|-------|-------|--------|
| Phone | +595 982 515 138 | 🟡 Confirmed with WhatsApp number |
| WhatsApp | 595982515138 | 🟡 **Same number for phone and WhatsApp** — fine but verify |
| Email | hola@nexaparaguay.com | ✅ |
| Address | Asunción, Villa Morra | 🟡 Not verified with client |
| Hours | Mon-Fri 09:00-18:00, Sat 10:00-14:00 | 🟡 Not verified with client |
| Calendly | calendly.com/nexaparaguay/consulta | ✅ Wired |
| Booking URL | ✅ Live, not # | ✅ Fixed this session |

---

## 11. FOOTER

### Column Links
| Column | Links | Issues |
|--------|-------|--------|
| Services | Programs, Process, Why Paraguay, Quality of life | 🟡 "Quality of life" is not a core service. Should include direct links to the 3 service groups |
| Resources | Blog, Glossary, Resources, Press | ✅ |
| Company | About, FAQ, Privacy, Benelux desk | 🟡 No link to Contact page |

### Social
- Instagram: ✅ Set
- LinkedIn: ✅ In site.json
- WhatsApp: ✅ Set
- Facebook: null — ❌ If client has FB, should be added

---

## 12. PLACEHOLDERS & TODOS

### Critical (production-blocking)
| Location | Issue | Severity |
|----------|-------|----------|
| `site.json` → `integrations.analytics.ga4.measurementId` | `G-XXXXXXXXXXX` | 🔴 **Blocks analytics** |
| `site.json` → `integrations.hubspot.portalId` | `HS-PORTAL-PARAGUAI` | 🔴 **Blocks lead capture** |
| `site.json` → `integrations.mailchimp.audienceId` | `audience-paragu-ai-newsletter` | 🔴 **Blocks newsletter** |
| `complianceDisclaimer.licenseNumbers[0].number` | `Pending registration` | 🟡 Not urgent but noted |
| Various `ctaHref`: "#" in landing pages | Links go nowhere | 🔴 **Breaks CTAs on landing pages** |

### Content Placeholders
| Location | Issue |
|----------|-------|
| `aboutPage.team._note` | "AI-generated portrait placeholders. Replace with real consented team photos" |
| `aboutPage.gallery.subtitle` | "AI placeholders below — swap for real photos before launch" |
| German locale note | "Seeded MT output. Needs professional DE translation" |
| Dutch `aboutPage.gallery.subtitle` | Same placeholder as English |
| Testimonial portraits | All AI-generated, no real client consent |

### Stats (unconfirmed)
| Stat | Value | Client-confirmed? |
|------|-------|-------------------|
| Families relocated | +500 | ❌ Not in questionnaire |
| Years experience | +10 | ❌ Not in questionnaire |
| Success rate | 98% | ❌ Not in questionnaire |

### Count of `"ctaHref": "#"` placeholders
- `landingInversor`: 2 CTAs with `#` (lines 2173, 2188 in each locale) — these are LinkedIn ad-specific CTAs that should have real Calendly links

---

## 13. ANALYTICS & INTEGRATIONS

| Integration | Status |
|-------------|--------|
| Google Analytics (GA4) | 🔴 **Placeholder ID** — no data being collected |
| HubSpot | 🔴 **Placeholder** — contact forms will not work |
| Mailchimp | 🔴 **Placeholder** — newsletter signup will not work |
| Calendly | ✅ Wired to calendly.com/nexaparaguay/consulta |
| WhatsApp (click-to-chat) | ✅ Working with `wa.me/595982515138` |
| Instagram | ✅ Linked |
| LinkedIn | ✅ In site.json |

---

## 14. DEPLOYMENT

| Aspect | Value | Notes |
|--------|-------|-------|
| Domain | nexaparaguay.com | Also accessible via paragu-ai.com/s/{locale}/nexa-paraguay |
| Staging | staging.nexaparaguay.com | From site.json |
| Docker | nexa_web service, 2 replicas | |
| Traefik | nexa-paraguay.paragu-ai.com | Docker stack |
| Build | `next build` with `output: "standalone"` | |
| CDN | 1yr cache on images via Next.js headers | ✅ |

---

## 15. IMAGE ASSETS

| Category | WebP Count | Notes |
|----------|-----------|-------|
| Brand logos | 10 | logos, favicon, OG cards, WhatsApp preview |
| Hero | 6 | 1 generic + 5 localized (en/es/nl/de/nl) |
| Why Paraguay | 9 | economic, investment, lifestyle, tax, growth, agribusiness, community, nature, culture |
| Process | 9 | 5 main + 4 supplementary |
| Team | 6 | 5 individual + 1 group (all AI placeholder) |
| Office | 5 | exterior, reception, meeting, signing, team huddle |
| Testimonials | 10 | 5 client portraits + 5 video posters (all AI placeholder) |
| Programs | 4 | tierBase, tierBusiness, tierInvestor, tierTierras |
| Blog | 8 | Post cover images |
| Ads | 20+ | Meta, LinkedIn, Google Display, YouTube thumbnails |
| Social | 6 | Template backgrounds |
| Email | 7 | Nurture sequence headers |
| Press | 3 | Brand book, fact sheets |

**All webp with png fallback — good practice.**

---

## 16. BRAND

| Token | Value |
|-------|-------|
| Primary | #1B2A4A (Nexa Navy) |
| Secondary | #C9A96E (Champagne) |
| Accent | #C9A96E |
| Background | #FFFFFF |
| Surface | #FFFFFF |
| Surface Light | #EDE8DB |
| Text | #1B2A4A |
| Text Light | #333333 |
| Text Muted | #6B6B6B |

**Brand is clean and consistent.**

---

## 17. COMPLIANCE

| Item | Status |
|------|--------|
| GDPR disclaimer | ✅ 3 paragraphs |
| SEPRELAD registration | 🟡 "Pending registration" placeholder |
| AML disclosure | ✅ Linked from footer |
| KYC form | ✅ `seprealadAttestation` form exists |
| Privacy policy | ✅ GDPR-compliant, 24-month retention |

---

## 18. CONVERSION FLOW

### User Journey
1. User lands on homepage → sees hero + services + packages + process
2. CTA: "Book free consultation" → goes to `/contacto` page
3. Contact page has: Calendly embed link + WhatsApp fallback + email
4. Secondary flow: Intake wizard at `/asistente` (not nav-linked)
5. WhatsApp float button on every page

**Missing:** Post-submission confirmation page, email nurture sequence (asset headers exist but no content), analytics tracking on CTAs.

---

## PRIORITY RANKING

### 🔴 Critical (blocks launch/leads)
1. **Analytics GA4 ID** — replace `G-XXXXXXXXXXX` with real ID
2. **HubSpot portal ID** — replace `HS-PORTAL-PARAGUAI` with real portal + form ID
3. **Mailchimp audience ID** — replace placeholder
4. **Landing page CTAs** — 2 per locale still point to `#`
5. **Real Calendly links on all landing pages** — some still use UTM param format, some don't

### 🟡 High (content quality)
6. **German locale** — flagged as machine-translated, needs professional review
7. **nl.json/de.json missing top-level `seo` key**
8. **Stats numbers** (+500 families, +10 years, 98%) — not confirmed by client
9. **Homepage SEO description** — still references old "one program, one trip" 
10. **Placeholder CTAs** — 2 per locale in landing pages still `#`
11. **Facebook link** — null, add if client has one
12. **Landing page Calendly UTM params** — some use UTM, some don't. Standardize.

### 🟢 Medium (nice to have)
13. **Dedicated "Our Services" page** — at `/servicios` with full descriptions
14. **Navigation update** — add Services link, add Contact to footer, link asistente page
15. **Footer services** — replace generic "Quality of life" with direct links to 3 service groups
16. **FAQ schema** — structured data for rich snippets
17. **Article schema** — for blog posts
18. **LocalBusiness JSON-LD** — with address, phone, hours, social profiles
19. **Founder page** — connect `fundador.json` to actual founder content from the story
20. **Team photos** — replace AI-generated placeholders with real consented photos
21. **Office photos** — replace AI-generated placeholders with real photos
22. **Testimonials** — replace AI-generated names with real client testimonials
23. **Post-submission confirmation page** — after Calendly booking
24. **Email nurture sequence** — connect email images to actual email content
25. **Asistente page** — link from nav or remove if unused
26. **Calendar/mailchimp integration** for abandoned-form recovery
27. **SEPRELAD registration number** — replace "Pending" with actual number
