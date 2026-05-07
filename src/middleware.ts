import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['es', 'en', 'nl', 'de']
const DEFAULT_LOCALE = 'es'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const start = Date.now()

  // Redirect favicon.ico to favicon.svg
  if (pathname === '/favicon.ico') {
    return NextResponse.redirect(new URL('/favicon.svg', request.url), 308)
  }

  // Check if path already has a locale prefix
  const firstSegment = pathname.split('/')[1]
  const hasLocale = LOCALES.includes(firstSegment)

  if (!hasLocale && !pathname.startsWith('/_next') && !pathname.startsWith('/images') && pathname !== '/favicon.svg') {
    // Detect preferred locale from cookie, then Accept-Language
    let preferred = request.cookies.get('locale')?.value || DEFAULT_LOCALE
    if (!LOCALES.includes(preferred)) {
      const acceptLang = request.headers.get('accept-language') || ''
      for (const loc of LOCALES) {
        if (acceptLang.startsWith(loc) || acceptLang.includes(` ${loc}`) || acceptLang.includes(`;${loc}`)) {
          preferred = loc
          break
        }
      }
    }
    const url = new URL(`/${preferred}${pathname}`, request.url)
    if (request.nextUrl.search) url.search = request.nextUrl.search
    return NextResponse.redirect(url, 302)
  }

  const result = NextResponse.next()
  const now = Date.now()
  if (!pathname.startsWith('/_next') && !pathname.startsWith('/images')) {
    console.log(`[nexa] ${request.method} ${pathname} ${now - start}ms`)
  }
  return result
}

export const config = {
  matcher: ['/((?!_next|images|favicon\\.svg).*)'],
}
