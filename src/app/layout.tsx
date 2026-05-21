import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CookieBanner } from '../components/CookieBanner'
import ExitPopupWrapper from '../components/ExitPopupWrapper'

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-XE49GLEP34'

export const metadata: Metadata = {
  title: {
    default: 'Nexa Paraguay — Desarrollo Web, Automatización e Inteligencia Artificial',
    template: '%s | Nexa Paraguay',
  },
  description: 'Desarrollo web, automatización de procesos e inteligencia artificial para empresas en Paraguay. Soluciones digitales que impulsan tu negocio.',
  metadataBase: new URL('https://nexaparaguay.com'),
  icons: { icon: '/images/brand/favicon.webp' },
  openGraph: {
    title: 'Nexa Paraguay',
    description: 'Desarrollo web, automatización e IA para empresas en Paraguay',
    url: 'https://nexaparaguay.com',
    siteName: 'Nexa Paraguay',
    locale: 'es_PY',
    type: 'website',
  },
  alternates: { canonical: 'https://nexaparaguay.com' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}', { cookie_flags: 'max-age=7200;secure;samesite=none' });`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Nexa Paraguay",
              description: "Desarrollo web, automatización e inteligencia artificial",
              url: "https://nexaparaguay.com",
              telephone: "+595 984 009751",
              email: "info@nexaparaguay.com",
              address: { "@type": "PostalAddress", addressLocality: "Asunción", addressCountry: "PY" },
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="font-inter bg-background text-text">
        <CookieBanner />
        <ExitPopupWrapper />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
