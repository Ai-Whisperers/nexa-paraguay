# NEXA_UPGRADE_SUMMARY.md — One-line comparison of pre vs post

> Quick reference: what changed in the P0–P3 sweep (2026-06-15).

## Before (pre-sweep, 2026-05-11)

```yaml
pricing: 4 deprecated tiers shown publicly ($2,900 / $4,400 / $6,900 / Tierras)
team: 3 fake members with placeholder photos, no disclosure
testimonials: fabricated with real names, "verified: true", savings amounts
stats: "+500 familias / 98% / 10 años" — fake
compliance: NOT in the site
4_orphan_pages: /empresa /lifestyle /trust /inversor (with $1,500+ prices)
testimonials.json: file present, served
i18n: locale purity broken in 3 of 4 locales (leaks of Spanish strings)
deploy: monorepo (apps/nexa-paraguay), Docker Swarm on VPS
live: https://nexa.paraguay.com (via Shopify, pending DNS cutover)
```

## After (post-sweep, 2026-06-15)

```yaml
pricing: ONE standard service, no public prices (per May 11 reality)
team: "📷 Foto referencial" badge on all 3 cards + section-level honest notice
testimonials: deleted file; replaced with anonymous "Cliente 1/2/3 — Países Bajos/Bélgica/Alemania"
stats: empty `home.stats` = {}, no fake numbers
compliance: SEPRELAD + AML + disclaimer on 6 pages (servicios, proceso, comparacion, por-que-paraguay, sobre, proceso-detallado)
4_orphan_pages: deleted (return 404 via dynamic catch-all, CTAs redirect to /contacto)
testimonials.json: deleted from repo
i18n: locale purity clean on all 4 locales (en/es/nl/de)
deploy: standalone personal repo (canonical), Docker Swarm on VPS at nexa-paraguay.paragu-ai.com
live: https://nexa.paragu-ai.com (active, 4-locale, 2/2 replicas)
```

## The single most important change

The site **used to lie** about pricing, team, and testimonials. It now tells the truth:

- "One standard service, ask for a quote" (not "4 tiers from $2,900")
- "📷 Referencial — we don't have real team photos yet" (not fake doctor photos)
- "Anonymous client stories from NL/BE/DE, names available on request" (not fabricated savings claims)

**This is the May 11 reality, faithfully represented.**

## The single most important remaining gap

**`nexa.com` still points to Shopify, not the new site.** The DNS cutover is the only thing between prospective clients and the honest site. Per `docs/CURRENT_STATE.md`: "nexaparaguay.com still needs DNS cutover away from Shopify."

That's a 1-step task for Ivan (or whoever has registrar access) and would land `nexa.com` on the same VPS-backed `nexa-paraguay.paragu-ai.com` deployment via Traefik.
