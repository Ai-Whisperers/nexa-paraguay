'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const params = useParams()
  const locale = (params?.locale as string) || (typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'es')

  useEffect(() => {
    const consent = localStorage.getItem('nexa-cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('nexa-cookie-consent', 'accepted')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem('nexa-cookie-consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  const t = {
    es: {
      text: 'Usamos cookies para mejorar tu experiencia. Si continuás navegando, aceptás nuestra ',
      privacy: 'política de privacidad',
      reject: 'Rechazar',
      accept: 'Aceptar',
    },
    en: {
      text: 'We use cookies to improve your experience. By continuing to browse, you accept our ',
      privacy: 'privacy policy',
      reject: 'Reject',
      accept: 'Accept',
    },
    nl: {
      text: 'We gebruiken cookies om uw ervaring te verbeteren. Door verder te gaan, accepteert u ons ',
      privacy: 'privacybeleid',
      reject: 'Weigeren',
      accept: 'Accepteren',
    },
    de: {
      text: 'Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Durch weiteres Surfen akzeptieren Sie unsere ',
      privacy: 'Datenschutzerklärung',
      reject: 'Ablehnen',
      accept: 'Akzeptieren',
    },
  }[locale] || { text: '', privacy: '', reject: '', accept: '' }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-white p-4 shadow-2xl">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm leading-relaxed flex-1">
          {t.text}
          <a href={`/${locale}/privacidad`} className="text-accent underline">{t.privacy}</a>.
        </p>
        <div className="flex gap-2 shrink-0">
          <button onClick={reject} className="px-4 py-2 text-xs border border-white/30 rounded-full bg-transparent text-white/70 hover:text-white cursor-pointer">{t.reject}</button>
          <button onClick={accept} className="px-6 py-2 text-xs bg-accent text-primary rounded-full font-bold cursor-pointer hover:opacity-90">{t.accept}</button>
        </div>
      </div>
    </div>
  )
}
