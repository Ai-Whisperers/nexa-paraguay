# Data Flow — Content Injection & Runtime Loading

> **Status:** Current  
> **Last validated:** 2026-05-12  
> **Canonical reference:** `docs/CURRENT_STATE.md`

## Request Flow

```
Browser request
  -> src/proxy.ts
       redirects /about -> /{locale}/about when locale prefix is missing
  -> App Router page
       src/app/[locale]/page.tsx
       src/app/[locale]/[slug]/page.tsx
       src/app/[locale]/blog/[slug]/page.tsx
  -> src/lib/page-data.ts
       loadPageData(locale, slug)
       loadBlogPost(locale, slug)
  -> src/components/SectionsRenderer.tsx
       shared renderer + local overrides
```

There is no active `getServerSideProps()` path. Older docs that mention `src/pages` or Pages Router are historical.

## Loader System

The active loader is `src/lib/page-data.ts`.

### Cache

| Setting | Value |
|---|---|
| Cache type | In-memory `Map` per Node.js process |
| TTL | `30_000` ms |
| Max entries | 20 |
| Cold start | Container restart or new replica starts with empty cache |

### Supabase First

When `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are present, the loader calls:

```text
GET {NEXT_PUBLIC_SUPABASE_URL}/rest/v1/site_content
  ?select=key_path,content
  &tenant_slug=eq.nexa-paraguay
  &locale=eq.{locale}
```

Rows are reconstructed from dotted `key_path` values into the nested content object expected by the renderer.

Example:

| Row | Reconstructed path |
|---|---|
| `home.hero.headline` | `content.home.hero.headline` |
| `faqPage.full.items` | `content.faqPage.full.items` |

### File Fallback

If Supabase env vars are missing, the request fails, or no rows are returned, the loader reads local JSON:

| File | Purpose |
|---|---|
| `content/{locale}.json` | Text content, navigation, footer, page content |
| `nexa-pages/{slug}.json` | Page section order and config |
| `images.json` | Image manifest |
| `testimonials.json` | Testimonial data injected into `content.testimonials` when present |
| `content/blog/posts-{locale}.json` | Localized blog posts |
| `content/blog/posts.json` | Blog fallback |

This fallback is intentional. Do not reintroduce hardcoded Supabase credentials to make local builds work.

## Page Rendering

`src/app/[locale]/page.tsx` loads the `home` page:

```typescript
const data = await loadPageData(locale, 'home')
return <SectionsRenderer content={data.content} pageConfig={data.pageConfig} images={data.images?.images || {}} locale={data.locale} />
```

`src/app/[locale]/[slug]/page.tsx` loads each configured slug from `nexa-pages/` and generates static params for all supported locales.

## Section Rendering

`src/components/SectionsRenderer.tsx` creates a base renderer from `@ai-whisperers/sections` and injects local overrides:

| Section IDs | Local component |
|---|---|
| `process-timeline`, `process` | `ProcessSection` |
| `team` | `TeamSection` |
| `story` | `StorySection` |
| `page-hero`, `hero` | `PageHeroSection` |
| `cta-banner`, `cta` | `CtaBanner` |
| `booking-embed` | `BookingEmbedSection` |
| `blog`, `blog-index` | `BlogSection` |
| `faq` | `FaqSection` |
| `contact`, `contact-details` | `ContactDetailsSection` |

## Write Paths

| Path | Destination |
|---|---|
| Content migration | `scripts/migrate-content.js` upserts local JSON into Supabase `site_content` |
| Admin/content operations | Require configured Supabase env vars |
| Contact form | `src/app/api/contact/route.ts` posts to HubSpot Forms API and logs fallback |
| Newsletter subscription | `src/app/api/subscribe/route.ts` posts to Mailchimp and logs fallback when API key is absent |

## Operational Notes

- Supabase service-role keys are server-only and must never be committed.
- Local JSON remains the safe fallback and reviewable source for content changes.
- Page configs and images are still file-based even when text content comes from Supabase.
- Contact form docs must not claim Supabase `leads` inserts unless the route is changed to implement them.

