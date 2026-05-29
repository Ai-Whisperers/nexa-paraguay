import type { Metadata } from 'next'
import { IntakeWizard } from '@/components/IntakeWizard'
import { LOCALES } from '@/lib/locales'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

interface Props { params: Promise<{ locale: string }> }

export async function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    es: 'Encuentra tu programa ideal — Nexa Paraguay',
    en: 'Find your ideal program — Nexa Paraguay',
    nl: 'Vind uw ideale programma — Nexa Paraguay',
    de: 'Finden Sie Ihr ideales Programm — Nexa Paraguay',
  }
  const descriptions: Record<string, string> = {
    es: 'Responde unas preguntas y te recomendamos el programa perfecto para ti.',
    en: 'Answer a few questions and we will recommend the right program for you.',
    nl: 'Beantwoord een paar vragen en we raden het juiste programma voor u aan.',
    de: 'Beantworten Sie ein paar Fragen und wir empfehlen Ihnen das richtige Programm.',
  }
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `https://nexa.paragu-ai.com/${locale}/intake`,
      languages: Object.fromEntries(LOCALES.map(l => [l, `https://nexa.paragu-ai.com/${l}/intake`])),
    },
  }
}

export default async function IntakePage({ params }: Props) {
  const { locale } = await params
  return (
    <>
      <IntakeWizard locale={locale || 'en'} />
    </>
  )
}