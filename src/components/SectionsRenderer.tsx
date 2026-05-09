import { Header } from './Header'
import { Footer } from './Footer'
import { HeroSection, TrustSection, WhyCountrySection, ServicesSection, ProcessSection, CtaBanner } from './sections'
import { resolveContent } from './content'

const SECTIONS: Record<string, any> = {
  hero: HeroSection,
  'trust-signals': TrustSection,
  'why-destination': WhyCountrySection,
  services: ServicesSection,
  'process-timeline': ProcessSection,
  'cta-banner': CtaBanner,
}

function GenericSection({ data }: { data?: any }) {
  if (!data) return null
  const items = data.items || data.full?.items || data.groups || data.pillars || data.members || data.paragraphs || data.trust?.items
  return (
    <section className="py-16 px-4 even:bg-surface-alt">
      <div className="max-w-4xl mx-auto text-center">
        {data.eyebrow && <p className="text-xs uppercase tracking-widest text-text-muted mb-2">{data.eyebrow}</p>}
        {(data.headline || data.title) && <h2 className="text-2xl font-bold mb-2">{data.headline || data.title}</h2>}
        {(data.subheadline || data.subtitle) && <p className="text-text-muted leading-relaxed mb-6">{data.subheadline || data.subtitle}</p>}
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
            return <Comp key={section.id || idx} pageContent={sectionData || content} data={sectionData} images={images} locale={locale} />
          }
          const data = resolveContent(content, section.content || section.id)
          return data ? <GenericSection key={idx} data={data} /> : null
        })}
      </main>
      <Footer footer={content?.footer} />
    </div>
  )
}
