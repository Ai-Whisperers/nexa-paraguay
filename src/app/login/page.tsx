'use client'

import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const sb = createClient(supabaseUrl, supabaseAnonKey)
    const { error: authError } = await sb.auth.signInWithPassword({ email, password })
    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white text-center mb-8">Admin Nexa</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        <p className="text-zinc-600 text-xs text-center mt-6">
          Acceso restringido a administradores
        </p>
      </div>
    </div>
  )
}
