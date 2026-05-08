import React, { useState, useEffect } from 'react'

const LOCALES = [
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'nl', flag: '🇳🇱', label: 'NL' },
  { code: 'de', flag: '🇩🇪', label: 'DE' },
]

const PATHS = [
  {
    id: 'relocation',
    icon: '🌍',
    title: 'Quiero mudarme a Paraguay',
    subtitle: 'Explorá programas de residencia y reubicación',
    href: '/programas',
  },
  {
    id: 'business',
    icon: '🏢',
    title: 'Soy empresario',
    subtitle: 'Constituí tu empresa en Paraguay',
    href: '/empresa',
  },
  {
    id: 'investor',
    icon: '📈',
    title: 'Soy inversor',
    subtitle: 'Estructurá tu inversión con acompañamiento',
    href: '/inversor',
  },
  {
    id: 'info',
    icon: 'ℹ️',
    title: 'Quiero información',
    subtitle: 'Conocé más sobre Nexa Paraguay',
    href: '/',
  },
]

interface GatewayPopupProps {
  locale: string
}

export function GatewayPopup({ locale: detectedLocale }: GatewayPopupProps) {
  const [step, setStep] = useState<'language' | 'path'>('language')
  const [selectedLocale, setSelectedLocale] = useState(detectedLocale || 'es')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const forceGateway = params.get('gateway') === 'true'
    const seen = document.cookie.split(';').some(c => c.trim().startsWith('gateway_seen='))
    if (forceGateway || !seen) {
      setVisible(true)
    }
  }, [])

  function setLocaleCookie(locale: string) {
    document.cookie = `NEXT_LOCALE=${locale}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`
  }

  function setGatewaySeenCookie() {
    document.cookie = `gateway_seen=true; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`
  }

  function handleLanguageSelect(code: string) {
    setSelectedLocale(code)
    setLocaleCookie(code)
    setStep('path')
  }

  function handlePathSelect(href: string) {
    setGatewaySeenCookie()
    const fullPath = '/' + selectedLocale + href
    window.location.href = fullPath
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <div style={{
        background: '#fff', borderRadius: '20px', maxWidth: '520px', width: '90%',
        padding: '2.5rem 2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        position: 'relative', textAlign: 'center',
      }}>
        {/* Logo */}
        <img
          src="/images/brand/logo.svg"
          alt="Nexa Paraguay"
          style={{ height: '40px', marginBottom: '1.5rem' }}
        />

        {step === 'language' ? (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1B2A4A', margin: '0 0 0.5rem' }}>
              Bienvenido a Nexa Paraguay
            </h2>
            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Elegí tu idioma para continuar
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {LOCALES.map(l => (
                <button
                  key={l.code}
                  onClick={() => handleLanguageSelect(l.code)}
                  style={{
                    padding: '0.75rem 1.5rem', borderRadius: '12px', border: '2px solid #E0E0E0',
                    background: selectedLocale === l.code ? '#F5F5F0' : '#fff',
                    cursor: 'pointer', fontSize: '1rem', fontWeight: 600, color: '#1B2A4A',
                    transition: 'all 0.2s', minWidth: '80px',
                    outline: selectedLocale === l.code ? '2px solid #C9A96E' : 'none',
                  }}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1B2A4A', margin: '0 0 0.5rem' }}>
              {selectedLocale === 'es' ? '¿Cuál es tu objetivo?' :
               selectedLocale === 'en' ? 'What is your goal?' :
               selectedLocale === 'nl' ? 'Wat is je doel?' :
               'Was ist Ihr Ziel?'}
            </h2>
            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {selectedLocale === 'es' ? 'Seleccioná el camino que mejor se adapte a vos' :
               selectedLocale === 'en' ? 'Select the path that best fits you' :
               selectedLocale === 'nl' ? 'Kies het pad dat het beste bij je past' :
               'Wählen Sie den Weg, der am besten zu Ihnen passt'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {PATHS.map(p => (
                <button
                  key={p.id}
                  onClick={() => handlePathSelect(p.href)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1rem 1.25rem', borderRadius: '12px', border: '2px solid #E8E8E8',
                    background: '#FAFAFA', cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s', width: '100%',
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = '#C9A96E'; (e.target as HTMLElement).style.background = '#F5F5F0'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = '#E8E8E8'; (e.target as HTMLElement).style.background = '#FAFAFA'; }}
                >
                  <span style={{ fontSize: '1.8rem' }}>{p.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1B2A4A', fontSize: '0.95rem', marginBottom: '0.15rem' }}>{p.title}</div>
                    <div style={{ color: '#888', fontSize: '0.8rem' }}>{p.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('language')}
              style={{
                marginTop: '1rem', background: 'none', border: 'none', color: '#C9A96E',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'underline',
              }}
            >
              {selectedLocale === 'es' ? '← Cambiar idioma' :
               selectedLocale === 'en' ? '← Change language' :
               selectedLocale === 'nl' ? '← Taal wijzigen' :
               '← Sprache ändern'}
            </button>
          </>
        )}

        {/* Skip link */}
        <button
          onClick={() => { setGatewaySeenCookie(); setVisible(false); }}
          style={{
            display: 'block', margin: '1rem auto 0', background: 'none', border: 'none',
            color: '#999', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline',
          }}
        >
          {selectedLocale === 'es' ? 'Omitir y ver el sitio' :
           selectedLocale === 'en' ? 'Skip and view site' :
           selectedLocale === 'nl' ? 'Overslaan en site bekijken' :
           'Überspringen und Seite ansehen'}
        </button>
      </div>
    </div>
  )
}
