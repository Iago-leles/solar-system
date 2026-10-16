import React from 'react'
import { useUniverseStore } from '@/store/universeStore'
import { getObjectSummary } from '@/data/space-objects'

// Same surface as the details sheet, so the three pieces read as one family
const surface =
  'border border-white/[0.07] bg-[#0A0E1C]/85 text-[#E8ECF5] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl'

const ColorDot: React.FC<{ color: string }> = ({ color }) => (
  <span
    className="h-2.5 w-2.5 shrink-0 rounded-full"
    style={{ background: color, boxShadow: `0 0 10px ${color}` }}
    aria-hidden="true"
  />
)

export const PlanetOverlay: React.FC = () => {
  const hoveredPlanet = useUniverseStore((s) => s.hoveredPlanet)
  const activePlanet = useUniverseStore((s) => s.activePlanet)
  const showPlanetModal = useUniverseStore((s) => s.showPlanetModal)

  if (showPlanetModal) return null

  const hovered = getObjectSummary(hoveredPlanet)
  const selected = getObjectSummary(activePlanet)

  const handleDeselect = () => {
    const { selectPlanet, setShowPlanetModal } = useUniverseStore.getState()
    selectPlanet(null)
    setShowPlanetModal(false)
  }

  const handleOpen = () => useUniverseStore.getState().setShowPlanetModal(true)

  return (
    <div style={{ fontFamily: 'var(--font-geist-sans)' }}>
      {/* Hover label: skipped when it would repeat the selected object */}
      {hovered && hoveredPlanet !== activePlanet && (
        <div
          key={hoveredPlanet}
          className={`overlay-pop pointer-events-none fixed left-1/2 top-6 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full py-2 pl-4 pr-5 ${surface}`}
        >
          <ColorDot color={hovered.accent} />
          <span className="text-2xl leading-none" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
            {hovered.name}
          </span>
          <span className="text-[13px] text-[#8B94AB]">Click to select</span>
        </div>
      )}

      {/* Selection bar */}
      {selected && (
        <div
          key={activePlanet}
          className={`overlay-pop fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full p-2 pl-5 ${surface}`}
        >
          <ColorDot color={selected.accent} />
          <span
            className="mr-3 ml-1 text-2xl leading-none whitespace-nowrap"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            {selected.name}
          </span>
          <button
            onClick={handleOpen}
            className="rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: `color-mix(in srgb, ${selected.accent} 28%, transparent)`,
              boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${selected.accent} 55%, transparent)`,
              outlineColor: selected.accent
            }}
          >
            Open details
          </button>
          <button
            onClick={handleDeselect}
            aria-label={`Clear selection of ${selected.name}`}
            className="grid h-10 w-10 place-items-center rounded-full text-[#8B94AB] transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ outlineColor: selected.accent }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
