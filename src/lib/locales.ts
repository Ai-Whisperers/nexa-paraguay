export const LOCALES = ['es', 'en', 'nl', 'de'] as const
export const DEFAULT_LOCALE = 'es'
export const LOCALE_COOKIE = 'NEXT_LOCALE'

export type Locale = (typeof LOCALES)[number]

export const LOCALE_FLAGS: Record<string, string> = {
  es: '/images/flags/es.svg',
  en: '/images/flags/us.svg',
  nl: '/images/flags/nl.svg',
  de: '/images/flags/de.svg',
}

export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
}
