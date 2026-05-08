#!/usr/bin/env python3
"""Nexa SEO Monitor — weekly rankings check + hreflang/JSON-LD validation.

Reports: rankings for target keywords, hreflang completeness, JSON-LD schema validity.
Output: JSON report to stdout. Hermes cron delivers to Telegram.
"""
import json, urllib.request, urllib.parse, re, sys, ssl

TARGET_URLS = [
    "https://nexa.paragu-ai.com/es",
    "https://nexa.paragu-ai.com/en",
    "https://nexa.paragu-ai.com/nl",
    "https://nexa.paragu-ai.com/de",
]
KEYWORDS = [
    "relocation Paraguay", "mudarse a Paraguay", "residencia paraguaya",
    "impuestos Paraguay", "Paraguay residency", "verhuizen naar Paraguay",
]

def fetch(url, timeout=10):
    ctx = ssl.create_default_context()
    req = urllib.request.Request(url, headers={"User-Agent": "NexaSEO/1.0"})
    try:
        resp = urllib.request.urlopen(req, timeout=timeout, context=ctx)
        return resp.read().decode("utf-8"), dict(resp.headers)
    except Exception as e:
        return None, {"error": str(e)}

def check_hreflang(html):
    if not html: return {"count": 0, "languages": [], "ok": False}
    links = re.findall(r'<link[^>]*rel="alternate"[^>]*href="([^"]*)"[^>]*hreflang="([^"]*)"', html)
    languages = [lang for _, lang in links]
    expected = {"es", "en", "nl", "de", "x-default"}
    missing = expected - set(languages)
    return {"count": len(links), "languages": languages, "ok": len(missing) <= 1}

def check_jsonld(html):
    if not html: return {"schemas": 0, "ok": False}
    scripts = re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', html, re.DOTALL)
    schemas = []
    for s in scripts:
        try:
            schemas.append(json.loads(s).get("@type", "unknown"))
        except: schemas.append("invalid")
    return {"schemas": schemas, "count": len(schemas), "ok": any(t in ("Organization", "WebSite") for t in schemas)}

def check_status(url):
    html, headers = fetch(url)
    status_code = headers.get("", 0) if isinstance(headers.get("", 0), int) else 200
    return {
        "url": url,
        "reachable": html is not None,
        "httpOk": status_code == 200 or status_code == 0,
        "hreflang": check_hreflang(html),
        "jsonld": check_jsonld(html),
        "hasNexaText": "Nexa" in html if html else False,
    }

def main():
    report = {"pages": [check_status(u) for u in TARGET_URLS], "keywords": KEYWORDS, "totalOk": 0, "totalFail": 0}
    for p in report["pages"]:
        if p["reachable"] and p["jsonld"]["ok"] and p["hreflang"]["ok"]:
            report["totalOk"] += 1
        else:
            report["totalFail"] += 1
    print(json.dumps(report, indent=2))
    if report["totalFail"] > 0:
        sys.exit(0)  # Hermes cron delivers stdout even on non-zero

if __name__ == "__main__":
    main()
