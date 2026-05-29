'use client'

import React, { useState } from 'react'
import { trackFormStart, trackFormStep, trackFormSubmit, trackFormAbandon } from '@/lib/ga4'

// ── Types ──────────────────────────────────────────────
interface FormData {
  // Step 1
  fullName: string
  email: string
  phone: string
  country: string
  nationality: string
  // Step 2
  goals: string[]        // Residency | Company | Banking | All
  // Step 3
  timeline: string       // asap | 1-3months | 3-6months | exploring
  // Step 4
  program: string        // base | business | investor | land
  // Step 5
  hearAbout: string
  notes: string
}

// ── Copy ───────────────────────────────────────────────
const copy = {
  es: {
    stepLabels: ['Tus datos', 'Tus objetivos', 'Tu tiempo', 'Tu programa', 'Extra'],
    name: 'Nombre completo',
    namePH: 'Tu nombre y apellido',
    email: 'Correo electrónico',
    emailPH: 'tu@email.com',
    phone: 'Teléfono (WhatsApp)',
    phonePH: '+595 9XX XXX XXX',
    country: 'País de residencia',
    countryPH: 'País donde vives actualmente',
    nationality: 'Nacionalidad',
    nationalityPH: 'Tu nacionalidad',
    goalQ: '¿Qué te gustaría lograr?',
    goals: {
      residency: 'Residencia permanente en Paraguay',
      company: 'Constituir una empresa paraguaya',
      banking: 'Abrir cuenta bancaria paraguaya',
      all: 'Todo lo anterior',
    },
    timelineQ: '¿Cuándo te gustaría empezar?',
    timeline: {
      asap: 'Lo antes posible',
      '1-3months': 'En 1 a 3 meses',
      '3-6months': 'En 3 a 6 meses',
      exploring: 'Solo explorando opciones',
    },
    programQ: '¿Qué programa te interesa?',
    programs: {
      base: 'Residencia — USD $4,500',
      business: 'Negocio — USD $7,500',
      investor: 'Inversor — USD $12,000',
      land: 'Terreno — USD $2,500',
      undecided: 'Aún no estoy seguro',
    },
    hearAboutQ: '¿Cómo nos encontraste?',
    hearAboutPH: 'Selecciona una opción',
    notesQ: '¿Algo más que quieras compartir?',
    notesPH: 'Cualquier detalle adicional que nos ayude a preparar tu consulta...',
    back: 'Atrás',
    next: 'Siguiente',
    submit: 'Enviar',
    submitting: 'Enviando...',
    successHeadline: '¡Listo!',
    successBody: 'Gracias por tu mensaje. Te contactaremos pronto para agendar tu consulta gratuita.',
    optional: 'opcional',
    errorRequired: 'Por favor completa este campo',
    errorEmail: 'Correo electrónico inválido',
  },
  en: {
    stepLabels: ['Your details', 'Your goals', 'Your timeline', 'Your program', 'Extra'],
    name: 'Full name',
    namePH: 'Your full name',
    email: 'Email address',
    emailPH: 'your@email.com',
    phone: 'Phone (WhatsApp)',
    phonePH: '+31 6 XXXXXXX',
    country: 'Country of residence',
    countryPH: 'Country you currently live in',
    nationality: 'Nationality',
    nationalityPH: 'Your nationality',
    goalQ: 'What would you like to achieve?',
    goals: {
      residency: 'Permanent residency in Paraguay',
      company: 'Incorporate a Paraguayan company',
      banking: 'Open a Paraguayan bank account',
      all: 'All of the above',
    },
    timelineQ: 'When would you like to start?',
    timeline: {
      asap: 'As soon as possible',
      '1-3months': 'In 1–3 months',
      '3-6months': 'In 3–6 months',
      exploring: 'Just exploring options',
    },
    programQ: 'Which program interests you?',
    programs: {
      base: 'Base — Permanent Residency — USD $4,500',
      business: 'Business — Residency + Company — USD $7,500',
      investor: 'Investor — USD $12,000',
      land: 'Land — USD $2,500',
      undecided: "Not sure yet",
    },
    hearAboutQ: 'How did you find us?',
    hearAboutPH: 'Select an option',
    notesQ: 'Anything else to share?',
    notesPH: 'Any additional details to help us prepare your consultation...',
    back: 'Back',
    next: 'Next',
    submit: 'Send',
    submitting: 'Sending...',
    successHeadline: 'All set!',
    successBody: "Thank you. We'll be in touch shortly to schedule your free consultation.",
    optional: 'optional',
    errorRequired: 'This field is required',
    errorEmail: 'Invalid email address',
  },
  nl: {
    stepLabels: ['Jouw gegevens', 'Jouw doelen', 'Jouw tijdlijn', 'Jouw programma', 'Extra'],
    name: 'Volledige naam',
    namePH: 'Jouw volledige naam',
    email: 'E-mailadres',
    emailPH: 'jouw@email.com',
    phone: 'Telefoon (WhatsApp)',
    phonePH: '+31 6 XXXXXXX',
    country: 'Land van verblijf',
    countryPH: 'Land waar je momenteel woont',
    nationality: 'Nationaliteit',
    nationalityPH: 'Jouw nationaliteit',
    goalQ: 'Wat wil je bereiken?',
    goals: {
      residency: 'Permanente verblijfsvergunning in Paraguay',
      company: 'Paraguyaans bedrijf oprichten',
      banking: 'Paraguyaanse bankrekening openen',
      all: 'Alles van het bovenstaande',
    },
    timelineQ: 'Wanneer wil je beginnen?',
    timeline: {
      asap: 'Zo snel mogelijk',
      '1-3months': 'Binnen 1–3 maanden',
      '3-6months': 'Binnen 3–6 maanden',
      exploring: 'Alleen opties verkennen',
    },
    programQ: 'Welk programma interesseert je?',
    programs: {
      base: 'Base — Verblijfsvergunning — USD $4,500',
      business: 'Business — Vergunning + Bedrijf — USD $7,500',
      investor: 'Investor — USD $12,000',
      land: 'Land — USD $2,500',
      undecided: 'Nog niet zeker',
    },
    hearAboutQ: 'Hoe heb je ons gevonden?',
    hearAboutPH: 'Selecteer een optie',
    notesQ: 'Nog iets te delen?',
    notesPH: 'Extra details om ons te helpen bij het voorbereiden van je consultatie...',
    back: 'Terug',
    next: 'Volgende',
    submit: 'Verzenden',
    submitting: 'Verzenden...',
    successHeadline: 'Klaar!',
    successBody: 'Bedankt. We nemen snel contact op om je gratis consultatie te plannen.',
    optional: 'optioneel',
    errorRequired: 'Dit veld is verplicht',
    errorEmail: 'Ongeldig e-mailadres',
  },
  de: {
    stepLabels: ['Ihre Daten', 'Ihre Ziele', 'Ihr Zeitplan', 'Ihr Programm', 'Extra'],
    name: 'Vollständiger Name',
    namePH: 'Ihr vollständiger Name',
    email: 'E-Mail-Adresse',
    emailPH: 'ihre@email.com',
    phone: 'Telefon (WhatsApp)',
    phonePH: '+49 1XX XXXXXXX',
    country: 'Wohnland',
    countryPH: 'Land, in dem Sie derzeit wohnen',
    nationality: 'Staatsangehörigkeit',
    nationalityPH: 'Ihre Staatsangehörigkeit',
    goalQ: 'Was möchten Sie erreichen?',
    goals: {
      residency: 'Daueraufenthaltsgenehmigung in Paraguay',
      company: 'Paraguayische Gesellschaft gründen',
      banking: 'Paraguayisches Bankkonto eröffnen',
      all: 'Alle oben genannten Punkte',
    },
    timelineQ: 'Wann möchten Sie beginnen?',
    timeline: {
      asap: 'So bald wie möglich',
      '1-3months': 'In 1–3 Monaten',
      '3-6months': 'In 3–6 Monaten',
      exploring: 'Nur Optionen erkunden',
    },
    programQ: 'Welches Programm interessiert Sie?',
    programs: {
      base: 'Basis — Aufenthaltsgenehmigung — USD $4,500',
      business: 'Business — Genehmigung + Unternehmen — USD $7,500',
      investor: 'Investor — USD $12,000',
      land: 'Land — USD $2,500',
      undecided: 'Noch nicht sicher',
    },
    hearAboutQ: 'Wie haben Sie uns gefunden?',
    hearAboutPH: 'Option auswählen',
    notesQ: 'Noch etwas mitzuteilen?',
    notesPH: 'Zusätzliche Details, die uns bei der Vorbereitung Ihrer Beratung helfen...',
    back: 'Zurück',
    next: 'Weiter',
    submit: 'Absenden',
    submitting: 'Wird gesendet...',
    successHeadline: 'Fertig!',
    successBody: 'Vielen Dank. Wir melden uns in Kürze, um Ihre kostenlose Beratung zu planen.',
    optional: 'optional',
    errorRequired: 'Dieses Feld ist erforderlich',
    errorEmail: 'Ungültige E-Mail-Adresse',
  },
}

// ── Country options ────────────────────────────────────
const countries = [
  'Netherlands', 'Belgium', 'Germany', 'Austria', 'Switzerland',
  'United Kingdom', 'France', 'Spain', 'Italy', 'Portugal',
  'United States', 'Canada', 'Australia', 'New Zealand',
  'Brazil', 'Argentina', 'Chile', 'Colombia', 'Other',
]

const hearAboutOptions = [
  'Google / Search', 'LinkedIn', 'Instagram', 'Facebook',
  'Recommendation / Word of mouth', 'YouTube', 'Podcast', 'Other',
]

// ── Component ───────────────────────────────────────────
interface Props { locale?: string }

export function IntakeWizard({ locale = 'en' }: Props) {
  const t = copy[locale as keyof typeof copy] || copy.en

  const TOTAL_STEPS = 5
  const [currentStep, setCurrentStep] = useState(0)
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [data, setData] = useState<FormData>({
    fullName: '', email: '', phone: '', country: '', nationality: '',
    goals: [],
    timeline: '',
    program: '',
    hearAbout: '',
    notes: '',
  })

  // GA4: track intake form start
  React.useEffect(() => { trackFormStart('intake-wizard', 'intake') }, [])

  // ── Abandonment tracking (tab close / navigate away) ──
  React.useEffect(() => {
    if (done) return
    const handler = () => { trackFormAbandon('intake-wizard', 'intake', currentStep) }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [done, currentStep])

  // ── Setters with error clear ──
  const set = (key: keyof FormData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }))
    setErrors(prev => { const n = { ...prev }; delete n[key]; return n })
  }

  const toggleGoal = (goal: string) => {
    const current = data.goals
    if (current.includes(goal)) {
      set('goals', current.filter(g => g !== goal))
    } else {
      set('goals', [...current, goal])
    }
  }

  // ── Validation ──
  const validateStep = (): boolean => {
    const e: Partial<Record<string, string>> = {}
    if (currentStep === 0) {
      if (!data.fullName.trim()) e.fullName = t.errorRequired
      if (!data.email.trim()) e.email = t.errorRequired
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = t.errorEmail
    }
    if (currentStep === 1) {
      if (data.goals.length === 0) e.goals = t.errorRequired
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validateStep()) { trackFormStep('intake-wizard', currentStep + 1, t.stepLabels[currentStep]); setCurrentStep(s => s + 1) } }
  const back = () => { setErrors({}); setCurrentStep(s => s - 1) }

  // ── Submit ──
  const submit = async () => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      })
      const json = await res.json()
      const ok = res.ok && json.success === true
      trackFormSubmit('intake-wizard', 'intake', ok)
      if (ok) {
        setDone(true)
      } else {
        setSubmitError(locale === 'es'
          ? 'No pudimos enviar tu solicitud. Probá de nuevo en unos minutos.'
          : locale === 'nl'
            ? 'We konden je aanvraag niet verzenden. Probeer het over een paar minuten opnieuw.'
            : locale === 'de'
              ? 'Wir konnten Ihre Anfrage nicht senden. Bitte versuchen Sie es in ein paar Minuten erneut.'
              : 'We could not submit your request. Please try again in a few minutes.')
      }
    } catch {
      trackFormSubmit('intake-wizard', 'intake', false)
      setSubmitError(locale === 'es'
        ? 'No pudimos enviar tu solicitud. Probá de nuevo en unos minutos.'
        : locale === 'nl'
          ? 'We konden je aanvraag niet verzenden. Probeer het over een paar minuten opnieuw.'
          : locale === 'de'
            ? 'Wir konnten Ihre Anfrage nicht senden. Bitte versuchen Sie es in ein paar Minuten erneut.'
            : 'We could not submit your request. Please try again in a few minutes.')
    }
    setSubmitting(false)
  }

  // ── Progress ──
  const progress = ((currentStep) / TOTAL_STEPS) * 100

  // ── Done ──
  if (done) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center px-4'>
        <div className='max-w-lg text-center space-y-6'>
          <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto'>
            <svg className='w-10 h-10 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
          </div>
          <div>
            <h2 className='text-3xl font-bold text-primary'>{t.successHeadline}</h2>
            <p className='text-text-muted mt-3 text-lg'>{t.successBody}</p>
          </div>
          <a
            href={`/${locale}`}
            className='inline-block px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition'
          >
            ← {locale === 'es' ? 'Volver al inicio' : locale === 'nl' ? 'Terug naar home' : locale === 'de' ? 'Zurück zur Startseite' : 'Back to home'}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16'>
      {/* Header */}
      <div className='w-full max-w-xl mb-8'>
        {/* Progress bar */}
        <div className='flex items-center gap-2 mb-4'>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className='flex-1 h-1.5 rounded-full overflow-hidden bg-border'>
              <div
                className='h-full bg-secondary transition-all duration-300'
                style={{ width: i < currentStep ? '100%' : i === currentStep ? `${(currentStep / TOTAL_STEPS) * 100}%` : '0%' }}
              />
            </div>
          ))}
        </div>
        <p className='text-sm text-text-muted font-medium'>
          {t.stepLabels[currentStep]} <span className='text-text-muted'>— {currentStep + 1}/{TOTAL_STEPS}</span>
        </p>
      </div>

      {/* Form card */}
      <div className='w-full max-w-xl bg-white rounded-2xl border border-border shadow-sm overflow-hidden'>
        {/* Step 0: Personal info */}
        {currentStep === 0 && (
          <div className='p-8 space-y-5'>
            <FormField label={t.name} error={errors.fullName} optional={false}>
              <input
                type='text' value={data.fullName} onChange={e => set('fullName', e.target.value)}
                placeholder={t.namePH} autoFocus
                className={fieldCls(!!errors.fullName)}
              />
            </FormField>
            <FormField label={t.email} error={errors.email} optional={false}>
              <input
                type='email' value={data.email} onChange={e => set('email', e.target.value)}
                placeholder={t.emailPH}
                className={fieldCls(!!errors.email)}
              />
            </FormField>
            <FormField label={t.phone} optional>
              <input
                type='tel' value={data.phone} onChange={e => set('phone', e.target.value)}
                placeholder={t.phonePH}
                className={fieldCls(false)}
              />
            </FormField>
            <FormField label={t.country} optional>
              <select value={data.country} onChange={e => set('country', e.target.value)} className={fieldCls(false) + ' cursor-pointer'}>
                <option value=''>{t.countryPH}</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label={t.nationality} optional>
              <input
                type='text' value={data.nationality} onChange={e => set('nationality', e.target.value)}
                placeholder={t.nationalityPH}
                className={fieldCls(false)}
              />
            </FormField>
          </div>
        )}

        {/* Step 1: Goals */}
        {currentStep === 1 && (
          <div className='p-8 space-y-5'>
            <div>
              <p className='text-base font-semibold text-primary mb-1'>{t.goalQ}</p>
              {errors.goals && <p className='text-error text-sm mb-3'>{errors.goals}</p>}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                {(Object.keys(t.goals) as Array<keyof typeof t.goals>).map(key => {
                  const goalLabels = t.goals as Record<string, string>
                  return (
                    <button
                      key={key}
                      type='button'
                      onClick={() => toggleGoal(key)}
                      className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${
                        data.goals.includes(key)
                          ? 'border-secondary bg-secondary/5 text-primary'
                          : 'border-border bg-white text-primary hover:border-secondary/50'
                      }`}
                    >
                      <span className='text-sm'>{goalLabels[key]}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Timeline */}
        {currentStep === 2 && (
          <div className='p-8 space-y-5'>
            <p className='text-base font-semibold text-primary mb-1'>{t.timelineQ}</p>
            <div className='space-y-3'>
              {(Object.keys(t.timeline) as Array<keyof typeof t.timeline>).map(key => {
                const tl = t.timeline as Record<string, string>
                return (
                  <button
                    key={key}
                    type='button'
                    onClick={() => set('timeline', key)}
                    className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                      data.timeline === key
                        ? 'border-secondary bg-secondary/5 text-primary'
                        : 'border-border bg-white text-primary hover:border-secondary/50'
                    }`}
                  >
                    {tl[key]}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 3: Program */}
        {currentStep === 3 && (
          <div className='p-8 space-y-5'>
            <p className='text-base font-semibold text-primary mb-1'>{t.programQ}</p>
            <div className='space-y-3'>
              {(Object.keys(t.programs) as Array<keyof typeof t.programs>).map(key => {
                const pg = t.programs as Record<string, string>
                return (
                  <button
                    key={key}
                    type='button'
                    onClick={() => set('program', key)}
                    className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                      data.program === key
                        ? 'border-secondary bg-secondary/5 text-primary'
                        : 'border-border bg-white text-primary hover:border-secondary/50'
                    }`}
                  >
                    {pg[key]}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 4: Extra */}
        {currentStep === 4 && (
          <div className='p-8 space-y-5'>
            <FormField label={t.hearAboutQ}>
              <select value={data.hearAbout} onChange={e => set('hearAbout', e.target.value)} className={fieldCls(false) + ' cursor-pointer'}>
                <option value=''>{t.hearAboutPH}</option>
                {hearAboutOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </FormField>
            <FormField label={t.notesQ}>
              <textarea
                value={data.notes} onChange={e => set('notes', e.target.value)}
                placeholder={t.notesPH}
                rows={4}
                className={fieldCls(false) + ' resize-none'}
              />
            </FormField>
          </div>
        )}

        {submitError && (
          <div className='px-8 pt-5'>
            <p className='text-error text-sm font-medium'>{submitError}</p>
          </div>
        )}

        {/* Navigation */}
        <div className='flex justify-between items-center px-8 py-5 border-t border-border bg-surface-alt/50'>
          <button
            type='button'
            onClick={back}
            disabled={currentStep === 0}
            className='px-5 py-2.5 text-text-muted font-medium rounded-xl hover:bg-border/50 disabled:opacity-30 disabled:cursor-not-allowed transition'
          >
            {t.back}
          </button>

          {currentStep < TOTAL_STEPS - 1 ? (
            <button
              type='button'
              onClick={next}
              className='px-7 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition'
            >
              {t.next} →
            </button>
          ) : (
            <button
              type='button'
              onClick={submit}
              disabled={submitting}
              className='px-7 py-2.5 bg-secondary text-primary font-semibold rounded-xl hover:bg-secondary/90 disabled:opacity-60 transition'
            >
              {submitting ? `⟳ ${t.submitting}` : `✓ ${t.submit}`}
            </button>
          )}
        </div>
      </div>

      {/* Trust signals */}
      <div className='mt-8 flex items-center gap-6 text-text-muted text-sm'>
        <span className='flex items-center gap-1.5'>
          <svg className='w-4 h-4 text-green-500' fill='currentColor' viewBox='0 0 20 20'><path fillRule='evenodd' d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' /></svg>
          SEPRELAD registered
        </span>
        <span className='flex items-center gap-1.5'>
          <svg className='w-4 h-4 text-green-500' fill='currentColor' viewBox='0 0 20 20'><path fillRule='evenodd' d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' /></svg>
          No spam guarantee
        </span>
      </div>
    </div>
  )
}

// ── Helper components ───────────────────────────────────
function FormField({ label, error, optional = false, children }: {
  label: string
  error?: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className='block text-sm font-medium text-primary mb-1.5'>
        {label}
        {optional && <span className='text-text-muted font-normal ml-1 text-xs'>(optional)</span>}
      </label>
      <div className='w-full'>{children}</div>
      {error && <p className='text-error text-sm mt-1'>{error}</p>}
    </div>
  )
}

const fieldCls = (hasError: boolean) =>
  `w-full px-4 py-3 border rounded-xl text-primary outline-none transition focus:ring-2 focus:ring-secondary/50 ${hasError ? 'border-error' : 'border-border'}`