const fs = require('fs')
const path = require('path')

interface CacheEntry { data: any; timestamp: number }
const cache = new Map<string, CacheEntry>()
const TTL = 60_000

export function loadJSON(dir: string, file: string): any {
  const fullPath = path.join(dir, file)
  const now = Date.now()
  const cached = cache.get(fullPath)
  if (cached && (now - cached.timestamp) < TTL) return cached.data
  try {
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
    cache.set(fullPath, { data, timestamp: now })
    return data
  } catch { return null }
}

export function loadContentJSON(dir: string, file: string): any {
  const fullPath = path.join(dir, file)
  const cached = cache.get(fullPath)
  if (cached && (Date.now() - cached.timestamp) < TTL) return cached.data
  const data = loadJSON(dir, file)
  if (data) cache.set(fullPath, { data, timestamp: Date.now() })
  return data
}
