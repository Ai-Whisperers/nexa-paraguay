'use client'

import Link from 'next/link'

export function BlogSection({ data, pageContent, locale }: any) {
  const section = data || pageContent?.blog
  if (!section) return null

  const posts = section.posts || section.items || []
  if (!posts.length) return null

  const lang = locale || 'es'

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post: any, i: number) => {
            const href = post.href || `/${lang}/blog/${post.slug}`
            const rawImg = post.image !== 'none' ? (post.image || post.image?.src) : null
            const imgSrc = rawImg || '/images/blog/residencia-2024.webp'

            return (
              <Link
                key={i}
                href={href}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border/40 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                {/* Image */}
                <div className="aspect-[16/10] bg-surface-alt overflow-hidden relative">
                  <img
                    src={imgSrc}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.category && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-primary/80 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
                      {post.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {post.title && (
                    <h3 className="font-bold text-primary text-sm leading-snug group-hover:text-accent transition-colors duration-200 mb-2">
                      {post.title}
                    </h3>
                  )}
                  {post.excerpt && (
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-3 flex-1">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-[10px] text-text-muted/70 mt-auto pt-2 border-t border-border/30">
                    {post.date && <span>{post.date}</span>}
                    {post.readingMinutes && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-text-muted/30" />
                        <span>{post.readingMinutes} min de lectura</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
