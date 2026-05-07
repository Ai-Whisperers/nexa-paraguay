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
│   ├── client-questionnaire.md      ← Intake & validation questionnaire
│   ├── client-questionnaire-responses.md
│   ├── client-update-questionnaire.md
│   ├── stakeholder-qa.md            ← Stakeholder Q&A packet
│   └── stakeholder-review.md        ← Week 7 review packet
│
├── 02-site/
│   ├── architecture.md              ← Tech stack, pages, components
│   ├── site-config.md               ← site.json fields, features, integrations
│   ├── site-audit.md                ← Site audit
│   ├── deep-audit.md                ← Code quality & architecture audit
│   ├── improvement-plan.md          ← Master improvement plan (183 items)
│   ├── dns.md                       ← DNS config & domain setup
│   └── COMPONENT_REGISTRY.md        ← All 26 components documented
│
├── 03-brand/
│   ├── brand-guide.md               ← Colors, typography, logo usage
│   ├── tokens.json                  ← Design tokens reference
│   ├── image-generation-prompts.md  ← Prompt library for all images
│   └── social-assets.md             ← Social template inventory
│
├── 04-images/
│   ├── images-manifest.md           ← images.json catalog, fallback chain
│   ├── image-generation-prompts.md  ← Prompt library reference
│   └── placeholder-hashes.json      ← Checksums for image verification
│
├── 05-content/
│   ├── content-locales.md           ← en/es/de/nl content structure
│   ├── blog-posts.md                ← 21 blog posts catalog
│   ├── content-calendar.yml         ← Editorial calendar
│   └── demo-content.md              ← Demo content reference
│
├── 06-marketing/
│   ├── ADS_ASSETS.md                ← 22 paid ad creatives
│   ├── comparisons.md               ← Competitor comparisons
│   ├── email-sequences.md           ← Nurture email sequences
│   ├── faq-dealclosing.md           ← FAQ & objection handling
│   ├── lead-magnets.md              ← Lead magnet offers
│   ├── testimonials-system.md       ← Testimonial collection & display
│   ├── testimonials-gating.md       ← Testimonial gating rules
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
├── 09-market-intelligence/          ← 📊 26 files, ~350 pages total
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
│   └── CONTENT STRATEGY/               ← NEW
│       ├── content_topic_clusters.md     ← 70 article ideas by persona/funnel/lang
│       └── competitive_positioning.md    ← Position: "AI-augmented EU concierge"
│
├── 10-deployment/
│   ├── deployment-runbook.md          ← Build & deploy steps
│   └── ci-cd.md                      ← CI/CD workflow reference
│
├── 11-launch/
│   ├── pre-launch-inventory.md       ← Launch inventory checklist
│   ├── launch-runbook.md             ← Launch sequence & rollback
│   └── launch-checklist.md           ← Go/no-go checklist
│
└── 12-factory/
    └── NEW_CLIENT_BOOTSTRAP.md       ← Step-by-step new client creation
```

## Stats
- **80+ files** across 13 category directories
- **~5,500+ total lines** of documentation
- **17 research reports** (12 core + 5 strategy) = ~350 pages equivalent
- **12 distinct research areas** covered

## Research Catalog
See [research-catalog.md](./research-catalog.md) for the complete index of all research conducted.

## 12 Research Areas Completed

| # | Area | Files | Pages |
|---|---|---|---|
| 1 | Market sizing (47K apps, 63% growth) | 2 | ~15 |
| 2 | Competitor landscape (15 firms) | 4 | ~30 |
| 3 | Competitor weaknesses (7/7 broken pages) | 2 | ~15 |
| 4 | AI opportunity map (8 opportunities) | 1 | ~10 |
| 5 | Dutch/Belgian channel map | 2 | ~20 |
| 6 | SEO keyword strategy (4 languages) | 2 | ~25 |
| 7 | Referral partners (8 categories) | 1 | ~15 |
| 8 | Regulatory timeline | 1 | ~10 |
| 9 | Financial model ($270K→$3M) | 1 | ~15 |
| 10 | Solstein M&A scorecard (B/76) | 3 | ~15 |
| 11 | **Customer personas (5 dossiers)** | 1 | ~25 |
| 12 | **Macro alternatives (7 countries)** | 1 | ~20 |
| 13 | **Exit push factors (6 countries)** | 1 | ~15 |
| 14 | **Niche segments (crypto/nomads/retirees)** | 1 | ~20 |
| 15 | **Content topic clusters (70 ideas)** | 1 | ~20 |
| 16 | **Competitive positioning strategy** | 1 | ~15 |
| 17 | **Dutch channels full report** | 1 | ~20 |
| 18 | **SEO keyword full report** | 1 | ~20 |
| 19 | **Competitor weaknesses full audit** | 1 | ~20 |
| 20 | **Competitor raw research** | 1 | ~15 |

## Untracked Flat Files (keep at docs/ root for now)
See [research-catalog.md](./research-catalog.md) § Untracked Files.
