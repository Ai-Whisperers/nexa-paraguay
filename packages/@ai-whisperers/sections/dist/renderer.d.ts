import React from "react";
import { resolveContent, isSectionEnabled } from "./resolve-content";
import { SectionComponentProps, PageConfig } from "./types";
export interface SectionsRendererProps {
    pageConfig?: PageConfig;
    content?: Record<string, any>;
    images?: Record<string, any>;
    locale?: string;
    sectionOverrides?: Record<string, React.ComponentType<SectionComponentProps>>;
}
/**
 * Creates a SectionsRenderer component with header/footer injected as props.
 * Usage: Pass `header` and `footer` React components at render time.
 */
export declare function createSectionsRenderer(HeaderComponent?: React.ComponentType<{
    navigation?: any;
    locale?: string;
}>, FooterComponent?: React.ComponentType<{
    footer?: any;
}>): ({ pageConfig, content, images, locale, sectionOverrides, }: SectionsRendererProps) => import("react/jsx-runtime").JSX.Element;
export { resolveContent, isSectionEnabled };
//# sourceMappingURL=renderer.d.ts.map