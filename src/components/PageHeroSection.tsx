'use client'

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
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, #C9A96E 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Background image if available */}
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
        />
      )}

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h1 className="text-[clamp(2rem_4vw_3rem)] font-bold leading-tight mb-4">{headline}</h1>
        {(d.subheadline || d.subtitle) && (
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            {d.subheadline || d.subtitle}
          </p>
        )}
        {d.ctaText && (
          <a
            href={d.ctaHref || '#'}
            className="inline-block mt-8 px-8 py-3.5 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 transition-opacity no-underline"
          >
            {d.ctaText}
          </a>
        )}
      </div>
    </section>
  )
}
