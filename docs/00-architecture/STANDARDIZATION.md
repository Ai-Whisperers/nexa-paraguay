> **Status:** Historical cleanup notes | **Last validated:** 2026-05-12
>
> **Current-state warning:** This document contains Pages Router and `getServerSideProps` references from the pre-App-Router implementation. Use `docs/00-architecture/ARCHITECTURE.md`, `docs/00-architecture/DATA_FLOW.md`, and `docs/CURRENT_STATE.md` for current architecture before executing any task here.
>

# Nexa Paraguay — Standardization & Cleanup

## Issues that need standardization (not workarounds)

### 1. Inline styles everywhere — NO theming system
**Problem**: 244 inline `style={{}}` blocks across sections.tsx + sections-extra.tsx. Colors hardcoded as hex values (#1B2A4A, #C9A96E, #F5F5F0, #e0e0e0, #666, #444). Every spacing value is magic number.
**Fix**: Extract theme constants to a single file (src/theme.ts):
```ts
export const theme = {
  colors: { primary: '#1B2A4A', accent: '#C9A96E', bg: '#F5F5F0', text: '#444', muted: '#666', border: '#e0e0e0', success: '#10b981', white: '#fff', darkBg: 'rgba(255,255,255,0.08)', highlight: '#2a3f6a' },
  radii: { sm: '8px', md: '12px', lg: '16px', full: '50px' },
  shadows: { card: '0 4px 20px rgba(0,0,0,0.08)', sm: '0 2px 10px rgba(0,0,0,0.06)' },
  fonts: { body: "'Inter', -apple-system, sans-serif", heading: "'Playfair Display', Georgia, serif" },
  spacing: { section: '4rem 1rem', sectionSm: '3rem 1rem', card: '1.5rem', btn: '0.85rem 2.5rem' },
}
```
Then: `style={{ background: theme.colors.primary }}` instead of `background: '#1B2A4A'`.

### 2. Multi-locale content only serves ES
**Problem**: es.json loads on every request. en.json, nl.json, de.json exist but never used. Site has `locales: ['nl','en','de','es']` in site.json but no routing code.
**Fix**: Add locale detection + content switching in getServerSideProps:
- Check URL prefix `/en/`, `/nl/`, `/de/`, `/es/` → load that locale content
- No prefix → detect browser Accept-Language → redirect
- Persist locale choice in cookie
- This is a ~1-2 day task including translating all page configs

### 3. readFileSync blocks ISR/SSG
**Problem**: Both page files use `readFileSync` in getServerSideProps. This means Next.js cannot pre-render these pages at build time (SSG) or use Incremental Static Regeneration (ISR). Every request hits the server.
**Fix**: Import JSON directly at module level (Webpack bundles them at build time):
```ts
import content from '../../content/es.json'
import imagesManifest from '../../images.json'
```
But this breaks the locale switching. Better approach: use `fs` in getServerSideProps (current) and add caching with `res.setHeader('Cache-Control', 'public, s-maxage=60')`.

### 4. Key naming inconsistency — q/a vs pregunta/respuesta vs term/definition
**Problem**: Content uses different key names for the same data shape across pages:
- FAQ items: `{q, a}` (faqPage.full.items)
- Privacy items: `{q, a}` (privacyPage.body.items)  
- Glossary items: `{q, a}` (glossaryPage.glossary.items)
- Blog posts: `{slug, title, excerpt, date, author, tags}` (blog.posts)
- Team members: `{name, role, description, memberImage}` (aboutPage.team.members)
- Services: `{title, description}` grouped by `{title, subtitle, items}` (servicesPage.detail.groups)
- Process steps: `{number, title, description, duration, image}` (processPage.process.steps)
- Pillars: `{title, description, imageUrl, bullets}` (whyCountryPage.pillars.pillars)

**Fix**: Standardize to consistent key names per content type across all page configs. Currently the component code has fallback chains like `item.pregunta || item.question || item.title || item.q` which is fragile.

### 5. GallerySection uses `resolveImage?.()` — optional chaining as workaround
**Problem**: Line 392: `resolveImage?.(images, ...)` has `?.` because GallerySection doesn't know if `resolveImage` is imported. It's imported at line 2 of the file. The `?.` is a workaround for a missing type definition.
**Fix**: Add proper interface for SectionProps and ensure all components that use images have `images` in their props.

### 6. ServicesSection works only for home page
**Problem**: `ServicesSection` reads `pageContent.services` which comes from `home.services` via `buildPageContent`. On `/servicios` page, the section id is `services` which maps to `ServicesSection`, but the data is at `servicesPage.detail.groups` which gets stored as `pageContent.detail`, not `pageContent.services`.
**Fix**: The section dispatch now passes `sectionData` directly (from the commit that added `const sectionData = resolveContent(content, section.content || section.id)`), so the component receives the correct data. But ServicesSection still reads `pageContent.services` instead of `data || pageContent`.

### 7. Mobile menu hidden
**Problem**: Line 28 of Header.tsx: `style={{ display: 'none' }}` on the hamburger button. Mobile navigation doesn't work at all.
**Fix**: Implement responsive nav with hamburger toggle for <768px screens.

### 8. GallerySection on /proceso references data that doesn't match
**Problem**: /proceso page config has `gallery` section with `content: "aboutPage.gallery"`. But gallery data has `images` with `src`/`alt`/`caption` — while other pages call it different things.
**Fix**: Standardize gallery data model or make GallerySection flexible.

### 9. Footer doesn't render social links
**Problem**: site.json has `social: { linkedin, instagram }` but Footer component only renders messaging/email from `footer` content object. Social links are never shown.
**Fix**: Add social icons to Footer component, reading from site.json or a content key.

### 10. Messaging float section has no component
**Problem**: Multiple page configs include `{"id":"messaging-float"}` but there's no MessagingFloatSection in SECTION_MAP. Falls through to generic fallback which renders whatever `resolveContent(content, 'messaging')` returns — likely nothing.
**Fix**: Add a simple MessagingFloatSection (fixed-position button).

---

## File-by-file cleanup needed

### src/theme.ts (NEW)
- [ ] Extract all colors, radii, shadows, fonts, spacing to a single theme object

### src/components/sections.tsx
- [ ] Replace all hex color literals with `theme.colors.X`
- [ ] Remove duplicate `resolveImage` calls (already imported from content)
- [ ] Add `data` prop support (like sections-extra.tsx does)

### src/components/sections-extra.tsx
- [ ] Remove `?.' from resolveImage call (line 392)
- [ ] Replace all hex colors with theme properties
- [ ] Standardize the `d = data || pageContent || {}` pattern (already done ✓)

### src/components/Header.tsx
- [ ] Implement mobile nav (hamburger menu)
- [ ] Add language switcher UI (read from site.json locales)

### src/components/Footer.tsx
- [ ] Add social links (LinkedIn, Instagram from site.json)
- [ ] Add copyright year auto-update
- [ ] Add legal entity info if available

### src/pages/[slug].tsx
- [ ] Replace `buildPageContent` with the `sectionData` pattern (already done ✓)
- [ ] Remove `buildPageContent` entirely — it's unused now that we pass `data` directly
- [ ] Add cache-control headers in getServerSideProps

### src/pages/blog/[slug].tsx
- [ ] Add cache-control headers

### Dockerfile
- [ ] Pin to specific Node minor version (node:20.18-alpine not node:20-alpine)

### CI
- [ ] Add GitHub Actions for auto-deploy on push to main
- [ ] Add TypeScript type check in CI

---

## Runtime issues to fix (affects UX today)

1. **Mobile menu hidden** — hamburger button is `display: none`, no way to navigate on mobile
2. **No footer social links** — LinkedIn/Instagram URLs in site.json but not rendered anywhere
3. **readFileSync** — no caching, every request reads JSON from disk. Add `res.setHeader('Cache-Control')` or implement in-memory cache
4. **GallerySection** on /proceso uses different photo data model than images in gallery content
5. **Messaging float** — no floating button on most pages (only the contact page renders contact info)
6. **No error boundaries** — a single section crash = white screen of death
7. **Tax calculator** — says "próximamente" for weeks, remove or build
