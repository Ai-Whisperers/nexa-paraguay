// Generic locale system for Ai-Whisperers client sites
// Defines supported locales and locale-aware helpers
export const LOCALES = ['es', 'en', 'nl', 'de'];
export const DEFAULT_LOCALE = 'es';
export const LOCALE_COOKIE = 'NEXT_LOCALE';
export const LOCALE_CONFIG = {
    es: { label: 'ES', flag: '/images/flags/es.svg', name: 'Español' },
    en: { label: 'EN', flag: '/images/flags/en.svg', name: 'English' },
    nl: { label: 'NL', flag: '/images/flags/nl.svg', name: 'Nederlands' },
    de: { label: 'DE', flag: '/images/flags/de.svg', name: 'Deutsch' },
};
/** Get locale from pathname or cookie, falling back to default */
export function resolveLocale(pathname, cookie) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && LOCALES.includes(segments[0]))
        return segments[0];
    if (cookie && LOCALES.includes(cookie))
        return cookie;
    return DEFAULT_LOCALE;
}
/** Check if a string is a valid locale */
export function isValidLocale(locale) {
    return LOCALES.includes(locale);
}
export default { LOCALES, DEFAULT_LOCALE, LOCALE_CONFIG, resolveLocale, isValidLocale };
//# sourceMappingURL=locale-system.js.map