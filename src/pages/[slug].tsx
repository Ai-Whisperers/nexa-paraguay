import { readFileSync } from 'fs'
import path from 'path'
import Head from 'next/head'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { HeroSection, StatsSection, TrustSection, ProgramsSection, ServicesSection, WhyCountrySection, FeaturesSection, ProcessSection, TestimonialsSection, CtaBanner, TaxCalculatorSection } from '../components/sections'
import { FaqSection, BlogSection, TeamSection, PrivacyAccordion, GlossarySection, NewsletterSection, StorySection, PillarsSection, PageHeroSection, HighlightSection, ComparisonSection, GuidesSection } from '../components/sections-extra'
import { resolveContent, resolveImage } from '../components/content'

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
  'faq': FaqSection,
  'blog-index': BlogSection,
  'team': TeamSection,
  'privacy-accordion': PrivacyAccordion,
  'glossary': GlossarySection,
  'newsletter-signup': NewsletterSection,
  'story': StorySection,
  'pillars': PillarsSection,
  'page-hero': PageHeroSection,
  'highlights': HighlightSection,
  'comparison-table': ComparisonSection,
  'guides': GuidesSection,
}

const SLUG_MAP: Record<string, string> = {
  'servicios':'servicios','contacto':'contacto','faq':'faq','programas':'programas',
  'proceso':'proceso','sobre':'sobre','sobre-nosotros':'sobre',
  'por-que-paraguay':'por-que-paraguay','blog':'blog','privacidad':'privacidad',
  'recursos':'recursos','benelux':'benelux','fundador':'fundador','glosario':'glosario',
  'asistente':'asistente','calidad-de-vida':'calidad-de-vida',
  'casos-de-exito':'casos-de-exito','comparacion':'comparacion',
  'empresa':'empresa','inversor':'inversor','lifestyle':'lifestyle','trust':'trust',
  'prensa':'prensa',
}

export default function SlugPage({ content, pageConfig, pageId, images }: any) {
  const siteName = content?.siteName || 'Nexa Paraguay'
  const sections = pageConfig?.sections || []
  const seo = resolveContent(content, `${pageId}Page.seo`) || resolveContent(content, `${pageId}.seo`) || pageConfig?.seoTitle || {}
  const navigation = content?.navigation
  const footer = content?.footer

  function buildPageContent(base: any): any {
    const pc: any = {}
    for (const sec of sections) {
      const key = sec.content || sec.id
      const val = resolveContent(base, key)
      if (val) {
        const parts = key.split('.')
        const shortKey = parts.length > 1 ? parts[parts.length-1] : parts[0]
        pc[shortKey] = val
        pc[key] = val
      }
    }
    return pc
  }

  const pageContent = buildPageContent(content)

  const pageTitle = typeof seo === 'string' ? seo : seo?.title || pageConfig?.title || siteName
  const pageDesc = typeof seo === 'string' ? '' : seo?.description || ''

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {pageDesc && <meta name="description" content={pageDesc} />}
      </Head>
      <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: '#1B2A4A' }}>
        {navigation && <Header navigation={navigation} />}
        <main>
          {sections.map((section: any, idx: number) => {
            if (section.enabledWhen && !resolveContent(content, section.enabledWhen)) return null
            const key = section.id || section.content || `s${idx}`
            const Component = SECTION_MAP[section.id]
            if (Component) return <Component key={key} pageContent={pageContent} images={images} />
            const data = resolveContent(content, section.content || section.id)
            if (!data) return null
            // Rich fallback: render items, body, description, content arrays
            const items = data.items || data.full?.items || data.groups || data.pillars || data.members || data.paragraphs || data.trust?.items
            const body = data.body || data.content
            return (
              <section key={key} style={{ padding: '2rem 1rem', background: idx % 2 ? '#F5F5F0' : '#fff' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                  {(data.eyebrow) && <p style={{ fontSize: '0.85rem', color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{data.eyebrow}</p>}
                  {(data.headline || data.title) && <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1B2A4A', marginBottom: '0.75rem' }}>{data.headline || data.title}</h2>}
                  {(data.subheadline || data.subtitle) && <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '1.5rem' }}>{data.subheadline || data.subtitle}</p>}
                  {body && <div style={{ color: '#444', lineHeight: 1.8, fontSize: '0.95rem', textAlign: 'left', marginBottom: '1.5rem' }}>{typeof body === 'string' ? body.split('\n').map((p: string, i: number) => <p key={i} style={{ marginBottom: '0.75rem' }}>{p}</p>) : <p>{JSON.stringify(body)}</p>}</div>}
                  {items && Array.isArray(items) && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', textAlign: 'left', marginTop: '1rem' }}>
                      {items.map((item: any, j: number) => (
                        <div key={j} style={{ padding: '1.25rem', background: '#F5F5F0', borderRadius: '12px' }}>
                          {typeof item === 'string' ? (
                            <p style={{ color: '#444', lineHeight: 1.7, fontSize: '0.95rem' }}>{item}</p>
                          ) : (
                            <>
                          {(item.title || item.pregunta || item.question || item.term || item.name) && <h4 style={{ fontWeight: 700, color: '#1B2A4A', marginBottom: '0.5rem' }}>{item.title || item.pregunta || item.question || item.term || item.name}</h4>}
                          {(item.description || item.respuesta || item.answer || item.definition || item.body || item.role) && <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.description || item.respuesta || item.answer || item.definition || item.body || item.role}</p>}
                          {item.memberImage && <img src={resolveImage(images, typeof item.memberImage === 'string' ? item.memberImage : '')} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%', marginBottom: '0.5rem' }} />}
                          {item.imageUrl && <img src={resolveImage(images, typeof item.imageUrl === 'string' ? item.imageUrl : '')} alt={item.title} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }} />}
                            </>
                          )}
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

function loadJSON(dir: string, file: string) {
  try { return JSON.parse(readFileSync(path.join(dir, file), 'utf-8')) } catch { return null }
}

export function getServerSideProps({ params }: any) {
  const slug = params?.slug || 'home'
  const pageFile = SLUG_MAP[slug] || slug || 'home'
  const pagesDir = path.join(process.cwd(), 'nexa-pages')
  const contentDir = path.join(process.cwd(), 'content')
  const content = loadJSON(contentDir, 'es.json')
  const pageConfig = loadJSON(pagesDir, pageFile + '.json')
  const images = loadJSON(process.cwd(), 'images.json')?.images || {}
  if (!pageConfig) return { notFound: true }
  return { props: { content, pageConfig, images, pageId: slug, timestamp: Date.now() } }
}
