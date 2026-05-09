'use client'

import { Header } from './Header'
import { Footer } from './Footer'
import { createSectionsRenderer } from '@ai-whisperers/sections'

const SectionsRenderer = createSectionsRenderer(
  Header as any,
  Footer as any
)

export default SectionsRenderer
