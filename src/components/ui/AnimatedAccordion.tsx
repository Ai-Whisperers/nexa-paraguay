'use client'

import { useState, useRef } from 'react'

interface AccordionItemProps {
  title: React.ReactNode
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ title, children, isOpen, onToggle }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="rounded-xl overflow-hidden border transition-all duration-300"
      style={{
        borderColor: isOpen ? 'var(--color-accent)' : 'var(--color-border)',
        boxShadow: isOpen ? '0 2px 8px rgba(201,169,110,0.12)' : undefined,
        background: 'white',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left border-none bg-transparent cursor-pointer transition-colors hover:bg-surface-alt"
      >
        <span className="text-sm font-semibold text-primary leading-snug flex-1">{title}</span>
        <span
          className="shrink-0 transition-transform duration-300 text-accent"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 500}px` : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-5 pb-5 text-text text-sm leading-relaxed border-t border-border/50 pt-4">
          {children}
        </div>
      </div>
    </div>
  )
}

interface AnimatedAccordionProps {
  items: Array<{
    id?: string | number
    title: string
    content: React.ReactNode
  }>
  allowMultiple?: boolean
  className?: string
  defaultOpen?: number | number[]
}

export function AnimatedAccordion({
  items,
  allowMultiple = false,
  className = '',
  defaultOpen,
}: AnimatedAccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(() => {
    if (defaultOpen === undefined) return new Set([0])
    const s = new Set<number>()
    if (Array.isArray(defaultOpen)) defaultOpen.forEach(i => s.add(i))
    else s.add(defaultOpen)
    return s
  })

  const toggle = (i: number) => {
    setOpenSet(prev => {
      const next = allowMultiple ? new Set(prev) : new Set<number>()
      if (prev.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, i) => (
        <AccordionItem
          key={item.id ?? i}
          title={item.title}
          children={item.content}
          isOpen={openSet.has(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  )
}