import React from 'react'

type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost' | 'whatsapp'

export function Button({
  href, onClick, children, variant = 'accent', size = 'md', className = '', ...props
}: {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const base = 'inline-block font-bold rounded-full no-underline transition-all duration-200 hover:opacity-90 cursor-pointer border-none text-center'

  const variants: Record<ButtonVariant, string> = {
    accent: 'bg-accent text-primary',
    primary: 'bg-primary text-white',
    outline: 'border-2 border-white/40 text-white hover:border-white/70',
    ghost: 'border border-border text-text-muted hover:text-primary hover:border-accent',
    whatsapp: 'bg-whatsapp text-white',
  }

  const sizes: Record<string, string> = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-10 py-4 text-base',
  }

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) return <a href={href} className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}

export function SectionHeading({ title, subtitle, eyebrow, className = '' }: {
  title?: string
  subtitle?: string
  eyebrow?: string
  className?: string
}) {
  if (!title && !subtitle && !eyebrow) return null
  return (
    <div className={`text-center mb-8 ${className}`}>
      {eyebrow && <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2">{eyebrow}</p>}
      {title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary">{title}</h2>}
      {subtitle && <p className="text-text-muted mt-2">{subtitle}</p>}
    </div>
  )
}

export function Section({ children, className = '', bg = 'default' }: {
  children: React.ReactNode
  className?: string
  bg?: 'default' | 'alt' | 'dark' | 'none'
}) {
  const bgs: Record<string, string> = {
    default: '',
    alt: 'bg-surface-alt',
    dark: 'bg-primary text-white',
    none: '',
  }
  return (
    <section className={`py-24 px-4 ${bgs[bg]} ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  )
}

export function AccentLine({ className = '' }: { className?: string }) {
  return <div className={`w-[60px] h-[3px] bg-accent mx-auto ${className}`} />
}
