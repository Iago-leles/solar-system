import React from 'react'
import { useUniverseStore } from '@/store/universeStore'

export const PlanetOverlay: React.FC = () => {
  const { hoveredPlanet, activePlanet, selectPlanet, setShowPlanetModal } = useUniverseStore()
  
  if (!activePlanet && !hoveredPlanet) return null

  const handleDeselect = () => {
    selectPlanet(null)
    setShowPlanetModal(false)
  }
  
  return (
    <>
      {/* Hover Label */}
      {hoveredPlanet && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#0F172A]/90 backdrop-blur-sm border border-[#334155] rounded-lg shadow-lg animate-in fade-in zoom-in-95 duration-200 pointer-events-auto z-50">
          <p className="text-lg font-semibold">{hoveredPlanet}</p>
          <p className="text-xs text-[#CBD5E1] mt-1">Click for details</p>
        </div>
      )}

      {/* Selected Object Details Button */}
      {activePlanet && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
          <button
            onClick={() => setShowPlanetModal(true)}
            className="pointer-events-auto px-6 py-3 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            📖 View Details
          </button>
          
          <button
            onClick={handleDeselect}
            className="pointer-events-auto px-4 py-3 bg-[#64748B] hover:bg-[#475569] text-white rounded-lg transition-all shadow-lg"
          >
            ✕ Deselect
          </button>
        </div>
      )}
    </>
  )
}
