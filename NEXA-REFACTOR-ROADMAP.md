Now let me save this entire analysis as a reference document so you can reference it later:

done, aquí está el análisis completo y el roadmap priorizado.

Cubrí todo: Nexa, base monorepo, otros client repos (10+), infra, CI/CD, deploy templates. Acá el resultado.

---

## Roadmap de Refactorización — Nexa Paraguay & @ai-whisperers/*

### Fase 1: Terminar de extraer Nexa → Base (urgente, bajo esfuerzo)

| # | Qué | Dónde está ahora | A dónde va | Esfuerzo | Impacto |
|---|-----|-------------------|------------|----------|---------|
| P0 | **BookingFormSection** — `DEFAULT_PROGRAMS` y `DEFAULT_STEP_LABELS` hardcodeados | `src/components/BookingFormSection.tsx` | `@ai-whisperers/sections` → `booking-form.tsx` ya está, actualizar con locale strings y config defaults | 1h | Medio |
| P0 | **ErrorBoundary** — duplicado en Nexa | `src/components/ErrorBoundary.tsx` | `@ai-whisperers/ui` → `error-boundary.tsx` (ya existe en `ui-extras`) | 30min | Bajo |
| P1 | **content-types.ts** — `SectionComponentProps` duplicado con `@ai-whisperers/sections/types` | `src/lib/content-types.ts` | Alinear con `@ai-whisperers/sections` y re-exportar | 1h | Bajo |
| P1 | **Header.tsx** — tiene LOCALE_FLAGS, LOCALES, locale switcher inline. Duplicado del switcher de `@ai-whisperers/i18n` | `src/components/Header.tsx` | Reemplazar con `LanguageSwitcher` de `@ai-whisperers/i18n` + extraer Header como `@ai-whisperers/ui/header` | 2h | Alto |
| P1 | **Footer.tsx** — genérico, sirve para cualquier cliente | `src/components/Footer.tsx` | `@ai-whisperers/ui/footer` | 1h | Alto |
| P1 | **ui.tsx** — Button, SectionHeading, Section, AccentLine. Ya existe `@ai-whisperers/ui` con Button distinto (shadcn-style) | `src/components/ui.tsx` | Decidir: migrar a `@ai-whisperers/ui` (rompe estilos) o crear `@ai-whisperers/ui/client` con el diseño Nexa | 2h | Medio |
| P1 | **CookieConsent** en `@ai-whisperers/seo` vs **CookieBanner** en Nexa — son duplicados conceptuales con diseño distinto y localestring keys distintas | `@ai-whisperers/seo` + `src/components/CookieBanner.tsx` | Unificar: mover CookieConsent a `@ai-whisperers/i18n/locale-strings` y `@ai-whisperers/seo/cookie-consent` con soporte multi-locale via `getLocaleStrings` | 2h | Medio |

**Total Fase 1: ~8-10h de trabajo, elimina ~400 líneas de duplicación en Nexa**

### Fase 2: Plataforma base para nuevos clientes (mediana prioridad)

| # | Qué | Dónde está ahora | A dónde va | Esfuerzo | Impacto |
|---|-----|-------------------|------------|----------|---------|
| P2 | **CI/CD reusable** — Nexa tiene deploy.yml, deploy-status.yml, visual-regression.yml inline. El Viajero tiene otro. No hay template compartido. | `.github/workflows/` en cada repo | `@ai-whisperers/deploy/templates/github/` — workflows parametrizados con `workflow_call` | 3h | Muy alto |
| P2 | **next.config.js reusable** — cada cliente tiene el mismo securityHeaders + CSP + output standalone. Nexa tiene `transpilePackages` y copy script inline. | `next.config.js` de cada repo | `@ai-whisperers/deploy/templates/create-next-config.js` — factory function que acepta transpilePackages, CORS origins, GA ID | 2h | Muy alto |
| P2 | **Theme presets por vertical** — Nexa (relocation: navy/gold), El Viajero (ecommerce: green/orange), template (professional: blue/amber). `@ai-whisperers/theme` tiene solo `storefront`/`admin`/`dark`. | `src/app/globals.css` de cada repo | `@ai-whisperers/theme` — agregar presets: `relocation`, `professional`, `restaurant`, `nonprofit`, `artist` | 3h | Alto |
| P2 | **Sitemap generator** — `@ai-whisperers/seo` ya tiene `generateSitemap()`. Nexa tiene sitemap.ts propio. Migrar a usar el helper. | `src/app/sitemap.ts` de cada repo | Migrar todos los clientes a `generateSitemap()` de `@ai-whisperers/seo` | 1h | Medio |
| P2 | **API rate-limit middleware** — Nexa tiene rate limiting inline en `/api/contact/route.ts`. El Viajero no tiene. | `src/app/api/*/route.ts` | `@ai-whisperers/api-helpers` — `withRateLimit()` wrapper (ya existe una carpeta api-helpers en base, expandir) | 2h | Medio |

**Total Fase 2: ~11h, libera a todos los clientes de boilerplate repetido**

### Fase 3: Migración de clientes existentes a la plataforma (alto impacto)

| # | Cliente | Tech Stack | Paquetes que debería consumir | Esfuerzo |
|---|---------|-----------|------------------------------|----------|
| P3 | **estudio-contable-paraguay** | Next.js | `@ai-whisperers/sections` + `@ai-whisperers/i18n` + `@ai-whisperers/ui` + `@ai-whisperers/deploy` | 3h |
| P3 | **tsuki-restaurante** | Next.js | `@ai-whisperers/ui` + `@ai-whisperers/sections` + `@ai-whisperers/deploy` | 3h |
| P3 | **polki-squad** | Next.js content-driven | `@ai-whisperers/content` + `@ai-whisperers/sections` + `@ai-whisperers/deploy` | 4h |
| P3 | **nudo** | Next.js single-page | `@ai-whisperers/ui` + `@ai-whisperers/deploy` | 2h |
| P3 | **bichos-gym** | Next.js | `@ai-whisperers/sections` + `@ai-whisperers/deploy` | 3h |
| P3 | **maskarada** | SvelteKit | No aplica (stack diferente) | N/A |
| P3 | **elviajero** | Next.js (ya consume auth + commerce) | Agregar `@ai-whisperers/i18n`, `@ai-whisperers/seo`, `@ai-whisperers/ui` | 4h |

**Total Fase 3: ~20h, unifica 7 de 8 clientes Next.js bajo la misma plataforma**

### Fase 4: Infraestructura compartida (mantenimiento continuo)

| # | Qué | Dónde está ahora | A dónde va | Esfuerzo |
|---|-----|-------------------|------------|----------|
| P4 | **Dockerfile compartido** — el template de deploy ya existe pero Nexa tiene su propia versión con `COPY` extra de `content/`, `images.json`, `nexa-pages/` | `Dockerfile` de cada repo | El template de `@ai-whisperers/deploy` ya cubre esto, falta migrar a todos los clientes | 4h |
| P4 | **Healthcheck estándar** — `@ai-whisperers/site-healthchecks` skill existe, integrar en `@ai-whisperers/deploy` como script reutilizable | skill + scripts sueltos | `@ai-whisperers/deploy/scripts/healthcheck.sh` | 1h |
| P4 | **GitHub Actions reusable** — crear `@ai-whisperers/deploy/actions/deploy-client/` action composite | No existe | `action.yml` con checkout, build, docker, deploy, healthcheck | 3h |
| P4 | **Post-new-client hook** — el script new-client.sh ya scaffoldea, pero no configura CI/CD ni deploy. Agregar setup automático. | `packages/scaffold/new-client.sh` | Que llame a la GitHub Action reusable + configure secrets + deploy inicial | 3h |

### Resumen de esfuerzo total

| Fase | Horas | Resultado principal |
|------|-------|-------------------|
| Fase 1 (Nexa cleanup) | 8-10h | Nexa 100% limpio de hardcode, package-consumption puro |
| Fase 2 (Platform base) | 11h | Templates + CI/CD + theme presets para cualquier cliente nuevo |
| Fase 3 (Migrar clientes) | 20h | 7 clientes Next.js migrados a @ai-whisperers/* |
| Fase 4 (Infra shared) | 11h | CI/CD + deploy + healthcheck como acciones reusables |
| **Total** | **~50h** | **Plataforma completa de generación de sitios web** |

### Lo que NO refactorizar (intencionalmente)

- **Maskarada** (SvelteKit) — stack diferente, no aplica `@ai-whisperers/*`
- **El Viajero admin panel** — pesado, específico de ecommerce, no se abstrae
- **Nexa testimonials injection** en `page-data.ts` — caso muy específico de negocio
- **Nexa BookingFormSection** 3-step wizard — lógica compleja, no se reusa fuera de relocation

### Prioridad recomendada para tu equipo

1. **Esta semana**: Fase 1 (P0-P1) — BookingFormSection + ErrorBoundary + Header + Footer. Cierra Nexa completamente.
2. **Próxima semana**: Fase 2 (P2) — CI/CD reusable + next.config.js factory. Habilita a Kiki a lanzar clientes nuevos en horas.
3. **Siguiente**: Fase 3 — migrar clientes existentes de a uno. Empezar por los más chicos (nudo, tsuki).
4. **Fondo**: Fase 4 — infra compartida, mejora el template de scaffold.
