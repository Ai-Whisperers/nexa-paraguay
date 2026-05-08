#!/usr/bin/env python3
"""Compare all 4 locale JSONs key structure and report missing keys.
Adds placeholder empty strings for missing keys in EN/NL/DE."""

import json, os, sys
from pathlib import Path

CONTENT_DIR = Path(__file__).resolve().parent.parent / 'content'
LOCALES = ['es', 'en', 'nl', 'de']

def get_all_keys(obj, prefix=''):
    """Return a set of all dot-separated key paths in a nested dict."""
    keys = set()
    if isinstance(obj, dict):
        for k, v in obj.items():
            path = f'{prefix}.{k}' if prefix else k
            if isinstance(v, (dict, list)):
                keys.add(path)
                keys.update(get_all_keys(v, path))
            else:
                keys.add(path)
    elif isinstance(obj, list):
        for i, item in enumerate(obj):
            if isinstance(item, (dict, list)):
                keys.update(get_all_keys(item, f'{prefix}[{i}]'))
            else:
                keys.add(f'{prefix}[{i}]')
    return keys

def get_top_level_keys(obj, prefix=''):
    """Return all leaf string values and their paths for inspection."""
    results = {}
    if isinstance(obj, dict):
        for k, v in obj.items():
            path = f'{prefix}.{k}' if prefix else k
            if isinstance(v, dict):
                results.update(get_top_level_keys(v, path))
            elif isinstance(v, list):
                results[path] = f'[array:{len(v)}items]'
            else:
                results[path] = str(v)[:80]
    return results

def fill_missing(obj, reference_keys, prefix=''):
    """Return a new dict with all reference keys present. Missing ones get ''."""
    if not isinstance(obj, dict):
        return obj
    
    result = {}
    # Collect all keys from this level in reference
    ref_local_keys = set()
    for k in reference_keys:
        parts = k.split('.', 1)
        ref_local_keys.add(parts[0])
    
    # Also keep any keys already in obj
    all_keys = set(list(obj.keys()) + list(ref_local_keys))
    
    for k in sorted(all_keys):
        ref_path = f'{prefix}.{k}' if prefix else k
        
        # Keys that exist under this path in reference
        child_refs = {rk for rk in reference_keys if rk.startswith(ref_path + '.') or rk == ref_path}
        
        if k in obj:
            if isinstance(obj[k], dict) and child_refs:
                result[k] = fill_missing(obj[k], reference_keys, ref_path)
            elif isinstance(obj[k], list):
                result[k] = obj[k]  # Preserve arrays as-is
            else:
                result[k] = obj[k]
        else:
            # Key missing entirely - add placeholder
            if child_refs:
                result[k] = fill_missing({}, reference_keys, ref_path)
            else:
                result[k] = ''
    
    return result

def main():
    # Load all files
    locales = {}
    for loc in LOCALES:
        path = CONTENT_DIR / f'{loc}.json'
        with open(path, 'r', encoding='utf-8') as f:
            locales[loc] = json.load(f)
    
    # Get reference keys from ES
    es_keys = get_all_keys(locales['es'])
    
    report = []
    report.append('=== LOCALE KEY COMPARISON REPORT ===')
    report.append(f'Spanish (es) total keys: {len(es_keys)}')
    report.append('')
    
    all_ok = True
    
    for loc in ['en', 'nl', 'de']:
        loc_keys = get_all_keys(locales[loc])
        missing_in_loc = es_keys - loc_keys
        extra_in_loc = loc_keys - es_keys
        
        report.append(f'--- {loc.upper()} ({loc}) ---')
        report.append(f'  Total keys: {len(loc_keys)}')
        report.append(f'  Missing vs ES: {len(missing_in_loc)}')
        
        if missing_in_loc:
            report.append('  Missing keys:')
            for k in sorted(missing_in_loc):
                report.append(f'    - {k}')
        else:
            report.append('  No missing keys!')
        
        if extra_in_loc:
            report.append(f'  Extra keys (not in ES): {len(extra_in_loc)}')
            for k in sorted(extra_in_loc):
                report.append(f'    + {k}')
        else:
            report.append('  No extra keys.')
        
        report.append('')
        if missing_in_loc:
            all_ok = False
            
            # Fill missing keys with empty strings
            locales[loc] = fill_missing(locales[loc], es_keys)
            
            # Save
            out_path = CONTENT_DIR / f'{loc}.json'
            with open(out_path, 'w', encoding='utf-8') as f:
                json.dump(locales[loc], f, indent=2, ensure_ascii=False)
            report.append(f'  >>> Filled missing keys with empty strings in {loc}.json')
        else:
            report.append(f'  >>> No changes needed for {loc}.json')
        report.append('')
    
    # Verify post-fix
    report.append('=== POST-FIX VERIFICATION ===')
    for loc in ['en', 'nl', 'de']:
        path = CONTENT_DIR / f'{loc}.json'
        with open(path, 'r', encoding='utf-8') as f:
            fixed = json.load(f)
        fixed_keys = get_all_keys(fixed)
        still_missing = es_keys - fixed_keys
        if still_missing:
            report.append(f'{loc}: STILL MISSING {len(still_missing)} keys!')
            for k in sorted(still_missing):
                report.append(f'  - {k}')
        else:
            report.append(f'{loc}: All keys match ES. OK.')
    
    report_text = '\n'.join(report)
    print(report_text)
    
    # Write report file
    report_path = CONTENT_DIR / 'locale-key-comparison-report.txt'
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(report_text)
    print(f'\nReport written to {report_path}')

if __name__ == '__main__':
    main()
