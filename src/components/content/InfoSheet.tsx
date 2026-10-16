import React, { useEffect, useRef } from 'react'

interface InfoSheetProps {
  title: string
  accent: string
  // Round picture of the object, top left of the sheet
  visual: React.ReactNode
  // Short line next to the picture (position, kind of object...)
  subtitle: React.ReactNode
  onClose: () => void
  children: React.ReactNode
}

// Shared frame for the details sheet: side panel on desktop, bottom sheet on phones
export const InfoSheet: React.FC<InfoSheetProps> = ({ title, accent, visual, subtitle, onClose, children }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    closeButtonRef.current?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="fixed inset-0 z-50">
      {/* Click-away layer: dims the scene on phones only, so the object stays in view on desktop */}
      <div className="absolute inset-0 bg-[#03050C]/60 md:bg-transparent" onClick={onClose} />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-sheet-title"
        className="planet-sheet absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col overflow-hidden rounded-t-[28px] border border-white/[0.07] bg-[#0A0E1C]/90 text-[#E8ECF5] shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl md:inset-y-4 md:left-auto md:right-4 md:max-h-none md:w-[440px] md:rounded-[28px]"
        style={{ fontFamily: 'var(--font-geist-sans)' }}
      >
        {/* The object's own light, coming from the picture */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: accent }}
        />

        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label={`Close ${title} details`}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-[#0A0E1C]/80 text-[#8B94AB] transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: accent }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative overflow-y-auto px-7 pb-8 pt-8 [scrollbar-color:#2A3147_transparent] [scrollbar-width:thin] md:px-9">
          <div className="flex items-end gap-5">
            {visual}
            <div className="min-w-0 pb-1">{subtitle}</div>
          </div>

          <h2
            id="info-sheet-title"
            className="mt-6 text-[64px] leading-[0.9] tracking-[-0.01em] md:text-[76px]"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            {title}
          </h2>

          {children}
        </div>
      </aside>
    </div>
  )
}

export const StatGrid: React.FC<{ stats: { label: string; value: string }[] }> = ({ stats }) => (
  <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-white/[0.07] py-6">
    {stats.map((stat) => (
      <div key={stat.label}>
        <dt className="text-[13px] text-[#8B94AB]">{stat.label}</dt>
        <dd className="mt-1 text-lg tabular-nums text-[#F3F5FA]">{stat.value}</dd>
      </div>
    ))}
  </dl>
)

export const FactList: React.FC<{ facts: string[]; accent: string; title?: string }> = ({
  facts,
  accent,
  title = 'Worth knowing'
}) => (
  <section className="mt-8">
    <h3 className="text-base font-medium">{title}</h3>
    <ul className="mt-3 space-y-3">
      {facts.map((fact) => (
        <li key={fact} className="flex gap-3 text-sm leading-relaxed text-[#C3CADB]">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
          <span>{fact}</span>
        </li>
      ))}
    </ul>
  </section>
)
