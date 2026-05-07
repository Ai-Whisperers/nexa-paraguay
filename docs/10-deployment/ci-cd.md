> **Status:** Current | **Last validated:** 2026-05-07
>

# CI/CD — Nexa Paraguay

> CI/CD is **not managed locally** in this repository. There is no
> `.github/workflows/` directory in the `nexa-paraguay` repo.

## Centralized CI/CD Architecture

Pipeline orchestration is handled by the **Ai-Whisperers/ci-cd** central
workflows repository. This repo is registered in the **clients.json**
registry, which maps each client site to its deployment configuration.

### How it works

1. A push/merge to the `main` branch triggers a webhook to the
   `Ai-Whisperers/ci-cd` central orchestrator.
2. The orchestrator looks up `nexa-paraguay` in `clients.json` to
   determine:
   - Build command (`npm run build`)
   - Docker image name and tag
   - Target environment (staging / production)
   - Secrets to inject (from the central vault)
   - Deployment target (Docker Swarm node)
3. The pipeline runs the build, creates the Docker image, and triggers
   a rolling update on the Swarm cluster.

### clients.json Registry (conceptual)

```json
{
  "nexa-paraguay": {
    "repo": "Ai-Whisperers/nexa-paraguay",
    "branch": "main",
    "build": "npm run build",
    "dockerfile": "Dockerfile",
    "image": "nexa-paraguay:prod",
    "service": "nexa_web",
    "replicas": 2,
    "domains": [
      "nexa.paragu-ai.com",
      "nexa-paraguay.paragu-ai.com"
    ],
    "env": {
      "NODE_ENV": "production",
      "NEXT_PUBLIC_APP_URL": "https://nexaparaguay.com"
    }
  }
}
```

### What the central pipeline does

| Step | Action |
|---|---|
| 1. Checkout | Clones `Ai-Whisperers/nexa-paraguay@main` |
| 2. Install | `npm ci --legacy-peer-deps` (with `NODE_AUTH_TOKEN` from vault) |
| 3. Lint | `npm run lint` |
| 4. Build | `npm run build` |
| 5. Docker build | `docker build -t nexa-paraguay:prod .` |
| 6. Deploy | `docker stack deploy -c docker-compose.yml nexa` |
| 7. Health check | HTTP GET to `https://nexa.paragu-ai.com` expects 200 |

### If you need to add local workflows

Currently there are none. To add a GitHub Actions workflow in the future,
create `.github/workflows/deploy.yml` and reference the central
orchestrator as a reusable workflow or composite action:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    uses: Ai-Whisperers/ci-cd/.github/workflows/deploy-client.yml@main
    with:
      client: nexa-paraguay
    secrets: inherit
```

### Manual fallback

If the central CI/CD pipeline is unavailable, deploy manually using the
steps in `deployment-runbook.md`.
