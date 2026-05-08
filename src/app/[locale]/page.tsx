import { Suspense } from 'react'
import { loadPageData } from '../../lib/page-data'
import SectionsRenderer from '../../components/SectionsRenderer'
import type { Metadata } from 'next'

interface Props { params: Promise<{ locale: string }> }

export async function generateStaticParams() {
  return ['es', 'en', 'nl', 'de'].map(locale => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const data = loadPageData(locale, 'home')
  if (!data?.pageConfig) return {}
  return { title: data.pageConfig.title || 'Nexa Paraguay', alternates: { languages: { es: '/es', en: '/en', nl: '/nl', de: '/de' } } }
}

function PageSkeleton() {
  return (
    <div className="font-inter">
      <div className="h-16 bg-primary/5 animate-pulse" />
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="h-12 bg-primary/10 rounded-lg w-3/4 mx-auto animate-pulse mb-6" />
        <div className="h-6 bg-primary/5 rounded w-1/2 mx-auto animate-pulse mb-12" />
        <div className="flex gap-4 justify-center">
          <div className="h-12 w-40 bg-accent/30 rounded-full animate-pulse" />
          <div className="h-12 w-40 bg-primary/10 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}

async function PageContent({ locale }: { locale: string }) {
  const data = loadPageData(locale, 'home')
  if (!data) return <div className="text-center p-16 text-text-muted">Page not found</div>
  return <SectionsRenderer content={data.content} pageConfig={data.pageConfig} images={data.images} locale={data.locale} />
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PageContent locale={locale} />
    </Suspense>
  )
}
