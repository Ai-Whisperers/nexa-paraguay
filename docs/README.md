# Nexa Paraguay — Documentation

**Repo:** github.com/Ai-Whisperers/nexa-paraguay  
**Live:** https://nexa.paragu-ai.com  
**Staging:** https://staging.nexaparaguay.com  
**Primary domain:** nexaparaguay.com

## Documentation Structure

```
├── README.md                        ← This file — docs index & navigation
├── CLAUDE.md                        ← AI agent guide (repo root)
├── research-catalog.md              ← Master catalog of ALL research done for Nexa
│
├── 00-architecture/
│   ├── ARCHITECTURE.md              ← @ai-whisperers/* package bridge
│   ├── DATA_FLOW.md                 ← Loader, cache, types, content injection
│   └── STANDARDIZATION.md           ← Code quality standards
│
├── 01-client/
│   ├── client-intelligence.json     ← Core client facts, vertical, contacts
│   ├── CLIENT-QUESTIONNAIRE.md      ← Intake & validation questionnaire
│   ├── client-questionnaire-responses.md  ← Client questionnaire answers
│   ├── client-update-questionnaire.md     ← Update questionnaire
│   ├── stakeholder-qa.md            ← Stakeholder Q&A packet
│   └── stakeholder-review.md        ← Week 7 review packet
│
├── 02-site/
│   ├── site-audit.md               ← Site audit
│   ├── deep-audit.md               ← Code quality & architecture audit
│   ├── improvement-plan.md          ← Master improvement plan (183 items)
│   ├── dns.md                       ← DNS config & domain setup
│   └── COMPONENT_REGISTRY.md       ← All 26 components documented
│
├── 03-brand/
│   ├── brand-guide.md               ← Colors, typography, logo usage
│   └── social-assets.md            ← Social template inventory
│
├── 04-images/
│   ├── images-manifest.md           ← images.json catalog, fallback chain
│   ├── image-generation-prompts.md  ← Prompt library
│   └── PLACEHOLDER_HASHES.json      ← Checksums for image verification
│
├── 05-content/
│   ├── content-locales.md           ← en/es/de/nl content structure
│   ├── blog-posts.md                ← 21 blog posts catalog
│   ├── CONTENT_CALENDAR.yml         ← Editorial calendar
│   └── DEMO_CONTENT.md              ← Demo content reference
│
├── 06-marketing/
│   ├── ADS_ASSETS.md                ← 22 paid ad creatives
│   ├── comparisons.md               ← Competitor comparisons
│   ├── email-sequences.md           ← Nurture email sequences
│   ├── faq-dealclosing.md           ← FAQ & objection handling
│   ├── lead-magnets.md              ← Lead magnet offers
│   ├── testimonials-system.md       ← Testimonial collection & display
│   ├── testimonials-gating.md       ← Testimonial gating rules
│   ├── testimonials-google-form.md  ← Google Form template for client collection
│   └── whatsapp-integration.md      ← WhatsApp marketing strategy
│
├── 07-seo/
│   ├── seo-keyword-strategy.md      ← Multi-language keyword map
│   └── content-gaps.md              ← Content opportunities & gaps
│
├── 08-integrations/
│   ├── integration-setup-guide.md   ← Account setup guide
│   ├── hubspot.md                   ← HubSpot CRM config
│   ├── mailchimp.md                 ← Mailchimp email setup
│   ├── ga4.md                       ← Google Analytics 4 config
│   └── whatsapp-ai-bridge.md        ← WhatsApp AI agent integration
│
├── 09-market-intelligence/          ← 26 files, ~350 pages total
│   ├── SOLSTEIN FRAMEWORK/
│   │   ├── solstein-scorecard.json      ← B/76 8-dimension M&A scorecard
│   │   ├── solstein-analysis.md         ← Full Solstein pipeline analysis
│   │   ├── full-solstein-pipeline-output.md ← Complete pipeline run
│   │   └── structured-data.json         ← All Solstein data exports
│   │
│   ├── MARKET DATA/
│   │   ├── market-sizing.md             ← 47K apps, 63% growth, Dutch 189%
│   │   ├── market-research-raw.md       ← Raw market research (DNM data)
│   │   ├── regulatory-timeline.md       ← Investor Pass, digitalization
│   │   └── financial-model.md           ← $270K→$800K→$3M projections
│   │
│   ├── COMPETITION/
│   │   ├── competitor-landscape.md      ← 15 competitors with pricing table
│   │   ├── competitor-weaknesses.md     ← 7/7 broken pages — 12 exploit opps
│   │   ├── competitor-weaknesses-full-audit.md ← Full 8-dimension audit
│   │   └── competitor_research_report.md ← Original competitor raw report
│   │
│   ├── CUSTOMER INSIGHTS/
│   │   ├── customer_persona_dossiers.md ← 5 personas (374 lines, 19KB)
│   │   ├── exit-country-push-factors-report.md ← 6 countries analyzed
│   │   ├── niche-segments-research.md   ← Crypto, nomads, retirees
│   │   └── macro-alternatives-analysis.md ← 7 countries compared
│   │
│   ├── MARKETING INTELLIGENCE/
│   │   ├── ai-opportunity-map.md        ← 8 AI opportunities with build times
│   │   ├── dutch-channel-map.md         ← Condensed Dutch channel guide
│   │   ├── dutch-channels-full-report.md ← Full Dutch market research
│   │   ├── referral-partners.md         ← 8 partner categories mapped
│   │   ├── seo-keyword-report.md        ← Condensed SEO keyword strategy
│   │   └── seo-keyword-full-report.md   ← Full multi-language keyword data
│   │
│   └── CONTENT STRATEGY/
│       ├── content_topic_clusters.md     ← 70 article ideas by persona/funnel/lang
│       └── competitive_positioning.md    ← Position: "AI-augmented EU concierge"
│
├── 10-deployment/
│   ├── deployment-runbook.md        ← Build & deploy steps
│   └── ci-cd.md                     ← CI/CD workflow reference
│
├── 11-launch/
│   ├── pre-launch-inventory.md      ← Launch inventory checklist
│   └── launch-runbook.md            ← Launch sequence & rollback
│
└── 12-factory/
    └── NEW_CLIENT_BOOTSTRAP.md      ← Step-by-step new client creation
```

## Cross-Reference

| File | Document | Links To |
|---|---|---|
| `01-client/client-intelligence.json` | Core client data | → `09-market-intelligence/*` |
| `06-marketing/*` | Marketing assets | → `04-images/images-manifest.md` |
| `08-integrations/*` | Platform configs | → `02-site/deep-audit.md` |
| `06-marketing/testimonials-google-form.md` | Google Form template | → `testimonials-system.md` |

## Recent Work (Session May 7, 2026)

- **Screenshot automation:** `scripts/screenshot-all.mjs` — builds Next.js, starts server, captures all 22 pages as full-page PNGs + computed-style-inlined HTML + diagnostics JSON. Iteration folders in `screenshots/`, gitignored. Run with `npm run screenshots`.
- **Testimonials Google Form:** `docs/06-marketing/testimonials-google-form.md` — 14-field template ready to copy into forms.google.com (contact + consent + experience + publication permission).
- **Blog translations (ES → EN/NL/DE):**
  - 10 ES MDX articles → 10 EN + 11 NL + 10 DE (newly written with real content)
  - 4 legacy full-article blog posts → `content/blog/posts-{en,nl,de}.json`
- **Site snapshot (`screenshots/1/`):** 22 pages captured — all render clean, 0 errors, 0 failed requests, avg load 54ms.

## Stats
- **80+ files** across 13 category directories
- **~5,500+ total lines** of documentation
- **17 research reports** (12 core + 5 strategy) = ~350 pages equivalent
- **12 distinct research areas** covered

## Research Catalog
See [research-catalog.md](./research-catalog.md) for the complete index of all research conducted.

## Untracked Flat Files (keep at docs/ root for now)
See [research-catalog.md](./research-catalog.md) § Untracked Files.
