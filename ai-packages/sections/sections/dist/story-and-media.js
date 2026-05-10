'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { resolveImage } from './resolve-content';
export function StorySection({ pageContent, data }) {
    const d = data || pageContent || {};
    const paragraphs = d.paragraphs || [];
    const resultsParagraphs = d.resultsParagraphs || [];
    if (!d.title && !paragraphs.length)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("section", { className: "py-24", children: _jsxs("div", { className: "max-w-[700px] mx-auto px-4", children: [d.title && _jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-6 text-center", children: d.title }), paragraphs.map((p, i) => (_jsx("p", { className: "text-text leading-relaxed text-sm mb-4", children: p }, i)))] }) }), resultsParagraphs.length > 0 && (_jsx("section", { className: "py-24 bg-surface-alt", children: _jsxs("div", { className: "max-w-[700px] mx-auto px-4", children: [d.resultsTitle && _jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-6 text-center", children: d.resultsTitle }), resultsParagraphs.map((p, i) => (_jsx("p", { className: "text-text leading-relaxed text-sm mb-4", children: p }, i)))] }) }))] }));
}
export function GallerySection({ pageContent, data, images }) {
    const d = data || pageContent || {};
    const photos = d.images || d.items || [];
    if (!d.title && !photos.length)
        return null;
    return (_jsx("section", { className: "py-24 bg-surface-alt", children: _jsxs("div", { className: "max-w-6xl mx-auto text-center px-4", children: [d.title && _jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-4", children: d.title }), d.subtitle && _jsx("p", { className: "text-text-muted mb-8", children: d.subtitle }), _jsx("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4", children: photos.map((photo, i) => {
                        const src = typeof photo === 'string' ? photo : resolveImage?.(images, photo.src || photo.imageUrl || '') || photo.src || photo.imageUrl || '';
                        return (_jsxs("div", { className: "rounded-lg overflow-hidden shadow-md", children: [src && _jsx("img", { src: src, alt: photo.alt || photo.caption || '', className: "w-full h-[220px] object-cover block" }), photo.caption && _jsx("p", { className: "p-3 bg-white text-text-muted text-xs m-0", children: photo.caption })] }, i));
                    }) })] }) }));
}
export function TestimonialsSection({ pageContent, images }) {
    const c = pageContent.testimonials || {};
    if (!c.items?.length)
        return null;
    return (_jsx("section", { className: "py-24", children: _jsxs("div", { className: "max-w-[900px] mx-auto text-center px-4", children: [_jsx("p", { className: "text-xs text-text-muted uppercase tracking-[2px] mb-2", children: c.eyebrow }), _jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-2", children: c.title }), _jsx("p", { className: "text-text-muted mb-8", children: c.subtitle }), _jsx("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6", children: c.items.map((item, i) => {
                        const img = resolveImage(images, item.image);
                        return (_jsxs("div", { className: "p-8 border border-border rounded-2xl text-left", children: [_jsxs("div", { className: "mb-3 text-accent", children: ['★'.repeat(item.rating || 5), '☆'.repeat(5 - (item.rating || 5))] }), img && _jsx("img", { src: img, alt: item.name, className: "w-[60px] h-[60px] object-cover rounded-full mb-3 float-right" }), _jsxs("p", { className: "italic text-primary leading-relaxed text-sm mb-4", children: ["\"", item.quote, "\""] }), _jsx("div", { className: "font-bold text-primary text-sm", children: item.name || item.author }), _jsx("div", { className: "text-sm text-text-muted", children: item.role })] }, i));
                    }) }), c.ctaText && _jsxs("a", { href: c.ctaHref, className: "inline-block mt-8 text-accent font-bold no-underline border-b-2 border-accent", children: [c.ctaText, " \u2192"] })] }) }));
}
//# sourceMappingURL=story-and-media.js.map