# Nexa Paraguay — Research & Client Knowledge Base

> **Repository role: research, strategy, and client-facing reference only.**
> The Nexa Paraguay website (code, content, deployments) lives in the
> Ai-Whisperers platform monorepo at
> **`paragu-ai-platform/apps/nexa-paraguay/`**.
>
> This repo is the source of truth for *what we know about the client* and
> *what we've decided*, not for the code that ships the site.

[![Repo role](https://img.shields.io/badge/role-research-blueviolet)]()
[![Private](https://img.shields.io/badge/visibility-private-red)]()
[![Maintainer](https://img.shields.io/badge/maintainer-Ai--Whisperers-7b61ff)]()

---

## Quick links

| Want to… | Go to |
|---|---|
| Edit a page, component, or content JSON | `paragu-ai-platform/apps/nexa-paraguay/` |
| Read what we know about the client | `docs/01-client/` |
| Read market intel (pricing, competitors, segments) | `docs/09-market-intelligence/` |
| See the brand / tone guide | `docs/03-brand/` |
| Check what was decided and why | [`docs/NEXA_DECISIONS.md`](docs/NEXA_DECISIONS.md) |
| Check open issues | [`docs/NEXA_ISSUES.md`](docs/NEXA_ISSUES.md) |
| Pull sales / objection / WhatsApp copy | `marketing/` |
| Read discovery meeting | [`meetings/client-discovery-2026-05-11.md`](meetings/client-discovery-2026-05-11.md) |
| Read the engagement changelog | [`CHANGELOG.md`](CHANGELOG.md) |

## Repository status

| | |
|---|---|
| **Client** | Proyecto Zohar / Nexa Paraguay (relocation + investment consulting, Paraguay) |
| **Engagement lead** | Ivan — Ai-Whisperers |
| **Started** | 2026-05-11 (client discovery) |
| **Current phase** | Post-upgrade / pre-launch |
| **Website status** | Live at https://nexaparaguay.com (3 domains) — code in `paragu-ai-platform/apps/nexa-paraguay/` |
| **Locales shipped** | es, en, nl, de |

## What's in this repo

```
nexa-paraguay/
├── README.md                    ← this file
├── CHANGELOG.md                 ← engagement-level changelog
│
├── docs/                        ← ALL research, decisions, market intel
│   ├── NEXA_DECISIONS.md        ← decision log (rationale + date)
│   ├── NEXA_ISSUES.md           ← open + resolved issues
│   ├── NEXA_POST_UPGRADE_AUDIT.md
│   ├── NEXA_UPGRADE_SUMMARY.md
│   ├── CURRENT_STATE.md         ← snapshot of where the engagement is now
│   ├── SOURCE_OF_TRUTH.md       ← which file is canonical for which topic
│   ├── CHANGELOG.md             ← docs-level changelog
│   ├── README.md                ← docs/ index
│   ├── IMAGE_MANIFEST.md        ← every image used, where, by whom
│   ├── nexa-interactions-inventory.md
│   ├── nexa-route-health.csv    ← per-route health snapshot
│   ├── google-sheet-setup.md
│   │
│   ├── 00-architecture/         ← architecture, data flow, resource opt, standardization
│   ├── 01-client/               ← client profile, plans, feedback, questionnaire
│   ├── 02-site/                 ← site specs, configs, audits
│   ├── 03-brand/                ← brand decisions, voice & tone
│   ├── 04-images/               ← image briefs
│   ├── 05-content/              ← content plans, editorial calendar
│   ├── 06-marketing/            ← ads, social, content marketing
│   ├── 07-seo/                  ← SEO research, keyword strategy
│   ├── 08-integrations/         ← HubSpot, GA4, WhatsApp, Supabase
│   ├── 09-market-intelligence/  ← competitors, segments, pricing, location, research
│   ├── 10-deployment/           ← deployment notes
│   ├── 11-launch/               ← launch planning
│   ├── 13-upgrades/             ← upgrade history
│   │
│   ├── meetings/                ← meeting notes, transcripts, proposals
│   ├── audits/                  ← site audits
│   ├── deliverables/            ← client-facing HTML checklists, comparisons
│   ├── superpowers/             ← planning artifacts
│   └── _archive/                ← historical, kept for reference
│
├── meetings/                    ← top-level discovery meeting artifact
│   └── client-discovery-2026-05-11.md
│
└── marketing/                   ← sales-side collateral
    ├── comparisons.md
    ├── email-sequences.md
    ├── faq-dealclosing.md
    ├── lead-magnets.md
    ├── objection-handling.md
    ├── testimonials-system.md
    └── whatsapp-integration.md
```

## Conventions

### When to commit here

✅ **Commit here:**

- New research (market, competitor, customer, brand)
- Decisions, decision updates, and decision reversals
- Meeting notes, transcripts, proposals
- Sales collateral (objections, email sequences, lead magnets, WhatsApp playbook)
- Audits, retrospectives, lessons learned
- Image / content plans
- Engagement-level changelog entries

❌ **Don't commit here:**

- Site code, components, content JSONs, blog posts — those go to
  `paragu-ai-platform/apps/nexa-paraguay/`
- Deploy artifacts, Dockerfiles, scripts — same place
- Supabase migrations — same place

### Mirror rule

This repo's `docs/` is **mirrored** into
`paragu-ai-platform/apps/nexa-paraguay/docs/` so deploy engineers have
offline access to the same research. When you change a file under `docs/`
here, mirror the change into the platform app (same relative path).
This is a one-way mirror: changes to the platform's `docs/` should not
normally be the canonical source.

### File naming

- **Decision / issue logs:** `NEXA_DECISIONS.md`, `NEXA_ISSUES.md` — append at the top.
- **Per-topic docs:** `kebab-case.md` inside the right `NN-topic/` folder.
- **Date-prefixed files:** `YYYY-MM-DD-<topic>.md` for meeting notes,
  discovery calls, and time-bound artifacts.
- **No spaces in filenames.** Use `-` or `_`.

### Secrets

This repo should never hold real secrets. `.env.example` is a template only.
Any real keys live in:

- Supabase project (qyvokpribmbrosafntqa or successor) — anon + service_role
- GitHub Actions secrets in `Ai-Whisperers/paragu-ai-platform`
- Docker Swarm secrets (on the VPS)

## Related repos

| Repo | What's in it | Visibility |
|---|---|---|
| **[`Ai-Whisperers/paragu-ai-platform`](https://github.com/Ai-Whisperers/paragu-ai-platform)** | 41+ client sites + shared `@ai-whisperers/*` packages | Public platform, private apps |
| [`Ai-Whisperers/base`](https://github.com/Ai-Whisperers/base) | Canonical source of `@ai-whisperers/*` npm packages | Private |
| [`Ai-Whisperers/ai-whisperers-management`](https://github.com/Ai-Whisperers/ai-whisperers-management) | Internal team / business docs | Private |

## Contributing

1. **Branch off `main`:** `git checkout -b docs/<topic>`
2. **Make your change** under the right `docs/NN-topic/` folder
3. **Mirror to platform** if it's under `docs/`: copy the file to
   `paragu-ai-platform/apps/nexa-paraguay/docs/` (same relative path)
4. **Commit with a conventional prefix:** `docs:`, `decision:`,
   `meeting:`, `marketing:`, `audit:`
5. **Open a PR.** Decision / issue changes are reviewed by Ivan.
   Market intel and client-profile changes need a Kiki sign-off.

## License & confidentiality

This repository is **private** and **confidential**. Do not share its
contents outside Ai-Whisperers and the Nexa Paraguay client. The client
brand ("Nexa Paraguay", "Proyecto Zohar") and all marketing copy in
`marketing/` is the client's intellectual property.