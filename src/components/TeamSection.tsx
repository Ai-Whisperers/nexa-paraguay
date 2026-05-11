'use client'

function resolveImage(images: any, ref: string | undefined): string {
  if (!ref || !images) return ''
  const key = ref.replace('@img:', '').replace('@src:', '')
  const parts = key.split('.')
  let obj: any = images
  for (const p of parts) {
    if (obj?.[p]) obj = obj[p]
    else return ''
  }
  return obj?.src || obj || ''
}

const TEAM_LAYOUTS = [
  { label: 'K', bg: 'bg-rose-100 text-rose-600' },
  { label: 'L', bg: 'bg-amber-100 text-amber-600' },
  { label: 'M', bg: 'bg-emerald-100 text-emerald-600' },
  { label: 'N', bg: 'bg-indigo-100 text-indigo-600' },
  { label: 'P', bg: 'bg-cyan-100 text-cyan-600' },
]

export function TeamSection({ pageContent, data, images }: any) {
  const d = data || pageContent || {}
  const members = d.members || d.items || []
  if (!members.length) return null

  return (
    <section className="py-20 md:py-28 bg-surface-alt">
      <div className="max-w-6xl mx-auto px-4">
        {d.title && (
          <h2 className="text-[clamp(1.5rem_3vw_2.2rem)] font-bold text-primary text-center mb-14">{d.title}</h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {members.map((m: any, i: number) => {
            const img = resolveImage(images, m.memberImage || m.image || m.imageUrl)
            const layout = TEAM_LAYOUTS[i % TEAM_LAYOUTS.length]
            return (
              <div key={i} className="group relative bg-white rounded-2xl shadow-sm border border-border/40 hover:shadow-md transition-all duration-300 overflow-hidden">
                {/* Top accent bar */}
                <div className={`h-1.5 w-full ${layout.bg.split(' ')[0]}`} />

                <div className="p-6 text-center">
                  {/* Avatar */}
                  <div className="relative mx-auto mb-4 w-20 h-20">
                    {img ? (
                      <img src={img} alt={m.name} className="w-20 h-20 object-cover rounded-full ring-2 ring-border/50" />
                    ) : (
                      <div className={`w-20 h-20 rounded-full ${layout.bg} flex items-center justify-center text-xl font-bold mx-auto`}>
                        {m.name?.[0] || '?'}
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-primary text-sm leading-tight mb-0.5">{m.name}</h3>

                  {/* Role */}
                  {m.role && (
                    <p className="text-xs text-accent font-semibold mb-2 line-clamp-2">{m.role}</p>
                  )}

                  {/* Description */}
                  {m.description && (
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-4">{m.description}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
