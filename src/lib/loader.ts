import { supabaseAdmin, TENANT_SLUG, STORAGE_BASE } from './supabase'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const REPO = process.cwd()

// ── In-memory LRU cache ──
interface CacheEntry { data: any; timestamp: number }
const cache = new Map<string, CacheEntry>()
const TTL = 30_000 // 30s between renders

function getCached(key: string): any | null {
  const entry = cache.get(key)
  if (entry && (Date.now() - entry.timestamp) < TTL) return entry.data
  return null
}

function setCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() })
}

// Keep map bounded at 20 entries
function pruneCache() {
  if (cache.size > 20) {
    const entries = [...cache.entries()].sort((a, b) => a[1].timestamp - b[1].timestamp)
    const toDelete = entries.slice(0, cache.size - 20)
    for (const [key] of toDelete) cache.delete(key)
  }
}

// ── Tenant config loader (Supabase → file fallback) ──
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
  } catch (e) {
    // Supabase unavailable — fall through to file
  }

  // Fallback: read from files
  try {
    const site = JSON.parse(readFileSync(join(REPO, 'site.json'), 'utf-8'))
    const content: Record<string, any> = {}
    for (const locale of site.locales || ['es', 'en', 'nl', 'de']) {
      try {
        content[locale] = JSON.parse(readFileSync(join(REPO, 'content', `${locale}.json`), 'utf-8'))
      } catch {}
    }
    const images = JSON.parse(readFileSync(join(REPO, 'images.json'), 'utf-8'))
    const testimonials = JSON.parse(readFileSync(join(REPO, 'testimonials.json'), 'utf-8'))
    const pages: Record<string, any> = {}
    const pagesDir = join(REPO, 'nexa-pages')
    if (existsSync(pagesDir)) {
      const fs = require('fs')
      const path = require('path')
      for (const f of fs.readdirSync(pagesDir)) {
        if (f.endsWith('.json')) {
          const name = f.replace('.json', '')
          pages[name] = JSON.parse(readFileSync(join(pagesDir, f), 'utf-8'))
        }
      }
    }
    const blogPosts: Record<string, any> = {}
    const blogDir = join(REPO, 'content', 'blog')
    if (existsSync(blogDir)) {
      const fs = require('fs')
      for (const f of fs.readdirSync(blogDir)) {
        if (f.startsWith('posts') && f.endsWith('.json')) {
          blogPosts[f] = JSON.parse(readFileSync(join(blogDir, f), 'utf-8'))
        }
      }
    }

    _tenantConfig = {
      tenant_slug: TENANT_SLUG,
      site,
      content,
      images,
      testimonials,
      pages,
      blog_posts: blogPosts,
    }
    return _tenantConfig
  } catch {
    return null
  }
}

// ── Public loaders (keep same API as before) ──

export async function loadJSONAsync(dir: string, file: string): Promise<any> {
  const key = `json:${dir}/${file}`
  const cached = getCached(key)
  if (cached) return cached

  try {
    const data = JSON.parse(readFileSync(join(dir, file), 'utf-8'))
    setCache(key, data)
    pruneCache()
    return data
  } catch { return null }
}

// Keep synchronous version for compatibility
export function loadJSON(dir: string, file: string): any {
  const key = `json:${dir}/${file}`
  const cached = getCached(key)
  if (cached) return cached
  try {
    const data = JSON.parse(readFileSync(join(dir, file), 'utf-8'))
    setCache(key, data)
    pruneCache()
    return data
  } catch { return null }
}

export function loadContentJSON(dir: string, file: string): any {
  return loadJSON(dir, file)
}

// ── Page data from Supabase ──

export async function loadPageDataFromDB(locale: string, slug: string): Promise<any> {
  const config = await loadTenantConfig()
  if (!config) return null

  const content = config.content?.[locale] || config.content?.['es'] || null
  if (!content) return null

  const pageId = slug === 'home' ? 'home' : slug
  const pageConfig = config.pages?.[pageId] || null
  const images = config.images || {}
  const testimonials = config.testimonials?.testimonials || []

  // Inject testimonials into content
  if (testimonials.length) {
    content.testimonials = testimonials
  }

  return { content, pageConfig, images, pageId, locale }
}

// ── Blog post from Supabase ──

export async function loadBlogPostFromDB(locale: string, slug: string): Promise<any> {
  const config = await loadTenantConfig()
  if (!config) return null

  const content = config.content?.[locale] || config.content?.['es']
  if (!content) return null

  const posts = config.blog_posts?.[`posts-${locale}.json`]
    || config.blog_posts?.['posts.json']
    || null

  if (!posts) return null

  const list = posts.posts || posts
  const post = Array.isArray(list) ? list.find((p: any) => p.slug === slug) : null
  if (!post) return null

  return { content, locale, post }
}

// ── Image URL helper ──

export function getImageUrl(storagePath: string): string {
  if (!storagePath) return '/images/brand/placeholder.png'
  // If already an absolute URL, return as-is
  if (storagePath.startsWith('http://') || storagePath.startsWith('https://')) return storagePath
  // Strip leading /images/ to get the storage path
  const cleanPath = storagePath.replace(/^\/images\//, '')
  return `${STORAGE_BASE}/${cleanPath}`
}
