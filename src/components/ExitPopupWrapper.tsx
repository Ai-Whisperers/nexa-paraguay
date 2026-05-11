'use client'

import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { readFileSync } from 'fs'

const ExitPopup = dynamic(() => import('./ExitPopup').then(m => m.ExitPopup), { ssr: false })

export default function ExitPopupWrapper() {
  const params = useParams()
  const locale = (params?.locale as string) || 'es'
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/content?locale=' + locale + '&key=exitPopup')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {})
  }, [locale])

  if (!data) return null
  return <ExitPopup data={data} />
}
