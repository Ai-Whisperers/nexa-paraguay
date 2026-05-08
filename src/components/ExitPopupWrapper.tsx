'use client'

import dynamic from 'next/dynamic'

const ExitPopup = dynamic(() => import('./ExitPopup').then(m => m.ExitPopup), { ssr: false })

const DEFAULT_DATA = {
  title: '¿Considerando mudarte a Paraguay?',
  subtitle: 'Descargá nuestra guía completa con todo lo que necesitás saber: costos, requisitos, trámites y más.',
  placeholder: 'tu@email.com',
  ctaLabel: 'Descargar guía gratuita',
  closeLabel: 'No, gracias',
  confirmTitle: '¡Guía enviada!',
  confirmText: 'Revisá tu bandeja de entrada. Si no lo ves en unos minutos, revisá spam.',
  disclaimer: 'Sin spam. Te enviaremos la guía y 1-2 correos más. Podés cancelar cuando quieras.',
}

export default function ExitPopupWrapper() {
  return <ExitPopup data={DEFAULT_DATA} />
}
