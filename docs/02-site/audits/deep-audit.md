> **Status:** Review | **Last validated:** 2026-05-07
>

---
purpose: Deep code quality and architecture analysis of the Nexa Paraguay website — categorizes 40 issues by severity (P0-P3) with fixes
last_updated: 2026-05-07
version: 1.0
cross_refs:
  - IMPROVEMENT_PLAN.md (actionable implementation plan)
  - SITE-AUDIT.md (surface-level audit)
  - STANDARDIZATION.md (code standardization)
---

# Deep Code Quality & Architecture Analysis

## P0: BREAKING / DATA LOSS RISK (5 items)

1. **Blog image keys mismatch** — content references `residencia-2025` but images.json keys are `residencia2024`. All 6 blog posts show no cover images. Fix: update es.json `image` fields to match images.json keys.

2. **buildPageContent still runs but most components skip it** — runs 3+ reduce() calls per section, wasted CPU. Fix: remove entirely; dispatch already provides correct data.

3. **readFileSync reads 3+ JSON files per request with no caching** — content/es.json (~100KB), images.json (~47KB), page config JSON on every request. Fix: add in-memory cache or Next.js Cache-Control headers.

4. **/programas duplicates homepage services section** — includes `{"id":"services","content":"home.services"}` — same 9 service cards appear on both pages. Fix: remove from programas.json page config.

5. **compliance-disclaimer-footer section has no component** — contacto.json references it but no mapping in SECTION_MAP. Fix: add component or remove from page config.

## P1: HIGH — reliability, maintainability, UX (9 items)

6. **0% TypeScript coverage** — 48 `: any` types across components. No type checking on content structure or images manifest. ~30 interfaces needed.

7. **Pages router duplication** — index.tsx + [slug].tsx 90% identical. Fix: merge into one, handling `/` as slug === 'home'.

8. **proxy.ts does almost nothing useful** — 25 lines for favicon redirect and console logging. Add CSP headers, locale detection.

9. **GallerySection uses resolveImage?.() with optional chaining** — bad typing. Remove `?.`.

10. **ServicesSection has (d as any).groups cast** — type safety broken. Remove pageContent fallback parameter.

11. **Blog individual posts have post.body placeholder text** — empty string for all 6 posts. Write full article content.

12. **Footer logo path hardcoded** — `src="/images/brand/logo-dark.svg"` instead of resolving through images manifest.

13. **No error boundaries** — any component throw causes white 500 screen.

14. **page-content section id in page configs vs SECTION_MAP** — some missing mappings (e.g., `pills` on servicios.json).

## P2: MEDIUM — quality of life (16 items)

15. Terse theme variable naming (c, r, s, sz)
16. HeroSection declares mobileBg but never uses it
17. scale(1.02) on highlighted program tier — layout shift + Safari clipping
18. Tax calculator placeholder hardcoded in JSX
19. @ai-whisperers/* local file dependencies break Docker builds
20. style jsx in Header.tsx adds runtime overhead
21. Page config mapping uses dots — fragile key resolution, no warning on failure
22. Duplicate services on multiple pages
23. loadJSON defined in 3 files — should be shared utility
24. Blog /blog/[slug] has no post.body fallback if body is array
25. No sitemap.xml or robots.txt
26. 404 page is Next.js default
27. No GA4 events configured
28. tsconfig.json has strict: true but no actual strict typing
29. Dockerfile has no HEALTHCHECK
30. package.json has unused dependencies

## P3: LOW — nice to haves (10 items)

31. CTA buttons have no hover states
32. No keyboard navigation (Tab, Enter, Escape on FAQ)
33. No focus-visible styles for accessibility
34. Page transitions for perceived performance
35. Structured data JSON-LD for SEO
36. Loading states for server-rendered pages
37. Share buttons on blog posts
38. Print styles for /privacidad and /recursos
39. Docker compose should use healthcheck-based restart
40. CI pipeline should run TypeScript check + build test

## Summary

| Priority | Count | Key items |
|----------|-------|-----------|
| P0 | 5 | Blog images broken, buildPageContent waste, no caching, duplicate services, missing compliance component |
| P1 | 9 | 0% TS types, router duplication, weak middleware, broken typings, empty blog bodies, hardcoded paths, no error boundaries |
| P2 | 16 | Terse variables, dead code, layout shift, Docker deps, no sitemap, no 404, no GA4 events, fake strict mode |
| P3 | 10 | Accessibility, SEO, UX polish |

