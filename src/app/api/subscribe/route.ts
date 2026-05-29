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

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY || ''
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID || 'audience-paragu-ai-newsletter'
const MAILCHIMP_DC = MAILCHIMP_API_KEY.split('-').pop() || 'us21'
const MAILCHIMP_API_URL = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`

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
    const { email, name, locale } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    if (!MAILCHIMP_API_KEY) {
      console.warn('[Subscribe] MAILCHIMP_API_KEY not set — logging subscription')
      return NextResponse.json({ ok: true, mailchimp: 'logged', note: 'API key not configured' })
    }

    const subscriberHash = Buffer.from(email.toLowerCase().trim()).toString('hex')

    const mailchimpPayload = {
      email_address: email,
      status: 'subscribed',
      status_if_new: 'subscribed',
      merge_fields: {
        FNAME: name || '',
        MMERGE3: locale || 'es',
      },
    }

    const response = await fetch(`${MAILCHIMP_API_URL}/${subscriberHash}`, {
      method: 'PUT',
      headers: {
        'Authorization': `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mailchimpPayload),
    })

    if (response.ok) {
      return NextResponse.json({ ok: true, mailchimp: 'subscribed' })
    }

    const errorText = await response.text()
    console.warn('[Subscribe] Mailchimp error:', response.status, errorText)

    // If already subscribed, that's fine
    if (response.status === 400 && errorText.includes('is already a list member')) {
      return NextResponse.json({ ok: true, mailchimp: 'already_subscribed' })
    }

    return NextResponse.json(
      { error: 'Mailchimp subscription failed', detail: errorText },
      { status: 500 }
    )
  } catch (err) {
    console.error('[Subscribe] Error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
