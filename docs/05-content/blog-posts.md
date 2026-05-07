> **Status:** Current | **Last validated:** 2026-05-07
>

---
purpose: Complete catalog of all blog posts across all 4 locales — file paths, titles, and publication status for each language
last_updated: 2026-05-07
version: 1.0
cross_refs:
  - CONTENT_LOCALES.md (4-locale content structure)
  - images.json (blog cover images under blog.*)
  - content/es.json (blog post data in blogPage section)
---

# Blog Posts Catalog

Blog content is stored as MDX files in `/root/nexa-paraguay/blog/<locale>/`. Each locale has its own folder. Blog post metadata (title, excerpt, image ref) lives in the respective locale JSON file under `blogPage.posts`.

## Spanish (es) — 14 posts

| # | File | Title |
|---|------|-------|
| 1 | guia-completa-residencia-paraguay-2024.mdx | Guia Completa: Como Obtener la Residencia en Paraguay en 2024 |
| 2 | comprar-propiedades-paraguay-extranjeros.mdx | Comprar Propiedades en Paraguay para Extranjeros |
| 3 | apertura-cuenta-bancaria-paraguay.mdx | Apertura de Cuenta Bancaria en Paraguay para Extranjeros |
| 4 | emprender-paraguay-oportunidades-2024.mdx | Emprender en Paraguay: Oportunidades de Negocio 2024 |
| 5 | abrir-cuenta-bancaria-paraguay.mdx | Abrir Cuenta Bancaria en Paraguay (variant) |
| 6 | checklist-documentos-establecerse.mdx | Checklist de Documentos para Establecerse en Paraguay |
| 7 | constituir-empresa-paraguay.mdx | Constituir una Empresa en Paraguay |
| 8 | costo-de-vida-paraguay-europeos.mdx | Costo de Vida en Paraguay para Europeos |
| 9 | entorno-fiscal-paraguay-simple.mdx | Entorno Fiscal de Paraguay: Explicado Simple |
| 10 | gestoria-vs-equipo-profesional.mdx | Gestoria vs Equipo Profesional: Por Que la Diferencia Importa |
| 11 | mercado-inmobiliario-paraguay.mdx | Mercado Inmobiliario en Paraguay 2026 |
| 12 | por-que-europeos-miran-paraguay-2026.mdx | Por Que Europeos Miran a Paraguay en 2026 |
| 13 | residencia-paraguaya-paso-a-paso.mdx | Residencia Paraguaya Paso a Paso |
| 14 | un-solo-viaje-jornada-operativa.mdx | Un Solo Viaje: La Jornada Operativa |

## English (en) — 6 posts + README

| # | File | Title |
|---|------|-------|
| 1 | banking-day-reality.mdx | The Reality of Banking Day in Paraguay |
| 2 | eu-exit-paperwork.mdx | EU Exit Paperwork: What You Need Before Moving |
| 3 | nexa-process-week-by-week.mdx | Nexa Process: Week by Week Timeline |
| 4 | paraguay-10-percent-rule.mdx | Paraguay's 10% Tax Rule Explained |
| 5 | paraguay-vs-uruguay-vs-panama-2026.mdx | Paraguay vs Uruguay vs Panama: 2026 Comparison |
| 6 | residency-vs-tax-residency.mdx | Residency vs Tax Residency: Key Differences |

## Dutch (nl) — 1 post + README

| # | File | Title |
|---|------|-------|
| 1 | paraguay-vs-uruguay-vs-panama-2026.mdx | Paraguay vs Uruguay vs Panama: Vergelijking 2026 |

## German (de) — README only

No blog posts yet. README.md present as placeholder.

## Summary

| Locale | Published Posts | Notes |
|--------|---------------|-------|
| es | 14 | Full catalog of relocation content |
| en | 6 | Key topics, no Spanish equivalents translated yet |
| nl | 1 | Only comparison post |
| de | 0 | No posts — README placeholder only |

**Total posts: 21 MDX files across 4 locales.** English blog posts are unique content (not translations of Spanish). Only the comparison post exists in both EN and NL.

## Blog Post Content Status

- Spanish posts: have body content in es.json blogPage.posts[].body (some as empty placeholder text per DEEP_AUDIT.md issue #11)
- English/Dutch posts: full article content exists in the MDX files
- Cover images: 8 blog cover images available in images.json (blog.*) — need matching to correct posts
- Blog image keys in images.json: residencia2024, propiedades, banca, emprender, costOfLiving, healthcare, schools, neighborhoods
