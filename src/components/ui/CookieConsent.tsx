'use client'

import { useState, useEffect } from 'react'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
        background: 'var(--color-surface, #fff)', borderTop: '1px solid var(--color-border, #e5e7eb)',
        padding: '1rem 1.5rem', display: 'flex', alignItems: 'center',
        gap: '1rem', flexWrap: 'wrap', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
      }}
    >
      <p style={{ flex: 1, minWidth: 200, margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted, #6b7280)' }}>
        Utilizamos cookies para mejorar tu experiencia y analizar tráfico. No rastreamos datos personales sin tu consentimiento.
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={decline}
          style={{ padding: '0.5rem 1rem', borderRadius: 6, border: '1px solid var(--color-border, #e5e7eb)', background: 'transparent', cursor: 'pointer', fontSize: '0.875rem' }}
        >
          Rechazar
        </button>
        <button
          onClick={accept}
          style={{ padding: '0.5rem 1rem', borderRadius: 6, border: 'none', background: 'var(--color-accent, #c5973a)', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}
        >
          Aceptar
        </button>
      </div>
    </div>
  )
}
