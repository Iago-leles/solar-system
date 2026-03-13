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
  showPlanetModal: boolean
  setShowPlanetModal: (show: boolean) => void
}

export const useUniverseStore = create<UniverseStore>((set) => ({
  activePlanet: null,
  hoveredPlanet: null,
  cameraMode: 'overview',
  isTransitioning: false,
  planets: [],
  showPlanetModal: false,
  
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
  
  setShowPlanetModal: (show) => {
    set({ showPlanetModal: show })
  },
  
  getCameraPosition: (planetId) => {
    return null
  }
}))
