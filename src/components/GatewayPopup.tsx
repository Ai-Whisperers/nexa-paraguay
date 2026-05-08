'use client'

import React, { useEffect, useState } from 'react'

export function GatewayPopup() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('gateway=true')) setShow(true)
  }, [])
  if (!show) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
        <h2 className="text-lg font-bold text-primary mb-4">Reinicio de sesión</h2>
        <p className="text-sm text-text-muted mb-6">Se ha reiniciado la sesión correctamente. Puedes cerrar esta ventana.</p>
        <button onClick={() => setShow(false)}
          className="px-6 py-3 bg-accent text-primary rounded-full font-bold text-sm cursor-pointer border-none hover:opacity-90">
          Cerrar
        </button>
      </div>
    </div>
  )
}
