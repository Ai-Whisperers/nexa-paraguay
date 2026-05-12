> **Status:** Draft | **Last validated:** 2026-05-12
>

# Launch Runbook — Nexa Paraguay

> Target: `nexaparaguay.com` live with 4 locales, analytics, and lead
> capture. Owner: commercial director Europe + operations director Paraguay.
> Stakeholder sign-off required before DNS cutover.

## Pre-Flight Checklist

Before any production deployment, confirm all items below.

### Blocking Decisions

- [ ] **Final company name** confirmed (default: "Nexa Paraguay" working name)
- [x] **Core pricing decision** confirmed: `$1,500` complete price, internal/private unless Sonia approves publication
- [ ] **Add-on scope** confirmed for post-residency support, property, vehicle, appliances, school research, and medical accompaniment
- [ ] **Calendly account** created with event type URL
- [ ] **HubSpot portal ID + form ID** configured
- [ ] **Mailchimp API key + audience ID** configured
- [ ] **GA4 measurement ID** configured
- [ ] **Professional translations** delivered (ES -> NL, EN, DE)
- [ ] **Asuncion photography** sourced (50-100 images)
- [ ] **Logo design** completed (SVG + icon + favicon)
- [ ] **Attorney review** of privacy policy + legal templates signed off
- [ ] **SEPRELAD/AML compliance** status confirmed

### Required Environment Variables (Docker / GitHub Actions)

```
NEXT_PUBLIC_APP_URL            = https://nexaparaguay.com
NEXT_PUBLIC_SUPABASE_URL       = https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY  = <anon-key>
SUPABASE_SERVICE_ROLE_KEY      = <service-role-key>
NEXT_PUBLIC_GA4_ID             = G-XXXXXXXX
CRM_PORTAL_ID                  = <hubspot-portal-id>
CRM_ENDPOINT                   = <hubspot-form-guid>
MAILCHIMP_API_KEY              = <mailchimp-api-key>
MAILCHIMP_LIST_ID              = <mailchimp-audience-id>
EMAIL_FROM_ADDRESS             = hola@nexaparaguay.com
EMAIL_FROM_NAME                = Nexa Paraguay
```

All env vars must be set in the target environment before deployment.

## Verification Steps

### Staging (Week 7)

1. `npm ci && npm run build` — confirm clean build across 4 locales
2. Deploy to staging environment
3. Run smoke tests:
   - `curl -I https://staging.nexaparaguay.com` -> 200
   - Open each locale home page
   - Verify hreflang tags present on all pages
   - Verify `/privacidad` and `/faq` render legal content
   - Submit test lead via `/contacto`, verify HubSpot submission or fallback log from `src/app/api/contact/route.ts`
   - Submit newsletter subscription, verify Mailchimp member or fallback log from `src/app/api/subscribe/route.ts`
4. Stakeholder walkthrough (NL + EN content, legal sign-off)
5. Translator pass: NL locked, DE polished
6. Photography swap in asset directories

### Production (Week 8)

1. Merge PR to `main` branch (CI must be green)
2. Confirm auto-deploy to production completes
3. **DNS cutover** (see below)
4. Run production smoke checks:
   ```bash
   curl -I https://nexaparaguay.com           # expect 200
   curl https://nexaparaguay.com/sitemap.xml  # expect 200 XML
   ```
5. Open each locale in browser — verify:
   - hreflang tags in `<head>`
   - GA4 fires after consent
   - Lead form submits successfully
6. Submit all 4 locale sitemaps to Google Search Console + Bing Webmaster
7. Announce: LinkedIn post, nurture email, press release

## DNS Cutover

1. Set TTL to 300 (5 min) on the staging DNS record 24h before cutover
2. At cutover time, point the apex A record to `72.61.44.159` and `www` to `nexaparaguay.com`
3. Verify propagation:
   ```bash
   dig +short nexaparaguay.com
   curl -sI https://nexaparaguay.com | head -5
   ```
4. Expect full propagation within 5-10 minutes

**Known issue:** `nexaparaguay.com` currently redirects to Shopify.
After cutover, the new site must serve the primary domain directly.

## Post-Launch Monitoring (First 24h)

| Metric | Check | Alert threshold |
|---|---|---|
| HTTP 200 rate | Traefik/Cloudflare/health checks | Any 5xx > 1% |
| Lead submissions | HubSpot portal or contact route fallback logs | 0 leads after 100 visitors |
| GA4 events | Real-time report | No events after 1h |
| Hreflang errors | Google Search Console | Any errors in coverage report |
| Page load time | Lighthouse / browser checks | > 3s on any locale |
| Bot traffic % | Cloudflare analytics | > 50% triggers WAF review |

## Rollback Plan

### If issues detected within 1 hour of cutover:

1. **Docker Swarm:** Roll back the production service:
   ```bash
   docker service rollback nexa_web
   ```
2. **DNS:** If primary domain cutover is at fault, switch DNS back to holding
   page or the previous Shopify site
3. **Data:** Contact submissions are HubSpot/fallback-log based. Check route logs before retrying the launch.

### Post-rollback verification

- Confirm HTTP 200 on the rolled-back domain
- Check Traefik/health check output for error rate drop
- Notify stakeholders of rollback and ETA for re-attempt

## Monitoring Schedule

- **Hour 0-1:** Active watch by operations team
- **Hour 1-24:** Dashboard monitoring (GA4 + Traefik/Cloudflare + HubSpot/Mailchimp)
- **Day 2-7:** Daily lead count + Search Console check
- **Week 2+:** Weekly conversion report per locale
