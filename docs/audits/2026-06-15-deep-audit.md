# Nexa Paraguay — Deep Audit Report
**Server:** 72.61.44.159 | **Repo:** /root/nexa-paraguay | **Date:** 2026-05-23

---

## SUMMARY
- **Total issues found: 46**
- Categories: Hardcoded Data, SEO, Components, Admin, Accessibility, Mobile, Code Quality, Config, Forms, Content

---

## 1. HARDCODED DATA

| AREA | ITEM | DETAIL | FILE:LINE | PRIORITY |
|------|------|--------|-----------|----------|
| Hardcoded | Phone | Client's personal phone `595982515138` hardcoded in WA button | `/components/MessagingButton.tsx:10` | HIGH |
| Hardcoded | Phone | Fallback phone `595982515138` hardcoded in booking embed | `src/components/BookingEmbedSection.tsx:20` | HIGH |
| Hardcoded | URL | `nexa.paragu-ai.com` hardcoded as base URL in sitemap | `src/app/sitemap.ts:6` | MEDIUM |
| Hardcoded | URL | `nexaparaguay.com` hardcoded as metadataBase | `src/app/layout.tsx:19` | MEDIUM |
| Hardcoded | URL | `nexa.paragu-ai.com` hardcoded in JSON-LD schema | `components/JsonLd.tsx:6` | MEDIUM |
| Hardcoded | URL | `nexa.paragu-ai.com` in public schema/organization.json | `public/schema/organization.json:5` | MEDIUM |
| Hardcoded | Phone | Secondary phone `+595 984 009751` in inline JSON-LD (different from main) | `src/app/layout.tsx:69` | HIGH |
| Hardcoded | Phone | `+595 982 515 138` appears in content JSONs (4 locales) | `content/{es,en,nl,de}.json` (multiple lines) | MEDIUM |
| Hardcoded | Placeholders | `[Nombre real pendiente]` and `[Testimonio real pendiente]` in testimonials | `testimonials.json:7-10` | HIGH |
| Hardcoded | Pricing | Old pricing `$2,900` in FAQ schema (resolved to $1,500 in docs) | `public/schema/faq.json:18` | HIGH |
| Hardcoded | Placeholder | `SITE_URL_PLACEHOLDER` still in robots.txt | `public/robots.txt:3` | CRITICAL |
| Hardcoded | Placeholder | `SITE_URL_PLACEHOLDER` still in static sitemap.xml | `public/sitemap.xml:4,9,14` | CRITICAL |
| Hardcoded | Env | `G-XE49GLEP34` GA4 ID hardcoded as fallback in layout | `src/app/layout.tsx:11` | LOW |
| Hardcoded | Env | `HS-PORTAL-PARAGUAI` HubSpot portal ID placeholder in contact route | `src/app/api/contact/route.ts:7` | MEDIUM |
| Hardcoded | Env | `audience-paragu-ai-newsletter` Mailchimp list placeholder | `src/app/api/subscribe/route.ts:20` | MEDIUM |
| Hardcoded | Env | `nexa-isr-secret-dev` dev secret in revalidate route | `src/app/api/revalidate/route.ts:8` | MEDIUM |
| Hardcoded | Env | `G-XE49GLEP34` fallback in docker-compose | `docker-compose.yml:8` | LOW |
| Hardcoded | GSC | `YOUR_GSC_VERIFICATION_CODE` placeholder | `src/app/layout.tsx:31` | MEDIUM |

## 2. SEO ISSUES

| AREA | ITEM | DETAIL | FILE:LINE | PRIORITY |
|------|------|--------|-----------|----------|
| SEO | robots.txt | Contains `SITE_URL_PLACEHOLDER` instead of real URL | `public/robots.txt:3` | CRITICAL |
| SEO | sitemap.xml | Static file with placeholder URLs — not using Next.js dynamic sitemap | `public/sitemap.xml` (entire file) | CRITICAL |
| SEO | Sitemap | Duplicate sitemap — static `public/sitemap.xml` AND dynamic `src/app/sitemap.ts` | Both files exist | HIGH |
| SEO | Canonical | Base URL `nexaparaguay.com` — but live site runs on `nexa.paragu-ai.com` | `src/app/layout.tsx:19,30` | HIGH |
| SEO | Canonical (blog) | Blog uses `nexaparaguay.com` canonical | `src/app/[locale]/blog/[slug]/page.tsx:36` | HIGH |
| SEO | OG image | References `/images/og-default.jpg` which doesn't exist (only .svg + .png) | `src/app/[locale]/[slug]/page.tsx:30` | MEDIUM |
| SEO | Meta desc | Default layout metadata is in Spanish only (not locale-aware) | `src/app/layout.tsx:14-18` | MEDIUM |
| SEO | hreflang | Missing `x-default` in alternate language declarations | Various pages | LOW |
| SEO | JSON-LD | Duplicate schema.org types in layout (both `ProfessionalService`) | `src/app/layout.tsx:41-51,63-74` | MEDIUM |
| SEO | JSON-LD | `components/JsonLd.tsx` renders a `LocalBusiness` schema — third schema.org type | `components/JsonLd.tsx:1-22` | MEDIUM |
| SEO | JSON-LD | Blog `Article` schema uses `mainEntityOfPage` (should be `mainEntityOfPage[@id]`) | `src/app/[locale]/blog/[slug]/page.tsx:73` | LOW |
| SEO | PWA manifest | References `icon-192.png` and `icon-512.png` that don't exist in public/ | `src/app/manifest.ts:13-14` | HIGH |
| SEO | manifest.json | `short_name` is "Nexa Paragua" — truncated/wrong | `src/app/manifest.ts:6` | MEDIUM |

## 3. COMPONENT ISSUES

| AREA | ITEM | DETAIL | FILE:LINE | PRIORITY |
|------|------|--------|-----------|----------|
| Components | `any` typing | ~50+ uses of `any` across component props (no TypeScript validation) | `src/components/*.tsx` (pervasive) | HIGH |
| Components | Missing state | ExitPopup has no error/loading state for email submission | `src/components/ExitPopup.tsx:25-36` | MEDIUM |
| Components | Missing state | BookingFormSection has no loading indicator during form submission | `src/components/BookingFormSection.tsx:43-52` | MEDIUM |
| Components | Missing state | FeedbackSection has no error state for failed submission | `src/components/FeedbackSection.tsx:19-33` | MEDIUM |
| Components | Empty alt | PageHeroSection bg image has `alt=""` — decorative but no aria role | `src/components/PageHeroSection.tsx:41` | LOW |
| Components | Header | Mobile menu button display uses `styled-jsx` which may not be available | `src/components/Header.tsx:101-106` | MEDIUM |
| Components | SectionsRenderer | Cast to `any` for Header and Footer in SectionsRenderer | `src/components/SectionsRenderer.tsx:16` | LOW |

## 4. ADMIN PANEL ISSUES

| AREA | ITEM | DETAIL | FILE:LINE | PRIORITY |
|------|------|--------|-----------|----------|
| Admin | No types | AdminGuard allows through without admin role check (commented out) | `src/components/AdminGuard.tsx:24` | HIGH |
| Admin | Duplicate auth | AdminLayout AND AdminGuard both check auth independently | `src/app/admin/layout.tsx` + `src/components/AdminGuard.tsx` | MEDIUM |
| Admin | No validation | Login page has no email/password format validation before submit | `src/app/login/page.tsx:17-30` | MEDIUM |
| Admin | Hardcoded stats | Dashboard shows hardcoded `{ pages: 12, blogs: 56, locales: 4 }` | `src/app/admin/page.tsx:12` | LOW |
| Admin | No input labels | Login form uses `placeholder` instead of `<label>` elements | `src/app/login/page.tsx:38-54` | MEDIUM |

## 5. ACCESSIBILITY ISSUES

| AREA | ITEM | DETAIL | FILE:LINE | PRIORITY |
|------|------|--------|-----------|----------|
| A11y | Missing labels | Booking form inputs have no `<label>` element association | `src/components/BookingFormSection.tsx:116-134` | HIGH |
| A11y | Missing labels | Login form uses placeholder-only, no `<label>` elements | `src/app/login/page.tsx:38-54` | HIGH |
| A11y | No keyboard nav | ExitPopup submit button not focusable via keyboard (no aria attributes) | `src/components/ExitPopup.tsx:48-53` | MEDIUM |
| A11y | No keyboard nav | FAQ accordion items are `<button>` elements but no `aria-expanded` | `src/components/FaqSection.tsx:136-146` | MEDIUM |
| A11y | Missing role | CookieBanner buttons missing `aria-label` | `src/components/CookieBanner.tsx:36-37` | LOW |
| A11y | No focus trap | ExitPopup and GatewayPopup have no focus trap when open | `src/components/ExitPopup.tsx:41` / `src/components/GatewayPopup.tsx:18` | MEDIUM |

## 6. CODE QUALITY

| AREA | ITEM | DETAIL | FILE:LINE | PRIORITY |
|------|------|--------|-----------|----------|
| Code | console.log | 7 console.log statements in production API routes | Multiple API route files | MEDIUM |
| Code | TODO | Unresolved TODO about publishing @ai-whisperers/content | `src/lib/content-resolver.ts:5` | LOW |
| Code | Dead code | `src/proxy.ts` — locale redirect middleware (not imported anywhere) | `src/proxy.ts` | LOW |
| Code | Duplicated logic | Multiple loaders: `loader.ts`, `page-data.ts`, `content-resolver.ts`, `tenant-loader.ts` | `src/lib/` directory | MEDIUM |
| Code | `@ts-nocheck` | Entire tenant-loader.ts has `@ts-nocheck` | `src/lib/tenant-loader.ts:1` | HIGH |
| Code | Empty catch | Multiple `catch {}` blocks silently swallowing errors | Various components | MEDIUM |
| Code | require() in ESM | `tenant-loader.ts` uses `require()` inside TypeScript ESM file | `src/lib/tenant-loader.ts:6-7` | HIGH |

## 7. CONFIG & DEPLOYMENT

| AREA | ITEM | DETAIL | FILE:LINE | PRIORITY |
|------|------|--------|-----------|----------|
| Config | .env.local | Empty Supabase keys — will run entirely file-based | `.env.local` (entire file) | HIGH |
| Config | .env.example | Contains `<placeholder>` markers — OK but important to note | `.env.example` (entire file) | LOW |
| Config | Missing CSP | CSP allows `unsafe-eval` and `unsafe-inline` in script-src | `next.config.js:10` | MEDIUM |
| Config | Deployment gap | `deploy.sh` builds on server directly (no CI/CD isolation) | `deploy.sh` | MEDIUM |

## 8. FORMS

| AREA | ITEM | DETAIL | FILE:LINE | PRIORITY |
|------|------|--------|-----------|----------|
| Forms | No validation | Booking form has no email format validation (just `required` attr) | `src/components/BookingFormSection.tsx:122-123` | MEDIUM |
| Forms | No validation | Contact API has no server-side field validation | `src/app/api/contact/route.ts:34-35` | MEDIUM |
| Forms | No honeypot | No spam protection (honeypot field) on any form | All form components | LOW |
| Forms | No CSRF | No CSRF token on any form submission | All form components | LOW |

## 9. MOBILE

| AREA | ITEM | DETAIL | FILE:LINE | PRIORITY |
|------|------|--------|-----------|----------|
| Mobile | Header | Mobile hamburger menu uses `styled-jsx` — may not render in all environments | `src/components/Header.tsx:101-106` | MEDIUM |
| Mobile | WA button | Fixed bottom-right Messaging button overlaps with mobile content | `components/MessagingButton.tsx:23-24` | LOW |
| Mobile | Touch targets | FAQ filter buttons have small touch targets (< 44px) on mobile | `src/components/FaqSection.tsx:100-114` | LOW |

---

## TOTALS BY PRIORITY

| Priority | Count |
|----------|-------|
| CRITICAL | 4 |
| HIGH | 15 |
| MEDIUM | 22 |
| LOW | 5 |
| **TOTAL** | **46** |

## TOTALS BY AREA

| Area | Count |
|------|-------|
| Hardcoded Data | 18 |
| SEO | 11 |
| Components | 6 |
| Admin | 5 |
| Accessibility | 6 |
| Code Quality | 7 |
| Config/Deploy | 4 |
| Forms | 4 |
| Mobile | 3 |

---

## TOP 5 CRITICAL/HIGH ISSUES

1. **CRITICAL** — `public/robots.txt` has `SITE_URL_PLACEHOLDER` — search engines cannot find real sitemap
2. **CRITICAL** — `public/sitemap.xml` has placeholder URLs — static file should be deleted (dynamic sitemap exists)
3. **CRITICAL** — PWA manifest references non-existent icon files `icon-192.png` and `icon-512.png`
4. **HIGH** — Client's personal phone `595982515138` hardcoded in multiple places (privacy risk, hard to update)
5. **HIGH** — Testimonials contain placeholder data `[Nombre real pendiente]` being served on live site
