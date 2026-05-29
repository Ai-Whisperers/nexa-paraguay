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

        // Role check: require 'admin' in user_roles table
        const { data: roleData, error: roleError } = await sb
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single()

        if (roleError || !roleData || roleData.role !== 'admin') {
          console.warn('[AdminGuard] Access denied: user is not admin')
          setState('denied')
          setTimeout(() => router.push('/'), 2000)
          return
        }

        setState('granted')
      } catch (err) {
        console.warn('[AdminGuard] Auth check failed:', err)
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
