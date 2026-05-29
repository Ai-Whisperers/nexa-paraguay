import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

function sanitize(val: unknown): string {
  if (typeof val !== 'string') return ''
  return val.replace(/[<>]/g, '').trim().slice(0, 2000)
}

export async function POST(req: NextRequest) {
  const debug: Record<string, unknown> = { step: 'init', ts: new Date().toISOString() }

  try {
    const body = await req.json()
    debug.step = 'parsed-body'

    const fullName = sanitize(body?.fullName)
    const email = sanitize(body?.email)
    const phone = sanitize(body?.phone)
    const country = sanitize(body?.country)
    const nationality = sanitize(body?.nationality)
    const timeline = sanitize(body?.timeline)
    const program = sanitize(body?.program)
    const hearAbout = sanitize(body?.hearAbout)
    const notes = sanitize(body?.notes)
    const locale = sanitize(body?.locale || 'en').slice(0, 8)
    const goals = Array.isArray(body?.goals)
      ? body.goals.map((g: unknown) => sanitize(g)).filter(Boolean)
      : []

    if (!fullName || !email || goals.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: fullName, email, goals', debug: { ...debug, step: 'validation-failed' } },
        { status: 400 }
      )
    }

    const submission = {
      type: 'intake',
      fullName,
      email,
      phone: phone || null,
      country: country || null,
      nationality: nationality || null,
      goals,
      timeline: timeline || null,
      program: program || null,
      hearAbout: hearAbout || null,
      notes: notes || null,
      submittedAt: new Date().toISOString(),
      userAgent: req.headers.get('user-agent') || null,
      sourceUrl: req.headers.get('referer') || null,
    }

    debug.step = 'supabase-rpc'
    const { error } = await supabaseAdmin.rpc('insert_form_submission', {
      p_form_type: 'intake',
      p_payload: submission,
      p_locale: locale,
      p_source_url: submission.sourceUrl,
      p_user_agent: submission.userAgent,
      p_utm: {},
    })

    if (error) {
      console.error('[INTAKE ERROR][SUPABASE]', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to store submission',
        code: (error as any)?.code,
        details: (error as any)?.details,
        hint: (error as any)?.hint,
        debug: { ...debug, step: 'supabase-error' },
      }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err: any) {
    console.error('[INTAKE ERROR]', err)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        debug: {
          ...debug,
          step: 'uncaught-exception',
          errorName: err?.name,
          errorMessage: err?.message,
          errorCode: err?.code,
        },
      },
      { status: 500 }
    )
  }
}