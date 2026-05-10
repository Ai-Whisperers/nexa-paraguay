FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* .npmrc ./
COPY scripts/ ./scripts/
RUN npm install --legacy-peer-deps || true

# Copy @ai-whisperers packages (file: deps that npm can't resolve inside Docker)
COPY node_modules/@ai-whisperers ./node_modules/@ai-whisperers/
RUN if [ -f scripts/fix-ai-packages.cjs ]; then node scripts/fix-ai-packages.cjs; fi

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN cp -r node_modules/@ai-whisperers /tmp/ai-packages && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
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
