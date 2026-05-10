export declare const LOCALES: readonly ["es", "en", "nl", "de"];
export declare const DEFAULT_LOCALE = "es";
export declare const LOCALE_COOKIE = "NEXT_LOCALE";
export type Locale = (typeof LOCALES)[number];
export interface LocaleConfig {
    label: string;
    flag: string;
    name: string;
}
export declare const LOCALE_CONFIG: Record<string, LocaleConfig>;
/** Get locale from pathname or cookie, falling back to default */
export declare function resolveLocale(pathname: string, cookie?: string | null): string;
/** Check if a string is a valid locale */
export declare function isValidLocale(locale: string): locale is Locale;
declare const _default: {
    LOCALES: readonly ["es", "en", "nl", "de"];
    DEFAULT_LOCALE: string;
    LOCALE_CONFIG: Record<string, LocaleConfig>;
    resolveLocale: typeof resolveLocale;
    isValidLocale: typeof isValidLocale;
};
export default _default;
//# sourceMappingURL=locale-system.d.ts.map