#!/usr/bin/env python3
"""Compare locale JSONs key structure at the top level (page section level) and 
report structural differences. Only fills in truly missing top-level sections or 
scalar leaf keys that exist in ES but not in other locales.
Does NOT try to reconcile array item structures which may differ by design."""

import json
from pathlib import Path

CONTENT_DIR = Path(__file__).resolve().parent.parent / 'content'
LOCALES = ['es', 'en', 'nl', 'de']

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def get_top_keys(obj, prefix=''):
    """Return all top-level string/leaf scalar keys."""
    keys = set()
    if isinstance(obj, dict):
        for k, v in obj.items():
            path = f'{prefix}.{k}' if prefix else k
            keys.add(path)
            if isinstance(v, dict):
                keys.update(get_top_keys(v, path))
            elif isinstance(v, list) and v and isinstance(v[0], dict):
                # For arrays of objects, track array key itself + fields from first item
                keys.add(f'{path}[#]')
                for fk in v[0]:
                    fp = f'{path}[#].{fk}'
                    keys.add(fp)
                    fv = v[0][fk]
                    if isinstance(fv, dict):
                        keys.update(get_top_keys(fv, fp))
    return keys

def main():
    locales = {}
    for loc in LOCALES:
        locales[loc] = load_json(CONTENT_DIR / f'{loc}.json')
    
    es_keys = get_top_keys(locales['es'])
    
    print(f'=== LOCALE KEY STRUCTURE COMPARISON ===')
    print(f'Spanish (es) keys: {len(es_keys)}')
    print()
    
    for loc in ['en', 'nl', 'de']:
        lk = get_top_keys(locales[loc])
        missing = es_keys - lk
        extra = lk - es_keys
        
        print(f'--- {loc.upper()} ---')
        print(f'  Keys: {len(lk)}')
        print(f'  Missing: {len(missing)}')
        if missing:
            for k in sorted(missing):
                print(f'    - {k}')
        if extra:
            print(f'  Extra: {len(extra)}')
        print()
        
        if not missing:
            print(f'  No missing keys.')
        print()

if __name__ == '__main__':
    main()
