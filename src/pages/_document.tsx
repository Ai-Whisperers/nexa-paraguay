import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XE49GLEP34" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XE49GLEP34', {
                page_path: window.location.pathname
              });
            `
          }}
        />
        {/* Organization Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Nexa Paraguay",
              "url": "https://nexa.paragu-ai.com",
              "logo": "https://nexa.paragu-ai.com/favicon.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+595982515138",
                "contactType": "customer service",
                "availableLanguage": ["Spanish", "English", "Dutch", "German"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Asunción",
                "addressCountry": "PY"
              },
              "description": "Nexa Paraguay: servicios de mudanza y reubicación a Paraguay — residencia, banca, bienes raíces e instalación."
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
