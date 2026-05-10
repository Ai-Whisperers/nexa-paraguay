'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { resolveImage } from './resolve-content';
export function TeamSection({ pageContent, data, images }) {
    const d = data || pageContent || {};
    const members = d.members || d.items || [];
    if (!members.length)
        return null;
    return (_jsx("section", { className: "py-20 bg-surface-alt", children: _jsxs("div", { className: "max-w-[900px] mx-auto text-center px-4", children: [d.title && _jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8", children: d.title }), _jsx("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8", children: members.map((m, i) => {
                        const img = resolveImage(images, m.memberImage || m.image || m.imageUrl);
                        return (_jsxs("div", { className: "p-6 bg-white rounded-2xl shadow-card", children: [img && _jsx("img", { src: img, alt: m.name, className: "w-20 h-20 object-cover rounded-full mx-auto mb-4 block" }), _jsx("h4", { className: "font-bold text-primary mb-1", children: m.name || m.role }), m.role && m.name && _jsx("p", { className: "text-accent text-xs font-semibold mb-2", children: m.role }), m.description && _jsx("p", { className: "text-text-muted text-sm leading-relaxed", children: m.description })] }, i));
                    }) })] }) }));
}
export function GlossarySection({ pageContent, data }) {
    const d = data || pageContent || {};
    const items = d.items || [];
    if (!items.length)
        return null;
    return (_jsx("section", { className: "py-20 bg-surface-alt", children: _jsxs("div", { className: "max-w-[800px] mx-auto px-4", children: [d.title && _jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8 text-center", children: d.title }), _jsx("div", { className: "flex flex-col gap-3", children: items.map((item, i) => (_jsxs("div", { className: "p-4 bg-white rounded-lg border border-border", children: [_jsx("h4", { className: "font-bold text-primary mb-1 text-base", children: item.term || item.q || item.title }), _jsx("p", { className: "text-text-muted text-sm leading-relaxed", children: item.definition || item.a || item.description || item.body })] }, i))) })] }) }));
}
export function ComparisonSection({ pageContent, data }) {
    const d = data || pageContent || {};
    const items = d.items || [];
    const columns = d.columns;
    if (!items.length && !columns)
        return null;
    return (_jsx("section", { className: "py-20", children: _jsxs("div", { className: "max-w-6xl mx-auto text-center px-4", children: [d.title && _jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-6", children: d.title }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full border-collapse text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-primary text-white", children: [columns?.map((col, i) => _jsx("th", { className: "p-3 text-left font-bold", children: col }, i)), !columns && items[0] && Object.keys(items[0]).map((k, i) => _jsx("th", { className: "p-3 text-left font-bold", children: k }, i))] }) }), _jsx("tbody", { children: items.map((row, i) => (_jsx("tr", { className: `border-b border-border ${i % 2 ? 'bg-surface-alt' : 'bg-white'}`, children: columns ? columns.map((col, j) => _jsx("td", { className: "p-3 text-text", children: row[col] || row[j] || '' }, j))
                                        : Object.values(row).map((v, j) => _jsx("td", { className: "p-3 text-text", children: v }, j)) }, i))) })] }) })] }) }));
}
export function GuidesSection({ pageContent, data }) {
    const d = data || pageContent || {};
    const items = d.items || [];
    if (!d.title && !items.length)
        return null;
    return (_jsx("section", { className: "py-20", children: _jsxs("div", { className: "max-w-[800px] mx-auto text-center px-4", children: [d.title && _jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-2", children: d.title }), d.subtitle && _jsx("p", { className: "text-text-muted mb-8", children: d.subtitle }), _jsx("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6", children: items.map((item, i) => (_jsxs("div", { className: "p-6 bg-surface-alt rounded-lg border border-border", children: [_jsx("h4", { className: "font-bold text-primary mb-2", children: item.title }), item.description && _jsx("p", { className: "text-text-muted text-sm leading-relaxed mb-4", children: item.description }), item.fileUrl ? _jsxs("a", { href: item.fileUrl, className: "inline-block px-5 py-2 bg-primary text-white rounded-full text-xs font-bold no-underline", children: ["\u2193 ", item.ctaText || "Descargar"] })
                                : _jsx("span", { className: "text-xs text-text-muted italic", children: "Pr\u00F3ximamente" })] }, i))) })] }) }));
}
export function PressReleasesListSection({ pageContent, data }) {
    const d = data || pageContent || {};
    const items = d.items || d.pressReleases || [];
    if (!items.length)
        return null;
    return (_jsx("section", { className: "py-20", children: _jsxs("div", { className: "max-w-[800px] mx-auto px-4", children: [d.title && _jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-2 text-center", children: d.title }), d.subtitle && _jsx("p", { className: "text-text-muted text-center mb-8", children: d.subtitle }), items.map((item, i) => (_jsxs("article", { className: "p-6 mb-4 bg-white rounded-lg border border-border", style: { boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }, children: [item.date && _jsx("span", { className: "text-xs text-accent font-semibold block mb-1", children: item.date }), _jsx("h3", { className: "text-lg font-bold text-primary mb-2", children: item.title }), item.summary && _jsx("p", { className: "text-text-muted text-sm leading-relaxed mb-3", children: item.summary }), item.link && _jsx("a", { href: item.link, className: "text-accent font-bold text-xs no-underline border-b-2 border-accent", children: item.ctaText || 'Leer más →' })] }, i)))] }) }));
}
export function BlogSection({ pageContent, data, images, locale: _locale }) {
    const d = data || pageContent || {};
    const posts = d.posts || [];
    const locale = _locale || 'nl';
    if (!posts.length)
        return null;
    return (_jsx("section", { className: "py-20", children: _jsxs("div", { className: "max-w-[900px] mx-auto px-4", children: [d.title && _jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8 text-center", children: d.title }), _jsx("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6", children: posts.map((post, i) => {
                        const postImg = post.image ? resolveImage(images, `@img:blog.${post.image}`) : (post.coverImage || '');
                        return (_jsxs("article", { className: "border border-border rounded-2xl overflow-hidden bg-white", children: [postImg && _jsx("img", { src: postImg, alt: post.title, className: "w-full h-[180px] object-cover" }), _jsxs("div", { className: "p-5", children: [post.date && _jsx("span", { className: "text-xs text-accent font-semibold", children: post.date }), _jsx("h3", { className: "text-base font-bold text-primary my-2", children: post.title }), post.excerpt && _jsx("p", { className: "text-text-muted text-sm leading-relaxed mb-3", children: post.excerpt }), post.slug && _jsx("a", { href: `/${locale}/blog/${post.slug}`, className: "text-accent font-bold text-xs no-underline border-b-2 border-accent", children: "Leer m\u00E1s \u2192" })] })] }, i));
                    }) })] }) }));
}
//# sourceMappingURL=lists-and-grids.js.map