'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'

const POSTS_PER_PAGE = 9

export function BlogSection({ data, pageContent, locale }: any) {
  const section = data || pageContent?.blog
  if (!section) return null

  const allPosts = section.posts || section.items || []
  if (!allPosts.length) return null

  const lang = locale || 'es'
  const [page, setPage] = useState(1)
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>()
    cats.add('all')
    allPosts.forEach((p: any) => { if (p.category) cats.add(p.category) })
    return Array.from(cats)
  }, [allPosts])

  // Filter and paginate
  const filtered = useMemo(() => {
    if (categoryFilter === 'all') return allPosts
    return allPosts.filter((p: any) => p.category === categoryFilter)
  }, [allPosts, categoryFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pagePosts = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  // Labels
  const labels: Record<string, Record<string, string>> = {
    es: { all: 'Todos', prev: 'Anterior', next: 'Siguiente', page: 'Página' },
    en: { all: 'All', prev: 'Previous', next: 'Next', page: 'Page' },
    nl: { all: 'Alle', prev: 'Vorige', next: 'Volgende', page: 'Pagina' },
    de: { all: 'Alle', prev: 'Vorherige', next: 'Nächste', page: 'Seite' },
  }
  const l = labels[lang] || labels.es

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        {/* Category filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategoryFilter(cat); setPage(1) }}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  categoryFilter === cat
                    ? 'bg-accent text-white'
                    : 'bg-surface-alt text-text-muted hover:bg-surface-alt/70'
                }`}
              >
                {cat === 'all' ? l.all : cat}
              </button>
            ))}
          </div>
        )}

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pagePosts.map((post: any, i: number) => {
            const href = post.href || `/${lang}/blog/${post.slug}`
            const rawImg = post.image !== 'none' ? (post.image || post.image?.src) : null
            const imgSrc = rawImg || '/images/blog/residencia-2024.webp'

            return (
              <Link
                key={i}
                href={href}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border/40 hover:shadow-md transition-all duration-200 flex flex-col"
              >
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentPage <= 1
                  ? 'text-text-muted/30 cursor-not-allowed'
                  : 'text-text-muted hover:text-primary hover:bg-surface-alt'
              }`}
            >
              &larr; {l.prev}
            </button>
            <span className="text-xs text-text-muted">
              {l.page} {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentPage >= totalPages
                  ? 'text-text-muted/30 cursor-not-allowed'
                  : 'text-text-muted hover:text-primary hover:bg-surface-alt'
              }`}
            >
              {l.next} &rarr;
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
