'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function CtaBanner({ pageContent }) {
    const c = pageContent.finalCta || pageContent.cta || {};
    if (!c.title)
        return null;
    return (_jsx("section", { className: "py-24 text-center text-white bg-brand-gradient", children: _jsxs("div", { className: "max-w-[600px] mx-auto px-4", children: [_jsx("h2", { className: "text-[clamp(1.5rem,3vw,2.2rem)] font-playfair font-bold mb-3", children: c.title }), c.subtitle && _jsx("p", { className: "text-base opacity-85 mb-6", children: c.subtitle }), c.buttonText && _jsx("a", { href: c.buttonHref || c.ctaHref, className: "inline-block px-8 py-3 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 transition-opacity no-underline", children: c.buttonText || c.ctaText })] }) }));
}
export function BookingEmbedSection({ pageContent, data }) {
    const d = data || pageContent || {};
    if (!d.title)
        return null;
    return (_jsx("section", { className: "py-24 bg-surface-alt", children: _jsxs("div", { className: "max-w-[800px] mx-auto text-center px-4", children: [_jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-3", children: d.title }), d.subtitle && _jsx("p", { className: "text-text-muted mb-8", children: d.subtitle }), d.features?.length && _jsx("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 mb-8", children: d.features.map((f, i) => _jsx("div", { className: "p-4 bg-white rounded-lg shadow-sm", children: _jsx("p", { className: "text-primary font-semibold text-sm", children: f }) }, i)) }), _jsx("a", { href: d.bookingUrl || d.ctaHref || 'https://wa.me/595982515138?text=Quiero%20agendar%20una%20consulta', className: "inline-block px-10 py-4 rounded-full font-bold text-base no-underline hover:opacity-90 bg-whatsapp text-white", children: d.ctaText || d.ctaLabel || 'Agendar consulta gratuita' }), d.calendarNote && _jsx("p", { className: "mt-3 text-xs text-text-muted italic", children: d.calendarNote })] }) }));
}
export function ContactDetailsSection({ pageContent, data, locale }) {
    const d = data || pageContent || {};
    if (!d.whatsapp && !d.email)
        return null;
    const localeHoursKeys = {
        es: ['Lun–Vie', 'Sáb', 'Dom'],
        en: ['Mon–Fri', 'Sat', 'Sun'],
        nl: ['Ma–Vr', 'Za', 'Zo'],
        de: ['Mo–Fr', 'Sa', 'So'],
    };
    const hoursKeys = localeHoursKeys[locale || 'es'] || localeHoursKeys.es;
    const hours = d.hours && typeof d.hours === 'object'
        ? hoursKeys.map(k => d.hours[k]).filter(Boolean).join(' · ')
        : (typeof d.hours === 'string' ? d.hours : '');
    return (_jsx("section", { className: "py-24", children: _jsxs("div", { className: "max-w-[600px] mx-auto text-center px-4", children: [d.title && _jsx("h2", { className: "text-[clamp(1.3rem,2.5vw,1.8rem)] font-bold text-primary mb-6", children: d.title }), _jsxs("div", { className: "flex flex-col gap-4", children: [d.whatsapp && _jsxs("a", { href: `https://wa.me/${d.whatsapp.replace(/[^0-9]/g, '')}`, target: "_blank", className: "flex items-center justify-center gap-3 p-4 rounded-lg no-underline font-semibold text-white bg-whatsapp", children: [_jsx("span", { className: "w-7 h-7 flex items-center justify-center bg-white/20 rounded-full text-xs", children: "WA" }), " ", d.whatsapp] }), d.email && _jsxs("a", { href: `mailto:${d.email}`, className: "flex items-center justify-center gap-3 p-4 rounded-lg bg-primary text-white no-underline font-semibold", children: [_jsx("span", { className: "w-7 h-7 flex items-center justify-center bg-white/15 rounded-full text-xs", children: "@" }), " ", d.email] }), d.address && _jsxs("p", { className: "text-text-muted text-sm flex items-center justify-center gap-2", children: [_jsx("span", { className: "text-accent font-bold", children: "\u2302" }), " ", d.address, d.neighborhood ? ', ' + d.neighborhood : ''] }), d.phone && !d.whatsapp && _jsxs("p", { className: "text-text-muted text-sm", children: [_jsx("span", { className: "text-accent", children: "\u2706" }), " ", d.phone] }), hours && _jsxs("p", { className: "text-text-muted text-xs", children: [_jsx("span", { className: "text-accent", children: "\u25F7" }), " ", hours] })] })] }) }));
}
export function NewsletterSection({ pageContent, data }) {
    const d = data || pageContent || {};
    if (!d.title)
        return null;
    return (_jsx("section", { className: "py-12 px-4 bg-primary text-white", children: _jsxs("div", { className: "max-w-[600px] mx-auto text-center", children: [_jsx("h3", { className: "text-lg font-bold mb-2", children: d.title }), d.description && _jsx("p", { className: "text-sm text-white/80 mb-6", children: d.description }), _jsxs("div", { className: "flex gap-2 flex-wrap justify-center", children: [_jsx("input", { type: "email", placeholder: d.placeholder || "tu@email.com", className: "px-4 py-3 rounded-full border-none flex-1 min-w-[200px] text-sm" }), _jsx("button", { className: "px-6 py-3 bg-accent text-primary rounded-full border-none font-bold cursor-pointer text-sm hover:opacity-90", children: d.buttonText || "Suscribirme" })] })] }) }));
}
//# sourceMappingURL=cta-and-contact.js.map