import { loadPageData } from '../../../lib/page-data'
import SectionsRenderer from '../../../components/SectionsRenderer'
import type { Metadata } from 'next'

interface Props { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const data = loadPageData(locale, slug)
  if (!data) return {}
  return { title: data.pageConfig?.title || 'Nexa Paraguay', alternates: { languages: { es: `/es/${slug}`, en: `/en/${slug}`, nl: `/nl/${slug}`, de: `/de/${slug}` } } }
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  const data = loadPageData(locale, slug)
  if (!data) return <div className="text-center p-16 text-text-muted">Not found</div>
  return <SectionsRenderer content={data.content} pageConfig={data.pageConfig} images={data.images} locale={data.locale} />
}

export const revalidate = 3600
export const dynamicParams = true
