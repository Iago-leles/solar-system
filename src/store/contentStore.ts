import { create } from 'zustand'
import { Project, Experience, Skill, AIExperiment, ContactInfo } from '@/types/universe'

interface ContentStore {
  projects: Project[]
  experience: Experience[]
  skills: Skill[]
  aiExperiments: AIExperiment[]
  contact: ContactInfo | null
  isLoading: boolean
  setProjects: (projects: Project[]) => void
  setExperience: (experience: Experience[]) => void
  setSkills: (skills: Skill[]) => void
  setAIExperiments: (experiments: AIExperiment[]) => void
  setContact: (contact: ContactInfo) => void
  setLoading: (isLoading: boolean) => void
}

export const useContentStore = create<ContentStore>((set) => ({
  projects: [],
  experience: [],
  skills: [],
  aiExperiments: [],
  contact: null,
  isLoading: false,
  
  setProjects: (projects) => set({ projects }),
  
  setExperience: (experience) => set({ experience }),
  
  setSkills: (skills) => set({ skills }),
  
  setAIExperiments: (experiments) => set({ aiExperiments: experiments }),
  
  setContact: (contact) => set({ contact }),
  
  setLoading: (isLoading) => set({ isLoading })
}))
