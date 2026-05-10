#!/bin/bash
cd /root/nexa-paraguay/public/images/why-paraguay
for f in *.webp; do
  size=$(stat -c%s "$f" 2>/dev/null || echo "0")
  echo "$f: $size bytes"
done
echo "---"
for f in *.png; do
  size=$(stat -c%s "$f" 2>/dev/null || echo "0")
  echo "$f: $size bytes"
done
