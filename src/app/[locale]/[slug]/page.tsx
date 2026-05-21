import { loadPageData, getPageSlugs } from '@/lib/page-data'
import SectionsRenderer from '@/components/SectionsRenderer'
import type { Metadata } from 'next'
import { LOCALES } from '@/lib/locales'
import { generateBreadcrumbSchema, generateFaqSchema } from '@/lib/schemas'

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
    description: data.pageConfig?.description || data.content?.description || '',
    openGraph: {
      title: data.pageConfig?.title || data.content?.siteName,
      description: data.pageConfig?.description || data.content?.description || '',
      images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
    },
    alternates: { languages: { es: `/es/${slug}`, en: `/en/${slug}`, nl: `/nl/${slug}`, de: `/de/${slug}` } },
  }
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  const data = await loadPageData(locale, slug)
  if (!data) return <div className="text-center p-16 text-text-muted">Not found</div>

  const baseUrl = `https://nexaparaguay.com/${locale}`
  const pageUrl = `${baseUrl}/${slug}`

  // Determine page name for breadcrumbs
  const pageName = data.pageConfig?.title || data.content?.siteName || slug

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateBreadcrumbSchema(baseUrl, pageUrl, pageName)),
      }} />

      {/* FaqPage schema if the page config has FAQ items */}
      {data.pageConfig?.sections?.some((s: any) => s.type === 'faq') && data.content?.faq?.items && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqSchema(data.content.faq.items)),
        }} />
      )}

      <SectionsRenderer content={data.content} pageConfig={data.pageConfig} images={data.images?.images || {}} locale={data.locale} />
    </>
  )
}
