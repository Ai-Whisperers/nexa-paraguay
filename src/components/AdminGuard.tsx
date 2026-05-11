'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<'loading' | 'granted' | 'denied'>('loading')
  const router = useRouter()

  useEffect(() => {
    async function check() {
      try {
        const sb = createClient(supabaseUrl, supabaseAnonKey)
        const { data: { session } } = await sb.auth.getSession()
        if (!session) {
          setState('denied')
          setTimeout(() => router.push('/'), 2000)
          return
        }
        // Allow through even without admin role for now — simple auth gate
        setState('granted')
      } catch {
        setState('denied')
      }
    }
    check()
  }, [router])

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="text-zinc-400">Verificando sesión...</div>
      </div>
    )
  }

  if (state === 'denied') {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center flex-col gap-4">
        <div className="text-red-400">Acceso denegado — sesión no encontrada</div>
        <p className="text-zinc-500 text-sm">Redirigiendo...</p>
      </div>
    )
  }

  return <>{children}</>
}
