import React from 'react'
import { resolveContent } from './content'

interface SectionProps {
  variant?: string
  pageContent: any
  [key: string]: any
}

export function HeroSection({ pageContent }: SectionProps) {
  const c = pageContent.hero || {}
  return (
    <section style={{ padding: '4rem 1rem', background: 'linear-gradient(135deg, #1B2A4A 0%, #2a3f6a 100%)', color: '#fff', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem' }}>{c.headline}</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>{c.subheadline}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {c.ctaPrimaryText && <a href={c.ctaPrimaryHref} style={{ padding: '0.85rem 2.5rem', background: '#C9A96E', color: '#1B2A4A', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>{c.ctaPrimaryText}</a>}
          {c.ctaSecondaryText && <a href={c.ctaSecondaryHref} style={{ padding: '0.85rem 2.5rem', border: '2px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: '50px', fontWeight: 600, textDecoration: 'none', fontSize: '1rem' }}>{c.ctaSecondaryText}</a>}
        </div>
        {c.trustBadges && <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          {c.trustBadges.map((b: string, i: number) => (
            <span key={i} style={{ padding: '0.35rem 1rem', background: 'rgba(255,255,255,0.12)', borderRadius: '50px', fontSize: '0.85rem' }}>{b}</span>
          ))}
        </div>}
      </div>
    </section>
  )
}

export function StatsSection({ pageContent }: SectionProps) {
  const stats = pageContent.stats
  if (!stats?.items?.length) return null
  return (
    <section style={{ padding: '3rem 1rem', background: '#F5F5F0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
        {stats.items.map((s: any, i: number) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1B2A4A' }}>{s.value}</div>
            <div style={{ fontSize: '0.95rem', color: '#666', marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function TrustSection({ pageContent }: SectionProps) {
  const c = pageContent.trust || {}
  if (!c.items?.length) return null
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{c.eyebrow}</p>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, color: '#1B2A4A', marginBottom: '2rem' }}>{c.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {c.items.map((item: any, i: number) => (
            <div key={i} style={{ padding: '1.5rem', background: '#F5F5F0', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', margin: '0 auto 1rem', background: '#1B2A4A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A96E', fontSize: '1.2rem', fontWeight: 'bold' }}>{item.title?.[0] || '✦'}</div>
              <h4 style={{ fontWeight: 700, color: '#1B2A4A', marginBottom: '0.5rem' }}>{item.title}</h4>
              <p style={{ color: '#666', lineHeight: 1.5, fontSize: '0.95rem' }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProgramsSection({ pageContent }: SectionProps) {
  const c = pageContent.programs || {}
  if (!c.tiers?.length) return null
  return (
    <section style={{ padding: '4rem 1rem', background: '#F5F5F0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{c.eyebrow}</p>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, color: '#1B2A4A', marginBottom: '0.5rem' }}>{c.title}</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>{c.subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {c.tiers.map((tier: any, i: number) => (
            <div key={i} style={{
              position: 'relative', padding: '2rem 1.5rem', borderRadius: '16px', background: tier.highlighted ? '#1B2A4A' : '#fff',
              color: tier.highlighted ? '#fff' : '#1B2A4A', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: tier.highlighted ? 'none' : '1px solid #e0e0e0',
              transform: tier.highlighted ? 'scale(1.02)' : 'none'
            }}>
              {tier.badge && <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', padding: '0.3rem 1rem', background: '#C9A96E', color: '#1B2A4A', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700 }}>{tier.badge}</span>}
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>{tier.name}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.75rem' }}>{tier.description}</p>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.25rem' }}>{tier.price}</div>
              <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '1rem' }}>{tier.priceNote}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', textAlign: 'left' }}>
                {tier.included?.map((inc: string, j: number) => (
                  <li key={j} style={{ padding: '0.35rem 0', fontSize: '0.85rem', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> {inc}
                  </li>
                ))}
              </ul>
              {tier.ctaLabel && <a href={tier.ctaHref} style={{ display: 'inline-block', padding: '0.7rem 2rem', background: tier.highlighted ? '#C9A96E' : '#1B2A4A', color: tier.highlighted ? '#1B2A4A' : '#fff', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>{tier.ctaLabel}</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesSection({ pageContent }: SectionProps) {
  const c = pageContent.services || {}
  if (!c.groups?.length) return null
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{c.eyebrow}</p>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, color: '#1B2A4A', marginBottom: '2rem' }}>{c.title}</h2>
        {c.groups.map((group: any, i: number) => (
          <div key={i} style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1B2A4A', marginBottom: '0.25rem' }}>{group.title}</h3>
            <p style={{ color: '#6B6B6B', fontSize: '0.9rem', marginBottom: '1rem' }}>{group.subtitle}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', textAlign: 'left' }}>
              {group.items.map((item: any, j: number) => (
                <div key={j} style={{ padding: '1.25rem', background: '#F5F5F0', borderRadius: '12px' }}>
                  <h4 style={{ fontWeight: 700, color: '#1B2A4A', marginBottom: '0.3rem' }}>{item.title}</h4>
                  <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function WhyCountrySection({ pageContent }: SectionProps) {
  const c = pageContent.whyCountry || {}
  if (!c.pillars?.length) return null
  return (
    <section style={{ padding: '4rem 1rem', background: '#1B2A4A', color: '#fff' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: '#C9A96E', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{c.eyebrow}</p>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: '2rem' }}>{c.title}</h2>
        {c.honestNote && <p style={{ fontSize: '0.9rem', opacity: 0.8, fontStyle: 'italic', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>{c.honestNote}</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {c.pillars.map((p: any, i: number) => (
            <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', textAlign: 'left' }}>
              <h4 style={{ fontWeight: 700, color: '#C9A96E', marginBottom: '0.5rem' }}>{p.title}</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.5 }}>{p.description}</p>
              {p.bullets && <ul style={{ marginTop: '0.75rem', paddingLeft: '1rem', fontSize: '0.85rem', opacity: 0.75 }}>
                {p.bullets.map((b: string, j: number) => <li key={j} style={{ marginBottom: '0.25rem' }}>{b.replace('{{taxRate}}', pageContent.placeholders?.taxRate || '10%')}</li>)}
              </ul>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection({ pageContent }: SectionProps) {
  const c = pageContent.beneluxDesk || {}
  if (!c.items?.length) return null
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, color: '#1B2A4A', marginBottom: '0.5rem' }}>{c.title}</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>{c.subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {c.items.map((item: any, i: number) => (
            <div key={i} style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '12px' }}>
              <h4 style={{ fontWeight: 700, color: '#1B2A4A', marginBottom: '0.5rem' }}>{item.title}</h4>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.5 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProcessSection({ pageContent }: SectionProps) {
  const c = pageContent.process || {}
  if (!c.steps?.length) return null
  return (
    <section style={{ padding: '4rem 1rem', background: '#F5F5F0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{c.eyebrow}</p>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, color: '#1B2A4A', marginBottom: '0.5rem' }}>{c.title}</h2>
        {c.totalDuration && <p style={{ color: '#C9A96E', fontWeight: 600, marginBottom: '2rem' }}>{c.totalDuration}</p>}
        <div style={{ position: 'relative', paddingLeft: '2rem', textAlign: 'left' }}>
          {c.steps.map((step: any, i: number) => (
            <div key={i} style={{ position: 'relative', padding: '1rem 0 1rem 2rem', borderLeft: i < c.steps.length - 1 ? '2px solid #C9A96E' : 'none' }}>
              <div style={{ position: 'absolute', left: '-12px', top: '1.2rem', width: '24px', height: '24px', background: '#1B2A4A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>{step.number}</div>
              <h4 style={{ fontWeight: 700, color: '#1B2A4A', marginBottom: '0.25rem' }}>{step.title}</h4>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '0.25rem' }}>{step.description}</p>
              {step.duration && <span style={{ fontSize: '0.8rem', color: '#C9A96E', fontWeight: 600 }}>{step.duration}</span>}
            </div>
          ))}
        </div>
        {c.ctaLabel && <a href={c.ctaHref} style={{ display: 'inline-block', marginTop: '2rem', padding: '0.85rem 2.5rem', background: '#1B2A4A', color: '#fff', borderRadius: '50px', fontWeight: 700, textDecoration: 'none' }}>{c.ctaLabel}</a>}
      </div>
    </section>
  )
}

export function TestimonialsSection({ pageContent }: SectionProps) {
  const c = pageContent.testimonials || {}
  if (!c.items?.length) return null
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{c.eyebrow}</p>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, color: '#1B2A4A', marginBottom: '0.5rem' }}>{c.title}</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>{c.subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {c.items.map((item: any, i: number) => (
            <div key={i} style={{ padding: '2rem 1.5rem', border: '1px solid #e0e0e0', borderRadius: '16px', textAlign: 'left' }}>
              <div style={{ marginBottom: '0.75rem' }}>{'★'.repeat(item.rating || 5)}{'☆'.repeat(5 - (item.rating || 5))}</div>
              <p style={{ fontStyle: 'italic', color: '#444', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1rem' }}>"{item.quote}"</p>
              <div style={{ fontWeight: 700, color: '#1B2A4A', fontSize: '0.95rem' }}>{item.author}</div>
              <div style={{ fontSize: '0.85rem', color: '#6B6B6B' }}>{item.role}</div>
            </div>
          ))}
        </div>
        {c.ctaText && <a href={c.ctaHref} style={{ display: 'inline-block', marginTop: '2rem', color: '#C9A96E', fontWeight: 700, textDecoration: 'none', borderBottom: '2px solid #C9A96E' }}>{c.ctaText} →</a>}
      </div>
    </section>
  )
}

export function CtaBanner({ pageContent }: SectionProps) {
  const c = pageContent.finalCta || {}
  if (!c.title) return null
  return (
    <section style={{ padding: '4rem 1rem', background: 'linear-gradient(135deg, #1B2A4A 0%, #2a3f6a 100%)', color: '#fff', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, marginBottom: '0.75rem' }}>{c.title}</h2>
        {c.subtitle && <p style={{ fontSize: '1rem', opacity: 0.85, marginBottom: '1.5rem' }}>{c.subtitle}</p>}
        {c.buttonText && <a href={c.buttonHref || c.ctaHref} style={{ display: 'inline-block', padding: '0.85rem 2.5rem', background: '#C9A96E', color: '#1B2A4A', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>{c.buttonText || c.ctaText}</a>}
      </div>
    </section>
  )
}

export function TaxCalculatorSection({ pageContent }: SectionProps) {
  const c = pageContent.taxCalculator || {}
  if (!c.title) return null
  return (
    <section style={{ padding: '4rem 1rem', background: '#1B2A4A', color: '#fff' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: '0.5rem' }}>{c.title}</h2>
        <p style={{ color: '#C9A96E', fontSize: '1rem', marginBottom: '1.5rem' }}>{c.subtitle}</p>
        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
          <p style={{ opacity: 0.6, fontSize: '0.9rem', fontStyle: 'italic' }}>Calculadora próximamente.</p>
        </div>
      </div>
    </section>
  )
}
