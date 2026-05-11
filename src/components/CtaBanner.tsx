'use client'

export function CtaBanner({ pageContent }: any) {
  const c = pageContent?.finalCta || pageContent?.cta || {}
  if (!c.title) return null

  return (
    <section className="py-24 md:py-32 text-center text-white relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 50%, #1B2A4A 100%)',
    }}>
      {/* Geometric accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-xl mx-auto px-4">
        <h2 className="text-[clamp(1.5rem_3vw_2.2rem)] font-bold mb-4">{c.title}</h2>
        {c.subtitle && (
          <p className="text-base text-white/80 leading-relaxed mb-8">{c.subtitle}</p>
        )}
        {c.buttonText && (
          <a
            href={c.buttonHref || c.ctaHref || '#'}
            className="inline-block px-8 py-3.5 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 transition-all duration-200 no-underline hover:shadow-xl hover:scale-[1.02]"
          >
            {c.buttonText || c.ctaText}
          </a>
        )}
      </div>
    </section>
  )
}
