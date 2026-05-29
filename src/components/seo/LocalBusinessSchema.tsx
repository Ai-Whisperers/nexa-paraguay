import { readFileSync } from 'fs'
import { join } from 'path'

function loadSiteConfig() {
  try {
    return JSON.parse(readFileSync(join(process.cwd(), 'site.json'), 'utf-8'))
  } catch {
    return {}
  }
}

export function LocalBusinessSchema({ locale = 'es' }: { locale?: string }) {
  const siteConfig = loadSiteConfig()
  const phone = siteConfig?.contact?.whatsapp || '595982515138'
  const email = siteConfig?.contact?.email || 'hola@nexaparaguay.com'
  const localeText = {
    es: { name: 'Nexa Paraguay', description: 'Asesoría profesional para radicación, banca y constitución de sociedad en Paraguay para ciudadanos europeos.', telephone: `+595 ${phone.slice(3,6)} ${phone.slice(6,9)}${phone.slice(9)}`, email },
    en: { name: 'Nexa Paraguay', description: 'Professional advisory for residency, banking and company incorporation in Paraguay for European citizens.', telephone: `+595 ${phone.slice(3,6)} ${phone.slice(6,9)}${phone.slice(9)}`, email },
    nl: { name: 'Nexa Paraguay', description: 'Professioneel advies voor vestiging, bankieren en bedrijfsoprichting in Paraguay voor Europese burgers.', telephone: `+595 ${phone.slice(3,6)} ${phone.slice(6,9)}${phone.slice(9)}`, email },
    de: { name: 'Nexa Paraguay', description: 'Professionelle Beratung für Aufenthalt, Bankgeschäfte und Firmengründung in Paraguay für europäische Bürger.', telephone: `+595 ${phone.slice(3,6)} ${phone.slice(6,9)}${phone.slice(9)}`, email },
  }
  const t = localeText[locale as keyof typeof localeText] || localeText.es

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: t.name,
    description: t.description,
    url: 'https://nexa.paragu-ai.com',
    telephone: t.telephone,
    email: t.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Santa Teresa 2456',
      addressLocality: 'Asunción',
      addressCountry: 'PY',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -25.2637,
      longitude: -57.5759,
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
    ],
    sameAs: [
      'https://www.instagram.com/nexaparaguay',
      'https://www.facebook.com/nexaparaguay',
      'https://www.linkedin.com/company/nexaparaguay',
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
