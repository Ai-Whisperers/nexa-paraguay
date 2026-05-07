# Nexa Paraguay — Deep Code Quality & Architecture Analysis

## 🔴 P0: BREAKING / DATA LOSS RISK

### 1. Blog image keys don't match (content → images.json mismatch)
**Issue**: Blog posts reference `image` field like `"residencia-2025"` but images.json blog keys are `residencia2024`, `propiedades`, `banca`, `emprender`, `costOfLiving` — completely different naming. BlogSection uses `resolveImage(images, '@img:blog.${post.image}')` which looks for `images.blog['residencia-2025']` — doesn't exist. All 6 blog posts show no cover images.
**Fix**: Update `es.json` blog post `image` fields to match images.json keys: `residencia2024`, `propiedades`, `banca`, `emprender`, `costOfLiving`, `healthcare`, `schools`, `neighborhoods`.

### 2. buildPageContent still runs but most components skip it
**Issue**: Both `index.tsx` and `[slug].tsx` run `buildPageContent(content)` on every render, iterating all sections and doing deep key resolution. But the dispatch now passes `sectionData` directly to each component. `buildPageContent` creates a redundant `pageContent` object that's only used by sections that don't have dedicated components (fallback path). It runs 3+ `reduce()` calls per section — wasted CPU on every request.
**Fix**: Remove `buildPageContent` entirely. The dispatch already does `resolveContent(content, section.content || section.id)` which gets the exact data needed.

### 3. readFileSync reads 3+ JSON files per request — no caching
**Issue**: `getServerSideProps` reads `content/es.json` (~100KB), `images.json` (~47KB), plus page config JSON on EVERY request. No memoization, no cache. For 24+ routes at 350ms avg response, this adds significant disk I/O.
**Fix**: Add simple in-memory cache map or use Next.js `res.setHeader('Cache-Control')`.

### 4. `/programas` duplicates homepage services section
**Issue**: `programas.json` includes `{"id":"services","content":"home.services"}` — the full 9-item services section from the homepage is duplicated on the programs page. This means scrolling down on /programas shows the same content as the homepage.
**Fix**: Remove that section from `programas.json`.

### 5. `compliance-disclaimer-footer` section has no component
**Issue**: `contacto.json` has `{"id":"compliance-disclaimer-footer","content":"complianceDisclaimer"}` — no component in SECTION_MAP. Falls through to generic fallback. `resolveContent(content, 'complianceDisclaimer')` looks for `content['complianceDisclaimer']` which doesn't exist in es.json (it might be named differently).
**Fix**: Either add a component or remove from page config.

---

## 🟠 P1: HIGH — affects reliability, maintainability, UX

### 6. 0% TypeScript coverage — 48 `: any` types
**Issue**: Every component interface uses `: any` for props. No type checking on content structure, section data, images manifest. A content key typo (`'memmberImage'` instead of `'memberImage'`) won't be caught until runtime.
**Fix**: Define proper TypeScript types for:
- Content structure (Content, PageConfig, Footer, Navigation, Stats, Testimonial, etc.)
- Image manifest (ImagesManifest, ImageEntry)
- Section component props (SectionProps<T>)
- Component data shapes (FaqItem, BlogPost, TeamMember, Pillar, ProgramTier, etc.)

Estimated types needed: ~30 interfaces/types across 5 files.

### 7. Pages router duplication — index.tsx + [slug].tsx 90% identical
**Issue**: Both files share SECTION_MAP, SLUG_MAP, loadJSON, similar rendering logic. If you add a section component or change data flow, you must edit both files. Currently out of sync on some items (newsletter-signup, story, team in index.tsx but not [slug].tsx's extras — wait, they ARE in both now? Let me check — yes, but only 3 of 16 extra components are in index.tsx).
**Fix**: Merge both pages into one by handling the root `/` case in `[slug].tsx` when `slug === 'home'` or `params?.slug === undefined`. Delete `index.tsx`.

### 8. middleware.ts does almost nothing useful
**Issue**: 25 lines of boilerplate for a favicon redirect and console logging. No locale routing, no security headers, no redirects.
**Fix**: Add CSP headers, locale detection + redirect, and remove favicon redirect (handle in next.config.js).

### 9. `GallerySection` uses `resolveImage?.()` with optional chaining — indicates bad typing
**Issue**: Line 392: `resolveImage?.(images, ...)` — the `?.` is only needed if TypeScript thinks `resolveImage` might be undefined. It's imported at the top of the file. This is either a linting suppression or stale code from before the import was added.
**Fix**: Remove `?.` → `resolveImage(images, ...)`.

### 10. `ServicesSection` has `(d as any).groups` cast — type safety broken
**Issue**: Line 131: `const groups = d.groups || (d as any).groups || []` — the `(d as any)` indicates the type definition for d doesn't include `groups`. The root cause: `data || pageContent || {}` means `d` could be either the section data (which has `groups`) or the whole `pageContent` object (which doesn't). Since the dispatch now passes `data` correctly, `pageContent` fallback is never used.
**Fix**: Remove the `(d as any)` cast and the `pageContent` fallback parameter. ServicesSection only needs `data`.

### 11. Blog individual posts have `post.body` placeholder text
**Issue**: `es.json` blog posts have `body` as an empty string for all 6 posts. The `blog/[slug].tsx` renders `"Contenido completo próximamente."` because `post.body` is falsy. Blog posts exist as descriptions but have no full article content.
**Fix**: Write full article content for each blog post (or generate from the excerpt as a starting point).

### 12. Footer logo path hardcoded
**Issue**: `Footer.tsx` has `src="/images/brand/logo-dark.svg"` hardcoded instead of resolving through images manifest like other images.
**Fix**: Read logo path from content or images.json.

### 13. No error boundaries
**Issue**: If any section component throws (missing data, malformed content), the entire page renders as 500 white screen. A single bad FAQ item crashes the whole /faq page.
**Fix**: Wrap each section in `<ErrorBoundary>` that shows a subtle fallback.

### 14. `page-content` section id in page configs vs SECTION_MAP
**Issue**: Some page configs use section ids that don't exist in SECTION_MAP (e.g. `intake-wizard`, `pills`, `booking-embed` — fixed now). But `pills` on servicios.json has no component. Fallback renders it with basic styling.
**Fix**: Either rename to `services` (which has a component), or add `PillsSection` to SECTION_MAP.

---

## 🟡 P2: MEDIUM — quality of life improvements

### 15. Theme variable naming — `c`, `r`, `s`, `sz` are too terse
**Issue**: Destructuring at top of `sections-extra.tsx`:
```ts
const c = theme.colors, r = theme.radii, s = theme.spacing, sz = theme.sizes
```
This makes code hard to read: `c.primary` vs `theme.colors.primary`. New developers won't know what `c`, `r`, `s`, `sz` mean.
**Fix**: Use full names: `const { colors, radii, spacing, sizes } = theme`.

### 16. HeroSection declares mobileBg but never uses it
**Issue**: `HeroSection` calls `resolveImage(images, c.backgroundImageMobile)` and stores it as `mobileBg` but never references it in the JSX. Half the code is dead.
**Fix**: Either remove `mobileBg` or add a responsive `<source>` or `@media` background swap for mobile.

### 17. `scale(1.02)` on highlighted program tier — layout shift + browser compat
**Issue**: `ProgramsSection` applies `transform: tier.highlighted ? 'scale(1.02)' : 'none'`. This causes:
- Layout shift when the highlighted card is taller than others
- Visual clipping on some browsers (Safari)
- Accessibility issue (hover effects on static content)
**Fix**: Use `borderWidth: tier.highlighted ? '2px' : '1px'` + accent border color instead of scaling.

### 18. Tax calculator placeholder is hardcoded in JSX
**Issue**: `TaxCalculatorSection` renders `<p>Calculadora próximamente.</p>` as a string literal. Should read from content so it can be updated without code deploy.
**Fix**: Use `c.placeholder || 'Calculadora próximamente.'` where `placeholder` is a field in the taxCalculator content object.

### 19. `@ai-whisperers/*` local file dependencies — breaks Docker builds
**Issue**: 9 packages use `file:/root/ai-whisperers-base/packages/...` paths. These paths don't exist inside Docker context. Docker build only works because `node_modules` is already installed on the VPS and gets included via Docker cache — but a clean build fails.
**Fix**: Either (a) publish these packages to npm/GitHub Packages and reference versions, (b) mount `ai-whisperers-base` as Docker build context, or (c) remove unused packages.

### 20. `style jsx` in Header.tsx adds runtime overhead
**Issue**: The mobile nav uses `<style jsx>{`...`}</style>` which injects CSS at runtime per component instance. For a sticky header rendered on every page, this is wasted.
**Fix**: Move CSS to a static file or use inline styles with a `@media` query approach (the display toggle is already inline — just remove `display: none` CSS and control it purely via React state).

### 21. page config mapping uses dots — fragile key resolution
**Issue**: Section content keys like `landingEmpresa.programs` are resolved with `key.split('.').reduce(...)`. If a key like `contactPage.booking` has a nested key like `features` that's an array, it still resolves correctly, but if any intermediate key is missing, it silently returns null and the section doesn't render. No warning or logging.
**Fix**: Add debug logging when content key resolution fails.

### 22. Duplicate services on multiple pages
**Issue**: The full services section appears on: homepage (`home.services`), /servicios page (`servicesPage.detail` — correct), /programas page (`home.services` — duplicate). Content is the same. Users see the same 9 service cards 2-3 times.
**Fix**: Remove from /programas page config. Keep only on /servicios and homepage.

### 23. `loadJSON` defined in 3 files — should be shared utility
**Issue**: `loadJSON` function defined identically in `[slug].tsx`, `index.tsx`, and `blog/[slug].tsx`. 12 lines of duplication.
**Fix**: Move to `content.ts` or a `utils.ts` file.

### 24. Blog `/blog/[slug]` has no `post.body` fallback if body is array
**Issue**: The blog post component expects `post.body` to be a string for `split('\n')`. If some blog posts have body as an array of paragraphs (mixed content format), it would crash.
**Fix**: Handle both string and array body formats.

### 25. No sitemap.xml or robots.txt
**Issue**: Site has no sitemap for search engines. No robots.txt either. Google can't discover the 24+ pages.
**Fix**: Add a `/sitemap.xml` page that generates an XML sitemap from the page configs and blog posts.

### 26. 404 page is Next.js default
**Issue**: The default 404 has no branding, no navigation, no helpful suggestions. User lands on `/404` and sees raw text.
**Fix**: Create a custom 404 page with logo, search, popular pages.

### 27. No GA4 events configured
**Issue**: GA4 measurement ID is set (`G-XE49GLEP34`) but no events fire. No `page_view`, no `click`, no `form_submit`. Analytics has zero data.
**Fix**: Add `gtag` script to `_document.tsx` or as a component, fire `page_view` on route change, add click handlers for CTAs.

### 28. `tsconfig.json` has `strict: true` but no actual strict typing
**Issue**: TypeScript strict mode is enabled but every function is typed `: any`. Strict mode adds no value because `: any` bypasses all checks. This gives a false sense of security.
**Fix**: Remove `strict: true` until proper types are added, OR add proper types. The current state is worse than no strict mode.

### 29. Dockerfile has no HEALTHCHECK
**Issue**: Docker service has no way to know if the app is healthy. If the app starts but fails to serve (e.g., JSON file parse error), Docker thinks it's running fine.
**Fix**: Add `HEALTHCHECK --interval=30s CMD wget -qO- http://localhost:3000/ || exit 1`

### 30. `package.json` has unused dependencies
**Issue**: `@ai-whisperers/admin`, `@ai-whisperers/auth`, `@ai-whisperers/commerce`, `@ai-whisperers/i18n`, `@ai-whisperers/seo`, `@ai-whisperers/ui`, `lucide-react` — these are imported but never used in any page or component (no icon imports, no admin UI, no auth, no i18n). They add ~50MB+ to the Docker image via node_modules.
**Fix**: Remove unused dependencies or make a cleanup pass.

---

## ⚪ P3: LOW — nice to haves

### 31. CTA buttons have no hover states
### 32. No keyboard navigation support (Tab, Enter, Escape on FAQ)
### 33. No focus-visible styles for accessibility
### 34. Page transitions would improve perceived performance
### 35. Structured data JSON-LD would help SEO
### 36. Loading states for server-rendered pages
### 37. Share buttons on blog posts
### 38. Print styles for /privacidad and /recursos
### 39. Docker compose should use healthcheck-based restart
### 40. CI pipeline should run TypeScript check + build test

---

## SUMMARY

| Priority | Count | Key items |
|----------|-------|-----------|
| 🔴 P0 | 5 | Blog images broken, buildPageContent waste, readFileSync no cache, duplicate services, compliance section missing |
| 🟠 P1 | 9 | 0% TS types, pages router duplication, weak middleware, bad GallerySection typing, broken ServicesSection types, empty blog bodies, hardcoded footer logo, no error boundaries, missing pills component |
| 🟡 P2 | 16 | Terse variables, dead code, layout shift, tax calc hardcoded, Docker deps, style jsx overhead, fragile key resolution, duplicate loadJSON, no sitemap, no custom 404, no GA4 events, fake strict mode, no HEALTHCHECK, unused packages |
| ⚪ P3 | 10 | Accessibility, SEO, UX polish |
