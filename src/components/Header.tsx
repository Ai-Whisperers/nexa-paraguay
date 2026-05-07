import React, { useState } from 'react'

interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

export function Header({ navigation }: { navigation: any }) {
  const [open, setOpen] = useState(false)
  const navItems: NavItem[] = navigation?.navItems || []
  const businessName = navigation?.businessName || 'Nexa Paraguay'

  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #eee', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontWeight: 700, fontSize: '1.2rem', color: '#1B2A4A', textDecoration: 'none' }}>{businessName}</a>
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
        <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
