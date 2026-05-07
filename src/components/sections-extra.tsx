import React from 'react'
import { resolveImage } from './content'

interface SectionProps {
  variant?: string
  pageContent: any
  images?: any
  [key: string]: any
}

// ── FAQ ──
export function FaqSection({ pageContent, data }: SectionProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  if (!items.length) return null
  const [open, setOpen] = React.useState<number | null>(null)
  return (
    <section style={{ padding: '4rem 1rem', background: '#F5F5F0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {d.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem',textAlign:'center' }}>{d.eyebrow}</p>}
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'2rem',textAlign:'center' }}>{d.title}</h2>}
        {items.map((item: any, i: number) => {
          const isOpen = open === i
          const question = item.pregunta || item.question || item.title || item.q
          const answer = item.respuesta || item.answer || item.description || item.body || item.a
          if (!question || !answer) return null
          return (
            <div key={i} style={{ marginBottom: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
              <button onClick={() => setOpen(isOpen ? null : i)} style={{ width:'100%', padding:'1rem 1.25rem', border:'none', background:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', fontWeight:700, color:'#1B2A4A', fontSize:'0.95rem', textAlign:'left' }}>
                <span>{question}</span>
                <span style={{ color:'#C9A96E', fontSize:'1.2rem', transition:'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
              </button>
              {isOpen && <div style={{ padding:'0 1.25rem 1.25rem', color:'#444', fontSize:'0.9rem', lineHeight:1.7, borderTop:'1px solid #eee' }}>{answer}</div>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── Blog Index ──
export function BlogSection({ pageContent, data, images }: SectionProps) {
  const d = data || pageContent || {}
  const posts = d.posts || []
  if (!posts.length) return null
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {d.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem',textAlign:'center' }}>{d.eyebrow}</p>}
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'0.5rem',textAlign:'center' }}>{d.title}</h2>}
        {d.subtitle && <p style={{ color:'#666',marginBottom:'2rem',textAlign:'center' }}>{d.subtitle}</p>}
        {d.description && <p style={{ color:'#666',marginBottom:'2rem',textAlign:'center' }}>{d.description}</p>}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.5rem' }}>
          {posts.map((post: any, i: number) => {
            const postImg = post.image ? resolveImage(images, `@img:blog.${post.image}`) : (post.coverImage || '')
            return (
              <article key={i} style={{ border:'1px solid #e0e0e0', borderRadius:'16px', overflow:'hidden', background:'#fff' }}>
                {postImg && <img src={postImg} alt={post.title} style={{ width:'100%', height:'180px', objectFit:'cover' }} />}
                <div style={{ padding:'1.25rem' }}>
                  {post.date && <span style={{ fontSize:'0.8rem', color:'#C9A96E', fontWeight:600 }}>{post.date}</span>}
                  <h3 style={{ fontSize:'1.05rem', fontWeight:700, color:'#1B2A4A', margin:'0.5rem 0' }}>{post.title}</h3>
                  {post.excerpt && <p style={{ color:'#666', fontSize:'0.9rem', lineHeight:1.5, marginBottom:'0.75rem' }}>{post.excerpt}</p>}
                  {post.slug && <a href={`/blog/${post.slug}`} style={{ color:'#C9A96E', fontWeight:700, fontSize:'0.85rem', textDecoration:'none', borderBottom:'2px solid #C9A96E' }}>Leer más →</a>}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Team ──
export function TeamSection({ pageContent, data, images }: SectionProps) {
  const d = data || pageContent || {}
  const members = d.members || d.items || []
  if (!members.length) return null
  return (
    <section style={{ padding: '4rem 1rem', background: '#F5F5F0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        {d.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem' }}>{d.eyebrow}</p>}
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'2rem' }}>{d.title}</h2>}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'2rem' }}>
          {members.map((m: any, i: number) => {
            const img = resolveImage(images, m.memberImage || m.image || m.imageUrl)
            return (
              <div key={i} style={{ padding:'1.5rem', background:'#fff', borderRadius:'16px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
                {img && <img src={img} alt={m.name} style={{ width:'80px', height:'80px', objectFit:'cover', borderRadius:'50%', margin:'0 auto 1rem', display:'block' }} />}
                <h4 style={{ fontWeight:700, color:'#1B2A4A', marginBottom:'0.25rem' }}>{m.name || m.role}</h4>
                {m.role && m.name && <p style={{ color:'#C9A96E', fontSize:'0.85rem', fontWeight:600, marginBottom:'0.5rem' }}>{m.role}</p>}
                {m.description && <p style={{ color:'#666', fontSize:'0.9rem', lineHeight:1.5 }}>{m.description}</p>}
                {m.linkedin && <a href={m.linkedin} target="_blank" style={{ display:'inline-block', marginTop:'0.5rem', color:'#1B2A4A', fontSize:'0.85rem', opacity:0.6 }}>LinkedIn →</a>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Privacy Accordion ──
export function PrivacyAccordion({ pageContent, data }: SectionProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  if (!items.length) return null
  const [open, setOpen] = React.useState<number | null>(null)
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {d.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem' }}>{d.eyebrow}</p>}
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'2rem' }}>{d.title}</h2>}
        {items.map((item: any, i: number) => {
          const isOpen = open === i
          const title = item.title || item.pregunta || item.question || item.q
          const body = item.body || item.description || item.respuesta || item.answer || item.a
          if (!title || !body) return null
          return (
            <div key={i} style={{ marginBottom:'0.75rem', border:'1px solid #e0e0e0', borderRadius:'12px', overflow:'hidden' }}>
              <button onClick={() => setOpen(isOpen ? null : i)} style={{ width:'100%', padding:'1rem 1.25rem', border:'none', background: isOpen ? '#1B2A4A' : '#F5F5F0', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', fontWeight:700, color: isOpen ? '#fff' : '#1B2A4A', fontSize:'0.95rem', textAlign:'left' }}>
                <span>{title}</span>
                <span style={{ transition:'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
              </button>
              {isOpen && <div style={{ padding:'1.25rem', color:'#444', fontSize:'0.9rem', lineHeight:1.7 }}>{body}</div>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── Glossary ──
export function GlossarySection({ pageContent, data }: SectionProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  if (!items.length) return null
  return (
    <section style={{ padding: '4rem 1rem', background: '#F5F5F0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {d.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem',textAlign:'center' }}>{d.eyebrow}</p>}
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'2rem',textAlign:'center' }}>{d.title}</h2>}
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ padding:'1.25rem', background:'#fff', borderRadius:'12px', border:'1px solid #e0e0e0' }}>
              <h4 style={{ fontWeight:700, color:'#1B2A4A', marginBottom:'0.25rem', fontSize:'1rem' }}>{item.term || item.title || item.q}</h4>
              <p style={{ color:'#555', fontSize:'0.9rem', lineHeight:1.6 }}>{item.definition || item.description || item.body || item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Newsletter signup ──
export function NewsletterSection({ pageContent, data }: SectionProps) {
  const d = data || pageContent || {}
  if (!d.title) return null
  return (
    <section style={{ padding: '3rem 1rem', background: '#1B2A4A', color: '#fff' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:'0.5rem' }}>{d.title}</h3>
        {d.description && <p style={{ fontSize:'0.9rem', opacity:0.8, marginBottom:'1.5rem' }}>{d.description}</p>}
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', justifyContent:'center' }}>
          <input type="email" placeholder={d.placeholder || "tu@email.com"} style={{ padding:'0.75rem 1rem', borderRadius:'50px', border:'none', flex:1, minWidth:'200px', fontSize:'0.9rem' }} />
          <button style={{ padding:'0.75rem 1.5rem', background:'#C9A96E', color:'#1B2A4A', borderRadius:'50px', border:'none', fontWeight:700, cursor:'pointer', fontSize:'0.9rem' }}>{d.buttonText || "Suscribirme"}</button>
        </div>
      </div>
    </section>
  )
}

// ── Story section (narrative paragraphs) ──
export function StorySection({ pageContent, data }: SectionProps) {
  const d = data || pageContent || {}
  const paragraphs = d.paragraphs || []
  if (!d.title && !paragraphs.length) return null
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {d.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem',textAlign:'center' }}>{d.eyebrow}</p>}
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'1.5rem',textAlign:'center' }}>{d.title}</h2>}
        {paragraphs.map((p: string, i: number) => (
          <p key={i} style={{ color:'#444', lineHeight:1.8, fontSize:'0.95rem', marginBottom:'1rem' }}>{p}</p>
        ))}
      </div>
    </section>
  )
}

// ── Pillars grid (reusable for any pillars array) ──
export function PillarsSection({ pageContent, data, images }: SectionProps) {
  const d = data || pageContent || {}
  const pillars = d.pillars || d.items || []
  if (!pillars.length) return null
  const isDark = pageContent.background === 'dark'
  return (
    <section style={{ padding: '4rem 1rem', background: isDark ? '#1B2A4A' : '#fff', color: isDark ? '#fff' : '#1B2A4A' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        {d.eyebrow && <p style={{ fontSize:'0.85rem',color: isDark ? '#C9A96E' : '#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem' }}>{d.eyebrow}</p>}
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700, marginBottom:'0.5rem' }}>{d.title}</h2>}
        {d.subtitle && <p style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#666', marginBottom:'2rem' }}>{d.subtitle}</p>}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'1.5rem' }}>
          {pillars.map((p: any, i: number) => {
            const img = resolveImage(images, p.imageUrl || p.image || p.icon)
            return (
              <div key={i} style={{ padding:'1.5rem', background: isDark ? 'rgba(255,255,255,0.08)' : '#F5F5F0', borderRadius:'12px', textAlign:'left' }}>
                {img && <img src={img} alt={p.title} style={{ width:'100%', height:'100px', objectFit:'cover', borderRadius:'8px', marginBottom:'0.75rem' }} />}
                <h4 style={{ fontWeight:700, color: isDark ? '#C9A96E' : '#1B2A4A', marginBottom:'0.5rem' }}>{p.title}</h4>
                <p style={{ fontSize:'0.9rem', color: isDark ? 'rgba(255,255,255,0.8)' : '#555', lineHeight:1.5 }}>{p.description}</p>
                {p.bullets && <ul style={{ marginTop:'0.75rem', paddingLeft:'1rem', fontSize:'0.85rem', color: isDark ? 'rgba(255,255,255,0.65)' : '#666' }}>
                  {p.bullets.map((b: string, j: number) => <li key={j} style={{ marginBottom:'0.25rem' }}>{b.replace('{{taxRate}}','10%')}</li>)}
                </ul>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Page hero (minimal, reused for inner pages) ──
export function PageHeroSection({ pageContent, data }: SectionProps) {
  const c = data || pageContent || {}
  const headline = c.headline || c.title
  if (!headline) return null
  return (
    <section style={{ padding: '5rem 1rem 3rem', background: 'linear-gradient(135deg, #1B2A4A 0%, #2a3f6a 100%)', color: '#fff', textAlign: 'center' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem' }}>{c.headline || c.title}</h1>
        {(c.subheadline || c.subtitle) && <p style={{ fontSize: '1rem', opacity: 0.85, lineHeight: 1.6 }}>{c.subheadline || c.subtitle}</p>}
      </div>
    </section>
  )
}

// ── Highlight bar (key metrics) ──
export function HighlightSection({ pageContent, data }: SectionProps) {
  const d = data || pageContent || {}
  const items = d.items || d.pillars || []
  if (!items.length) return null
  return (
    <section style={{ padding: '3rem 1rem', background: '#F5F5F0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
        {items.map((s: any, i: number) => (
          <div key={i} style={{ textAlign: 'center' }}>
            {s.value && <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1B2A4A' }}>{s.value}</div>}
            {s.label && <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem' }}>{s.label}</div>}
            {s.description && <div style={{ fontSize: '0.85rem', color: '#C9A96E', fontWeight:600, marginTop: '0.15rem' }}>{s.description}</div>}
            {!s.value && s.title && <h4 style={{ fontSize:'1.1rem',fontWeight:700,color:'#1B2A4A',marginBottom:'0.25rem' }}>{s.title}</h4>}
            {!s.value && s.description && <p style={{ color:'#555',fontSize:'0.9rem',lineHeight:1.5,maxWidth:'300px' }}>{s.description}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Comparison matrix ──
export function ComparisonSection({ pageContent, data }: SectionProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  if (!items.length && !d.columns) return null
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        {d.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem' }}>{d.eyebrow}</p>}
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'1.5rem' }}>{d.title}</h2>}
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.9rem' }}>
            <thead>
              <tr style={{ background:'#1B2A4A', color:'#fff' }}>
                {d.columns?.map((col: string, i: number) => <th key={i} style={{ padding:'0.75rem 1rem', textAlign:'left', fontWeight:700 }}>{col}</th>)}
                {!d.columns && items[0] && Object.keys(items[0]).map((k, i) => <th key={i} style={{ padding:'0.75rem 1rem', textAlign:'left', fontWeight:700 }}>{k}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((row: any, i: number) => (
                <tr key={i} style={{ borderBottom:'1px solid #e0e0e0', background: i % 2 ? '#F5F5F0' : '#fff' }}>
                  {d.columns ? d.columns.map((col: string, j: number) => <td key={j} style={{ padding:'0.75rem 1rem', color:'#444' }}>{row[col] || row[j] || ''}</td>) : Object.values(row).map((v: any, j: number) => <td key={j} style={{ padding:'0.75rem 1rem', color:'#444' }}>{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// ── Guides / resources ──
export function GuidesSection({ pageContent, data }: SectionProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  if (!d.title && !items.length) return null
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        {d.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem' }}>{d.eyebrow}</p>}
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'0.5rem' }}>{d.title}</h2>}
        {d.subtitle && <p style={{ color:'#666',marginBottom:'2rem' }}>{d.subtitle}</p>}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.5rem' }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ padding:'1.5rem', background:'#F5F5F0', borderRadius:'12px', border:'1px solid #e0e0e0' }}>
              <h4 style={{ fontWeight:700, color:'#1B2A4A', marginBottom:'0.5rem' }}>{item.title}</h4>
              {item.description && <p style={{ color:'#555', fontSize:'0.9rem', lineHeight:1.5, marginBottom:'1rem' }}>{item.description}</p>}
              {item.fileUrl ? (
                <a href={item.fileUrl} style={{ display:'inline-block', padding:'0.5rem 1.25rem', background:'#1B2A4A', color:'#fff', borderRadius:'50px', fontSize:'0.85rem', fontWeight:700, textDecoration:'none' }}>📥 {item.ctaText || "Descargar"}</a>
              ) : (
                <span style={{ fontSize:'0.8rem', color:'#999', fontStyle:'italic' }}>Próximamente</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Booking embed (WhatsApp CTA with features) ──
export function BookingEmbedSection({ pageContent, data }: SectionProps) {
  const d = data || pageContent || {}
  if (!d.title) return null
  return (
    <section style={{ padding: '4rem 1rem', background: '#F5F5F0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'0.75rem' }}>{d.title}</h2>
        {d.subtitle && <p style={{ color:'#666',marginBottom:'2rem' }}>{d.subtitle}</p>}
        {d.features && Array.isArray(d.features) && (
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'1rem',marginBottom:'2rem' }}>
            {d.features.map((f: string, i: number) => (
              <div key={i} style={{ padding:'1rem',background:'#fff',borderRadius:'12px',boxShadow:'0 2px 10px rgba(0,0,0,0.06)' }}>
                <p style={{ color:'#1B2A4A',fontWeight:600,fontSize:'0.9rem' }}>{f}</p>
              </div>
            ))}
          </div>
        )}
        <a href={d.ctaHref || 'https://wa.me/595982515138?text=Quiero%20agendar%20una%20consulta'} style={{ display:'inline-block',padding:'1rem 2.5rem',background:'#25D366',color:'#fff',borderRadius:'50px',fontWeight:700,fontSize:'1rem',textDecoration:'none' }}>
          {d.ctaText || 'Agendar consulta gratuita'}
        </a>
        {d.calendarNote && <p style={{ marginTop:'0.75rem',fontSize:'0.8rem',color:'#999',fontStyle:'italic' }}>{d.calendarNote}</p>}
      </div>
    </section>
  )
}

// ── Contact details (phone, email, address, hours) ──
export function ContactDetailsSection({ pageContent, data }: SectionProps) {
  const d = data || pageContent || {}
  if (!d.whatsapp && !d.email) return null
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        {d.title && <h2 style={{ fontSize:'clamp(1.3rem,2.5vw,1.8rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'1.5rem' }}>{d.title}</h2>}
        <div style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
          {d.whatsapp && (
            <a href={`https://wa.me/${d.whatsapp.replace(/[^0-9]/g,'')}`} target="_blank" style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem',padding:'1rem',background:'#25D366',color:'#fff',borderRadius:'12px',textDecoration:'none',fontWeight:600 }}>
              <span>📱</span> {d.whatsapp}
            </a>
          )}
          {d.email && (
            <a href={`mailto:${d.email}`} style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem',padding:'1rem',background:'#1B2A4A',color:'#fff',borderRadius:'12px',textDecoration:'none',fontWeight:600 }}>
              <span>✉️</span> {d.email}
            </a>
          )}
          {d.address && <p style={{ color:'#666',fontSize:'0.9rem' }}>📍 {d.address}</p>}
          {d.hours && <p style={{ color:'#666',fontSize:'0.85rem' }}>🕐 {d.hours}</p>}
        </div>
      </div>
    </section>
  )
}

// ── Gallery (office/team photos) ──
export function GallerySection({ pageContent, data, images }: SectionProps) {
  const d = data || pageContent || {}
  const photos = d.images || d.items || []
  if (!d.title && !photos.length) return null
  return (
    <section style={{ padding: '4rem 1rem', background: '#F5F5F0' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        {d.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem' }}>{d.eyebrow}</p>}
        {d.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'1rem' }}>{d.title}</h2>}
        {d.subtitle && <p style={{ color:'#666',marginBottom:'2rem' }}>{d.subtitle}</p>}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1rem' }}>
          {photos.map((photo: any, i: number) => {
            const src = typeof photo === 'string' ? photo : resolveImage?.(images, photo.src || photo.imageUrl || '') || photo.src || photo.imageUrl || ''
            return (
              <div key={i} style={{ borderRadius:'12px',overflow:'hidden',boxShadow:'0 4px 15px rgba(0,0,0,0.1)' }}>
                {src && <img src={src} alt={photo.alt || photo.caption || ''} style={{ width:'100%',height:'220px',objectFit:'cover',display:'block' }} />}
                {photo.caption && <p style={{ padding:'0.75rem',background:'#fff',color:'#555',fontSize:'0.85rem',margin:0 }}>{photo.caption}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
