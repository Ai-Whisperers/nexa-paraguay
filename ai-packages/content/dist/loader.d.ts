/**
 * Synchronous JSON loader with optional TTL cache.
 * Reads from the filesystem using Node.js require or fs.
 */
export declare function loadJSON<T = any>(filePath: string, cache?: {
    data: T;
    timestamp: number;
    ttlMs: number;
}): {
    data: T;
    cache: typeof cache;
};
/**
 * Load JSON at build time (SSG/SSR).
 */
export declare function loadContent<T = any>(filePath: string): T;
//# sourceMappingURL=loader.d.ts.map