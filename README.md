# Nexa Paraguay

Desarrollo web, automatización de procesos e inteligencia artificial para empresas en Paraguay.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Deployment:** Docker Swarm on VPS
- **Styling:** Tailwind CSS
- **Fonts:** Inter + Playfair Display
- **Analytics:** Google Analytics (GA4) + Vercel Analytics
- **Domain:** nexaparaguay.com

## Getting Started

```bash
npm install
cp .env.example .env.local  # fill in Supabase keys
npm run dev
```

## Deploy

```bash
docker build -t nexa:prod .
docker stack deploy -c docker-compose.yml nexa --with-registry-auth
```
