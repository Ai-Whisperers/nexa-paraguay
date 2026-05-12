# Docs Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Nexa Paraguay docs and operational configuration match the current codebase, current Sonia decisions, and safe security posture.

**Architecture:** Establish one canonical current-state document, then align high-risk docs around it. Remove committed secret values from runtime/build files and migration scripts while preserving file fallback behavior when Supabase env vars are missing.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Supabase REST content store with JSON fallback, Docker Swarm, GitHub Actions, HubSpot Forms API, Mailchimp API.

---

## File Structure

- Create: `docs/CURRENT_STATE.md` — canonical current operating truth for product, content, deploy, integrations, and risk boundaries.
- Modify: `CLAUDE.md` — agent guide must match current Supabase-first architecture and updated doc paths.
- Modify: `src/lib/page-data.ts` — remove hardcoded Supabase defaults; fall back to file content when env vars are absent.
- Modify: `.env.example`, `Dockerfile`, `docker-compose.yml` — remove committed secret values and document env injection.
- Modify: `scripts/migrate-content.js`, `scripts/setup-supabase-schema.js`, `scripts/create-schema.js`, `scripts/migration/migrate-supabase-js.js` — require env vars instead of hardcoded service-role keys.
- Modify: `docs/README.md`, `docs/CHANGELOG.md`, `docs/SOURCE_OF_TRUTH.md` — point readers at current truth and correct moved paths.
- Modify: `docs/00-architecture/ARCHITECTURE.md`, `docs/00-architecture/DATA_FLOW.md` — replace Pages Router/file-only assumptions.
- Modify: `docs/10-deployment/ci-cd.md`, `docs/10-deployment/deployment-runbook.md`, `docs/02-site/config/dns.md`, `docs/11-launch/launch-runbook.md`, integration docs — align with actual GitHub Actions, Docker Swarm, DNS, and lead flow.
- Modify: high-risk pricing/strategy docs — add hard deprecation banners where old `$2,900/$4,400/$6,900` model remains.

## Tasks

### Task 1: Canonical Truth And Navigation

- [ ] Create `docs/CURRENT_STATE.md` with current pricing, content source, deployment, integrations, public/private boundaries, and known risks.
- [ ] Update `CLAUDE.md` and `docs/README.md` to make `docs/CURRENT_STATE.md` the first source for current state.
- [ ] Update stale paths in `docs/CHANGELOG.md` and `docs/SOURCE_OF_TRUTH.md`.

### Task 2: Security And Env Hygiene

- [ ] Remove Supabase URL/key fallback values from `src/lib/page-data.ts`.
- [ ] Replace secret values in `.env.example`, `Dockerfile`, and `docker-compose.yml` with variable placeholders.
- [ ] Update migration/setup scripts to require `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
- [ ] Document that the previously committed service-role key must be rotated in Supabase.

### Task 3: Architecture And Data Flow

- [ ] Rewrite `docs/00-architecture/ARCHITECTURE.md` around App Router, locale routing, `loadPageData()`, package overrides, and deployment.
- [ ] Rewrite `docs/00-architecture/DATA_FLOW.md` around Supabase-first content loading, 30s TTL, JSON fallback, page configs, images, and testimonials.

### Task 4: Operations And Launch Docs

- [ ] Rewrite `docs/10-deployment/ci-cd.md` to match `.github/workflows/deploy.yml`.
- [ ] Update `docs/10-deployment/deployment-runbook.md` for one current replica/service, GHCR images, and runtime env injection.
- [ ] Rewrite `docs/02-site/config/dns.md` for VPS A-record cutover rather than Cloudflare Pages.
- [ ] Update `docs/11-launch/launch-runbook.md` to use HubSpot contact verification and `MAILCHIMP_*` env names.
- [ ] Update HubSpot/Mailchimp docs to match implemented API routes.

### Task 5: Deprecation Banners

- [ ] Add hard deprecation banners to old pricing, financial, competitive positioning, SEO, and market intelligence docs that still contain obsolete pricing tiers.
- [ ] Keep historical docs readable, but prevent skim-readers from using them as current guidance.

### Task 6: Verification

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Search for committed `sb_secret_` values and old pricing references in active docs.
- [ ] Report exact validation outcomes and any remaining risks.
