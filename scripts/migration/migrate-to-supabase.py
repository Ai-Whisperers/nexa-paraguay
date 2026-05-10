#!/usr/bin/env python3
"""Migrate data from local Postgres to remote Supabase.
Uses the Management API SQL endpoint to insert the tenant_config rows."""

import json, subprocess, sys

PAT = "sbp_e1535079b4cfb2d2cd6de97735fb2bfe372c8a9b"
API = "https://api.supabase.com/v1/projects/qyvokpribmbrosafntqa/database/query"
PROJECT = "qyvokpribmbrosafntqa"

def query(sql):
    import urllib.request
    req = urllib.request.Request(
        API,
        data=json.dumps({"query": sql}).encode(),
        headers={"Authorization": f"Bearer {PAT}", "Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"  ERROR: {e.read().decode()}", file=sys.stderr)
        return None

# 1. Get data from local Postgres
print("Fetching data from local Postgres...")
result = subprocess.run(
    ["docker", "exec", subprocess.run(
        ["docker", "ps", "--filter", "name=postgres", "--format", "{{.ID}}"],
        capture_output=True, text=True
    ).stdout.strip(), "psql", "-U", "postgres", "-d", "nexa", "-t", "-A",
     "-c", "SELECT row_to_json(t) FROM (SELECT tenant_slug, domain, content, page_config, images, site_config, meta FROM tenant_config) t"],
    capture_output=True, text=True, timeout=30
)

if result.returncode != 0:
    print(f"ERROR fetching data: {result.stderr}")
    sys.exit(1)

rows_json = result.stdout.strip().split('\n')
print(f"Found {len(rows_json)} tenant(s)")

# 2. Insert into remote Supabase
for i, row_json in enumerate(rows_json):
    if not row_json.strip():
        continue
    try:
        row = json.loads(row_json.strip())
    except json.JSONDecodeError as e:
        print(f"  Error parsing row {i}: {e}")
        continue
    
    print(f"  Migrating {row['tenant_slug']}...")
    
    # Build the INSERT using dollar-quoted strings ($$) to avoid escaping issues
    content_str = json.dumps(row['content'], ensure_ascii=False)
    pages_str = json.dumps(row['page_config'], ensure_ascii=False)
    images_str = json.dumps(row['images'], ensure_ascii=False)
    site_str = json.dumps(row['site_config'], ensure_ascii=False)
    meta_str = json.dumps(row['meta'], ensure_ascii=False)
    domain = row.get('domain') or ''
    
    sql = f"""
    INSERT INTO tenant_config (tenant_slug, domain, content, page_config, images, site_config, meta)
    VALUES (
      '{row['tenant_slug']}',
      '{domain}',
      '{content_str}'::jsonb,
      '{pages_str}'::jsonb,
      '{images_str}'::jsonb,
      '{site_str}'::jsonb,
      '{meta_str}'::jsonb
    )
    ON CONFLICT (tenant_slug) DO UPDATE SET
      content = EXCLUDED.content,
      page_config = EXCLUDED.page_config,
      images = EXCLUDED.images,
      site_config = EXCLUDED.site_config,
      updated_at = NOW()
    """
    
    resp = query(sql)
    if resp is not None:
        print(f"  ✅ {row['tenant_slug']} migrated ({len(content_str)} bytes)")
    else:
        print(f"  ❌ {row['tenant_slug']} FAILED")

# 3. Verify
print("\nVerifying remote data...")
verify = query("SELECT tenant_slug, LENGTH(content::text) as size, updated_at FROM tenant_config")
if verify:
    for v in verify:
        print(f"  ✅ {v['tenant_slug']}: {v['size']} bytes, updated {v['updated_at']}")
else:
    print("  ❌ Verification query failed")
