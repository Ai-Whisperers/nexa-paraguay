export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="mt-4 text-text/50 text-sm">Cargando...</p>
    </div>
  )
}
