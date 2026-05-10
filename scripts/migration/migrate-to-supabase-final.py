#!/usr/bin/env python3
"""Migrate data to Supabase via Management API — using dollar-quoting for JSON."""

import json, subprocess, sys, urllib.request

PAT = "sbp_e1535079b4cfb2d2cd6de97735fb2bfe372c8a9b"
API = "https://api.supabase.com/v1/projects/qyvokpribmbrosafntqa/database/query"

def query(sql):
    data = json.dumps({"query": sql}).encode()
    req = urllib.request.Request(
        API, data=data,
        headers={"Authorization": f"Bearer {PAT}", "Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        print(f"  ERROR ({len(sql)} chars): {err[:300]}", file=sys.stderr)
        return None

def dquote(obj):
    """Dollar-quote a JSON value for PostgreSQL."""
    s = json.dumps(obj, ensure_ascii=False)
    # Use $$...$$ quoting to avoid single-quote issues
    return f"$${s}$$"

# Get data from local Postgres
CID = subprocess.run(
    ["docker", "ps", "--filter", "name=postgres", "--format", "{{.ID}}"],
    capture_output=True, text=True
).stdout.strip()

result = subprocess.run(
    ["docker", "exec", CID, "psql", "-U", "postgres", "-d", "nexa", "-t", "-A",
     "-c", "SELECT row_to_json(t) FROM (SELECT tenant_slug, domain, content, page_config, images, site_config, meta FROM tenant_config) t"],
    capture_output=True, text=True, timeout=30
)
row = json.loads(result.stdout.strip())
slug = row['tenant_slug']

print("=== Migrating to Supabase ===")

# First: simple insert with just slug, then update fields one by one
print(f"\n1. Creating row for '{slug}'...")
sql_create = f"INSERT INTO tenant_config (tenant_slug, domain) VALUES ('{slug}', '{row.get('domain', '')}') ON CONFLICT (tenant_slug) DO NOTHING"
r = query(sql_create)
print(f"   {'✅' if r is not None else '❌'}")

# Update site config (small)
print(f"\n2. Updating site_config ({len(json.dumps(row['site_config']))}B)...")
sql_site = f"UPDATE tenant_config SET site_config = {dquote(row['site_config'])}::jsonb WHERE tenant_slug = '{slug}'"
r = query(sql_site)
print(f"   {'✅' if r is not None else '❌'}")

# Update meta (small)
print(f"\n3. Updating meta ({len(json.dumps(row['meta']))}B)...")
sql_meta = f"UPDATE tenant_config SET meta = {dquote(row['meta'])}::jsonb WHERE tenant_slug = '{slug}'"
r = query(sql_meta)
print(f"   {'✅' if r is not None else '❌'}")

# Update images (36KB)
print(f"\n4. Updating images ({len(json.dumps(row['images']))}B)...")
sql_img = f"UPDATE tenant_config SET images = {dquote(row['images'])}::jsonb WHERE tenant_slug = '{slug}'"
r = query(sql_img)
print(f"   {'✅' if r is not None else '❌'}")

# Update page_config (15KB)
print(f"\n5. Updating page_config ({len(json.dumps(row['page_config']))}B)...")
sql_pg = f"UPDATE tenant_config SET page_config = {dquote(row['page_config'])}::jsonb WHERE tenant_slug = '{slug}'"
r = query(sql_pg)
print(f"   {'✅' if r is not None else '❌'}")

# Update content by individual top-level keys (each is small enough)
content = row['content']
print(f"\n6. Updating content ({len(json.dumps(content))}B total, splitting by key)...")
for key in content:
    chunk = {key: content[key]}
    chunk_json = json.dumps(chunk)
    if len(chunk_json) > 50000:
        # Very large chunk — split further
        print(f"   ⚠  '{key}' is {len(chunk_json)}B, splitting sub-keys...")
        if isinstance(content[key], dict):
            for subkey in content[key]:
                subchunk = {key: {subkey: content[key][subkey]}}
                sub_json = json.dumps(subchunk)
                sql_c = f"UPDATE tenant_config SET content = content || {dquote(subchunk)}::jsonb WHERE tenant_slug = '{slug}'"
                r = query(sql_c)
                print(f"   {'✅' if r is not None else '❌'} '{key}.{subkey}' ({len(sub_json)}B)")
    else:
        sql_c = f"UPDATE tenant_config SET content = content || {dquote(chunk)}::jsonb WHERE tenant_slug = '{slug}'"
        r = query(sql_c)
        print(f"   {'✅' if r is not None else '❌'} '{key}' ({len(chunk_json)}B)")

# Verify
print("\n=== Verification ===")
verify = query("SELECT tenant_slug, octet_length(content::text) as c, octet_length(images::text) as i, octet_length(site_config::text) as s FROM tenant_config")
if verify:
    for v in verify:
        print(f"✅ {v['tenant_slug']}: content={v['c']}B, images={v['i']}B, site={v['s']}B")
else:
    print("❌ No data")
