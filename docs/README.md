# Nexa Paraguay — Documentation

**Repo:** github.com/Ai-Whisperers/nexa-paraguay  
**Live:** https://nexa.paragu-ai.com  
**Staging:** https://staging.nexaparaguay.com  
**Primary domain:** nexaparaguay.com

## Documentation Structure

```
docs/
├── README.md                        ← This file — docs index & navigation
├── CLAUDE.md                        ← AI agent guide (repo root)
│
├── 01-client/
│   ├── client-intelligence.json     ← Core client facts, vertical, contacts
│   ├── client-questionnaire.md      ← Intake & validation questionnaire
│   ├── stakeholder-qa.md            ← Stakeholder Q&A packet
│   └── stakeholder-review.md        ← Week 7 review packet
│
├── 02-site/
│   ├── architecture.md              ← Tech stack, pages, components
│   ├── site-config.md              ← site.json fields, features, integrations
│   ├── deep-audit.md               ← Code quality & architecture audit
│   ├── improvement-plan.md          ← Master improvement plan
│   └── dns.md                       ← DNS config & domain setup
│
├── 03-brand/
│   ├── brand-guide.md               ← Colors, typography, logo usage
│   ├── tokens.json                  ← Design tokens reference
│   ├── image-generation-prompts.md  ← Prompt library for all images
│   └── social-assets.md            ← Social template inventory
│
├── 04-images/
│   ├── images-manifest.md           ← images.json catalog, fallback chain
│   ├── image-generation-prompts.md  ← Prompt library (images.json sections)
│   └── placeholder-hashes.json      ← Checksums for image verification
│
├── 05-content/
│   ├── content-locales.md           ← en/es/de/nl content structure
│   ├── blog-posts.md                ← Blog post catalog & metadata
│   └── content-calendar.yml         ← Editorial calendar
│
├── 06-marketing/
│   ├── comparisons.md               ← Competitor comparisons
│   ├── email-sequences.md           ← Nurture email sequences
│   ├── faq-dealclosing.md           ← FAQ & objection handling
│   ├── lead-magnets.md              ← Lead magnet offers
│   ├── testimonials-system.md       ← Testimonial collection & display
│   └── whatsapp-integration.md      ← WhatsApp marketing strategy
│
├── 07-seo/
│   ├── seo-keyword-strategy.md      ← Multi-language keyword map
│   └── content-gaps.md              ← Content opportunities & gaps
│
├── 08-integrations/
│   ├── integration-setup-guide.md   ← Account setup guide for client
│   ├── hubspot.md                   ← HubSpot CRM config
│   ├── mailchimp.md                 ← Mailchimp email setup
│   ├── ga4.md                       ← Google Analytics 4 config
│   └── whatsapp-ai-bridge.md        ← WhatsApp AI agent integration
│
├── 09-market-intelligence/
│   ├── solstein-scorecard.json      ← 8-dimension M&A scorecard (B/76)
│   ├── solstein-analysis.md         ← Full Solstein pipeline analysis
│   ├── market-sizing.md             ← 47K apps, 63% growth, Dutch 189%
│   ├── competitor-landscape.md      ← 15 competitors mapped
│   ├── competitor-weaknesses.md     ← 7/7 broken pages exploit audit
│   ├── ai-opportunity-map.md        ← 8 AI opportunities with build times
│   ├── dutch-channel-map.md         ← Dutch/Belgian community channels
│   ├── seo-keyword-report.md        ← Multi-language keyword research
│   ├── referral-partners.md         ← 8 partner categories mapped
│   ├── regulatory-timeline.md       ← Policy changes, Investor Pass
│   └── financial-model.md           ← Unit economics & 3-year projection
│
├── 10-deployment/
│   ├── docker-compose.yml           ← Docker stack config (repo root)
│   ├── Dockerfile                   ← Build image (repo root)
│   ├── deployment-runbook.md        ← Build & deploy steps
│   └── ci-cd.md                     ← CI/CD workflow reference
│
└── 11-launch/
    ├── pre-launch-inventory.md      ← Launch inventory checklist
    ├── launch-runbook.md            ← Launch sequence & rollback
    └── launch-checklist.md          ← Go/no-go checklist
```

## Cross-Reference

| File | Document | Links To |
|---|---|---|
| `01-client/client-intelligence.json` | Core client data | → `09-market-intelligence/*` |
| `09-market-intelligence/solstein-scorecard.json` | M&A scorecard | → `09-market-intelligence/*` |
| `06-marketing/*` | Marketing assets | → `04-images/images-manifest.md` |
| `08-integrations/*` | Platform configs | → `02-site/deep-audit.md` |

## Stats
- **39 structured files** across 11 category directories
- **~2,500+ total lines** of documentation
- Covers: client intelligence, site architecture, brand, images, content, marketing, SEO, integrations, market intelligence, deployment, launch
- All `.md` files use consistent header format: Purpose, Source, Last updated, Cross-refs

## Untracked Flat Files (keep at docs/ root for now)
- `CLIENT-QUESTIONNAIRE.md` (1,210 lines — master intake doc)
- `ADS_ASSETS.md` (22 paid ad creatives)
- `CONTENT_CALENDAR.yml`
- `DEMO_CONTENT.md`
- `PLACEHOLDER_HASHES.json`
- `STANDARDIZATION.md`
- `TESTIMONIALS_GATING.md`
- `client-questionnaire-responses.md`
- `client-update-questionnaire.md`
- `integration-setup-guide.md`
- `site-audit.md`
