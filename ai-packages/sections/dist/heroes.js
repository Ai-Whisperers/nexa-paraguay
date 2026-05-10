'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { resolveImage } from './resolve-content';
export function HeroSection({ pageContent, images }) {
    const c = pageContent.hero || pageContent || {};
    const bgImage = resolveImage(images, c.backgroundImage);
    return (_jsx("section", { className: `px-4 text-center relative flex items-center justify-center ${bgImage ? 'bg-cover bg-center' : ''}`, style: bgImage ? {
            padding: '4rem 1rem',
            minHeight: 'clamp(350px,50vh,550px)',
            background: `linear-gradient(135deg, rgba(27,42,74,0.85), rgba(27,42,74,0.65)), url(${bgImage})`,
            backgroundSize: 'cover', backgroundPosition: 'center'
        } : {
            padding: '4rem 1rem',
            minHeight: 'clamp(350px,50vh,550px)',
            background: 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)',
        }, children: _jsxs("div", { className: "max-w-4xl mx-auto relative z-10 text-white", children: [_jsx("h1", { className: "text-[clamp(1.8rem,4vw,2.8rem)] font-playfair font-bold leading-tight mb-3", children: c.headline }), _jsx("div", { className: "w-[60px] h-[3px] bg-accent mx-auto mb-5" }), _jsx("p", { className: "text-lg opacity-90 leading-relaxed max-w-[600px] mx-auto mb-8", children: c.subheadline }), _jsxs("div", { className: "flex gap-4 justify-center flex-wrap", children: [c.ctaPrimaryText && _jsx("a", { href: c.ctaPrimaryHref, className: "px-8 py-3 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 transition-opacity no-underline", children: c.ctaPrimaryText }), c.ctaSecondaryText && _jsx("a", { href: c.ctaSecondaryHref, className: "px-8 py-3 border-2 border-accent text-white rounded-full font-semibold text-base opacity-90 hover:opacity-100 no-underline", children: c.ctaSecondaryText })] }), c.trustBadges && _jsx("div", { className: "flex gap-4 justify-center mt-8 flex-wrap", children: c.trustBadges.map((b, i) => (_jsx("span", { className: "px-4 py-1.5 bg-black/30 rounded-full text-sm", children: b }, i))) })] }) }));
}
export function PageHeroSection({ pageContent, data, images }) {
    const d = data || pageContent || {};
    const headline = d.headline || d.title;
    if (!headline)
        return null;
    const bgImage = d.backgroundImage ? resolveImage(images, d.backgroundImage) : '';
    return (_jsx("section", { className: `py-20 text-center text-white bg-cover bg-center`, style: { background: bgImage ? `linear-gradient(135deg, rgba(27,42,74,0.85), rgba(27,42,74,0.65)), url(${bgImage})` : 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)' }, children: _jsxs("div", { className: "max-w-[700px] mx-auto px-4", children: [_jsx("h1", { className: "text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold leading-tight mb-3", children: headline }), (d.subheadline || d.subtitle) && _jsx("p", { className: "text-base text-white/85 leading-relaxed", children: d.subheadline || d.subtitle })] }) }));
}
//# sourceMappingURL=heroes.js.map