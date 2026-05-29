'use client'

import { AnimatedSection } from './ui/AnimatedSection'

export function CtaBanner({ pageContent }: any) {
  const c = pageContent?.finalCta || pageContent?.cta || {}
  if (!c.title) return null

  return (
    <section className="py-24 md:py-32 text-center text-white relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 50%, #1B2A4A 100%)',
    }}>
      {/* Animated geometric accents */}
      <AnimatedSection animation="fade-scale" className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" style={{ animationDuration: '6s' }} />
      <AnimatedSection animation="fade-scale" delay={200} className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />

      {/* Floating geometric shapes */}
      <div className="absolute top-10 left-[5%] w-1 h-1 bg-accent/30 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/3 right-[8%] w-2 h-2 border border-accent/20 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      <div className="absolute bottom-16 left-[12%] w-1.5 h-1.5 bg-accent/20 rounded-full animate-ping" style={{ animationDuration: '7s', animationDelay: '0.5s' }} />
      <div className="absolute top-20 right-[20%] w-3 h-3 border border-white/10 rotate-45 animate-pulse" style={{ animationDuration: '9s' }} />

      <div className="relative z-10 max-w-xl mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <h2 className="text-[clamp(1.5rem_3vw_2.2rem)] font-bold mb-4">{c.title}</h2>
        </AnimatedSection>

        {c.subtitle && (
          <AnimatedSection animation="fade-up" delay={150}>
            <p className="text-base text-white/80 leading-relaxed mb-8">{c.subtitle}</p>
          </AnimatedSection>
        )}

        {c.buttonText && (
          <AnimatedSection animation="fade-up" delay={250}>
            <a
              href={c.buttonHref || c.ctaHref || '#'}
              className="inline-block px-8 py-3.5 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 hover:shadow-xl hover:scale-[1.04] hover:-translate-y-0.5 transition-all duration-200 no-underline"
            >
              {c.buttonText || c.ctaText}
            </a>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}