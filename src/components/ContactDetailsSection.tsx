'use client'

import { AnimatedSection } from './ui/AnimatedSection'
import { resolveClientLocale } from '@/lib/resolve-client-locale'

export function ContactDetailsSection({ pageContent, data, locale }: any) {
  const d = data || pageContent || {}
  if (!d.whatsapp && !d.email) return null

  const lang = resolveClientLocale(locale)
  const hoursKeys: Record<string, string[]> = {
    es: ['Lun–Vie', 'Sáb', 'Dom'],
    en: ['Mon–Fri', 'Sat', 'Sun'],
    nl: ['Ma–Vr', 'Za', 'Zo'],
    de: ['Mo–Fr', 'Sa', 'So'],
  }
  const keys = hoursKeys[lang] || hoursKeys.es
  const hours = d.hours && typeof d.hours === 'object'
    ? keys.map(k => d.hours[k]).filter(Boolean).join(' · ')
    : (typeof d.hours === 'string' ? d.hours : '')

  const phoneClean = (d.whatsapp || d.phone || '').replace(/[^0-9]/g, '')

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-lg mx-auto px-4">
        {d.title && (
          <AnimatedSection animation="fade-up" className="text-center mb-8">
            <h2 className="text-[clamp(1.3rem_2.5vw_1.8rem)] font-bold text-primary">{d.title}</h2>
          </AnimatedSection>
        )}

        <div className="space-y-3">
          {/* WhatsApp — lift on hover */}
          {phoneClean && (
            <AnimatedSection animation="fade-up" delay={50}>
              <a
                href={`https://wa.me/${phoneClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl no-underline font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group"
                style={{ background: '#25D366' }}
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{d.whatsapp}</p>
                  <p className="text-xs text-white/70">WhatsApp — respuesta rápida</p>
                </div>
                {/* Arrow indicator */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
            </AnimatedSection>
          )}

          {/* Email */}
          {d.email && (
            <AnimatedSection animation="fade-up" delay={120}>
              <a
                href={`mailto:${d.email}`}
                className="flex items-center gap-4 p-4 rounded-xl no-underline font-semibold bg-primary text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group"
              >
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{d.email}</p>
                  <p className="text-xs text-white/70">Stuur ons een bericht</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
            </AnimatedSection>
          )}

          {/* Address */}
          {d.address && (
            <AnimatedSection animation="fade-up" delay={190}>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-alt border border-border/50 hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent transition-colors duration-200 group-hover:bg-accent/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-primary font-medium">{d.address}{d.neighborhood ? `, ${d.neighborhood}` : ''}</p>
                  {hours && <p className="text-xs text-text-muted mt-0.5">{hours}</p>}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  )
}