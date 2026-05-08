import { loadBlogPost } from '../../../../lib/page-data'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import type { Metadata } from 'next'

interface Props { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const data = loadBlogPost(locale, slug)
  if (!data?.post) return {}
  return { title: `${data.post.title} — Nexa Paraguay`, description: data.post.excerpt || '' }
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  const data = loadBlogPost(locale, slug)
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

export const revalidate = 3600
