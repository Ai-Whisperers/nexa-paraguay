// ── ISR Revalidation API Route ──
// Called by external webhook when content changes in the database
// POST /api/revalidate?secret=<key>&path=<path>

import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'nexa-isr-secret-dev'

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  const path = searchParams.get('path')

  if (!secret || secret !== REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  if (path) {
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, path, now: Date.now() })
  }

  // No specific path — revalidate all known paths
  const locales = ['nl', 'en', 'es', 'de']
  const pages = ['', '/sobre', '/servicios', '/por-que-paraguay', '/faq', '/blog', '/contacto', '/proceso']

  for (const locale of locales) {
    for (const page of pages) {
      revalidatePath(`/${locale}${page}`)
    }
  }

  return NextResponse.json({ revalidated: true, paths: locales.length * pages.length, now: Date.now() })
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  
  // Support GET for simple webhooks
  if (searchParams.get('secret')) {
    return POST(request)
  }

  return NextResponse.json({ error: 'Use POST with ?secret=key' }, { status: 400 })
}
