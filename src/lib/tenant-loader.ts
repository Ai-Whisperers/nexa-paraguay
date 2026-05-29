import { Pool, PoolClient } from 'pg'
import { cache } from 'react'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'

// ── Types ─────────────────────────────────────────────────
interface TenantConfig {
  content: any
  pageConfig: Record<string, any>
  images: any
  siteConfig: any
  pageId: string
  locale: string
  _source: 'database' | 'file' | 'cache'
}

interface CacheEntry {
  value: TenantConfig
  timestamp: number
}

// ── Connection Pool ─────────────────────────────────────────
let pool: Pool | undefined

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      host: process.env.PGHOST || 'postgres',
      port: parseInt(process.env.PGPORT || '5432', 10),
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || '',
      database: process.env.PGDATABASE || 'nexa',
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 3000,
    })
  }
  return pool
}

// ── In-memory LRU Cache ────────────────────────────────────
class LRUCache {
  private cache = new Map<string, CacheEntry>()

  constructor(
    private maxSize = 20,
    private ttlMs = 30000,
  ) {}

  get(key: string): TenantConfig | null {
    const entry = this.cache.get(key)
    if (!entry) return null
    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.cache.delete(key)
      return null
    }
    this.cache.delete(key)
    this.cache.set(key, entry)
    return entry.value
  }

  set(key: string, value: TenantConfig): void {
    if (this.cache.size >= this.maxSize) {
      const oldest = this.cache.keys().next().value
      if (oldest !== undefined) this.cache.delete(oldest)
    }
    this.cache.set(key, { value, timestamp: Date.now() })
  }

  invalidate(key: string): void {
    this.cache.delete(key)
  }

  invalidateAll(): void {
    this.cache.clear()
  }
}

const tenantCache = new LRUCache(20, 30000)

// ── File Fallback ──────────────────────────────────────────
function loadFromFile(tenantSlug: string, locale: string): TenantConfig | null {
  try {
    const repo = process.cwd()
    const content = JSON.parse(readFileSync(join(repo, 'content', `${locale}.json`), 'utf-8'))
    const pageConfig: Record<string, any> = {}
    const pagesDir = join(repo, 'nexa-pages')
    if (existsSync(pagesDir)) {
      for (const file of readdirSync(pagesDir).filter(f => f.endsWith('.json'))) {
        pageConfig[file.replace('.json', '')] = JSON.parse(readFileSync(join(pagesDir, file), 'utf-8'))
      }
    }
    const images = JSON.parse(readFileSync(join(repo, 'images.json'), 'utf-8'))
    const siteConfig = JSON.parse(readFileSync(join(repo, 'site.json'), 'utf-8'))

    return { content, pageConfig, images, siteConfig, pageId: 'home', locale, _source: 'file' }
  } catch (err) {
    console.error(`[tenant-loader] File fallback failed for ${tenantSlug}/${locale}:`, (err as Error).message)
    return null
  }
}

// ── Primary Loader: Postgres with cache ───────────────────
async function loadTenantData(tenantSlug: string, locale = 'nl'): Promise<TenantConfig | null> {
  const cacheKey = `${tenantSlug}:${locale}`

  // 1. Check cache
  const cached = tenantCache.get(cacheKey)
  if (cached) return { ...cached, _source: 'cache' }

  // 2. Query Postgres
  try {
    const client: PoolClient = await getPool().connect()
    try {
      const result = await client.query(
        `SELECT content, page_config, images, site_config
         FROM tenant_config
         WHERE tenant_slug = $1 AND is_active = TRUE`,
        [tenantSlug],
      )

      if (result.rows.length === 0) {
        console.warn(`[tenant-loader] No tenant found: ${tenantSlug}, falling back to files`)
        return loadFromFile(tenantSlug, locale)
      }

      const row = result.rows[0]
      const allContent = row.content
      const localeContent = allContent?.[locale] ?? allContent

      const data: TenantConfig = {
        content: localeContent,
        pageConfig: row.page_config,
        images: row.images,
        siteConfig: row.site_config,
        pageId: 'home',
        locale,
        _source: 'database',
      }

      tenantCache.set(cacheKey, data)
      return data
    } finally {
      client.release()
    }
  } catch (err) {
    console.error(`[tenant-loader] DB error for ${tenantSlug}:`, (err as Error).message)
    return loadFromFile(tenantSlug, locale)
  }
}

// ── ISR Revalidation ────────────────────────────────────────
const revalidatePaths = new Set<string>()

export function markForRevalidation(path: string): void {
  revalidatePaths.add(path)
}

export function getRevalidationPaths(): string[] {
  const paths = [...revalidatePaths]
  revalidatePaths.clear()
  return paths
}

// ── ISR Webhook Handler ───────────────────────────────────
export async function handleRevalidateWebhook(req: { body?: Record<string, any> }): Promise<{ revalidated: boolean; paths: number }> {
  const body = req.body || {}
  const tenantSlug = (body.tenant_slug as string) || 'nexa-paraguay'

  tenantCache.invalidateAll()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexa.paragu-ai.com'
  const locales = ['nl', 'en', 'es', 'de']
  const staticPaths = ['', 'sobre', 'servicios', 'por-que-paraguay', 'faq', 'blog', 'contacto']

  const paths: string[] = []
  for (const locale of locales) {
    for (const p of staticPaths) {
      paths.push(p ? `/${locale}/${p}` : `/${locale}`)
    }
  }

  const secret = process.env.REVALIDATION_SECRET || ''
  await Promise.allSettled(
    paths.map(p =>
      fetch(`${baseUrl}/api/revalidate?secret=${secret}&path=${p}`).catch(() => {}),
    ),
  )

  return { revalidated: true, paths: paths.length }
}

// ── React.cache() wrapper ──────────────────────────────────
export const getTenantData = cache(async (slug: string, locale: string) => {
  return loadTenantData(slug, locale)
})

export { loadTenantData, tenantCache }
