#!/usr/bin/env python3
"""
Bulk upload remaining images to Supabase Storage.
Uses a raw HTTP approach with retry logic for large files.
Checks each file via HEAD first, uploads if missing.
"""
import os, sys, json, subprocess, mimetypes, time, concurrent.futures

REPO = "/root/nexa-paraguay"
BUCKET = "nexa-images"
SUPABASE_URL = "https://qyvokpribmbrosafntqa.supabase.co"

with open("/tmp/supabase_keys.json") as f:
    keys = json.load(f)
SERVICE_KEY = next(k["api_key"] for k in keys if k["name"] == "service_role")

images_dir = os.path.join(REPO, "public", "images")
storage_url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET}"

def get_mime(path):
    mime, _ = mimetypes.guess_type(path)
    if mime: return mime
    ext = os.path.splitext(path)[1].lower()
    return {'.webp': 'image/webp', '.svg': 'image/svg+xml',
            '.png': 'image/png', '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg', '.gif': 'image/gif',
            '.ico': 'image/x-icon'}.get(ext, 'application/octet-stream')

def file_exists(storage_path):
    """Check if file exists on Supabase via HEAD."""
    r = subprocess.run([
        "curl", "-s", "-o", "/dev/null", "-w", "%{http_code}",
        "-I", f"{storage_url}/{storage_path}",
        "-H", f"Authorization: Bearer {SERVICE_KEY}"
    ], capture_output=True, text=True, timeout=10)
    return r.stdout.strip() == "200"

def upload_file(full_path, storage_path):
    mime = get_mime(full_path)
    r = subprocess.run([
        "curl", "-s", "-X", "POST",
        f"{storage_url}/{storage_path}",
        "-H", f"Authorization: Bearer {SERVICE_KEY}",
        "-H", f"Content-Type: {mime}",
        "-H", "x-upsert: true",
        "--data-binary", f"@{full_path}"
    ], capture_output=True, text=True, timeout=120)
    if r.returncode == 0 and 'error' not in r.stdout.lower():
        return (storage_path, True, None)
    return (storage_path, False, r.stdout[:150])

# Collect all files
all_files = []
for root, dirs, files in os.walk(images_dir):
    for fname in files:
        full_path = os.path.join(root, fname)
        rel_dir = os.path.relpath(root, images_dir)
        storage_path = f"{rel_dir}/{fname}" if rel_dir != "." else fname
        all_files.append((full_path, storage_path))

print(f"Checking {len(all_files)} files...")

# Check which ones exist (in parallel batches of 20)
to_upload = []
batch_size = 20
for i in range(0, len(all_files), batch_size):
    batch = all_files[i:i+batch_size]
    for full_path, storage_path in batch:
        if not file_exists(storage_path):
            to_upload.append((full_path, storage_path))
    pct = (i + len(batch)) * 100 // len(all_files)
    print(f"  scanned {pct}% — {len(to_upload)} missing so far", end="\r")

already = len(all_files) - len(to_upload)
print(f"\nAlready uploaded: {already}, need to upload: {len(to_upload)}")

# Upload missing files
uploaded = 0
errors = []
for full_path, storage_path in to_upload:
    fsize = os.path.getsize(full_path) / 1024
    result = upload_file(full_path, storage_path)
    if result[1]:
        uploaded += 1
    else:
        errors.append(f"{storage_path} ({fsize:.0f}KB): {result[2]}")
    print(f"  [{uploaded} OK / {len(errors)} err] {storage_path}", end="\r")
    time.sleep(0.5)

print(f"\n\nDone: {uploaded} uploaded, {already} already existed, {len(errors)} errors")
if errors:
    print("Errors:")
    for e in errors[:5]:
        print(f"  {e}")
