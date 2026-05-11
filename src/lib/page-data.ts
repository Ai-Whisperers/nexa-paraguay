import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'

const REPO = process.cwd()

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
  try {
    return JSON.parse(readFileSync(join(REPO, ...pathSegments), 'utf-8'))
  } catch {
    return null
  }
}

export async function loadPageData(locale: string, slug: string): Promise<any> {
  const cacheKey = `page:${locale}:${slug}`
  const cached = getCached(cacheKey)
  if (cached) return cached

  const content = loadJson<Record<string, any>>('content', `${locale}.json`)
  if (!content) return null

  const pageConfig = loadJson<any>('nexa-pages', `${slug}.json`)
  const images = loadJson<any>('images.json')
  const testimonials = loadJson<any>('testimonials.json')

  if (testimonials?.testimonials?.length) {
    content.testimonials = testimonials.testimonials
  }

  const result = { content, pageConfig, images, pageId: slug, locale }
  setCache(cacheKey, result)
  return result
}

export async function loadBlogPost(locale: string, slug: string): Promise<any> {
  const cacheKey = `blog:${locale}:${slug}`
  const cached = getCached(cacheKey)
  if (cached) return cached

  const content = loadJson<Record<string, any>>('content', `${locale}.json`)
  if (!content) return null

  const posts = loadJson<any>('content', 'blog', `posts-${locale}.json`)
    || loadJson<any>('content', 'blog', 'posts.json')
  if (!posts) return null

  const list = posts.posts || posts
  const post = Array.isArray(list) ? list.find((p: any) => p.slug === slug) : null
  if (!post) return null

  const result = { content, locale, post }
  setCache(cacheKey, result)
  return result
}

export function getPageSlugs(): string[] {
  const pagesDir = join(REPO, 'nexa-pages')
  if (!existsSync(pagesDir)) return []
  return readdirSync(pagesDir).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''))
}

export function getBlogSlugs(locale: string): string[] {
  const path = join(REPO, 'content', 'blog', `posts-${locale}.json`)
  const fallback = join(REPO, 'content', 'blog', 'posts.json')
  const target = existsSync(path) ? path : (existsSync(fallback) ? fallback : null)
  if (!target) return []
  const posts = loadJson<any>(...target.replace(REPO + '/', '').split('/'))
  if (!posts) return []
  return (posts.posts || posts).filter((p: any) => p.slug).map((p: any) => p.slug)
}
