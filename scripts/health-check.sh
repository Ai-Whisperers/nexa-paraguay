#!/usr/bin/env bash
# Health check for Nexa Paraguay — uptime, image assets, Supabase connectivity
# Run via cron: 0 6 * * * /root/nexa-paraguay/scripts/health-check.sh

set -euo pipefail

SITE="https://nexa.paragu-ai.com"
SB_URL="${NEXT_PUBLIC_SUPABASE_URL:-}"
SB_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"
VPS_IP="72.61.44.159"
SLACK_WEBHOOK="${SLACK_WEBHOOK:-}"
ALERT_EMAIL="${ALERT_EMAIL:-}"

LOG_PREFIX="[nexa-health]"
ALERT_FILE="/tmp/nexa-health-alerts.log"
OK=true

log() { echo "$LOG_PREFIX $(date '+%Y-%m-%d %H:%M:%S') $1"; }
alert() {
  echo "$LOG_PREFIX ERROR: $1" >&2
  echo "$(date '+%Y-%m-%dT%H:%M:%SZ') ERROR: $1" >> "$ALERT_FILE"
  OK=false
}

# ── 1. Site HTTP check ────────────────────────────────
log "Checking site HTTP..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$SITE" 2>/dev/null || echo "000")
if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ]; then
  log "Site HTTP OK ($HTTP_STATUS)"
else
  alert "Site HTTP failed: status=$HTTP_STATUS"
fi

# ── 2. Key pages HTTP check ─────────────────────────
for path in "/en" "/en/about" "/en/services" "/en/faq" "/en/blog" "/en/booking"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "${SITE}${path}" 2>/dev/null || echo "000")
  if [ "$STATUS" != "200" ] && [ "$STATUS" != "304" ]; then
    alert "Page ${path} returned $STATUS"
  fi
done

# ── 3. VPS / Docker check ─────────────────────────────
log "Checking VPS Docker..."
if ssh -o ConnectTimeout=5 -o StrictHostKeyChecking=no "root@${VPS_IP}" "docker ps --format '{{.Names}}' 2>/dev/null" > /tmp/nexa-docker-ps.txt 2>&1; then
  CONTAINERS=$(wc -l < /tmp/nexa-docker-ps.txt)
  log "VPS Docker OK: $CONTAINERS containers running"
  # Check for crash looping containers
  UNHEALTHY=$(ssh -o ConnectTimeout=5 "root@${VPS_IP}" \
    "docker ps -a --format '{{.Names}} {{.Status}}' | grep -v 'Up ' | grep -v 'Exit 0'" 2>/dev/null || true)
  if [ -n "$UNHEALTHY" ]; then
    alert "Unhealthy containers: $UNHEALTHY"
  fi
else
  alert "Cannot SSH to VPS at $VPS_IP"
fi

# ── 4. Supabase connection ────────────────────────────
if [ -n "$SB_URL" ] && [ -n "$SB_KEY" ]; then
  log "Checking Supabase..."
  SB_RES=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "apikey: $SB_KEY" \
    -H "Authorization: Bearer $SB_KEY" \
    --max-time 10 \
    "${SB_URL}/rest/v1/?limit=1" 2>/dev/null || echo "000")
  if [ "$SB_RES" = "200" ]; then
    log "Supabase OK"
  else
    alert "Supabase returned $SB_RES"
  fi
fi

# ── 5. Critical image assets ────────────────────────
log "Checking critical images..."
CRITICAL_IMAGES=(
  "/images/brand/favicon.webp"
  "/images/brand/logo.svg"
)
for img in "${CRITICAL_IMAGES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 8 "${SITE}${img}" 2>/dev/null || echo "000")
  if [ "$STATUS" != "200" ]; then
    alert "Missing image: ${img} (HTTP $STATUS)"
  fi
done

# ── 6. Check sitemap.xml ─────────────────────────────
log "Checking sitemap.xml..."
SITEMAP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 8 "${SITE}/sitemap.xml" 2>/dev/null || echo "000")
if [ "$SITEMAP_STATUS" != "200" ]; then
  alert "sitemap.xml returned $SITEMAP_STATUS"
fi

# ── Summary ────────────────────────────────────────
if $OK; then
  log "Health check PASSED — all systems nominal"
  # Clear any old alerts on success
  > "$ALERT_FILE"
  exit 0
else
  log "Health check FAILED — alerts written to $ALERT_FILE"
  # Slack notification
  if [ -n "$SLACK_WEBHOOK" ] && [ -f "$ALERT_FILE" ]; then
    ALERTS=$(cat "$ALERT_FILE")
    curl -s -X POST "$SLACK_WEBHOOK" \
      -H 'Content-Type: application/json' \
      -d "{\"text\": \"🚨 *Nexa Paraguay Health Alert*\\n$(date)\\n${ALERTS}\"}" \
      > /dev/null 2>&1 || true
  fi
  exit 1
fi