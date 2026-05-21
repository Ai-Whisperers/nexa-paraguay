"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-3xl font-bold text-text mb-4">Algo salió mal</h2>
      <p className="text-text/60 mb-8 max-w-md">
        Ocurrió un error inesperado. Nuestro equipo ya fue notificado.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primary/90 transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
