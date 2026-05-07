# Nexa Paraguay — Complete Implementation Plan

> Master todo list for taking nexa.paragu-ai.com from 2/10 to production-ready.
> Every item is concrete, estimated, and actionable.

---

## TIER SYSTEM

| Icon | Meaning |
|------|---------|
| 🔴 **P0** | Blocks launch — conversion killer, legal risk, or 404 |
| 🟠 **P1** | High impact — trust/corversion damage if missing |
| 🟡 **P2** | Should do — quality polish, SEO, UX |
| ⚪ **P3** | Nice to have — deferrable |

---

# SECTION 1: RENDER EXISTING CONTENT (no client input needed)

These items unlock content that already exists in `es.json` but doesn't render because components are missing.

## 1.1 New section components to build

### FaqSection — /faq page
- [ ] 🟠 **P1** Create `src/sections/FaqSection.tsx` — accordion component
- [ ] 🟠 Render `faqPage.full.items` (15 Q&A pairs)
- [ ] 🟠 Add open/close toggle, keyboard navigation, smooth height animation
- [ ] 🟡 Add structured data `FAQPage` JSON-LD
- [ ] 🟠 Add to SECTION_MAP in `[slug].tsx` and `index.tsx`

### BlogSection — /blog page
- [ ] 🟠 **P1** Create `src/sections/BlogSection.tsx` — blog post grid
- [ ] 🟠 Render `blog.posts` (6 posts with title, date, excerpt, image)
- [ ] 🟠 Each post card links to `/blog/[slug]`
- [ ] 🟡 Add pagination or "Ver más" CTA
- [ ] 🟠 Add to SECTION_MAP

### BlogPostSection — individual blog post pages
- [ ] 🟡 **P2** Create individual blog post rendering
- [ ] 🟡 Each `blog.posts[i]` renders as standalone page at `/blog/[slug]`
- [ ] 🟡 Author, date, category, tags, share buttons
- [ ] 🟡 Related posts at bottom
- [ ] 🟡 Add `BlogPosting` structured data

### TeamSection — /sobre team section
- [ ] 🟠 **P1** Create `src/sections/TeamSection.tsx` — team member cards
- [ ] 🟠 Render `aboutPage.team.members` (5 members with name, role, description, image)
- [ ] 🟠 Resolve `memberImage` through images manifest (currently broken 404)
- [ ] 🟠 Grid layout with photo + name + role + description
- [ ] 🟡 Add LinkedIn links when available
- [ ] 🟠 Add to SECTION_MAP

### PrivacyAccordion — /privacidad page
- [ ] 🟠 **P1** Create `src/sections/PrivacyAccordion.tsx`
- [ ] 🟠 Render `privacyPage.body.items` (5 GDPR/policy items)
- [ ] 🟠 Accordion with open/close
- [ ] 🟠 Add to SECTION_MAP and `privacidad` page config

### GlossarySection — /glosario page
- [ ] 🟡 **P2** Create `src/sections/GlossarySection.tsx`
- [ ] 🟡 Render `glossaryPage.glossary.items` (7 terms)
- [ ] 🟡 Card grid with term + definition
- [ ] 🟡 Add A-Z filter or search
- [ ] 🟡 Add to SECTION_MAP

### GuidesSection — /recursos page
- [ ] 🟡 **P2** Create `src/sections/GuidesSection.tsx`
- [ ] 🟡 Render `resourcesPage.guides` with download CTAs
- [ ] 🟡 Add actual PDF files (currently 404 on download links)
- [ ] 🟡 Add to SECTION_MAP

### PillarsSection — /por-que-paraguay, /calidad-de-vida, etc.
- [ ] 🟠 **P1** Create `src/sections/PillarsSection.tsx` — generic pillar grid
- [ ] 🟠 Render any `*.pillars` array with title, description, image, bullets
- [ ] 🟠 Resolve `imageUrl` through images manifest
- [ ] 🟠 Used by: whyCountryPage (9 pillars), qualityOfLifePage (4 pillars), aboutPage.whyNexa (7 pillars)
- [ ] 🟠 Add to SECTION_MAP

### ProcessTimeline — /proceso and landing pages
- [ ] 🟡 **P2** Create `src/sections/ProcessTimeline.tsx` — visual timeline
- [ ] 🟡 Render `*.process.steps` with images, duration, description
- [ ] 🟡 Used by: /proceso, all landing pages (inversor, trust, lifestyle, empresa)
- [ ] 🟡 Add to SECTION_MAP

### WizardSection — /asistente (intake wizard)
- [ ] ⚪ **P3** Build interactive intake questionnaire
- [ ] ⚪ Multi-step form: country, income, objectives, timeline
- [ ] ⚪ Program recommendation logic based on answers
- [ ] ⚪ Lead capture at end

### ComparisonSection — /comparacion page
- [ ] ⚪ **P3** Build country comparison table
- [ ] ⚪ Render `comparisonPage.matrix` (tax rates, cost of living, quality of life)
- [ ] ⚪ PY vs UY vs PA vs EU comparison

## 1.2 Fix image resolution in generic renderer
- [ ] 🟠 **P1** `[slug].tsx` fallback already resolves `memberImage` and `imageUrl` through `resolveImage(images, ref)`
- [ ] 🟠 Verify ALL `@src:` and `@img:` references in content are resolved, not used as raw URLs
- [ ] 🟠 Check all slug pages for remaining raw `@src:` strings in HTML

## 1.3 Update page configs to use new components
- [ ] 🟠 **P1** Update `nexa-pages/faq.json` — use `faq` section component
- [ ] 🟠 **P1** Update `nexa-pages/blog.json` — use `blog-index` section component
- [ ] 🟠 **P1** Update `nexa-pages/privacidad.json` — use `privacy-accordion` section component
- [ ] 🟠 **P1** Update `nexa-pages/sobre.json` — use `team` and `story` section components
- [ ] 🟠 **P1** Update `nexa-pages/por-que-paraguay.json` — add pillar, trust, faq, cta sections
- [ ] 🟡 **P2** Update `nexa-pages/calidad-de-vida.json` — add pillar, comparison, cta sections
- [ ] 🟡 **P2** Update `nexa-pages/comparacion.json` — add comparison, cta sections
- [ ] 🟡 **P2** Update `nexa-pages/glosario.json` — add glossary section
- [ ] 🟡 **P2** Update `nexa-pages/recursos.json` — add guides section
- [ ] 🟡 **P2** Update `nexa-pages/fundador.json` — add team section
- [ ] 🟡 **P2** Update `nexa-pages/proceso.json` — ensure process timeline + highlights + faq + cta
- [ ] 🟡 **P2** Update `nexa-pages/contacto.json` — add booking + contact details + map placeholder
- [ ] 🟡 **P2** Update `nexa-pages/prensa.json` — add press list section

---

# SECTION 2: REPLACE PLACEHOLDER CONTENT (needs client input)

## 2.1 Stats numbers — HOME / stats section
- [ ] 🔴 **P0** `"+500 Familias reubicadas"` → Get real number or change to `"+100 familias confían en nosotros"`
- [ ] 🔴 **P0** `"+10 Años de experiencia"` → Get real years or change to honest timeframe
- [ ] 🔴 **P0** `"98% Tasa de éxito"` → Get real NPS/CSAT or remove entirely
- [ ] 🟠 **P1** Stat icons — currently using Lucide icon names (Package, Plane, Users, Shield) that map to first-letter fallback. Wire up actual icon rendering or replace with brand-aligned SVGs

## 2.2 Team — /sobre and /fundador
- [ ] 🔴 **P0** Replace 5 role titles with real names
- [ ] 🔴 **P0** Replace AI-generated placeholder headshots with real photos
- [ ] 🔴 **P0** Add credentials: bar numbers (abogados), CPA registration (contadores)
- [ ] 🟠 **P1** Add LinkedIn profile URLs for each team member
- [ ] 🟠 **P1** Add brief bio (2-3 sentences each with relevant experience years)
- [ ] 🟡 **P2** Group photo for team page

## 2.3 Pricing — /programas and home
- [ ] 🔴 **P0** Paraguay Base: `USD 2.900` → Confirm retail price or change to `Consultar`
- [ ] 🔴 **P0** Paraguay Business: `USD 4.400+` → Confirm retail price
- [ ] 🔴 **P0** Paraguay Investor: `USD 6.900+` → Confirm retail price
- [ ] 🟠 **P1** Compra de Tierras: `Consultar` → Add price range or remove tier
- [ ] 🟠 **P1** Price note semantics: "Honorarios, IVA y tasas incluidas" — legal review needed
- [ ] 🟡 **P2** Add currency toggle USD/EUR for European prospects

## 2.4 Testimonials — / and /casos-de-exito
- [ ] 🔴 **P0** Replace 5 AI-generated portrait photos with nothing (quote-only) OR real photos with GDPR consent
- [ ] 🔴 **P0** Replace generic names (J. van der L., M. S., C. R.) with real client names OR keep anonymized with country only
- [ ] 🟠 **P1** Add verification badge or note for each testimonial
- [ ] 🟡 **P2** Add video testimonial slots (poster frames ready, videoUrl empty)
- [ ] 🟡 **P2** Collect 3-5 real client testimonials post-launch

## 2.5 Content claims
- [ ] 🔴 **P0** "Más de 200 familias neerlandesas y belgas" in Benelux section — confirm or remove
- [ ] 🟠 **P1** "Nueve servicios, un equipo" — verify all 9 services are actually offered
- [ ] 🟠 **P1** "8–12 semanas" process timeline — confirm this is the real range

---

# SECTION 3: CONVERSION PATH

## 3.1 Calendly / Booking
- [ ] 🔴 **P0** Create Calendly account under `hola@nexaparaguay.com`
- [ ] 🔴 **P0** Create event "Consulta gratuita 30 min" with slug `/consulta`
- [ ] 🔴 **P0** Update `site.json` `bookingUrl` with real URL
- [ ] 🟠 **P1** Add Calendly embed widget on /contacto (inline calendar, no redirect)
- [ ] 🔴 **P0** If Calendly can't be set up: replace ALL booking CTAs with WhatsApp deep links

## 3.2 WhatsApp
- [ ] 🔴 **P0** Confirm `595982515138` is the real monitored number
- [ ] 🟠 **P1** Add WhatsApp Business profile with business name, hours, greeting
- [ ] 🟡 **P2** Add WhatsApp click-to-chat floating button on ALL pages (currently only on pages with `whatsapp-float` section)
- [ ] 🟡 **P2** Pre-filled message per page context (home, programas, proceso, contacto)

## 3.3 Contact form
- [ ] 🔴 **P0** Build working contact form on /contacto (name, email, phone, country, program interest, message)
- [ ] 🔴 **P0** Form submits to Supabase `leads` table (backend exists at `paragu-ai-builder`)
- [ ] 🟠 **P1** Add HubSpot form submission as secondary (env vars needed)
- [ ] 🟠 **P1** Add reCAPTCHA or honeypot for spam prevention
- [ ] 🟠 **P1** Success/error states with user feedback
- [ ] 🟡 **P2** Add form analytics (submission rate, field abandonment)

## 3.4 Lead capture
- [ ] 🟠 **P1** Add newsletter signup form on /blog, /recursos, footer
- [ ] 🟠 **P1** Sync to Mailchimp list (env vars needed: `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`)
- [ ] 🟡 **P2** Downloadable lead magnet → email capture (tax guide PDF, checklist PDF)

---

# SECTION 4: TRUST & CREDIBILITY

## 4.1 Legal pages
- [ ] 🔴 **P0** Privacy policy: attorney review of current 10-item accordion
- [ ] 🔴 **P0** Terms of service: create with attorney (not currently linked)
- [ ] 🔴 **P0** SEPRELAD / AML compliance determination
- [ ] 🟠 **P1** Cookie consent banner with granular preferences
- [ ] 🟠 **P1** Legal entity info in footer (RUC, registered address, jurisdiction)
- [ ] 🟡 **P2** GDPR data processing agreement if handling EU client data

## 4.2 Contact info
- [ ] 🔴 **P0** Physical address in Asunción (street, building, neighborhood)
- [ ] 🟠 **P1** Google Maps embed or link
- [ ] 🟠 **P1** Office hours (PY timezone)
- [ ] 🟡 **P2** Additional contact methods: Telegram, Signal

## 4.3 Social proof
- [ ] 🟠 **P1** LinkedIn company page: `linkedin.com/company/nexa-paraguay` — confirm exists
- [ ] 🟠 **P1** Instagram: `instagram.com/nexaparaguay` — confirm exists
- [ ] 🟠 **P1** Link these in footer + contact page (currently no visible social links)
- [ ] 🟡 **P2** Add client logos or partner logos (if any)
- [ ] 🟡 **P2** Add press mentions or media appearances

## 4.4 Office photos
- [ ] 🟡 **P2** Add real office photos from `images/office/` (exterior, reception, meeting room, signing area)
- [ ] 🟡 **P2** Add to /sobre gallery section (content exists at `aboutPage.gallery` with 6 images)

---

# SECTION 5: SEO

## 5.1 Meta tags — every page
- [ ] 🟠 **P1** `/` — title: `Nexa Paraguay — Mudanza y Residencia en Paraguay | Asesoría Profesional`
- [ ] 🟠 **P1** `/` — meta desc: `Residencia permanente, sociedad y cuenta bancaria en Paraguay. Programa completo desde USD 2.900. Equipo profesional en Asunción. Consulta gratuita.`
- [ ] 🟠 **P1** `/programas` — title: `Programas de Residencia en Paraguay | Nexa Paraguay`
- [ ] 🟠 **P1** `/programas` — meta desc: `4 programas para establecerse en Paraguay: Base, Business, Investor y Compra de Tierras. Precios transparentes, acompañamiento profesional.`
- [ ] 🟠 **P1** `/servicios` — title: `Servicios de Relocalización en Paraguay | Nexa Paraguay`
- [ ] 🟠 **P1** `/servicios` — meta desc: `Residencia, cédula, sociedad, cuenta bancaria, RUC y bienes raíces. Servicios integrales para tu mudanza a Paraguay.`
- [ ] 🟠 **P1** `/sobre` — title: `Sobre Nexa Paraguay | Nuestro Equipo y Experiencia`
- [ ] 🟠 **P1** `/sobre` — meta desc: `Conocé al equipo de Nexa Paraguay. Abogados, contadores y asesores con experiencia en relocalización internacional.`
- [ ] 🟠 **P1** `/faq` — title: `Preguntas Frecuentes sobre Residencia en Paraguay | Nexa Paraguay`
- [ ] 🟠 **P1** `/faq` — meta desc: `Respuestas a tus preguntas sobre residencia paraguaya, impuestos, proceso, bancos y más. Consulta gratuita.`
- [ ] 🟠 **P1** `/contacto` — title: `Contacto | Nexa Paraguay — Consulta Gratuita`
- [ ] 🟠 **P1** `/contacto` — meta desc: `Agendá una consulta gratuita de 30 minutos con nuestro equipo. Residencia, sociedad y banca en Paraguay.`
- [ ] 🟠 **P1** `/por-que-paraguay` — title: `Por Qué Paraguay | Beneficios Fiscales y Calidad de Vida`
- [ ] 🟠 **P1** `/por-que-paraguay` — meta desc: `10% IRE, sistema territorial, costo de vida bajo. Por qué europeos eligen Paraguay para residencia fiscal.`
- [ ] 🟠 **P1** `/benelux` — title: `Benelux Desk | Nexa Paraguay — Atención en Neerlandés`
- [ ] 🟠 **P1** `/benelux` — meta desc: `Servicio de relocalización a Paraguay para neerlandeses, belgas y luxemburgueses. Atención en tu idioma.`
- [ ] 🟠 **P1** `/blog` — title: `Blog sobre Residencia e Inversión en Paraguay | Nexa Paraguay`
- [ ] 🟠 **P1** `/blog` — meta desc: `Guías, análisis y consejos sobre residencia, empresa e inversión en Paraguay. Actualizado mensualmente.`
- [ ] 🟠 **P1** `/privacidad` — title: `Política de Privacidad | Nexa Paraguay`
- [ ] 🟠 **P1** `/recursos` — title: `Recursos y Guías para Mudarse a Paraguay | Nexa Paraguay`
- [ ] 🟠 **P1** `/glosario` — title: `Glosario de Residencia e Impuestos en Paraguay | Nexa Paraguay`
- [ ] 🟠 **P1** `/fundador` — title: `Fundador de Nexa Paraguay | Nuestra Historia`
- [ ] 🟠 **P1** `/prensa` — title: `Sala de Prensa | Nexa Paraguay — Comunicados y Medios`
- [ ] 🟠 **P1** `/calidad-de-vida` — title: `Calidad de Vida en Paraguay | Costo, Clima y Seguridad`
- [ ] 🟠 **P1** `/comparacion` — title: `Paraguay vs Uruguay vs Panamá | Comparativa para Inversores`
- [ ] 🟠 **P1** `/casos-de-exito` — title: `Casos de Éxito | Clientes de Nexa Paraguay`
- [ ] 🟠 **P1** `/inversor` — title: `Programa Inversor Paraguay | Nexa Paraguay`
- [ ] 🟠 **P1** `/empresa` — title: `Programa Business Paraguay | Nexa Paraguay`
- [ ] 🟠 **P1** `/lifestyle` — title: `Estilo de Vida en Paraguay | Nexa Paraguay`
- [ ] 🟠 **P1** `/trust` — title: `Confianza y Transparencia | Nexa Paraguay`
- [ ] 🟠 **P1** `/asistente` — title: `Asistente de Relocalización | Encontrá tu Programa Ideal`

## 5.2 Structured data
- [ ] 🟠 **P1** Add `Organization` JSON-LD (name, logo, url, contact, address, sameAs)
- [ ] 🟡 **P2** Add `LocalBusiness` JSON-LD (address in Asunción, opening hours, phone)
- [ ] 🟠 **P1** Add `FAQPage` JSON-LD on /faq
- [ ] 🟡 **P2** Add `Product` JSON-LD for each program tier
- [ ] 🟡 **P2** Add `BlogPosting` JSON-LD for each blog post
- [ ] 🟡 **P2** Add `BreadcrumbList` JSON-LD on all pages

## 5.3 Technical SEO
- [ ] 🟠 **P1** Add sitemap.xml generator (one entry per page per locale)
- [ ] 🟠 **P1** Add robots.txt (allow all, point to sitemap)
- [ ] 🟠 **P1** Add canonical URLs on all pages
- [ ] 🟠 **P1** Add hreflang tags for multi-locale (once locales are live)
- [ ] 🟡 **P2** Add Open Graph images (og:image from brand assets)
- [ ] 🟡 **P2** Add Twitter card meta tags
- [ ] 🟡 **P2** Add structured data validation with Schema.org validator

---

# SECTION 6: ANALYTICS & MONITORING

## 6.1 GA4
- [ ] 🟠 **P1** Verify `G-XE49GLEP34` is the correct measurement ID
- [ ] 🟠 **P1** Add GA4 script loading with GDPR consent gating
- [ ] 🟠 **P1** Configure conversion events:
  - [ ] `book_consultation_click` — when Calendly/WhatsApp CTA clicked
  - [ ] `lead_submit` — when contact form submitted
  - [ ] `program_tier_click` — when program tier CTA clicked
  - [ ] `whatsapp_cta_click` — when WhatsApp button clicked
  - [ ] `newsletter_signup` — when newsletter form submitted
- [ ] 🟡 **P2** Add scroll depth tracking (25%, 50%, 75%, 100%)
- [ ] 🟡 **P2** Add page view tracking per locale

## 6.2 Conversion tracking
- [ ] 🟡 **P2** Add Calendly event tracking (booking completed)
- [ ] 🟡 **P2** Add form abandonment tracking
- [ ] 🟡 **P2** Add click-to-call tracking
- [ ] 🟡 **P2** Add UTM parameter persistence through funnel

## 6.3 Error monitoring
- [ ] 🟡 **P2** Add console error logging (currently 0 JS errors)
- [ ] 🟡 **P2** Add 404 page tracking
- [ ] 🟡 **P2** Add performance monitoring (LCP, CLS, INP)

---

# SECTION 7: MULTI-LANGUAGE

## 7.1 Locale routing
- [ ] 🟠 **P1** Add `/en/`, `/nl/`, `/de/` URL prefix routing
- [ ] 🟠 **P1** Language switcher in header navigates to same page in different locale
- [ ] 🟡 **P2** Browser language auto-detection on first visit
- [ ] 🟡 **P2** Locale cookie persistence

## 7.2 Content parity
- [ ] 🟡 **P2** Translate blog posts to EN (6 posts)
- [ ] 🟡 **P2** Translate blog posts to NL (top 3 posts)
- [ ] 🟡 **P2** Translate blog posts to DE (top 2 posts)
- [ ] 🟡 **P2** Translate program descriptions to all 4 locales
- [ ] 🟡 **P2** Translate FAQ to all 4 locales
- [ ] 🟡 **P2** Native-speaker review of NL and DE content
- [ ] 🟡 **P2** Professional German translation for DE locale (currently flagged as machine quality)

## 7.3 Per-locale pages
- [ ] 🟡 **P2** Homepage translated to 4 locales
- [ ] 🟡 **P2** /programas translated to 4 locales
- [ ] 🟡 **P2** /faq translated to 4 locales
- [ ] 🟡 **P2** /contacto translated to 4 locales
- [ ] 🟡 **P2** Remaining pages translated to top 3 locales (EN, NL, ES)

---

# SECTION 8: DESIGN & UX POLISH

## 8.1 Layout
- [ ] 🟡 **P2** Mobile responsive: test all pages at 375px, 768px, 1024px, 1440px
- [ ] 🟡 **P2** Hero section: ensure background image renders (currently uses gradient fallback)
- [ ] 🟡 **P2** Program tier cards: ensure images render (they do on home but check slug pages)
- [ ] 🟡 **P2** Ensure process step images render (they do on home but check /proceso)
- [ ] 🟡 **P2** Sticky header behavior on mobile (hamburger menu currently hidden via `display: none`)
- [ ] 🟠 **P1** Enable mobile hamburger menu for nav items

## 8.2 Typography
- [ ] 🟡 **P2** Ensure Google Fonts (Playfair Display, Inter) load correctly
- [ ] 🟡 **P2** Font sizing consistency across pages (headings, body, captions)
- [ ] 🟡 **P2** Line height and spacing polish

## 8.3 Spacing & rhythm
- [ ] 🟡 **P2** Consistent section padding across all pages
- [ ] 🟡 **P2** Consistent card padding and border radius
- [ ] 🟡 **P2** Consistent CTA button styling (border-radius, padding, hover states)

## 8.4 Color consistency
- [ ] 🟡 **P2** Verify all sections use CSS variables or consistent hex values
- [ ] 🟡 **P2** Check contrast ratios for accessibility (WCAG AA minimum)
- [ ] 🟡 **P2** Dark mode consideration (footer is dark, header is white — lack of visual hierarchy)

---

# SECTION 9: PERFORMANCE

## 9.1 Images
- [ ] 🟡 **P2** Verify all WebP images are served with correct content-type
- [ ] 🟡 **P2** Add lazy loading for below-fold images
- [ ] 🟡 **P2** Add responsive image srcset for hero background images (480, 960, 1920 widths)
- [ ] 🟡 **P2** Compress large PNG files (logo-dark.png is 893KB, logo.png is 128KB — too large)

## 9.2 Loading
- [ ] 🟡 **P2** Server response time: currently ~350ms — acceptable for Paraguay
- [ ] 🟡 **P2** First Contentful Paint optimization
- [ ] 🟡 **P2** Add loading skeleton/spinner for server-rendered pages
- [ ] 🟡 **P2** Enable HTTP/2 on Traefik (check configuration)

## 9.3 Bundling
- [ ] 🟡 **P2** Check JS bundle size (Next.js default analysis)
- [ ] 🟡 **P2** Code-split large sections (tax calculator, wizard)
- [ ] 🟡 **P2** Tree-shake unused dependencies

---

# SECTION 10: INFRASTRUCTURE & DEPLOYMENT

## 10.1 Docker
- [ ] 🟡 **P2** Add health check endpoint to Dockerfile
- [ ] 🟡 **P2** Add proper restart policy (current: none — container not restarting on crash)
- [ ] 🟡 **P2** Add log rotation for Docker logs
- [ ] 🟡 **P2** Pin Node.js version in Dockerfile (currently `node:20-alpine` — minor version unspecified)

## 10.2 CI/CD
- [ ] 🟡 **P2** Add GitHub Actions workflow for auto-deploy on push to main
- [ ] 🟡 **P2** Add PR preview deployments
- [ ] 🟡 **P2** Add build validation (TypeScript check, lint)
- [ ] 🟡 **P2** Add Docker image build caching

## 10.3 Monitoring
- [ ] 🟡 **P2** Add uptime monitoring (Uptime Robot, Better Uptime, or similar)
- [ ] 🟡 **P2** Add error alerting (email/Slack on 5xx)
- [ ] 🟡 **P2** Add container restart alerting
- [ ] 🟡 **P2** Add disk/memory/CPU monitoring for VPS

## 10.4 Security
- [ ] 🟠 **P1** Add Content Security Policy headers via Traefik
- [ ] 🟠 **P1** Add rate limiting on contact form endpoints
- [ ] 🟡 **P2** Enable HTTPS redirect (Traefik config — verify it's on)
- [ ] 🟡 **P2** Add security headers (X-Frame-Options, X-Content-Type-Options, etc.)

---

# SECTION 11: CONTENT CREATION (new content)

## 11.1 Blog posts — write by hand
- [ ] 🔴 **P0** 6 existing posts need to render (blocked by BlogSection component — Phase 1)
- [ ] 🟠 **P1** Post 1: "Guía Completa: Cómo Obtener la Residencia en Paraguay en 2024" — render from existing content
- [ ] 🟠 **P1** Post 2: "Comprar Propiedades en Paraguay para Extranjeros" — render from existing content
- [ ] 🟠 **P1** Post 3: "Apertura de Cuenta Bancaria en Paraguay" — render from existing content
- [ ] 🟠 **P1** Post 4: "Emprender en Paraguay: Oportunidades 2024" — render from existing content
- [ ] 🟠 **P1** Post 5: "Los 5 Errores Más Comunes al Mudarte a Paraguay" — render from existing content
- [ ] 🟠 **P1** Post 6: "SEPRELAD y Compliance para Inversores" — render from existing content
- [ ] 🟡 **P2** Blog post cover images (exist at `images/blog/` — wire up)
- [ ] 🟡 **P2** Add 2-3 new posts per month post-launch

## 11.2 Downloadable resources
- [ ] 🟡 **P2** Create "Checklist de Documentos para Residencia" PDF
- [ ] 🟡 **P2** Create "Guía Fiscal Paraguay 2026" PDF
- [ ] 🟡 **P2** Create "Guía del Inversor" PDF (QA format)
- [ ] 🟡 **P2** Host on /recursos with download links

## 11.3 Landing pages (content exists, needs sections)
- [ ] 🟡 **P2** /inversor — Investor program landing with process, trust, CTA
- [ ] 🟡 **P2** /empresa — Business program landing
- [ ] 🟡 **P2** /lifestyle — Lifestyle landing
- [ ] 🟡 **P2** /trust — Trust/credentials landing

---

# SECTION 12: BRAND & VISUAL IDENTITY

## 12.1 Logo
- [ ] 🟡 **P2** SVG logo is AI-generated. Commission a professional designer for:
  - [ ] Primary logo (horizontal, full color)
  - [ ] Icon mark (standalone, for favicon/profile pictures)
  - [ ] Monochrome version (for dark backgrounds)
  - [ ] Favicon set (.ico, .svg, 16px, 32px, 48px, 180px apple-touch-icon)
  - [ ] OG image (1200x630)
  - [ ] Social media profile pictures (square)
- [ ] 🟡 **P2** Define typography scale and usage rules (Playfair Display for headings, Inter for body)

## 12.2 Brand guidelines
- [ ] ⚪ **P3** Create simple brand guide (1 page):
  - [ ] Logo usage (clear space, minimum size, incorrect uses)
  - [ ] Color palette with hex values and usage rules
  - [ ] Typography with font sizes and weights
  - [ ] Tone of voice per locale
  - [ ] Image style guidelines

---

# SECTION 13: LEGAL & COMPLIANCE

## 13.1 Privacy & data
- [ ] 🔴 **P0** Attorney review of privacy policy
- [ ] 🔴 **P0** Terms of service drafted and linked
- [ ] 🔴 **P0** SEPRELAD/AML compliance determination
- [ ] 🟠 **P1** GDPR consent forms for client testimonials
- [ ] 🟠 **P1** Data retention and deletion policy
- [ ] 🟡 **P2** Cookie policy with granular controls

## 13.2 Disclaimers
- [ ] 🟠 **P1** Tax calculator disclaimer: "Los cálculos mostrados son estimativos. Consulte a su asesor fiscal."
- [ ] 🟠 **P1** Testimonial disclaimer: "Los resultados varían según cada caso."
- [ ] 🟠 **P1** Pricing disclaimer: "Precios sujetos a cambio sin previo aviso. IVA 10% incluido."
- [ ] 🟡 **P2** Investment disclaimer: "No constituye asesoría de inversión."

---

# SUMMARY STATS

| Category | 🔴 P0 | 🟠 P1 | 🟡 P2 | ⚪ P3 | Total |
|----------|-------|-------|-------|-------|-------|
| 1. Render existing content | 0 | 11 | 8 | 2 | **21** |
| 2. Replace placeholders | 10 | 5 | 3 | 0 | **18** |
| 3. Conversion path | 6 | 6 | 2 | 0 | **14** |
| 4. Trust & credibility | 6 | 7 | 4 | 0 | **17** |
| 5. SEO | 0 | 24 | 12 | 0 | **36** |
| 6. Analytics | 0 | 3 | 5 | 0 | **8** |
| 7. Multi-language | 0 | 2 | 10 | 0 | **12** |
| 8. Design & UX | 1 | 1 | 12 | 0 | **14** |
| 9. Performance | 0 | 0 | 10 | 0 | **10** |
| 10. Infra & deploy | 0 | 2 | 9 | 0 | **11** |
| 11. Content creation | 1 | 6 | 4 | 0 | **11** |
| 12. Brand & visual | 0 | 0 | 2 | 1 | **3** |
| 13. Legal & compliance | 4 | 3 | 1 | 0 | **8** |
| **Total** | **28** | **70** | **82** | **3** | **183** |
