import Head from 'next/head'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { HeroSection, StatsSection, TrustSection, ProgramsSection, ServicesSection, WhyCountrySection, FeaturesSection, ProcessSection, TestimonialsSection, CtaBanner, TaxCalculatorSection } from '../components/sections'
import { FaqSection, BlogSection, TeamSection, PrivacyAccordion, GlossarySection, NewsletterSection, StorySection, PillarsSection, PageHeroSection, HighlightSection, ComparisonSection, GuidesSection, BookingEmbedSection, ContactDetailsSection, GallerySection, FaqSearchSection, ContactFormSection, ServiceDetailSection, PressReleasesListSection, IntakeWizardSection } from '../components/sections-extra'
import { resolveContent, resolveImage } from '../components/content'
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
  'faq': FaqSearchSection,
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
  'booking-embed': BookingEmbedSection,
  'contact': ContactDetailsSection,
  'gallery': GallerySection,
  'faq-search': FaqSearchSection,
  'contact-form': ContactFormSection,
  'services-detail': ServiceDetailSection,
  'press-releases': PressReleasesListSection,
  'intake-wizard': IntakeWizardSection,
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

function buildFaqSchema(content: any, pageId: string): Record<string, any> {
  const items = content?.faqPage?.full?.items || []
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.filter((i: any) => i.q || i.a).map((i: any) => ({
      '@type': 'Question',
      name: i.q || i.pregunta || i.title || '',
      acceptedAnswer: { '@type': 'Answer', text: i.a || i.respuesta || i.description || i.body || '' }
    }))
  }
}

export default function SlugPage({ content, pageConfig, pageId, images, post, locale: loc }: any) {
  const siteName = content?.siteName || 'Nexa Paraguay'
  const sections = pageConfig?.sections || []
  const seo = resolveContent(content, `${pageId}Page.seo`) || resolveContent(content, `${pageId}.seo`) || pageConfig?.seoTitle || {}
  const navigation = content?.navigation
  const footer = content?.footer

  // Render blog post directly when pageConfig is null
  if (!pageConfig && post) {
    return (<>
      <Head><title>{post.title} — {siteName}</title>{post.excerpt && <meta name="description" content={post.excerpt} />}</Head>
      <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: '#1B2A4A' }}>
        {navigation && <Header navigation={navigation} locale={loc} />}
        <main>
          <article style={{ maxWidth: '750px', margin: '0 auto', padding: '3rem 1rem' }}>
            {post.date && <span style={{ fontSize:'0.85rem',color:'#C9A96E',fontWeight:600 }}>{post.date}</span>}
            <h1 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)',fontWeight:700,lineHeight:1.2,margin:'0.75rem 0 0.5rem' }}>{post.title}</h1>
            {post.author && <p style={{ color:'#999',fontSize:'0.9rem',marginBottom:'1.5rem' }}>Por {post.author}</p>}
            {post.excerpt && <p style={{ color:'#555',fontSize:'1.05rem',lineHeight:1.7,marginBottom:'2rem',fontStyle:'italic' }}>{post.excerpt}</p>}
            <div style={{ color:'#444',lineHeight:1.8,fontSize:'0.95rem' }}>
              {post.body ? post.body.split('\\n').map((p: string, i: number) => <p key={i} style={{marginBottom:'1rem'}}>{p}</p>) : <p>Contenido completo pr\\u00f3ximamente.</p>}
            </div>
            {post.tags && <div style={{ marginTop:'2rem',display:'flex',gap:'0.5rem',flexWrap:'wrap' }}>
              {post.tags.map((t: string, i: number) => <span key={i} style={{ padding:'0.25rem 0.75rem',background:'#F5F5F0',borderRadius:'50px',fontSize:'0.8rem',color:'#666' }}>{t}</span>)}
            </div>}
            <div style={{ marginTop:'2rem',textAlign:'center' }}>
            <a href={'/' + loc + '/blog'} style={{ color:'#C9A96E',fontWeight:700,textDecoration:'none' }}>{'\\u2190 Volver al blog'}</a>
            </div>
          </article>
        </main>
        <Footer footer={footer} />
      </div>
    </>)
  }

  const pageTitle = typeof seo === 'string' ? seo : seo?.title || pageConfig?.title || siteName
  const pageDesc = typeof seo === 'string' ? '' : seo?.description || ''
  const pageSchema = pageConfig?.schemaType || ''

  // Build JSON-LD schemas
  const jsonLd: any[] = pageSchema === 'FAQPage' ? [buildFaqSchema(content, pageId)] : []

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {pageDesc && <meta name="description" content={pageDesc} />}
        <meta property="og:title" content={pageTitle} />
        {pageDesc && <meta property="og:description" content={pageDesc} />}
        <meta property="og:image" content="/images/brand/og-default.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        {pageDesc && <meta name="twitter:description" content={pageDesc} />}
        <link rel="icon" type="image/webp" href="/images/brand/favicon.webp" />
        <link rel="shortcut icon" href="/images/brand/favicon.webp" />
        {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      </Head>
      <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: '#1B2A4A' }}>
        {navigation && <Header navigation={navigation} locale={loc} />}
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

const LOCALES = ['es', 'en', 'nl', 'de']

/**
 * Detects preferred locale from Accept-Language header.
 * Maps browser language to our supported locales.
 */
function detectLocaleFromHeader(acceptLanguage: string | undefined): string | null {
  if (!acceptLanguage) return null
  const prefs = acceptLanguage.split(',').map(s => s.split(';')[0].trim().toLowerCase())
  for (const lang of prefs) {
    if (lang.startsWith('nl')) return 'nl'
    if (lang.startsWith('de')) return 'de'
    if (lang.startsWith('en')) return 'en'
    if (lang.startsWith('es')) return 'es'
  }
  return null
}

export function getServerSideProps({ params, req, res }: any) {
  let slug = Array.isArray(params?.slug) ? params.slug.join('/') : (params?.slug || 'home')
  let locale = 'es'
  let hasUrlLocale = false

  // 1) URL prefix locale takes highest priority
  if (slug.includes('/')) {
    const parts = slug.split('/')
    if (LOCALES.includes(parts[0])) { locale = parts[0]; hasUrlLocale = true; slug = parts.slice(1).join('/') || 'home' }
  } else if (LOCALES.includes(slug)) {
    locale = slug; hasUrlLocale = true; slug = 'home'
  }

  // 2) If no URL locale, check cookie (only if URL didn't specify locale)
  if (!hasUrlLocale) {
    const cookieLocale = req?.cookies?.NEXT_LOCALE
    if (cookieLocale && LOCALES.includes(cookieLocale)) {
      locale = cookieLocale
    }
  }

  // 3) If still default and no cookie, detect from Accept-Language
  const noCookie = !req?.cookies?.NEXT_LOCALE
  if (!hasUrlLocale && locale === 'es' && noCookie) {
    const detected = detectLocaleFromHeader(req?.headers?.['accept-language'])
    if (detected) locale = detected
  }

  const pageFile = SLUG_MAP[slug] || slug || 'home'

  // Set locale cookie for persistence
  const cookieMaxAge = 60 * 60 * 24 * 365 // 1 year
  res.setHeader('Set-Cookie', `NEXT_LOCALE=${locale}; Path=/; Max-Age=${cookieMaxAge}; SameSite=Lax`)

  // Handle blog posts routed through [[...slug]]
  if (slug.startsWith('blog/') && slug !== 'blog') {
    const blogSlug = slug.replace('blog/', '')
    const blogContent = loadJSON(process.cwd() + '/content', `${locale}.json`) || loadJSON(process.cwd() + '/content', 'es.json') || {}
    const posts = blogContent?.blog?.posts || []
    const post = blogSlug ? posts.find((p: any) => p.slug === blogSlug) : null
    if (!post) return { notFound: true }
    const images = loadJSON(process.cwd(), 'images.json')?.images || {}
    return { props: { content: blogContent, post, pageConfig: null, images, pageId: blogSlug, locale } }
  }
  const fullContent = loadJSON(process.cwd() + '/content', `${locale}.json`) || loadJSON(process.cwd() + '/content', 'es.json') || {}
  const pageConfig = loadJSON(process.cwd() + '/nexa-pages', pageFile + '.json')
  if (!pageConfig) return { notFound: true }
  const images = loadJSON(process.cwd(), 'images.json')?.images || {}
  return { props: { content: fullContent, pageConfig, images, pageId: slug, locale } }
}
