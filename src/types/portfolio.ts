import type { Project, Experience, AIExperiment } from './universe'

// Portfolio Types

export interface PortfolioData {
  metadata: {
    name: string
    version: string
    lastUpdated: string
  }
  
  developer: {
    name: string
    title: string
    bio: string
    avatar?: string
    social: {
      linkedin?: string
      github?: string
      twitter?: string
      email?: string
    }
  }
  
  projects: Project[]
  experience: Experience[]
  skills: Record<string, Record<string, number>>
  aiExperiments: AIExperiment[]
  planets: {
    projects: PlanetConfig
    experience: PlanetConfig
    skills: PlanetConfig
    ai: PlanetConfig
    contact: PlanetConfig
  }
}

export interface PlanetConfig {
  name: string
  emoji: string
  color: {
    primary: string
    secondary: string
    glow: string
  }
  size: {
    radius: number
  }
  orbit: {
    radius: number
    speed: number
  }
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  status?: 'streaming' | 'complete'
}

export interface PortfolioChunk {
  id: string
  section: string
  key: string
  summary: string
  content: string
  embedding?: number[]
  metadata?: {
    technologies?: string[]
    date?: string
    category?: string
  }
}
