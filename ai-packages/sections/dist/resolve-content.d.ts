/**
 * Resolve a content path from a content object.
 * Supports dot-notation keys: "hero.headline" → content.hero.headline
 * Falls back to direct key access.
 */
export declare function resolveContent(content: Record<string, any> | null | undefined, key: string): any;
/**
 * Resolve an image URL from an image manifest and a reference string.
 * Supports:
 *   - "@img:category.name" → image manifest path lookup
 *   - "@src:category.name" → same format, different prefix
 *   - plain URL string → returned as-is
 */
export declare function resolveImage(images: Record<string, any> | null | undefined, ref: string): string;
/**
 * Resolve a config value with fallbacks and locale-awareness.
 * Tries: key → key_{locale} → defaultValue
 */
export declare function resolveConfig(obj: Record<string, any> | null | undefined, key: string, locale?: string, defaultValue?: string): string;
/**
 * Resolve a localized text field from a content block.
 * Tries: field_{locale} → field → ''
 */
export declare function localizedField(obj: Record<string, any> | null | undefined, field: string, locale?: string): string;
/** Check if a conditional section should be enabled */
export declare function isSectionEnabled(enabledWhen: string | undefined, content: any): boolean;
//# sourceMappingURL=resolve-content.d.ts.map