'use client'

import { AdminLayout } from '@ai-whisperers/admin'
import { AuthGuard } from '@ai-whisperers/auth'
import type { ReactNode } from 'react'

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <AdminLayout>
        {children}
      </AdminLayout>
    </AuthGuard>
  )
}
