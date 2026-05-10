export interface NavItem {
    label: string;
    href: string;
}
export interface SiteInfo {
    name?: string;
    shortName?: string;
    businessName?: string;
    tagline?: string;
    description?: string;
    locale?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    address?: string;
    city?: string;
    country?: string;
    founded?: number | string;
    hours?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
    url?: string;
    memberships?: string[];
}
export interface Stat {
    value?: string;
    number?: string;
    label: string;
}
export interface HeroContent {
    title?: string;
    headline?: string;
    subtitle?: string;
    subheadline?: string;
    description?: string;
    cta?: string;
    ctaText?: string;
    ctaPrimaryText?: string;
    ctaLink?: string;
    ctaPrimaryHref?: string;
    secondaryCta?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    secondaryCtaHref?: string;
    backgroundImage?: string;
    cover?: string;
    stats?: Stat[];
    trustBadges?: string[];
}
export interface ValueItem {
    title?: string;
    desc?: string;
    description?: string;
    icon?: string;
}
export interface ProcessStep {
    step?: number | string;
    title: string;
    desc?: string;
    description?: string;
    icon?: string;
}
export interface ServiceItem {
    title: string;
    description?: string;
    desc?: string;
    icon?: string;
    price?: string;
    features?: string[];
}
export interface TeamMember {
    name: string;
    role?: string;
    photo?: string;
    bio?: string;
    linkedin?: string;
}
export interface Testimonial {
    name: string;
    role?: string;
    text: string;
    photo?: string;
    rating?: number;
}
export interface FaqItem {
    question: string;
    answer: string;
}
export interface GalleryItem {
    src?: string;
    image?: string;
    title?: string;
    description?: string;
    category?: string;
}
export interface CategoryItem {
    name: string;
    slug?: string;
    description?: string;
    emoji?: string;
    image?: string;
    count?: number;
}
export interface ProductItem {
    id?: string;
    name: string;
    price?: string;
    description?: string;
    image?: string;
    imageUrl?: string;
    category?: string;
    slug?: string;
    featured?: boolean;
    tags?: string[];
}
export interface ContentSection {
    title?: string;
    intro?: string;
    description?: string;
    story?: string;
    mission?: string;
    vision?: string;
    values?: ValueItem[];
    stats?: Stat[];
    team?: TeamMember[];
    image?: string;
    images?: string[];
}
export interface ContactPage {
    title?: string;
    subtitle?: string;
    cta?: string;
    whatsappMessage?: string;
    formFields?: {
        name: string;
        type: string;
        label: string;
        required?: boolean;
    }[];
}
export interface FooterContent {
    text?: string;
    copyright?: string;
    links?: NavItem[];
    showWhatsapp?: boolean;
    showSocial?: boolean;
}
export interface Navigation {
    businessName?: string;
    items: NavItem[];
    ctaText?: string;
    ctaHref?: string;
}
export interface SiteContent {
    _meta?: {
        translationQuality?: string;
        author?: string;
        lastReviewed?: string;
        version?: string;
    };
    site?: SiteInfo;
    siteName?: string;
    businessName?: string;
    tagline?: string;
    metaDescription?: string;
    placeholders?: Record<string, string>;
    navigation?: Navigation;
    nav?: Record<string, string>;
    hero?: HeroContent;
    about?: ContentSection;
    aboutPage?: ContentSection;
    services?: {
        title?: string;
        items: ServiceItem[];
    };
    process?: ProcessStep[];
    team?: TeamMember[];
    testimonials?: {
        title?: string;
        items: Testimonial[];
    };
    faq?: {
        title?: string;
        items: FaqItem[];
    };
    faqPage?: {
        title?: string;
        items: FaqItem[];
    };
    contact?: ContactPage;
    contactPage?: ContactPage;
    gallery?: {
        title?: string;
        items: GalleryItem[];
    };
    categories?: {
        title?: string;
        items: CategoryItem[];
    };
    products?: {
        title?: string;
        items: ProductItem[];
    };
    home?: {
        seo?: {
            title?: string;
            description?: string;
        };
        hero?: HeroContent;
        [key: string]: unknown;
    };
    footer?: FooterContent;
    [key: string]: unknown;
}
export declare function getSiteName(content: SiteContent): string;
export declare function getWhatsapp(content: SiteContent): string;
export declare function getWhatsappLink(content: SiteContent, message?: string): string;
export declare function getPhone(content: SiteContent): string;
export declare function getHeroTitle(content: SiteContent): string;
export declare function getMetaDescription(content: SiteContent): string;
//# sourceMappingURL=schema.d.ts.map