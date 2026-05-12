'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { GATEWAY_POPUP, getLocaleStrings } from '@ai-whisperers/i18n'

export function GatewayPopup() {
  const [show, setShow] = useState(() => (
    typeof window !== 'undefined' && window.location.search.includes('gateway=true')
  ))
  const params = useParams()
  const locale = (params?.locale as string) || (typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'es')

  const t = getLocaleStrings(GATEWAY_POPUP, locale)

  if (!show) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
        <h2 className="text-lg font-bold text-primary mb-4">{t.title}</h2>
        <p className="text-sm text-text-muted mb-6">{t.text}</p>
        <button onClick={() => setShow(false)}
          className="px-6 py-3 bg-accent text-primary rounded-full font-bold text-sm cursor-pointer border-none hover:opacity-90">
          {t.close}
        </button>
      </div>
    </div>
  )
}
