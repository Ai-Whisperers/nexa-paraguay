#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="nexa-paraguay:prod-$VERSION-$DATE"
LATEST="nexa-paraguay:prod"

echo "--- build: $TAG"
npm run build

echo "--- docker: $TAG"
docker build \
  -t "$TAG" -t "$LATEST" .

echo "--- deploy: nexa-paraguay_web (rolling update)"
docker service update --image "$TAG" nexa-paraguay_web

echo "--- done: $TAG"
