import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

function validatePhone(phone: string): boolean {
  return !phone || /^[\d\s\+\-\(\)]{7,20}$/.test(phone)
}

function sanitize(val: unknown): string {
  if (typeof val !== 'string') return ''
  return val.replace(/[<>]/g, '').trim().slice(0, 2000)
}

async function submitHubspot(fields: { name: string; value: string }[], pageName: string, req: NextRequest) {
  const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID
  const HUBSPOT_CONTACT_FORM = process.env.HUBSPOT_CONTACT_FORM
  if (!HUBSPOT_PORTAL_ID || !HUBSPOT_CONTACT_FORM) return
  await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_CONTACT_FORM}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: req.headers.get('referer') || 'https://nexa.paragu-ai.com',
          pageName,
        },
      }),
    }
  )
}

function logLead(data: Record<string, string>) {
  try {
    const { appendFileSync, mkdirSync } = require('fs')
    const { join } = require('path')
    const dir = join(process.cwd(), '.leads')
    mkdirSync(dir, { recursive: true })
    const logPath = join(dir, `${new Date().toISOString().slice(0, 10)}.jsonl`)
    appendFileSync(logPath, JSON.stringify({ timestamp: new Date().toISOString(), ...data }) + '\n')
  } catch {}
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, program, message, locale, honeypot, type } = body

    // Honeypot — silent success for bots
    if (honeypot) return NextResponse.json({ success: true })

    // Exit popup: email only
    if (type === 'exit-popup') {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
      }
      await submitHubspot(
        [{ name: 'email', value: sanitize(email) }, { name: 'source', value: 'exit-popup' }],
        'Exit Popup', req
      )

      await supabaseAdmin.rpc('insert_form_submission', {
        p_form_type: 'exit-popup',
        p_payload: { email: sanitize(email), source: 'exit-popup' },
        p_locale: sanitize(locale) || 'es',
        p_source_url: req.headers.get('referer') || null,
        p_user_agent: req.headers.get('user-agent') || null,
        p_utm: {},
      })

      logLead({ email: sanitize(email), source: 'exit-popup', locale: sanitize(locale) || 'es' })
      return NextResponse.json({ success: true })
    }

    // Full contact form
    if (!name || typeof name !== 'string' || name.length < 2) {
      return NextResponse.json({ error: 'Name required' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }
    if (!validatePhone(sanitize(phone))) {
      return NextResponse.json({ error: 'Invalid phone' }, { status: 400 })
    }

    const firstName = sanitize(name).split(' ')[0]
    const lastName = sanitize(name).split(' ').slice(1).join(' ') || ''

    await submitHubspot([
      { name: 'firstname', value: firstName },
      { name: 'lastname', value: lastName },
      { name: 'email', value: sanitize(email) },
      { name: 'phone', value: sanitize(phone) },
      { name: 'program_interest', value: sanitize(program) },
      { name: 'message', value: sanitize(message) },
      { name: 'locale', value: sanitize(locale) || 'es' },
    ], 'Contact Form', req)

    await supabaseAdmin.rpc('insert_form_submission', {
      p_form_type: sanitize(type) || 'contact',
      p_payload: {
        name: sanitize(name),
        email: sanitize(email),
        phone: sanitize(phone),
        program: sanitize(program),
        message: sanitize(message),
      },
      p_locale: sanitize(locale) || 'es',
      p_source_url: req.headers.get('referer') || null,
      p_user_agent: req.headers.get('user-agent') || null,
      p_utm: {},
    })

    logLead({
      name: sanitize(name), email: sanitize(email), phone: sanitize(phone),
      program: sanitize(program), locale: sanitize(locale), source: 'contact-form',
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
