import React from 'react'

export function Footer({ footer }: { footer: any }) {
  if (!footer) return null
  const columns = footer.columns || []
  return (
    <footer style={{ background: '#1B2A4A', color: '#fff', padding: '4rem 1rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <img src="/images/brand/logo-dark.svg" alt="Nexa Paraguay" style={{ height: '32px', marginBottom: '1rem' }} />
            {footer.whatsapp && <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem' }}>📱 {footer.whatsapp}</p>}
            {footer.email && <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>✉️ {footer.email}</p>}
            {footer.socialLinks?.map((s: any, i: number) => (
              <a key={i} href={s.url} target="_blank" style={{ display:'inline-block',marginRight:'0.75rem',marginTop:'0.5rem',color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'0.85rem' }}>{s.label}</a>
            ))}
          </div>
          {columns.map((col: any, i: number) => (
            <div key={i}>
              <h5 style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#C9A96E', fontSize: '0.9rem' }}>{col.title}</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {col.links?.map((link: any, j: number) => (
                  <li key={j} style={{ marginBottom: '0.5rem' }}>
                    <a href={link.href} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.85rem' }}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', opacity: 0.6 }}>
          {footer.copyright?.replace('{year}', String(new Date().getFullYear()))}
        </div>
      </div>
    </footer>
  )
}
