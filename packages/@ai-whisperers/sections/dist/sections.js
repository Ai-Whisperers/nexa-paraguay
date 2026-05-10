"use client";
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight, Sparkles, Shield, CheckCircle, Star, ChevronRight, ArrowUpRight, Users, Building2 } from "lucide-react";
import Link from "next/link";
import { resolveImage } from "./resolve-content";
// ═══════════════════════════════════════════════════════════════════════════════
// REUSABLE SECTION COMPONENTS
// Each component receives SectionComponentProps and renders from JSON content.
// No client-specific business logic. Data-driven and fully configurable.
// ═══════════════════════════════════════════════════════════════════════════════
// ─── HeroSection ──────────────────────────────────────────────────────────────
export function HeroSection({ data, pageContent, images }) {
    const hero = data || pageContent;
    if (!hero)
        return _jsx(_Fragment, {});
    const headline = hero.headline || "";
    const subheadline = hero.subheadline || "";
    const primaryCta = hero.primaryCta || { text: "Get Started", href: "#" };
    const secondaryCta = hero.secondaryCta;
    const heroImage = hero.image ? resolveImage(hero.image, images) : null;
    return (_jsxs("section", { className: "relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900", children: [heroImage && (_jsx("div", { className: "absolute inset-0 opacity-20", children: _jsx("img", { src: heroImage.src, alt: heroImage.alt || "", className: "w-full h-full object-cover" }) })), _jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20", children: _jsxs("div", { className: "max-w-3xl", children: [hero.badge && (_jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/90 backdrop-blur-sm mb-6", children: [_jsx(Sparkles, { className: "w-4 h-4" }), hero.badge] })), _jsx("h1", { className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight", children: headline }), subheadline && (_jsx("p", { className: "mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed", children: subheadline })), _jsxs("div", { className: "mt-10 flex flex-wrap gap-4", children: [_jsxs(Link, { href: primaryCta.href, className: "inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl", children: [primaryCta.text, _jsx(ArrowRight, { className: "w-5 h-5" })] }), secondaryCta && (_jsx(Link, { href: secondaryCta.href, className: "inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all", children: secondaryCta.text }))] })] }) })] }));
}
// ─── StatsSection ─────────────────────────────────────────────────────────────
export function StatsSection({ data }) {
    const stats = Array.isArray(data) ? data : data?.stats || [];
    if (!stats.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-16 bg-white dark:bg-gray-900", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8", children: stats.map((stat, i) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white", children: stat.value }), _jsx("div", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: stat.label })] }, i))) }) }) }));
}
// ─── TrustSection ─────────────────────────────────────────────────────────────
export function TrustSection({ data, pageContent }) {
    const trust = data || pageContent?.trust;
    if (!trust)
        return _jsx(_Fragment, {});
    const items = trust.items || [];
    return (_jsx("section", { className: "py-16 bg-gray-50 dark:bg-gray-800/50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [trust.headline && (_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white", children: trust.headline })), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8", children: items.map((item, i) => (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700", children: [_jsxs("div", { className: "w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4", children: [item.icon === "shield" && _jsx(Shield, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" }), item.icon === "check" && _jsx(CheckCircle, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" }), item.icon === "star" && _jsx(Star, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" }), item.icon === "users" && _jsx(Users, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" }), !item.icon && _jsx(CheckCircle, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" })] }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: item.title }), _jsx("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: item.description })] }, i))) })] }) }));
}
// ─── ProgramsSection ──────────────────────────────────────────────────────────
export function ProgramsSection({ data, pageContent }) {
    const section = data || pageContent?.programs;
    if (!section)
        return _jsx(_Fragment, {});
    const programs = section.programs || section.items || [];
    if (!programs.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-16 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white", children: section.headline }), section.subheadline && _jsx("p", { className: "mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto", children: section.subheadline })] })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: programs.map((program, i) => (_jsxs("div", { className: `group relative rounded-2xl p-8 transition-all border ${program.featured
                            ? "bg-blue-600 text-white border-blue-500 shadow-xl"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg"}`, children: [program.featured && (_jsx("span", { className: "absolute -top-3 right-6 px-4 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-gray-900", children: "Popular" })), program.icon && _jsx("div", { className: "text-3xl mb-4", children: program.icon }), _jsx("h3", { className: `text-xl font-bold ${program.featured ? "text-white" : "text-gray-900 dark:text-white"}`, children: program.title }), program.price && (_jsx("p", { className: `mt-2 text-sm ${program.featured ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`, children: program.price })), _jsx("ul", { className: "mt-6 space-y-3", children: (program.benefits || program.features || []).map((b, j) => (_jsxs("li", { className: "flex items-start gap-2 text-sm", children: [_jsx(CheckCircle, { className: `w-4 h-4 mt-0.5 ${program.featured ? "text-white" : "text-blue-600 dark:text-blue-400"}` }), _jsx("span", { className: program.featured ? "text-white/90" : "text-gray-600 dark:text-gray-300", children: b })] }, j))) }), program.cta && (_jsxs(Link, { href: program.cta.href || "#", className: `mt-8 inline-flex items-center gap-2 text-sm font-semibold ${program.featured ? "text-white" : "text-blue-600 dark:text-blue-400"}`, children: [program.cta.text, " ", _jsx(ArrowUpRight, { className: "w-4 h-4" })] }))] }, i))) })] }) }));
}
// ─── ServicesSection ──────────────────────────────────────────────────────────
export function ServicesSection({ data, pageContent }) {
    const section = data || pageContent?.services;
    if (!section)
        return _jsx(_Fragment, {});
    const services = section.services || section.items || [];
    if (!services.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-16 bg-gray-50 dark:bg-gray-800/50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white", children: section.headline }), section.subheadline && _jsx("p", { className: "mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto", children: section.subheadline })] })), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: services.map((service, i) => (_jsxs("div", { className: "group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all", children: [_jsx("div", { className: "w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", children: _jsx(Building2, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" }) }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: service.title }), _jsx("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: service.description }), service.cta && (_jsxs(Link, { href: service.cta.href || "#", className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline", children: [service.cta.text, " ", _jsx(ChevronRight, { className: "w-3 h-3" })] }))] }, i))) })] }) }));
}
// ─── WhyCountrySection ────────────────────────────────────────────────────────
export function WhyCountrySection({ data, pageContent }) {
    const section = data || pageContent?.whyParaguay || pageContent?.whyCountry;
    if (!section)
        return _jsx(_Fragment, {});
    const reasons = section.reasons || section.items || [];
    if (!reasons.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-16 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white", children: section.headline }), section.subheadline && _jsx("p", { className: "mt-4 text-gray-500 dark:text-gray-400", children: section.subheadline })] })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: reasons.map((reason, i) => (_jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: "flex-shrink-0 w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center", children: _jsx("span", { className: "text-green-600 dark:text-green-400 font-bold", children: String(i + 1).padStart(2, "0") }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900 dark:text-white", children: reason.title }), _jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: reason.description })] })] }, i))) })] }) }));
}
// ─── FeaturesSection ──────────────────────────────────────────────────────────
export function FeaturesSection({ data, pageContent }) {
    const section = data || pageContent?.features;
    if (!section)
        return _jsx(_Fragment, {});
    const features = section.features || section.items || [];
    if (!features.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-16 bg-gray-50 dark:bg-gray-800/50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white", children: section.headline }), section.subheadline && _jsx("p", { className: "mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto", children: section.subheadline })] })), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: features.map((feature, i) => (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700", children: [feature.icon && _jsx("div", { className: "text-2xl mb-3", children: feature.icon }), _jsx("h3", { className: "font-semibold text-gray-900 dark:text-white", children: feature.title }), _jsx("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: feature.description })] }, i))) })] }) }));
}
// ─── ProcessSection ───────────────────────────────────────────────────────────
export function ProcessSection({ data, pageContent }) {
    const section = data || pageContent?.process;
    if (!section)
        return _jsx(_Fragment, {});
    const steps = section.steps || section.items || [];
    if (!steps.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-16 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white", children: section.headline }), section.subheadline && _jsx("p", { className: "mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto", children: section.subheadline })] })), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-1/2" }), _jsx("div", { className: "space-y-12", children: steps.map((step, i) => (_jsxs("div", { className: `relative flex flex-col lg:flex-row items-center gap-8 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`, children: [_jsx("div", { className: "flex-1", children: _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700", children: [_jsx("span", { className: "inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold mb-3", children: i + 1 }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: step.title }), _jsx("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: step.description })] }) }), _jsx("div", { className: "hidden lg:flex w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 items-center justify-center z-10", children: _jsx("div", { className: "w-3 h-3 rounded-full bg-blue-600" }) }), _jsx("div", { className: "flex-1 lg:invisible" })] }, i))) })] })] }) }));
}
// ─── TestimonialsSection ──────────────────────────────────────────────────────
export function TestimonialsSection({ data, pageContent }) {
    const section = data || pageContent?.testimonials;
    if (!section)
        return _jsx(_Fragment, {});
    const testimonials = section.testimonials || section.items || [];
    if (!testimonials.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-16 bg-gray-50 dark:bg-gray-800/50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsx("div", { className: "text-center mb-12", children: _jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white", children: section.headline }) })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: testimonials.map((t, i) => (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700", children: [_jsx("div", { className: "flex gap-1 mb-4", children: Array.from({ length: 5 }).map((_, j) => (_jsx(Star, { className: `w-4 h-4 ${j < (t.rating || 5) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}` }, j))) }), _jsxs("p", { className: "text-gray-600 dark:text-gray-300 text-sm leading-relaxed", children: ["\u201C", t.quote, "\u201D"] }), _jsxs("div", { className: "mt-4 flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-gray-300", children: t.author?.charAt(0) || "?" }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: t.author }), t.role && _jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: t.role })] })] })] }, i))) })] }) }));
}
// ─── RequirementsSection ──────────────────────────────────────────────────────
export function RequirementsSection({ data, pageContent }) {
    const section = data || pageContent?.requirements;
    if (!section)
        return _jsx(_Fragment, {});
    const requirements = section.requirements || section.items || [];
    if (!requirements.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-16 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white", children: section.headline }), section.subheadline && _jsx("p", { className: "mt-4 text-gray-500 dark:text-gray-400", children: section.subheadline })] })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto", children: requirements.map((req, i) => (_jsxs("div", { className: "flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" }), _jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: req })] }, i))) })] }) }));
}
// ─── CtaBanner ────────────────────────────────────────────────────────────────
export function CtaBanner({ data, pageContent }) {
    const cta = data || pageContent?.cta;
    if (!cta)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-16 bg-gradient-to-r from-blue-600 to-blue-800", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-white", children: cta.headline || cta.title }), cta.description && _jsx("p", { className: "mt-4 text-blue-100 text-lg", children: cta.description }), cta.cta && (_jsxs(Link, { href: cta.cta.href || "#", className: "mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-all shadow-lg", children: [cta.cta.text, " ", _jsx(ArrowRight, { className: "w-5 h-5" })] }))] }) }));
}
//# sourceMappingURL=sections.js.map