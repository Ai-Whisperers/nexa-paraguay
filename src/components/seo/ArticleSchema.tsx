'use client'

interface ArticleData {
  title: string
  description: string
  slug: string
  author?: string
  datePublished?: string
  dateModified?: string
  image?: string
  locale?: string
}

export function ArticleSchema({ article }: { article: ArticleData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `https://nexa.paragu-ai.com/${article.locale || 'es'}/blog/${article.slug}`,
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Nexa Paraguay',
      url: 'https://nexa.paragu-ai.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nexa Paraguay',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nexa.paragu-ai.com/images/brand/logo.svg',
      },
    },
    ...(article.image && {
      image: {
        '@type': 'ImageObject',
        url: article.image,
      },
    }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nexa.paragu-ai.com/${article.locale || 'es'}/blog/${article.slug}`,
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
