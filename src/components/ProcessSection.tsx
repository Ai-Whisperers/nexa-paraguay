'use client'

function resolveImage(images: Record<string, any> | undefined, ref: string | undefined): string {
  if (!ref || !images) return ''
  const key = ref.replace('@img:', '')
  const parts = key.split('.')
  let obj: any = images
  for (const p of parts) {
    if (obj?.[p]) obj = obj[p]
    else return ''
  }
  return obj?.src || obj || ''
}

interface ProcessStep {
  number: number | string
  title: string
  description: string
  duration?: string
  image?: { $img?: string }
}

interface ProcessContent {
  eyebrow?: string
  title?: string
  totalDuration?: string
  ctaLabel?: string
  ctaHref?: string
  steps?: ProcessStep[]
}

export function ProcessSection({ pageContent, images }: { pageContent: Record<string, any>; images?: Record<string, any> }) {
  const c: ProcessContent = pageContent?.process || {}
  if (!c.steps?.length) return null

  return (
    <section className="py-20 md:py-28 bg-surface-alt">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-14">
          {c.eyebrow && (
            <p className="text-xs text-text-muted uppercase tracking-[2px] mb-3">{c.eyebrow}</p>
          )}
          {c.title && (
            <h2 className="text-[clamp(1.5rem_3vw_2.2rem)] font-bold text-primary">{c.title}</h2>
          )}
          {c.totalDuration && (
            <div className="inline-block mt-4 px-5 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-accent font-semibold text-sm">
              {c.totalDuration}
            </div>
          )}
        </div>

        <div className="relative">
          <div className="absolute left-[22px] top-0 bottom-0 w-[2px] bg-accent/20 hidden md:block" />

          <div className="space-y-8">
            {c.steps.map((step, i) => {
              const stepImg = step.image?.$img ? resolveImage(images, `@img:${step.image.$img}`) : ''
              return (
                <div key={i} className="relative md:pl-16">
                  <div className="hidden md:flex absolute left-0 top-0 w-11 h-11 bg-primary rounded-full border-[3px] border-accent items-center justify-center text-white text-sm font-bold z-10 shadow-[0_0_0_4px_rgba(201,169,110,0.12)]">
                    {step.number}
                  </div>
                  <div className="md:hidden flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-primary rounded-full border-2 border-accent flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {step.number}
                    </div>
                    <div className="h-[1px] flex-1 bg-accent/30" />
                  </div>

                  <div className="bg-white rounded-xl p-6 md:p-7 shadow-sm border border-border/60 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-5">
                      {stepImg && (
                        <div className="hidden sm:block w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-surface-alt">
                          <img src={stepImg} alt={step.title} loading="lazy" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-primary text-lg mb-2">{step.title}</h3>
                        <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
                        {step.duration && (
                          <span className="inline-block mt-3 text-xs text-accent font-semibold px-3 py-1 bg-accent/10 rounded-full">
                            {step.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {c.ctaLabel && c.ctaHref && (
          <div className="text-center mt-12">
            <a
              href={c.ctaHref}
              className="inline-block px-8 py-3.5 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 transition-opacity no-underline"
            >
              {c.ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
