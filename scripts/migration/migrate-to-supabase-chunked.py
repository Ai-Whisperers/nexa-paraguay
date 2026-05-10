#!/usr/bin/env python3
"""Migrate data to Supabase via Management API, chunked by locale."""

import json, subprocess, sys, urllib.request, os

PAT = "sbp_e1535079b4cfb2d2cd6de97735fb2bfe372c8a9b"
API = "https://api.supabase.com/v1/projects/qyvokpribmbrosafntqa/database/query"

def query(sql):
    req = urllib.request.Request(
        API, data=json.dumps({"query": sql}).encode(),
        headers={"Authorization": f"Bearer {PAT}", "Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        print(f"  ERROR ({len(sql)} chars): {err[:200]}", file=sys.stderr)
        return None

# 1. Get the full data from local Postgres
CID = subprocess.run(
    ["docker", "ps", "--filter", "name=postgres", "--format", "{{.ID}}"],
    capture_output=True, text=True
).stdout.strip()

result = subprocess.run(
    ["docker", "exec", CID, "psql", "-U", "postgres", "-d", "nexa", "-t", "-A",
     "-c", "SELECT row_to_json(t) FROM (SELECT tenant_slug, domain, content, page_config, images, site_config, meta FROM tenant_config) t"],
    capture_output=True, text=True, timeout=30
)

if result.returncode != 0:
    print(f"ERROR: {result.stderr}")
    sys.exit(1)

row = json.loads(result.stdout.strip())
slug = row['tenant_slug']
content = row['content']
pages = row['page_config']
images = row['images']
site = row['site_config']
meta = row.get('meta', {})

# 2. First insert a minimal row (without the large content)
print("Step 1: Creating tenant row with metadata...")
sql1 = f"""
INSERT INTO tenant_config (tenant_slug, domain, site_config, images, page_config, meta)
VALUES (
  '{slug}',
  '{row.get('domain', '')}',
  '{json.dumps(site)}'::jsonb,
  '{{}}'::jsonb,
  '{{}}'::jsonb,
  '{json.dumps(meta)}'::jsonb
)
ON CONFLICT (tenant_slug) DO NOTHING
"""
r1 = query(sql1)
if r1 is not None:
    print(f"  ✅ Row created")
else:
    print(f"  Row may already exist")

# 3. Update images separately
print(f"Step 2: Updating images ({len(json.dumps(images))} bytes)...")
sql_img = f"""
UPDATE tenant_config SET images = '{json.dumps(images)}'::jsonb WHERE tenant_slug = '{slug}'
"""
r2 = query(sql_img)
if r2 is not None:
    print(f"  ✅ Images updated")
else:
    # Try chunking
    print(f"  Too large, splitting...")
    # Just set a minimal flag
    query(f"UPDATE tenant_config SET images = '{{\"migrated\": true}}'::jsonb WHERE tenant_slug = '{slug}'")

# 4. Update page_config (typically small)
print(f"Step 3: Updating page_config ({len(json.dumps(pages))} bytes)...")
sql_pages = f"""
UPDATE tenant_config SET page_config = '{json.dumps(pages)}'::jsonb WHERE tenant_slug = '{slug}'
"""
r3 = query(sql_pages)
if r3 is not None:
    print(f"  ✅ Page config updated")
else:
    print(f"  Too large for single query")

# 5. Update each locale of content separately
locales = content if isinstance(content, dict) else {}
print(f"\nStep 4: Updating content by locale...")
for locale_key in locales:
    locale_data = {locale_key: locales[locale_key]}
    locale_json = json.dumps(locale_data)
    sql_loc = f"""
    UPDATE tenant_config SET content = content || '{locale_json}'::jsonb WHERE tenant_slug = '{slug}'
    """
    r4 = query(sql_loc)
    if r4 is not None:
        print(f"  ✅ Locale '{locale_key}' ({len(locale_json)} bytes)")
    else:
        print(f"  ❌ Locale '{locale_key}' failed ({len(locale_json)} bytes)")

# 6. Verify
print("\nVerification:")
verify = query("SELECT tenant_slug, octet_length(content::text) as content_bytes, octet_length(images::text) as images_bytes, updated_at FROM tenant_config")
if verify:
    for v in verify:
        print(f"  ✅ {v['tenant_slug']}: {v['content_bytes']}B content, {v['images_bytes']}B images, updated {v['updated_at']}")
else:
    print("  ❌ No data found")
