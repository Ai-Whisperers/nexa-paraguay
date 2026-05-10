import { loadPageData, getPageSlugs } from '@/lib/page-data'
import SectionsRenderer from '@/components/SectionsRenderer'
import type { Metadata } from 'next'
import { LOCALES } from '@/lib/locales'

interface Props { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  const pages = getPageSlugs()
  const params: { locale: string; slug: string }[] = []
  for (const locale of LOCALES) {
    for (const slug of pages) {
      params.push({ locale, slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const data = await loadPageData(locale, slug)
  if (!data) return {}
  return { 
    title: data.pageConfig?.title || data.content?.siteName || 'Nexa Paraguay', 
    alternates: { languages: { es: `/es/${slug}`, en: `/en/${slug}`, nl: `/nl/${slug}`, de: `/de/${slug}` } } 
  }
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  const data = await loadPageData(locale, slug)
  if (!data) return <div className="text-center p-16 text-text-muted">Not found</div>
  return <SectionsRenderer content={data.content} pageConfig={data.pageConfig} images={data.images?.images || {}} locale={data.locale} />
}
