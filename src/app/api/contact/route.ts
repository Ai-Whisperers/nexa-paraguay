import { NextRequest, NextResponse } from 'next/server'

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 10
const ipBuckets = new Map<string, { count: number; resetAt: number }>()

function getRateLimitInfo(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const bucket = ipBuckets.get(ip)
  if (!bucket || now > bucket.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt: now + RATE_LIMIT_WINDOW_MS }
  }
  const allowed = bucket.count < RATE_LIMIT_MAX
  if (allowed) bucket.count++
  return { allowed, remaining: Math.max(0, RATE_LIMIT_MAX - bucket.count), resetAt: bucket.resetAt }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
    const { allowed, remaining, resetAt } = getRateLimitInfo(ip)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Try again later.', retryAfter: Math.ceil((resetAt - Date.now()) / 1000) },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)) } }
      )
    }
    const body = await request.json()
    console.log('[Contact]', JSON.stringify({ ip, ...body }))
    return NextResponse.json({ ok: true, remaining })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
