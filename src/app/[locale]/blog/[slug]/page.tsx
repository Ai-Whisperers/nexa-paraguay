import { Suspense } from 'react'
import { loadBlogPost, getBlogSlugs } from '@/lib/page-data'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'
import { LOCALES } from '@/lib/locales'
import { ShareButtons } from '@/components/ShareButtons'

interface Props { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const locale of LOCALES) {
    const slugs = getBlogSlugs(locale)
    for (const slug of slugs) params.push({ locale, slug })
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const data = await loadBlogPost(locale, slug)
  if (!data?.post) return { title: 'Blog | Nexa Paraguay' }
  const { post } = data
  return {
    title: `${post.title} | Blog | Nexa Paraguay`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      images: post.image ? [{ url: post.image, width: 1200, height: 630 }] : undefined,
    },
    alternates: { canonical: `https://nexaparaguay.com/${locale}/blog/${slug}` },
  }
}

function LoadingSkeleton() {
  return (
    <div className="font-inter animate-pulse">
      <div className="h-16 bg-primary/5" />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="h-4 w-24 bg-accent/20 rounded mb-4" />
        <div className="h-10 bg-primary/10 rounded-lg w-3/4 mb-4" />
        <div className="h-4 bg-primary/5 rounded w-1/3 mb-8" />
        <div className="space-y-3">
          {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-4 bg-primary/5 rounded w-full" />)}
        </div>
      </div>
    </div>
  )
}

async function BlogContent({ locale, slug }: { locale: string; slug: string }) {
  const data = await loadBlogPost(locale, slug)
  if (!data?.post) return <div className="text-center p-16 text-text-muted">Post not found</div>
  const { content, post } = data
  const baseUrl = `https://nexaparaguay.com/${locale}`
  const postUrl = `${baseUrl}/blog/${post.slug}`

  // JSON-LD schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.title,
    datePublished: post.date,
    author: post.author ? { "@type": "Person", name: post.author } : undefined,
    publisher: { "@type": "Organization", name: "Nexa Paraguay", url: "https://nexaparaguay.com" },
    image: post.image,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {content?.navigation && <Header navigation={content.navigation} locale={locale} />}
      <main className="max-w-3xl mx-auto px-4 py-16">
        {post.date && <span className="text-sm font-semibold text-accent uppercase tracking-wider">{post.date}</span>}
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{post.title}</h1>
        {post.author && <p className="text-text-muted text-sm mb-6">Por {post.author}</p>}
        {post.excerpt && <p className="text-lg italic text-text-muted mb-8 leading-relaxed">{post.excerpt}</p>}
        <div className="prose prose-stone max-w-none leading-relaxed text-text-muted">
          {(post.body || '').split('\\n').filter(Boolean).map((p: string, i: number) => <p key={i} className="mb-4">{p}</p>)}
        </div>
        {post.tags && <div className="flex gap-2 flex-wrap mt-8">{post.tags.map((t: string, i: number) => <span key={i} className="px-3 py-1 bg-surface-alt rounded-full text-xs text-text-muted">{t}</span>)}</div>}
        <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
          <ShareButtons url={postUrl} title={post.title} />
          <a href={`/${locale}/blog`} className="text-accent font-semibold hover:underline">&larr; Volver al blog</a>
        </div>
      </main>
      <Footer footer={content?.footer} />
    </>
  )
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <BlogContent locale={locale} slug={slug} />
    </Suspense>
  )
}
