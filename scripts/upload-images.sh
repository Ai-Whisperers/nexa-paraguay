#!/bin/bash
# Upload images to Supabase Storage using direct curl with 120s timeout
# Run this AFTER the initial batch for remaining/missing files

BUCKET="nexa-images"
SUPABASE_URL="https://qyvokpribmbrosafntqa.supabase.co"
SERVICE_KEY=$(python3 -c "
import json
with open('/tmp/supabase_keys.json') as f:
    keys = json.load(f)
for k in keys:
    if k['name'] == 'service_role':
        print(k['api_key'])
        break
")

IMAGES_DIR="/root/nexa-paraguay/public/images"
STORAGE_URL="$SUPABASE_URL/storage/v1/object/$BUCKET"

echo "Uploading images from $IMAGES_DIR to $STORAGE_URL"
echo "Service key: ${SERVICE_KEY:0:20}..."

count=0
errors=0

find "$IMAGES_DIR" -type f | while read -r fullpath; do
    relpath="${fullpath#$IMAGES_DIR/}"
    mime=""
    case "${fullpath,,}" in
        *.webp) mime="image/webp" ;;
        *.svg) mime="image/svg+xml" ;;
        *.png) mime="image/png" ;;
        *.jpg|*.jpeg) mime="image/jpeg" ;;
        *.gif) mime="image/gif" ;;
        *.ico) mime="image/x-icon" ;;
        *) mime="application/octet-stream" ;;
    esac
    
    RESP=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
        "$STORAGE_URL/$relpath" \
        -H "Authorization: Bearer $SERVICE_KEY" \
        -H "Content-Type: $mime" \
        -H "x-upsert: true" \
        --data-binary "@$fullpath" \
        -m 120 2>&1)
    
    if [ "$RESP" = "200" ] || [ "$RESP" = "201" ]; then
        count=$((count + 1))
    else
        errors=$((errors + 1))
        echo "ERROR [$RESP] $relpath"
    fi
    
    if [ $((count % 20)) -eq 0 ] && [ "$count" -gt 0 ]; then
        echo "  $count uploaded, $errors errors..."
    fi
done

echo "Done: $count uploaded, $errors errors"
