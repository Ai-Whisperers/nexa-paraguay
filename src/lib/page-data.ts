// ── Universal Content Loader ──
// Supabase first, file fallback. Same API as before.
import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'

const TENANT = 'nexa-paraguay'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

interface CacheEntry { data: any; timestamp: number }
const cache = new Map<string, CacheEntry>()
const TTL = 30_000

function getCached(key: string): any | null {
  const entry = cache.get(key)
  if (entry && (Date.now() - entry.timestamp) < TTL) return entry.data
  return null
}

function setCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() })
  if (cache.size > 20) {
    const entries = [...cache.entries()].sort((a, b) => a[1].timestamp - b[1].timestamp)
    for (const [key] of entries.slice(0, cache.size - 20)) cache.delete(key)
  }
}

function loadJson<T>(...pathSegments: string[]): T | null {
  try { return JSON.parse(readFileSync(join(/* turbopackIgnore: true */ process.cwd(), ...pathSegments), 'utf-8')) }
  catch { return null }
}

function localizeDeep(value: any, locale: string): any {
  if (Array.isArray(value)) return value.map((v) => localizeDeep(v, locale))
  if (!value || typeof value !== 'object') return value

  const keys = Object.keys(value)
  const localeKeys = ['es', 'en', 'nl', 'de']
  if (keys.length > 0 && keys.every((k) => localeKeys.includes(k))) {
    return value[locale] ?? value.en ?? value.es ?? value.nl ?? value.de ?? ''
  }

  const out: Record<string, any> = {}
  for (const [k, v] of Object.entries(value)) out[k] = localizeDeep(v, locale)
  return out
}

function localizeInternalHref(href: string, locale: string): string {
  if (!href) return href
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#') || href.startsWith('?')) return href

  const normalized = href.startsWith('/') ? href : `/${href}`
  const first = normalized.split('/').filter(Boolean)[0]
  if (first && ['es', 'en', 'nl', 'de'].includes(first)) return normalized
  return `/${locale}${normalized}`
}

function localizeLinkFieldsDeep(value: any, locale: string): any {
  if (Array.isArray(value)) return value.map((v) => localizeLinkFieldsDeep(v, locale))
  if (!value || typeof value !== 'object') return value

  const out: Record<string, any> = {}
  const hrefKeys = new Set(['href', 'ctaHref', 'buttonHref', 'ctaPrimaryHref', 'ctaSecondaryHref'])

  for (const [k, v] of Object.entries(value)) {
    if (typeof v === 'string' && hrefKeys.has(k)) {
      out[k] = localizeInternalHref(v, locale)
      continue
    }
    out[k] = localizeLinkFieldsDeep(v, locale)
  }

  return out
}

function hasSupabaseConfig(): boolean {
  return !!SUPABASE_URL && !!SUPABASE_KEY && !SUPABASE_URL.includes('<') && !SUPABASE_KEY.includes('<')
}

// ── Load from Supabase REST API ──
async function loadFromSupabase(locale: string): Promise<Record<string, any> | null> {
  if (!hasSupabaseConfig()) return null

  try {
    const url = `${SUPABASE_URL}/rest/v1/site_content?select=key_path,content&tenant_slug=eq.${TENANT}&locale=eq.${locale}`
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      next: { revalidate: 30 },
    })
    if (!res.ok) return null

    const data = await res.json()
    if (!data || data.length === 0) return null

    // Reconstruct nested object from flat key_paths
    const result: Record<string, any> = {}
    for (const row of data) {
      const keys = row.key_path.split('.')
      let current = result
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          current[keys[i]] = row.content
        } else {
          current[keys[i]] = current[keys[i]] || {}
          current = current[keys[i]]
        }
      }
    }
    return result
  } catch {
    return null
  }
}

// ── Public API ──

export async function loadPageData(locale: string, slug: string): Promise<any> {
  const cacheKey = `page:${locale}:${slug}`
  const cached = getCached(cacheKey)
  if (cached) return cached

  // Try Supabase first
  const content = await loadFromSupabase(locale)
  if (!content) {
    // File fallback
    const contentRaw = loadJson<Record<string, any>>('content', `${locale}.json`)
    if (!contentRaw) return null
    const content = localizeLinkFieldsDeep(localizeDeep(contentRaw, locale), locale)
    const pageConfigRaw = loadJson<any>('nexa-pages', `${slug}.json`)
    const pageConfig = localizeDeep(pageConfigRaw, locale)
    const images = loadJson<any>('images.json')
    const testimonials = loadJson<any>('testimonials.json')
    if (testimonials?.testimonials?.length) content.testimonials = testimonials.testimonials
    const result = { content, pageConfig, images, pageId: slug, locale }
    setCache(cacheKey, result)
    return result
  }

  const contentLocalized = localizeLinkFieldsDeep(localizeDeep(content, locale), locale)

  // From DB: page config and images still come from files (for now)
  const pageConfigRaw = loadJson<any>('nexa-pages', `${slug}.json`)
  const pageConfig = localizeDeep(pageConfigRaw, locale)
  const images = loadJson<any>('images.json')
  const testimonials = loadJson<any>('testimonials.json')
  if (testimonials?.testimonials?.length) contentLocalized.testimonials = testimonials.testimonials

  const result = { content: contentLocalized, pageConfig, images, pageId: slug, locale }
  setCache(cacheKey, result)
  return result
}

export async function loadBlogPost(locale: string, slug: string): Promise<any> {
  const cacheKey = `blog:${locale}:${slug}`
  const cached = getCached(cacheKey)
  if (cached) return cached

  const contentRaw = await loadFromSupabase(locale) || loadJson<Record<string, any>>('content', `${locale}.json`)
  if (!contentRaw) return null
  const content = localizeLinkFieldsDeep(localizeDeep(contentRaw, locale), locale)

  const posts = loadJson<any>('content', 'blog', `posts-${locale}.json`) || loadJson<any>('content', 'blog', 'posts.json')
  if (!posts) return null
  const list = posts.posts || posts
  const post = Array.isArray(list) ? list.find((p: any) => p.slug === slug) : null
  if (!post) return null

  const result = { content, locale, post }
  setCache(cacheKey, result)
  return result
}

export function getPageSlugs(): string[] {
  const pagesDir = join(/* turbopackIgnore: true */ process.cwd(), 'nexa-pages')
  if (!existsSync(pagesDir)) return []
  return readdirSync(pagesDir).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''))
}

export function getBlogSlugs(locale: string): string[] {
  const localizedPosts = join(/* turbopackIgnore: true */ process.cwd(), 'content', 'blog', `posts-${locale}.json`)
  const fallbackPosts = join(/* turbopackIgnore: true */ process.cwd(), 'content', 'blog', 'posts.json')
  const posts = existsSync(localizedPosts)
    ? loadJson<any>('content', 'blog', `posts-${locale}.json`)
    : (existsSync(fallbackPosts) ? loadJson<any>('content', 'blog', 'posts.json') : null)
  if (!posts) return []
  return (posts.posts || posts).filter((p: any) => p.slug).map((p: any) => p.slug)
}
