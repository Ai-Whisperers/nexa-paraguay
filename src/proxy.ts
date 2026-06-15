import { NextRequest, NextResponse } from 'next/server'
import { LOCALES, DEFAULT_LOCALE, isValidLocale } from '@/lib/locales'

const STATIC_PREFIXES = [
  '/_next',
  '/api',
  '/images',
  '/favicon',
  '/manifest',
  '/robots',
  '/sitemap',
  '/og',
]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip non-page routes (assets, api, _next internals)
  if (STATIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // First path segment
  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]?.toLowerCase()

  // Root or non-locale-prefixed: redirect to default locale
  // Examples handled:
  //   /            -> /nl
  //   /contacto    -> /es/contacto  (heuristic: if first segment matches a known
  //                                   Spanish page, prepend /es; otherwise use default)
  //   /faq         -> /nl/faq
  if (!first || !isValidLocale(first)) {
    let detectedLocale = DEFAULT_LOCALE
    if (first) {
      // Honor explicit Accept-Language only if user has no LOCALE cookie
      const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
      if (cookieLocale && isValidLocale(cookieLocale)) {
        detectedLocale = cookieLocale
      } else {
        const accept = request.headers.get('accept-language') || ''
        const preferred = accept
          .split(',')
          .map((lang) => lang.split(';')[0].trim().toLowerCase().slice(0, 2))
          .find((lang) => isValidLocale(lang))
        if (preferred) detectedLocale = preferred
      }
    }

    const url = request.nextUrl.clone()
    url.pathname = `/${detectedLocale}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url, 307)
  }

  return NextResponse.next()
}

export const config = {
  // Run on everything except Next.js internals and asset files
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
