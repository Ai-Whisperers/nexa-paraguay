'use client'

import { Header } from './Header'
import { Footer } from './Footer'
import { createSectionsRenderer } from '@ai-whisperers/sections'
import { ProcessSection } from './ProcessSection'
import { TeamSection } from './TeamSection'
import { StorySection } from './StorySection'
import { PageHeroSection } from './PageHeroSection'
import { CtaBanner } from './CtaBanner'
import { BookingEmbedSection } from './BookingEmbedSection'
import { BlogSection } from './BlogSection'
import { FaqSection } from './FaqSection'
import { ContactDetailsSection } from './ContactDetailsSection'
import { ComplianceSection } from './ComplianceSection'

const BaseRenderer = createSectionsRenderer(Header as any, Footer as any)

const OVERRIDES: Record<string, any> = {
  'process-timeline': ProcessSection,
  'process': ProcessSection,
  'team': TeamSection,
  'story': StorySection,
  'page-hero': PageHeroSection,
  'hero': PageHeroSection,
  'cta-banner': CtaBanner,
  'cta': CtaBanner,
  'booking-embed': BookingEmbedSection,
  'blog': BlogSection,
  'blog-index': BlogSection,
  'faq': FaqSection,
  'contact': ContactDetailsSection,
  'contact-details': ContactDetailsSection,
  'compliance': ComplianceSection,
  'compliance-disclaimer': ComplianceSection,
}

export default function SectionsRenderer(props: any) {
  return <BaseRenderer {...props} sectionOverrides={OVERRIDES} />
}
