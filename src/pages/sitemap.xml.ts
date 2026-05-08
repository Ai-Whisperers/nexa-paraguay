import { loadJSON } from '../lib/loader'
import { readFileSync, readdirSync } from 'fs'

const BASE_URL = 'https://nexa.paragu-ai.com'
const LOCALES = ['es', 'en', 'nl', 'de']

function getAllPageSlugs(): string[] {
  const pagesDir = process.cwd() + '/nexa-pages'
  const files = readdirSync(pagesDir)
  return files
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
    .filter(slug => slug !== 'home') // home is the root path
}

function getXmlSitemap(): string {
  const slugs = getAllPageSlugs()

  const urls: string[] = []

  // Add home page for each locale
  for (const locale of LOCALES) {
    urls.push(`  <url>
    <loc>${BASE_URL}/${locale}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`)

    // Add page slugs for this locale
    for (const slug of slugs) {
      urls.push(`  <url>
    <loc>${BASE_URL}/${locale}/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`)
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`
}

export function getServerSideProps({ res }: any) {
  const sitemap = getXmlSitemap()
  res.setHeader('Content-Type', 'text/xml; charset=utf-8')
  res.write(sitemap)
  res.end()
  return { props: {} }
}

export default function SitemapXml() {
  return null
}
