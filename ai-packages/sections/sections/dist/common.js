'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
function GenericSection({ data }) {
    if (!data)
        return null;
    const items = data.items || data.full?.items || data.groups || data.pillars || data.members || data.paragraphs || data.trust?.items;
    return (_jsx("section", { className: "py-16 px-4 even:bg-surface-alt", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [data.eyebrow && _jsx("p", { className: "text-xs uppercase tracking-widest text-text-muted mb-2", children: data.eyebrow }), (data.headline || data.title) && _jsx("h2", { className: "text-2xl font-bold mb-2", children: data.headline || data.title }), (data.subheadline || data.subtitle) && _jsx("p", { className: "text-text-muted leading-relaxed mb-6", children: data.subheadline || data.subtitle }), items && Array.isArray(items) && (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left", children: items.map((item, j) => (_jsx("div", { className: "p-5 bg-surface-alt rounded-xl", children: typeof item === 'string' ? _jsx("p", { className: "text-text-muted", children: item }) : (_jsxs(_Fragment, { children: [(item.title || item.pregunta || item.question || item.term || item.name) && _jsx("h4", { className: "font-bold mb-2", children: item.title || item.pregunta || item.question || item.term || item.name }), (item.description || item.respuesta || item.answer || item.definition || item.body || item.role) && _jsx("p", { className: "text-sm text-text-muted leading-relaxed", children: item.description || item.respuesta || item.answer || item.definition || item.body || item.role })] })) }, j))) })), data.ctaText && _jsx("a", { href: data.ctaHref || '#', className: "inline-block mt-6 px-8 py-3 bg-primary text-white rounded-full font-bold text-sm hover:opacity-90", children: data.ctaText })] }) }));
}
export function StatsSection({ pageContent }) {
    const stats = pageContent.stats;
    if (!stats?.items?.length)
        return null;
    return (_jsx("section", { className: "py-12 md:py-16 bg-surface-alt", children: _jsx("div", { className: "max-w-[900px] mx-auto flex justify-center gap-12 flex-wrap", children: stats.items.map((s, i) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-4xl font-extrabold text-primary", children: s.value }), _jsx("div", { className: "text-[0.95rem] text-text-muted mt-1", children: s.label })] }, i))) }) }));
}
export function HighlightSection({ pageContent, data }) {
    const d = data || pageContent || {};
    const items = d.items || d.pillars || [];
    if (!items.length)
        return null;
    return (_jsx("section", { className: "py-12 px-4 bg-white", children: _jsxs("div", { className: "max-w-[800px] mx-auto text-center", children: [d.eyebrow && _jsx("p", { className: "text-xs text-text-muted uppercase tracking-[2px] mb-2", children: d.eyebrow }), d.title && _jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-playfair font-bold text-primary mb-8", children: d.title }), _jsx("div", { className: "flex justify-center gap-[clamp(1.5rem,3vw,3rem)] flex-wrap", children: items.map((s, i) => (_jsxs("div", { className: "text-center", children: [s.value && _jsx("div", { className: "text-3xl font-extrabold text-primary", children: s.value }), s.label && _jsx("div", { className: "text-sm text-text-muted mt-1", children: s.label }), !s.value && s.title && _jsx("h4", { className: "text-lg font-bold text-primary mb-1", children: s.title }), !s.value && s.description && _jsx("p", { className: "text-text-muted text-sm leading-relaxed max-w-[300px]", children: s.description })] }, i))) })] }) }));
}
export default GenericSection;
//# sourceMappingURL=common.js.map