# Contributing to nexa-paraguay (research repo)

Thanks for contributing to the Nexa Paraguay engagement.

## TL;DR

```bash
# 1. Branch
git checkout main && git pull
git checkout -b docs/<short-topic>

# 2. Edit / add
#    - Decisions       → docs/NEXA_DECISIONS.md (add at top)
#    - Issues          → docs/NEXA_ISSUES.md      (add at top)
#    - Research        → docs/NN-topic/<file>.md
#    - Meeting notes   → meetings/ or docs/meetings/
#    - Sales collateral→ marketing/<file>.md

# 3. Mirror to platform (if you touched docs/)
rsync -av --delete \
  --exclude='.git' \
  docs/ /root/paragu-ai-platform/apps/nexa-paraguay/docs/

# 4. Commit + push
git add -A
git commit -m "docs: <one-line summary>"
git push origin docs/<short-topic>

# 5. Open PR on GitHub
```

## Commit message prefixes

Use one of:

- `docs:` — general research, market intel, brand, content plans
- `decision:` — adding or updating a decision log entry
- `issue:` — adding or resolving an issue log entry
- `meeting:` — meeting notes, transcripts, proposals
- `marketing:` — sales collateral
- `audit:` — site audits, retrospectives
- `chore:` — repo hygiene, file moves, renames
- `fix:` — corrections to existing research

Example:

```
docs(09-market-intelligence): refresh competitor pricing for Q2 2026
```

## Decision log format

Add new entries at the **top** of `docs/NEXA_DECISIONS.md`. Use this shape:

```markdown
## YYYY-MM-DD — <One-line title>

**Decision:** <what we decided>

**Context:** <what was happening that forced the decision>

**Options considered:**
1. <option A> — <pros> / <cons>
2. <option B> — <pros> / <cons>

**Why:** <which option we picked and why>

**Consequences:** <what this means for the engagement going forward>

---
```

## Issue log format

Add new entries at the **top** of `docs/NEXA_ISSUES.md`:

```markdown
## YYYY-MM-DD — <Short title>

**Status:** open | resolved
**Severity:** blocker | high | medium | low
**Owner:** <name>

**What's wrong:** <one paragraph>

**Repro / evidence:** <link or steps>

**Resolution:** <only when status = resolved>
```

## File hygiene

- No real secrets. Ever. If you need to record a key temporarily, use a
  redacted form (`MAILCHIMP_API_KEY=****-us21`) and add a TODO to move it
  to the proper secret store.
- No `node_modules`, `.next`, or `dist`. The `.gitignore` already covers
  these defensively, but don't add them.
- No screenshots in git. If you need to reference a screenshot, upload it
  to the Drive folder and link to it.
- No PII. Client name, address, phone, RUC, and similar must be redacted
  unless the file is explicitly a client-supplied artifact and is in
  `docs/01-client/` or `docs/meetings/` (with the client's consent).

## Reviewers

- **Decision / scope changes** → Ivan (founder)
- **Client-profile / market-intel changes** → Kiki (sales) + Ivan
- **Brand / content / tone** → Kiki
- **Marketing collateral** → Kiki
- **Everything else** → any Ai-Whisperers engineer

## Out of scope for this repo

If you're tempted to:

- Add a script → no. Scripts go in `paragu-ai-platform/apps/nexa-paraguay/scripts/`.
- Add a content JSON → no. Content goes in `paragu-ai-platform/apps/nexa-paraguay/content/`.
- Add a deploy artifact → no. Deploys go in the platform app.

This repo is **research and knowledge only**. If it doesn't help a future
person understand the client, the market, or our decisions, it doesn't
belong here.