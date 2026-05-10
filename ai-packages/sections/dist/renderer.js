/** @jsxImportSource react */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { resolveContent, isSectionEnabled, } from "./resolve-content";
import { DEFAULT_SECTIONS } from "./registry";
/**
 * Creates a SectionsRenderer component with header/footer injected as props.
 * Usage: Pass `header` and `footer` React components at render time.
 */
export function createSectionsRenderer(HeaderComponent, FooterComponent) {
    return function SectionsRenderer({ pageConfig, content, images, locale, sectionOverrides, }) {
        const sections = pageConfig?.sections || [];
        const mergedMap = sectionOverrides
            ? { ...DEFAULT_SECTIONS, ...sectionOverrides }
            : DEFAULT_SECTIONS;
        return (_jsxs("div", { className: "font-inter text-text-primary", children: [content?.navigation && HeaderComponent && (_jsx(HeaderComponent, { navigation: content.navigation, locale: locale })), _jsx("main", { children: sections.map((section, idx) => {
                        if (section.enabledWhen && !isSectionEnabled(section.enabledWhen, content))
                            return null;
                        const Comp = mergedMap[section.id];
                        if (Comp) {
                            const sectionData = resolveContent(content, section.content || section.id);
                            return (_jsx(Comp, { pageContent: sectionData || content, data: sectionData, images: images, locale: locale }, section.id || idx));
                        }
                        return null;
                    }) }), content?.footer && FooterComponent && _jsx(FooterComponent, { footer: content.footer })] }));
    };
}
export { resolveContent, isSectionEnabled };
//# sourceMappingURL=renderer.js.map