export interface LocaleStringSet {
    [locale: string]: Record<string, string>;
}
export declare const COOKIE_BANNER: Record<string, Record<string, string>>;
export declare const GATEWAY_POPUP: Record<string, Record<string, string>>;
export declare const EXIT_POPUP: Record<string, Record<string, string>>;
export declare const FEEDBACK_SECTION: Record<string, Record<string, string>>;
/**
 * Get a specific locale's strings from any string set.
 * Falls back to 'es' (default) if the requested locale is missing.
 */
export declare function getLocaleStrings(set: Record<string, Record<string, string>>, locale: string): Record<string, string>;
/**
 * Get a single key from a locale string set with fallback.
 */
export declare function t(set: Record<string, Record<string, string>>, locale: string, key: string, fallback?: string): string;
//# sourceMappingURL=locale-strings.d.ts.map