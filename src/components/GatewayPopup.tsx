'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export function GatewayPopup() {
  const [show, setShow] = useState(false)
  const params = useParams()
  const locale = (params?.locale as string) || (typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'es')

  const t = {
    es: { title: 'Reinicio de sesión', text: 'Se ha reiniciado la sesión correctamente. Puedes cerrar esta ventana.', close: 'Cerrar' },
    en: { title: 'Session reset', text: 'Your session has been reset successfully. You can close this window.', close: 'Close' },
    nl: { title: 'Sessie reset', text: 'Uw sessie is succesvol gereset. U kunt dit venster sluiten.', close: 'Sluiten' },
    de: { title: 'Sitzung zurückgesetzt', text: 'Ihre Sitzung wurde erfolgreich zurückgesetzt. Sie können dieses Fenster schließen.', close: 'Schließen' },
  }[locale] || { title: '', text: '', close: '' }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('gateway=true')) setShow(true)
  }, [])
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
