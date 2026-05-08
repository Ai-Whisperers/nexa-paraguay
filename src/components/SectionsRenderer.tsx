'use client'

import dynamic from 'next/dynamic'
import { ErrorBoundary } from './ErrorBoundary'
import { resolveContent } from './content'
import { Header } from './Header'
import { Footer } from './Footer'

const SECTIONS: Record<string, any> = {
  hero: dynamic(() => import('./sections').then(m => ({ default: m.HeroSection })), { ssr: true }),
  'stats-counter': dynamic(() => import('./sections').then(m => ({ default: m.StatsSection })), { ssr: true }),
  'trust-signals': dynamic(() => import('./sections').then(m => ({ default: m.TrustSection })), { ssr: true }),
  'programs-comparison': dynamic(() => import('./sections').then(m => ({ default: m.ProgramsSection })), { ssr: true }),
  services: dynamic(() => import('./sections').then(m => ({ default: m.ServicesSection })), { ssr: true }),
  'why-destination': dynamic(() => import('./sections').then(m => ({ default: m.WhyCountrySection })), { ssr: true }),
  features: dynamic(() => import('./sections').then(m => ({ default: m.FeaturesSection })), { ssr: true }),
  'process-timeline': dynamic(() => import('./sections').then(m => ({ default: m.ProcessSection })), { ssr: true }),
  testimonials: dynamic(() => import('./sections').then(m => ({ default: m.TestimonialsSection })), { ssr: true }),
  'cta-banner': dynamic(() => import('./sections').then(m => ({ default: m.CtaBanner })), { ssr: true }),
  'tax-savings-calculator': dynamic(() => import('./sections').then(m => ({ default: m.TaxCalculatorSection })), { ssr: true }),
  'faq-search': dynamic(() => import('./sections-extra').then(m => ({ default: m.FaqSearchSection })), { ssr: true }),
  'blog-index': dynamic(() => import('./sections-extra').then(m => ({ default: m.BlogSection })), { ssr: true }),
  team: dynamic(() => import('./sections-extra').then(m => ({ default: m.TeamSection })), { ssr: true }),
  'privacy-accordion': dynamic(() => import('./sections-extra').then(m => ({ default: m.PrivacyAccordion })), { ssr: true }),
  glossary: dynamic(() => import('./sections-extra').then(m => ({ default: m.GlossarySection })), { ssr: true }),
  'newsletter-signup': dynamic(() => import('./sections-extra').then(m => ({ default: m.NewsletterSection })), { ssr: true }),
  story: dynamic(() => import('./sections-extra').then(m => ({ default: m.StorySection })), { ssr: true }),
  pillars: dynamic(() => import('./sections-extra').then(m => ({ default: m.PillarsSection })), { ssr: true }),
  'page-hero': dynamic(() => import('./sections-extra').then(m => ({ default: m.PageHeroSection })), { ssr: true }),
  highlights: dynamic(() => import('./sections-extra').then(m => ({ default: m.HighlightSection })), { ssr: true }),
  'comparison-table': dynamic(() => import('./sections-extra').then(m => ({ default: m.ComparisonSection })), { ssr: true }),
  guides: dynamic(() => import('./sections-extra').then(m => ({ default: m.GuidesSection })), { ssr: true }),
  'booking-embed': dynamic(() => import('./sections-extra').then(m => ({ default: m.BookingEmbedSection })), { ssr: true }),
  contact: dynamic(() => import('./sections-extra').then(m => ({ default: m.ContactDetailsSection })), { ssr: true }),
  gallery: dynamic(() => import('./sections-extra').then(m => ({ default: m.GallerySection })), { ssr: true }),
  faq: dynamic(() => import('./sections-extra').then(m => ({ default: m.FaqSearchSection })), { ssr: true }),
  'contact-form': dynamic(() => import('./sections-extra').then(m => ({ default: m.ContactFormSection })), { ssr: true }),
  'services-detail': dynamic(() => import('./sections-extra').then(m => ({ default: m.ServiceDetailSection })), { ssr: true }),
  'press-releases': dynamic(() => import('./sections-extra').then(m => ({ default: m.PressReleasesListSection })), { ssr: true }),
  'intake-wizard': dynamic(() => import('./sections-extra').then(m => ({ default: m.IntakeWizardSection })), { ssr: true }),
}

function GenericSection({ data }: { data?: any }) {
  if (!data) return null
  const items = data.items || data.full?.items || data.groups || data.pillars || data.members || data.paragraphs || data.trust?.items
  const body = data.body || data.content
  return (
    <section className="py-16 px-4 even:bg-surface-alt">
      <div className="max-w-4xl mx-auto text-center">
        {data.eyebrow && <p className="text-xs uppercase tracking-widest text-text-muted mb-2">{data.eyebrow}</p>}
        {(data.headline || data.title) && <h2 className="text-2xl font-bold mb-2">{data.headline || data.title}</h2>}
        {(data.subheadline || data.subtitle) && <p className="text-text-muted leading-relaxed mb-6">{data.subheadline || data.subtitle}</p>}
        {body && <div className="text-left leading-relaxed text-text-muted mb-6">{typeof body === 'string' ? body.split('\\n').map((p: string, i: number) => <p key={i} className="mb-3">{p}</p>) : <p>{JSON.stringify(body)}</p>}</div>}
        {items && Array.isArray(items) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {items.map((item: any, j: number) => (
              <div key={j} className="p-5 bg-surface-alt rounded-xl">
                {typeof item === 'string' ? <p className="text-text-muted">{item}</p> : (
                  <>
                    {(item.title || item.pregunta || item.question || item.term || item.name) && <h4 className="font-bold mb-2">{item.title || item.pregunta || item.question || item.term || item.name}</h4>}
                    {(item.description || item.respuesta || item.answer || item.definition || item.body || item.role) && <p className="text-sm text-text-muted leading-relaxed">{item.description || item.respuesta || item.answer || item.definition || item.body || item.role}</p>}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        {data.ctaText && <a href={data.ctaHref || '#'} className="inline-block mt-6 px-8 py-3 bg-primary text-white rounded-full font-bold text-sm hover:opacity-90">{data.ctaText}</a>}
      </div>
    </section>
  )
}

export default function SectionsRenderer({ content, pageConfig, images, locale }: any) {
  const sections = pageConfig?.sections || []
  return (
    <div className="font-inter text-text-primary">
      {content?.navigation && <Header navigation={content.navigation} locale={locale} />}
      <main>
        {sections.map((section: any, idx: number) => {
          if (section.enabledWhen && !resolveContent(content, section.enabledWhen)) return null
          const Comp = SECTIONS[section.id]
          if (Comp) {
            const sectionData = resolveContent(content, section.content || section.id)
            return <ErrorBoundary key={section.id || idx} name={section.id}><Comp pageContent={sectionData || content} data={sectionData} images={images} locale={locale} /></ErrorBoundary>
          }
          const data = resolveContent(content, section.content || section.id)
          return data ? <GenericSection key={idx} data={data} /> : null
        })}
      </main>
      <Footer footer={content?.footer} />
    </div>
  )
}
