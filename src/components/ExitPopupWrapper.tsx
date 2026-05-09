'use client'

import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'

const ExitPopup = dynamic(() => import('./ExitPopup').then(m => m.ExitPopup), { ssr: false })

const TRANSLATIONS: Record<string, any> = {
  es: {
    title: '¿Considerando mudarte a Paraguay?',
    subtitle: 'Descargá nuestra guía completa con todo lo que necesitás saber: costos, requisitos, trámites y más.',
    placeholder: 'tu@email.com',
    ctaLabel: 'Descargar guía gratuita',
    closeLabel: 'No, gracias',
    confirmTitle: '¡Guía enviada!',
    confirmText: 'Revisá tu bandeja de entrada. Si no lo ves en unos minutos, revisá spam.',
    disclaimer: 'Sin spam. Te enviaremos la guía y 1-2 correos más. Podés cancelar cuando quieras.',
  },
  en: {
    title: 'Moving to Paraguay?',
    subtitle: 'Download our complete guide with everything you need to know: costs, requirements, paperwork and more.',
    placeholder: 'your@email.com',
    ctaLabel: 'Download free guide',
    closeLabel: 'No, thanks',
    confirmTitle: 'Guide sent!',
    confirmText: 'Check your inbox. If you don\'t see it in a few minutes, check spam.',
    disclaimer: 'No spam. We\'ll send the guide and 1-2 follow-up emails. You can unsubscribe anytime.',
  },
  nl: {
    title: 'Overweegt u een verhuizing naar Paraguay?',
    subtitle: 'Download onze complete gids met alles wat u moet weten: kosten, vereisten, formaliteiten en meer.',
    placeholder: 'uw@email.com',
    ctaLabel: 'Download gratis gids',
    closeLabel: 'Nee, bedankt',
    confirmTitle: 'Gids verzonden!',
    confirmText: 'Controleer uw inbox. Als u het niet binnen een paar minuten ziet, controleer dan de spam.',
    disclaimer: 'Geen spam. We sturen de gids en 1-2 vervolgmailtjes. U kunt zich altijd uitschrijven.',
  },
  de: {
    title: 'Erwägen Sie einen Umzug nach Paraguay?',
    subtitle: 'Laden Sie unseren vollständigen Leitfaden mit allem, was Sie wissen müssen: Kosten, Anforderungen, Formalitäten und mehr.',
    placeholder: 'ihre@email.com',
    ctaLabel: 'Kostenlosen Leitfaden herunterladen',
    closeLabel: 'Nein, danke',
    confirmTitle: 'Leitfaden gesendet!',
    confirmText: 'Überprüfen Sie Ihren Posteingang. Wenn Sie ihn nicht innerhalb weniger Minuten sehen, überprüfen Sie den Spam-Ordner.',
    disclaimer: 'Kein Spam. Wir senden den Leitfaden und 1-2 Folge-E-Mails. Sie können sich jederzeit abmelden.',
  },
}

export default function ExitPopupWrapper() {
  const params = useParams()
  const locale = (params?.locale as string) || 'es'
  const data = TRANSLATIONS[locale] || TRANSLATIONS.es
  return <ExitPopup data={data} />
}
