'use client'

import { useEffect, useState, useCallback } from 'react'

// ── Types ──────────────────────────────────────────────
interface BlogPost {
  id?: string
  locale: string
  slug: string
  title: string
  excerpt: string
  body_md: string
  category: string
  tags: string[]
  cover_url: string
  author: string
  reading_min: number
  published: boolean
  date_published?: string
  updated_at?: string
}

// ── Supabase config (must match site) ───────────────────
const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SB_ANON  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const SB_SVC   = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const TENANT  = 'nexa-paraguay'

// Server-side admin client (bypasses RLS)
function getAdminClient() {
  if (!SB_URL || !SB_SVC) return null
  // Dynamic require to keep this client-only
  const { createClient } = require('@supabase/supabase-js')
  return createClient(SB_URL, SB_SVC)
}

// ── Locale copy ─────────────────────────────────────────
const T = {
  es: { title:'Gestor de Contenido', posts:'Artículos', newPost:'Nuevo artículo', locale:'Idioma', slug:'Slug', titleF:'Título', excerpt:'Extracto', body:'Contenido (Markdown)', category:'Categoría', tags:'Etiquetas', cover:'Imagen de portada', author:'Autor', minRead:'Minutos de lectura', published:'Publicado', save:'Guardar', saving:'Guardando...', saved:'✓ Guardado', error:'Error al guardar', delete:'Eliminar', confirmDel:'¿Eliminar este artículo?', publishedYes:'Sí', publishedNo:'No', allPosts:'Todos', search:'Buscar...' },
  en: { title:'Content Manager', posts:'Posts', newPost:'New post', locale:'Language', slug:'Slug', titleF:'Title', excerpt:'Excerpt', body:'Content (Markdown)', category:'Category', tags:'Tags', cover:'Cover image', author:'Author', minRead:'Reading minutes', published:'Published', save:'Save', saving:'Saving...', saved:'✓ Saved', error:'Save failed', delete:'Delete', confirmDel:'Delete this post?', publishedYes:'Yes', publishedNo:'No', allPosts:'All', search:'Search...' },
  nl: { title:'Contentbeheer', posts:'Berichten', newPost:'Nieuw bericht', locale:'Taal', slug:'Slug', titleF:'Titel', excerpt:'Uittreksel', body:'Inhoud (Markdown)', category:'Categorie', tags:'Labels', cover:'Omslagfoto', author:'Auteur', minRead:'Minuten lezen', published:'Gepubliceerd', save:'Opslaan', saving:'Opslaan...', saved:'✓ Opgeslagen', error:'Opslaan mislukt', delete:'Verwijderen', confirmDel:'Dit bericht verwijderen?', publishedYes:'Ja', publishedNo:'Nee', allPosts:'Alle', search:'Zoeken...' },
  de: { title:'Inhaltsverwaltung', posts:'Beiträge', newPost:'Neuer Beitrag', locale:'Sprache', slug:'Slug', titleF:'Titel', excerpt:'Auszug', body:'Inhalt (Markdown)', category:'Kategorie', tags:'Tags', cover:'Titelbild', author:'Autor', minRead:'Minuten Lesen', published:'Veröffentlicht', save:'Speichern', saving:'Speichern...', saved:'✓ Gespeichert', error:'Speichern fehlgeschlagen', delete:'Löschen', confirmDel:'Diesen Beitrag löschen?', publishedYes:'Ja', publishedNo:'Nein', allPosts:'Alle', search:'Suchen...' },
}

const LOCALES = ['es', 'en', 'nl', 'de']
const EMPTY: BlogPost = { locale: 'en', slug: '', title: '', excerpt: '', body_md: '', category: '', tags: [], cover_url: '', author: '', reading_min: 3, published: false }

// ── Component ──────────────────────────────────────────
export default function BlogCMS() {
  const [locale, setLocale] = useState<'es'|'en'|'nl'|'de'>('en')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [status, setStatus] = useState<'idle'|'saving'|'saved'|'error'>('idle')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const t = T[locale]

  // Load posts
  const loadPosts = useCallback(async () => {
    if (!SB_URL || !SB_SVC) { setPosts([]); return }
    const sb = getAdminClient()
    if (!sb) return
    setLoading(true)
    const { data, error } = await sb
      .from('blog_posts')
      .select('id,locale,slug,title,excerpt,category,tags,cover_url,author,reading_min,published,date_published,updated_at')
      .eq('tenant_slug', TENANT)
      .order('updated_at', { ascending: false })
    setLoading(false)
    if (!error && data) setPosts(data)
  }, [])

  useEffect(() => { loadPosts() }, [loadPosts])

  const filtered = posts.filter(p =>
    !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.slug?.toLowerCase().includes(search.toLowerCase())
  )

  // New post
  const newPost = () => setEditing({ ...EMPTY, locale })

  // Edit a post
  const editPost = (post: BlogPost) => {
    setEditing({ ...post, body_md: post.body_md || '' })
  }

  // Save (upsert via RPC)
  const save = async () => {
    if (!editing || !editing.title.trim() || !editing.slug.trim()) return
    if (!SB_URL || !SB_SVC) { setStatus('error'); return }

    setStatus('saving')
    const sb = getAdminClient()
    if (!sb) { setStatus('error'); return }

    const { error } = await sb.rpc('upsert_blog_post', {
      p_locale:    editing.locale,
      p_slug:      editing.slug,
      p_title:     editing.title,
      p_excerpt:   editing.excerpt,
      p_body_md:   editing.body_md,
      p_category:  editing.category,
      p_tags:      editing.tags,
      p_cover_url: editing.cover_url,
      p_author:    editing.author,
      p_reading_min: editing.reading_min,
      p_published: editing.published,
    })

    if (error) {
      console.error('[BLOG CMS SAVE ERROR]', error)
      setStatus('error')
    } else {
      setStatus('saved')
      await loadPosts()
      setTimeout(() => setStatus('idle'), 2500)
    }
  }

  // Delete
  const deletePost = async (post: BlogPost) => {
    if (!confirm(t.confirmDel)) return
    if (!SB_URL || !SB_SVC) return
    const sb = getAdminClient()
    if (!sb) return
    await sb.from('blog_posts').delete().eq('id', post.id)
    await loadPosts()
    if (editing?.id === post.id) setEditing(null)
  }

  const set = (field: keyof BlogPost, value: any) =>
    setEditing(prev => prev ? { ...prev, [field]: value } : prev)

  return (
    <div className='min-h-screen bg-surface-alt p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>

        {/* Header */}
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <h1 className='text-2xl font-bold text-primary'>{t.title}</h1>
          <div className='flex items-center gap-3'>
            <select
              value={locale}
              onChange={e => setLocale(e.target.value as any)}
              className='px-3 py-2 border border-border rounded-lg text-primary bg-white text-sm'
            >
              {LOCALES.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
            </select>
            <button onClick={newPost} className='px-4 py-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-secondary/80 text-sm'>
              + {t.newPost}
            </button>
          </div>
        </div>

        <div className='flex gap-6'>
          {/* Post list */}
          <div className='w-72 shrink-0 space-y-3'>
            <input
              type='search'
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.search}
              className='w-full px-3 py-2 border border-border rounded-lg text-sm text-primary bg-white'
            />
            {loading && <p className='text-text-muted text-sm'>Loading...</p>}
            {filtered.map(post => (
              <div
                key={post.id}
                onClick={() => editPost(post)}
                className={`p-3 rounded-xl border cursor-pointer transition ${editing?.id === post.id || (!editing && !post.id) ? 'border-secondary bg-secondary/5' : 'border-border bg-white hover:border-secondary/50'}`}
              >
                <p className='text-sm font-semibold text-primary line-clamp-2'>{post.title || <span className='text-text-muted italic'>Sin título</span>}</p>
                <p className='text-xs text-text-muted mt-1'>{post.slug} • {post.locale}</p>
                <div className='flex items-center gap-2 mt-2'>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {post.published ? t.publishedYes : t.publishedNo}
                  </span>
                  {post.category && <span className='text-xs text-text-muted'>{post.category}</span>}
                </div>
              </div>
            ))}
            {filtered.length === 0 && !loading && (
              <p className='text-text-muted text-sm text-center py-8'>
                {search ? 'No results' : t.allPosts + ': 0'}
              </p>
            )}
          </div>

          {/* Editor */}
          <div className='flex-1 min-w-0'>
            {editing ? (
              <div className='bg-white rounded-2xl border border-border p-6 space-y-5'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-lg font-bold text-primary'>{editing.id ? 'Edit' : t.newPost}</h2>
                  <div className='flex items-center gap-3'>
                    {status === 'saved' && <span className='text-green-600 text-sm font-medium'>{t.saved}</span>}
                    {status === 'error'  && <span className='text-red-600   text-sm font-medium'>{t.error}</span>}
                    <button onClick={save} disabled={status === 'saving'} className='px-5 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-60 text-sm'>
                      {status === 'saving' ? t.saving : t.save}
                    </button>
                    {editing.id && (
                      <button onClick={() => deletePost(editing)} className='px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 text-sm'>
                        {t.delete}
                      </button>
                    )}
                  </div>
                </div>

                {/* Meta row */}
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                  <div>
                    <label className='block text-xs font-medium text-primary mb-1'>{t.locale}</label>
                    <select value={editing.locale} onChange={e => set('locale', e.target.value)} className='w-full px-3 py-2 border border-border rounded-lg text-sm bg-white'>
                      {LOCALES.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className='block text-xs font-medium text-primary mb-1'>{t.category}</label>
                    <input value={editing.category} onChange={e => set('category', e.target.value)} placeholder=' residency' className='w-full px-3 py-2 border border-border rounded-lg text-sm' />
                  </div>
                  <div>
                    <label className='block text-xs font-medium text-primary mb-1'>{t.minRead}</label>
                    <input type='number' value={editing.reading_min} onChange={e => set('reading_min', parseInt(e.target.value) || 0)} min={1} max={60} className='w-full px-3 py-2 border border-border rounded-lg text-sm' />
                  </div>
                  <div>
                    <label className='block text-xs font-medium text-primary mb-1'>{t.published}</label>
                    <select value={editing.published ? '1' : '0'} onChange={e => set('published', e.target.value === '1')} className='w-full px-3 py-2 border border-border rounded-lg text-sm bg-white'>
                      <option value='1'>{t.publishedYes}</option>
                      <option value='0'>{t.publishedNo}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className='block text-xs font-medium text-primary mb-1'>{t.slug}</label>
                  <input value={editing.slug} onChange={e => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/--+/g, '-'))} placeholder='my-post-slug' className='w-full px-3 py-2 border border-border rounded-lg text-sm font-mono' />
                </div>
                <div>
                  <label className='block text-xs font-medium text-primary mb-1'>{t.titleF}</label>
                  <input value={editing.title} onChange={e => set('title', e.target.value)} placeholder='Post title' className='w-full px-3 py-2 border border-border rounded-lg text-sm font-semibold' />
                </div>
                <div>
                  <label className='block text-xs font-medium text-primary mb-1'>{t.excerpt}</label>
                  <textarea value={editing.excerpt} onChange={e => set('excerpt', e.target.value)} rows={2} placeholder='Brief excerpt shown in blog listing...' className='w-full px-3 py-2 border border-border rounded-lg text-sm resize-none' />
                </div>
                <div>
                  <label className='block text-xs font-medium text-primary mb-1'>{t.cover}</label>
                  <input value={editing.cover_url} onChange={e => set('cover_url', e.target.value)} placeholder='https://...' className='w-full px-3 py-2 border border-border rounded-lg text-sm font-mono' />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-xs font-medium text-primary mb-1'>{t.author}</label>
                    <input value={editing.author} onChange={e => set('author', e.target.value)} placeholder='Willem van der Berg' className='w-full px-3 py-2 border border-border rounded-lg text-sm' />
                  </div>
                  <div>
                    <label className='block text-xs font-medium text-primary mb-1'>{t.tags} (comma-separated)</label>
                    <input value={(editing.tags || []).join(', ')} onChange={e => set('tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder='residency, banking, paraguay' className='w-full px-3 py-2 border border-border rounded-lg text-sm' />
                  </div>
                </div>
                <div>
                  <label className='block text-xs font-medium text-primary mb-1'>{t.body}</label>
                  <textarea value={editing.body_md} onChange={e => set('body_md', e.target.value)} rows={20} placeholder='# My Post&#10;&#10;Write your content in Markdown...' className='w-full px-3 py-2 border border-border rounded-lg text-sm font-mono resize-none' />
                </div>
              </div>
            ) : (
              <div className='bg-white rounded-2xl border border-border p-12 text-center'>
                <p className='text-text-muted'>Select a post or click <strong>{t.newPost}</strong> to start writing.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}