import React from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { useUniverseStore } from '@/store/universeStore'
import solarSystemData from '@/data/solar-system.json'

export const PlanetContent: React.FC = () => {
  const { activePlanet, selectPlanet } = useUniverseStore()
  
  if (!activePlanet) return null
  
  const planet = solarSystemData.planets.find((p) => p.id === activePlanet)
  if (!planet) {
    console.log('Planet not found for id:', activePlanet)
    return null
  }
  
  console.log('Showing planet details:', planet.id)
  
  const handleClose = () => selectPlanet(null)
  
  return (
    <Modal isOpen={!!activePlanet} onClose={handleClose}>
      <div className="flex flex-col h-full max-h-[85vh] max-w-5xl mx-auto">
         {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#334155]">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-[#F1F5F9]">{planet.name}</h2>
            <p className="text-sm text-[#64748B]">Planet #{planet.order} from the Sun</p>
          </div>
          <Button variant="secondary" onClick={handleClose}>
            ✕ Close
          </Button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {/* Overview */}
          <div className="p-6 bg-[#0F172A]/50 border border-[#334155] rounded-lg">
            <h3 className="text-lg font-semibold mb-3" style={{ color: planet.colors.secondary }}>Overview</h3>
            <p className="text-[#CBD5E1]">{planet.description}</p>
          </div>
          
          {/* Physical Characteristics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#0F172A]/50 border border-[#334155] rounded-lg">
              <h4 className="text-sm font-semibold text-[#64748B] mb-2">Diameter</h4>
              <p className="text-lg font-semibold text-[#F1F5F9]">{planet.diameter}</p>
            </div>
            <div className="p-4 bg-[#0F172A]/50 border border-[#334155] rounded-lg">
              <h4 className="text-sm font-semibold text-[#64748B] mb-2">Distance from Sun</h4>
              <p className="text-lg font-semibold text-[#F1F5F9]">{planet.distance}</p>
            </div>
            <div className="p-4 bg-[#0F172A]/50 border border-[#334155] rounded-lg">
              <h4 className="text-sm font-semibold text-[#64748B] mb-2">Orbital Period</h4>
              <p className="text-lg font-semibold text-[#F1F5F9]">{planet.orbitalPeriod}</p>
            </div>
            <div className="p-4 bg-[#0F172A]/50 border border-[#334155] rounded-lg">
              <h4 className="text-sm font-semibold text-[#64748B] mb-2">Day Length</h4>
              <p className="text-lg font-semibold text-[#F1F5F9]">{planet.dayLength}</p>
            </div>
          </div>
          
          {/* Temperature */}
          <div className="p-4 bg-[#0F172A]/50 border border-[#334155] rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-[#F1F5F9]">Temperature</h3>
            <div className="space-y-2">
              {planet.temperature.day && (
                <div className="flex justify-between">
                  <span className="text-[#CBD5E1]">Day:</span>
                  <span className="text-[#F1F5F9] font-semibold">{planet.temperature.day}</span>
                </div>
              )}
              {planet.temperature.night && (
                <div className="flex justify-between">
                  <span className="text-[#CBD5E1]">Night:</span>
                  <span className="text-[#F1F5F9] font-semibold">{planet.temperature.night}</span>
                </div>
              )}
              {planet.temperature.average && (
                <div className="flex justify-between">
                  <span className="text-[#CBD5E1]">Average:</span>
                  <span className="text-[#F1F5F9] font-semibold">{planet.temperature.average}</span>
                </div>
              )}
              {planet.temperature.extreme && (
                <div className="flex justify-between">
                  <span className="text-[#CBD5E1]">Extreme:</span>
                  <span className="text-[#F1F5F9] font-semibold">{planet.temperature.extreme}</span>
                </div>
              )}
              {planet.temperature.surface && (
                <div className="flex justify-between">
                  <span className="text-[#CBD5E1]">Surface:</span>
                  <span className="text-[#F1F5F9] font-semibold">{planet.temperature.surface}</span>
                </div>
              )}
              {planet.temperature.cloudTops && (
                <div className="flex justify-between">
                  <span className="text-[#CBD5E1]">Cloud Tops:</span>
                  <span className="text-[#F1F5F9] font-semibold">{planet.temperature.cloudTops}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Atmosphere */}
          <div className="p-4 bg-[#0F172A]/50 border border-[#334155] rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-[#F1F5F9]">Atmosphere</h3>
            <p className="text-[#CBD5E1]">{planet.atmosphere}</p>
          </div>
          
          {/* Moons */}
          {planet.moons > 0 && (
            <div className="p-4 bg-[#0F172A]/50 border border-[#334155] rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-[#F1F5F9]">Moons</h3>
              <p className="text-[#CBD5E1]">{planet.moons} known natural satellites</p>
            </div>
          )}
          
          {/* Interesting Facts */}
          <div className="p-4 bg-[#0F172A]/50 border border-[#334155] rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-[#F1F5F9]">Interesting Facts</h3>
            <ul className="space-y-2">
              {planet.facts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#10B981] mt-1">✓</span>
                  <span className="text-[#CBD5E1]">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  )
}
