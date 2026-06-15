# Nexa Paraguay

Desarrollo web, automatización de procesos e inteligencia artificial para empresas en Paraguay.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Deployment:** Docker Swarm on VPS
- **Styling:** Tailwind CSS
- **Fonts:** Inter + Playfair Display
- **Analytics:** Google Analytics (GA4) + Vercel Analytics
- **Domain:** nexaparaguay.com

## Shared packages

This site consumes `@ai-whisperers/*` packages from GitHub Packages (npm.pkg.github.com).
The canonical source of those packages is **[`Ai-Whisperers/base`](https://github.com/Ai-Whisperers/base)**.

Some packages (`sections`, `i18n`, `content`) are still consumed as local tarballs
from `.packages/*.tgz` per the hybrid dependency pattern documented in `.npmrc`.
`client-kit` has been migrated to the published npm version (`^0.2.0`).

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
