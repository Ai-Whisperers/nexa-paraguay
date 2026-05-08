import { NextRequest, NextResponse } from 'next/server'
export async function POST(request: NextRequest) {
  try { console.log('[Contact]', await request.json()); return NextResponse.json({ ok: true }) }
  catch (err) { return NextResponse.json({ error: String(err) }, { status: 500 }) }
}
