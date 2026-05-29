import { readFileSync } from 'fs'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, TENANT_SLUG } from '@/lib/supabase'

function pickFromObject(data: any, key: string) {
  if (!key) return data
  const keys = key.split('.')
  let value: any = data
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) value = value[k]
    else return null
  }
  return value
}

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale') || 'es'
  const key = request.nextUrl.searchParams.get('key') || ''

  try {
    const { data: row } = await supabaseAdmin
      .from('site_content')
      .select('content')
      .eq('tenant_slug', TENANT_SLUG)
      .eq('locale', locale)
      .eq('key_path', key)
      .maybeSingle()

    if (row?.content !== undefined) {
      return NextResponse.json(row.content)
    }

    const data = JSON.parse(readFileSync(join(process.cwd(), 'content', `${locale}.json`), 'utf-8'))
    return NextResponse.json(pickFromObject(data, key))
  } catch {
    return NextResponse.json(null)
  }
}
