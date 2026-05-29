const LOCALES = ['es', 'en', 'nl', 'de'] as const

type Locale = (typeof LOCALES)[number]

export function resolveClientLocale(locale?: string, fallback: Locale = 'en'): Locale {
  if (locale && LOCALES.includes(locale as Locale)) return locale as Locale

  if (typeof window !== 'undefined') {
    const pathLocale = window.location.pathname.split('/').filter(Boolean)[0]
    if (pathLocale && LOCALES.includes(pathLocale as Locale)) return pathLocale as Locale
  }

  return fallback
}
