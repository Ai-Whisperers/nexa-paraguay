#!/usr/bin/env python3
"""
Resume upload: check which files are already on Supabase and only upload missing ones.
Uses list API to get existing files.
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

# Get list of existing files
print("Fetching existing files from Supabase...")
list_result = subprocess.run([
    "curl", "-s",
    f"{SUPABASE_URL}/storage/v1/object/{BUCKET}?prefix=",
    "-H", f"Authorization: Bearer {SERVICE_KEY}",
    "-H", "Content-Type: application/json"
], capture_output=True, text=True, timeout=30)

existing = set()
if list_result.returncode == 0:
    try:
        items = json.loads(list_result.stdout)
        if isinstance(items, list):
            for item in items:
                existing.add(item.get('name', ''))
    except:
        pass

print(f"Found {len(existing)} existing files in bucket")

# Collect local files that need uploading
to_upload = []
for root, dirs, files in os.walk(images_dir):
    for fname in files:
        full_path = os.path.join(root, fname)
        rel_dir = os.path.relpath(root, images_dir)
        storage_path = f"{rel_dir}/{fname}" if rel_dir != "." else fname
        if storage_path not in existing:
            to_upload.append((full_path, storage_path))

print(f"Need to upload: {len(to_upload)} files")

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

for full_path, storage_path in to_upload:
    mime = get_mime(full_path)
    file_size = os.path.getsize(full_path)
    
    result = subprocess.run([
        "curl", "-s", "-X", "POST",
        f"{storage_url}/{storage_path}",
        "-H", f"Authorization: Bearer {SERVICE_KEY}",
        "-H", f"Content-Type: {mime}",
        "-H", "x-upsert: true",
        "--data-binary", f"@{full_path}"
    ], capture_output=True, text=True, timeout=120)  # 2 min for large files
    
    if result.returncode == 0 and 'error' not in result.stdout.lower():
        uploaded += 1
    else:
        errors.append(f"{storage_path} ({file_size/1024:.0f}KB): {result.stdout[:100]}")
    
    if uploaded % 10 == 0 or uploaded == len(to_upload):
        print(f"  [{uploaded}/{len(to_upload)} uploaded, {len(errors)} errors]")
    
    time.sleep(0.3)

print(f"\nDone: {uploaded} uploaded, {len(errors)} errors")
if errors:
    for e in errors[:5]:
        print(f"  {e}")
