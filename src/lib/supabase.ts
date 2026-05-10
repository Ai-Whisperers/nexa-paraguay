import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Public client (anon key + RLS) — for client-side if needed
export const supabase = createClient(supabaseUrl, supabaseKey)

// Server-only client with service role — bypasses RLS
// Only import this from server components / API routes
export const supabaseAdmin = supabaseUrl && serviceKey
  ? createClient(supabaseUrl, serviceKey)
  : supabase

// Storage base URL for direct image URLs
export const STORAGE_BASE = supabaseUrl
  ? `${supabaseUrl}/storage/v1/object/public/nexa-images`
  : '/images'

export const TENANT_SLUG = 'nexa-paraguay'
