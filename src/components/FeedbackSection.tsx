'use client'

import React, { useState, useEffect } from 'react'

export function FeedbackSection({ data }: any) {
  const d = data || {}
  const [comments, setComments] = useState<any[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('nexa-feedback')
    if (stored) try { setComments(JSON.parse(stored)) } catch {}
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    const entry = { name: name.trim() || 'Anónimo', message: message.trim(), date: new Date().toISOString() }
    const updated = [entry, ...comments]
    setComments(updated)
    localStorage.setItem('nexa-feedback', JSON.stringify(updated))
    setName('')
    setMessage('')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-widest text-amber-600 uppercase">{d.eyebrow || 'TU OPINIÓN'}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">{d.title || 'Compartí tu experiencia'}</h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">{d.subtitle || ''}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
          <input
            type="text"
            placeholder="Tu nombre (opcional)"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <textarea
            placeholder={d.placeholder || 'Escribí tu comentario o pregunta...'}
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
          />
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            {d.buttonText || 'Enviar'}
          </button>
          {sent && <p className="text-green-600 text-sm mt-2">¡Gracias por tu mensaje!</p>}
        </form>

        {comments.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Comentarios recientes</h3>
            {comments.map((c: any, i: number) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">{c.name}</span>
                  <span className="text-xs text-gray-400">{new Date(c.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700">{c.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
