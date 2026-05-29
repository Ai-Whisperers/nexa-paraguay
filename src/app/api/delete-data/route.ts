import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, reason } = body
    if (!email) return NextResponse.json({ error: 'email is required' }, { status: 400 })
    // Production logging stripped — use structured logging in production
    // In production: trigger deletion workflow, notify team, send confirmation email
    return NextResponse.json({ ok: true, message: `Deletion request received for ${email}. We will process within 30 days.` })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
