"use client";
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ChevronDown, Search, Phone, Mail, MapPin, Clock, ArrowRight, ExternalLink, CheckCircle } from "lucide-react";
import Link from "next/link";
import { resolveImage } from "./resolve-content";
// ═══════════════════════════════════════════════════════════════════════════════
// EXTRA SECTION COMPONENTS (16+ components)
// These are commonly needed but more niche than the core 11 above.
// ═══════════════════════════════════════════════════════════════════════════════
// ─── FaqSection ────────────────────────────────────────────────────────────────
export function FaqSection({ data, pageContent }) {
    const section = data || pageContent?.faq;
    if (!section)
        return _jsx(_Fragment, {});
    const faqs = section.faqs || section.items || [];
    if (!faqs.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-20 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white", children: section.headline })), _jsx("div", { className: "space-y-3", children: faqs.map((faq, i) => (_jsx(FaqItem, { question: faq.question, answer: faq.answer }, i))) })] }) }));
}
function FaqItem({ question, answer }) {
    const [open, setOpen] = useState(false);
    return (_jsxs("div", { className: "border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden", children: [_jsxs("button", { onClick: () => setOpen(!open), className: "w-full flex items-center justify-between px-6 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors", children: [_jsx("span", { className: "font-medium text-gray-900 dark:text-white pr-4", children: question }), _jsx(ChevronDown, { className: `w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}` })] }), open && (_jsx("div", { className: "px-6 pb-4 bg-gray-50 dark:bg-gray-800/50", children: _jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm leading-relaxed", children: answer }) }))] }));
}
// ─── FaqSearchSection ─────────────────────────────────────────────────────────
export function FaqSearchSection({ data, pageContent }) {
    const section = data || pageContent?.faq;
    if (!section)
        return _jsx(_Fragment, {});
    const faqs = section.faqs || section.items || [];
    const [search, setSearch] = useState("");
    const [openId, setOpenId] = useState(null);
    const filtered = faqs.filter((f) => !search || f.question?.toLowerCase().includes(search.toLowerCase()) || f.answer?.toLowerCase().includes(search.toLowerCase()));
    return (_jsx("section", { className: "py-20 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white", children: section.headline })), _jsxs("div", { className: "relative mb-8", children: [_jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }), _jsx("input", { type: "text", placeholder: section.searchPlaceholder || "Search...", value: search, onChange: (e) => { setSearch(e.target.value); setOpenId(null); }, className: "w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsx("div", { className: "space-y-2", children: filtered.map((faq, i) => (_jsxs("div", { className: "border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden", children: [_jsxs("button", { onClick: () => setOpenId(openId === i ? null : i), className: "w-full flex items-center justify-between px-6 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50", children: [_jsx("span", { className: "font-medium text-gray-900 dark:text-white", children: faq.question }), _jsx(ChevronDown, { className: `w-4 h-4 text-gray-400 transition-transform ${openId === i ? "rotate-180" : ""}` })] }), openId === i && (_jsx("div", { className: "px-6 pb-4 bg-gray-50 dark:bg-gray-800/50", children: _jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm", children: faq.answer }) }))] }, i))) })] }) }));
}
// ─── BlogSection ──────────────────────────────────────────────────────────────
export function BlogSection({ data, pageContent, locale }) {
    const section = data || pageContent?.blog;
    if (!section)
        return _jsx(_Fragment, {});
    const posts = section.posts || section.items || [];
    if (!posts.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-20 bg-gray-50 dark:bg-gray-800/50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white", children: section.headline }), section.viewAll && (_jsxs(Link, { href: section.viewAll.href || "/blog", className: "text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline", children: [section.viewAll.text, " ", _jsx(ArrowRight, { className: "w-3 h-3 inline" })] }))] })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: posts.slice(0, 6).map((post, i) => (_jsxs(Link, { href: post.href || `/blog/${post.slug}`, className: "group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all", children: [post.image && (_jsx("div", { className: "aspect-[16/9] bg-gray-100 dark:bg-gray-700 overflow-hidden", children: _jsx("img", { src: typeof post.image === "string" ? post.image : post.image.src, alt: post.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" }) })), _jsxs("div", { className: "p-5", children: [post.category && _jsx("span", { className: "text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider", children: post.category }), _jsx("h3", { className: "mt-1 font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: post.title }), _jsx("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2", children: post.excerpt || post.description }), _jsxs("div", { className: "mt-3 flex items-center gap-3 text-xs text-gray-400", children: [post.date && _jsx("span", { children: post.date }), post.readTime && _jsxs("span", { children: ["\u00B7 ", post.readTime] })] })] })] }, i))) })] }) }));
}
// ─── TeamSection ──────────────────────────────────────────────────────────────
export function TeamSection({ data, pageContent, images }) {
    const section = data || pageContent?.team;
    if (!section)
        return _jsx(_Fragment, {});
    const members = section.members || section.items || [];
    if (!members.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-20 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white", children: section.headline }), section.subheadline && _jsx("p", { className: "mt-4 text-gray-500 dark:text-gray-400", children: section.subheadline })] })), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8", children: members.map((member, i) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 mx-auto overflow-hidden mb-4", children: member.image ? (_jsx("img", { src: typeof member.image === "string" ? member.image : member.image.src, alt: member.name, className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400", children: member.name?.charAt(0) || "?" })) }), _jsx("h3", { className: "font-semibold text-gray-900 dark:text-white", children: member.name }), member.role && _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: member.role })] }, i))) })] }) }));
}
// ─── StorySection ─────────────────────────────────────────────────────────────
export function StorySection({ data, pageContent }) {
    const section = data || pageContent?.story;
    if (!section)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-20 bg-gray-50 dark:bg-gray-800/50", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [section.image && (_jsx("div", { className: "rounded-2xl overflow-hidden", children: _jsx("img", { src: typeof section.image === "string" ? section.image : section.image.src, alt: section.headline || "", className: "w-full h-auto object-cover" }) })), _jsxs("div", { children: [section.headline && _jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white", children: section.headline }), section.text?.map((p, i) => (_jsx("p", { className: "mt-4 text-gray-600 dark:text-gray-300 leading-relaxed", children: p }, i))), section.cta && (_jsxs(Link, { href: section.cta.href || "#", className: "mt-6 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline", children: [section.cta.text, " ", _jsx(ArrowRight, { className: "w-4 h-4" })] }))] })] }) }) }));
}
// ─── PillarsSection ───────────────────────────────────────────────────────────
export function PillarsSection({ data, pageContent }) {
    const section = data || pageContent?.pillars;
    if (!section)
        return _jsx(_Fragment, {});
    const pillars = section.pillars || section.items || [];
    if (!pillars.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-20 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsx("div", { className: "text-center mb-12", children: _jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white", children: section.headline }) })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: pillars.map((pillar, i) => (_jsxs("div", { className: "relative p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700", children: [_jsx("div", { className: "text-4xl mb-4", children: pillar.icon || "✦" }), _jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white", children: pillar.title }), _jsx("p", { className: "mt-3 text-gray-500 dark:text-gray-400 text-sm leading-relaxed", children: pillar.description })] }, i))) })] }) }));
}
// ─── NewsletterSection ────────────────────────────────────────────────────────
export function NewsletterSection({ data, pageContent }) {
    const section = data || pageContent?.newsletter;
    if (!section)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-20 bg-gradient-to-r from-blue-600 to-blue-800", children: _jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx("h2", { className: "text-2xl font-bold text-white", children: section.headline || section.title }), section.description && _jsx("p", { className: "mt-4 text-blue-100", children: section.description }), _jsxs("form", { className: "mt-8 flex gap-3 max-w-md mx-auto", onSubmit: (e) => e.preventDefault(), children: [_jsx("input", { type: "email", placeholder: section.placeholder || "your@email.com", className: "flex-1 px-4 py-3 rounded-xl border-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50" }), _jsx("button", { type: "submit", className: "px-6 py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-all", children: section.buttonText || "Subscribe" })] })] }) }));
}
// ─── ContactDetailsSection ────────────────────────────────────────────────────
export function ContactDetailsSection({ data, pageContent }) {
    const section = data || pageContent?.contact;
    if (!section)
        return _jsx(_Fragment, {});
    const items = [
        { icon: Phone, label: "Phone", value: section.phone, href: section.phone ? `tel:${section.phone}` : undefined },
        { icon: Mail, label: "Email", value: section.email, href: section.email ? `mailto:${section.email}` : undefined },
        { icon: MapPin, label: "Address", value: section.address },
        { icon: Clock, label: "Hours", value: section.hours },
    ].filter((i) => i.value);
    return (_jsx("section", { className: "py-20 bg-gray-50 dark:bg-gray-800/50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white", children: section.headline })), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto", children: items.map((item, i) => {
                        const IconComp = item.icon;
                        return (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-100 dark:border-gray-700", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4", children: _jsx(IconComp, { className: "w-5 h-5 text-blue-600 dark:text-blue-400" }) }), _jsx("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: item.label }), item.href ? (_jsx("a", { href: item.href, className: "mt-1 text-sm text-blue-600 dark:text-blue-400 hover:underline block", children: item.value })) : (_jsx("div", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: item.value }))] }, i));
                    }) })] }) }));
}
// ─── GallerySection ───────────────────────────────────────────────────────────
export function GallerySection({ data, pageContent, images }) {
    const section = data || pageContent?.gallery;
    if (!section)
        return _jsx(_Fragment, {});
    const galleryItems = section.items || section.images || [];
    if (!galleryItems.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-20 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white", children: section.headline })), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: galleryItems.map((item, i) => {
                        const img = item.image ? resolveImage(item.image, images) : null;
                        const src = img?.src || item.src || item.image;
                        return (_jsx("div", { className: "aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800", children: src && _jsx("img", { src: src, alt: item.alt || item.title || "", className: "w-full h-full object-cover hover:scale-105 transition-transform duration-300" }) }, i));
                    }) })] }) }));
}
// ─── ComparisonSection ────────────────────────────────────────────────────────
export function ComparisonSection({ data, pageContent }) {
    const section = data || pageContent?.comparison;
    if (!section)
        return _jsx(_Fragment, {});
    const features = section.features || [];
    if (!features.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-20 bg-gray-50 dark:bg-gray-800/50", children: _jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && (_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white", children: section.headline })), section.subheadline && _jsx("p", { className: "text-center text-gray-500 dark:text-gray-400 mb-8", children: section.subheadline }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-200 dark:border-gray-700", children: [_jsx("th", { className: "text-left py-4 px-4 font-semibold text-gray-900 dark:text-white", children: section.ourLabel || "Us" }), _jsx("th", { className: "text-left py-4 px-4 font-semibold text-gray-500", children: section.otherLabel || "Others" })] }) }), _jsx("tbody", { children: features.map((f, i) => (_jsxs("tr", { className: "border-b border-gray-100 dark:border-gray-800", children: [_jsx("td", { className: "py-3 px-4 text-gray-900 dark:text-white", children: f.us || f.positive }), _jsx("td", { className: "py-3 px-4 text-gray-500", children: f.other || f.negative })] }, i))) })] }) })] }) }));
}
// ─── GlossarySection ──────────────────────────────────────────────────────────
export function GlossarySection({ data, pageContent }) {
    const section = data || pageContent?.glossary;
    if (!section)
        return _jsx(_Fragment, {});
    const terms = section.terms || section.items || [];
    if (!terms.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-20 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && _jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white", children: section.headline }), _jsx("dl", { className: "space-y-6", children: terms.map((term, i) => (_jsxs("div", { children: [_jsx("dt", { className: "font-semibold text-gray-900 dark:text-white", children: term.term }), _jsx("dd", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: term.definition })] }, i))) })] }) }));
}
// ─── PageHeroSection ──────────────────────────────────────────────────────────
export function PageHeroSection({ data, pageContent }) {
    const section = data || pageContent;
    if (!section)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-white", children: section.title || section.headline }), section.description && _jsx("p", { className: "mt-6 text-lg text-gray-300 max-w-2xl mx-auto", children: section.description })] }) }));
}
// ─── HighlightSection ─────────────────────────────────────────────────────────
export function HighlightSection({ data, pageContent }) {
    const section = data || pageContent?.highlight;
    if (!section)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-20 bg-blue-600", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx("p", { className: "text-xl sm:text-2xl font-semibold text-white leading-relaxed", children: section.quote || section.text }), section.author && (_jsxs("p", { className: "mt-6 text-blue-200 font-medium", children: ["\u2014 ", section.author] }))] }) }));
}
// ─── BookingEmbedSection ──────────────────────────────────────────────────────
export function BookingEmbedSection({ data, pageContent }) {
    const section = data || pageContent?.booking;
    if (!section?.calendlyUrl && !section?.url)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-20 bg-gray-50 dark:bg-gray-800/50", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && _jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white", children: section.headline }), _jsx("div", { className: "rounded-xl overflow-hidden shadow-lg", children: _jsx("iframe", { src: section.calendlyUrl || section.url, width: "100%", height: "700", frameBorder: "0", title: "Schedule a consultation" }) })] }) }));
}
// ─── CaseStudySection ─────────────────────────────────────────────────────────
export function CaseStudySection({ data, pageContent }) {
    const section = data || pageContent?.caseStudy;
    if (!section)
        return _jsx(_Fragment, {});
    const studies = section.studies || section.items || [];
    if (!studies.length)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-20 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white", children: section.headline }), section.subheadline && _jsx("p", { className: "mt-4 text-gray-500 dark:text-gray-400", children: section.subheadline })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: studies.map((study, i) => (_jsxs("div", { className: "rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 shadow-sm", children: [study.image && (_jsx("div", { className: "aspect-[16/9] bg-gray-100 dark:bg-gray-700", children: _jsx("img", { src: study.image.src || study.image, alt: study.title, className: "w-full h-full object-cover" }) })), _jsxs("div", { className: "p-6", children: [_jsx("span", { className: "text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase", children: study.category }), _jsx("h3", { className: "mt-1 text-lg font-semibold text-gray-900 dark:text-white", children: study.title }), _jsx("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: study.description }), study.results && (_jsx("div", { className: "mt-4 flex gap-4", children: study.results.map((r, j) => (_jsxs("div", { children: [_jsx("div", { className: "text-lg font-bold text-blue-600 dark:text-blue-400", children: r.metric }), _jsx("div", { className: "text-xs text-gray-500", children: r.label })] }, j))) })), study.cta && (_jsxs(Link, { href: study.cta.href || "#", className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline", children: [study.cta.text, " ", _jsx(ExternalLink, { className: "w-3 h-3" })] }))] })] }, i))) })] }) }));
}
// ─── ServiceDetailSection ─────────────────────────────────────────────────────
export function ServiceDetailSection({ data, pageContent }) {
    const section = data || pageContent;
    if (!section)
        return _jsx(_Fragment, {});
    return (_jsx("section", { className: "py-20 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.description && _jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300 leading-relaxed", children: section.description }), section.details && (_jsx("ul", { className: "mt-8 space-y-4", children: section.details.map((d, i) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" }), _jsx("span", { className: "text-gray-700 dark:text-gray-300", children: typeof d === "string" ? d : d.text })] }, i))) }))] }) }));
}
// ─── GenericSection (fallback for unknown section types) ─────────────────────
export function GenericSection({ data, pageContent }) {
    const section = data || pageContent;
    if (!section)
        return _jsx(_Fragment, {});
    const items = section.items || section.cards || section.features || [];
    const hasItems = Array.isArray(items) && items.length > 0;
    return (_jsx("section", { className: "py-12 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [section.headline && _jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-6", children: section.headline }), section.text && _jsx("p", { className: "text-gray-600 dark:text-gray-300", children: section.text }), hasItems && (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6", children: items.map((item, i) => (_jsxs("div", { className: "p-4 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50", children: [item.title && _jsx("h3", { className: "font-semibold text-gray-900 dark:text-white", children: item.title }), item.description && _jsx("p", { className: "mt-1 text-sm text-gray-500", children: item.description })] }, i))) }))] }) }));
}
// ─── PrivacyAccordion (for legal/privacy pages) ──────────────────────────────
export function PrivacyAccordion({ data, pageContent }) {
    const sections = data || pageContent?.sections || [];
    if (!sections.length && !data) {
        // Try to use pageContent directly if no sections key
        if (!pageContent)
            return _jsx(_Fragment, {});
        const content = pageContent;
        if (!content.title && !content.lastUpdated)
            return _jsx(_Fragment, {});
        return (_jsx("section", { className: "py-20 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [content.title && _jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: content.title }), content.lastUpdated && _jsxs("p", { className: "mt-2 text-sm text-gray-500", children: ["Last updated: ", content.lastUpdated] }), content.sections?.map((s, i) => (_jsxs("div", { className: "mt-8", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: s.title }), s.body?.map((p, j) => (_jsx("p", { className: "mt-2 text-gray-600 dark:text-gray-300", children: p }, j)))] }, i)))] }) }));
    }
    return (_jsx("section", { className: "py-20 bg-white dark:bg-gray-900", children: _jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-8", children: data?.headline || "Legal Information" }), _jsx("div", { className: "space-y-4", children: sections.map((sec, i) => (_jsxs("div", { className: "border border-gray-200 dark:border-gray-700 rounded-xl p-6", children: [_jsx("h3", { className: "font-semibold text-gray-900 dark:text-white", children: sec.title }), sec.body?.map((p, j) => (_jsx("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-300", children: p }, j)))] }, i))) })] }) }));
}
//# sourceMappingURL=sections-extra.js.map