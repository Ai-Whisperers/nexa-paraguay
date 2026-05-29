'use client'

import { AnimatedCounter } from './ui/AnimatedCounter'
import { AnimatedSection } from './ui/AnimatedSection'

function resolveImage(images: any, ref: string): string {
  if (!ref || !images) return ''
  const key = ref.replace('@img:', '').replace('@src:', '')
  const parts = key.split('.')
  let obj: any = images
  for (const p of parts) {
    if (obj?.[p]) obj = obj[p]
    else return ''
  }
  return obj?.src || obj || ''
}

export function PageHeroSection({ pageContent, data, images }: any) {
  const d = data || pageContent || {}
  const headline = d.headline || d.title
  if (!headline) return null

  const bgImage = d.backgroundImage ? resolveImage(images, d.backgroundImage) : ''

  return (
    <section
      className="relative py-24 md:py-32 text-center text-white overflow-hidden"
      style={{
        background: bgImage
          ? `linear-gradient(135deg, rgba(27,42,74,0.88) 0%, rgba(27,42,74,0.7) 100%)`
          : 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)',
      }}
    >
      {/* Parallax dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #C9A96E 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transition: 'transform 0.1s ease-out',
        }}
        data-parallax
      />

      {/* Parallax background image */}
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
        />
      )}

      {/* Decorative floating shapes */}
      <div
        className="absolute top-20 left-[10%] w-2 h-2 bg-accent/20 rounded-full animate-pulse"
        style={{ animationDuration: '3s' }}
      />
      <div
        className="absolute top-32 right-[15%] w-3 h-3 bg-accent/10 rounded-full animate-ping"
        style={{ animationDuration: '4s', animationDelay: '1s' }}
      />
      <div
        className="absolute bottom-24 left-[20%] w-2 h-2 bg-accent/15 rounded-full animate-ping"
        style={{ animationDuration: '5s', animationDelay: '2s' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        {/* Animated headline */}
        <AnimatedSection animation="fade-up" className="mb-2">
          <h1 className="text-[clamp(2rem_4vw_3rem)] font-bold leading-tight">
            {headline}
          </h1>
        </AnimatedSection>

        {/* Animated subheadline */}
        {(d.subheadline || d.subtitle) && (
          <AnimatedSection animation="fade-up" delay={150} className="mb-8">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              {d.subheadline || d.subtitle}
            </p>
          </AnimatedSection>
        )}

        {/* Optional animated stats row */}
        {d.stats && d.stats.length > 0 && (
          <AnimatedSection animation="fade-up" delay={250} className="flex flex-wrap justify-center gap-8 mt-10">
            {d.stats.map((stat: any, i: number) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                  {stat.prefix || ''}
                  {stat.value && !isNaN(Number(stat.value)) ? (
                    <AnimatedCounter target={Number(stat.value)} duration={1800} />
                  ) : (
                    stat.value
                  )}
                  {stat.suffix || ''}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </AnimatedSection>
        )}

        {/* CTA button with hover animation */}
        {d.ctaText && (
          <AnimatedSection animation="fade-up" delay={300}>
            <a
              href={d.ctaHref || '#'}
              className="inline-block mt-8 px-8 py-3.5 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 hover:shadow-xl hover:scale-[1.03] transition-all duration-200 no-underline"
            >
              {d.ctaText}
            </a>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}