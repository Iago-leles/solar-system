// Colors palette
export const colors = {
  brand: {
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    accent: '#06B6D4'
  },
  planets: {
    projects: {
      primary: '#8B5CF6',
      secondary: '#A78BFA',
      glow: '#7C3AED'
    },
    experience: {
      primary: '#3B82F6',
      secondary: '#60A5FA',
      glow: '#2563EB'
    },
    skills: {
      primary: '#10B981',
      secondary: '#34D399',
      glow: '#059669'
    },
    ai: {
      primary: '#F97316',
      secondary: '#FB923C',
      glow: '#EA580C'
    },
    contact: {
      primary: '#374151',
      secondary: '#6B7280',
      glow: '#1F2937'
    }
  },
  ui: {
    text: {
      primary: '#F1F5F9',
      secondary: '#CBD5E1',
      muted: '#64748B'
    },
    background: {
      primary: '#0F172A',
      secondary: '#1E293B',
      tertiary: '#334155'
    },
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
  }
}

// Planet configurations
export const planetConfig: Record<string, any> = {
  projects: {
    id: 'projects',
    name: 'Projects',
    emoji: '🪐',
    color: colors.planets.projects,
    size: { radius: 2.5 },
    orbit: {
      radius: 20,
      inclination: 0,
      speed: 0.08,
      direction: 1,
      angle: 0
    },
    materials: {
      type: 'standard',
      roughness: 0.5,
      metalness: 0.2
    },
    camera: {
      position: [15, 10, 15],
      target: [20, 0, 0],
      distance: 12
    }
  },
  experience: {
    id: 'experience',
    name: 'Experience',
    emoji: '🌍',
    color: colors.planets.experience,
    size: { radius: 2.8 },
    orbit: {
      radius: 30,
      inclination: 0.2,
      speed: 0.06,
      direction: -1,
      angle: Math.PI / 3
    },
    materials: {
      type: 'physical',
      roughness: 0.4,
      metalness: 0.3
    },
    camera: {
      position: [0, 15, 25],
      target: [0, 0, 30],
      distance: 14
    }
  },
  skills: {
    id: 'skills',
    name: 'Skills',
    emoji: '🌙',
    color: colors.planets.skills,
    size: { radius: 2.0 },
    orbit: {
      radius: 40,
      inclination: 0.3,
      speed: 0.05,
      direction: 1,
      angle: Math.PI * 2 / 3
    },
    materials: {
      type: 'matcap',
      roughness: 0.6,
      metalness: 0.1
    },
    camera: {
      position: [25, -10, 20],
      target: [40, 0, 0],
      distance: 10
    }
  },
  ai: {
    id: 'ai',
    name: 'AI Experiments',
    emoji: '☄️',
    color: colors.planets.ai,
    size: { radius: 2.2 },
    orbit: {
      radius: 50,
      inclination: -0.2,
      speed: 0.04,
      direction: 1,
      angle: Math.PI
    },
    materials: {
      type: 'standard',
      roughness: 0.3,
      metalness: 0.4
    },
    camera: {
      position: [40, -15, 10],
      target: [50, 0, 0],
      distance: 13
    }
  },
  contact: {
    id: 'contact',
    name: 'Contact',
    emoji: '🛰️',
    color: colors.planets.contact,
    size: { radius: 1.8 },
    orbit: {
      radius: 60,
      inclination: 0,
      speed: 0.03,
      direction: -1,
      angle: -Math.PI / 3
    },
    materials: {
      type: 'standard',
      roughness: 0.7,
      metalness: 0.1
    },
    camera: {
      position: [50, 5, 0],
      target: [60, 0, 0],
      distance: 11
    }
  }
}

export const qualityConfig = {
  low: {
    resolutionScale: 0.5,
    maxTextureSize: 512,
    shadowMapSize: 512,
    postProcessing: 'none',
    particleCount: 100,
    maxDrawCalls: 50
  },
  medium: {
    resolutionScale: 0.75,
    maxTextureSize: 1024,
    shadowMapSize: 1024,
    postProcessing: 'basic',
    particleCount: 500,
    maxDrawCalls: 100
  },
  high: {
    resolutionScale: 1,
    maxTextureSize: 2048,
    shadowMapSize: 2048,
    postProcessing: 'full',
    particleCount: 2000,
    maxDrawCalls: 200
  }
}

export const fonts = {
  heading: 'Inter, system-ui, sans-serif',
  body: 'Inter, system-ui, sans-serif',
  mono: 'Source Code Pro, monospace'
}

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  xxl: '4rem'
}

export const borderRadius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
  full: '9999px'
}
