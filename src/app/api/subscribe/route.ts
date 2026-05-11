import { NextRequest, NextResponse } from 'next/server'

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY || ''
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID || 'audience-paragu-ai-newsletter'
const MAILCHIMP_DC = MAILCHIMP_API_KEY.split('-').pop() || 'us21'
const MAILCHIMP_API_URL = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, locale } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    if (!MAILCHIMP_API_KEY) {
      console.warn('[Subscribe] MAILCHIMP_API_KEY not set — logging subscription')
      console.log('[Subscribe] Logged:', JSON.stringify({ email, name, locale }))
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
      console.log('[Subscribe] Mailchimp success:', email)
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
