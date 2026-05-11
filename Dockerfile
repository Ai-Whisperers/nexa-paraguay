# ── Nexa Paraguay Dockerfile (Phase 2: npm registry) ──
# Dependencies installed from GitHub Packages registry

FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* .npmrc ./
RUN npm install --legacy-peer-deps 2>&1 || true
RUN node scripts/copy-ai-packages.cjs

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .packages ./.packages
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_GA4_ID=G-XE49GLEP34
ENV NEXT_PUBLIC_SUPABASE_URL=https://qyvokpribmbrosafntqa.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm
ENV NEXT_PUBLIC_APP_URL=https://nexa.paragu-ai.com
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_PUBLIC_GA4_ID=G-XE49GLEP34
ENV NEXT_PUBLIC_SUPABASE_URL=https://qyvokpribmbrosafntqa.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm
ENV SUPABASE_SERVICE_ROLE_KEY=sb_secret_J7n1igQHaVSKn35OrMe93A_p-_FEBvH
ENV NEXT_PUBLIC_APP_URL=https://nexa.paragu-ai.com
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
