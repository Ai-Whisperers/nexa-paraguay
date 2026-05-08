'use client'

import React from 'react'

export function Footer({ footer }: { footer?: any }) {
  if (!footer) return null
  const columns = footer.columns || []
  return (
    <footer className="bg-primary text-white pt-16 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 mb-8">
          {columns.map((col: any, i: number) => (
            <div key={i}>
              <h4 className="text-accent font-bold text-sm mb-3 uppercase tracking-wider">{col.title}</h4>
              <ul className="list-none p-0 m-0">
                {col.links?.map((link: any, j: number) => (
                  <li key={j} className="mb-2">
                    <a href={link.href} className="text-white/70 no-underline text-xs hover:text-white transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs text-white/60">
          {footer.copyright?.replace('{year}', '2026')}
          <span className="mx-2">·</span>
          <a href="?gateway=true" className="text-white/70 underline text-xs">Reiniciar</a>
        </div>
      </div>
    </footer>
  )
}
