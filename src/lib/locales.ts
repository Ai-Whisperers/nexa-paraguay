// Re-export from @ai-whisperers/i18n for backward compatibility
// New code should import from '@ai-whisperers/i18n' directly.
export { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE, LOCALE_CONFIG, resolveLocale, isValidLocale } from '@ai-whisperers/i18n'
export type { Locale } from '@ai-whisperers/i18n'

export const LOCALE_FLAGS: Record<string, string> = {
  es: '/images/flags/es.svg',
  en: '/images/flags/us.svg',
  nl: '/images/flags/nl.svg',
  de: '/images/flags/de.svg',
}

export const LOCALE_NAMES: Record<string, string> = {
  es: 'Español',
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
}
