import { readFileSync } from 'fs'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale') || 'es'
  const key = request.nextUrl.searchParams.get('key') || ''

  try {
    const data = JSON.parse(readFileSync(join(process.cwd(), 'content', `${locale}.json`), 'utf-8'))
    const keys = key.split('.')
    let value: any = data
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) value = value[k]
      else return NextResponse.json(null)
    }
    return NextResponse.json(value)
  } catch {
    return NextResponse.json(null)
  }
}
