import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'
import { supabaseAdmin, TENANT_SLUG } from '@/lib/supabase'

const REPO = process.cwd()

// ── In-memory LRU cache ──
interface CacheEntry { data: any; timestamp: number }
const cache = new Map<string, CacheEntry>()
const TTL = 30_000 // 30s

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

// ── Tenant config (loaded once) ──
let _tenantConfig: any = null

async function loadTenantConfig(): Promise<any> {
  if (_tenantConfig) return _tenantConfig

  // Try Supabase first
  try {
    const { data, error } = await supabaseAdmin
      .from('tenant_config')
      .select('*')
      .eq('tenant_slug', TENANT_SLUG)
      .single()

    if (data && !error) {
      _tenantConfig = data
      return data
    }
  } catch {
    // Supabase unavailable — file fallback
  }

  // File fallback
  try {
    const site = JSON.parse(readFileSync(join(REPO, 'site.json'), 'utf-8'))
    const content: Record<string, any> = {}
    for (const locale of site.locales || ['es', 'en', 'nl', 'de']) {
      try { content[locale] = JSON.parse(readFileSync(join(REPO, 'content', `${locale}.json`), 'utf-8')) } catch {}
    }
    const images = JSON.parse(readFileSync(join(REPO, 'images.json'), 'utf-8'))
    const testimonials = JSON.parse(readFileSync(join(REPO, 'testimonials.json'), 'utf-8'))
    const pages: Record<string, any> = {}
    const pagesDir = join(REPO, 'nexa-pages')
    if (existsSync(pagesDir)) {
      for (const f of readdirSync(pagesDir)) {
        if (f.endsWith('.json')) pages[f.replace('.json', '')] = JSON.parse(readFileSync(join(pagesDir, f), 'utf-8'))
      }
    }
    const blogPosts: Record<string, any> = {}
    const blogDir = join(REPO, 'content', 'blog')
    if (existsSync(blogDir)) {
      for (const f of readdirSync(blogDir)) {
        if (f.startsWith('posts') && f.endsWith('.json')) blogPosts[f] = JSON.parse(readFileSync(join(blogDir, f), 'utf-8'))
      }
    }
    _tenantConfig = { tenant_slug: TENANT_SLUG, site, content, images, testimonials, pages, blog_posts: blogPosts }
    return _tenantConfig
  } catch { return null }
}

// ── loadPageData: async version supporting Supabase + file fallback ──
export async function loadPageData(locale: string, slug: string): Promise<any> {
  const cacheKey = `page:${locale}:${slug}`
  const cached = getCached(cacheKey)
  if (cached) return cached

  // Try Postgres via pg Pool (local Docker network) first
  if (process.env.USE_DB === 'true' || process.env.PGHOST) {
    try {
      const { loadTenantData } = require('./tenant-loader')
      const dbData = await loadTenantData(TENANT_SLUG, locale)
      if (dbData && dbData.content) {
        const pageId = slug === 'home' ? 'home' : slug
        const pageConfig = dbData.pageConfig?.[pageId] || null
        const images = dbData.images || {}
        const result = { content: dbData.content, pageConfig, images, pageId, locale }
        setCache(cacheKey, result)
        return result
      }
    } catch (err) {
      console.warn('[page-data] DB loader failed, fallback to Supabase/client:', (err as Error).message)
    }
  }

  // Try Supabase via JS client (cloud Supabase) as secondary
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const config = await loadTenantConfig()
      if (config) {
        const content = config.content?.[locale] || config.content?.['es']
        if (content) {
          const pageId = slug === 'home' ? 'home' : slug
          const pageConfig = config.pages?.[pageId] || null
          const images = config.images || {}
          const testimonials = config.testimonials?.testimonials || []
          if (testimonials.length) content.testimonials = testimonials
          const result = { content, pageConfig, images, pageId, locale }
          setCache(cacheKey, result)
          return result
        }
      }
    } catch {
      console.warn('[page-data] Supabase fallback failed')
    }
  }

  // File fallback (dev, CI, no DB available)
  const config = await loadTenantConfig()
  if (!config) return null

  const content = config.content?.[locale] || config.content?.['es']
  if (!content) return null

  const pageId = slug === 'home' ? 'home' : slug
  const pageConfig = config.pages?.[pageId] || null
  const images = config.images || {}
  const testimonials = config.testimonials?.testimonials || []

  if (testimonials.length) content.testimonials = testimonials

  const result = { content, pageConfig, images, pageId, locale }
  setCache(cacheKey, result)
  return result
}

// ── loadBlogPost: async version ──
export async function loadBlogPost(locale: string, slug: string): Promise<any> {
  const cacheKey = `blog:${locale}:${slug}`
  const cached = getCached(cacheKey)
  if (cached) return cached

  const config = await loadTenantConfig()
  if (!config) return null

  const content = config.content?.[locale] || config.content?.['es']
  if (!content) return null

  const posts = config.blog_posts?.[`posts-${locale}.json`] || config.blog_posts?.['posts.json'] || null
  if (!posts) return null

  const list = posts.posts || posts
  const post = Array.isArray(list) ? list.find((p: any) => p.slug === slug) : null
  if (!post) return null

  const result = { content, locale, post }
  setCache(cacheKey, result)
  return result
}

// ── Sync helpers for generateStaticParams (always file-based at build time) ──
export function getPageSlugs(): string[] {
  const pagesDir = join(REPO, 'nexa-pages')
  if (!existsSync(pagesDir)) return []
  return readdirSync(pagesDir).filter((f: string) => f.endsWith('.json')).map((f: string) => f.replace('.json', ''))
}

export function getBlogSlugs(locale: string): string[] {
  const localePath = join(REPO, 'content', 'blog', `posts-${locale}.json`)
  const fallbackPath = join(REPO, 'content', 'blog', 'posts.json')
  const path = existsSync(localePath) ? localePath : (existsSync(fallbackPath) ? fallbackPath : null)
  if (!path) return []
  try {
    const posts = JSON.parse(readFileSync(path, 'utf-8'))
    return (posts.posts || posts).filter((p: any) => p.slug).map((p: any) => p.slug)
  } catch { return [] }
}
