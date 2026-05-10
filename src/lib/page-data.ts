import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { loadJSON } from './loader'
import { LOCALES } from './locales'
import { getTenantData } from './tenant-loader'

const REPO = process.cwd()

// ── Multi-tenant loader with Postgres + file fallback ──
// In production: reads from local Postgres with in-memory cache
// Fallback: reads from local JSON files (backward compat, dev, CI)

let _useDatabase: boolean | null = null

function shouldUseDatabase(): boolean {
  if (_useDatabase !== null) return _useDatabase
  try {
    // Check if the "nexa" database is accessible
    const { execSync } = require('child_process')
    const result = execSync(
      `docker exec $(docker ps --filter name=postgres --format '{{.ID}}' | head -1) ` +
      `psql -U postgres -d nexa -t -c "SELECT 1" 2>/dev/null || echo "no"`,
      { timeout: 2000, encoding: 'utf-8' }
    )
    _useDatabase = result.trim() === '1'
  } catch {
    _useDatabase = false
  }
  return _useDatabase
}

export async function loadPageData(locale: string, slug: string) {
  // Try database first (production path)
  if (shouldUseDatabase()) {
    try {
      const data = await getTenantData('nexa-paraguay', locale)
      if (data && data.content) {
        let pageConfig: any = null
        const pageId = slug === 'home' ? 'home' : slug
        if (data.pageConfig && data.pageConfig[pageId]) {
          pageConfig = data.pageConfig[pageId]
        }
        // Inject testimonials
        if (data.content.testimonials) {
          // Already included in the content from DB
        }
        return {
          content: data.content,
          pageConfig: pageConfig || data.pageConfig?.[slug] || null,
          images: data.images,
          pageId,
          locale
        }
      }
    } catch (err) {
      console.warn('[page-data] DB load failed, falling back to file:', err)
    }
  }

  // File fallback (dev, CI, DB unavailable)
  try {
    const content = JSON.parse(readFileSync(join(REPO, 'content', `${locale}.json`), 'utf-8'))
    let pageConfig: any = null
    const pageId = slug === 'home' ? 'home' : slug
    let pageConfigPath = slug
    if (slug === 'home') pageConfigPath = 'home'
    try { pageConfig = JSON.parse(readFileSync(join(REPO, 'nexa-pages', `${pageConfigPath}.json`), 'utf-8')) } catch {}
    const images = JSON.parse(readFileSync(join(REPO, 'images.json'), 'utf-8'))
    try {
      const testimonials = JSON.parse(readFileSync(join(REPO, 'testimonials.json'), 'utf-8'))
      content.testimonials = testimonials.testimonials
    } catch {}
    return { content, pageConfig, images, pageId, locale }
  } catch { return null }
}

export function loadBlogPost(locale: string, slug: string) {
  try {
    const content = JSON.parse(readFileSync(join(REPO, 'content', `${locale}.json`), 'utf-8'))
    const localePath = join(REPO, 'content', 'blog', `posts-${locale}.json`)
    const fallbackPath = join(REPO, 'content', 'blog', 'posts.json')
    const postsPath = existsSync(localePath) ? localePath : (existsSync(fallbackPath) ? fallbackPath : null)
    if (!postsPath) return null
    const posts = JSON.parse(readFileSync(postsPath, 'utf-8'))
    const list = posts.posts || posts
    const post = list.find((p: any) => p.slug === slug)
    if (!post) {
      try {
        const mdx = readFileSync(join(REPO, 'content', 'blog', locale, `${slug}.mdx`), 'utf-8')
        return { content, locale, post: { slug, body: mdx, title: slug.replace(/-/g,' '), excerpt: '' } }
      } catch { return null }
    }
    return { content, locale, post }
  } catch { return null }
}
