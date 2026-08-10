# Nexa Paraguay — Onboarding Checklist

## New client setup (estimated: 2-4 hours)

### Week 1: Foundation
- [ ] **Messaging AI setup**
  - Scan QR on Evolution API (run locally, one-time)
  - Verify auto-reply fires within 30s
  - Configure SLA responses (greeting, qualify, book)
  - Test: send a message, verify AI responds correctly

- [ ] **Domain migration**
  - Get Cloudflare DNS credentials from client
  - Create A record: `nexaparaguay.com` → `72.61.44.159`
  - Create CNAME: `www.nexaparaguay.com` → `nexaparaguay.com`
  - Update Traefik labels to include `nexaparaguay.com`
  - Verify SSL auto-provision

- [ ] **Google Analytics + Search Console**
  - Add GA4 property for `nexaparaguay.com`
  - Add Search Console verification
  - Verify sitemap.xml is indexed
  - Submit hreflang sitemap

### Week 2: Content
- [ ] **First blog post**
  - Research target keyword (high volume, low competition)
  - Write in Spanish (master locale)
  - Translate to en/nl/de
  - Add images + alt text
  - Commit and deploy
  - Monitor Google indexing (1-2 weeks)

- [ ] **Missing content audit**
  - Compare sections across 4 locales
  - For each missing section: write source (es), translate, commit
  - Check `docs/13-upgrades/complete-roadmap.md` for gaps

### Week 3: Growth
- [ ] **SEO ranking tracker** — Hermes cron: weekly rank check for top 10 keywords
- [ ] **Screenshot baseline** — Run `scripts/screenshot-all.mjs` and save baseline
- [ ] **Convert 3 comparison pages** — Cost of living, tax savings, program comparison
- [ ] **Newsletter setup** — Mailchimp/SendGrid integration

### Week 4: Launch
- [ ] **Google Ads campaign** — Local service ads for "relocation Paraguay"
- [ ] **LinkedIn company page** — Link to website, post first article
- [ ] **Client dashboard MVP** — Track application status per client
- [ ] **Deploy video recorded** — Screen recording of deploy flow

### Ongoing
- [ ] **Weekly**: run `hermes cron` for SEO monitoring
- [ ] **Bi-weekly**: publish 1 blog post in 4 locales
- [ ] **Monthly**: review analytics, adjust content strategy
- [ ] **Quarterly**: full SEO audit, content refresh

### Troubleshooting

| Issue | Fix |
|-------|-----|
| Messaging not replying | Check Evolution API is running: `docker ps | grep evolution`. Restart: `docker-compose restart evolution` |
| Deploy fails (build) | Check `NODE_AUTH_TOKEN` is set. `docker build --no-cache` if cache issues |
| Domain not resolving | Check Cloudflare A record. Check Traefik: `docker service logs nexa_traefik` |
| Blog post not appearing | Check `content/blog/posts.json` has the slug. Rebuild if needed |
| 404 on new page | Check `nexa-pages/{slug}.json` exists. Verify section IDs match registry |
