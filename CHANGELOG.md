# Nexa Paraguay — Research repo changelog

This repo is the **research, decisions, and client knowledge base** for the
Nexa Paraguay engagement. It does **not** contain website code.

The website code lives in `Ai-Whisperers/paragu-ai-platform` at `apps/nexa-paraguay/`.

## Format

Each entry groups a research-area change with date and a one-line summary.
Sections are chronological, newest first.

---

## 2026-06-23 — Repo split + professionalization

- **Repo role clarified.** This repo is now strictly research/knowledge. All
  website code, content JSONs, blog posts, Supabase migrations, scripts, and
  deploy artifacts moved to `Ai-Whisperers/paragu-ai-platform` →
  `apps/nexa-paraguay/`.
- **README rewritten** to make the split explicit and to cross-link the
  platform app.
- **`.env.local` untracked** from git history (was an empty template; values
  were never real secrets but should never be tracked here).
- **`.gitignore` cleaned** to reflect the new, website-free shape.
- **Top-level `NEXA_*.md` files moved** into `docs/` so all research lives
  under one tree.
- **`docs/` mirrored** into `apps/nexa-paraguay/docs/` in the platform repo
  so deploy engineers have offline access to the same research.

## 2026-05 to 2026-06 — Nexa Paraguay engagement (historical)

The earlier months of the engagement are documented in:

- `docs/NEXA_DECISIONS.md` — every decision with rationale
- `docs/NEXA_ISSUES.md` — open + resolved issues
- `docs/NEXA_POST_UPGRADE_AUDIT.md` — site audit after the P0–P3 upgrade sweep
- `docs/NEXA_UPGRADE_SUMMARY.md` — concise before/after of the upgrade work
- `docs/13-upgrades/` — incremental upgrade notes
- `docs/11-launch/` — launch planning
- `docs/meetings/` — meeting notes, transcripts, proposals
- `docs/01-client/feedback/` — client feedback rounds
- `docs/audits/` — site audits
- `docs/_archive/` — historical research

## Repo conventions (current)

| Action | Where it goes |
|---|---|
| New research, market intel, brand docs, decisions | `docs/` in this repo |
| Sales collateral, email sequences, objection handling | `marketing/` in this repo |
| New meeting notes / discovery / transcripts | `meetings/` (top-level) or `docs/meetings/` |
| Website code, content, blog, deploys | `paragu-ai-platform/apps/nexa-paraguay/` (NOT here) |
| Mirror research into the platform | `paragu-ai-platform/apps/nexa-paraguay/docs/` |