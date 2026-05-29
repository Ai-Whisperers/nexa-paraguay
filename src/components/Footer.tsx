'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { resolveClientLocale } from '@/lib/resolve-client-locale'

const LOCALES = ['es', 'en', 'nl', 'de']

export function Footer({ footer, locale }: { footer?: any; locale?: string }) {
  if (!footer) return null
  const columns = footer.columns || []
  const pathname = usePathname()
  const currentLocale = resolveClientLocale(locale)

  const localizeHref = (href?: string) => {
    if (!href) return '#'
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#') || href.startsWith('?')) return href

    const normalized = href.startsWith('/') ? href : `/${href}`
    const parts = normalized.split('/').filter(Boolean)
    if (parts.length > 0 && LOCALES.includes(parts[0])) return normalized
    if (pathname === '/') return `/${currentLocale}${normalized}`
    return `/${currentLocale}${normalized}`
  }

  return (
    <footer className="bg-primary text-white pt-16 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 mb-8">
          {columns.map((col: any, i: number) => (
            <div key={i}>
              <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">{col.title}</h4>
              <ul className="list-none p-0 m-0">
                {col.links?.map((link: any, j: number) => (
                  <li key={j} className="mb-2">
                    <a href={localizeHref(link.href)} className="text-white/70 no-underline text-xs hover:text-white transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs text-white/60">
           {footer.copyright?.replace('{year}', String(new Date().getFullYear()))}
          <span className="mx-2">·</span>
          <a href="?gateway=true" className="text-white/70 underline text-xs">Reiniciar</a>
        </div>
      </div>
    </footer>
  )
}
