import React from 'react'
import { resolveImage } from './content'

interface SectionProps {
  variant?: string
  pageContent: any
  images?: any
  [key: string]: any
}

// ── FAQ ──
export function FaqSection({ pageContent }: SectionProps) {
  const data = pageContent.faq || pageContent.full || {}
  const items = data.items || []
  if (!items.length) return null
  const [open, setOpen] = React.useState<number | null>(null)
  return (
    <section style={{ padding: '4rem 1rem', background: '#F5F5F0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {data.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem',textAlign:'center' }}>{data.eyebrow}</p>}
        {data.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'2rem',textAlign:'center' }}>{data.title}</h2>}
        {items.map((item: any, i: number) => {
          const isOpen = open === i
          const question = item.pregunta || item.question || item.title
          const answer = item.respuesta || item.answer || item.description || item.body
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
export function BlogSection({ pageContent, images }: SectionProps) {
  const data = pageContent.blog || pageContent.index || {}
  const posts = data.posts || []
  if (!posts.length) return null
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {data.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem',textAlign:'center' }}>{data.eyebrow}</p>}
        {data.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'0.5rem',textAlign:'center' }}>{data.title}</h2>}
        {data.subtitle && <p style={{ color:'#666',marginBottom:'2rem',textAlign:'center' }}>{data.subtitle}</p>}
        {data.description && <p style={{ color:'#666',marginBottom:'2rem',textAlign:'center' }}>{data.description}</p>}
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
export function TeamSection({ pageContent, images }: SectionProps) {
  const data = pageContent.team || {}
  const members = data.members || data.items || []
  if (!members.length) return null
  return (
    <section style={{ padding: '4rem 1rem', background: '#F5F5F0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        {data.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem' }}>{data.eyebrow}</p>}
        {data.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'2rem' }}>{data.title}</h2>}
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
export function PrivacyAccordion({ pageContent }: SectionProps) {
  const data = pageContent.privacy || pageContent.body || {}
  const items = data.items || []
  if (!items.length) return null
  const [open, setOpen] = React.useState<number | null>(null)
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {data.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem' }}>{data.eyebrow}</p>}
        {data.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'2rem' }}>{data.title}</h2>}
        {items.map((item: any, i: number) => {
          const isOpen = open === i
          const title = item.title || item.pregunta || item.question
          const body = item.body || item.description || item.respuesta || item.answer
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
export function GlossarySection({ pageContent }: SectionProps) {
  const data = pageContent.glossary || pageContent.full || {}
  const items = data.items || []
  if (!items.length) return null
  return (
    <section style={{ padding: '4rem 1rem', background: '#F5F5F0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {data.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem',textAlign:'center' }}>{data.eyebrow}</p>}
        {data.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'2rem',textAlign:'center' }}>{data.title}</h2>}
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ padding:'1.25rem', background:'#fff', borderRadius:'12px', border:'1px solid #e0e0e0' }}>
              <h4 style={{ fontWeight:700, color:'#1B2A4A', marginBottom:'0.25rem', fontSize:'1rem' }}>{item.term || item.title}</h4>
              <p style={{ color:'#555', fontSize:'0.9rem', lineHeight:1.6 }}>{item.definition || item.description || item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Newsletter signup ──
export function NewsletterSection({ pageContent }: SectionProps) {
  const data = pageContent.newsletter || {}
  if (!data.title) return null
  return (
    <section style={{ padding: '3rem 1rem', background: '#1B2A4A', color: '#fff' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:'0.5rem' }}>{data.title}</h3>
        {data.description && <p style={{ fontSize:'0.9rem', opacity:0.8, marginBottom:'1.5rem' }}>{data.description}</p>}
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', justifyContent:'center' }}>
          <input type="email" placeholder={data.placeholder || "tu@email.com"} style={{ padding:'0.75rem 1rem', borderRadius:'50px', border:'none', flex:1, minWidth:'200px', fontSize:'0.9rem' }} />
          <button style={{ padding:'0.75rem 1.5rem', background:'#C9A96E', color:'#1B2A4A', borderRadius:'50px', border:'none', fontWeight:700, cursor:'pointer', fontSize:'0.9rem' }}>{data.buttonText || "Suscribirme"}</button>
        </div>
      </div>
    </section>
  )
}

// ── Story section (narrative paragraphs) ──
export function StorySection({ pageContent }: SectionProps) {
  const data = pageContent.story || {}
  const paragraphs = data.paragraphs || []
  if (!data.title && !paragraphs.length) return null
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {data.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem',textAlign:'center' }}>{data.eyebrow}</p>}
        {data.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'1.5rem',textAlign:'center' }}>{data.title}</h2>}
        {paragraphs.map((p: string, i: number) => (
          <p key={i} style={{ color:'#444', lineHeight:1.8, fontSize:'0.95rem', marginBottom:'1rem' }}>{p}</p>
        ))}
      </div>
    </section>
  )
}

// ── Pillars grid (reusable for any pillars array) ──
export function PillarsSection({ pageContent, images }: SectionProps) {
  const data = pageContent.pillars || pageContent.differentiators || {}
  const pillars = data.pillars || data.items || []
  if (!pillars.length) return null
  const isDark = pageContent.background === 'dark'
  return (
    <section style={{ padding: '4rem 1rem', background: isDark ? '#1B2A4A' : '#fff', color: isDark ? '#fff' : '#1B2A4A' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        {data.eyebrow && <p style={{ fontSize:'0.85rem',color: isDark ? '#C9A96E' : '#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem' }}>{data.eyebrow}</p>}
        {data.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700, marginBottom:'0.5rem' }}>{data.title}</h2>}
        {data.subtitle && <p style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#666', marginBottom:'2rem' }}>{data.subtitle}</p>}
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
export function PageHeroSection({ pageContent }: SectionProps) {
  const c = pageContent.hero || pageContent.pageHero || {}
  if (!c.headline && !c.title) return null
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
export function HighlightSection({ pageContent }: SectionProps) {
  const data = pageContent.highlights || pageContent.stats || {}
  const items = data.items || []
  if (!items.length) return null
  return (
    <section style={{ padding: '3rem 1rem', background: '#F5F5F0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
        {items.map((s: any, i: number) => (
          <div key={i} style={{ textAlign: 'center' }}>
            {s.value && <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1B2A4A' }}>{s.value}</div>}
            {s.label && <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem' }}>{s.label}</div>}
            {s.description && <div style={{ fontSize: '0.85rem', color: '#C9A96E', fontWeight:600, marginTop: '0.15rem' }}>{s.description}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Comparison matrix ──
export function ComparisonSection({ pageContent }: SectionProps) {
  const data = pageContent.comparison || pageContent.matrix || {}
  const items = data.items || []
  if (!items.length && !data.columns) return null
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        {data.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem' }}>{data.eyebrow}</p>}
        {data.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'1.5rem' }}>{data.title}</h2>}
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.9rem' }}>
            <thead>
              <tr style={{ background:'#1B2A4A', color:'#fff' }}>
                {data.columns?.map((col: string, i: number) => <th key={i} style={{ padding:'0.75rem 1rem', textAlign:'left', fontWeight:700 }}>{col}</th>)}
                {!data.columns && items[0] && Object.keys(items[0]).map((k, i) => <th key={i} style={{ padding:'0.75rem 1rem', textAlign:'left', fontWeight:700 }}>{k}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((row: any, i: number) => (
                <tr key={i} style={{ borderBottom:'1px solid #e0e0e0', background: i % 2 ? '#F5F5F0' : '#fff' }}>
                  {data.columns ? data.columns.map((col: string, j: number) => <td key={j} style={{ padding:'0.75rem 1rem', color:'#444' }}>{row[col] || row[j] || ''}</td>) : Object.values(row).map((v: any, j: number) => <td key={j} style={{ padding:'0.75rem 1rem', color:'#444' }}>{v}</td>)}
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
export function GuidesSection({ pageContent }: SectionProps) {
  const data = pageContent.guides || {}
  const items = data.items || []
  if (!data.title && !items.length) return null
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        {data.eyebrow && <p style={{ fontSize:'0.85rem',color:'#6B6B6B',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'0.5rem' }}>{data.eyebrow}</p>}
        {data.title && <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:700,color:'#1B2A4A',marginBottom:'0.5rem' }}>{data.title}</h2>}
        {data.subtitle && <p style={{ color:'#666',marginBottom:'2rem' }}>{data.subtitle}</p>}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.5rem' }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ padding:'1.5rem', background:'#F5F5F0', borderRadius:'12px', border:'1px solid #e0e0e0' }}>
              <h4 style={{ fontWeight:700, color:'#1B2A4A', marginBottom:'0.5rem' }}>{item.title}</h4>
              {item.description && <p style={{ color:'#555', fontSize:'0.9rem', lineHeight:1.5, marginBottom:'1rem' }}>{item.description}</p>}
              {item.fileUrl && <a href={item.fileUrl} style={{ display:'inline-block', padding:'0.5rem 1.25rem', background:'#1B2A4A', color:'#fff', borderRadius:'50px', fontSize:'0.85rem', fontWeight:700, textDecoration:'none' }}>📥 {item.ctaText || "Descargar"}</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
