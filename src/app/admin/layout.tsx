'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      const sb = createClient(supabaseUrl, supabaseAnonKey)
      const { data: { session } } = await sb.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      const { data: profile } = await sb
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()
      setIsAdmin(profile?.role === 'admin')
    }
    checkAuth()
  }, [router])

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="text-zinc-400">Verificando acceso...</div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="text-red-400">Acceso denegado — se requiere rol de administrador</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <nav className="border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
        <span className="text-emerald-400 font-bold text-lg">Nexa Admin</span>
        <button
          onClick={async () => {
            const sb = createClient(supabaseUrl, supabaseAnonKey)
            await sb.auth.signOut()
            router.push('/')
          }}
          className="text-sm text-zinc-400 hover:text-zinc-200"
        >
          Cerrar sesión
        </button>
      </nav>
      <main className="p-8">
        {children}
      </main>
    </div>
  )
}
