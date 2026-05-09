'use client'

import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { EXIT_POPUP, getLocaleStrings } from '@ai-whisperers/i18n'

const ExitPopup = dynamic(() => import('./ExitPopup').then(m => m.ExitPopup), { ssr: false })

export default function ExitPopupWrapper() {
  const params = useParams()
  const locale = (params?.locale as string) || 'es'
  const data = getLocaleStrings(EXIT_POPUP, locale)
  return <ExitPopup data={data} />
}
