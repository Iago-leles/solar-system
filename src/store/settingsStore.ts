import { create } from 'zustand'

type PerformanceTier = 'low' | 'medium' | 'high'

interface SettingsStore {
  reducedMotion: boolean
  performanceTier: PerformanceTier
  enableParticles: boolean
  enablePostProcessing: boolean
  enableSound: boolean
  targetFPS: number
  setReducedMotion: (enabled: boolean) => void
  setPerformanceTier: (tier: PerformanceTier) => void
  setEnableParticles: (enabled: boolean) => void
  setEnablePostProcessing: (enabled: boolean) => void
  setEnableSound: (enabled: boolean) => void
  setTargetFPS: (fps: number) => void
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  reducedMotion: false,
  performanceTier: 'high',
  enableParticles: true,
  enablePostProcessing: true,
  enableSound: false,
  targetFPS: 60,
  
  setReducedMotion: (enabled) => set({ reducedMotion: enabled }),
  
  setPerformanceTier: (tier) => 
    set((state) => ({
      performanceTier: tier,
      targetFPS: tier === 'high' ? 60 : tier === 'medium' ? 45 : 30
    })),
  
  setEnableParticles: (enabled) => set({ enableParticles: enabled }),
  
  setEnablePostProcessing: (enabled) => set({ enablePostProcessing: enabled }),
  
  setEnableSound: (enabled) => set({ enableSound: enabled }),
  
  setTargetFPS: (fps) => set({ targetFPS: fps })
}))
