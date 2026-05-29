// ── Content Resolvers ──
// @ai-whisperers/content is NOT published on npm (E404).
// These functions were previously re-exported from it.
// They are now resolved inline — the package contained just 4 re-export functions.
// TODO: Replace with proper implementations or publish @ai-whisperers/content.

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const REPO = process.cwd()

function loadJson<T>(...pathSegments: string[]): T | null {
  try {
    return JSON.parse(readFileSync(join(REPO, ...pathSegments), 'utf-8'))
  } catch {
    return null
  }
}

export function resolveContent(locale: string, key: string): any {
  const content = loadJson<Record<string, any>>('content', `${locale}.json`)
  if (!content) return null
  const parts = key.split('.')
  let current: any = content
  for (const part of parts) {
    if (current?.[part] !== undefined) current = current[part]
    else return null
  }
  return current
}

export function resolveImage(images: any, ref: string | undefined): string {
  if (!ref || !images) return ''
  const key = ref.replace('@img:', '').replace('@src:', '')
  const parts = key.split('.')
  let obj: any = images
  for (const p of parts) {
    if (obj?.[p]) obj = obj[p]
    else return ''
  }
  return obj?.src || obj || ''
}

export function resolveConfig(key: string): any {
  const site = loadJson<any>('site.json')
  if (!site) return null
  const parts = key.split('.')
  let current: any = site
  for (const part of parts) {
    if (current?.[part] !== undefined) current = current[part]
    else return null
  }
  return current
}

export function localizedField(obj: any, locale: string): string {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  if (typeof obj === 'object' && obj[locale]) return obj[locale]
  // fallback chain (prefer English before other locales)
  const fallbacks = ['en', 'es', 'nl', 'de']
  for (const fb of fallbacks) {
    if (obj[fb]) return obj[fb]
  }
  return Object.values(obj)[0] as string || ''
}
