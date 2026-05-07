# Deployment Runbook — Nexa Paraguay

> Covers building, containerizing, and deploying the Next.js app via Docker
> Swarm with Traefik reverse proxy. 2 replicas, zero-downtime deploys.

## Architecture Overview

```
                         Traefik (agent-net)
                        /                  \
               nexa_web:0               nexa_web:1
               (replica 1)              (replica 2)
                    \                      /
                    Port 3000 (internal)
```

- **Base image:** `node:20-alpine` (multi-stage: deps → builder → runner)
- **Runtime:** Standalone Next.js server (`server.js`)
- **Orchestrator:** Docker Stack (Swarm mode)
- **Reverse proxy:** Traefik v2 (external `agent-net`)
- **Replicas:** 2 (rolling update, no downtime)

## Dockerfile Anatomy

| Stage | Purpose |
|---|---|
| `deps` | Installs `libc6-compat`, copies `package.json` + `.npmrc`, runs `npm install --legacy-peer-deps` |
| `builder` | Copies node_modules from deps, copies source, runs `npm run build` |
| `runner` | Creates `nextjs` user (uid 1001), copies standalone output + static + public assets, runs `node server.js` on port 3000 |

**Key detail:** The `.npmrc` contains the `@ai-whisperers` registry token
for GitHub Packages. Without it, `npm install` fails for the `@ai-whisperers/client-kit` dependency.

## Environment Variables

| Variable | Source | Required | Notes |
|---|---|---|---|
| `NODE_AUTH_TOKEN` | GitHub PAT | Yes | In `.npmrc` for `@ai-whisperers/client-kit` install; use `--secret` in Docker BuildKit |
| `NODE_ENV` | docker-compose.yml | Yes | Set to `production` |
| `NEXT_PUBLIC_APP_URL` | Docker env / runtime | Yes | `https://nexaparaguay.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Runtime env | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Runtime env | Yes | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Runtime env | Yes | Server-side only |
| `NEXT_PUBLIC_GA4_ID` | Runtime env | Conditional | Analytics; skip if not configured |

## docker-compose.yml Services

```yaml
services:
  web:
    build: .
    image: nexa-paraguay:prod
    environment:
      - NODE_ENV=production
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
NODE_AUTH_TOKEN=ghp_... npm run build
```

Produces standalone output in `.next/standalone/`.

### 2. Build the Docker image

```bash
# Using BuildKit for secret injection (avoids baking token into image)
DOCKER_BUILDKIT=1 docker build \
  --secret id=npm_token,src=<(echo "$NODE_AUTH_TOKEN") \
  -t nexa-paraguay:prod \
  .

# Or if .npmrc already has the token locally:
docker build -t nexa-paraguay:prod .
```

### 3. Push to registry (if using private registry)

```bash
docker tag nexa-paraguay:prod registry.example.com/nexa-paraguay:latest
docker push registry.example.com/nexa-paraguay:latest
```

### 4. Deploy to Swarm

```bash
docker stack deploy -c docker-compose.yml nexa
```

This creates the `nexa_web` service with 2 replicas behind Traefik.

### 5. Verify deployment

```bash
# Check service status
docker service ls
docker service ps nexa_web

# Check logs
docker service logs nexa_web --tail 50

# Health check (via Traefik)
curl -I https://nexa.paragu-ai.com
curl -I https://nexa-paraguay.paragu-ai.com
```

## Rolling Update

```bash
# Update image without downtime
docker service update \
  --image nexa-paraguay:prod \
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
