'use client'

import { Header } from './Header'
import { Footer } from './Footer'
import { createSectionsRenderer } from '@ai-whisperers/sections'
import { ProcessSection } from './ProcessSection'

const BaseRenderer = createSectionsRenderer(Header as any, Footer as any)

const OVERRIDES: Record<string, any> = {
  'process-timeline': ProcessSection,
  'process': ProcessSection,
}

export default function SectionsRenderer(props: any) {
  return <BaseRenderer {...props} sectionOverrides={OVERRIDES} />
}
