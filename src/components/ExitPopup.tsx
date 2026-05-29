'use client'

import React, { useEffect, useState } from 'react'

export function ExitPopup({ data }: any) {
  const d = data || {}
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [dismissed, setDismissed] = useState(() => (
    typeof window !== 'undefined' && !!localStorage.getItem('nexa-exit-popup')
  ))

  useEffect(() => {
    if (dismissed) return
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !visible && !dismissed) setVisible(true)
    }
    const timer = setTimeout(() => { if (!visible && !dismissed) setVisible(true) }, 45000)
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => { document.removeEventListener('mouseleave', handleMouseLeave); clearTimeout(timer) }
  }, [visible, dismissed])

  const handleSubmit = async () => {
    if (!email || submitting) return
    setSubmitting(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'exit-popup', email, timestamp: new Date().toISOString() }),
      })
    } catch (err) {
      console.warn('[ExitPopup] Submit failed:', err)
    } finally {
      setSubmitting(false)
      setSubmitted(true)
      localStorage.setItem('nexa-exit-popup', 'submitted')
    }
  }

  if (!visible || dismissed) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl animate-[fadeIn_0.3s_ease-out]">
        {!submitted ? (
          <>
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🇵🇾</div>
            <h2 className="text-xl font-bold text-primary mb-2">{d.title}</h2>
            <p className="text-sm text-text-muted mb-6">{d.subtitle}</p>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={d.placeholder}
              aria-label={d.placeholder || 'Email address'}
              className="w-full p-3 border border-border rounded-lg text-sm mb-3"
            />
            <button
              onClick={handleSubmit}
              disabled={!email || submitting}
              className={`w-full py-3 rounded-full text-sm font-bold mb-3 ${email && !submitting ? 'bg-accent text-primary cursor-pointer hover:opacity-90' : 'bg-border text-text-muted cursor-not-allowed'}`}
            >
              {submitting ? 'Enviando...' : d.ctaLabel}
            </button>
            <p className="text-xs text-text-muted">{d.disclaimer}</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">✓</div>
            <h2 className="text-xl font-bold text-primary mb-2">{d.confirmTitle}</h2>
            <p className="text-sm text-text-muted">{d.confirmText}</p>
          </>
        )}
        <button onClick={() => { setVisible(false); setDismissed(true) }}
          className="mt-6 text-xs text-text-muted underline cursor-pointer bg-none border-none font-inherit">{d.closeLabel}</button>
      </div>
    </div>
  )
}
