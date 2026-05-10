// @ts-nocheck
// ── Supabase/Postgres Data Loader ──
// Replaces direct file reads with Postgres query + in-memory LRU cache
// Supports ISR: stale-while-revalidate pattern with configurable TTL

const { Pool } = require('pg');
const { cache } = require('react');


// ── Connection Pool ──
let pool: any;

function getPool() {
  if (!pool) {
    const config = {
      host: process.env.PGHOST || 'postgres',
      port: parseInt(process.env.PGPORT || '5432'),
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || '',
      database: process.env.PGDATABASE || 'nexa',
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 3000,
    };
    pool = new Pool(config);
  }
  return pool;
}

// ── In-memory LRU Cache ──
class LRUCache {
  constructor(maxSize = 10, ttlMs = 30000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.cache.delete(key);
      return null;
    }
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      // Delete oldest (first item)
      const oldest = this.cache.keys().next().value;
      this.cache.delete(oldest);
    }
    this.cache.set(key, { value, timestamp: Date.now() });
  }

  invalidate(key) {
    this.cache.delete(key);
  }

  invalidateAll() {
    this.cache.clear();
  }
}

const tenantCache = new LRUCache(20, 30000); // 20 tenants, 30s TTL

// ── File Fallback ──
// If Postgres is unavailable, fall back to local JSON files
function loadFromFile(tenantSlug, locale) {
  try {
    const fs = require('fs');
    const path = require('path');
    const repo = process.cwd();
    
    const content = JSON.parse(fs.readFileSync(path.join(repo, 'content', `${locale}.json`), 'utf-8'));
    const pageConfig = {};
    const pagesDir = path.join(repo, 'nexa-pages');
    for (const file of fs.readdirSync(pagesDir).filter(f => f.endsWith('.json'))) {
      pageConfig[file.replace('.json', '')] = JSON.parse(fs.readFileSync(path.join(pagesDir, file), 'utf-8'));
    }
    const images = JSON.parse(fs.readFileSync(path.join(repo, 'images.json'), 'utf-8'));
    const siteConfig = JSON.parse(fs.readFileSync(path.join(repo, 'site.json'), 'utf-8'));
    
    return { content, pageConfig, images, pageId: 'home', locale, siteConfig, _source: 'file' };
  } catch (err) {
    console.error(`[tenant-loader] File fallback failed for ${tenantSlug}/${locale}:`, err.message);
    return null;
  }
}

// ── Primary Loader: Postgres with cache ──
async function loadTenantData(tenantSlug, locale = 'nl') {
  const cacheKey = `${tenantSlug}:${locale}`;
  
  // 1. Check cache
  const cached = tenantCache.get(cacheKey);
  if (cached) return { ...cached, _source: 'cache' };
  
  // 2. Query Postgres
  try {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        `SELECT content, page_config, images, site_config 
         FROM tenant_config 
         WHERE tenant_slug = $1 AND is_active = TRUE`,
        [tenantSlug]
      );
      
      if (result.rows.length === 0) {
        console.warn(`[tenant-loader] No tenant found: ${tenantSlug}, falling back to files`);
        return loadFromFile(tenantSlug, locale);
      }
      
      const row = result.rows[0];
      
      // The content JSONB has ALL locales nested. Extract the requested one.
      const allContent = row.content;
      const localeContent = allContent[locale] || allContent;
      
      const data = {
        content: localeContent,
        pageConfig: row.page_config,
        images: row.images,
        siteConfig: row.site_config,
        pageId: 'home',
        locale,
        _source: 'database'
      };
      
      // 3. Cache it
      tenantCache.set(cacheKey, data);
      
      return data;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error(`[tenant-loader] DB error for ${tenantSlug}:`, err.message);
    return loadFromFile(tenantSlug, locale);
  }
}

// ── Next.js ISR Helpers ──
const revalidatePaths = new Set();

function markForRevalidation(path) {
  revalidatePaths.add(path);
}

function getRevalidationPaths() {
  const paths = [...revalidatePaths];
  revalidatePaths.clear();
  return paths;
}

// ── ISR Webhook Handler ──
// Called by Supabase/Postgres when content changes
async function handleRevalidateWebhook(req) {
  const body = req.body || {};
  const tenantSlug = body.tenant_slug || 'nexa-paraguay';
  
  // Invalidate cache
  tenantCache.invalidateAll();
  
  // Trigger Next.js revalidation
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexa.paragu-ai.com';
  const locales = ['nl', 'en', 'es', 'de'];
  
  const paths = [];
  for (const locale of locales) {
    paths.push(`/${locale}`);
    paths.push(`/${locale}/sobre`);
    paths.push(`/${locale}/servicios`);
    paths.push(`/${locale}/por-que-paraguay`);
    paths.push(`/${locale}/faq`);
    paths.push(`/${locale}/blog`);
    paths.push(`/${locale}/contacto`);
  }
  
  // Revalidate via Next.js API route
  const results = await Promise.allSettled(
    paths.map(p => 
      fetch(`${baseUrl}/api/revalidate?secret=${process.env.REVALIDATION_SECRET || ''}&path=${p}`)
        .catch(() => {})
    )
  );
  
  return { revalidated: true, paths: paths.length };
}

// ── React.cache() wrapper for dedup within same render ──
const getTenantData = cache(async (slug, locale) => {
  return loadTenantData(slug, locale);
});

module.exports = {
  loadTenantData,
  getTenantData,
  handleRevalidateWebhook,
  markForRevalidation,
  getRevalidationPaths,
  tenantCache,
};
