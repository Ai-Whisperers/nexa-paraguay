'use client'

import { useState, useMemo } from 'react'
import { AnimatedSection } from './ui/AnimatedSection'
import { resolveClientLocale } from '@/lib/resolve-client-locale'

const CATEGORIES: Record<string, { label: Record<string, string>; keywords: string[] }> = {
  'residency-legal': {
    label: { es: 'Residencia y Legal', en: 'Residency & Legal', nl: 'Verblijf & Juridisch', de: 'Aufenthalt & Recht' },
    keywords: ['residencia', 'permanente', 'temporal', 'cédula', 'ciudadanía', 'documentos', 'apostilla', 'visa', 'pasaporte', 'migraciones', 'tiempo', 'viaje', 'residency', 'permanent', 'temporary', 'document', 'apostille', 'passport', 'migration']
  },
  'banking-tax': {
    label: { es: 'Banca e Impuestos', en: 'Banking & Tax', nl: 'Bankieren & Belasting', de: 'Bank & Steuern' },
    keywords: ['banco', 'cuenta', 'bancaria', 'impuesto', 'ruc', 'fiscal', 'iva', 'factura', 'divisas', 'dinero', 'pago', 'precio', 'costo', 'incluido', 'bank', 'tax', 'payment', 'price', 'cost', 'include', 'money']
  },
  'lifestyle': {
    label: { es: 'Vida y Estilo', en: 'Lifestyle', nl: 'Levensstijl', de: 'Lebensstil' },
    keywords: ['vida', 'vivir', 'costo', 'salud', 'médico', 'colegio', 'escuela', 'educación', 'clima', 'seguro', 'familia', 'hijos', 'trabajo', 'empleo', 'comunidad', 'expat', 'health', 'school', 'insurance', 'family', 'work']
  },
  'process': {
    label: { es: 'Proceso y Servicios', en: 'Process & Services', nl: 'Proces & Diensten', de: 'Prozess & Dienstleistungen' },
    keywords: ['proceso', 'servicio', 'abogado', 'garantía', 'programa', 'base', 'business', 'investor', 'consulta', 'contratar', 'año', 'leyes', 'pérdida', 'fuera', 'process', 'service', 'lawyer', 'guarantee', 'program', 'consult']
  },
}

function categorizeQuestion(q: string): string {
  const lower = q.toLowerCase()
  for (const [id, cat] of Object.entries(CATEGORIES)) {
    if (cat.keywords.some(k => lower.includes(k))) return id
  }
  return 'general'
}

function getCategoryLabel(catId: string, lang: string): string {
  if (catId === 'general') {
    const labels: Record<string, string> = { es: 'General', en: 'General', nl: 'Algemeen', de: 'Allgemein' }
    return labels[lang] || 'General'
  }
  return CATEGORIES[catId]?.label?.[lang] || CATEGORIES[catId]?.label?.es || catId
}

function FaqItem({ item, globalIdx, open, setOpen, allItems }: {
  item: any; globalIdx: number; open: number | null; setOpen: (v: number | null) => void; allItems: any[]
}) {
  const isOpen = open === globalIdx
  const question = item.q || item.pregunta || item.question || item.title || ''
  const answer = item.a || item.respuesta || item.answer || item.description || item.body || ''

  return (
    <div
      id={`faq-${globalIdx}`}
      className={`rounded-xl overflow-hidden border transition-all duration-300 ${
        isOpen ? 'border-accent bg-white shadow-sm' : 'border-border/60 bg-white hover:border-accent/30'
      }`}
    >
      <button
        onClick={() => setOpen(isOpen ? null : globalIdx)}
        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left border-none bg-transparent cursor-pointer"
      >
        <span className="text-sm font-semibold text-primary leading-snug flex-1">{question}</span>
        <span
          className="shrink-0 transition-transform duration-300 ease-out text-accent"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {/* Animated answer panel */}
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? '500px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-5 pb-5 text-text text-sm leading-relaxed border-t border-border/50 pt-4">
          {answer}
        </div>
      </div>
    </div>
  )
}

export function FaqSection({ pageContent, data, locale }: any) {
  const d = data || pageContent || {}
  const allItems = d.items || []
  const [open, setOpen] = useState<number | null>(0)
  const [search, setSearch] = useState('')

  const filtered = search
    ? allItems.filter((item: any) => {
        const q = (item.q || item.pregunta || item.question || item.title || '').toLowerCase()
        const a = (item.a || item.respuesta || item.answer || item.description || item.body || '').toLowerCase()
        return q.includes(search.toLowerCase()) || a.includes(search.toLowerCase())
      })
    : allItems

  const grouped = useMemo(() => {
    const groups: Record<string, any[]> = {}
    for (const item of filtered) {
      const question = item.q || item.pregunta || item.question || item.title || ''
      const cat = categorizeQuestion(question)
      if (!groups[cat]) groups[cat] = []
      groups[cat].push(item)
    }
    return groups
  }, [filtered])

  const lang: string = resolveClientLocale(locale)
  const placeholder = d.searchPlaceholder || 'Buscar preguntas...'
  const topLabel: Record<string, string> = { es: 'Más consultadas', en: 'Most asked', nl: 'Meest gesteld', de: 'Am häufigsten gefragt' }
  const emptySearch: Record<string, string> = { es: 'No se encontraron preguntas.', en: 'No questions found.', nl: 'Geen vragen gevonden.', de: 'Keine Fragen gefunden.' }
  const clearText: Record<string, string> = { es: 'Limpiar búsqueda', en: 'Clear search', nl: 'Zoekopdracht wissen', de: 'Suche löschen' }

  const topQueries = allItems.slice(0, 5)

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4">
        {/* Search input with animated icon */}
        <AnimatedSection animation="fade-up" className="relative mb-10">
          <input
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full py-3.5 pl-12 pr-4 border border-border rounded-xl text-sm outline-none bg-surface-alt focus:bg-white focus:border-accent transition-all duration-200"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-lg transition-transform duration-200">
            🔍
          </span>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-accent font-semibold bg-none border-none cursor-pointer hover:opacity-70 transition-opacity"
            >
              {clearText[lang] || clearText.es}
            </button>
          )}
        </AnimatedSection>

        {/* Top queries — staggered scroll animation */}
        {!search && (
          <AnimatedSection animation="fade-up" delay={100} className="mb-10">
            <p className="text-xs text-text-muted uppercase tracking-[2px] font-semibold mb-4">{topLabel[lang] || topLabel.es}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topQueries.map((item: any, i: number) => {
                const question = item.q || item.pregunta || item.question || item.title || ''
                return (
                  <AnimatedSection
                    key={i}
                    animation="fade-up"
                    delay={80 * i}
                  >
                    <button
                      onClick={() => {
                        const idx = allItems.indexOf(item)
                        setOpen(idx === open ? null : idx)
                        if (idx >= 0) {
                          setTimeout(() => {
                            document.getElementById(`faq-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                          }, 100)
                        }
                      }}
                      className="w-full text-left p-4 bg-surface-alt rounded-xl border border-border/50 hover:border-accent/30 hover:bg-white hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <p className="text-sm font-semibold text-primary leading-snug">{question}</p>
                    </button>
                  </AnimatedSection>
                )
              })}
            </div>
          </AnimatedSection>
        )}

        {/* Grouped FAQ with animated categories */}
        {Object.entries(grouped).map(([category, items], catIdx) => (
          <AnimatedSection
            key={category}
            animation="fade-up"
            delay={150 + catIdx * 80}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">{getCategoryLabel(category, lang)}</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-2">
              {items.map((item: any, i: number) => {
                const globalIdx = allItems.indexOf(item)
                return (
                  <AnimatedSection
                    key={i}
                    animation="fade-up"
                    delay={i * 40}
                  >
                    <FaqItem
                      item={item}
                      globalIdx={globalIdx}
                      open={open}
                      setOpen={setOpen}
                      allItems={allItems}
                    />
                  </AnimatedSection>
                )
              })}
            </div>
          </AnimatedSection>
        ))}

        {search && filtered.length === 0 && (
          <AnimatedSection animation="fade-up">
            <p className="text-center text-text-muted text-sm py-10">
              {emptySearch[lang] || emptySearch.es}.{' '}
              <button onClick={() => setSearch('')} className="text-accent font-semibold bg-none border-none cursor-pointer underline hover:opacity-70 transition-opacity">
                {clearText[lang] || clearText.es}
              </button>
            </p>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}