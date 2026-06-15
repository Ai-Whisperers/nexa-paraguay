'use client'

import { TiltCard } from './ui/TiltCard'
import { AnimatedSection } from './ui/AnimatedSection'

function resolveImage(images: any, ref: string | undefined): string {
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

const TEAM_LAYOUTS = [
  { label: 'K', bg: 'bg-rose-100 text-rose-600', accent: 'bg-rose-500' },
  { label: 'L', bg: 'bg-amber-100 text-amber-600', accent: 'bg-amber-500' },
  { label: 'M', bg: 'bg-emerald-100 text-emerald-600', accent: 'bg-emerald-500' },
  { label: 'N', bg: 'bg-indigo-100 text-indigo-600', accent: 'bg-indigo-500' },
  { label: 'P', bg: 'bg-cyan-100 text-cyan-600', accent: 'bg-cyan-500' },
]

function pickLocale(value: any, locale: string) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[locale] || value.es || value.en || value.nl || value.de || ''
  }
  return value
}

const HONEST_NOTICE: Record<string, string> = {
  es: 'Las fotografías son referenciales y se actualizarán con retratos reales del equipo.',
  en: 'Photographs are placeholder references and will be replaced with real team portraits.',
  nl: 'Foto\'s zijn referentiebeelden en worden vervangen door echte teamportretten.',
  de: 'Die Fotos sind Referenzbilder und werden durch echte Teamporträts ersetzt.',
}

export function TeamSection({ pageContent, data, images, locale = 'es' }: any) {
  const d = data || pageContent || {}
  const members = d.members || d.items || []
  if (!members.length) return null

  return (
    <section className="py-20 md:py-28 bg-surface-alt">
      <div className="max-w-6xl mx-auto px-4">
        {d.title && (
          <AnimatedSection animation="fade-up" className="text-center mb-4">
            <h2 className="text-[clamp(1.5rem_3vw_2.2rem)] font-bold text-primary mb-4">{pickLocale(d.title, locale)}</h2>
            <div className="w-12 h-0.5 bg-accent mx-auto" />
          </AnimatedSection>
        )}

        <AnimatedSection animation="fade-up" className="text-center mb-10">
          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 inline-block">
            ⚠️ {HONEST_NOTICE[locale] || HONEST_NOTICE.es}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {members.map((m: any, i: number) => {
            const img = resolveImage(images, m.memberImage || m.image || m.imageUrl)
            const layout = TEAM_LAYOUTS[i % TEAM_LAYOUTS.length]

            return (
              <AnimatedSection
                key={i}
                animation="fade-up"
                delay={i * 70}
                className="[&>*:first-child]:h-full"
              >
                <TiltCard
                  tiltIntensity={3}
                  className="bg-white rounded-2xl shadow-sm border border-border/40 hover:shadow-lg transition-shadow duration-300 overflow-hidden group h-full"
                >
                  {/* Top accent bar */}
                  <div className={`h-1.5 w-full ${layout.accent} transition-all duration-300`} />

                  {/* AI Headshot Badge — prominent */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-full border border-amber-300 shadow-sm">
                      📷 Referencial
                    </span>
                  </div>

                  <div className="p-6 text-center">
                    {/* Avatar with hover scale */}
                    <div className="relative mx-auto mb-4 w-20 h-20">
                      {img ? (
                        <img
                          src={img}
                          alt={m.name}
                          className="w-20 h-20 object-cover rounded-full ring-2 ring-border/50 group-hover:ring-accent/40 transition-all duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className={`w-20 h-20 rounded-full ${layout.bg} flex items-center justify-center text-xl font-bold mx-auto group-hover:scale-105 transition-transform duration-300`}>
                          {m.name?.[0] || '?'}
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="font-bold text-primary text-sm leading-tight mb-0.5 group-hover:text-accent transition-colors duration-200">{pickLocale(m.name, locale)}</h3>

                    {/* Role */}
                    {m.role && (
                      <p className="text-xs text-accent font-semibold mb-2 line-clamp-2">{pickLocale(m.role, locale)}</p>
                    )}

                    {/* Description */}
                    {m.description && (
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-4 group-hover:text-text transition-colors duration-200">{pickLocale(m.description, locale)}</p>
                    )}
                  </div>
                </TiltCard>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}