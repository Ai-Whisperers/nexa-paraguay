// ── Content Structure ──
export interface SiteContent {
  siteName?: string
  navigation?: Navigation
  footer?: Footer
  home?: PageSectionContent
  faqPage?: PageSectionContent
  blog?: { posts?: BlogPost[]; index?: SEOContent }
  privacyPage?: PageSectionContent
  aboutPage?: PageSectionContent
  servicesPage?: PageSectionContent
  processPage?: PageSectionContent
  programasPage?: PageSectionContent
  contactPage?: PageSectionContent
  whyCountryPage?: PageSectionContent
  qualityOfLifePage?: PageSectionContent
  comparisonPage?: PageSectionContent
  caseStudiesPage?: PageSectionContent
  founderPage?: PageSectionContent
  glossaryPage?: PageSectionContent
  resourcesPage?: PageSectionContent
  beneluxPage?: PageSectionContent
  intakeWizardPage?: PageSectionContent
  landingEmpresa?: PageSectionContent
  landingInversor?: PageSectionContent
  landingLifestyle?: PageSectionContent
  landingTrust?: PageSectionContent
  [key: string]: any
}

export interface PageSectionContent {
  seo?: SEOContent
  hero?: HeroContent
  footer?: Footer
  cta?: CtaContent
  full?: { items?: FaqItem[]; title?: string }
  body?: { items?: FaqItem[]; title?: string }
  trust?: { items?: TrustItem[]; title?: string; eyebrow?: string }
  differentiators?: { pillars?: PillarItem[]; title?: string; eyebrow?: string }
  process?: { steps?: ProcessStep[]; title?: string; eyebrow?: string; totalDuration?: string }
  programs?: { tiers?: ProgramTier[]; title?: string; subtitle?: string; eyebrow?: string }
  story?: { title?: string; eyebrow?: string; paragraphs?: string[] }
  team?: { title?: string; members?: TeamMember[] }
  wizard?: any
  highlights?: { items?: any[] }
  pillars?: { pillars?: PillarItem[]; title?: string }
  details?: { groups?: ServiceGroup[]; title?: string }
  gallery?: { images?: GalleryImage[]; title?: string; subtitle?: string }
  booking?: { title?: string; subtitle?: string; ctaText?: string; ctaHref?: string; features?: string[]; calendarNote?: string }
  contact?: { title?: string; whatsapp?: string; email?: string; phone?: string; address?: string; neighborhood?: string; hours?: string | Record<string, string> }
  newsletter?: { title?: string; description?: string; placeholder?: string; buttonText?: string }
  guides?: { title?: string; subtitle?: string; items?: GuideItem[] }
  matrix?: { title?: string; columns?: string[]; items?: any[] }
  comparison?: { title?: string; columns?: string[]; items?: any[] }
  [key: string]: any
}

export interface SEOContent {
  title?: string
  description?: string
}

export interface Navigation {
  businessName?: string
  navItems?: NavItem[]
  ctaText?: string
  ctaHref?: string
}

export interface NavItem {
  label?: string
  href?: string
  children?: NavItem[]
}

export interface Footer {
  businessName?: string
  columns?: FooterColumn[]
  whatsapp?: string
  email?: string
  copyright?: string
  socialLinks?: SocialLink[]
}

export interface FooterColumn {
  title?: string
  links?: { label?: string; href?: string }[]
}

export interface SocialLink {
  label?: string
  url?: string
}

// ── Section Data Shapes ──
export interface HeroContent {
  headline?: string
  subheadline?: string
  backgroundImage?: string
  backgroundImageMobile?: string
  ctaPrimaryText?: string
  ctaPrimaryHref?: string
  ctaSecondaryText?: string
  ctaSecondaryHref?: string
  trustBadges?: string[]
}

export interface StatItem {
  value?: string | number
  label?: string
}

export interface TrustItem {
  title?: string
  description?: string
  image?: string
}

export interface ProgramTier {
  name?: string
  description?: string
  price?: string
  priceNote?: string
  badge?: string
  highlighted?: boolean
  included?: string[]
  ctaLabel?: string
  ctaHref?: string
  image?: { $img?: string }
}

export interface ServiceGroup {
  title?: string
  subtitle?: string
  items?: ServiceItem[]
}

export interface ServiceItem {
  title?: string
  description?: string
}

export interface PillarItem {
  title?: string
  description?: string
  imageUrl?: string
  image?: string
  bullets?: string[]
}

export interface ProcessStep {
  number?: number | string
  title?: string
  description?: string
  duration?: string
  image?: { $img?: string }
}

export interface TestimonialItem {
  name?: string
  author?: string
  role?: string
  quote?: string
  rating?: number
  image?: string
}

export interface FaqItem {
  q?: string
  a?: string
  title?: string
  body?: string
  pregunta?: string
  respuesta?: string
  question?: string
  answer?: string
  description?: string
}

export interface BlogPost {
  slug?: string
  title?: string
  excerpt?: string
  date?: string
  author?: string
  image?: string
  coverImage?: string
  body?: string
  tags?: string[]
}

export interface TeamMember {
  name?: string
  role?: string
  description?: string
  memberImage?: string
  image?: string
  imageUrl?: string
  linkedin?: string
}

export interface GuideItem {
  title?: string
  description?: string
  fileUrl?: string
  ctaText?: string
}

export interface GalleryImage {
  src?: string
  imageUrl?: string
  alt?: string
  caption?: string
}

export interface CtaContent {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonHref?: string
  ctaText?: string
  ctaHref?: string
}

// ── Page Config ──
export interface PageConfig {
  slug?: string
  titleKey?: string
  descriptionKey?: string
  sections?: PageSection[]
  seoTitle?: string
  schemaType?: string
}

export interface PageSection {
  id: string
  variant?: string
  content?: string
  styling?: Record<string, string>
  enabledWhen?: string
}

// ── Image Manifest ──
export interface ImageManifest {
  basePath?: string
  images?: Record<string, any>
}

// ── Section Component ──
export interface SectionComponentProps {
  variant?: string
  pageContent: any
  data?: any
  images?: Record<string, any>
  [key: string]: any
}
