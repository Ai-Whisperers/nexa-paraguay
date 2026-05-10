/**
 * Synchronous JSON loader with optional TTL cache.
 * Reads from the filesystem using Node.js require or fs.
 */
export function loadJSON(filePath, cache) {
    const now = Date.now();
    if (cache && now - cache.timestamp < cache.ttlMs) {
        return { data: cache.data, cache };
    }
    const fs = require("fs");
    const path = require("path");
    const locations = [
        filePath,
        path.join(process.cwd(), filePath),
        path.join(process.cwd(), "..", filePath),
        path.join(process.cwd(), "..", "..", filePath),
    ];
    let raw = null;
    let resolvedPath = null;
    for (const loc of locations) {
        try {
            raw = fs.readFileSync(loc, "utf-8");
            resolvedPath = loc;
            break;
        }
        catch { }
    }
    if (!raw) {
        throw new Error(`[@ai-whisperers/content] Cannot find file: ${filePath}. Tried: ${locations.join(", ")}`);
    }
    const data = JSON.parse(raw);
    return { data, cache: { data, timestamp: now, ttlMs: cache?.ttlMs || 60000 } };
}
/**
 * Load JSON at build time (SSG/SSR).
 */
export function loadContent(filePath) {
    return loadJSON(filePath).data;
}
//# sourceMappingURL=loader.js.map