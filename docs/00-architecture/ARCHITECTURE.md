# Architecture — Core Framework & Client Bridge

**Status:** Current | **Last Validated:** 2026-05-07 | **Scope:** `@ai-whisperers/*` package ecosystem, bridge points, abstraction boundaries

---

## Overview

Nexa Paraguay is built on a **package-based core framework** (`@ai-whisperers/*`). The framework provides shared logic, UI components, and AI agentic workflows reused across all clients. Nexa Paraguay imports these packages and supplies only client-specific data, configuration, and custom components.

```
┌─────────────────────────────────────────────────────────┐
│                    @ai-whisperers/*                      │
│                      (Core Framework)                     │
│                                                         │
│  admin  auth  client-kit  commerce  i18n  seo           │
│  theme  ui    whatsapp                                   │
└────────────────────┬────────────────────────────────────┘
                     │ npm link / GitHub Packages
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  nexa-paraguay (Client)                   │
│                                                         │
│  content/es.json  nexa-pages/*.json  images.json         │
│  src/types.ts     src/theme.ts       src/lib/loader.ts   │
│  src/components/* sections          Dockerfile           │
└─────────────────────────────────────────────────────────┘
```

## Package Ecosystem

| Package | Source | Used In Nexa? | Purpose |
|---------|--------|---------------|---------|
| `@ai-whisperers/admin` | `file:../ai-whisperers-base/packages/admin` | ❌ Not imported | Admin panel UI |
| `@ai-whisperers/auth` | `file:../ai-whisperers-base/packages/auth` | ❌ Not imported | Authentication flows |
| `@ai-whisperers/client-kit` | `file:../ai-whisperers-base/packages/client-kit` | ✅ `admin/content.tsx` | Content editor, dynamic import |
| `@ai-whisperers/commerce` | `file:../ai-whisperers-base/packages/commerce` | ❌ Not imported | E-commerce backend |
| `@ai-whisperers/i18n` | `file:../ai-whisperers-base/packages/i18n` | ❌ Not imported | Internationalization engine |
| `@ai-whisperers/seo` | `file:../ai-whisperers-base/packages/seo` | ❌ Not imported | SEO meta generation |
| `@ai-whisperers/theme` | `file:../ai-whisperers-base/packages/theme` | ❌ Not imported | Base design tokens |
| `@ai-whisperers/ui` | `file:../ai-whisperers-base/packages/ui` | ❌ Not imported | Reusable UI component library |
| `@ai-whisperers/whatsapp` | `file:../ai-whisperers-base/packages/whatsapp` | ❌ Not imported | WhatsApp API integration |

## Bridge Points

### 1. npm Dependencies (package.json)

All `@ai-whisperers/*` packages are declared in `package.json` as:

```json
"@ai-whisperers/client-kit": "file:/root/ai-whisperers-base/packages/client-kit"
```

The `file:` protocol points to the local clone of the core monorepo. In CI/Docker, this path must exist or be replaced with a published version (GitHub Packages).

### 2. Dynamic Import (admin/content.tsx)

The only active bridge point in code:

```tsx
const ContentEditor = dynamic(
  () => import('@ai-whisperers/client-kit').then(m => ({ default: m.ContentEditor })),
  { ssr: false }
)
```

This is used for the `/admin/content` page only.

### 3. Theme Override (src/theme.ts)

Nexa defines its own `src/theme.ts` with brand-specific tokens. This shadows the base `@ai-whisperers/theme` package when it exists — the local theme takes precedence.

### 4. Docker Build Context

When building the Docker image, `file:` dependencies must resolve. Currently they rely on `node_modules` pre-installed at build time on the VPS. A clean build requires the core repo to be accessible at `/root/ai-whisperers-base/`.

## Abstraction Boundaries

| Layer | Global (Core) | Local (Nexa) |
|-------|--------------|--------------|
| **Design tokens** | Base colors, spacing, fonts in `@ai-whisperers/theme` | Override in `src/theme.ts` → navy #1B2A4A, gold #C9A96E |
| **Components** | Reusable UI in `@ai-whisperers/ui` | All 26 SECTION_MAP components in `src/components/` |
| **Content** | Template schemas | `content/es.json`, `site.json`, `images.json` |
| **Page routing** | Base `[slug].tsx` pattern | `src/pages/[slug].tsx`, `src/pages/index.tsx` |
| **Data loading** | `lib/loader.ts` with cache (in Core eventually) | Local copy at `src/lib/loader.ts` |
| **Deployment** | Multi-tenant builder (`paragu-ai-builder`) | Standalone Docker Swarm + Dockerfile |
| **Config** | Defaults | `site.json` (features, URLs, booking, social) |

## Key Distinction: Standalone vs Multi-Tenant

Nexa Paraguay has **two deployment paths**:

1. **Standalone** (`/root/nexa-paraguay`) — Pages Router, ES-only content, Docker Swarm at `nexa.paragu-ai.com`
2. **Multi-tenant** (`/root/paragu-ai-builder/sites/nexa-paraguay`) — Part of a larger builder, auto-deploys to Cloudflare Pages at `paragu-ai.com/s/en/nexa-paraguay`

Both share content at `content/es.json` but differ in routing, image paths, and deployment. The standalone version is the primary.

## Deployed but Unused Packages

The following 8 packages remain in `package.json` but **have zero imports** in any `src/` file. They inflate Docker images and add install time. Candidates for removal:

- `@ai-whisperers/admin` — No admin UI beyond content editor (which uses `client-kit`)
- `@ai-whisperers/auth` — No auth system implemented
- `@ai-whisperers/commerce` — No e-commerce
- `@ai-whisperers/i18n` — i18n handled by manual locale JSON loading
- `@ai-whisperers/seo` — SEO handled by page-level meta tags
- `@ai-whisperers/theme` — Overridden entirely by `src/theme.ts`
- `@ai-whisperers/ui` — No core UI components used
- `@ai-whisperers/whatsapp` — WhatsApp integrated via direct links, not API
