import React from 'react'
import { SectionComponentProps } from '../types'
import { resolveImage } from './content'
import { theme } from '../theme'

export function HeroSection({ pageContent, images }: SectionComponentProps) {
  const c = pageContent.hero || {}
  const bgImage = resolveImage(images, c.backgroundImage)
  return (
    <section style={{
      padding: '4rem 1rem',
      background: bgImage
        ? `${theme.colors.gradientOverlay}, url(${bgImage})`
        : theme.colors.gradient,
      backgroundSize: 'cover', backgroundPosition: 'center',
      color: theme.colors.white, textAlign: 'center', position: 'relative',
      minHeight: 'clamp(350px,50vh,550px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ maxWidth: theme.sizes.contentWidth, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontFamily: theme.fonts.heading, fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem' }}>{c.headline}</h1>
        <div style={{ width: '60px', height: '3px', background: theme.colors.accent, margin: '0 auto 1.25rem' }} />
        <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 2rem' }}>{c.subheadline}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {c.ctaPrimaryText && <a href={c.ctaPrimaryHref} style={{ padding: theme.spacing.btn, background: theme.colors.accent, color: theme.colors.primary, borderRadius: theme.radii.full, fontWeight: 700, textDecoration: 'none', fontSize: '1rem', boxShadow: theme.shadows.cta, transition: theme.transitions.base }}>{c.ctaPrimaryText}</a>}
          {c.ctaSecondaryText && <a href={c.ctaSecondaryHref} style={{ padding: theme.spacing.btn, border: `2px solid ${theme.colors.accent}`, color: theme.colors.white, borderRadius: theme.radii.full, fontWeight: 600, textDecoration: 'none', fontSize: '1rem', opacity: 0.9 }}>{c.ctaSecondaryText}</a>}
        </div>
        {c.trustBadges && <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          {c.trustBadges.map((b: string, i: number) => (
            <span key={i} style={{ padding: '0.35rem 1rem', background: theme.colors.overlayDark, borderRadius: theme.radii.full, fontSize: '0.85rem' }}>{b}</span>
          ))}
        </div>}
      </div>
    </section>
  )
}

export function StatsSection({ pageContent }: SectionComponentProps) {
  const stats = pageContent.stats
  if (!stats?.items?.length) return null
  return (
    <section style={{ padding: theme.spacing.sectionSm, background: theme.colors.bg }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
        {stats.items.map((s: any, i: number) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: theme.colors.primary }}>{s.value}</div>
            <div style={{ fontSize: '0.95rem', color: theme.colors.textMuted, marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function TrustSection({ pageContent, images }: SectionComponentProps) {
  const c = pageContent.trust || {}
  if (!c.items?.length) return null
  return (
    <section style={{ padding: theme.spacing.section }}>
      <div style={{ maxWidth: theme.sizes.contentWide, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{c.eyebrow}</p>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontFamily: theme.fonts.heading, fontWeight: 700, color: theme.colors.primary, marginBottom: '2rem' }}>{c.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: theme.spacing.card }}>
          {c.items.map((item: any, i: number) => {
            const img = resolveImage(images, item.image)
            return (
              <div key={i} style={{ padding: theme.spacing.card, background: theme.colors.bg, borderRadius: theme.radii.md, textAlign: 'center', boxShadow: theme.shadows.sm, transition: theme.transitions.base }}>
                {img ? (
                  <img src={img} alt={item.title} loading="lazy" style={{ width: '100%', height: '140px', objectFit: 'cover', margin: '0 auto 1rem', display: 'block', borderRadius: theme.radii.md }} />
                ) : (
                  <div style={{ width: '48px', height: '48px', margin: '0 auto 1rem', background: theme.colors.primary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.accent, fontSize: '1.2rem', fontWeight: 'bold' }}>{item.title?.[0] || '✦'}</div>
                )}
                <h3 style={{ fontWeight: 700, color: theme.colors.primary, marginBottom: '0.5rem', fontSize: '1.05rem' }}>{item.title}</h3>
                <p style={{ color: theme.colors.textMuted, lineHeight: 1.5, fontSize: '0.95rem' }}>{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function ProgramsSection({ pageContent, images }: SectionComponentProps) {
  const c = pageContent.programs || {}
  if (!c.tiers?.length) return null
  return (
    <section style={{ padding: theme.spacing.section, background: theme.colors.bg }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{c.eyebrow}</p>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontFamily: theme.fonts.heading, fontWeight: 700, color: theme.colors.primary, marginBottom: '0.5rem' }}>{c.title}</h2>
        <p style={{ color: theme.colors.textMuted, marginBottom: '2rem' }}>{c.subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {c.tiers.map((tier: any, i: number) => {
            const tierImg = tier.image?.$img ? resolveImage(images, `@img:${tier.image.$img}`) : ''
            return (
              <div key={i} style={{
                position: 'relative', padding: '2rem 1.5rem', borderRadius: theme.radii.lg, background: tier.highlighted ? theme.colors.primary : theme.colors.white,
                color: tier.highlighted ? theme.colors.white : theme.colors.primary, boxShadow: tier.highlighted ? '0 8px 30px rgba(27,42,74,0.18)' : theme.shadows.card,
                border: tier.highlighted ? `2px solid ${theme.colors.accent}` : `1px solid ${theme.colors.border}`,
                transform: tier.highlighted ? 'scale(1.04)' : 'none', transformOrigin: 'center top', marginTop: tier.highlighted ? '-0.5rem' : '0'
              }}>
                {tier.badge && <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', padding: '0.3rem 1rem', background: theme.colors.accent, color: theme.colors.primary, borderRadius: theme.radii.full, fontSize: '0.8rem', fontWeight: 700 }}>{tier.badge}</span>}
                {tierImg && <img src={tierImg} alt={tier.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: theme.radii.sm, marginBottom: '1rem' }} />}
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>{tier.name}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.75rem' }}>{tier.description}</p>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.25rem' }}>{tier.price}</div>
                <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '1rem' }}>{tier.priceNote}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', textAlign: 'left' }}>
                  {tier.included?.map((inc: string, j: number) => (
                    <li key={j} style={{ padding: '0.35rem 0', fontSize: '0.85rem', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: theme.colors.success, fontWeight: 'bold' }}>✓</span> {inc}
                    </li>
                  ))}
                </ul>
                {tier.ctaLabel && <a href={tier.ctaHref} style={{ display: 'inline-block', padding: theme.spacing.btn, background: tier.highlighted ? theme.colors.accent : theme.colors.primary, color: tier.highlighted ? theme.colors.primary : theme.colors.white, borderRadius: theme.radii.full, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>{tier.ctaLabel}</a>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function ServicesSection({ pageContent, data, images }: SectionComponentProps) {
  const d = data || pageContent || {}
  const groups = d.groups || (d as any).groups || []
  if (!groups.length) return null
  return (
    <section style={{ padding: theme.spacing.section }}>
      <div style={{ maxWidth: theme.sizes.contentWide, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{d.eyebrow}</p>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontFamily: theme.fonts.heading, fontWeight: 700, color: theme.colors.primary, marginBottom: '2rem' }}>{d.title}</h2>
        {groups.map((group: any, i: number) => (
          <div key={i} style={{ marginBottom: '3rem' }}>
            {i > 0 && <div style={{ width: '60px', height: '2px', background: theme.colors.accent, margin: '0 auto 2.5rem' }} />}
            <h3 style={{ fontSize: '1.2rem', fontFamily: theme.fonts.heading, fontWeight: 700, color: theme.colors.primary, marginBottom: '0.25rem' }}>{group.title}</h3>
            <p style={{ color: theme.colors.textMuted, fontSize: '0.9rem', marginBottom: '1rem' }}>{group.subtitle}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', textAlign: 'left' }}>
              {group.items.map((item: any, j: number) => {
                const itemImg = resolveImage(images, item.image)
                return (
                  <div key={j} style={{ padding: theme.spacing.card, background: theme.colors.bg, borderRadius: theme.radii.md, borderLeft: `3px solid ${theme.colors.accent}`, boxShadow: theme.shadows.sm, transition: theme.transitions.base }}>
                    {itemImg && <img src={itemImg} alt={item.title} loading="lazy" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: theme.radii.sm, marginBottom: '0.75rem' }} />}
                    <h4 style={{ fontWeight: 700, color: theme.colors.primary, marginBottom: '0.3rem' }}>{item.title}</h4>
                    <p style={{ color: theme.colors.textMuted, fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>{item.description}</p>
                    {item.benefits && <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 0' }}>
                      {item.benefits.map((b: string, k: number) => (
                        <li key={k} style={{ fontSize: '0.85rem', color: theme.colors.text, padding: '0.2rem 0', display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                          <span style={{ color: theme.colors.accent, fontWeight: 700 }}>✓</span> {b}
                        </li>
                      ))}
                    </ul>}
                    {item.ctaText && <a href={item.ctaHref} style={{ display: 'inline-block', marginTop: '0.75rem', color: theme.colors.accent, fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem', borderBottom: `2px solid ${theme.colors.accent}` }}>{item.ctaText}</a>}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function WhyCountrySection({ pageContent, images }: SectionComponentProps) {
  const c = pageContent.whyCountry || {}
  if (!c.pillars?.length) return null
  return (
    <section style={{ padding: theme.spacing.sectionDark, background: theme.colors.primary, color: theme.colors.white }}>
      <div style={{ maxWidth: theme.sizes.contentWide, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: theme.colors.accent, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{c.eyebrow}</p>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontFamily: theme.fonts.heading, fontWeight: 700, marginBottom: '0.75rem' }}>{c.title}</h2>
        <div style={{ width: '60px', height: '3px', background: theme.colors.accent, margin: '0 auto 2rem' }} />
        {c.honestNote && <p style={{ fontSize: '0.9rem', opacity: 0.8, fontStyle: 'italic', maxWidth: '600px', margin: '0 auto 2rem' }}>{c.honestNote}</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {c.pillars.map((p: any, i: number) => {
            const img = resolveImage(images, p.imageUrl)
            return (
              <div key={i} style={{ padding: theme.spacing.card, background: theme.colors.cardGlass, borderRadius: theme.radii.md, textAlign: 'left', border: `1px solid ${theme.colors.cardBorder}`, boxShadow: theme.shadows.darkCard, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                {img && <img src={img} alt={p.title} loading="lazy" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: theme.radii.sm, marginBottom: '0.75rem' }} />}
                <h3 style={{ fontWeight: 700, color: theme.colors.accent, marginBottom: '0.5rem', fontSize: '1.1rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.5 }}>{p.description}</p>
                {p.bullets && <ul style={{ marginTop: '0.75rem', paddingLeft: '1rem', fontSize: '0.85rem', opacity: 0.75 }}>
                  {p.bullets.map((b: string, j: number) => <li key={j} style={{ marginBottom: '0.25rem' }}>{b.replace('{{taxRate}}', '10%')}</li>)}
                </ul>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection({ pageContent }: SectionComponentProps) {
  const c = pageContent.beneluxDesk || {}
  if (!c.items?.length) return null
  return (
    <section style={{ padding: theme.spacing.section }}>
      <div style={{ maxWidth: theme.sizes.contentWide, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, color: theme.colors.primary, marginBottom: '0.5rem' }}>{c.title}</h2>
        <p style={{ color: theme.colors.textMuted, marginBottom: '2rem' }}>{c.subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {c.items.map((item: any, i: number) => (
            <div key={i} style={{ padding: theme.spacing.card, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radii.md }}>
              <h4 style={{ fontWeight: 700, color: theme.colors.primary, marginBottom: '0.5rem' }}>{item.title}</h4>
              <p style={{ color: theme.colors.textMuted, fontSize: '0.95rem', lineHeight: 1.5 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProcessSection({ pageContent, images }: SectionComponentProps) {
  const c = pageContent.process || {}
  if (!c.steps?.length) return null
  return (
    <section style={{ padding: theme.spacing.section, background: theme.colors.bg }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{c.eyebrow}</p>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontFamily: theme.fonts.heading, fontWeight: 700, color: theme.colors.primary, marginBottom: '0.5rem' }}>{c.title}</h2>
        {c.totalDuration && <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', background: theme.colors.accentGlow, border: `1px solid ${theme.colors.accent}`, borderRadius: theme.radii.full, color: theme.colors.accentLight, fontWeight: 600, marginBottom: '2rem' }}>{c.totalDuration}</div>}
        <div style={{ position: 'relative', paddingLeft: '2rem', textAlign: 'left' }}>
          {c.steps.map((step: any, i: number) => {
            const stepImg = step.image?.$img ? resolveImage(images, `@img:${step.image.$img}`) : ''
            return (
              <div key={i} style={{ position: 'relative', padding: '1.25rem', marginBottom: '1rem', background: theme.colors.white, borderRadius: theme.radii.md, boxShadow: theme.shadows.card, borderLeft: i < c.steps.length - 1 ? `3px solid ${theme.colors.accent}` : `3px solid ${theme.colors.accent}` }}>
                <div style={{ position: 'absolute', left: '-33px', top: '1rem', width: '36px', height: '36px', background: theme.colors.primary, borderRadius: '50%', border: `3px solid ${theme.colors.accent}`, boxShadow: `0 0 0 4px ${theme.colors.accentGlow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.white, fontSize: '0.85rem', fontWeight: 700 }}>{step.number}</div>
                {stepImg && <img src={stepImg} alt={step.title} loading="lazy" style={{ width: '180px', height: '120px', objectFit: 'cover', borderRadius: theme.radii.md, marginBottom: '0.75rem', boxShadow: theme.shadows.image }} />}
                <h3 style={{ fontWeight: 700, fontFamily: theme.fonts.heading, color: theme.colors.primary, marginBottom: '0.25rem', fontSize: '1.15rem' }}>{step.title}</h3>
                <p style={{ color: theme.colors.textMuted, fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '0.25rem' }}>{step.description}</p>
                {step.duration && <span style={{ display: 'inline-block', fontSize: '0.75rem', color: theme.colors.accent, fontWeight: 600, padding: '0.2rem 0.75rem', background: theme.colors.accentGlow, borderRadius: theme.radii.full, marginTop: '0.25rem' }}>{step.duration}</span>}
              </div>
            )
          })}
        </div>
        {c.ctaLabel && <a href={c.ctaHref} style={{ display: 'inline-block', marginTop: '2rem', padding: theme.spacing.btn, background: theme.colors.accent, color: theme.colors.primary, borderRadius: theme.radii.full, fontWeight: 700, textDecoration: 'none', fontSize: '1.05rem', boxShadow: theme.shadows.cta, transition: theme.transitions.base }}>{c.ctaLabel}</a>}
      </div>
    </section>
  )
}

export function TestimonialsSection({ pageContent, images }: SectionComponentProps) {
  const c = pageContent.testimonials || {}
  if (!c.items?.length) return null
  return (
    <section style={{ padding: theme.spacing.section }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{c.eyebrow}</p>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, color: theme.colors.primary, marginBottom: '0.5rem' }}>{c.title}</h2>
        <p style={{ color: theme.colors.textMuted, marginBottom: '2rem' }}>{c.subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {c.items.map((item: any, i: number) => {
            const img = resolveImage(images, item.image)
            return (
              <div key={i} style={{ padding: '2rem 1.5rem', border: `1px solid ${theme.colors.border}`, borderRadius: theme.radii.lg, textAlign: 'left' }}>
                <div style={{ marginBottom: '0.75rem' }}>{'★'.repeat(item.rating || 5)}{'☆'.repeat(5 - (item.rating || 5))}</div>
                {img && <img src={img} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%', marginBottom: '0.75rem', float: 'right' }} />}
                <p style={{ fontStyle: 'italic', color: theme.colors.text, lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1rem' }}>"{item.quote}"</p>
                <div style={{ fontWeight: 700, color: theme.colors.primary, fontSize: '0.95rem' }}>{item.name || item.author}</div>
                <div style={{ fontSize: '0.85rem', color: theme.colors.textMuted }}>{item.role}</div>
              </div>
            )
          })}
        </div>
        {c.ctaText && <a href={c.ctaHref} style={{ display: 'inline-block', marginTop: '2rem', color: theme.colors.accent, fontWeight: 700, textDecoration: 'none', borderBottom: `2px solid ${theme.colors.accent}` }}>{c.ctaText} →</a>}
      </div>
    </section>
  )
}

export function CtaBanner({ pageContent }: SectionComponentProps) {
  const c = pageContent.finalCta || pageContent.cta || {}
  if (!c.title) return null
  return (
    <section style={{ padding: theme.spacing.section, background: theme.colors.gradient, color: theme.colors.white, textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontFamily: theme.fonts.heading, fontWeight: 700, marginBottom: '0.75rem' }}>{c.title}</h2>
        {c.subtitle && <p style={{ fontSize: '1rem', opacity: 0.85, marginBottom: '1.5rem' }}>{c.subtitle}</p>}
        {c.buttonText && <a href={c.buttonHref || c.ctaHref} style={{ display: 'inline-block', padding: theme.spacing.btn, background: theme.colors.accent, color: theme.colors.primary, borderRadius: theme.radii.full, fontWeight: 700, textDecoration: 'none', fontSize: '1rem', boxShadow: theme.shadows.cta, transition: theme.transitions.base }}>{c.buttonText || c.ctaText}</a>}
      </div>
    </section>
  )
}

export function TaxCalculatorSection({ pageContent }: SectionComponentProps) {
  const c = pageContent.taxCalculator || {}
  const [income, setIncome] = React.useState('');
  const [sourceCountry, setSourceCountry] = React.useState('netherlands');
  const [showResult, setShowResult] = React.useState(false);
  if (!c.title) return null
  const taxRates: Record<string, {name: string, rate: number}> = {
    netherlands: {name: 'Países Bajos / Nederland', rate: 49.5},
    belgium: {name: 'Bélgica / België', rate: 53.5},
    germany: {name: 'Alemania / Deutschland', rate: 47.5},
    uk: {name: 'Reino Unido / UK', rate: 45},
    spain: {name: 'España', rate: 47},
    us: {name: 'Estados Unidos / USA', rate: 37},
  }
  const pi = parseFloat(income) || 0
  const eu = sourceCountry ? Math.round(pi * (taxRates[sourceCountry].rate / 100)) : 0
  const py = Math.round(pi * 0.10)
  const sv = eu - py
  const sr = pi > 0 ? Math.round((sv / eu) * 100) : 0
  return (
    <section style={{ padding: theme.spacing.section, background: theme.colors.primary, color: theme.colors.white }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: '0.5rem' }}>{c.title}</h2>
        <p style={{ color: theme.colors.accent, fontSize: '1rem', marginBottom: '1.5rem' }}>{c.subtitle}</p>
        <div style={{ padding: '2rem', background: theme.colors.overlay, borderRadius: theme.radii.md }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, textAlign: 'left' }}>{c.incomeLabel || 'Ingreso anual (USD)'}</label>
            <input type="number" value={income} onChange={e => { setIncome(e.target.value); setShowResult(false); }}
              placeholder="100,000"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, textAlign: 'left' }}>{c.countryLabel || 'País de origen'}</label>
            <select value={sourceCountry} onChange={e => { setSourceCountry(e.target.value); setShowResult(false); }}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem' }}>
              {Object.entries(taxRates).map(([k, v]) => (
                <option key={k} value={k} style={{background: '#1B2A4A', color: '#fff'}}>{v.name}</option>
              ))}
            </select>
          </div>
          <button onClick={() => setShowResult(true)}
            style={{ width: '100%', padding: '0.85rem 2rem', background: theme.colors.accent, color: theme.colors.primary, fontWeight: 700, fontSize: '1rem', border: 'none', borderRadius: theme.radii.full, cursor: 'pointer', marginBottom: '1rem' }}>
            {c.ctaText || 'Calcular ahorro'}
          </button>
          {showResult && pi > 0 && (
            <div>
              <div style={{ padding: '1rem', background: 'rgba(201,169,110,0.15)', borderRadius: theme.radii.md, marginBottom: '0.75rem' }}>
                <p style={{ color: theme.colors.accent, fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{c.yourSavings || 'Tu ahorro estimado:'} <span style={{fontSize: '1.4rem'}}>${sv.toLocaleString()}/año</span></p>
                <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>{sr}% {c.lessTax || 'menos en impuestos'} — {c.comparisonText || `Pagarías $${eu.toLocaleString()} en ${taxRates[sourceCountry]?.name.split('/')[0]} vs $${py.toLocaleString()} en Paraguay`}</p>
              </div>
              <p style={{ opacity: 0.5, fontSize: '0.75rem', marginTop: '0.5rem' }}>{c.disclaimer || '* Estimación basada en tasas impositivas marginales máximas. Consulta con un asesor fiscal.'}</p>
            </div>
          )}
          {showResult && pi <= 0 && (
            <p style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{c.enterIncome || 'Ingresa un monto válido para calcular.'}</p>
          )}
        </div>
      </div>
    </section>
  )
}