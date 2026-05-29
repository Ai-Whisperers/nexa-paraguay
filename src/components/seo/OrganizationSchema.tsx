'use client'

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://nexa.paragu-ai.com/#organization',
    name: 'Nexa Paraguay',
    url: 'https://nexa.paragu-ai.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://nexa.paragu-ai.com/images/brand/logo.svg',
    },
    description:
      'Professional advisory for permanent residency, banking and company incorporation in Paraguay for European citizens.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+595-982-515138',
      email: 'hola@nexaparaguay.com',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English', 'Dutch', 'German'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Santa Teresa 2456',
      addressLocality: 'Asunción',
      addressCountry: 'PY',
      addressRegion: 'Central',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -25.2637,
      longitude: -57.5759,
    },
    sameAs: [
      'https://www.instagram.com/nexaparaguay',
      'https://www.facebook.com/nexaparaguay',
      'https://www.linkedin.com/company/nexaparaguay',
    ],
    areaServed: [
      { '@type': 'Country', name: 'Paraguay' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Country', name: 'Belgium' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Europe' },
    ],
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}