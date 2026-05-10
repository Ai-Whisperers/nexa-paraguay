#!/usr/bin/env python3
"""
Upload all images from public/images/ to Supabase Storage bucket 'nexa-images'.
Upserts without checking first — much faster.
"""

import os, sys, json, subprocess, mimetypes, time

REPO = "/root/nexa-paraguay"
BUCKET = "nexa-images"
SUPABASE_URL = "https://qyvokpribmbrosafntqa.supabase.co"

with open("/tmp/supabase_keys.json") as f:
    keys = json.load(f)
SERVICE_KEY = None
for k in keys:
    if k["name"] == "service_role":
        SERVICE_KEY = k["api_key"]
        break

images_dir = os.path.join(REPO, "public", "images")
storage_url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET}"

all_files = []
for root, dirs, files in os.walk(images_dir):
    for fname in files:
        full_path = os.path.join(root, fname)
        rel_dir = os.path.relpath(root, images_dir)
        storage_path = f"{rel_dir}/{fname}" if rel_dir != "." else fname
        all_files.append((full_path, storage_path))

print(f"Uploading {len(all_files)} files to {BUCKET}...")

def get_mime(path):
    mime, _ = mimetypes.guess_type(path)
    if mime: return mime
    ext = os.path.splitext(path)[1].lower()
    return {
        '.webp': 'image/webp', '.svg': 'image/svg+xml',
        '.png': 'image/png', '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg', '.gif': 'image/gif',
        '.ico': 'image/x-icon',
    }.get(ext, 'application/octet-stream')

uploaded = 0
errors = []
BATCH_SIZE = 5

for i in range(0, len(all_files), BATCH_SIZE):
    batch = all_files[i:i+BATCH_SIZE]
    for full_path, storage_path in batch:
        mime = get_mime(full_path)
        result = subprocess.run([
            "curl", "-s", "-X", "POST",
            f"{storage_url}/{storage_path}",
            "-H", f"Authorization: Bearer {SERVICE_KEY}",
            "-H", f"Content-Type: {mime}",
            "-H", "x-upsert: true",
            "--data-binary", f"@{full_path}"
        ], capture_output=True, text=True, timeout=60)
        
        if result.returncode == 0 and 'error' not in result.stdout.lower():
            uploaded += 1
        else:
            errors.append(f"{storage_path}: {result.stdout[:150]}")
    
    pct = (i + len(batch)) * 100 // len(all_files)
    print(f"  [{uploaded} OK / {len(errors)} err] {pct}%", end="\r")
    if i + BATCH_SIZE < len(all_files):
        time.sleep(0.3)

print(f"\nDone: {uploaded} uploaded, {len(errors)} errors")
if errors:
    print("First 10 errors:")
    for e in errors[:10]:
        print(f"  {e}")
