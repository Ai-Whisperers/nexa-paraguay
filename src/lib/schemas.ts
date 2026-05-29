interface FaqItem {
  q?: string
  pregunta?: string
  question?: string
  title?: string
  a?: string
  respuesta?: string
  answer?: string
  description?: string
  body?: string
}

export function generateBreadcrumbSchema(baseUrl: string, currentUrl: string, pageName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: baseUrl },
      { "@type": "ListItem", position: 2, name: pageName, item: currentUrl },
    ],
  }
}

export function generateFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => {
      const question = item.q || item.pregunta || item.question || item.title || ''
      const answer = item.a || item.respuesta || item.answer || item.description || item.body || ''
      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      }
    }),
  }
}

export function generateLocalBusinessSchema(locale = 'es') {
  const t: Record<string, {name:string; description: string; telephone: string}> = {
    es: { name: 'Nexa Paraguay', description: 'Asesoría profesional para radicación, banca y constitución de sociedad en Paraguay para ciudadanos europeos.', telephone: '+595 21 123 4567' },
    en: { name: 'Nexa Paraguay', description: 'Professional advisory for residency, banking and company incorporation in Paraguay for European citizens.', telephone: '+595 21 123 4567' },
    nl: { name: 'Nexa Paraguay', description: 'Professioneel advies voor vestiging, bankieren en bedrijfsoprichting in Paraguay voor Europese burgers.', telephone: '+595 21 123 4567' },
    de: { name: 'Nexa Paraguay', description: 'Professionelle Beratung für Aufenthalt, Bankgeschäfte und Firmengründung in Paraguay für europäische Bürger.', telephone: '+595 21 123 4567' },
  }
  const text = t[locale] || t.es
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: text.name,
    description: text.description,
    url: "https://nexa.paragu-ai.com",
    telephone: text.telephone,
    email: "hola@nexaparaguay.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Santa Teresa 2456",
      addressLocality: "Asunción",
      addressCountry: "PY",
    },
    geo: { "@type": "GeoCoordinates", latitude: -25.2637, longitude: -57.5759 },
    sameAs: [
      "https://www.instagram.com/nexaparaguay",
      "https://www.facebook.com/nexaparaguay",
      "https://www.linkedin.com/company/nexaparaguay",
    ],
  }
}

export function generateArticleSchema(article: {
  title: string; description: string; slug: string; author?: string;
  datePublished?: string; dateModified?: string; image?: string; locale?: string
}) {
  const loc = article.locale || 'es'
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `https://nexa.paragu-ai.com/${loc}/blog/${article.slug}`,
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || new Date().toISOString(),
    author: { "@type": "Organization", name: "Nexa Paraguay", url: "https://nexa.paragu-ai.com" },
    publisher: {
      "@type": "Organization",
      name: "Nexa Paraguay",
      logo: { "@type": "ImageObject", url: "https://nexa.paragu-ai.com/images/brand/logo.svg" },
    },
    ...(article.image && { image: { "@type": "ImageObject", url: article.image } }),
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://nexa.paragu-ai.com/${loc}/blog/${article.slug}` },
  }
}


export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nexa Paraguay",
    url: "https://nexa.paragu-ai.com",
    logo: "https://nexa.paragu-ai.com/images/brand/logo.svg",
    description: "Asesoría profesional para radicación, banca y constitución de sociedad en Paraguay para ciudadanos europeos.",
    email: "hola@nexaparaguay.com",
    telephone: "+595 21 123 4567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Santa Teresa 2456",
      addressLocality: "Asunción",
      addressCountry: "PY",
    },
    sameAs: [
      "https://www.instagram.com/nexaparaguay",
      "https://www.facebook.com/nexaparaguay",
      "https://www.linkedin.com/company/nexaparaguay",
    ],
    knowsAbout: [
      "residency Paraguay",
      "company incorporation Paraguay",
      "bank account opening Paraguay",
      "real estate Paraguay",
      "tax optimization Paraguay",
    ],
  }
}


export function generateWebPageSchema(pageName: string, description: string, locale = "es") {
  const loc_titles: Record<string, string> = {
    es: "Nexa Paraguay",
    en: "Nexa Paraguay",
    nl: "Nexa Paraguay",
    de: "Nexa Paraguay",
  }
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageName,
    description: description,
    url: `https://nexa.paragu-ai.com/${locale}`,
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", "@id": "https://nexa.paragu-ai.com" },
    publisher: { "@type": "Organization", name: loc_titles[locale] || "Nexa Paraguay", url: "https://nexa.paragu-ai.com" },
  }
}
