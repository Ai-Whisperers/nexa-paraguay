#!/bin/bash
# Nexa Rollback — rollback docker service to previous tag or specific image
# Usage: ./scripts/rollback.sh              → rollback to previous (--rollback)
#        ./scripts/rollback.sh v2026-05-08  → specific tagged image

SERVICE="${NEXA_SERVICE:-nexa_web}"
REGISTRY="${NEXA_REGISTRY:-ghcr.io/ai-whisperers/nexa-paraguay}"
TAG="$1"

if [ -z "$TAG" ]; then
  echo "[rollback] Rolling back $SERVICE to previous deployment..."
  docker service update --rollback "$SERVICE"
  echo "[rollback] Rollback initiated. Check status with: docker service ps $SERVICE"
else
  echo "[rollback] Rolling back $SERVICE to $REGISTRY:$TAG..."
  docker service update --image "$REGISTRY:$TAG" "$SERVICE"
  echo "[rollback] Deploying $REGISTRY:$TAG. Verify with: curl https://nexa.paragu-ai.com"
fi

echo "[rollback] Waiting for rollout..."
sleep 10
STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://nexa.paragu-ai.com" 2>/dev/null || echo "fail")
if [ "$STATUS" = "200" ]; then
  echo "[rollback] OK — site responding 200"
else
  echo "[rollback] WARNING — site returned $STATUS"
fi
