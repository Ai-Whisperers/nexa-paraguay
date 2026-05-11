'use client'

export function StorySection({ pageContent, data }: any) {
  const d = data || pageContent || {}
  const paragraphs = d.paragraphs || []
  const resultsParagraphs = d.resultsParagraphs || []
  if (!d.title && !paragraphs.length) return null

  return (
    <>
      {/* Main story */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4">
          {d.title && (
            <div className="text-center mb-12">
              <h2 className="text-[clamp(1.5rem_3vw_2.2rem)] font-bold text-primary mb-4">{d.title}</h2>
              <div className="w-12 h-0.5 bg-accent mx-auto" />
            </div>
          )}

          <div className="space-y-5">
            {paragraphs.map((p: string, i: number) => (
              <p key={i} className="text-text leading-relaxed text-[0.95rem]">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Results section (if any) */}
      {resultsParagraphs.length > 0 && (
        <section className="py-20 md:py-28 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4">
            {d.resultsTitle && (
              <div className="text-center mb-12">
                <h2 className="text-[clamp(1.5rem_3vw_2.2rem)] font-bold mb-4">{d.resultsTitle}</h2>
                <div className="w-12 h-0.5 bg-accent mx-auto" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resultsParagraphs.map((p: string, i: number) => {
                const icons = ['🎯', '❤️', '📈']
                const stats = ['10 clientes atendidos', '100% satisfacción', 'Acompañamiento real']
                return (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <div className="text-2xl mb-3">{icons[i] || '✦'}</div>
                    <p className="text-sm text-white/90 leading-relaxed">{p}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
