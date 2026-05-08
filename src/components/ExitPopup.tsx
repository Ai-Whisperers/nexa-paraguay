'use client'

import React, { useEffect, useState } from 'react'

export function ExitPopup({ data }: any) {
  const d = data || {}
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !visible) setVisible(true)
    }
    // Also trigger after 30s on page
    const timer = setTimeout(() => { if (!visible && !dismissed) setVisible(true) }, 30000)
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => { document.removeEventListener('mouseleave', handleMouseLeave); clearTimeout(timer) }
  }, [visible, dismissed])

  const handleSubmit = async () => {
    if (!email) return
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'exit-popup', email, timestamp: new Date().toISOString() }),
      })
    } catch {}
    setSubmitted(true)
    localStorage.setItem('nexa-exit-popup', 'submitted')
  }

  useEffect(() => {
    if (localStorage.getItem('nexa-exit-popup')) setDismissed(true)
  }, [])

  if (!visible || dismissed) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl animate-[fadeIn_0.3s_ease-out]">
        {!submitted ? (
          <>
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🇵🇾</div>
            <h2 className="text-xl font-bold text-primary mb-2">{d.title || '¿Considerando mudarte a Paraguay?'}</h2>
            <p className="text-sm text-text-muted mb-6">{d.subtitle || 'Descargá nuestra guía completa con todo lo que necesitás saber: costos, requisitos, trámites y más.'}</p>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={d.placeholder || 'tu@email.com'}
              className="w-full p-3 border border-border rounded-lg text-sm mb-3" />
            <button onClick={handleSubmit} disabled={!email}
              className={`w-full py-3 rounded-full text-sm font-bold mb-3 ${email ? 'bg-accent text-primary cursor-pointer hover:opacity-90' : 'bg-border text-text-muted cursor-not-allowed'}`}>
              {d.ctaLabel || 'Descargar guía gratuita'}
            </button>
            <p className="text-xs text-text-muted">{d.disclaimer || 'Sin spam. Te enviaremos la guía y 1-2 correos más. Podés cancelar cuando quieras.'}</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">✓</div>
            <h2 className="text-xl font-bold text-primary mb-2">{d.confirmTitle || '¡Guía enviada!'}</h2>
            <p className="text-sm text-text-muted">{d.confirmText || 'Revisá tu bandeja de entrada. Si no lo ves en unos minutos, revisá spam.'}</p>
          </>
        )}
        <button onClick={() => { setVisible(false); setDismissed(true) }}
          className="mt-6 text-xs text-text-muted underline cursor-pointer bg-none border-none font-inherit">{d.closeLabel || 'No, gracias'}</button>
      </div>
    </div>
  )
}
