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
