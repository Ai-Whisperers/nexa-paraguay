import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import ExitPopupWrapper from '../components/ExitPopupWrapper'
import { CookieBanner } from '../components/CookieBanner'
import { CookieConsent } from '../components/ui/CookieConsent'
import WhatsAppButton from '../../components/WhatsAppButton'
import { LocalBusinessSchema } from '../components/seo/LocalBusinessSchema'
import { OrganizationSchema } from '../components/seo/OrganizationSchema'
import { resolveLocale } from '@ai-whisperers/i18n'

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-XE49GLEP34'
const BASE_URL = 'https://nexa.paragu-ai.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Nexa Paraguay — Residency, Banking & Company for Europeans',
    template: '%s | Nexa Paraguay',
  },
  description:
    'Professional advisory for permanent residency, banking & company incorporation in Paraguay. Close guidance for citizens of the Netherlands, Belgium, Germany and all of Europe.',
  icons: { icon: '/images/brand/favicon.webp' },
  openGraph: {
    title: 'Nexa Paraguay — Residency, Banking & Company for Europeans',
    description:
      'Professional advisory for permanent residency, banking and company incorporation in Paraguay. Close guidance for European citizens.',
    url: BASE_URL,
    siteName: 'Nexa Paraguay',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/images/og-default.svg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      es: `${BASE_URL}/es`,
      en: `${BASE_URL}/en`,
      nl: `${BASE_URL}/nl`,
      de: `${BASE_URL}/de`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: { google: 'YOUR_GSC_VERIFICATION_CODE' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        {/* Organization schema — site-wide */}
        <OrganizationSchema />
        {/* LocalBusiness / ProfessionalService schema — site-wide */}
        <LocalBusinessSchema locale='es' />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy='afterInteractive'
        />
        <Script id='ga4-init' strategy='afterInteractive'>
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}', { cookie_flags: 'max-age=7200;secure;samesite=none' });`}
        </Script>
      </head>
      <body className='font-inter bg-background text-text'>
        <CookieBanner />
        <ExitPopupWrapper />
        {children}
        <WhatsAppButton phone="595982515138" />
        <CookieConsent />
      </body>
    </html>
  )
}