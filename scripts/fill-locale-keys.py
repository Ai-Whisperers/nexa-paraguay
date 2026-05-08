#!/usr/bin/env python3
"""Add specific missing keys to EN/NL/DE locale JSONs.
Only adds keys that exist in ES but not in other locales.
String keys: '' placeholder.
Array/dict keys: [] or {} placeholder (not full templates)."""

import json
from pathlib import Path

CONTENT_DIR = Path(__file__).resolve().parent.parent / 'content'

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def get_all_keys(obj, prefix=''):
    keys = set()
    if isinstance(obj, dict):
        for k, v in obj.items():
            path = f'{prefix}.{k}' if prefix else k
            if isinstance(v, dict):
                keys.update(get_all_keys(v, path))
            elif isinstance(v, list):
                keys.add(f'{path}[]')
            else:
                keys.add(path)
    return keys

# Load ES reference
es = load_json(CONTENT_DIR / 'es.json')
es_keys = get_all_keys(es)

for loc in ['en', 'nl', 'de']:
    data = load_json(CONTENT_DIR / f'{loc}.json')
    loc_keys = get_all_keys(data)
    
    missing = es_keys - loc_keys
    if not missing:
        print(f'{loc}: No missing keys.')
        continue
    
    print(f'{loc}: Adding {len(missing)} missing keys...')
    
    for key in sorted(missing):
        is_array = key.endswith('[]')
        clean_key = key[:-2] if is_array else key
        
        parts = clean_key.split('.')
        # Navigate to parent
        current = data
        found = True
        
        for i, p in enumerate(parts):
            if i == len(parts) - 1:
                # This is the key to add
                if isinstance(current, dict) and p not in current:
                    current[p] = [] if is_array else ''
            else:
                if isinstance(current, dict) and p in current:
                    current = current[p]
                else:
                    # Parent path doesn't exist — skip this key
                    found = False
                    break
        
        if not found:
            print(f'  SKIP {clean_key} - parent path missing')
    
    save_json(CONTENT_DIR / f'{loc}.json', data)
    print(f'  Saved {loc}.json')

print('\n=== VERIFICATION ===')
es_keys = get_all_keys(load_json(CONTENT_DIR / 'es.json'))
for loc in ['en', 'nl', 'de']:
    data = load_json(CONTENT_DIR / f'{loc}.json')
    lk = get_all_keys(data)
    still = es_keys - lk
    if still:
        print(f'{loc}: {len(still)} keys still missing')
        for k in sorted(still):
            print(f'  - {k}')
    else:
        print(f'{loc}: All keys present.')
