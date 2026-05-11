> **Status:** Current | **Last validated:** 2026-05-07
>

---
purpose: DNS cutover sequence for nexaparaguay.com — Cloudflare Pages configuration, records to publish, settings to verify, and rollback procedure
last_updated: 2026-05-07
version: 1.0
cross_refs:
  - STAKEHOLDER-QA.md (Section D6: email MX setup)
  - LAUNCH.md (launch sequence)
  - docs/10-deployment/deployment-guide.md (deployment pipeline)
---

# DNS Cutover — nexaparaguay.com

**Target:** nexaparaguay.com serves from Cloudflare Pages.
**Staging:** Already green at staging.nexaparaguay.com.

## Preconditions

- Domain nexaparaguay.com registered (Cloudflare Registrar recommended)
- Cloudflare Pages project nexa-paraguay linked to Main branch
- Staging verified green at staging.nexaparaguay.com

## Records to Publish (Production)

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| CNAME | @ (apex alias) | <pages-project>.pages.dev | Proxied (orange cloud) |
| CNAME | www | <pages-project>.pages.dev | Proxied |
| CNAME | staging | <pages-project>-<preview-branch>.pages.dev | Proxied |
| TXT | @ | SPF for transactional email (Resend/Postmark) | -- |
| MX | @ | Google Workspace MX set (if hola@nexaparaguay.com is Google) | -- |

## Settings to Verify

- SSL/TLS: Full (strict)
- HTTPS: Always Use HTTPS ON
- Redirect rule: http://www.nexaparaguay.com/* -> https://nexaparaguay.com/$1 (301)
- Page rule / Worker: None required — hostname rewrite handled in web/middleware.ts

## Cutover Sequence

1. Lower TTL on current nexaparaguay.com A/CNAME record to 300s, 24 hours before cutover
2. At cutover T-0: swap CNAME to Pages project, enable proxy, enable HTTPS, verify SSL certificate
3. T+5 min: `curl -I https://nexaparaguay.com` should return 200 from Cloudflare. If 522/525, wait or switch to DNS-only until cert issues.
4. T+15 min: submit sitemaps per locale:
   - https://nexaparaguay.com/s/nl/nexa-paraguay/sitemap.xml
   - https://nexaparaguay.com/s/en/nexa-paraguay/sitemap.xml
   - https://nexaparaguay.com/s/de/nexa-paraguay/sitemap.xml
   - https://nexaparaguay.com/s/es/nexa-paraguay/sitemap.xml

## Post-Cutover

- Enable Cloudflare Web Analytics (consent-gated by cookie banner)
- Leave TTL at 300s for 72 hours, then raise to 3600s
- If problems: revert DNS to prior target — CDN caches are edge-only and flush fast
