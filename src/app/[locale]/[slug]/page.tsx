import { Suspense } from 'react'
import { readdirSync } from 'fs'
import { join } from 'path'
import { loadPageData } from '../../../lib/page-data'
import SectionsRenderer from '../../../components/SectionsRenderer'
import type { Metadata } from 'next'

interface Props { params: Promise<{ locale: string; slug: string }> }

const LOCALES = ['es', 'en', 'nl', 'de']

function PageSkeleton() {
  return (
    <div className="font-inter">
      <div className="h-16 bg-primary/5 animate-pulse" />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="h-10 bg-primary/10 rounded-lg w-1/2 animate-pulse mb-4" />
        <div className="h-5 bg-primary/5 rounded w-1/3 animate-pulse mb-8" />
        <div className="space-y-3">
          {[1,2,3,4].map(i => <div key={i} className="h-4 bg-primary/5 rounded w-full animate-pulse" />)}
        </div>
      </div>
    </div>
  )
}

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

async function PageContent({ locale, slug }: { locale: string; slug: string }) {
  const data = loadPageData(locale, slug)
  if (!data) return <div className="text-center p-16 text-text-muted">Not found</div>
  return <SectionsRenderer content={data.content} pageConfig={data.pageConfig} images={data.images} locale={data.locale} />
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PageContent locale={locale} slug={slug} />
    </Suspense>
  )
}
