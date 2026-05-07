# Nexa Paraguay — AI Agent Guide

**Live:** https://nexa.paragu-ai.com  
**Staging:** https://staging.nexaparaguay.com  
**Primary domain:** nexaparaguay.com (⚠️ currently redirects to Shopify — fix P0)  
**Repo:** github.com/Ai-Whisperers/nexa-paraguay  
**Docker service:** nexa_web (2 replicas, agent-net)

## Tech Stack
- Next.js 16, React 19, TypeScript 5, Tailwind v4
- Pages Router (not App Router)
- @ai-whisperers/client-kit (shared package)
- 4 locales: en, es, nl, de
- Hosted on ParaguAI VPS via Docker Swarm + Traefik

## Pages (from site.json nav + nexa-pages/)
Home (`/`), Programas, Por-que-paraguay, Proceso, Sobre, FAQ, Blog, Prensa, Contacto, Privacidad, Servicios, Benelux, Asistente, Calidad-de-vida, Casos-de-exito, Comparacion, Empresa, Fundador, Glosario, Inversor, Lifestyle, Recursos, Trust

## Build & Deploy
```bash
npm run build
docker build -t nexa-paraguay:prod .
docker stack deploy -c docker-compose.yml nexa
```
Requires NODE_AUTH_TOKEN for @ai-whisperers/client-kit (passed via BuildKit --secret).

## Documentation Structure (docs/)

| Directory | Contents | Key Files |
|---|---|---|
| `01-client/` | Stakeholder Q&A, review, intake | stakeholder-qa.md, stakeholder-review.md |
| `02-site/` | Architecture, config, audit, roadmap | deep-audit.md, improvement-plan.md, dns.md |
| `03-brand/` | Brand guide, design tokens, social assets | brand-guide.md, social-assets.md |
| `04-images/` | Image manifest (111 images), prompts | images-manifest.md |
| `05-content/` | Locales structure, blog catalog, calendar | content-locales.md, blog-posts.md |
| `06-marketing/` | Comparisons, email nurture, FAQs, lead magnets, testimonials | whatsapp-integration.md, email-sequences.md |
| `07-seo/` | Keyword strategy, content gap analysis | seo-keyword-strategy.md, content-gaps.md |
| `08-integrations/` | HubSpot, Mailchimp, GA4, WhatsApp AI bridge | integration-setup-guide.md → split per platform |
| `09-market-intelligence/` | Solstein analysis, market sizing, competition, AI opps | market-sizing.md, competitor-landscape.md, ai-opportunity-map.md |
| `10-deployment/` | Docker runbook, CI/CD reference | deployment-runbook.md, ci-cd.md |
| `11-launch/` | Pre-launch inventory, launch runbook | launch-runbook.md, pre-launch-inventory.md |

## Critical Patterns
- Most international (4 locales). Relocation focus. Document-heavy. WhatsApp contact.
- content/es.json:en.json:de.json:nl.json — keys must match across all 4
- images.json: single source of truth for 111 managed images with WebP/PNG/SVG fallback chain
- is_demo: true (in site.json) — must flip to false when placeholders replaced
- All team portraits, testimonials, and stock imagery are AI placeholders as of May 2026
- nexaparaguay.com primary domain does NOT point to the live site — Shopify redirect
- GA4 measurement ID: G-XE49GLEP34
- HubSpot portal configured in site.json (needs actual client credentials)

## AI Integration
- WhatsApp AI bridge available at whatsapp-ai.sunstein.cloud (DeepSeek + LightRAG + Evolution API)
- NOT yet connected to Nexa's live number — needs client-side Evolution API setup
- See docs/08-integrations/whatsapp-ai-bridge.md for current status
