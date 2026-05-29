export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nexa Paraguay",
    "url": "https://nexa-paraguay.paragu-ai.com",
    "description": "Acompañamiento de cerca para tu mudanza a Paraguay",
    "telephone": "595982515138",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Asuncion",
      "addressCountry": "PY"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
