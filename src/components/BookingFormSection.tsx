'use client'

import React, { useState } from 'react'

const PROGRAMS = [
  { id: 'base', title: 'Residencia Permanente', subtitle: 'Base', price: '€2,500', duration: '10-12 semanas', popular: false },
  { id: 'business', title: 'Residencia + Empresa + Banco', subtitle: 'Business', price: '€4,500', duration: '12-16 semanas', popular: true },
  { id: 'investor', title: 'Residencia para Inversores', subtitle: 'Inversor', price: '€5,500', duration: '12-16 semanas', popular: false },
  { id: 'land', title: 'Compra de Tierras', subtitle: 'Terrenos', price: 'Desde €10,000', duration: '4-6 semanas', popular: false },
]

const STEPS = [
  { id: 'program', label: 'Programa' },
  { id: 'contact', label: 'Datos' },
  { id: 'confirm', label: 'Confirmar' },
]

export function BookingFormSection({ data }: any) {
  const d = data || {}
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'booking', program: selected, ...form, timestamp: new Date().toISOString() }),
      })
    } catch {}
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="py-24 bg-surface-alt">
        <div className="max-w-lg mx-auto text-center px-4">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">✓</div>
          <h2 className="text-2xl font-bold text-primary mb-2">{d.confirmTitle || '¡Recibido!'}</h2>
          <p className="text-text-muted mb-6">{d.confirmText || 'Te contactaremos en las próximas 24 horas para coordinar los siguientes pasos.'}</p>
          <a href={`/es/programas`} className="inline-block px-8 py-3 bg-accent text-primary rounded-full font-bold text-sm no-underline">{d.backCta || 'Ver programas'}</a>
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
              <h3 className="text-lg font-bold text-primary mb-1">{d.step1Title || 'Elige tu programa'}</h3>
              <p className="text-sm text-text-muted mb-6">{d.step1Subtitle || 'Seleccioná el programa que te interesa. Después podés ajustar.'}</p>
              <div className="grid gap-3">
                {PROGRAMS.map(p => (
                  <button key={p.id} onClick={() => { setSelected(p.id); setTimeout(() => setStep(1), 250) }}
                    className={`w-full text-left p-5 rounded-xl border-2 cursor-pointer transition-all ${selected === p.id ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50 bg-surface-alt'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-primary">{p.title}</h4>
                        <p className="text-xs text-text-muted">{p.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-primary text-sm">{p.price}</span><span className="text-text-muted text-xs block">{p.duration}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h3 className="text-lg font-bold text-primary mb-1">{d.step2Title || 'Tus datos'}</h3>
              <p className="text-sm text-text-muted mb-6">{d.step2Subtitle || 'Te contactaremos por WhatsApp o email.'}</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-1">{d.nameLabel || 'Nombre completo'}</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full p-3 border border-border rounded-lg text-sm" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1">{d.emailLabel || 'Email'}</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full p-3 border border-border rounded-lg text-sm" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1">{d.phoneLabel || 'WhatsApp'}</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full p-3 border border-border rounded-lg text-sm" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-1">{d.messageLabel || 'Mensaje (opcional)'}</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full p-3 border border-border rounded-lg text-sm min-h-[80px]" placeholder={d.messagePlaceholder || '¿Tienes alguna pregunta específica sobre el programa?'} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(0)} className="px-6 py-3 border border-border rounded-full text-sm font-semibold text-text-muted cursor-pointer hover:border-accent">{d.backLabel || 'Atrás'}</button>
                <button onClick={() => setStep(2)} disabled={!form.name || !form.email}
                  className={`px-8 py-3 rounded-full text-sm font-bold cursor-pointer transition-all ${form.name && form.email ? 'bg-accent text-primary' : 'bg-border text-text-muted cursor-not-allowed'}`}>{d.nextLabel || 'Revisar'}</button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="text-lg font-bold text-primary mb-1">{d.step3Title || 'Confirma tu solicitud'}</h3>
              <p className="text-sm text-text-muted mb-6">{d.step3Subtitle || 'Revisá los datos antes de enviar.'}</p>
              <div className="space-y-3 mb-6">
                <div className="p-4 bg-surface-alt rounded-lg flex justify-between"><span className="text-sm text-text-muted">Programa</span><span className="text-sm font-semibold text-primary">{PROGRAMS.find(p => p.id === selected)?.title}</span></div>
                <div className="p-4 bg-surface-alt rounded-lg flex justify-between"><span className="text-sm text-text-muted">Nombre</span><span className="text-sm font-semibold text-primary">{form.name}</span></div>
                <div className="p-4 bg-surface-alt rounded-lg flex justify-between"><span className="text-sm text-text-muted">Email</span><span className="text-sm font-semibold text-primary">{form.email}</span></div>
                <div className="p-4 bg-surface-alt rounded-lg flex justify-between"><span className="text-sm text-text-muted">WhatsApp</span><span className="text-sm font-semibold text-primary">{form.phone}</span></div>
                {form.message && <div className="p-4 bg-surface-alt rounded-lg"><span className="text-sm text-text-muted block mb-1">Mensaje</span><span className="text-sm text-primary">{form.message}</span></div>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-3 border border-border rounded-full text-sm font-semibold text-text-muted cursor-pointer">{d.backLabel || 'Atrás'}</button>
                <button onClick={handleSubmit}
                  className="px-10 py-3 bg-accent text-primary rounded-full text-sm font-bold cursor-pointer hover:opacity-90">{d.submitLabel || 'Enviar solicitud'}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
