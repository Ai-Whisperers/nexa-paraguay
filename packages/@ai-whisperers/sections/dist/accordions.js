'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export function FaqSection({ pageContent, data, locale }) {
    const d = data || pageContent || {};
    const allItems = d.items || [];
    if (!allItems.length)
        return null;
    const [open, setOpen] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const items = search
        ? allItems.filter((item) => {
            const q = (item.q || item.pregunta || item.question || item.title || '').toLowerCase();
            const a = (item.a || item.respuesta || item.answer || item.description || item.body || '').toLowerCase();
            return q.includes(search.toLowerCase()) || a.includes(search.toLowerCase());
        })
        : allItems;
    const lang = locale || 'es';
    const t = {
        placeholder: { es: 'Buscar preguntas...', en: 'Search questions...', nl: 'Vragen zoeken...', de: 'Fragen suchen...' },
        empty: { es: 'No se encontraron preguntas.', en: 'No questions found.', nl: 'Geen vragen gevonden.', de: 'Keine Fragen gefunden.' },
        clear: { es: 'Limpiar búsqueda', en: 'Clear search', nl: 'Zoekopdracht wissen', de: 'Suche löschen' },
        count: { es: '{n} de {total} preguntas', en: '{n} of {total} questions', nl: '{n} van {total} vragen', de: '{n} von {total} Fragen' },
    };
    const tr = (key) => d[key] || t[key]?.[lang] || t[key]?.es || '';
    const searchable = d.searchable !== false;
    return (_jsx("section", { className: "py-24 bg-surface-alt", children: _jsxs("div", { className: "max-w-[800px] mx-auto px-4", children: [d.eyebrow && _jsx("p", { className: "text-xs text-text-muted uppercase tracking-[2px] mb-2 text-center", children: d.eyebrow }), d.title && _jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8 text-center", children: d.title }), searchable && (_jsxs("div", { className: "mb-6 relative", children: [_jsx("input", { type: "text", placeholder: tr('searchPlaceholder'), value: search, onChange: e => setSearch(e.target.value), className: "w-full py-3 pl-10 pr-4 border border-border rounded-full text-sm outline-none bg-white" }), _jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-text-muted", children: "\uD83D\uDD0D" })] })), searchable && search && _jsx("p", { className: "text-xs text-text-muted mb-4 text-center", children: tr('countText').replace('{n}', String(items.length)).replace('{total}', String(allItems.length)) }), items.map((item, i) => {
                    const isOpen = open === i;
                    const question = item.q || item.pregunta || item.question || item.title;
                    const answer = item.a || item.respuesta || item.answer || item.description || item.body;
                    if (!question || !answer)
                        return null;
                    return (_jsxs("div", { className: `mb-3 rounded-lg overflow-hidden bg-white transition-colors ${isOpen ? 'border border-accent' : 'border border-border'}`, children: [_jsxs("button", { onClick: () => setOpen(isOpen ? null : i), className: `w-full px-5 py-4 border-none cursor-pointer flex justify-between items-center font-bold text-primary text-sm text-left transition-colors ${isOpen ? 'bg-[#faf8f5]' : 'bg-none'}`, children: [_jsx("span", { children: question }), _jsx("span", { className: `text-accent text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`, children: "\u25BE" })] }), isOpen && _jsx("div", { className: "px-5 pb-5 text-text text-sm leading-relaxed border-t border-border", children: answer })] }, i));
                }), search && items.length === 0 && _jsxs("p", { className: "text-center text-text-muted text-sm", children: [tr('emptyText'), " ", _jsx("button", { onClick: () => setSearch(''), className: "bg-none border-none text-accent cursor-pointer font-bold underline", children: tr('clearText') })] })] }) }));
}
export function FaqSearchSection(props) {
    return _jsx(FaqSection, { ...props, data: { ...(props.data || props.pageContent || {}), searchable: true } });
}
export function PrivacyAccordion({ pageContent, data }) {
    const d = data || pageContent || {};
    const items = d.items || [];
    if (!items.length)
        return null;
    const [open, setOpen] = React.useState(null);
    return (_jsx("section", { className: "py-24", children: _jsxs("div", { className: "max-w-[800px] mx-auto px-4", children: [d.title && _jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8", children: d.title }), items.map((item, i) => {
                    const isOpen = open === i;
                    const title = item.q || item.title || item.pregunta;
                    const body = item.a || item.body || item.description;
                    if (!title || !body)
                        return null;
                    return (_jsxs("div", { className: "mb-3 border border-border rounded-lg overflow-hidden", children: [_jsxs("button", { onClick: () => setOpen(isOpen ? null : i), className: `w-full px-5 py-4 border-none cursor-pointer flex justify-between items-center font-bold text-sm text-left transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-surface-alt text-primary'}`, children: [_jsx("span", { children: title }), _jsx("span", { className: `transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`, children: "\u25BE" })] }), isOpen && _jsx("div", { className: "p-5 text-text text-sm leading-relaxed", children: body })] }, i));
                })] }) }));
}
//# sourceMappingURL=accordions.js.map