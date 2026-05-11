import { NextRequest, NextResponse } from 'next/server'

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 10
const ipBuckets = new Map<string, { count: number; resetAt: number }>()

const HUBSPOT_PORTAL_ID = process.env.CRM_PORTAL_ID || 'HS-PORTAL-PARAGUAI'
const HUBSPOT_FORM_ID = process.env.CRM_ENDPOINT || 'contact-form-paragu-ai'
const HUBSPOT_API_URL = `https://api.hsforms.com/submissions/v3/integration/secure/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`

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
    const { name, email, phone, message, program } = body

    // Send to HubSpot
    const hubspotPayload = {
      fields: [
        { name: 'firstname', value: name || '' },
        { name: 'email', value: email || '' },
        { name: 'phone', value: phone || '' },
        { name: 'message', value: message || '' },
        { name: 'program', value: program || '' },
      ],
      context: {
        ipAddress: ip,
        pageUri: request.headers.get('referer') || 'https://nexa.paragu-ai.com',
        pageName: 'Contact Form',
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: 'I agree to be contacted',
          communications: [
            {
              value: true,
              subscriptionTypeId: 999,
              text: 'I agree to receive communications',
            },
          ],
        },
      },
    }

    try {
      const hsResponse = await fetch(HUBSPOT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hubspotPayload),
      })

      if (hsResponse.ok) {
        console.log('[Contact] HubSpot success:', email)
        return NextResponse.json({ ok: true, remaining, hubspot: 'submitted' })
      } else {
        const hsError = await hsResponse.text()
        console.warn('[Contact] HubSpot API error:', hsResponse.status, hsError)
        // Fallback: log it so we don't lose it
        console.log('[Contact] Fallback log:', JSON.stringify({ ip, name, email, phone, message, program }))
        return NextResponse.json({ ok: true, remaining, hubspot: 'logged', note: 'HubSpot submission logged (check portal config)' })
      }
    } catch (hubspotErr) {
      // HubSpot unreachable — log and return ok (don't break the form)
      console.warn('[Contact] HubSpot unreachable:', String(hubspotErr))
      console.log('[Contact] Fallback log:', JSON.stringify({ ip, name, email, phone, message, program }))
      return NextResponse.json({ ok: true, remaining, hubspot: 'logged' })
    }
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
