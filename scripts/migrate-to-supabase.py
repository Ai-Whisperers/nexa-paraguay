"""
Nexa Paraguay — Supabase Migration Script
Run this to re-migrate or update the tenant_config row.
Idempotent: uses UPSERT.
"""

import subprocess, json, os, glob

REPO = "/root/nexa-paraguay"
SUPABASE_REF = "qyvokpribmbrosafntqa"
PAT = "sbp_e1535079b4cfb2d2cd6de97735fb2bfe372c8a9b"

def read_json(rel_path):
    full = os.path.join(REPO, rel_path)
    with open(full) as f:
        return json.load(f)

def query(sql_file):
    r = subprocess.run([
        "curl", "-s", "-X", "POST",
        f"https://api.supabase.com/v1/projects/{SUPABASE_REF}/database/query",
        "-H", f"Authorization: Bearer {PAT}",
        "-H", "Content-Type: application/json",
        "-d", f"@{sql_file}"
    ], capture_output=True, text=True, timeout=60)
    try: return json.loads(r.stdout)
    except: return r.stdout

print("Reading content files...")
site = read_json("site.json")
content = {}
for loc in ["es", "en", "nl", "de"]:
    content[loc] = read_json(f"content/{loc}.json")
    print(f"  content/{loc}.json: {len(json.dumps(content[loc]))} bytes")

images = read_json("images.json")
testimonials = read_json("testimonials.json")

pages = {}
for fp in sorted(glob.glob(os.path.join(REPO, "nexa-pages", "*.json"))):
    name = os.path.basename(fp).replace(".json", "")
    with open(fp) as f: pages[name] = json.load(f)
print(f"  pages: {len(pages)} files")

blog_posts = {}
for fp in sorted(glob.glob(os.path.join(REPO, "content", "blog", "posts*.json"))):
    name = os.path.basename(fp)
    with open(fp) as f: blog_posts[name] = json.load(f)
print(f"  blog posts: {len(blog_posts)} files")

payload = {
    "query": f"""
INSERT INTO tenant_config (tenant_slug, site, content, images, testimonials, pages, blog_posts)
VALUES (
    'nexa-paraguay',
    $json${json.dumps(site)}$json$::jsonb,
    $json${json.dumps(content)}$json$::jsonb,
    $json${json.dumps(images)}$json$::jsonb,
    $json${json.dumps(testimonials)}$json$::jsonb,
    $json${json.dumps(pages)}$json$::jsonb,
    $json${json.dumps(blog_posts)}$json$::jsonb
)
ON CONFLICT (tenant_slug) DO UPDATE SET
    site = EXCLUDED.site,
    content = EXCLUDED.content,
    images = EXCLUDED.images,
    testimonials = EXCLUDED.testimonials,
    pages = EXCLUDED.pages,
    blog_posts = EXCLUDED.blog_posts,
    updated_at = now();
"""
}

payload_file = "/tmp/supabase_migrate.json"
with open(payload_file, 'w') as f:
    json.dump(payload, f)

print(f"\nPayload: {os.path.getsize(payload_file)} bytes")
print("Running migration...")
r = query(payload_file)
print(f"Result: {json.dumps(r)[:200]}")
print("Migration complete.")
