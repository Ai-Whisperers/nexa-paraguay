import { loadPageData } from '../../lib/page-data'
import SectionsRenderer from '../../components/SectionsRenderer'
import type { Metadata } from 'next'
import { LOCALES } from '@/lib/locales'

interface Props { params: Promise<{ locale: string }> }

export async function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const data = await loadPageData(locale, 'home')
  if (!data?.pageConfig) return {}
  return { title: data.pageConfig.title || 'Nexa Paraguay', alternates: { languages: { es: '/es', en: '/en', nl: '/nl', de: '/de' } } }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  const data = await loadPageData(locale, 'home')
  if (!data) return <div className="text-center p-16 text-text-muted">Page not found</div>
  return <SectionsRenderer content={data.content} pageConfig={data.pageConfig} images={data.images?.images || {}} locale={data.locale} />
}
