#!/usr/bin/env python3
"""Batch register all MDX blog posts into content/{locale}.json."""
import json, os, re

BASE = '/root/nexa-paraguay'
os.chdir(BASE)

def get_frontmatter(path):
    with open(path) as f:
        content = f.read()
    m = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not m: return {}
    fm = {}
    for line in m.group(1).split('\n'):
        if ':' in line:
            key, _, val = line.partition(':')
            fm[key.strip()] = val.strip().strip('"').strip("'")
    return fm

def strip_body(path):
    with open(path) as f:
        content = f.read()
    m = re.match(r'^---\n.*?\n---\n\n', content, re.DOTALL)
    return content[m.end():].strip() if m else content.strip()

for locale in ['en', 'nl', 'de', 'es']:
    jfile = f'content/{locale}.json'
    if not os.path.exists(jfile):
        print(f"SKIP {jfile} — not found")
        continue

    with open(jfile) as f:
        data = json.load(f)

    if 'blog' not in data or 'posts' not in data['blog']:
        print(f"SKIP {jfile} — no blog.posts")
        continue

    existing = {p['slug'] for p in data['blog']['posts']}
    blog_dir = f'blog/{locale}'
    if not os.path.isdir(blog_dir):
        print(f"SKIP {locale} — no blog dir")
        continue

    added = 0
    for mdx in sorted(os.listdir(blog_dir)):
        if not mdx.endswith('.mdx'):
            continue
        slug = mdx.replace('.mdx', '')
        if slug in existing:
            continue

        path = os.path.join(blog_dir, mdx)
        fm = get_frontmatter(path)
        body = strip_body(path)

        category = fm.get('category', 'General')
        post = {
            'slug': slug,
            'title': fm.get('title', slug),
            'excerpt': fm.get('excerpt', ''),
            'author': 'Nexa Paraguay',
            'date': '2026-05-07',
            'category': category,
            'tags': [],
            'image': '/images/blog/default-cover.webp',
            'content': body,
        }
        data['blog']['posts'].append(post)
        added += 1

    if added:
        with open(jfile, 'w') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"  {locale}: +{added} posts (total {len(data['blog']['posts'])})")
    else:
        print(f"  {locale}: no changes")

print("=== DONE ===")
