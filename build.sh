#!/bin/bash
set -e

REPO_NAME=$(basename $(git rev-parse --show-toplevel))
VERSION=$(git describe --tags --always --dirty 2>/dev/null || echo "dev")
GIT_SHA=$(git rev-parse --short HEAD)
TIMESTAMP=$(date +%Y%m%d)
IMAGE_TAG="${REPO_NAME}:${VERSION}-${GIT_SHA}-${TIMESTAMP}"

echo "Building $REPO_NAME..."
echo "Version: $VERSION"
echo "Git SHA: $GIT_SHA"
echo "Image tag: $IMAGE_TAG"

docker build -t $IMAGE_TAG .
docker tag $IMAGE_TAG ${REPO_NAME}:latest
docker tag $IMAGE_TAG ${REPO_NAME}:prod

echo $IMAGE_TAG > .image-tag
echo "✅ Build complete. Tagged as $IMAGE_TAG"
echo "✅ Also tagged as ${REPO_NAME}:latest and ${REPO_NAME}:prod"
