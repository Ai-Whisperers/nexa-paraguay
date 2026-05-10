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
export function WhatsappFloatSection({ pageContent, data, images }) {
    const d = data || pageContent || {};
    const phone = d.whatsapp || d.phone || '';
    if (!phone)
        return null;
    const clean = phone.replace(/[^0-9]/g, '');
    return (_jsx("a", { href: `https://wa.me/${clean}`, target: "_blank", rel: "noopener noreferrer", className: "fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all no-underline", "aria-label": "Contactar por WhatsApp", children: _jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-7 h-7", children: _jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) }) }));
}
//# sourceMappingURL=cta-and-contact.js.map