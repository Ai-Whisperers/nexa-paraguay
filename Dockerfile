# syntax=docker/dockerfile:1.7
# ── Nexa Paraguay Dockerfile ──
# Hybrid: sections/i18n/client-kit from .tgz, rest from GitHub Packages

FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* .npmrc ./
COPY .packages ./.packages/
COPY scripts/copy-ai-packages.cjs ./scripts/copy-ai-packages.cjs
RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    set -eu; \
    TOK=""; \
    if [ -f /run/secrets/NODE_AUTH_TOKEN ]; then TOK="$(cat /run/secrets/NODE_AUTH_TOKEN)"; fi; \
    if [ -n "$TOK" ]; then printf "\n//npm.pkg.github.com/:_authToken=%s\n" "$TOK" >> .npmrc; fi; \
    npm install --legacy-peer-deps 2>&1 || true; \
    node scripts/copy-ai-packages.cjs; \
    if [ -n "$TOK" ]; then sed -i '/npm.pkg.github.com\/:_authToken=/d' .npmrc; fi

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .packages ./.packages
RUN node scripts/copy-ai-packages.cjs || true
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p /app/.leads /app/data/submissions && \
    chown -R nextjs:nodejs /app/.leads /app/data/submissions
USER nextjs
EXPOSE 3000
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/images.json ./images.json
COPY --from=builder --chown=nextjs:nodejs /app/site.json ./site.json
COPY --from=builder --chown=nextjs:nodejs /app/content ./content
COPY --from=builder --chown=nextjs:nodejs /app/nexa-pages ./nexa-pages
CMD ["node", "server.js"]
