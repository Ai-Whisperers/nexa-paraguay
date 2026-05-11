'use client'

import { AdminShell } from '@ai-whisperers/admin'
import { useSession } from '@ai-whisperers/auth'
import { Card } from '@ai-whisperers/ui'

export default function AdminDashboard() {
  const { user } = useSession()

  return (
    <AdminShell>
      <div className="p-8 space-y-6">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground">
          Bienvenido{user?.email ? `, ${user.email}` : ''}.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Contenido</CardTitle>
              <CardDescription>Gestiona el contenido del sitio</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Analíticas</CardTitle>
              <CardDescription>Métricas de GA4</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
              <CardDescription>Ajustes del sitio</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </AdminShell>
  )
}
