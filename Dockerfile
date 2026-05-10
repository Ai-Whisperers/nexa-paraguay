# ── Nexa Paraguay Dockerfile (Phase 1: Migration) ──
# Uses pre-installed @ai-whisperers tarballs (resolved in node_modules/)

FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* .npmrc ./
COPY scripts/ ./scripts/
COPY .packages/ ./.packages/
RUN npm install --legacy-peer-deps 2>&1 || true

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_SUPABASE_URL=https://qyvokpribmbrosafntqa.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm
ENV PGHOST=postgres
ENV PGPORT=5432
ENV PGUSER=postgres
ENV PGPASSWORD=
ENV PGDATABASE=nexa
ENV USE_DB=true
ENV REVALIDATION_SECRET=nexa-isr-secret-dev
ENV SUPABASE_SERVICE_ROLE_KEY=sb_secret_J7n1igQHaVSKn35OrMe93A_p-_FEBvH
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_PUBLIC_SUPABASE_URL=https://qyvokpribmbrosafntqa.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm
ENV PGHOST=postgres
ENV PGPORT=5432
ENV PGUSER=postgres
ENV PGPASSWORD=
ENV PGDATABASE=nexa
ENV USE_DB=true
ENV REVALIDATION_SECRET=nexa-isr-secret-dev
ENV SUPABASE_SERVICE_ROLE_KEY=sb_secret_J7n1igQHaVSKn35OrMe93A_p-_FEBvH
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
USER nextjs
EXPOSE 3000
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/images.json ./images.json
COPY --from=builder --chown=nextjs:nodejs /app/content ./content
COPY --from=builder --chown=nextjs:nodejs /app/nexa-pages ./nexa-pages
CMD ["node", "server.js"]
