import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, locale, source } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // HubSpot Forms API
    const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID
    const HUBSPOT_FORM_GUID = process.env.HUBSPOT_FORM_GUID

    if (HUBSPOT_PORTAL_ID && HUBSPOT_FORM_GUID) {
      await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [
              { name: 'email', value: email },
              { name: 'locale', value: locale || 'es' },
              { name: 'source', value: source || 'exit-popup' },
            ],
            context: {
              pageUri: req.headers.get('referer') || 'https://nexa.paragu-ai.com',
              pageName: 'Exit Popup',
            },
          }),
        }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
