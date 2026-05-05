import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nexa Paraguay',
  description: 'Your Paraguay relocation, handled end-to-end. Residency, banking, real estate and settlement.',
  openGraph: {
    title: 'Nexa Paraguay',
    description: 'Your Paraguay relocation, handled end-to-end.',
    url: 'https://nexaparaguay.com',
    siteName: 'Nexa Paraguay',
    images: [{ url: '/images/brand/og-default.webp', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexa Paraguay',
    description: 'Your Paraguay relocation, handled end-to-end.',
    images: ['/images/brand/twitter-card.webp'],
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Nexa Paraguay',
      description: 'Relocation consultancy for Paraguay: residency, banking, real estate and settlement services.',
      url: 'https://nexaparaguay.com',
      telephone: '+595982515138',
      email: 'hola@nexaparaguay.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Asunción',
        addressRegion: 'Villa Morra',
        addressCountry: 'PY'
      },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '14:00' }
      ],
      sameAs: [
        'https://instagram.com/nexaparaguay',
        'https://www.linkedin.com/company/nexa-paraguay'
      ]
    })
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
