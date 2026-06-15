'use client'

import { AnimatedSection } from './ui/AnimatedSection'

function pickLocale(value: any, locale: string): string {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[locale] || value.es || value.en || value.nl || value.de || ''
  }
  return value || ''
}

export function ComplianceSection({ pageContent, data, locale = 'es' }: any) {
  const d = data || pageContent || {}
  const paragraphs: string[] = (d.paragraphs || []).map((p: any) => pickLocale(p, locale))
  const linkText = pickLocale(d.linkText, locale)
  const linkHref = d.linkHref || '/privacidad#aml'
  const seprelad = d.licenseNumbers?.[0]
  const label = seprelad ? pickLocale(seprelad.label, locale) || 'SEPRELAD' : 'SEPRELAD'

  if (!paragraphs.length) return null

  return (
    <section className="py-12 md:py-16 bg-surface-alt border-t border-border/40">
      <div className="max-w-3xl mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <div className="bg-white border border-border/40 rounded-2xl p-6 md:p-8 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
              Aviso legal
            </p>
            {paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-text-muted leading-relaxed mb-3 last:mb-0">
                {p}
              </p>
            ))}
            {seprelad && (
              <p className="text-xs text-text-muted mt-4 pt-4 border-t border-border/30">
                <span className="font-semibold text-text">{label}:</span> {label !== 'SEPRELAD' ? '(SEPRELAD) ' : ''}Sujeto obligado registrado.
              </p>
            )}
            {linkText && (
              <a
                href={linkHref}
                className="inline-block mt-4 text-sm text-accent hover:underline font-medium"
              >
                {linkText} →
              </a>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
