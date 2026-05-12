> **Status:** Current | **Last validated:** 2026-05-12

# CI/CD — Nexa Paraguay

CI/CD is managed in this repository through local GitHub Actions workflows in `.github/workflows/`.

## Active Workflows

| Workflow | Purpose |
|---|---|
| `.github/workflows/deploy.yml` | Builds, pushes, deploys staging, promotes production, health-checks, and notifies on failure |
| `.github/workflows/visual-regression.yml` | Visual regression support |
| `.github/workflows/deploy-status.yml` | Deployment status support |

## Deploy Workflow

`deploy.yml` runs on pushes to `main` and manual `workflow_dispatch`.

| Step | Current behavior |
|---|---|
| Checkout | `actions/checkout@v4` |
| Node | `actions/setup-node@v4` with Node `22` and npm cache |
| Install | `npm ci --legacy-peer-deps` |
| Build | `npm run build` |
| Tests | `npm test || echo "Tests skipped (no Playwright)"` |
| Docker build | Tags `ghcr.io/ai-whisperers/nexa-paraguay:latest` and `:<sha>` |
| Registry push | Logs into GHCR with `GITHUB_TOKEN` and pushes both tags |
| Staging deploy | SSH to `root@nexa.paragu-ai.com`, update `${SERVICE}-staging` |
| Visual check | `curl -sI https://staging.nexa.paragu-ai.com` |
| Production promote | SSH update of `nexa_web` to the same commit SHA image |
| Health check | `https://nexa.paragu-ai.com` must return HTTP `200` within retries |
| Failure notification | Telegram webhook via repository secrets |

## Required GitHub Secrets

| Secret | Purpose |
|---|---|
| `GITHUB_TOKEN` | Built-in token used for GHCR login |
| `TELEGRAM_WEBHOOK_URL` | Failure notification endpoint |
| `TELEGRAM_CHAT_ID` | Failure notification destination |
| SSH credentials | Required by the runner environment for `root@nexa.paragu-ai.com` access |

Runtime app secrets are not baked into the Dockerfile. Configure them on the Docker service, stack environment, or host secret manager:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_GA4_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CRM_PORTAL_ID`
- `CRM_ENDPOINT`
- `MAILCHIMP_API_KEY`
- `MAILCHIMP_LIST_ID`

## Manual Fallback

If GitHub Actions is unavailable, deploy manually using `docs/10-deployment/deployment-runbook.md`.

Do not use old central-orchestrator or `docker stack deploy` instructions unless that workflow is intentionally reintroduced.
