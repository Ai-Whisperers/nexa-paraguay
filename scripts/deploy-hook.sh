#!/bin/bash
# Deploy hook: run after Docker deploy to verify and diff screenshots
# Usage: deploy-hook.sh [service_name]

set -e
SERVICE="${1:-nexa_web}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
BASELINE_DIR="$REPO_DIR/.screenshot-baselines"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
NEW_DIR="$BASELINE_DIR/$TIMESTAMP"

echo "=== Post-deploy hook for $SERVICE ==="
echo "Timestamp: $TIMESTAMP"

# 1. Verify service is running
echo "1. Checking service status..."
REPLICAS=$(docker service ls --filter "name=$SERVICE" --format '{{.Replicas}}' 2>/dev/null || echo "0")
echo "   Replicas: $REPLICAS"

if [[ "$REPLICAS" == "0/1" || "$REPLICAS" == "0/2" || "$REPLICAS" == "0/"* ]]; then
  echo "   ✗ SERVICE DOWN — rolling back..."
  docker service update --rollback "$SERVICE" 2>&1 | tail -1
  exit 1
fi
echo "   ✓ Service is up"

# 2. Wait for the service to be ready
echo "2. Waiting for service to be healthy..."
sleep 10

# 3. Take screenshots and compare
echo "3. Running screenshot comparison..."
node "$REPO_DIR/scripts/screenshot-all.mjs" 2>&1 | tail -5

# 4. Compare with latest baseline
LATEST=$(ls -t "$BASELINE_DIR" 2>/dev/null | head -1)
if [ -n "$LATEST" ]; then
  PREV=$(ls -t "$BASELINE_DIR" 2>/dev/null | head -2 | tail -1)
  if [ -n "$PREV" ]; then
    echo "4. Comparing with previous iteration: $PREV"
    # Look for _summary.json and compare error counts
    PREV_ERRORS=$(python3 -c "
import json
with open('$BASELINE_DIR/$PREV/_summary.json') as f:
    s = json.load(f)
print(sum(1 for i in s if i.get('status') == 'error'))
" 2>/dev/null || echo "0")
    NEW_ERRORS=$(python3 -c "
import json
with open('$BASELINE_DIR/$TIMESTAMP/_summary.json') as f:
    s = json.load(f)
print(sum(1 for i in s if i.get('status') == 'error'))
" 2>/dev/null || echo "1")
    
    if [ "$NEW_ERRORS" -gt "$PREV_ERRORS" ]; then
      echo "   ⚠ New errors detected: $NEW_ERRORS vs $PREV_ERRORS"
    else
      echo "   ✓ No new errors ($NEW_ERRORS vs $PREV_ERRORS)"
    fi
  fi
fi

echo "=== Deploy hook complete ==="
