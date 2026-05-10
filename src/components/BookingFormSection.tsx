'use client'

import React, { useState } from 'react'

const DEFAULT_PROGRAMS = [
  { id: 'base', title: 'Residencia Permanente', subtitle: 'Base', duration: '10-12 semanas', popular: false },
  { id: 'business', title: 'Residencia + Empresa + Banco', subtitle: 'Business', duration: '12-16 semanas', popular: true },
  { id: 'investor', title: 'Residencia para Inversores', subtitle: 'Inversor', duration: '12-16 semanas', popular: false },
  { id: 'land', title: 'Compra de Tierras', subtitle: 'Terrenos', duration: '4-6 semanas', popular: false },
]

const DEFAULT_STEP_LABELS = ['Programa', 'Datos', 'Confirmar']

export function BookingFormSection({ data, locale }: any) {
  const d = data || {}
  const lang = locale || 'es'

  // Resolve programs from data (4-locale format), fall back to hardcoded
  const rawPrograms: any[] = d.programs || DEFAULT_PROGRAMS
  const programs = rawPrograms.map((p: any) => ({
    id: p.id,
    title: typeof p.title === 'object' ? (p.title[lang] || p.title.es || p.title) : (p.title || ''),
    subtitle: typeof p.subtitle === 'object' ? (p.subtitle[lang] || p.subtitle.es || p.subtitle) : (p.subtitle || ''),
    duration: typeof p.duration === 'object' ? (p.duration[lang] || p.duration.es || p.duration) : (p.duration || ''),
    popular: p.popular || false,
  }))

  const stepLabels = d.stepLabels
    ? [d.stepLabels[0] || '1', d.stepLabels[1] || '2', d.stepLabels[2] || '3']
    : DEFAULT_STEP_LABELS

  const STEPS = [
    { id: 'program', label: stepLabels[0] },
    { id: 'contact', label: stepLabels[1] },
    { id: 'confirm', label: stepLabels[2] },
  ]

  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'booking', program: selected, locale: lang, ...form, timestamp: new Date().toISOString() }),
      })
    } catch {}
    setSubmitted(true)
  }

  const t = (key: string, fallback: string) => d[key] || fallback

  if (submitted) {
    return (
      <section className="py-24 bg-surface-alt">
        <div className="max-w-lg mx-auto text-center px-4">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">✓</div>
          <h2 className="text-2xl font-bold text-primary mb-2">{t('confirmTitle', '¡Recibido!')}</h2>
          <p className="text-text-muted mb-6">{t('confirmText', 'Te contactaremos en las próximas 24 horas para coordinar los siguientes pasos.')}</p>
          <a href={`/${lang}/`} className="inline-block px-8 py-3 bg-accent text-primary rounded-full font-bold text-sm no-underline">{t('backCta', 'Ver programas')}</a>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          {d.eyebrow && <p className="text-xs text-text-muted uppercase tracking-[2px] mb-1">{d.eyebrow}</p>}
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-playfair font-bold text-primary mb-2">{d.title || 'Agenda tu consulta gratuita'}</h2>
          <p className="text-text-muted">{d.subtitle || 'Cuéntanos sobre ti y te guiaremos en el proceso.'}</p>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i <= step ? 'bg-accent text-primary' : 'bg-border text-text-muted'}`}>{i + 1}</div>
              <span className={`text-xs ${i <= step ? 'text-primary font-semibold' : 'text-text-muted'}`}>{s.label}</span>
              {i < STEPS.length - 1 && <div className={`w-8 h-px ${i < step ? 'bg-accent' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 border border-border shadow-sm min-h-[300px]">
          {step === 0 && (
            <>
              <h3 className="text-lg font-bold text-primary mb-1">{t('step1Title', 'Elige tu programa')}</h3>
              <p className="text-sm text-text-muted mb-6">{t('step1Subtitle', 'Seleccioná el programa que te interesa.')}</p>
              <div className="grid gap-3">
                {programs.map((p: any) => (
                  <button key={p.id} onClick={() => { setSelected(p.id); setTimeout(() => setStep(1), 250) }}
                    className={`w-full text-left p-5 rounded-xl border-2 cursor-pointer transition-all ${selected === p.id ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50 bg-surface-alt'}`}>
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">{p.title}</p>
                        <p className="text-sm text-gray-500">{p.duration}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h3 className="text-lg font-bold text-primary mb-1">{t('step2Title', 'Tus datos')}</h3>
              <p className="text-sm text-text-muted mb-6">{t('step2Subtitle', 'Te contactaremos por WhatsApp o email.')}</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-1">{t('nameLabel', 'Nombre completo')}</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full p-3 border border-border rounded-lg text-sm" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1">{t('emailLabel', 'Email')}</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full p-3 border border-border rounded-lg text-sm" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1">{t('phoneLabel', 'WhatsApp')}</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full p-3 border border-border rounded-lg text-sm" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-1">{t('messageLabel', 'Mensaje (opcional)')}</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full p-3 border border-border rounded-lg text-sm min-h-[80px]" placeholder={t('messagePlaceholder', '¿Tienes alguna pregunta?')} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(0)} className="px-6 py-3 border border-border rounded-full text-sm font-semibold text-text-muted cursor-pointer hover:border-accent">{t('backLabel', 'Atrás')}</button>
                <button onClick={() => setStep(2)} disabled={!form.name || !form.email}
                  className={`px-8 py-3 rounded-full text-sm font-bold cursor-pointer transition-all ${form.name && form.email ? 'bg-accent text-primary' : 'bg-border text-text-muted cursor-not-allowed'}`}>{t('nextLabel', 'Revisar')}</button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="text-lg font-bold text-primary mb-1">{t('step3Title', 'Confirma tu solicitud')}</h3>
              <p className="text-sm text-text-muted mb-6">{t('step3Subtitle', 'Revisá los datos antes de enviar.')}</p>
              <div className="space-y-3 mb-6">
                <div className="p-4 bg-surface-alt rounded-lg flex justify-between"><span className="text-sm text-text-muted">{t('programLabel', 'Programa')}</span><span className="text-sm font-semibold text-primary">{programs.find((p: any) => p.id === selected)?.title || ''}</span></div>
                <div className="p-4 bg-surface-alt rounded-lg flex justify-between"><span className="text-sm text-text-muted">{t('nameField', 'Nombre')}</span><span className="text-sm font-semibold text-primary">{form.name}</span></div>
                <div className="p-4 bg-surface-alt rounded-lg flex justify-between"><span className="text-sm text-text-muted">Email</span><span className="text-sm font-semibold text-primary">{form.email}</span></div>
                <div className="p-4 bg-surface-alt rounded-lg flex justify-between"><span className="text-sm text-text-muted">WhatsApp</span><span className="text-sm font-semibold text-primary">{form.phone}</span></div>
                {form.message && <div className="p-4 bg-surface-alt rounded-lg"><span className="text-sm text-text-muted block mb-1">{t('messageField', 'Mensaje')}</span><span className="text-sm text-primary">{form.message}</span></div>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-3 border border-border rounded-full text-sm font-semibold text-text-muted cursor-pointer">{t('backLabel', 'Atrás')}</button>
                <button onClick={handleSubmit}
                  className="px-10 py-3 bg-accent text-primary rounded-full text-sm font-bold cursor-pointer hover:opacity-90">{t('submitLabel', 'Enviar solicitud')}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
