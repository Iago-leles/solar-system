import { create } from 'zustand'
import { CameraPosition } from '@/types/universe'
import type { Planet, UniverseState } from '@/types/universe'

interface UniverseStore extends UniverseState {
  selectPlanet: (planetId: string | null) => void
  hoverPlanet: (planetId: string | null) => void
  setCameraMode: (mode: 'overview' | 'focused') => void
  setTransitioning: (isTransitioning: boolean) => void
  planets: Planet[]
  setPlanets: (planets: Planet[]) => void
  getCameraPosition: (planetId?: string) => CameraPosition | null
}

export const useUniverseStore = create<UniverseStore>((set, get) => ({
  activePlanet: null,
  hoveredPlanet: null,
  cameraMode: 'overview',
  isTransitioning: false,
  planets: [],
  
  selectPlanet: (planetId) => {
    set({ 
      activePlanet: planetId, 
      cameraMode: planetId ? 'focused' : 'overview' 
    })
  },
  
  hoverPlanet: (planetId) => {
    set({ hoveredPlanet: planetId })
  },
  
  setCameraMode: (mode) => {
    set({ cameraMode: mode })
  },
  
  setTransitioning: (isTransitioning) => {
    set({ isTransitioning })
  },
  
  setPlanets: (planets) => {
    set({ planets })
  },
  
  getCameraPosition: (planetId) => {
    const { activePlanet, planets } = get()
    const targetPlanetID = planetId || activePlanet
    
    if (!targetPlanetID) {
      return {
        position: [40, 40, 40] as [number, number, number],
        target: [0, 0, 0] as [number, number, number]
      }
    }
    
    const planet = planets.find((p) => p.id === targetPlanetID)
    if (!planet?.camera) return null
    
    return planet.camera
  }
}))
