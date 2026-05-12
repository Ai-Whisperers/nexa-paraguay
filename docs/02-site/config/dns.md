> **Status:** Current | **Last validated:** 2026-05-12
>

---
purpose: DNS cutover sequence for nexaparaguay.com — point primary domain at current VPS/Traefik deployment
last_updated: 2026-05-12
version: 2.0
cross_refs:
  - docs/CURRENT_STATE.md
  - docs/11-launch/launch-runbook.md
  - docs/10-deployment/deployment-runbook.md
---

# DNS Cutover — nexaparaguay.com

**Target:** `nexaparaguay.com` serves the same Docker Swarm/Traefik app currently live at `https://nexa.paragu-ai.com`.
**Current issue:** `nexaparaguay.com` still points to Shopify.

## Preconditions

- DNS access for `nexaparaguay.com`
- VPS public IP confirmed: `72.61.44.159`
- Traefik route/certificate configuration supports `nexaparaguay.com` and `www.nexaparaguay.com`
- Production health check passes at `https://nexa.paragu-ai.com`
- Stakeholder confirms cutover timing

## Records to Publish (Production)

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| A | @ | `72.61.44.159` | DNS-only or proxied, depending on Traefik/Cloudflare TLS setup |
| CNAME | www | `nexaparaguay.com` | Match apex setting |
| TXT | @ | SPF for transactional email provider | DNS-only |
| MX | @ | Google Workspace or chosen mail provider | DNS-only |

## Settings to Verify

- SSL/TLS: Full strict if proxied through Cloudflare
- HTTPS: Always Use HTTPS ON
- Redirect rule: `http://www.nexaparaguay.com/*` -> `https://nexaparaguay.com/$1` (301)
- Traefik router includes both apex and `www`
- Certificate resolver can issue/renew for both hostnames

## Cutover Sequence

1. Lower TTL on current Shopify A/CNAME records to 300s at least 24 hours before cutover.
2. Confirm `https://nexa.paragu-ai.com` returns `200`.
3. Confirm Traefik has a router rule for `Host(\`nexaparaguay.com\`) || Host(\`www.nexaparaguay.com\`)`.
4. Replace Shopify DNS with the A/CNAME records above.
5. Verify propagation:
   ```bash
   dig +short nexaparaguay.com
   curl -sI https://nexaparaguay.com | head -5
   curl -sI https://www.nexaparaguay.com | head -5
   ```
6. Confirm locale redirects, sitemap, contact form, and GA4 on the primary domain.

## Post-Cutover

- Submit sitemap: `https://nexaparaguay.com/sitemap.xml`
- Leave TTL at 300s for 72 hours, then raise to 3600s
- Monitor Traefik logs, GitHub deploy status, GA4 realtime, and contact form logs for the first hour
- If problems: revert DNS to Shopify or holding page, then run `docker service rollback nexa_web` if the app deploy is at fault
