// Universe Types

export interface Planet {
  id: string
  name: string
  emoji: string
  icon?: string
  
  // Visual properties
  color: {
    primary: string
    secondary: string
    glow: string
  }
  size: {
    radius: number
    scale?: number
  }
  materials: {
    type: 'standard' | 'physical' | 'matcap' | 'toon'
    roughness?: number
    metalness?: number
    displacement?: number
    normalScale?: number
  }
  textures?: {
    color?: string
    normal?: string
    displacement?: string
    imageUrl?: string
  }
  
  // Positioning
  orbit: {
    radius: number
    inclination: number
    speed: number
    rotationSpeed?: number
    angle: number
  }
  
  // Natural satellites
  moons?: {
    count: number
  }
  
  // Planetary features
  rings?: {
    hasRings: boolean
    innerRadius?: number
    outerRadius?: number
  }
  
  // Content
  type: 'projects' | 'experience' | 'skills' | 'ai' | 'contact'
  content?: PlanetContent
  
  // Camera presets
  camera?: {
    position: [number, number, number]
    target: [number, number, number]
    distance?: number
  }
  
  // Position for camera tracking (updated dynamically)
  position?: [number, number, number]
}

export type PlanetContent = {
  projects?: Project[]
  experience?: Experience[]
  skills?: Skill[]
  aiExperiments?: AIExperiment[]
  contact?: ContactInfo
}

export interface Project {
  id: string
  name: string
  description: string
  thumbnail?: string
  links: ProjectLink[]
  technologies: string[]
  status: 'completed' | 'wip' | 'archived'
  date: string
  category: string
  highlights?: string[]
  challenges?: string[]
  outcomes?: string[]
}

export interface ProjectLink {
  type: 'demo' | 'code' | 'case'
  url: string
  icon: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location?: string
  startDate: string
  endDate?: 'present' | string
  responsibilities: string[]
  technologies?: string[]
  achievements?: string[]
}

export interface Skill {
  id: string
  name: string
  category: 'languages' | 'frameworks' | 'tools' | 'frontend' | 'backend'
  proficiency: number // 0-10
}

export interface AIExperiment {
  id: string
  name: string
  description: string
  technologies: string[]
  results?: string
  codeUrl?: string
}

export interface ContactInfo {
  email?: string
  linkedin?: string
  github?: string
  twitter?: string
}

export interface UniverseState {
  activePlanet: string | null
  cameraMode: 'overview' | 'focused'
  isTransitioning: boolean
  hoveredPlanet: string | null
}

export interface CameraPosition {
  position: [number, number, number]
  target: [number, number, number]
  distance?: number
}

export interface InteractionEvent {
  type: 'hover' | 'click' | 'drag' | 'release'
  planetId: string
  timestamp: number
  cursor: {
    x: number
    y: number
  }
  modifiers?: {
    ctrl?: boolean
    shift?: boolean
    alt?: boolean
  }
}
