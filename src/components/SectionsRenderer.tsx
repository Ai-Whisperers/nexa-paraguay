'use client'

import { Header } from './Header'
import { Footer } from './Footer'
import { resolveContent } from '@/lib/content-resolver'
import * as S from '@/sections'

const SECTION_MAP: Record<string, any> = {
  hero: S.HeroSection,
  'trust-signals': S.TrustSection,
  'why-destination': S.WhyCountrySection,
  services: S.ServicesSection,
  'process-timeline': S.ProcessSection,
  'cta-banner': S.CtaBanner,
  requirements: S.RequirementsSection,
  'booking-embed': S.BookingEmbedSection,
  contact: S.ContactDetailsSection,
  'contact-form': S.ContactDetailsSection,
  'contact-details': S.ContactDetailsSection,
  'booking-form': S.BookingFormSection,
  feedback: S.FeedbackSection,
  programs: S.ProgramsSection,
  features: S.FeaturesSection,
  stats: S.StatsSection,
  testimonials: S.TestimonialsSection,
  faq: S.FaqSection,
  faqSearch: S.FaqSearchSection,
  blog: S.BlogSection,
  team: S.TeamSection,
  story: S.StorySection,
  pillars: S.PillarsSection,
  'page-hero': S.PageHeroSection,
  highlights: S.HighlightSection,
  comparison: S.ComparisonSection,
  guides: S.GuidesSection,
  gallery: S.GallerySection,
  caseStudy: S.CaseStudySection,
  privacy: S.PrivacyAccordion,
  glossary: S.GlossarySection,
  newsletter: S.NewsletterSection,
  'press-releases': S.PressReleasesListSection,
  intakeWizard: S.IntakeWizardSection,
  'service-detail': S.ServiceDetailSection,
}

export default function SectionsRenderer({ content, pageConfig, images, locale }: any) {
  const sections = pageConfig?.sections || []
  return (
    <div className="font-inter text-text-primary">
      {content?.navigation && <Header navigation={content.navigation} locale={locale} />}
      <main>
        {sections.map((section: any, idx: number) => {
          if (section.enabledWhen && !resolveContent(content, section.enabledWhen)) return null
          const Comp = SECTION_MAP[section.id]
          if (Comp) {
            const sectionData = resolveContent(content, section.content || section.id)
            return <Comp key={section.id || idx} pageContent={sectionData || content} data={sectionData} images={images} locale={locale} />
          }
          const data = resolveContent(content, section.content || section.id)
          return data ? <S.GenericSection key={idx} data={data} /> : null
        })}
      </main>
      <Footer footer={content?.footer} />
    </div>
  )
}
