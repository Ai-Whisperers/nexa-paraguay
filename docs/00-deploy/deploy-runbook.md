# Nexa Paraguay — Deploy Runbook

## Build, deploy, and rollback

### Prerequisites
- Server VPS at 72.61.44.159 with Docker Swarm + Traefik
- GitHub access to `Ai-Whisperers/nexa-paraguay`
- `docker` and `docker compose` installed locally or on CI runner
- `NODE_AUTH_TOKEN` available for GitHub Packages installs

### Quick deploy (CI)
Push to `main`. GitHub Actions runs:
```
npm ci
npm run build
docker build -t nexa-paraguay:$(date +%s) -t nexa-paraguay:latest .
docker push ghcr.io/ai-whisperers/nexa-paraguay:latest
docker service update --image ghcr.io/ai-whisperers/nexa-paraguay:latest nexa_web
```

### Manual deploy
```bash
# 1. Build
cd /root/nexa-paraguay
git pull
npm ci
npm run build
NODE_AUTH_TOKEN=ghp_xxx docker build -t nexa-paraguay:prod .

# 2. Tag and push
docker tag nexa-paraguay:prod ghcr.io/ai-whisperers/nexa-paraguay:$(date +%s)
docker push ghcr.io/ai-whisperers/nexa-paraguay:latest

# 3. Deploy
docker service update --force nexa_web

# 4. Verify
curl -sI https://nexa.paragu-ai.com | head -5
curl -s https://nexa.paragu-ai.com/es | grep -c 'Nexa Paraguay'
```

### Rollback
```bash
# List previous images
docker service ps nexa_web
# Rollback to previous
docker service update --rollback nexa_web
# Or specify a specific tag
docker service update --image ghcr.io/ai-whisperers/nexa-paraguay:<previous-tag> nexa_web
```

### Testing locally
```bash
npm run dev          # http://localhost:3000
npm run build && npm start   # Production build at http://localhost:3000
npm test             # Playwright e2e on http://localhost:3456
```

### Health check
- `curl https://nexa.paragu-ai.com/` — returns 200
- `curl https://nexa.paragu-ai.com/api/contact` — POST returns JSON
- `curl https://nexa.paragu-ai.com/sitemap.xml` — valid XML
