import React, { useMemo } from 'react'
import { useUniverseStore } from '@/store/universeStore'

// Solar System planets information
const PLANET_INFO: Record<string, { name: string; emoji: string; color: string; order: number }> = {
  mercury: {
    name: 'Mercury',
    emoji: '☿',
    color: '#A0522D',
    order: 1
  },
  venus: {
    name: 'Venus',
    emoji: '♀',
    color: '#E6BE8A',
    order: 2
  },
  earth: {
    name: 'Earth',
    emoji: '🌍',
    color: '#3B82F6',
    order: 3
  },
  mars: {
    name: 'Mars',
    emoji: '♂',
    color: '#E74C3C',
    order: 4
  },
  jupiter: {
    name: 'Jupiter',
    emoji: '♃',
    color: '#D2691E',
    order: 5
  },
  saturn: {
    name: 'Saturn',
    emoji: '🪐',
    color: '#F5DEB3',
    order: 6
  },
  uranus: {
    name: 'Uranus',
    emoji: '⛢',
    color: '#87CEEB',
    order: 7
  },
  neptune: {
    name: 'Neptune',
    emoji: '♆',
    color: '#4169E1',
    order: 8
  }
}

const SUN_INFO = {
  name: 'The Sun',
  emoji: '☀️',
  color: '#FCD34D'
}

const BLACKHOLE_INFO = {
  name: 'Black Hole',
  emoji: '⬛',
  color: '#7F1D1D'
}

export const PlanetOverlay: React.FC = () => {
  const { hoveredPlanet, activePlanet, selectPlanet } = useUniverseStore()
  
  const visiblePlanetId = hoveredPlanet || activePlanet
  
  const planetInfo = visiblePlanetId ? PLANET_INFO[visiblePlanetId] : null
  
  return (
    <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-50">
      {/* Planet Label */}
      {hoveredPlanet && planetInfo && (
        <div
          className="absolute px-4 py-2 bg-[#0F172A]/90 backdrop-blur-sm border border-[#334155] rounded-lg shadow-lg animate-in fade-in zoom-in-95 duration-200"
          style={{
            color: planetInfo.color
          }}
        >
          <p className="text-lg font-semibold">
            {planetInfo.name}
          </p>
          <p className="text-xs text-[#CBD5E1] mt-1">Planet #{planetInfo.order} - Click for details</p>
        </div>
      )}
      
      {hoveredPlanet === 'sun' && (
        <div
          className="absolute px-4 py-2 bg-[#0F172A]/90 backdrop-blur-sm border border-[#334155] rounded-lg shadow-lg animate-in fade-in zoom-in-95 duration-200"
          style={{
            color: SUN_INFO.color
          }}
        >
          <p className="text-lg font-semibold">
            {SUN_INFO.name}
          </p>
          <p className="text-xs text-[#CBD5E1] mt-1">Central Star</p>
        </div>
      )}
      
      {hoveredPlanet === 'blackhole' && (
        <div
          className="absolute px-4 py-2 bg-[#0F172A]/90 backdrop-blur-sm border border-[#334155] rounded-lg shadow-lg animate-in fade-in zoom-in-95 duration-200"
          style={{
            color: BLACKHOLE_INFO.color
          }}
        >
          <p className="text-lg font-semibold">
            {BLACKHOLE_INFO.name}
          </p>
          <p className="text-xs text-[#CBD5E1] mt-1">In the distance</p>
        </div>
      )}

      {/* Active Planet Indicator */}
      {activePlanet && planetInfo && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={() => selectPlanet(null)}
            className="pointer-events-auto px-6 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg transition-colors shadow-lg"
          >
            ← Return to Overview
          </button>
          
          <div className="px-4 py-2 bg-[#0F172A]/90 backdrop-blur-sm border border-[#334155] rounded-lg shadow-lg">
            <p className="text-sm font-semibold" style={{ color: planetInfo.color }}>
              {planetInfo.name}
            </p>
            <p className="text-xs text-[#CBD5E1]">Selected</p>
          </div>
        </div>
      )}
    </div>
  )
}
