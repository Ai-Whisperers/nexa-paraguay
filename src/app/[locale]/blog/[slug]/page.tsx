import { Suspense } from 'react'
import { loadBlogPost, getBlogSlugs } from '@/lib/page-data'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'
import { LOCALES } from '@/lib/locales'

interface Props { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const locale of LOCALES) {
    const slugs = getBlogSlugs(locale)
    for (const slug of slugs) params.push({ locale, slug })
  }
  return params
}

export function generateMetadata({ params }: Props): Metadata {
  return { title: 'Nexa Paraguay' }
}

function BlogSkeleton() {
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
  return (
    <>
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
        <div className="mt-8 text-center"><a href={`/${locale}/blog`} className="text-accent font-semibold hover:underline">&larr; Volver al blog</a></div>
      </main>
      <Footer footer={content?.footer} />
    </>
  )
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogContent locale={locale} slug={slug} />
    </Suspense>
  )
}
