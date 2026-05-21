import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-4xl font-bold text-text mb-2">404</h2>
      <p className="text-lg text-text/60 mb-2">Página no encontrada</p>
      <p className="text-text/50 mb-8 max-w-md">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primary/90 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
