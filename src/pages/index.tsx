import Head from 'next/head'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { HeroSection, StatsSection, TrustSection, ProgramsSection, ServicesSection, WhyCountrySection, FeaturesSection, ProcessSection, TestimonialsSection, CtaBanner, TaxCalculatorSection } from '../components/sections'
import { NewsletterSection, StorySection, TeamSection } from '../components/sections-extra'
import { resolveContent } from '../components/content'
import { loadJSON } from '../lib/loader'
import { ErrorBoundary } from '../components/ErrorBoundary'
import type { SiteContent, PageConfig } from '../types'

const SECTION_MAP: Record<string, any> = {
  'hero': HeroSection,
  'stats-counter': StatsSection,
  'trust-signals': TrustSection,
  'programs-comparison': ProgramsSection,
  'services': ServicesSection,
  'tax-savings-calculator': TaxCalculatorSection,
  'why-destination': WhyCountrySection,
  'features': FeaturesSection,
  'process-timeline': ProcessSection,
  'testimonials': TestimonialsSection,
  'cta-banner': CtaBanner,
  'newsletter-signup': NewsletterSection,
  'story': StorySection,
  'team': TeamSection,
}

export default function Home({ content, pageConfig, images }: any) {
  const siteName = content?.siteName || 'Nexa Paraguay'
  const sections = pageConfig?.sections || []
  const seo = resolveContent(content, 'home.seo') || content?.seo?.home || {}
  const navigation = content?.navigation
  const footer = content?.footer

  return (
    <>
      <Head>
        <title>{seo?.title || siteName}</title>
        {seo?.description && <meta name="description" content={seo.description} />}
      </Head>
      <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: '#1B2A4A' }}>
        {navigation && <Header navigation={navigation} />}
        <main>
          {sections.map((section: any, idx: number) => {
            if (section.enabledWhen && !resolveContent(content, section.enabledWhen)) return null
            const key = section.id || section.content || `s${idx}`
            const Component = SECTION_MAP[section.id]
            if (Component) {
              const sectionData = resolveContent(content, section.content || section.id)
              const pc: any = {}
              const keyName = section.content?.split('.').pop() || section.id
              if (section.content || section.id) pc[keyName] = sectionData || content
              return <ErrorBoundary key={key} name={section.id}><Component pageContent={pc} data={sectionData} images={images} /></ErrorBoundary>
            }
            const data = resolveContent(content, section.content || section.id)
            if (!data) return null
            const items = data.items || data.full?.items || data.groups || data.pillars || data.members || data.paragraphs
            const body = data.body || data.content
            return (
              <section key={key} style={{ padding: '2rem 1rem', background: idx % 2 ? '#F5F5F0' : '#fff' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                  {data.eyebrow && <p style={{ fontSize: '0.85rem', color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{data.eyebrow}</p>}
                  {(data.headline || data.title) && <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1B2A4A', marginBottom: '0.75rem' }}>{data.headline || data.title}</h2>}
                  {(data.subheadline || data.subtitle) && <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '1.5rem' }}>{data.subheadline || data.subtitle}</p>}
                  {body && <div style={{ color: '#444', lineHeight: 1.8, fontSize: '0.95rem', textAlign: 'left', marginBottom: '1.5rem' }}>{typeof body === 'string' ? body.split('\n').map((p: string, i: number) => <p key={i} style={{ marginBottom: '0.75rem' }}>{p}</p>) : <p>{JSON.stringify(body)}</p>}</div>}
                  {items && Array.isArray(items) && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', textAlign: 'left' }}>
                      {items.map((item: any, j: number) => (
                        <div key={j} style={{ padding: '1.25rem', background: '#F5F5F0', borderRadius: '12px' }}>
                          {typeof item === 'string' ? <p style={{ color: '#444', lineHeight: 1.7, fontSize: '0.95rem' }}>{item}</p> : <>
                            {(item.title || item.name) && <h4 style={{ fontWeight: 700, color: '#1B2A4A', marginBottom: '0.5rem' }}>{item.title || item.name}</h4>}
                            {(item.description || item.body || item.role) && <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.description || item.body || item.role}</p>}
                          </>}
                        </div>
                      ))}
                    </div>
                  )}
                  {data.ctaText && <a href={data.ctaHref || '#'} style={{ display: 'inline-block', marginTop: '1.5rem', padding: '0.75rem 2rem', background: '#1B2A4A', color: '#fff', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>{data.ctaText}</a>}
                </div>
              </section>
            )
          })}
        </main>
        {footer && <Footer footer={footer} />}
      </div>
    </>
  )
}

export function getServerSideProps() {
  const fullContent = loadJSON(process.cwd() + '/content', 'es.json') || {}
  const pageConfig = loadJSON(process.cwd() + '/nexa-pages', 'home.json')
  const manifest = loadJSON(process.cwd(), 'images.json')
  const images = manifest?.images || {}
  if (!fullContent || !pageConfig) return { notFound: true }
  return { props: { content: fullContent, pageConfig, images } }
}
