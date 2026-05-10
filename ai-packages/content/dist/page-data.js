import { loadJSON } from "./loader";
/**
 * Load all page data: content JSON + page config + images.json + site.json
 * This is the main orchestration function for any page.
 */
export function loadPageData(locale, slug, options = {}) {
    const { contentPath = `content/${locale}.json`, pagesDir = `nexa-pages`, imagesPath = `images.json`, siteConfigPath = `site.json`, extraData = {}, } = options;
    // Load content JSON
    const { data: content } = loadJSON(contentPath);
    // Load image manifest
    let images = {};
    try {
        const result = loadJSON(imagesPath);
        images = result.data;
    }
    catch { }
    // Load site config
    let siteConfig = {};
    try {
        const result = loadJSON(siteConfigPath);
        siteConfig = result.data;
    }
    catch { }
    // Load page config
    let pageConfig = { slug };
    try {
        const result = loadJSON(`${pagesDir}/${slug}.json`);
        pageConfig = result.data;
    }
    catch { }
    return {
        content,
        pageConfig,
        images,
        siteConfig,
        extras: extraData,
    };
}
//# sourceMappingURL=page-data.js.map