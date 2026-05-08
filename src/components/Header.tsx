import React, { useState } from 'react'

interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

export function Header({ navigation }: { navigation: any }) {
  const [open, setOpen] = useState(false)
  const navItems: NavItem[] = navigation?.navItems || []

  return (
    <header style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/images/brand/logo.svg" alt="Nexa Paraguay" style={{ height: '36px', width: 'auto' }} />
        </a>
        <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', padding: '0.25rem', color: '#1B2A4A' }}>
          {open ? '✕' : '☰'}
        </button>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {navItems.map((item, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <a href={item.href || '#'} style={{ color: '#333', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', padding: '0.25rem 0', borderBottom: item.children ? '1px dashed #ccc' : 'none' }}>
                {item.label}
              </a>
            </div>
          ))}
          {navigation?.ctaText && <a href={navigation.ctaHref} style={{ padding: '0.5rem 1.25rem', background: '#C9A96E', color: '#1B2A4A', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem' }}>{navigation.ctaText}</a>}
        </nav>
      </div>
      {open && <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 99 }} />}
      <style jsx>{`
        @media (max-width: 768px) {
          button { display: block !important; }
          nav { display: ${open ? 'flex' : 'none'} !important; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: #fff; padding: 1.5rem; box-shadow: 0 8px 30px rgba(0,0,0,0.12); z-index: 100; gap: 0.75rem; }
          nav a { padding: 0.5rem 0 !important; }
        }
      `}</style>
    </header>
  )
}
