import { MetadataRoute } from 'next'
import { existsSync, readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { LOCALES } from '../lib/locales'

const BASE = 'https://nexa.paragu-ai.com'

function getStaticSlugs(): string[] {
  const pagesDir = join(process.cwd(), 'nexa-pages')
  if (!existsSync(pagesDir)) return ['home']

  const slugs = readdirSync(pagesDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''))

  return Array.from(new Set(slugs))
}

function getBlogSlugsByLocale(): Record<string, Array<{ slug: string; date?: string }>> {
  const result: Record<string, Array<{ slug: string; date?: string }>> = {}

  for (const loc of LOCALES) {
    const blogPath = join(process.cwd(), 'content', 'blog', `posts-${loc}.json`)
    if (!existsSync(blogPath)) {
      result[loc] = []
      continue
    }

    try {
      const postsJson = JSON.parse(readFileSync(blogPath, 'utf-8'))
      const posts = (postsJson.posts || []) as Array<{ slug?: string; date?: string }>
      result[loc] = posts.filter((p) => p.slug).map((p) => ({ slug: p.slug!, date: p.date }))
    } catch {
      result[loc] = []
    }
  }

  return result
}

function alternatesForPath(path: string) {
  return Object.fromEntries(LOCALES.map((loc) => [loc, `${BASE}/${loc}${path ? `/${path}` : ''}`]))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const staticSlugs = getStaticSlugs()
  const blogSlugsByLocale = getBlogSlugsByLocale()

  for (const slug of staticSlugs) {
    const path = slug === 'home' ? '' : slug
    entries.push({
      url: `${BASE}/es${path ? `/${path}` : ''}`,
      lastModified: new Date(),
      changeFrequency: slug === 'home' ? 'daily' : slug === 'blog' ? 'weekly' : 'monthly',
      priority: slug === 'home' ? 1.0 : slug === 'blog' ? 0.8 : 0.6,
      alternates: {
        languages: {
          'x-default': `${BASE}/es${path ? `/${path}` : ''}`,
          ...alternatesForPath(path),
        },
      },
    })
  }

  // Blog posts per locale (localized slugs)
  for (const locale of LOCALES) {
    for (const post of blogSlugsByLocale[locale] || []) {
      entries.push({
        url: `${BASE}/${locale}/blog/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            'x-default': `${BASE}/${locale}/blog/${post.slug}`,
            ...Object.fromEntries(
              LOCALES.map((l) => {
                const localized = blogSlugsByLocale[l]?.find((p) => p.slug === post.slug)
                return [l, `${BASE}/${l}/blog/${localized?.slug || post.slug}`]
              }),
            ),
          },
        },
      })
    }
  }

  return entries
}
