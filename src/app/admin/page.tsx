'use client'

import { AdminGuard } from '@/components/AdminGuard'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({ pages: 12, blogs: 56, locales: 4 })

  useEffect(() => {
    const sb = createClient(supabaseUrl, supabaseAnonKey)
    sb.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user)
    })
  }, [])

  return (
    <AdminGuard>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          {user && (
            <p className="text-zinc-400 text-sm mt-1">
              Conectado como {user.email}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
            <p className="text-zinc-400 text-sm">Páginas</p>
            <p className="text-white text-2xl font-bold mt-1">{stats.pages}</p>
            <p className="text-zinc-500 text-xs mt-1">× 4 idiomas</p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
            <p className="text-zinc-400 text-sm">Blog posts</p>
            <p className="text-white text-2xl font-bold mt-1">{stats.blogs}</p>
            <p className="text-zinc-500 text-xs mt-1">EN (40) + DE (16)</p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
            <p className="text-zinc-400 text-sm">Contenido</p>
            <p className="text-white text-2xl font-bold mt-1">File-based</p>
            <p className="text-zinc-500 text-xs mt-1">Migrando a Supabase</p>
          </div>
        </div>

        {/* Coming soon */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <h2 className="text-lg font-semibold text-white mb-2">Próximamente</h2>
          <div className="space-y-2 text-sm text-zinc-400">
            <p>• Editor de contenido visual</p>
            <p>• Gestión de leads de WhatsApp</p>
            <p>• Analíticas en tiempo real</p>
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
