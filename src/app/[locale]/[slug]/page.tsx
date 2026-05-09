import { readdirSync } from 'fs'
import { join } from 'path'
import { loadPageData } from '../../../lib/page-data'
import SectionsRenderer from '../../../components/SectionsRenderer'
import type { Metadata } from 'next'

interface Props { params: Promise<{ locale: string; slug: string }> }

const LOCALES = ['es', 'en', 'nl', 'de']

export function generateStaticParams() {
  const pages = readdirSync(join(process.cwd(), 'nexa-pages'))
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
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
