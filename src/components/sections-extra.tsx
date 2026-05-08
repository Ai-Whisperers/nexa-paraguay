'use client'

import React from 'react'
import { resolveImage } from './content'
import { SectionComponentProps } from '../types'

export function FaqSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  if (!items.length) return null
  const [open, setOpen] = React.useState<number | null>(null)
  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-[800px] mx-auto px-4">
        {d.eyebrow && <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2 text-center">{d.eyebrow}</p>}
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8 text-center">{d.title}</h2>}
        {items.map((item: any, i: number) => {
          const isOpen = open === i
          const question = item.q || item.pregunta || item.question || item.title
          const answer = item.a || item.respuesta || item.answer || item.description || item.body
          if (!question || !answer) return null
          return (
            <div key={i} className={`mb-3 rounded-lg overflow-hidden bg-white transition-colors ${isOpen ? 'border border-accent' : 'border border-border'}`}>
              <button onClick={() => setOpen(isOpen ? null : i)}
                className={`w-full px-5 py-4 border-none cursor-pointer flex justify-between items-center font-bold text-primary text-sm text-left transition-colors ${isOpen ? 'bg-[#faf8f5]' : 'bg-none'}`}>
                <span>{question}</span>
                <span className={`text-accent text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {isOpen && <div className="px-5 pb-5 text-text text-sm leading-relaxed border-t border-border">{answer}</div>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function BlogSection({ pageContent, data, images, locale: _locale }: SectionComponentProps) {
  const d = data || pageContent || {}
  const posts = d.posts || []
  const locale = _locale || 'es'
  if (!posts.length) return null
  return (
    <section className="py-24">
      <div className="max-w-[900px] mx-auto px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8 text-center">{d.title}</h2>}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {posts.map((post: any, i: number) => {
            const postImg = post.image ? resolveImage(images, `@img:blog.${post.image}`) : (post.coverImage || '')
            return (
              <article key={i} className="border border-border rounded-2xl overflow-hidden bg-white">
                {postImg && <img src={postImg} alt={post.title} className="w-full h-[180px] object-cover" />}
                <div className="p-5">
                  {post.date && <span className="text-xs text-accent font-semibold">{post.date}</span>}
                  <h3 className="text-base font-bold text-primary my-2">{post.title}</h3>
                  {post.excerpt && <p className="text-text-muted text-sm leading-relaxed mb-3">{post.excerpt}</p>}
                  {post.slug && <a href={`/${locale}/blog/${post.slug}`} className="text-accent font-bold text-xs no-underline border-b-2 border-accent">Leer más →</a>}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function TeamSection({ pageContent, data, images }: SectionComponentProps) {
  const d = data || pageContent || {}
  const members = d.members || d.items || []
  if (!members.length) return null
  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-[900px] mx-auto text-center px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8">{d.title}</h2>}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
          {members.map((m: any, i: number) => {
            const img = resolveImage(images, m.memberImage || m.image || m.imageUrl)
            return (
              <div key={i} className="p-6 bg-white rounded-2xl shadow-card">
                {img && <img src={img} alt={m.name} className="w-20 h-20 object-cover rounded-full mx-auto mb-4 block" />}
                <h4 className="font-bold text-primary mb-1">{m.name || m.role}</h4>
                {m.role && m.name && <p className="text-accent text-xs font-semibold mb-2">{m.role}</p>}
                {m.description && <p className="text-text-muted text-sm leading-relaxed">{m.description}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function PrivacyAccordion({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  if (!items.length) return null
  const [open, setOpen] = React.useState<number | null>(null)
  return (
    <section className="py-24">
      <div className="max-w-[800px] mx-auto px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8">{d.title}</h2>}
        {items.map((item: any, i: number) => {
          const isOpen = open === i
          const title = item.q || item.title || item.pregunta
          const body = item.a || item.body || item.description
          if (!title || !body) return null
          return (
            <div key={i} className="mb-3 border border-border rounded-lg overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : i)}
                className={`w-full px-5 py-4 border-none cursor-pointer flex justify-between items-center font-bold text-sm text-left transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-surface-alt text-primary'}`}>
                <span>{title}</span>
                <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {isOpen && <div className="p-5 text-text text-sm leading-relaxed">{body}</div>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function GlossarySection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  if (!items.length) return null
  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-[800px] mx-auto px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8 text-center">{d.title}</h2>}
        <div className="flex flex-col gap-3">
          {items.map((item: any, i: number) => (
            <div key={i} className="p-4 bg-white rounded-lg border border-border">
              <h4 className="font-bold text-primary mb-1 text-base">{item.term || item.q || item.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed">{item.definition || item.a || item.description || item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function NewsletterSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  if (!d.title) return null
  return (
    <section className="py-12 px-4 bg-primary text-white">
      <div className="max-w-[600px] mx-auto text-center">
        <h3 className="text-lg font-bold mb-2">{d.title}</h3>
        {d.description && <p className="text-sm text-white/80 mb-6">{d.description}</p>}
        <div className="flex gap-2 flex-wrap justify-center">
          <input type="email" placeholder={d.placeholder || "tu@email.com"}
            className="px-4 py-3 rounded-full border-none flex-1 min-w-[200px] text-sm" />
          <button className="px-6 py-3 bg-accent text-primary rounded-full border-none font-bold cursor-pointer text-sm hover:opacity-90">
            {d.buttonText || "Suscribirme"}
          </button>
        </div>
      </div>
    </section>
  )
}

export function StorySection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const paragraphs = d.paragraphs || []
  if (!d.title && !paragraphs.length) return null
  return (
    <section className="py-24">
      <div className="max-w-[700px] mx-auto px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-6 text-center">{d.title}</h2>}
        {paragraphs.map((p: string, i: number) => (
          <p key={i} className="text-text leading-relaxed text-sm mb-4">{p}</p>
        ))}
      </div>
    </section>
  )
}

export function PillarsSection({ pageContent, data, images }: SectionComponentProps) {
  const d = data || pageContent || {}
  const pillars = d.pillars || d.items || []
  if (!pillars.length) return null
  return (
    <section className="py-24 bg-primary text-white">
      <div className="max-w-6xl mx-auto text-center px-4">
        {d.eyebrow && <p className="text-xs text-accent uppercase tracking-[2px] mb-2">{d.eyebrow}</p>}
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-playfair font-bold mb-3">{d.title}</h2>}
        <div className="w-[60px] h-[3px] bg-accent mx-auto mb-8" />
        {d.honestNote && <p className="text-sm text-white/80 italic max-w-[600px] mx-auto mb-8">{d.honestNote}</p>}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          {pillars.map((p: any, i: number) => {
            const img = resolveImage(images, p.imageUrl || p.image)
            return (
              <div key={i} className="p-6 rounded-lg text-left backdrop-blur-[10px]"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,169,110,0.12)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                {img && <img src={img} alt={p.title} loading="lazy" className="w-full h-[180px] object-cover rounded-sm mb-3" />}
                <h3 className="font-bold text-accent mb-2 text-lg">{p.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{p.description}</p>
                {p.bullets && <ul className="mt-3 pl-4 text-xs text-white/65">
                  {p.bullets.map((b: string, j: number) => <li key={j} className="mb-1">{b}</li>)}
                </ul>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function PageHeroSection({ pageContent, data, images }: SectionComponentProps) {
  const d = data || pageContent || {}
  const headline = d.headline || d.title
  if (!headline) return null
  const bgImage = d.backgroundImage ? resolveImage(images, d.backgroundImage) : ''
  return (
    <section className={`py-24 text-center text-white bg-cover bg-center`}
      style={{ background: bgImage ? `linear-gradient(135deg, rgba(27,42,74,0.85), rgba(27,42,74,0.65)), url(${bgImage})` : 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)' }}
    >
      <div className="max-w-[700px] mx-auto px-4">
        <h1 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold leading-tight mb-3">{headline}</h1>
        {(d.subheadline || d.subtitle) && <p className="text-base text-white/85 leading-relaxed">{d.subheadline || d.subtitle}</p>}
      </div>
    </section>
  )
}

export function HighlightSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || d.pillars || []
  if (!items.length) return null
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-[800px] mx-auto text-center">
        {d.eyebrow && <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2">{d.eyebrow}</p>}
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-playfair font-bold text-primary mb-8">{d.title}</h2>}
        <div className="flex justify-center gap-[clamp(1.5rem,3vw,3rem)] flex-wrap">
          {items.map((s: any, i: number) => (
            <div key={i} className="text-center">
              {s.value && <div className="text-3xl font-extrabold text-primary">{s.value}</div>}
              {s.label && <div className="text-sm text-text-muted mt-1">{s.label}</div>}
              {!s.value && s.title && <h4 className="text-lg font-bold text-primary mb-1">{s.title}</h4>}
              {!s.value && s.description && <p className="text-text-muted text-sm leading-relaxed max-w-[300px]">{s.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ComparisonSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  const columns = d.columns
  if (!items.length && !columns) return null
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto text-center px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-6">{d.title}</h2>}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-primary text-white">
                {columns?.map((col: string, i: number) => <th key={i} className="p-3 text-left font-bold">{col}</th>)}
                {!columns && items[0] && Object.keys(items[0]).map((k, i) => <th key={i} className="p-3 text-left font-bold">{k}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((row: any, i: number) => (
                <tr key={i} className={`border-b border-border ${i % 2 ? 'bg-surface-alt' : 'bg-white'}`}>
                  {columns ? columns.map((col: string, j: number) => <td key={j} className="p-3 text-text">{row[col] || row[j] || ''}</td>)
                    : Object.values(row).map((v: any, j: number) => <td key={j} className="p-3 text-text">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export function GuidesSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  if (!d.title && !items.length) return null
  return (
    <section className="py-24">
      <div className="max-w-[800px] mx-auto text-center px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-2">{d.title}</h2>}
        {d.subtitle && <p className="text-text-muted mb-8">{d.subtitle}</p>}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {items.map((item: any, i: number) => (
            <div key={i} className="p-6 bg-surface-alt rounded-lg border border-border">
              <h4 className="font-bold text-primary mb-2">{item.title}</h4>
              {item.description && <p className="text-text-muted text-sm leading-relaxed mb-4">{item.description}</p>}
              {item.fileUrl ? <a href={item.fileUrl} className="inline-block px-5 py-2 bg-primary text-white rounded-full text-xs font-bold no-underline">↓ {item.ctaText || "Descargar"}</a>
                : <span className="text-xs text-text-muted italic">Próximamente</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BookingEmbedSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  if (!d.title) return null
  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-[800px] mx-auto text-center px-4">
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-3">{d.title}</h2>
        {d.subtitle && <p className="text-text-muted mb-8">{d.subtitle}</p>}
        {d.features?.length && <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 mb-8">
          {d.features.map((f: string, i: number) => <div key={i} className="p-4 bg-white rounded-lg shadow-sm"><p className="text-primary font-semibold text-sm">{f}</p></div>)}
        </div>}
        <a href={d.ctaHref || 'https://wa.me/595982515138?text=Quiero%20agendar%20una%20consulta'}
          className="inline-block px-10 py-4 rounded-full font-bold text-base no-underline hover:opacity-90"
          style={{ background: '#25D366', color: 'white' }}>{d.ctaText || 'Agendar consulta gratuita'}</a>
        {d.calendarNote && <p className="mt-3 text-xs text-text-muted italic">{d.calendarNote}</p>}
      </div>
    </section>
  )
}

export function ContactDetailsSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  if (!d.whatsapp && !d.email) return null
  return (
    <section className="py-24">
      <div className="max-w-[600px] mx-auto text-center px-4">
        {d.title && <h2 className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-bold text-primary mb-6">{d.title}</h2>}
        <div className="flex flex-col gap-4">
          {d.whatsapp && <a href={`https://wa.me/${d.whatsapp.replace(/[^0-9]/g,'')}`} target="_blank" className="flex items-center justify-center gap-3 p-4 rounded-lg no-underline font-semibold text-white" style={{ background: '#25D366' }}>
            <span className="w-7 h-7 flex items-center justify-center bg-white/20 rounded-full text-xs">WA</span> {d.whatsapp}
          </a>}
          {d.email && <a href={`mailto:${d.email}`} className="flex items-center justify-center gap-3 p-4 rounded-lg bg-primary text-white no-underline font-semibold">
            <span className="w-7 h-7 flex items-center justify-center bg-white/15 rounded-full text-xs">@</span> {d.email}
          </a>}
          {d.address && <p className="text-text-muted text-sm flex items-center justify-center gap-2"><span className="text-accent font-bold">⌂</span> {d.address}{d.neighborhood ? ', ' + d.neighborhood : ''}</p>}
          {d.phone && !d.whatsapp && <p className="text-text-muted text-sm"><span className="text-accent">✆</span> {d.phone}</p>}
          {d.hours && <p className="text-text-muted text-xs"><span className="text-accent">◷</span> {typeof d.hours === 'object' ? Object.values(d.hours).join(' · ') : d.hours}</p>}
        </div>
      </div>
    </section>
  )
}

export function GallerySection({ pageContent, data, images }: SectionComponentProps) {
  const d = data || pageContent || {}
  const photos = d.images || d.items || []
  if (!d.title && !photos.length) return null
  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-6xl mx-auto text-center px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-4">{d.title}</h2>}
        {d.subtitle && <p className="text-text-muted mb-8">{d.subtitle}</p>}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {photos.map((photo: any, i: number) => {
            const src = typeof photo === 'string' ? photo : resolveImage?.(images, photo.src || photo.imageUrl || '') || photo.src || photo.imageUrl || ''
            return (
              <div key={i} className="rounded-lg overflow-hidden shadow-md">
                {src && <img src={src} alt={photo.alt || photo.caption || ''} className="w-full h-[220px] object-cover block" />}
                {photo.caption && <p className="p-3 bg-white text-text-muted text-xs m-0">{photo.caption}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function FaqSearchSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const allItems = d.items || []
  const [open, setOpen] = React.useState<number | null>(null)
  const [search, setSearch] = React.useState('')
  const items = search ? allItems.filter((item: any) => {
    const q = (item.q || item.pregunta || item.question || item.title || '').toLowerCase()
    const a = (item.a || item.respuesta || item.answer || item.description || item.body || '').toLowerCase()
    return q.includes(search.toLowerCase()) || a.includes(search.toLowerCase())
  }) : allItems
  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-[800px] mx-auto px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-4 text-center">{d.title}</h2>}
        <div className="mb-6 relative">
          <input type="text" placeholder={d.searchPlaceholder || 'Buscar preguntas...'} value={search} onChange={e => setSearch(e.target.value)}
            className="w-full py-3 pl-10 pr-4 border border-border rounded-full text-sm outline-none bg-white" />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
        </div>
        <p className="text-xs text-text-muted mb-4 text-center">{items.length} de {allItems.length} preguntas</p>
        {items.map((item: any, i: number) => {
          const isOpen = open === i
          const question = item.q || item.pregunta || item.question || item.title
          const answer = item.a || item.respuesta || item.answer || item.description || item.body
          if (!question || !answer) return null
          return (
            <div key={i} className="mb-2 border border-border rounded-lg overflow-hidden bg-white">
              <button onClick={() => setOpen(isOpen ? null : i)}
                className="w-full px-5 py-4 border-none bg-none cursor-pointer flex justify-between items-center font-bold text-primary text-sm text-left">
                <span>{question}</span>
                <span className={`text-accent text-lg transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {isOpen && <div className="px-5 pb-5 text-text text-sm leading-relaxed border-t border-border">{answer}</div>}
            </div>
          )
        })}
        {items.length === 0 && <p className="text-center text-text-muted text-sm">No se encontraron preguntas. <button onClick={() => setSearch('')} className="bg-none border-none text-accent cursor-pointer font-bold underline">Limpiar búsqueda</button></p>}
      </div>
    </section>
  )
}

export function ServiceDetailSection({ pageContent, data, images }: SectionComponentProps) {
  const d = data || pageContent || {}
  const groups = d.groups || []
  if (!groups.length) return null
  return (
    <section className="py-24">
      <div className="max-w-[1000px] mx-auto text-center px-4">
        {d.eyebrow && <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2">{d.eyebrow}</p>}
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8">{d.title}</h2>}
        {groups.map((group: any, i: number) => (
          <div key={i} className="mb-12">
            {i > 0 && <div className="w-[60px] h-[2px] bg-accent mx-auto mb-10" />}
            <h3 className="text-lg font-bold text-primary mb-1">{group.title}</h3>
            {group.subtitle && <p className="text-text-muted text-sm mb-4">{group.subtitle}</p>}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 text-left">
              {group.items.map((item: any, j: number) => {
                const img = resolveImage(images, item.image)
                return (
                  <div key={j} className="p-6 bg-surface-alt rounded-lg border-l-[3px] border-accent" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    {img && <img src={img} alt={item.title} loading="lazy" className="w-full h-[140px] object-cover rounded-sm mb-3" />}
                    <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                    <p className="text-text-muted text-sm leading-relaxed mb-2">{item.description}</p>
                    {item.benefits && <ul className="list-none p-0 mt-2">
                      {item.benefits.map((b: string, k: number) => (
                        <li key={k} className="text-xs text-text py-0.5 flex gap-2 items-baseline">
                          <span className="text-accent font-bold">✓</span> {b}
                        </li>
                      ))}
                    </ul>}
                    {item.ctaText && <a href={item.ctaHref} className="inline-block mt-3 text-accent font-bold text-xs no-underline border-b-2 border-accent">{item.ctaText}</a>}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function PressReleasesListSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || d.pressReleases || []
  if (!items.length) return null
  return (
    <section className="py-24">
      <div className="max-w-[800px] mx-auto px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-2 text-center">{d.title}</h2>}
        {d.subtitle && <p className="text-text-muted text-center mb-8">{d.subtitle}</p>}
        {items.map((item: any, i: number) => (
          <article key={i} className="p-6 mb-4 bg-white rounded-lg border border-border" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {item.date && <span className="text-xs text-accent font-semibold block mb-1">{item.date}</span>}
            <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
            {item.summary && <p className="text-text-muted text-sm leading-relaxed mb-3">{item.summary}</p>}
            {item.link && <a href={item.link} className="text-accent font-bold text-xs no-underline border-b-2 border-accent">{item.ctaText || 'Leer más →'}</a>}
          </article>
        ))}
      </div>
    </section>
  )
}

export function IntakeWizardSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const steps = d.steps || []
  const [currentStep, setCurrentStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<string, string>>({})
  const [showResult, setShowResult] = React.useState(false)
  if (!steps.length) return null
  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [steps[currentStep].key]: value }
    setAnswers(newAnswers)
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
    else setShowResult(true)
  }
  const handleRestart = () => { setCurrentStep(0); setAnswers({}); setShowResult(false) }
  if (showResult) {
    const recommended = d.recommendedTier || 'business'
    return (
      <section className="py-24 bg-surface-alt">
        <div className="max-w-[600px] mx-auto text-center px-4">
          <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-4">{d.resultTitle || 'Tu recomendación'}</h2>
          <p className="text-lg font-bold text-primary">{recommended}</p>
          <p className="text-text-muted text-sm mt-4 mb-6">{d.resultDescription || 'Basado en tus respuestas'}</p>
          {(d.ctaText || d.recommendedCta) && <a href={d.ctaHref || `/${d.locale || 'es'}/contacto`} className="inline-block px-8 py-3 bg-accent text-primary rounded-full font-bold text-base no-underline">{d.ctaText || d.recommendedCta}</a>}
          <p><button onClick={handleRestart} className="mt-6 bg-none border-none text-accent cursor-pointer font-bold underline text-sm">{d.restartLabel || 'Reiniciar'}</button></p>
        </div>
      </section>
    )
  }
  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-[600px] mx-auto text-center px-4">
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_: any, i: number) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i <= currentStep ? 'bg-accent' : 'bg-border'}`} />
          ))}
        </div>
        <p className="text-sm text-text-muted mb-6">{d.subtitle}</p>
        <h3 className="text-xl font-bold text-primary mb-6">{steps[currentStep].question}</h3>
        <div className="flex flex-col gap-3">
          {(steps[currentStep].options || []).map((opt: string, i: number) => (
            <button key={i} onClick={() => handleSelect(opt)}
              className="w-full p-4 bg-white rounded-lg border border-border cursor-pointer font-semibold text-primary text-sm hover:border-accent transition-colors">
              {opt}
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-text-muted italic">{d.disclaimer || ''}</p>
      </div>
    </section>
  )
}
