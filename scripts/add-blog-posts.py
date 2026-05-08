#!/usr/bin/env python3
"""Add new blog posts to content/en.json and content/nl.json blog.posts arrays."""
import json, sys, os, re

BASE = '/root/nexa-paraguay'
os.chdir(BASE)

def strip_mdx_frontmatter(path):
    """Read MDX file and strip frontmatter, return markdown body."""
    with open(path) as f:
        content = f.read()
    # Strip frontmatter between --- and ---
    m = re.match(r'^---\n.*?\n---\n\n', content, re.DOTALL)
    if m:
        body = content[m.end():]
    else:
        body = content
    # Clean up: remove trailing whitespace, collapse multiple newlines
    body = body.strip()
    # Convert to single-line escaped for JSON
    return body

def get_frontmatter(path):
    """Extract frontmatter fields from MDX."""
    with open(path) as f:
        content = f.read()
    m = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not m:
        return {}
    fm = {}
    for line in m.group(1).split('\n'):
        if ':' in line:
            key, _, val = line.partition(':')
            key = key.strip()
            val = val.strip().strip('"').strip("'")
            fm[key] = val
    return fm

# Define new posts to add
new_posts = {
    'en': [
        {
            'slug': 'uk-non-dom-abolition-paraguay',
            'title': 'UK Non-Dom Abolition: Your Paraguay Exit Strategy for 2026',
            'category': 'UK Tax',
            'tags': ['uk', 'non-dom', 'tax', 'residency', 'expat'],
            'path': 'blog/en/uk-non-dom-abolition-paraguay.mdx'
        },
        {
            'slug': 'paraguay-vs-portugal-2026',
            'title': 'Paraguay vs Portugal for UK Expats in 2026: The Honest Comparison',
            'category': 'Comparison',
            'tags': ['paraguay', 'portugal', 'comparison', 'uk', 'expat'],
            'path': 'blog/en/paraguay-vs-portugal-2026.mdx'
        },
        {
            'slug': 'dac8-crypto-paraguay',
            'title': 'DAC8 is Live: Europe\'s Crypto Reporting Law and Why Paraguay Is the Escape Route',
            'category': 'Crypto',
            'tags': ['crypto', 'dac8', 'tax', 'bitcoin', 'residency'],
            'path': 'blog/en/dac8-crypto-paraguay.mdx'
        },
        {
            'slug': 'us-paraguay-feie-tax-strategy',
            'title': 'FEIE + Paraguay: How Americans Can Earn Up to $132,900 Tax-Free in 2026',
            'category': 'US Tax',
            'tags': ['us', 'feie', 'tax', 'american', 'expat', 'fire'],
            'path': 'blog/en/us-paraguay-feie-tax-strategy.mdx'
        }
    ],
    'nl': [
        {
            'slug': 'box-3-hervorming-2028',
            'title': 'Box 3 Hervorming 2028: Wat de Nieuwe Wet Betekent voor Jouw Vermogen',
            'category': 'Belastingen',
            'tags': ['box3', 'belasting', 'vermogen', 'nederland', 'residency'],
            'path': 'blog/nl/box-3-hervorming-2028.mdx'
        },
        {
            'slug': 'territoriaal-belastingstelsel',
            'title': 'Territoriaal Belastingstelsel Uitgelegd: 0% op Buitenlands Inkomen in Paraguay',
            'category': 'Belastingen',
            'tags': ['territoriaal', 'belasting', 'paraguay', 'inkomen'],
            'path': 'blog/nl/territoriaal-belastingstelsel.mdx'
        },
        {
            'slug': 'paraguay-vs-portugal-zzp',
            'title': 'Paraguay vs Portugal voor Nederlandse ZZP\'ers: Waar Houd je Meer Over?',
            'category': 'Vergelijking',
            'tags': ['paraguay', 'portugal', 'zzp', 'vergelijking', 'belasting'],
            'path': 'blog/nl/paraguay-vs-portugal-zzp.mdx'
        },
        {
            'slug': 'dba-handhaving-gids',
            'title': 'ZZP-Crackdown: Wat de DBA-Handhaving Betekent voor Jouw Ondernemersvrijheid',
            'category': 'Ondernemen',
            'tags': ['zzp', 'dba', 'handhaving', 'ondernemen', 'nederland'],
            'path': 'blog/nl/dba-handhaving-gids.mdx'
        }
    ]
}

for locale, posts in new_posts.items():
    json_file = f'content/{locale}.json'
    if not os.path.exists(json_file):
        print(f"SKIP {json_file} — not found")
        continue
    
    with open(json_file) as f:
        data = json.load(f)
    
    if 'blog' not in data or 'posts' not in data['blog']:
        print(f"SKIP {json_file} — no blog.posts structure")
        continue
    
    existing_slugs = {p['slug'] for p in data['blog']['posts']}
    
    added = 0
    for post in posts:
        if post['slug'] in existing_slugs:
            print(f"  SKIP {locale}/{post['slug']} — already exists")
            continue
        
        fm = get_frontmatter(post['path'])
        body = strip_mdx_frontmatter(post['path'])
        excerpt = fm.get('excerpt', '')
        reading_min = int(fm.get('readingMinutes', 7))
        
        new_entry = {
            'slug': post['slug'],
            'title': post['title'],
            'excerpt': excerpt,
            'author': 'Nexa Paraguay',
            'date': '2026-05-07',
            'category': post['category'],
            'tags': post['tags'],
            'image': '/images/blog/default-cover.webp',
            'content': body,
            'readingMinutes': reading_min
        }
        data['blog']['posts'].append(new_entry)
        added += 1
        print(f"  ADDED {locale}/{post['slug']}")
    
    if added:
        with open(json_file, 'w') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"  → Updated {json_file} (+{added} posts)")
    else:
        print(f"  → {json_file}: no changes")
