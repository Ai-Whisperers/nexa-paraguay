'use client'

import React, { useState } from 'react'
import { SectionComponentProps } from '../types'

export function FeedbackSection({ data, locale }: SectionComponentProps) {
  const d = data || {}
  const lang = locale || 'es'

  const tr = (key: string): string => {
    const texts: any = {
      es: { eyebrow: 'TU OPINIÓN', title: 'Compartí tu experiencia', namePlaceholder: 'Tu nombre (opcional)', messagePlaceholder: 'Escribí tu comentario o pregunta...', button: 'Enviar', thanks: '¡Gracias por tu mensaje!', recent: 'Comentarios recientes' },
      en: { eyebrow: 'YOUR FEEDBACK', title: 'Share your experience', namePlaceholder: 'Your name (optional)', messagePlaceholder: 'Write your comment or question...', button: 'Submit', thanks: 'Thanks for your message!', recent: 'Recent comments' },
      nl: { eyebrow: 'UW FEEDBACK', title: 'Deel uw ervaring', namePlaceholder: 'Uw naam (optioneel)', messagePlaceholder: 'Schrijf uw opmerking of vraag...', button: 'Verzenden', thanks: 'Bedankt voor uw bericht!', recent: 'Recente reacties' },
      de: { eyebrow: 'IHR FEEDBACK', title: 'Teilen Sie Ihre Erfahrung', namePlaceholder: 'Ihr Name (optional)', messagePlaceholder: 'Schreiben Sie Ihren Kommentar oder Ihre Frage...', button: 'Senden', thanks: 'Danke für Ihre Nachricht!', recent: 'Aktuelle Kommentare' },
    }
    return (d[key] || (texts as any)[lang]?.[key] || (texts as any).es[key] || '') as string
  }

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'feedback', locale: lang, name: name.trim() || 'Anónimo', message: message.trim(), timestamp: new Date().toISOString() }),
      })
    } catch {}
    setName('')
    setMessage('')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section className="py-16 md:py-24 bg-surface-alt">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-accent uppercase">{tr('eyebrow')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">{d.title || tr('title')}</h2>
          {d.subtitle && <p className="text-text-muted mt-3 max-w-xl mx-auto">{d.subtitle}</p>}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-6 mb-10">
          <input
            type="text"
            placeholder={tr('namePlaceholder')}
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl mb-3 text-primary outline-none focus:ring-2 focus:ring-accent/50"
          />
          <textarea
            placeholder={tr('messagePlaceholder')}
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-xl mb-3 text-primary outline-none focus:ring-2 focus:ring-accent/50 resize-none"
          />
          <button type="submit"
            className="bg-accent hover:opacity-90 text-primary font-semibold px-8 py-3 rounded-xl transition-all cursor-pointer border-none">
            {d.buttonText || tr('button')}
          </button>
          {sent && <p className="text-success text-sm mt-2">{tr('thanks')}</p>}
        </form>
      </div>
    </section>
  )
}
