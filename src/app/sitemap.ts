import { MetadataRoute } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'

const BASE = 'https://nexa.paragu-ai.com'
const LOCALES = ['es', 'en', 'nl', 'de']

function getPages(): string[] {
  try {
    const dir = join(process.cwd(), 'nexa-pages')
    return require('fs').readdirSync(dir).filter((f: string) => f.endsWith('.json')).map((f: string) => f.replace('.json', ''))
  } catch { return ['programas', 'nosotros', 'contacto', 'faq', 'glosario'] }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['home', ...getPages().filter(p => p !== 'home')]
  const entries: MetadataRoute.Sitemap = []
  for (const locale of LOCALES) {
    for (const page of pages) {
      const url = `${BASE}/${locale}/${page === 'home' ? '' : page}`
      entries.push({
        url: url.replace(/\/$/, ''),
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: page === 'home' ? 1 : 0.8,
        alternates: { languages: Object.fromEntries(LOCALES.map(l => [l, `${BASE}/${l}/${page === 'home' ? '' : page}`.replace(/\/$/, '')])) },
      })
    }
  }
  return entries
}
