import './globals.css'
import type { Metadata } from 'next'
import { CookieBanner } from '../components/CookieBanner'
import ExitPopupWrapper from '../components/ExitPopupWrapper'
export const metadata: Metadata = {
  title: 'Nexa Paraguay',
  metadataBase: new URL('https://nexaparaguay.com'),
  icons: { icon: '/images/brand/favicon.webp' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-inter bg-background text-text">
        <CookieBanner />
        <ExitPopupWrapper />
        {children}
      </body>
    </html>
  )
}
