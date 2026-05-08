import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { loadJSON } from './loader'

const REPO = process.cwd()
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
