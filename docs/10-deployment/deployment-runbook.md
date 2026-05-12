> **Status:** Current | **Last validated:** 2026-05-12
>

# Deployment Runbook — Nexa Paraguay

> Covers building, containerizing, and deploying the Next.js app via Docker
> Swarm with Traefik reverse proxy. Current production service: `nexa_web`.

## Architecture Overview

```
                         Traefik (agent-net)
                        /                  \
               nexa_web
               (current production service)
                    \                      /
                    Port 3000 (internal)
```

- **Base image:** `node:20-alpine` (multi-stage: deps → builder → runner)
- **Runtime:** Standalone Next.js server (`server.js`)
- **Orchestrator:** Docker Swarm service updates
- **Reverse proxy:** Traefik v2 (external `agent-net`)
- **Replicas:** Current service reports 1 replica unless explicitly scaled

## Dockerfile Anatomy

| Stage | Purpose |
|---|---|
| `deps` | Installs `libc6-compat`, copies `package.json` + `.npmrc`, runs `npm install --legacy-peer-deps` |
| `builder` | Copies node_modules from deps, copies source, runs `npm run build` without committed secrets |
| `runner` | Creates `nextjs` user (uid 1001), copies standalone output + static + public assets, runs `node server.js` on port 3000 |

**Key detail:** Do not bake runtime secrets into the image. Configure Supabase, HubSpot, Mailchimp, GA4, and app URL through CI/CD, Docker service env, stack env, or a secret manager.

## Environment Variables

| Variable | Source | Required | Notes |
|---|---|---|---|
| `NODE_AUTH_TOKEN` | GitHub PAT | Yes | Injected through `.npmrc` placeholder for `@ai-whisperers/*` package install |
| `NODE_ENV` | docker-compose.yml | Yes | Set to `production` |
| `NEXT_PUBLIC_APP_URL` | Docker env / runtime | Yes | `https://nexaparaguay.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Runtime env | Conditional | Required for Supabase content/admin; JSON fallback works without it |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Runtime env | Conditional | Required with `NEXT_PUBLIC_SUPABASE_URL` |
| `SUPABASE_SERVICE_ROLE_KEY` | Runtime env | Conditional | Server-side only; required for admin/migration writes |
| `NEXT_PUBLIC_GA4_ID` | Runtime env | Conditional | Analytics; skip if not configured |
| `CRM_PORTAL_ID` | Runtime env | Conditional | HubSpot contact form portal ID |
| `CRM_ENDPOINT` | Runtime env | Conditional | HubSpot form GUID |
| `MAILCHIMP_API_KEY` | Runtime env | Conditional | Newsletter subscribe endpoint |
| `MAILCHIMP_LIST_ID` | Runtime env | Conditional | Mailchimp audience/list ID |

## docker-compose.yml Services

```yaml
services:
  web:
    build: .
    image: nexa-paraguay:prod
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL:-https://nexa.paragu-ai.com}
      - NEXT_PUBLIC_GA4_ID=${NEXT_PUBLIC_GA4_ID:-G-XE49GLEP34}
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=agent-net"
      - "traefik.http.routers.nexa-paraguay.rule=Host(`nexa.paragu-ai.com`) || Host(`nexa-paraguay.paragu-ai.com`)"
      - "traefik.http.routers.nexa-paraguay.entrypoints=websecure"
      - "traefik.http.routers.nexa-paraguay.tls=true"
      - "traefik.http.routers.nexa-paraguay.tls.certresolver=letsencryptresolver"
      - "traefik.http.services.nexa-paraguay.loadbalancer.server.port=3000"
    networks:
      - agent-net

networks:
  agent-net:
    external: true
```

## Build & Deploy Steps

### 1. Build the Next.js application

```bash
cd /root/nexa-paraguay
npm ci --legacy-peer-deps
npm run build
```

Produces standalone output in `.next/standalone/`.

### 2. Build the Docker image

```bash
docker build -t nexa-paraguay:prod .
```

### 3. Push to registry

```bash
docker tag nexa-paraguay:prod ghcr.io/ai-whisperers/nexa-paraguay:latest
docker push ghcr.io/ai-whisperers/nexa-paraguay:latest
```

### 4. Deploy to Swarm

```bash
docker service update \
  --image ghcr.io/ai-whisperers/nexa-paraguay:latest \
  nexa_web
```

The GitHub Actions workflow deploys the commit SHA tag to `nexa_web-staging` first, then promotes the same image to `nexa_web`.

### 5. Verify deployment

```bash
# Check service status
docker service ls
docker service ps nexa_web

# Check logs
docker service logs nexa_web --tail 50

# Health check (via Traefik)
curl -I https://nexa.paragu-ai.com
curl -I https://nexa.paragu-ai.com
```

## Rolling Update

```bash
# Update image without downtime
docker service update \
  --image ghcr.io/ai-whisperers/nexa-paraguay:<sha> \
  --update-parallelism 1 \
  --update-delay 10s \
  nexa_web
```

## Rollback

```bash
# Rollback the service to previous deploy
docker service rollback nexa_web

# Or deploy a specific previous image tag
docker service update \
  --image nexa-paraguay:previous-tag \
  nexa_web
```

## Health Check

The standalone Next.js server exposes health on port 3000. Traefik performs
periodic health checks against the load balancer. Monitor with:

```bash
# Direct container health
docker ps --filter "name=nexa_web" --format "{{.Names}} {{.Status}}"

# Through Traefik dashboard (if enabled)
curl http://localhost:8080/api/http/routers
```

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Container exits immediately | Port 3000 already in use | Kill conflicting process or change `PORT` |
| Image build fails on `npm install` | Missing `.npmrc` or expired `NODE_AUTH_TOKEN` | Regenerate GitHub PAT, update `.npmrc` |
| 502 from Traefik | Service not ready or wrong port label | Verify Traefik label `server.port=3000`, check container logs |
| SSL cert not issued | DNS not propagated to Traefik | Verify `letsencryptresolver` is configured on Traefik side |
