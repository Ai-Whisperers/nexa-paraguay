import { loadJSON } from './loader'
import { readFileSync } from 'fs'
import { join } from 'path'

const REPO = '/root/nexa-paraguay'
const LOCALES = ['es', 'en', 'nl', 'de']

export function loadPageData(locale: string, slug: string) {
  try {
    const content = JSON.parse(readFileSync(join(REPO, 'content', `${locale}.json`), 'utf-8'))
    let pageConfig: any = null
    const pageId = slug === 'home' ? 'home' : slug
    if (slug !== 'home') {
      try { pageConfig = JSON.parse(readFileSync(join(REPO, 'nexa-pages', `${slug}.json`), 'utf-8')) } catch { return null }
    }
    const images = JSON.parse(readFileSync(join(REPO, 'images.json'), 'utf-8'))
    return { content, pageConfig, images, pageId, locale }
  } catch { return null }
}

export function loadBlogPost(locale: string, slug: string) {
  try {
    const content = JSON.parse(readFileSync(join(REPO, 'content', `${locale}.json`), 'utf-8'))
    const posts = JSON.parse(readFileSync(join(REPO, 'blog', locale, '_posts.json'), 'utf-8'))
    const post = posts.find((p: any) => p.slug === slug)
    if (!post) { 
      // Try loading MDX
      try {
        const mdx = readFileSync(join(REPO, 'blog', locale, `${slug}.mdx`), 'utf-8')
        return { content, locale, post: { slug, body: mdx, title: slug.replace(/-/g,' '), excerpt: '' } }
      } catch { return null }
    }
    return { content, locale, post }
  } catch { return null }
}
