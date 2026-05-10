import type { SiteContent } from "./schema";
type ContentLoader = () => Promise<SiteContent>;
export declare function configureContentLoader(loader: ContentLoader): void;
export declare function configureSupabaseLoader(supabaseUrl: string, supabaseKey: string, siteId: string): void;
export declare function configureUrlLoader(url: string): void;
export declare function getContent(): Promise<SiteContent>;
export declare function clearCache(): void;
export declare function useContent(): SiteContent;
export {};
//# sourceMappingURL=loader.d.ts.map