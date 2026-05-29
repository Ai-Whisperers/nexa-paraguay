# Nexa Paraguay — Complete Interaction Inventory & QA Checklist

Generated: 2026-05-28T23:53:21.111322Z

## 1) Global interactive behavior (applies site-wide)
1. Header: locale switch, navigation links, CTA click, mobile menu toggle.
2. Footer: locale-preserving internal links, legal links, gateway reset link.
3. Cookie consent: accept/reject persistence.
4. Exit popup: conditional display + submit/dismiss interactions.
5. Share buttons (where present): opens WhatsApp/X/LinkedIn/Facebook share windows.

## 2) API interactions triggered by UI
- ExitPopupWrapper fetches GET /api/content?locale={locale}&key=exitPopup
- ExitPopup submits POST /api/contact
- FeedbackSection submits POST /api/contact
- BookingFormSection submits POST /api/contact
- IntakeWizard submits POST /api/intake

## 3) Route-by-route interaction inventory (31 slugs × 4 locales)

| Slug | Localized URLs | Interactive section IDs present | User interactions to test | API side effects |
|---|---|---|---|---|
| `agenda` | /es/agenda<br>/en/agenda<br>/nl/agenda<br>/de/agenda | booking-form, highlights | - Select program<br>- Next/back steps<br>- Submit form | - POST /api/contact |
| `asistente` | /es/asistente<br>/en/asistente<br>/nl/asistente<br>/de/asistente | header, hero, intake-wizard, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `benelux` | /es/benelux<br>/en/benelux<br>/nl/benelux<br>/de/benelux | header, hero, trust-signals, why-destination, faq, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Type in FAQ search<br>- Clear search<br>- Expand/collapse question<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `blog` | /es/blog<br>/en/blog<br>/nl/blog<br>/de/blog | header, hero, blog-index, newsletter-signup, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Filter by category<br>- Paginate prev/next<br>- Open article<br>- Fill email (if rendered)<br>- Submit signup<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | - POST /api/contact (if wired in page variant) |
| `calidad-de-vida` | /es/calidad-de-vida<br>/en/calidad-de-vida<br>/nl/calidad-de-vida<br>/de/calidad-de-vida | header, hero, pillars, comparison-table, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `casos-de-exito` | /es/casos-de-exito<br>/en/casos-de-exito<br>/nl/casos-de-exito<br>/de/casos-de-exito | page-hero, case-studies, cta-banner | - Click CTA<br>- Click CTA button | — |
| `comparacion` | /es/comparacion<br>/en/comparacion<br>/nl/comparacion<br>/de/comparacion | header, hero, comparison-table, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `comparar` | /es/comparar<br>/en/comparar<br>/nl/comparar<br>/de/comparar | header, hero, comparison-table, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `contacto` | /es/contacto<br>/en/contacto<br>/nl/contacto<br>/de/contacto | header, hero, booking-embed, contact, footer | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Open booking URL<br>- Fallback to WhatsApp<br>- Open WhatsApp<br>- Open mail client<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true) | — |
| `datos-personales` | /es/datos-personales<br>/en/datos-personales<br>/nl/datos-personales<br>/de/datos-personales | page-hero, faq-search | - Click CTA<br>- Type query<br>- Clear query | — |
| `deutschland` | /es/deutschland<br>/en/deutschland<br>/nl/deutschland<br>/de/deutschland | header, hero, story, comparison-table, process-timeline, programs, guides, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `empresa` | /es/empresa<br>/en/empresa<br>/nl/empresa<br>/de/empresa | header, hero, process-timeline, programs, trust-signals, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `familias` | /es/familias<br>/en/familias<br>/nl/familias<br>/de/familias | header, hero, guides, trust-signals, highlights, features, guides, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `faq` | /es/faq<br>/en/faq<br>/nl/faq<br>/de/faq | header, hero, faq, cta-banner, footer | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Type in FAQ search<br>- Clear search<br>- Expand/collapse question<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true) | — |
| `feedback` | /es/feedback<br>/en/feedback<br>/nl/feedback<br>/de/feedback | page-hero, feedback | - Click CTA<br>- Fill form<br>- Submit feedback/contact | - POST /api/contact |
| `fundador` | /es/fundador<br>/en/fundador<br>/nl/fundador<br>/de/fundador | header, hero, story, team, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `glosario` | /es/glosario<br>/en/glosario<br>/nl/glosario<br>/de/glosario | header, hero, glossary, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `guias` | /es/guias<br>/en/guias<br>/nl/guias<br>/de/guias | header, hero, guides, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `holanda` | /es/holanda<br>/en/holanda<br>/nl/holanda<br>/de/holanda | header, hero, story, comparison-table, process-timeline, programs, guides, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `home` | /es<br>/en<br>/nl<br>/de | hero, trust-signals, why-destination, services, process-timeline, feedback, cta-banner | - Click primary/secondary CTA<br>- Fill form<br>- Submit feedback/contact<br>- Click CTA button | - POST /api/contact |
| `inversor` | /es/inversor<br>/en/inversor<br>/nl/inversor<br>/de/inversor | header, hero, process-timeline, programs, trust-signals, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `lifestyle` | /es/lifestyle<br>/en/lifestyle<br>/nl/lifestyle<br>/de/lifestyle | header, hero, process-timeline, programs, why-destination, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `por-que-paraguay` | /es/por-que-paraguay<br>/en/por-que-paraguay<br>/nl/por-que-paraguay<br>/de/por-que-paraguay | header, page-hero, pillars, highlights, trust-signals, faq, cta-banner, footer | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click CTA<br>- Type in FAQ search<br>- Clear search<br>- Expand/collapse question<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true) | — |
| `prensa` | /es/prensa<br>/en/prensa<br>/nl/prensa<br>/de/prensa | header, hero, press-releases, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `privacidad` | /es/privacidad<br>/en/privacidad<br>/nl/privacidad<br>/de/privacidad | page-hero, faq-search | - Click CTA<br>- Type query<br>- Clear query | — |
| `proceso-detallado` | /es/proceso-detallado<br>/en/proceso-detallado<br>/nl/proceso-detallado<br>/de/proceso-detallado | header, hero, process-timeline, highlights, faq, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Type in FAQ search<br>- Clear search<br>- Expand/collapse question<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `proceso` | /es/proceso<br>/en/proceso<br>/nl/proceso<br>/de/proceso | header, hero, process-timeline, highlights, faq, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Type in FAQ search<br>- Clear search<br>- Expand/collapse question<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `recursos` | /es/recursos<br>/en/recursos<br>/nl/recursos<br>/de/recursos | header, hero, guides, newsletter-signup, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Fill email (if rendered)<br>- Submit signup<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | - POST /api/contact (if wired in page variant) |
| `servicios` | /es/servicios<br>/en/servicios<br>/nl/servicios<br>/de/servicios | header, page-hero, trust-signals, services-detail, cta-banner, footer | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click CTA<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true) | — |
| `sobre` | /es/sobre<br>/en/sobre<br>/nl/sobre<br>/de/sobre | header, hero, story, requirements, highlights, team, trust-signals, cta, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |
| `trust` | /es/trust<br>/en/trust<br>/nl/trust<br>/de/trust | header, hero, process-timeline, programs, trust-signals, cta-banner, footer, whatsapp-float | - Open menu<br>- Navigate via main links<br>- Switch locale<br>- Click primary CTA<br>- Click primary/secondary CTA<br>- Click CTA button<br>- Click internal links<br>- Click legal/privacy links<br>- Trigger gateway reset link (?gateway=true)<br>- Open WhatsApp floating action | — |

## 4) Component-level interaction matrix (from source code)
| Component | Interaction handlers found | Expected behavior |
|---|---|---|
| `Header.tsx` | onClick, router.push, locale switcher | locale change + nav + CTA tracking + mobile menu |
| `BlogSection.tsx` | onClick filters/pagination, href article links | filter, paginate, open post |
| `FaqSection.tsx` | onChange search, onClick clear/accordion | search/filter + accordion toggle |
| `BookingFormSection.tsx` | onClick step buttons, onChange form fields, submit handler | multi-step booking + POST |
| `FeedbackSection.tsx` | form onSubmit, onChange fields | POST contact + result state |
| `IntakeWizard.tsx` | onClick step controls/options, onChange/select fields | multi-step qualification + POST intake |
| `ExitPopup.tsx` | onClick submit/close, onChange email | POST contact / dismiss |
| `CookieBanner.tsx` | onClick accept/reject | persist consent |
| `ContactDetailsSection.tsx` | href wa.me / mailto | open external intents |
| `ShareButtons.tsx` | window.open share handlers | open social share dialogs |
| `GatewayPopup.tsx` | onClick close | dismiss popup |

## 5) Manual QA execution script (click-by-click)
1. Open each locale root: `/es`, `/en`, `/nl`, `/de` and switch language from header. Confirm same page changes locale and content follows.
2. Click all header links and footer links. Confirm every internal URL keeps locale prefix.
3. On FAQ pages: type query, clear query, open/close at least 3 items.
4. On blog pages: switch categories, paginate, open one article and go back.
5. On booking/intake pages: complete full flow and submit with test data.
6. On feedback/exit popup flows: submit and verify success message state.
7. Validate network calls in browser devtools: `/api/intake`, `/api/contact`, `/api/content` return 2xx.
8. Validate external actions: WhatsApp links open correct number; mailto opens correct email.

## 6) Notes
- This inventory is generated from current `nexa-pages/*.json` and component handlers in `src/components`.
- For exhaustive runtime validation, execute the QA script above per locale.

## 7) Runtime validation update (2026-05-29)
1. Full localized route health rerun: **124/124 URLs returned HTTP 200**.
2. Internal-link localization check rerun: **0 bare internal links** (excluding Cloudflare technical `/cdn-cgi/*`).
3. Browser interaction checks completed:
   - Cookie banner accept/reject behavior reachable.
   - Lead-magnet modal appears and can be dismissed (`No, gracias` / localized variants).
   - Header language switcher transitions URL across locales (validated `/en` → `/de`).
   - Contact page external intents present (`wa.me`, `mailto`).
4. API interaction checks:
   - `POST /api/contact` returns `200 {"success":true}`.
   - `POST /api/intake` returns `500` due to Supabase config missing in runtime env.
   - Debug payload confirms root cause: `getaddrinfo ENOTFOUND placeholder.supabase.co`.
5. Critical UX issue found in intake flow (`src/components/IntakeWizard.tsx`):
   - submit handler previously set `setDone(true)` even when request failed, so users could see success after failed storage.
   - **Fixed**: success screen now only shows on real `res.ok && success===true`; otherwise localized error message is shown (`es/en/nl/de`).
   - Priority: 🔴 HIGH.