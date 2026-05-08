#!/usr/bin/env python3
"""
Migration Analysis Script: Inline Styles → Tailwind v4 Classes

Scans src/components/*.tsx for:
  - import { theme } from any path
  - useRouter from next/router
  - style={{ ... }} props with known theme values

Prints per-component report and saves to
  docs/13-upgrades/migration-report.json
"""

import os, re, json, sys, datetime
from pathlib import Path

REPO = Path(os.environ.get("REPO_DIR", "/root/nexa-paraguay"))
COMPONENTS_DIR = REPO / "src" / "components"
OUTPUT_REPORT = REPO / "docs" / "13-upgrades" / "migration-report.json"

COLOR_MAP = {
    "c.primary":      ("#1B2A4A",  ["primary", "text-primary", "bg-primary"]),
    "c.accent":       ("#C9A96E",  ["accent", "text-accent", "bg-accent", "border-accent"]),
    "c.bg":           ("#FAF8F5",  ["bg-background"]),
    "c.bgLight":      ("#F5F5EE",  ["bg-surface-alt"]),
    "c.text":         ("#444",     ["text-text-muted"]),
    "c.textDark":     ("#1B2A4A",  ["text-primary"]),
    "c.textMuted":    ("#666",     ["text-text-muted"]),
    "c.textLight":    ("#999",     ["text-text-muted/70"]),
    "c.border":       ("#e0e0e0",  ["border-border"]),
    "c.whatsapp":     ("#25D366",  ["text-[#25D366]", "bg-[#25D366]"]),
    "c.white":        ("#FFFFFF",  ["text-white", "bg-white"]),
    "c.success":      ("#10b981",  ["text-success", "bg-success"]),
}

RADIUS_MAP = {
    "r.sm":   ("8px",   ["rounded-sm"]),
    "r.md":   ("12px",  ["rounded-lg"]),
    "r.lg":   ("16px?", ["rounded-xl"]),
    "r.xl":   ("24px",  ["rounded-2xl"]),
    "r.full": ("50px",  ["rounded-full"]),
}

TOKEN_MAP = {
    "s.section":    ("4rem 1rem", ["py-16", "px-4"]),
    "s.sectionSm":  ("3rem 1rem", ["py-12", "px-4"]),
    "s.sectionLg":  ("5rem 1rem 3rem", ["py-20", "px-4"]),
    "s.sectionDark":("5rem 1rem", ["py-20", "px-4"]),
    "s.card":       ("1.5rem",    ["p-6"]),
    "s.cardSm":     ("1.25rem",   ["p-5"]),
    "s.btn":        ("0.85rem 2.5rem", ["px-10", "py-3"]),
    "s.btnSm":      ("0.5rem 1.25rem", ["px-5", "py-2"]),
    "s.input":      ("0.75rem 1rem",   ["px-4", "py-3"]),
    "sz.maxWidth":  ("1200px",    ["max-w-6xl"]),
    "sz.contentWidth": ("800px",  ["max-w-4xl"]),
    "sz.contentWide":  ("1000px", ["max-w-5xl"]),
    "sz.contentNarrow":("700px",  ["max-w-3xl"]),
    "sz.contentForm":  ("600px",  ["max-w-2xl"]),
    "sz.contentBlog":  ("750px",  ["max-w-3xl"]),
}

FONT_SIZE_MAP = {
    "1rem":            "text-base",
    "1.05rem":         "text-base",
    "1.1rem":          "text-lg",
    "1.125rem":        "text-lg",
    "1.15rem":         "text-lg",
    "1.2rem":          "text-xl",
    "1.25rem":         "text-xl",
    "1.3rem":          "text-xl",
    "1.4rem":          "text-2xl",
    "1.5rem":          "text-2xl",
    "1.8rem":          "text-3xl",
    "2rem":            "text-4xl",
    "2.2rem":          "text-4xl",
    "2.5rem":          "text-5xl",
    "0.85rem":         "text-sm",
    "0.9rem":          "text-sm",
    "0.95rem":         "text-sm",
    "0.8rem":          "text-xs",
    "0.75rem":         "text-xs",
}

def count_inline_styles(content):
    return len(re.findall(r'style=\{', content))

def has_theme_import(content):
    return bool(re.search(r'import\s*\{[^}]*theme[^}]*\}\s*from\s*[\'\"]', content))

def has_use_router(content):
    return 'useRouter' in content and "'next/router'" in content

def has_use_pathname(content):
    return 'usePathname' in content and "'next/navigation'" in content

def detect_shortcuts(content):
    found = []
    m = re.search(r'const\s+(\w+)\s*=\s*theme\.colors', content)
    if m: found.append(("colors_shortcut", m.group(1)))
    m = re.search(r'const\s+(\w+)\s*=\s*theme\.radii', content)
    if m: found.append(("radii_shortcut", m.group(1)))
    m = re.search(r'const\s+(\w+)\s*=\s*theme\.spacing', content)
    if m: found.append(("spacing_shortcut", m.group(1)))
    m = re.search(r'const\s+(\w+)\s*=\s*theme\.sizes', content)
    if m: found.append(("sizes_shortcut", m.group(1)))
    return found

def count_theme_token_usages(content):
    counts = {}
    tokens = list(COLOR_MAP.keys()) + list(RADIUS_MAP.keys()) + list(TOKEN_MAP.keys())
    for tok in tokens:
        pattern = re.escape(tok)
        cnt = len(re.findall(pattern, content))
        if cnt > 0:
            counts[tok] = cnt
    return counts

def analyze_specific_patterns(content):
    findings = []
    for val, cls in FONT_SIZE_MAP.items():
        pat = r"fontSize:\s*['\"]" + re.escape(val) + r"['\"]"
        if re.search(pat, content):
            findings.append(("fontSize", val, cls))
    for val, cls in [("300","font-light"),("400","font-normal"),("500","font-medium"),
                      ("600","font-semibold"),("700","font-bold"),("800","font-extrabold")]:
        pat = r"fontWeight:\s*" + re.escape(val) + r"\b"
        if re.search(pat, content):
            findings.append(("fontWeight", val, cls))
    for val, cls in [("1.2","leading-tight"),("1.5","leading-normal"),
                      ("1.6","leading-relaxed"),("1.7","leading-relaxed"),("1.8","leading-relaxed")]:
        pat = r"lineHeight:\s*" + re.escape(val) + r"\b"
        if re.search(pat, content):
            findings.append(("lineHeight", val, cls))
    if re.search(r"textAlign:\s*'center'", content):
        findings.append(("textAlign", "center", "text-center"))
    if re.search(r"textAlign:\s*'left'", content):
        findings.append(("textAlign", "left", "text-left"))
    if re.search(r"textTransform:\s*'uppercase'", content):
        findings.append(("textTransform", "uppercase", "uppercase"))
    if re.search(r"display:\s*'flex'", content):
        findings.append(("display", "flex", "flex"))
    if re.search(r"display:\s*'grid'", content):
        findings.append(("display", "grid", "grid"))
    return findings

def estimate_migration_effort(inline_style_count, token_count, has_router):
    base_hours = max(1, round(inline_style_count / 15, 1))
    complexity = "low"
    if token_count > 100: complexity = "high"
    elif token_count > 50: complexity = "medium"
    if has_router: base_hours += 0.5
    return {"estimated_hours": base_hours, "estimated_difficulty": complexity,
            "inline_style_count": inline_style_count, "unique_token_count": token_count}

def analyze_component(filepath):
    content = filepath.read_text(encoding="utf-8")
    name = filepath.stem
    exports = re.findall(r'export\s+(?:function|const)\s+(\w+)', content)
    total_styles = count_inline_styles(content)
    theme_import = has_theme_import(content)
    router = has_use_router(content)
    pathname = has_use_pathname(content)
    shortcuts = detect_shortcuts(content)
    token_counts = count_theme_token_usages(content)
    total_tokens = sum(token_counts.values())
    patterns = analyze_specific_patterns(content)
    effort = estimate_migration_effort(total_styles, total_tokens, router)
    return {
        "file": str(filepath.relative_to(REPO)),
        "component_name": name,
        "exports": exports,
        "total_inline_styles": total_styles,
        "has_theme_import": theme_import,
        "has_use_router": router,
        "has_use_pathname": pathname,
        "shortcuts": [s[1] for s in shortcuts],
        "theme_token_usage": token_counts,
        "total_theme_token_references": total_tokens,
        "specific_patterns_found": patterns,
        "migration_effort": effort,
    }

def generate_report():
    tsx_files = sorted(COMPONENTS_DIR.glob("*.tsx"))
    components = []
    grand_total_styles = 0
    grand_total_tokens = 0
    grand_total_hours = 0.0

    print("=" * 70)
    print("  TAILWIND v4 MIGRATION ANALYSIS REPORT")
    print("  Nexa Paraguay \u2014 Inline Style Audit")
    print("=" * 70)
    print()

    for fp in tsx_files:
        print(f"--- Analyzing: {fp.name} ---")
        result = analyze_component(fp)
        components.append(result)
        e = result["migration_effort"]
        grand_total_styles += e["inline_style_count"]
        grand_total_tokens += result["total_theme_token_references"]
        grand_total_hours += e["estimated_hours"]

        print(f"  Exports:          {', '.join(result['exports'])}")
        print(f"  Inline styles:    {result['total_inline_styles']}")
        print(f"  Theme import:     {'YES' if result['has_theme_import'] else 'no'}")
        print(f"  useRouter:        {'YES' if result['has_use_router'] else 'no'}")
        print(f"  usePathname:      {'YES' if result['has_use_pathname'] else 'no'}")
        if result["shortcuts"]:
            print(f"  Shortcuts:        {', '.join(result['shortcuts'])}")
        print(f"  Token refs:       {result['total_theme_token_references']}")
        if result["theme_token_usage"]:
            print(f"  Top tokens:")
            for tok, cnt in sorted(result["theme_token_usage"].items(), key=lambda x: -x[1])[:8]:
                print(f"    {tok:25s} \u2192 {cnt}x")
        if result["specific_patterns_found"]:
            pat_summary = {}
            for ptype, pval, pcls in result["specific_patterns_found"]:
                pat_summary.setdefault(ptype, set()).add(pcls)
            print(f"  Inline patterns:")
            for ptype, pclses in sorted(pat_summary.items()):
                print(f"    {ptype:15s} \u2192 {', '.join(sorted(pclses))}")
        print(f"  Est. effort:      {e['estimated_hours']}h ({e['estimated_difficulty']})")
        print("-" * 70)
        print()

    print("=" * 70)
    print("  SUMMARY")
    print("=" * 70)
    print(f"  Files analyzed:           {len(components)}")
    print(f"  Total inline styles:      {grand_total_styles}")
    print(f"  Total theme refs:         {grand_total_tokens}")
    print(f"  Estimated migration:      {grand_total_hours:.1f}h")
    has_t = sum(1 for c in components if c['has_theme_import'])
    has_r = sum(1 for c in components if c['has_use_router'])
    needs = sum(1 for c in components if c['has_theme_import'] or c['total_inline_styles'] > 0)
    print(f"  Components with theme:    {has_t}/{len(components)}")
    print(f"  Components with router:   {has_r}/{len(components)}")
    print(f"  Needs Tailwind migration: {needs}/{len(components)}")
    print("=" * 70)

    report = {
        "generated_at": datetime.datetime.now().isoformat(),
        "repo_path": str(REPO),
        "total_components": len(components),
        "summary": {
            "total_inline_styles": grand_total_styles,
            "total_theme_token_references": grand_total_tokens,
            "estimated_migration_hours": round(grand_total_hours, 1),
            "components_with_theme_import": has_t,
            "components_with_use_router": has_r,
            "components_needing_migration": needs,
            "tailwind_theme_config": {
                "primary": "#1B2A4A -> text-primary, bg-primary",
                "accent": "#C9A96E -> text-accent, bg-accent, border-accent",
                "surface-alt": "#F5F5F0 -> bg-surface-alt",
                "text-muted": "#5C6B7A -> text-text-muted",
                "border": "#E0E0E0 -> border-border",
                "rounded-sm": "8px",
                "rounded-lg": "12px",
                "rounded-2xl": "24px",
                "rounded-full": "50%/9999px",
            },
            "key_mappings": {
                "c.primary": "#1B2A4A -> primary / text-primary / bg-primary",
                "c.accent": "#C9A96E -> accent / text-accent / bg-accent / border-accent",
                "c.bg": "#FAF8F5 -> bg-background",
                "c.bgLight": "#F5F5EE -> bg-surface-alt",
                "c.text": "#444 -> text-text-muted",
                "c.textDark": "#1B2A4A -> text-primary",
                "c.textMuted": "#666 -> text-text-muted",
                "c.border": "#e0e0e0 -> border-border",
                "c.whatsapp": "#25D366 -> text-[#25D366] or bg-[#25D366]",
                "r.sm": "8px -> rounded-sm",
                "r.md": "12px -> rounded-lg",
                "r.lg": "16px -> rounded-xl",
                "r.xl": "24px -> rounded-2xl",
                "r.full": "50px -> rounded-full",
                "s.section": "4rem 1rem -> py-16 px-4",
                "s.sectionSm": "3rem 1rem -> py-12 px-4",
                "s.sectionLg": "5rem 1rem 3rem -> py-20 px-4",
                "s.card": "1.5rem -> p-6",
                "s.btn": "0.85rem 2.5rem -> px-10 py-3",
                "s.input": "0.75rem 1rem -> px-4 py-3",
                "sz.maxWidth": "1200px -> max-w-6xl",
                "sz.contentWidth": "800px -> max-w-4xl",
                "sz.contentWide": "1000px -> max-w-5xl",
                "sz.contentNarrow": "700px -> max-w-3xl",
                "sz.contentForm": "600px -> max-w-2xl",
            },
        },
        "components": components,
    }

    OUTPUT_REPORT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_REPORT, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    print(f"\n  Full report saved to: {OUTPUT_REPORT}")
    print()

if __name__ == "__main__":
    generate_report()
    sys.exit(0)
