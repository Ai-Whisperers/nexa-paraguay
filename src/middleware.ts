import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const start = Date.now()

  // Redirect favicon.ico to favicon.svg
  if (pathname === '/favicon.ico') {
    console.log(`[nexa] redirect favicon.ico -> favicon.svg`)
    return NextResponse.redirect(new URL('/favicon.svg', request.url), 308)
  }

  const result = NextResponse.next()
  
  if (!pathname.startsWith('/_next') && !pathname.startsWith('/images')) {
    console.log(`[nexa] ${request.method} ${pathname} ${Date.now() - start}ms`)
  }
  
  return result
}

export const config = {
  matcher: ['/((?!_next|images|favicon\\.svg).*)'],
}
