'use client'

import React from 'react'
import { SectionComponentProps } from '../types'
import { resolveImage } from './content'

export function HeroSection({ pageContent, images }: SectionComponentProps) {
  const c = pageContent.hero || {}
  const bgImage = resolveImage(images, c.backgroundImage)
  return (
    <section className={`px-4 text-center relative flex items-center justify-center ${bgImage ? 'bg-cover bg-center' : ''}`}
      style={bgImage ? {
        padding: '4rem 1rem',
        minHeight: 'clamp(350px,50vh,550px)',
        background: `linear-gradient(135deg, rgba(27,42,74,0.85), rgba(27,42,74,0.65)), url(${bgImage})`,
        backgroundSize: 'cover', backgroundPosition: 'center'
      } : {
        padding: '4rem 1rem',
        minHeight: 'clamp(350px,50vh,550px)',
        background: 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto relative z-10 text-white">
        <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-playfair font-bold leading-tight mb-3">{c.headline}</h1>
        <div className="w-[60px] h-[3px] bg-accent mx-auto mb-5" />
        <p className="text-lg opacity-90 leading-relaxed max-w-[600px] mx-auto mb-8">{c.subheadline}</p>
        <div className="flex gap-4 justify-center flex-wrap">
          {c.ctaPrimaryText && <a href={c.ctaPrimaryHref} className="px-8 py-3 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 transition-opacity no-underline">{c.ctaPrimaryText}</a>}
          {c.ctaSecondaryText && <a href={c.ctaSecondaryHref} className="px-8 py-3 border-2 border-accent text-white rounded-full font-semibold text-base opacity-90 hover:opacity-100 no-underline">{c.ctaSecondaryText}</a>}
        </div>
        {c.trustBadges && <div className="flex gap-4 justify-center mt-8 flex-wrap">
          {c.trustBadges.map((b: string, i: number) => (
            <span key={i} className="px-4 py-1.5 bg-black/30 rounded-full text-sm">{b}</span>
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
    <section className="py-12 md:py-16 bg-surface-alt">
      <div className="max-w-[900px] mx-auto flex justify-center gap-12 flex-wrap">
        {stats.items.map((s: any, i: number) => (
          <div key={i} className="text-center">
            <div className="text-4xl font-extrabold text-primary">{s.value}</div>
            <div className="text-[0.95rem] text-text-muted mt-1">{s.label}</div>
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
    <section className="py-24">
      <div className="max-w-6xl mx-auto text-center px-4">
        <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2">{c.eyebrow}</p>
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-playfair font-bold text-primary mb-8">{c.title}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {c.items.map((item: any, i: number) => {
            const img = resolveImage(images, item.image)
            return (
              <div key={i} className="p-6 bg-surface-alt rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                {img ? (
                  <img src={img} alt={item.title} loading="lazy" className="w-full h-[140px] object-cover mb-4 block rounded-lg" />
                ) : (
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center text-accent text-lg font-bold">{item.title?.[0] || '✦'}</div>
                )}
                <h3 className="font-bold text-primary mb-2 text-base">{item.title}</h3>
                <p className="text-text-muted leading-relaxed text-[0.95rem]">{item.description}</p>
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
    <section className="py-24 bg-surface-alt">
      <div className="max-w-[1100px] mx-auto text-center px-4">
        <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2">{c.eyebrow}</p>
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-playfair font-bold text-primary mb-2">{c.title}</h2>
        <p className="text-text-muted mb-8">{c.subtitle}</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
          {c.tiers.map((tier: any, i: number) => {
            const tierImg = tier.image?.$img ? resolveImage(images, `@img:${tier.image.$img}`) : ''
            return (
              <div key={i}
                className={`relative p-8 rounded-2xl transition-all ${tier.highlighted ? 'bg-primary text-white scale-[1.04] shadow-[0_8px_30px_rgba(27,42,74,0.18)] -mt-2' : 'bg-white text-primary shadow-card border border-border'}`}
                style={{ border: tier.highlighted ? '2px solid #C9A96E' : undefined }}
              >
                {tier.badge && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-primary rounded-full text-xs font-bold">{tier.badge}</span>}
                {tierImg && <img src={tierImg} alt={tier.name} className="w-full h-[140px] object-cover rounded-sm mb-4" />}
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-sm opacity-80 mb-3">{tier.description}</p>
                <div className="text-2xl font-extrabold mb-1">{tier.price}</div>
                <p className="text-xs opacity-70 mb-4">{tier.priceNote}</p>
                <ul className="list-none p-0 m-0 mb-6 text-left">
                  {tier.included?.map((inc: string, j: number) => (
                    <li key={j} className="py-1 text-xs opacity-85 flex items-center gap-2">
                      <span className="text-success font-bold">✓</span> {inc}
                    </li>
                  ))}
                </ul>
                {tier.ctaLabel && <a href={tier.ctaHref} className={`inline-block px-8 py-3 rounded-full font-bold text-sm no-underline ${tier.highlighted ? 'bg-accent text-primary' : 'bg-primary text-white'}`}>{tier.ctaLabel}</a>}
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
  const groups = d.services?.groups || d.groups || []
  if (!groups.length) return null
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto text-center px-4">
        <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2">{d.eyebrow}</p>
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-playfair font-bold text-primary mb-8">{d.title}</h2>
        {groups.map((group: any, i: number) => (
          <div key={i} className="mb-12">
            {i > 0 && <div className="w-[60px] h-[2px] bg-accent mx-auto mb-10" />}
            <h3 className="text-lg font-playfair font-bold text-primary mb-1">{group.title}</h3>
            <p className="text-text-muted text-sm mb-4">{group.subtitle}</p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 text-left">
              {group.items.map((item: any, j: number) => {
                const itemImg = resolveImage(images, item.image)
                return (
                  <div key={j} className="p-6 bg-surface-alt rounded-lg border-l-[3px] border-accent shadow-sm hover:shadow-md transition-shadow">
                    {itemImg && <img src={itemImg} alt={item.title} loading="lazy" className="w-full h-[140px] object-cover rounded-sm mb-3" />}
                    <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                    <p className="text-text-muted text-sm leading-relaxed mb-2">{item.description}</p>
                    {item.benefits && <ul className="list-none p-0 mt-2">
                      {item.benefits.map((b: string, k: number) => (
                        <li key={k} className="text-xs text-text-muted py-0.5 flex gap-2 items-baseline">
                          <span className="text-accent font-bold">✓</span> {b}
                        </li>
                      ))}
                    </ul>}
                    {item.ctaText && <a href={item.ctaHref} className="inline-block mt-3 text-accent font-bold text-xs no-underline border-b-2 border-accent">{item.ctaText}</a>}
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
    <section className="py-24 bg-primary text-white">
      <div className="max-w-6xl mx-auto text-center px-4">
        <p className="text-xs text-accent uppercase tracking-[2px] mb-2">{c.eyebrow}</p>
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-playfair font-bold mb-3">{c.title}</h2>
        <div className="w-[60px] h-[3px] bg-accent mx-auto mb-8" />
        {c.honestNote && <p className="text-sm opacity-80 italic max-w-[600px] mx-auto mb-8">{c.honestNote}</p>}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {c.pillars.map((p: any, i: number) => {
            const img = resolveImage(images, p.imageUrl)
            return (
              <div key={i} className="p-6 rounded-lg text-left backdrop-blur-[10px]"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,169,110,0.12)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
              >
                {img && <img src={img} alt={p.title} loading="lazy" className="w-full h-[160px] object-cover rounded-sm mb-3" />}
                <h3 className="font-bold text-accent mb-2 text-lg">{p.title}</h3>
                <p className="text-sm text-white/85 leading-relaxed">{p.description}</p>
                {p.bullets && <ul className="mt-3 pl-4 text-xs text-white/65">
                  {p.bullets.map((b: string, j: number) => <li key={j} className="mb-1">{b.replace('{{taxRate}}', '10%')}</li>)}
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
    <section className="py-24">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-2">{c.title}</h2>
        <p className="text-text-muted mb-8">{c.subtitle}</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {c.items.map((item: any, i: number) => (
            <div key={i} className="p-6 border border-border rounded-lg">
              <h4 className="font-bold text-primary mb-2">{item.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
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
    <section className="py-24 bg-surface-alt">
      <div className="max-w-[900px] mx-auto text-center px-4">
        <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2">{c.eyebrow}</p>
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-playfair font-bold text-primary mb-2">{c.title}</h2>
        {c.totalDuration && <div className="inline-block px-6 py-2 bg-accent/10 border border-accent rounded-full text-accent font-semibold mb-8">{c.totalDuration}</div>}
        <div className="relative pl-8 text-left">
          {c.steps.map((step: any, i: number) => {
            const stepImg = step.image?.$img ? resolveImage(images, `@img:${step.image.$img}`) : ''
            return (
              <div key={i} className="relative p-5 mb-4 bg-white rounded-lg shadow-card border-l-[3px] border-accent">
                <div className="absolute -left-[33px] top-4 w-9 h-9 bg-primary rounded-full border-[3px] border-accent flex items-center justify-center text-white text-xs font-bold"
                  style={{ boxShadow: '0 0 0 4px rgba(201,169,110,0.15)' }}
                >{step.number}</div>
                {stepImg && <img src={stepImg} alt={step.title} loading="lazy" className="w-[180px] h-[120px] object-cover rounded-lg mb-3 shadow-md" />}
                <h3 className="font-bold font-playfair text-primary mb-1 text-lg">{step.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-1">{step.description}</p>
                {step.duration && <span className="inline-block text-xs text-accent font-semibold px-3 py-1 bg-accent/10 rounded-full mt-1">{step.duration}</span>}
              </div>
            )
          })}
        </div>
        {c.ctaLabel && <a href={c.ctaHref} className="inline-block mt-8 px-8 py-3 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 transition-opacity no-underline">{c.ctaLabel}</a>}
      </div>
    </section>
  )
}

export function TestimonialsSection({ pageContent, images }: SectionComponentProps) {
  const c = pageContent.testimonials || {}
  if (!c.items?.length) return null
  return (
    <section className="py-24">
      <div className="max-w-[900px] mx-auto text-center px-4">
        <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2">{c.eyebrow}</p>
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-2">{c.title}</h2>
        <p className="text-text-muted mb-8">{c.subtitle}</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {c.items.map((item: any, i: number) => {
            const img = resolveImage(images, item.image)
            return (
              <div key={i} className="p-8 border border-border rounded-2xl text-left">
                <div className="mb-3 text-accent">{'★'.repeat(item.rating || 5)}{'☆'.repeat(5 - (item.rating || 5))}</div>
                {img && <img src={img} alt={item.name} className="w-[60px] h-[60px] object-cover rounded-full mb-3 float-right" />}
                <p className="italic text-primary leading-relaxed text-sm mb-4">"{item.quote}"</p>
                <div className="font-bold text-primary text-sm">{item.name || item.author}</div>
                <div className="text-sm text-text-muted">{item.role}</div>
              </div>
            )
          })}
        </div>
        {c.ctaText && <a href={c.ctaHref} className="inline-block mt-8 text-accent font-bold no-underline border-b-2 border-accent">{c.ctaText} →</a>}
      </div>
    </section>
  )
}

export function CtaBanner({ pageContent }: SectionComponentProps) {
  const c = pageContent.finalCta || pageContent.cta || {}
  if (!c.title) return null
  return (
    <section className="py-24 text-center text-white"
      style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)' }}
    >
      <div className="max-w-[600px] mx-auto px-4">
        <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-playfair font-bold mb-3">{c.title}</h2>
        {c.subtitle && <p className="text-base opacity-85 mb-6">{c.subtitle}</p>}
        {c.buttonText && <a href={c.buttonHref || c.ctaHref} className="inline-block px-8 py-3 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 transition-opacity no-underline">{c.buttonText || c.ctaText}</a>}
      </div>
    </section>
  )
}
