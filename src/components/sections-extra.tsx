import React from 'react'
import { resolveImage } from './content'
import { theme } from '../theme'
import { SectionComponentProps } from '../types'
import { useRouter } from 'next/router'

const c = theme.colors, r = theme.radii, s = theme.spacing, sz = theme.sizes

export function FaqSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  if (!items.length) return null
  const [open, setOpen] = React.useState<number | null>(null)
  return (
    <section style={{ padding: s.section, background: c.bg }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {d.eyebrow && <p style={{ fontSize:'0.85rem',color:c.textMuted,textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem',textAlign:'center' }}>{d.eyebrow}</p>}
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:c.primary,marginBottom:'2rem',textAlign:'center' }}>{d.title}</h2>}
        {items.map((item: any, i: number) => {
          const isOpen = open === i
          const question = item.q || item.pregunta || item.question || item.title
          const answer = item.a || item.respuesta || item.answer || item.description || item.body
          if (!question || !answer) return null
          return (
            <div key={i} style={{ marginBottom: '0.75rem', border: `1px solid ${isOpen ? c.accent : c.border}`, borderRadius: r.md, overflow: 'hidden', background: c.white, transition: 'border-color 0.2s' }}>
              <button onClick={() => setOpen(isOpen ? null : i)} style={{ width:'100%', padding:'1rem 1.25rem', border:'none', background: isOpen ? '#faf8f5' : 'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', fontWeight:700, color:c.primary, fontSize:'0.95rem', textAlign:'left', transition: 'background 0.2s' }}>
                <span>{question}</span>
                <span style={{ color: c.accent, fontSize:'1.2rem', transition:'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
              </button>
              {isOpen && <div style={{ padding:'0 1.25rem 1.25rem', color: c.text, fontSize:'0.9rem', lineHeight:1.7, borderTop:`1px solid ${c.border}` }}>{answer}</div>}
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
    <section style={{ padding: s.section }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:c.primary,marginBottom:'2rem',textAlign:'center' }}>{d.title}</h2>}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.5rem' }}>
          {posts.map((post: any, i: number) => {
            const postImg = post.image ? resolveImage(images, `@img:blog.${post.image}`) : (post.coverImage || '')
            return (
              <article key={i} style={{ border:`1px solid ${c.border}`,borderRadius:r.lg,overflow:'hidden',background:c.white }}>
                {postImg && <img src={postImg} alt={post.title} style={{ width:'100%',height:'180px',objectFit:'cover' }} />}
                <div style={{ padding:'1.25rem' }}>
                  {post.date && <span style={{ fontSize:'0.8rem',color:c.accent,fontWeight:600 }}>{post.date}</span>}
                  <h3 style={{ fontSize:'1.05rem',fontWeight:700,color:c.primary,margin:'0.5rem 0' }}>{post.title}</h3>
                  {post.excerpt && <p style={{ color:c.textMuted,fontSize:'0.9rem',lineHeight:1.5,marginBottom:'0.75rem' }}>{post.excerpt}</p>}
                  {post.slug && <a href={`/${locale}/blog/${post.slug}`} style={{ color:c.accent,fontWeight:700,fontSize:'0.85rem',textDecoration:'none',borderBottom:`2px solid ${c.accent}` }}>Leer más →</a>}
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
    <section style={{ padding: s.section, background: c.bg }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:c.primary,marginBottom:'2rem' }}>{d.title}</h2>}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'2rem' }}>
          {members.map((m: any, i: number) => {
            const img = resolveImage(images, m.memberImage || m.image || m.imageUrl)
            return (
              <div key={i} style={{ padding:s.card,background:c.white,borderRadius:r.lg,boxShadow:theme.shadows.card }}>
                {img && <img src={img} alt={m.name} style={{ width:'80px',height:'80px',objectFit:'cover',borderRadius:'50%',margin:'0 auto 1rem',display:'block' }} />}
                <h4 style={{ fontWeight:700,color:c.primary,marginBottom:'0.25rem' }}>{m.name || m.role}</h4>
                {m.role && m.name && <p style={{ color:c.accent,fontSize:'0.85rem',fontWeight:600,marginBottom:'0.5rem' }}>{m.role}</p>}
                {m.description && <p style={{ color:c.textMuted,fontSize:'0.9rem',lineHeight:1.5 }}>{m.description}</p>}
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
    <section style={{ padding: s.section }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:c.primary,marginBottom:'2rem' }}>{d.title}</h2>}
        {items.map((item: any, i: number) => {
          const isOpen = open === i
          const title = item.q || item.title || item.pregunta
          const body = item.a || item.body || item.description
          if (!title || !body) return null
          return (
            <div key={i} style={{ marginBottom:'0.75rem', border:`1px solid ${c.border}`, borderRadius:r.md, overflow:'hidden' }}>
              <button onClick={() => setOpen(isOpen ? null : i)} style={{ width:'100%', padding:'1rem 1.25rem', border:'none', background: isOpen ? c.primary : c.bg, cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', fontWeight:700, color: isOpen ? c.white : c.primary, fontSize:'0.95rem', textAlign:'left' }}>
                <span>{title}</span>
                <span style={{ transition:'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
              </button>
              {isOpen && <div style={{ padding:'1.25rem', color: c.text, fontSize:'0.9rem', lineHeight:1.7 }}>{body}</div>}
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
    <section style={{ padding: s.section, background: c.bg }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:c.primary,marginBottom:'2rem',textAlign:'center' }}>{d.title}</h2>}
        <div style={{ display:'flex',flexDirection:'column',gap:'0.75rem' }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ padding:s.cardSm,background:c.white,borderRadius:r.md,border:`1px solid ${c.border}` }}>
              <h4 style={{ fontWeight:700,color:c.primary,marginBottom:'0.25rem',fontSize:'1rem' }}>{item.term || item.q || item.title}</h4>
              <p style={{ color:c.textMuted,fontSize:'0.9rem',lineHeight:1.6 }}>{item.definition || item.a || item.description || item.body}</p>
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
    <section style={{ padding: '3rem 1rem', background: c.primary, color: c.white }}>
      <div style={{ maxWidth: sz.contentForm, margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{ fontSize:'1.2rem',fontWeight:700,marginBottom:'0.5rem' }}>{d.title}</h3>
        {d.description && <p style={{ fontSize:'0.9rem',opacity:0.8,marginBottom:'1.5rem' }}>{d.description}</p>}
        <div style={{ display:'flex',gap:'0.5rem',flexWrap:'wrap',justifyContent:'center' }}>
          <input type="email" placeholder={d.placeholder || "tu@email.com"} style={{ padding:s.input,borderRadius:r.full,border:'none',flex:1,minWidth:'200px',fontSize:'0.9rem' }} />
          <button style={{ padding:'0.75rem 1.5rem',background:c.accent,color:c.primary,borderRadius:r.full,border:'none',fontWeight:700,cursor:'pointer',fontSize:'0.9rem' }}>{d.buttonText || "Suscribirme"}</button>
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
    <section style={{ padding: s.section }}>
      <div style={{ maxWidth: sz.contentNarrow, margin: '0 auto' }}>
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:c.primary,marginBottom:'1.5rem',textAlign:'center' }}>{d.title}</h2>}
        {paragraphs.map((p: string, i: number) => (
          <p key={i} style={{ color: c.text, lineHeight:1.8, fontSize:'0.95rem', marginBottom:'1rem' }}>{p}</p>
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
    <section style={{ padding: s.sectionDark, background: c.primary, color: c.white }}>
      <div style={{ maxWidth: sz.contentWide, margin: '0 auto', textAlign: 'center' }}>
        {d.eyebrow && <p style={{ fontSize: '0.85rem', color: c.accent, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{d.eyebrow}</p>}
        {d.title && <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, marginBottom: '0.75rem' }}>{d.title}</h2>}
        <div style={{ width: '60px', height: '3px', background: c.accent, margin: '0 auto 2rem' }} />
        {d.honestNote && <p style={{ fontSize: '0.9rem', opacity: 0.8, fontStyle: 'italic', maxWidth: '600px', margin: '0 auto 2rem' }}>{d.honestNote}</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {pillars.map((p: any, i: number) => {
            const img = resolveImage(images, p.imageUrl || p.image)
            return (
              <div key={i} style={{ padding: s.card, background: 'rgba(255,255,255,0.06)', borderRadius: r.md, textAlign: 'left', border: '1px solid rgba(201,169,110,0.12)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                {img && <img src={img} alt={p.title} loading="lazy" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: r.sm, marginBottom: '0.75rem' }} />}
                <h3 style={{ fontWeight: 700, color: c.accent, marginBottom: '0.5rem', fontSize: '1.1rem' }}>{p.title}</h3>
                <p style={{ fontSize:'0.9rem',color:'rgba(255,255,255,0.8)',lineHeight:1.5 }}>{p.description}</p>
                {p.bullets && <ul style={{ marginTop:'0.75rem',paddingLeft:'1rem',fontSize:'0.85rem',color:'rgba(255,255,255,0.65)' }}>
                  {p.bullets.map((b: string, j: number) => <li key={j} style={{ marginBottom:'0.25rem' }}>{b}</li>)}
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
    <section style={{ padding: s.sectionLg, background: bgImage ? `${c.gradientOverlay}, url(${bgImage})` : c.gradient, backgroundSize: 'cover', backgroundPosition: 'center', color: c.white, textAlign: 'center' }}>
      <div style={{ maxWidth: sz.contentNarrow, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem' }}>{headline}</h1>
        {(d.subheadline || d.subtitle) && <p style={{ fontSize: '1rem', opacity: 0.85, lineHeight: 1.6 }}>{d.subheadline || d.subtitle}</p>}
      </div>
    </section>
  )
}

export function HighlightSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || d.pillars || []
  if (!items.length) return null
  return (
    <section style={{ padding: '3rem 1rem', background: c.white }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        {d.eyebrow && <p style={{ fontSize: '0.85rem', color: c.textMuted, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{d.eyebrow}</p>}
        {d.title && <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: c.primary, marginBottom: '2rem' }}>{d.title}</h2>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem, 3vw, 3rem)', flexWrap: 'wrap' }}>
        {items.map((s: any, i: number) => (
          <div key={i} style={{ textAlign: 'center' }}>
            {s.value && <div style={{ fontSize: '2rem', fontWeight: 800, color: c.primary }}>{s.value}</div>}
            {s.label && <div style={{ fontSize: '0.9rem', color: c.textMuted, marginTop: '0.25rem' }}>{s.label}</div>}
            {!s.value && s.title && <h4 style={{ fontSize:'1.1rem',fontWeight:700,color:c.primary,marginBottom:'0.25rem' }}>{s.title}</h4>}
            {!s.value && s.description && <p style={{ color:c.textMuted,fontSize:'0.9rem',lineHeight:1.5,maxWidth:'300px' }}>{s.description}</p>}
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
    <section style={{ padding: s.section }}>
      <div style={{ maxWidth: sz.contentWide, margin: '0 auto', textAlign: 'center' }}>
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:c.primary,marginBottom:'1.5rem' }}>{d.title}</h2>}
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%',borderCollapse:'collapse',fontSize:'0.9rem' }}>
            <thead><tr style={{ background:c.primary,color:c.white }}>
              {columns?.map((col: string, i: number) => <th key={i} style={{ padding:'0.75rem 1rem',textAlign:'left',fontWeight:700 }}>{col}</th>)}
              {!columns && items[0] && Object.keys(items[0]).map((k, i) => <th key={i} style={{ padding:'0.75rem 1rem',textAlign:'left',fontWeight:700 }}>{k}</th>)}
            </tr></thead>
            <tbody>
              {items.map((row: any, i: number) => (
                <tr key={i} style={{ borderBottom:`1px solid ${c.border}`,background:i%2?c.bg:c.white }}>
                  {columns ? columns.map((col: string, j: number) => <td key={j} style={{ padding:'0.75rem 1rem',color:c.text }}>{row[col]||row[j]||''}</td>) : Object.values(row).map((v: any, j: number) => <td key={j} style={{ padding:'0.75rem 1rem',color:c.text }}>{v}</td>)}
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
    <section style={{ padding: s.section }}>
      <div style={{ maxWidth: sz.contentWidth, margin: '0 auto', textAlign: 'center' }}>
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:c.primary,marginBottom:'0.5rem' }}>{d.title}</h2>}
        {d.subtitle && <p style={{ color:c.textMuted,marginBottom:'2rem' }}>{d.subtitle}</p>}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.5rem' }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ padding:s.card,background:c.bg,borderRadius:r.md,border:`1px solid ${c.border}` }}>
              <h4 style={{ fontWeight:700,color:c.primary,marginBottom:'0.5rem' }}>{item.title}</h4>
              {item.description && <p style={{ color:c.textMuted,fontSize:'0.9rem',lineHeight:1.5,marginBottom:'1rem' }}>{item.description}</p>}
              {item.fileUrl ? <a href={item.fileUrl} style={{ display:'inline-block',padding:s.btnSm,background:c.primary,color:c.white,borderRadius:r.full,fontSize:'0.85rem',fontWeight:700,textDecoration:'none' }}>↓ {item.ctaText || "Descargar"}</a> : <span style={{ fontSize:'0.8rem',color:c.textLight,fontStyle:'italic' }}>Próximamente</span>}
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
    <section style={{ padding: s.section, background: c.bg }}>
      <div style={{ maxWidth: sz.contentWidth, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:c.primary,marginBottom:'0.75rem' }}>{d.title}</h2>
        {d.subtitle && <p style={{ color:c.textMuted,marginBottom:'2rem' }}>{d.subtitle}</p>}
        {d.features?.length && <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'1rem',marginBottom:'2rem' }}>
          {d.features.map((f: string, i: number) => <div key={i} style={{ padding:'1rem',background:c.white,borderRadius:r.md,boxShadow:theme.shadows.sm }}><p style={{ color:c.primary,fontWeight:600,fontSize:'0.9rem' }}>{f}</p></div>)}
        </div>}
        <a href={d.ctaHref || 'https://wa.me/595982515138?text=Quiero%20agendar%20una%20consulta'} style={{ display:'inline-block',padding:'1rem 2.5rem',background:c.whatsapp,color:c.white,borderRadius:r.full,fontWeight:700,fontSize:'1rem',textDecoration:'none' }}>{d.ctaText || 'Agendar consulta gratuita'}</a>
        {d.calendarNote && <p style={{ marginTop:'0.75rem',fontSize:'0.8rem',color:c.textLight,fontStyle:'italic' }}>{d.calendarNote}</p>}
      </div>
    </section>
  )
}

export function ContactDetailsSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  if (!d.whatsapp && !d.email) return null
  return (
    <section style={{ padding: s.section }}>
      <div style={{ maxWidth: sz.contentForm, margin: '0 auto', textAlign: 'center' }}>
        {d.title && <h2 style={{ fontSize:'clamp(1.3rem,2.5vw,1.8rem)',fontWeight:700,color:c.primary,marginBottom:'1.5rem' }}>{d.title}</h2>}
        <div style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
          {d.whatsapp && <a href={`https://wa.me/${d.whatsapp.replace(/[^0-9]/g,'')}`} target="_blank" style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:'0.75rem',padding:'1rem',background:c.whatsapp,color:c.white,borderRadius:r.md,textDecoration:'none',fontWeight:600 }}><span style={{ width:'28px',height:'28px',display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.2)',borderRadius:'50%',fontSize:'0.85rem' }}>WA</span> {d.whatsapp}</a>}
          {d.email && <a href={`mailto:${d.email}`} style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:'0.75rem',padding:'1rem',background:c.primary,color:c.white,borderRadius:r.md,textDecoration:'none',fontWeight:600 }}><span style={{ width:'28px',height:'28px',display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.15)',borderRadius:'50%',fontSize:'0.85rem' }}>@</span> {d.email}</a>}
          {d.address && <p style={{ color:c.textMuted,fontSize:'0.9rem',display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem' }}><span style={{ color:c.accent,fontWeight:700 }}>⌂</span> {d.address}{d.neighborhood ? ', ' + d.neighborhood : ''}</p>}
          {d.phone && !d.whatsapp && <p style={{ color:c.textMuted,fontSize:'0.9rem' }}><span style={{ color:c.accent }}>✆</span> {d.phone}</p>}
          {d.hours && <p style={{ color:c.textMuted,fontSize:'0.85rem' }}><span style={{ color:c.accent }}>◷</span> {typeof d.hours === 'object' ? Object.values(d.hours).join(' · ') : d.hours}</p>}
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
    <section style={{ padding: s.section, background: c.bg }}>
      <div style={{ maxWidth: sz.contentWide, margin: '0 auto', textAlign: 'center' }}>
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:c.primary,marginBottom:'1rem' }}>{d.title}</h2>}
        {d.subtitle && <p style={{ color:c.textMuted,marginBottom:'2rem' }}>{d.subtitle}</p>}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1rem' }}>
          {photos.map((photo: any, i: number) => {
            const src = typeof photo === 'string' ? photo : resolveImage?.(images, photo.src || photo.imageUrl || '') || photo.src || photo.imageUrl || ''
            return (
              <div key={i} style={{ borderRadius:r.md,overflow:'hidden',boxShadow:theme.shadows.image }}>
                {src && <img src={src} alt={photo.alt || photo.caption || ''} style={{ width:'100%',height:'220px',objectFit:'cover',display:'block' }} />}
                {photo.caption && <p style={{ padding:'0.75rem',background:c.white,color:c.textMuted,fontSize:'0.85rem',margin:0 }}>{photo.caption}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


// ── FAQ with Search ──
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
    <section style={{ padding: s.section, background: c.bg }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:c.primary,marginBottom:'1rem',textAlign:'center' }}>{d.title}</h2>}
        <div style={{ marginBottom:'1.5rem', position:'relative' }}>
          <input type="text" placeholder={d.searchPlaceholder || 'Buscar preguntas...'} value={search} onChange={e => setSearch(e.target.value)} style={{ width:'100%',padding:'0.85rem 1rem 0.85rem 2.5rem',border:`1px solid ${c.border}`,borderRadius:r.full,fontSize:'0.95rem',outline:'none',background:c.white }} />
          <span style={{ position:'absolute',left:'1rem',top:'50%',transform:'translateY(-50%)',color:c.textMuted }}>🔍</span>
        </div>
        <p style={{ fontSize:'0.85rem',color:c.textMuted,marginBottom:'1rem',textAlign:'center' }}>{items.length} de {allItems.length} preguntas</p>
        {items.map((item: any, i: number) => {
          const isOpen = open === i
          const question = item.q || item.pregunta || item.question || item.title
          const answer = item.a || item.respuesta || item.answer || item.description || item.body
          if (!question || !answer) return null
          return (
            <div key={i} style={{ marginBottom: '0.5rem', border: `1px solid ${c.border}`, borderRadius: r.md, overflow: 'hidden', background: c.white }}>
              <button onClick={() => setOpen(isOpen ? null : i)} style={{ width:'100%', padding:'1rem 1.25rem', border:'none', background:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', fontWeight:700, color:c.primary, fontSize:'0.95rem', textAlign:'left' }}>
                <span>{question}</span>
                <span style={{ color: c.accent, fontSize:'1.2rem', transition:'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
              </button>
              {isOpen && <div style={{ padding:'0 1.25rem 1.25rem', color: c.text, fontSize:'0.9rem', lineHeight:1.7, borderTop:`1px solid ${c.border}` }}>{answer}</div>}
            </div>
          )
        })}
        {items.length === 0 && <p style={{ textAlign:'center',color:c.textMuted,fontSize:'0.95rem' }}>No se encontraron preguntas. <button onClick={() => setSearch('')} style={{ background:'none',border:'none',color:c.accent,cursor:'pointer',fontWeight:700,textDecoration:'underline' }}>Limpiar búsqueda</button></p>}
      </div>
    </section>
  )
}


// ── Service Detail Section ──
export function ServiceDetailSection({ pageContent, data, images }: SectionComponentProps) {
  const d = data || pageContent || {}
  const groups = d.groups || []
  if (!groups.length) return null
  return (
    <section style={{ padding: s.section }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        {d.eyebrow && <p style={{ fontSize:'0.85rem',color:c.textMuted,textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem' }}>{d.eyebrow}</p>}
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:c.primary,marginBottom:'2rem' }}>{d.title}</h2>}
        {groups.map((group: any, i: number) => (
          <div key={i} style={{ marginBottom: '3rem' }}>
            {i > 0 && <div style={{ width: '60px', height: '2px', background: c.accent, margin: '0 auto 2.5rem' }} />}
            <h3 style={{ fontSize:'1.2rem',fontWeight:700,color:c.primary,marginBottom:'0.25rem' }}>{group.title}</h3>
            {group.subtitle && <p style={{ color:c.textMuted,fontSize:'0.9rem',marginBottom:'1rem' }}>{group.subtitle}</p>}
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1rem',textAlign:'left' }}>
              {group.items.map((item: any, j: number) => {
                const img = resolveImage(images, item.image)
                return (
                  <div key={j} style={{ padding:s.card,background:c.bg,borderRadius:r.md,borderLeft:`3px solid ${c.accent}`,boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
                    {img && <img src={img} alt={item.title} loading="lazy" style={{ width:'100%',height:'140px',objectFit:'cover',borderRadius:r.sm,marginBottom:'0.75rem' }} />}
                    <h4 style={{ fontWeight:700,color:c.primary,marginBottom:'0.3rem' }}>{item.title}</h4>
                    <p style={{ color:c.textMuted,fontSize:'0.9rem',lineHeight:1.5,marginBottom:'0.5rem' }}>{item.description}</p>
                    {item.benefits && <ul style={{ listStyle:'none',padding:0,margin:'0.5rem 0 0' }}>
                      {item.benefits.map((b: string, k: number) => (
                        <li key={k} style={{ fontSize:'0.85rem',color:c.text,padding:'0.2rem 0',display:'flex',gap:'0.5rem',alignItems:'baseline' }}>
                          <span style={{ color:c.accent,fontWeight:700 }}>✓</span> {b}
                        </li>
                      ))}
                    </ul>}
                    {item.ctaText && <a href={item.ctaHref} style={{ display:'inline-block',marginTop:'0.75rem',color:c.accent,fontWeight:700,textDecoration:'none',fontSize:'0.85rem',borderBottom:`2px solid ${c.accent}` }}>{item.ctaText}</a>}
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


// ── Press Releases Section ──
export function PressReleasesListSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || d.pressReleases || []
  if (!items.length) return null
  return (
    <section style={{ padding: s.section }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:c.primary,marginBottom:'0.5rem',textAlign:'center' }}>{d.title}</h2>}
        {d.subtitle && <p style={{ color:c.textMuted,textAlign:'center',marginBottom:'2rem' }}>{d.subtitle}</p>}
        {items.map((item: any, i: number) => (
          <article key={i} style={{ padding:'1.5rem',marginBottom:'1rem',background:c.white,borderRadius:r.md,border:`1px solid ${c.border}`,boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
            {item.date && <span style={{ fontSize:'0.8rem',color:c.accent,fontWeight:600,display:'block',marginBottom:'0.25rem' }}>{item.date}</span>}
            <h3 style={{ fontSize:'1.1rem',fontWeight:700,color:c.primary,marginBottom:'0.5rem' }}>{item.title}</h3>
            {item.summary && <p style={{ color:c.textMuted,fontSize:'0.9rem',lineHeight:1.6,marginBottom:'0.75rem' }}>{item.summary}</p>}
            {item.link && <a href={item.link} style={{ color:c.accent,fontWeight:700,fontSize:'0.85rem',textDecoration:'none',borderBottom:`2px solid ${c.accent}` }}>{item.ctaText || 'Leer más →'}</a>}
          </article>
        ))}
      </div>
    </section>
  )
}


// ── Intake Wizard Section ──
export function IntakeWizardSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const steps = d.steps || []
  const tierLabels = d.tierLabels || {}
  const [currentStep, setCurrentStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<string, string>>({})
  const [showResult, setShowResult] = React.useState(false)

  if (!steps.length) return null

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [steps[currentStep].key]: value }
    setAnswers(newAnswers)
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
  }

  if (showResult) {
    const recommended = d.recommendedTier || 'business'
    const tier = tierLabels[recommended] || tierLabels[Object.keys(tierLabels)[0]] || {}
    return (
      <section style={{ padding: s.section, background: c.bg }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize:'2.5rem',marginBottom:'1rem' }}>✓</div>
          <h2 style={{ fontSize:'clamp(1.3rem,2.5vw,1.8rem)',fontWeight:700,color:c.primary,marginBottom:'0.5rem' }}>{d.resultTitle || 'Programa recomendado'}</h2>
          <div style={{ padding:s.card,background:c.white,borderRadius:r.lg,boxShadow:'0 4px 16px rgba(0,0,0,0.08)',marginBottom:'1.5rem' }}>
            {tier.name && <h3 style={{ fontWeight:700,color:c.accent,fontSize:'1.2rem',marginBottom:'0.5rem' }}>{tier.name}</h3>}
            {tier.pitch && <p style={{ color:c.textMuted,fontSize:'0.95rem',lineHeight:1.6 }}>{tier.pitch}</p>}
          </div>
          <button onClick={handleRestart} style={{ padding:'0.75rem 1.5rem',background:c.primary,color:c.white,borderRadius:r.full,border:'none',fontWeight:700,cursor:'pointer',fontSize:'0.9rem',marginRight:'0.75rem' }}>{d.restartText || 'Volver a empezar'}</button>
          <a href={d.ctaHref || '/contacto'} style={{ display:'inline-block',padding:'0.75rem 1.5rem',background:c.accent,color:c.primary,borderRadius:r.full,fontWeight:700,textDecoration:'none',fontSize:'0.9rem' }}>{d.ctaText || 'Agendar consulta gratuita'}</a>
        </div>
      </section>
    )
  }

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <section style={{ padding: s.section }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        {d.title && <h2 style={{ fontSize:'clamp(1.3rem,2.5vw,1.8rem)',fontWeight:700,color:c.primary,marginBottom:'0.5rem' }}>{d.title}</h2>}
        {d.subtitle && <p style={{ color:c.textMuted,marginBottom:'2rem' }}>{d.subtitle}</p>}
        <div style={{ height:'6px',background:c.border,borderRadius:'3px',marginBottom:'2rem',overflow:'hidden' }}>
          <div style={{ height:'100%',background:c.accent,borderRadius:'3px',transition:'width 0.3s',width:`${progress}%` }} />
        </div>
        <p style={{ fontSize:'0.8rem',color:c.textLight,marginBottom:'1rem' }}>{d.stepLabel || 'Paso'} {currentStep + 1} {d.ofLabel || 'de'} {steps.length}</p>
        {step.question && <h3 style={{ fontSize:'1.2rem',fontWeight:700,color:c.primary,marginBottom:'1.5rem' }}>{step.question}</h3>}
        <div style={{ display:'flex',flexDirection:'column',gap:'0.75rem' }}>
          {step.options?.map((opt: any, i: number) => (
            <button key={i} onClick={() => handleSelect(opt.value)} style={{ padding:'1rem 1.5rem',background:c.white,border:`2px solid ${c.border}`,borderRadius:r.md,cursor:'pointer',fontSize:'1rem',fontWeight:600,color:c.primary,textAlign:'left',transition:'all 0.2s',display:'flex',alignItems:'center',gap:'0.75rem' }}>
              <span style={{ width:'32px',height:'32px',display:'flex',alignItems:'center',justifyContent:'center',background:c.bg,borderRadius:'50%',fontSize:'0.85rem',color:c.accent,fontWeight:700 }}>{i + 1}</span>
              {opt.label}
            </button>
          ))}
        </div>
        <button onClick={handleRestart} style={{ marginTop:'1.5rem',background:'none',border:'none',color:c.textMuted,fontSize:'0.85rem',cursor:'pointer',textDecoration:'underline' }}>{d.restartText || 'Comenzar de nuevo'}</button>
      </div>
    </section>
  )
}


// ── Contact Form ──
interface FormData {
  nombre: string; email: string; telefono: string; pais: string; servicio: string; mensaje: string
}
export function ContactFormSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const [form, setForm] = React.useState<FormData>({ nombre:'', email:'', telefono:'', pais:'', servicio:'', mensaje:'' })
  const [sent, setSent] = React.useState(false)
  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({...form, [field]: e.target.value})
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
      if (res.ok) setSent(true)
    } catch {}
  }
  if (sent) return (
    <section style={{ padding: s.section }}>
      <div style={{ maxWidth: sz.contentForm, margin:'0 auto', textAlign:'center' }}>
        <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>\u2705</div>
        <h2 style={{ fontSize:'1.5rem',fontWeight:700,color:c.primary,marginBottom:'0.5rem' }}>{d.successTitle || '\u00a1Mensaje enviado!'}</h2>
        <p style={{ color:c.textMuted }}>{d.successMessage || 'Te contactaremos en las pr\u00f3ximas 24 horas.'}</p>
      </div>
    </section>
  )
  return (
    <section style={{ padding: s.section }}>
      <div style={{ maxWidth: sz.contentForm, margin:'0 auto' }}>
        {d.title && <h2 style={{ fontSize:'clamp(1.3rem,2.5vw,1.8rem)',fontWeight:700,color:c.primary,textAlign:'center',marginBottom:'1.5rem' }}>{d.title}</h2>}
        <form onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem' }}>
            <input type="text" placeholder={d.namePlaceholder || 'Nombre completo'} value={form.nombre} onChange={handleChange('nombre')} required style={{ padding:s.input, border:`1px solid ${c.border}`, borderRadius:r.md, fontSize:'0.9rem' }} />
            <input type="email" placeholder={d.emailPlaceholder || 'Correo electr\u00f3nico'} value={form.email} onChange={handleChange('email')} required style={{ padding:s.input, border:`1px solid ${c.border}`, borderRadius:r.md, fontSize:'0.9rem' }} />
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem' }}>
            <input type="tel" placeholder={d.phonePlaceholder || 'Tel\u00e9fono (WhatsApp)'} value={form.telefono} onChange={handleChange('telefono')} style={{ padding:s.input, border:`1px solid ${c.border}`, borderRadius:r.md, fontSize:'0.9rem' }} />
            <select value={form.pais} onChange={handleChange('pais')} style={{ padding:s.input, border:`1px solid ${c.border}`, borderRadius:r.md, fontSize:'0.9rem', background:c.white }}>
              <option value="">{d.countryPlaceholder || 'Pa\u00eds de origen'}</option>
              <option>Pa\u00edses Bajos</option><option>B\u00e9lgica</option><option>Alemania</option><option>Espa\u00f1a</option><option>Francia</option><option>Reino Unido</option><option>Otro</option>
            </select>
          </div>
          <select value={form.servicio} onChange={handleChange('servicio')} style={{ padding:s.input, border:`1px solid ${c.border}`, borderRadius:r.md, fontSize:'0.9rem', background:c.white }}>
            <option value="">{d.servicePlaceholder || 'Servicio de inter\u00e9s'}</option>
            <option>Residencia Permanente</option><option>Programa Business</option><option>Programa Inversor</option><option>Compra de Tierras</option><option>Apertura de Cuenta Bancaria</option><option>Asesor\u00eda General</option>
          </select>
          <textarea placeholder={d.messagePlaceholder || 'Tu mensaje...'} value={form.mensaje} onChange={handleChange('mensaje')} rows={4} style={{ padding:s.input, border:`1px solid ${c.border}`, borderRadius:r.md, fontSize:'0.9rem', resize:'vertical', fontFamily:'inherit' }} />
          <button type="submit" style={{ padding:'1rem', background:c.primary, color:c.white, borderRadius:r.full, fontWeight:700, fontSize:'1rem', border:'none', cursor:'pointer' }}>{d.submitText || 'Enviar mensaje'}</button>
          <p style={{ fontSize:'0.75rem', color:c.textLight, textAlign:'center' }}>{d.privacyNote || 'Tus datos est\u00e1n seguros. No compartimos informaci\u00f3n con terceros.'}</p>
        </form>
      </div>
    </section>
  )
}
