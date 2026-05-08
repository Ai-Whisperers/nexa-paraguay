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
        {/* Schema.org JSON-LD — Organization + FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "Nexa Paraguay",
                  "url": "https://nexa.paragu-ai.com",
                  "logo": "https://nexa.paragu-ai.com/favicon.svg",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+595-982-515-138",
                    "contactType": "customer service",
                    "email": "hola@nexaparaguay.com",
                    "availableLanguage": ["English","Spanish","Dutch","German"]
                  },
                  "address": { "@type": "PostalAddress", "addressLocality": "Asunción", "addressCountry": "PY" },
                  "sameAs": ["https://www.linkedin.com/company/nexa-paraguay","https://instagram.com/nexaparaguay"]
                },
                {
                  "@type": "WebSite",
                  "url": "https://nexa.paragu-ai.com",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://nexa.paragu-ai.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {"@type":"Question","name":"How long does Paraguay residency take?","acceptedAnswer":{"@type":"Answer","text":"8-12 weeks from document preparation to receiving your cédula."}},
                    {"@type":"Question","name":"Does Paraguay tax foreign income?","acceptedAnswer":{"@type":"Answer","text":"No. Paraguay has a territorial tax system. Foreign-source income is taxed at 0%."}},
                    {"@type":"Question","name":"What is the cost of Paraguay residency?","acceptedAnswer":{"@type":"Answer","text":"Nexa's programs start at USD 2,900 for the Base package including full residency processing."}},
                    {"@type":"Question","name":"How long to get Paraguayan citizenship?","acceptedAnswer":{"@type":"Answer","text":"Citizenship is available after 3 years of residency — one of the fastest in the western hemisphere."}},
                    {"@type":"Question","name":"Is there a minimum stay requirement?","acceptedAnswer":{"@type":"Answer","text":"No. For permanent residency, you only need to visit Paraguay once every 3 years."}},
                    {"@type":"Question","name":"Does Paraguay have a wealth tax?","acceptedAnswer":{"@type":"Answer","text":"No. Paraguay has no wealth tax, no inheritance tax, no CRS, and no capital gains tax on foreign assets."}},
                    {"@type":"Question","name":"How is Paraguay different from Portugal for residency?","acceptedAnswer":{"@type":"Answer","text":"Portugal's NHR regime ended. Foreign income is now taxed up to 48%, with 183 days/year required. Paraguay offers 0% foreign income tax with 1 visit every 3 years."}},
                    {"@type":"Question","name":"Is Paraguay safe?","acceptedAnswer":{"@type":"Answer","text":"Paraguay is the safest country in South America according to the Global Peace Index."}}
                  ]
                }
              ]
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
