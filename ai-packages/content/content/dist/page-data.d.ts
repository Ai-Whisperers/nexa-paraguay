import type { SiteConfig, PageConfig, ImageManifest } from "./types";
export interface PageDataOptions {
    contentPath?: string;
    pagesDir?: string;
    imagesPath?: string;
    siteConfigPath?: string;
    extraData?: Record<string, any>;
}
export interface PageDataResult {
    content: Record<string, any>;
    pageConfig: PageConfig;
    images: ImageManifest;
    siteConfig: SiteConfig;
    extras: Record<string, any>;
}
/**
 * Load all page data: content JSON + page config + images.json + site.json
 * This is the main orchestration function for any page.
 */
export declare function loadPageData(locale: string, slug: string, options?: PageDataOptions): PageDataResult;
//# sourceMappingURL=page-data.d.ts.map