// Canonical Content Schema v1 — covers all profesional-services & simple ecommerce sites
// All fields optional — each site uses what it needs
// Helpers
export function getSiteName(content) {
    return content.site?.name || content.siteName || content.businessName || content.site?.businessName || "";
}
export function getWhatsapp(content) {
    return content.site?.whatsapp || content.whatsapp || "";
}
export function getWhatsappLink(content, message) {
    const wa = getWhatsapp(content);
    if (!wa)
        return "#";
    const msg = message || `Hola!%20${encodeURIComponent(getSiteName(content))}`;
    return `https://wa.me/${wa}?text=${msg}`;
}
export function getPhone(content) {
    return content.site?.phone || content.phone || "";
}
export function getHeroTitle(content) {
    const hero = content.hero || content.home?.hero;
    if (!hero)
        return "";
    return hero.title || hero.headline || "";
}
export function getMetaDescription(content) {
    return content.metaDescription || content.site?.description || content.home?.seo?.description || "";
}
//# sourceMappingURL=schema.js.map