'use client'

/**
 * GA4 event tracking for Nexa Paraguay.
 * Wraps window.gtag with typed events and provides hook utilities.
 */

type GtagCommand = 'event' | 'config' | 'set'

interface EventParams {
  [key: string]: string | number | boolean | undefined
}

// ── Core gtag helper ───────────────────────────────────
export function trackEvent(action: string, params?: EventParams): void {
  if (typeof window === 'undefined') return
  const w = window as any
  if (!w.gtag) return
  w.gtag('event', action, params)
}

// ── Page view ──────────────────────────────────────────
export function trackPageView(path: string, title: string): void {
  if (typeof window === 'undefined') return
  const w = window as any
  if (!w.gtag) return
  w.gtag('config', process.env.NEXT_PUBLIC_GA4_ID || 'G-XE49GLEP34', {
    page_path: path,
    page_title: title,
  })
}

// ── Scroll depth tracking ──────────────────────────────
export function initScrollDepthTracker(): () => void {
  if (typeof window === 'undefined') return () => {}

  const milestones = [25, 50, 75, 90, 100]
  const fired = new Set<number>()

  const handler = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    if (scrollHeight <= 0) return
    const pct = Math.round((window.scrollY / scrollHeight) * 100)
    for (const m of milestones) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m)
        trackEvent('scroll_depth', {
          scroll_depth_milestone: m,
          scroll_depth_percent: pct,
          page_path: window.location.pathname,
        })
      }
    }
  }

  // Debounce
  let timer: ReturnType<typeof setTimeout>
  const debounced = () => {
    clearTimeout(timer)
    timer = setTimeout(handler, 150)
  }

  window.addEventListener('scroll', debounced, { passive: true })
  return () => window.removeEventListener('scroll', debounced)
}

// ── Outbound link tracking ─────────────────────────────
export function trackOutboundClick(url: string, link_text?: string): void {
  trackEvent('outbound_link_click', {
    link_url: url,
    link_text: link_text || '',
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

// ── CTA click tracking ─────────────────────────────────
// Used on: WhatsApp button, booking CTA, phone link, email link
export function trackCtaClick(cta_label: string, cta_location: string): void {
  trackEvent('cta_click', {
    cta_label,
    cta_location,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

// ── Form events ─────────────────────────────────────────
export function trackFormStart(form_id: string, form_type: string): void {
  trackEvent('form_start', {
    form_id,
    form_type,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

export function trackFormStep(form_id: string, step_number: number, step_name: string): void {
  trackEvent('form_step_complete', {
    form_id,
    step_number,
    step_name,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

export function trackFormSubmit(form_id: string, form_type: string, success: boolean): void {
  trackEvent(success ? 'form_submit_success' : 'form_submit_error', {
    form_id,
    form_type,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

export function trackFormAbandon(form_id: string, form_type: string, last_step: number): void {
  trackEvent('form_abandon', {
    form_id,
    form_type,
    last_step,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

// ── Blog post events ───────────────────────────────────
export function trackBlogPostView(post_slug: string, post_title: string, category: string): void {
  trackEvent('blog_post_view', {
    post_slug,
    post_title,
    content_category: category,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

export function trackBlogCtaClick(post_slug: string, cta_type: 'booking' | 'whatsapp' | 'intake'): void {
  trackEvent('blog_cta_click', {
    post_slug,
    cta_type,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

// ── FAQ expand ──────────────────────────────────────────
export function trackFaqExpand(question: string): void {
  trackEvent('faq_expand', {
    question_text: question.substring(0, 100),
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

// ── WhatsApp popup open ─────────────────────────────────
export function trackWhatsAppOpen(source: 'button' | 'floating' | 'exit_popup' | 'blog_cta'): void {
  trackEvent('whatsapp_open', {
    whatsapp_source: source,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

// ── Booking section view ────────────────────────────────
export function trackBookingSectionView(program_type?: string): void {
  trackEvent('booking_section_view', {
    program_type: program_type || 'unknown',
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

// ── Language switch ────────────────────────────────────
export function trackLanguageSwitch(from_locale: string, to_locale: string): void {
  trackEvent('language_switch', {
    from_locale,
    to_locale,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

// ── React hook for scroll depth ─────────────────────────
import { useEffect } from 'react'

export function useScrollDepthTracker() {
  useEffect(() => {
    const cleanup = initScrollDepthTracker()
    return cleanup
  }, [])
}

// ── React hook for outbound link delegation ────────────
export function useOutboundLinkTracker(containerSelector = 'main') {
  useEffect(() => {
    const container = document.querySelector(containerSelector)
    if (!container) return

    const handler = (e: Event) => {
      const el = e.target as Element | null
      const target = el?.closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href) return
      // External link detection
      try {
        const url = new URL(href, window.location.href)
        if (url.hostname !== window.location.hostname) {
          trackOutboundClick(url.href, target.textContent?.trim() || undefined)
        }
      } catch (err) {
        console.warn('[GA4] Invalid outbound URL:', href, err)
      }
    }

    container.addEventListener('click', handler)
    return () => container.removeEventListener('click', handler)
  }, [containerSelector])
}

// ── React hook for page view on route change ───────────
import { usePathname } from 'next/navigation'

export function usePageView(title?: string) {
  const pathname = usePathname()
  useEffect(() => {
    trackPageView(pathname, title || document.title)
  }, [pathname, title])
}