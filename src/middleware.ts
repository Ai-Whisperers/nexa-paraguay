import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE, resolveLocale } from '@ai-whisperers/i18n'
import { NextRequest, NextResponse } from 'next/server'

function getLocale(request: NextRequest): string {
  const pathname = request.nextUrl.pathname
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length > 0 && (LOCALES as readonly string[]).includes(segments[0])) return segments[0]
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookie && (LOCALES as readonly string[]).includes(cookie)) return cookie
  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/images') || pathname.startsWith('/fonts') || pathname === '/favicon.ico' || pathname.includes('.')) return NextResponse.next()
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length > 0 && (LOCALES as readonly string[]).includes(segments[0])) return NextResponse.next()
  const locale = getLocale(request)
  const url = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
  const res = NextResponse.redirect(url)
  res.cookies.set(LOCALE_COOKIE, locale, { maxAge: 60 * 60 * 24 * 365 })
  return res
}

export const config = { matcher: ['/((?!_next|api|images|fonts|favicon).*)'] }
