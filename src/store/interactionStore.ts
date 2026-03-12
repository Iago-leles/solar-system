import { create } from 'zustand'
import { InteractionEvent } from '@/types/universe'

interface InteractionStore {
  lastInteraction: InteractionEvent | null
  isInteracting: boolean
  cursor: { x: number; y: number }
  setLastInteraction: (event: InteractionEvent) => void
  setIsInteracting: (isInteracting: boolean) => void
  setCursor: (cursor: { x: number; y: number }) => void
}

export const useInteractionStore = create<InteractionStore>((set) => ({
  lastInteraction: null,
  isInteracting: false,
  cursor: { x: 0, y: 0 },
  
  setLastInteraction: (event) => set({ lastInteraction: event }),
  
  setIsInteracting: (isInteracting) => set({ isInteracting }),
  
  setCursor: (cursor) => set({ cursor })
}))
