FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* .npmrc ./
COPY scripts/ ./scripts/

RUN npm install --legacy-peer-deps 2>&1 || true

# Remove npm-installed @ai-whisperers (they're broken symlinks in Docker)
RUN rm -rf node_modules/@ai-whisperers

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ai-packages /tmp/ai-packages/
RUN mkdir -p node_modules/@ai-whisperers && \
    for pkg in client-kit content i18n sections; do \
      if [ -d "/tmp/ai-packages/$pkg" ]; then \
        cp -r "/tmp/ai-packages/$pkg" "node_modules/@ai-whisperers/$pkg"; \
        echo "copied @ai-whisperers/$pkg"; \
      fi \
    done
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

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
