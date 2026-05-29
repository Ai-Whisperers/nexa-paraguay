import { loadPageData, getPageSlugs } from '@/lib/page-data'
import SectionsRenderer from '@/components/SectionsRenderer'
import type { Metadata } from 'next'
import { LOCALES } from '@/lib/locales'
import { generateBreadcrumbSchema, generateFaqSchema, generateLocalBusinessSchema, generateOrganizationSchema, generateWebPageSchema } from '@/lib/schemas'

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
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: Object.fromEntries(LOCALES.map(l => [l, `/${l}/${slug}`])),
    },
  }
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  const data = await loadPageData(locale, slug)
  if (!data) return <div className="text-center p-16 text-text-muted">Not found</div>

  const baseUrl = `https://nexa.paragu-ai.com/${locale}`
  const pageUrl = `${baseUrl}/${slug}`
  const pageName = data.pageConfig?.title || data.content?.siteName || slug

  // FAQ items — prefer faqPage.full.items (new structured data)
  const faqItems = data.content?.faqPage?.full?.items || data.content?.faq?.items || []
  // Homepage or sobre page → add LocalBusiness schema
  const showLocalBusiness = slug === 'home' || slug === 'sobre' || slug === 'about'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateBreadcrumbSchema(baseUrl, pageUrl, pageName)),
      }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebPageSchema(pageName, data.pageConfig?.description || data.content?.description || '', locale)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }} />
      {faqItems.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqSchema(faqItems)),
        }} />
      )}

      {showLocalBusiness && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocalBusinessSchema(locale)),
        }} />
      )}

      <SectionsRenderer
        content={data.content}
        pageConfig={data.pageConfig}
        images={data.images?.images || {}}
        locale={data.locale}
      />
    </>
  )
}
