// Procedural texture generation for planets
import * as THREE from 'three'

export interface PlanetTextureConfig {
  type: 'mercury' | 'venus' | 'earth' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune'
  seed?: number
  imageUrl?: string
}

export function generatePlanetTexture(config: PlanetTextureConfig): { texture: THREE.Texture | THREE.CanvasTexture; normal?: THREE.CanvasTexture; emissive?: THREE.CanvasTexture } {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')!
  
  const gradient = ctx.createLinearGradient(0, 0, 512, 256)
  const normalCanvas = document.createElement('canvas')
  normalCanvas.width = 512
  normalCanvas.height = 256
  const normalCtx = normalCanvas.getContext('2d')!
  
  let colors: { primary: string, secondary: string, accent: string }
  
  switch (config.type) {
    case 'mercury':
      colors = { primary: '#A0522D', secondary: '#654321', accent: '#8B4513' }
      break
    case 'venus':
      colors = { primary: '#E6BE8A', secondary: '#DAA520', accent: '#B8860B' }
      break
    case 'earth':
      colors = { primary: '#1E4BB5', secondary: '#1E5A3C', accent: '#1E68B5' }
      break
    case 'mars':
      colors = { primary: '#E74C3C', secondary: '#C0392B', accent: '#FF6B6B' }
      break
    case 'jupiter':
      colors = { primary: '#D2691E', secondary: '#CD853F', accent: '#FCD5A5' }
      break
    case 'saturn':
      colors = { primary: '#F5DEB3', secondary: '#DEB887', accent: '#DAA520' }
      break
    case 'uranus':
      colors = { primary: '#87CEEB', secondary: '#4682B4', accent: '#ADD8E6' }
      break
    case 'neptune':
      colors = { primary: '#4169E1', secondary: '#1E90FF', accent: '#6495ED' }
      break
  }
  
  // Create procedural texture with bands and features
  gradient.addColorStop(0, colors.primary)
  gradient.addColorStop(0.5, colors.secondary)
  gradient.addColorStop(1, colors.accent)
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 512, 256)
  
  // Add surface details
  const addNoise = (density: number, intensity: number) => {
    if (config.seed) ctx.filter = `url(#noise)`
    const imageData = ctx.getImageData(0, 0, 512, 256)
    const data = imageData.data
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.sin(Math.random() * Math.PI * 2) * density
      const value = 128 + noise * intensity
      data[i] = (data[i] * (1 - 0.3) + value * 0.3) | 0
    }
    
    ctx.putImageData(imageData, 0, 0)
  }
  
  // Add bands for gas giants
  const addGasBands = (yPositions: number[] | undefined) => {
    const available_types = ['jupiter', 'saturn', 'uranus', 'neptune']
    if (available_types.includes(config.type)) {
      const bandColors = ['#CD853F', '#DEB887', '#F5DEB3', '#FFA500']
      
      yPositions?.forEach((y, idx) => {
        ctx.fillStyle = bandColors[idx % bandColors.length]
        ctx.fillRect(0, y, 512, 25 + Math.random() * 15)
      })
    }
  }
  
  // Add surface noise and features
  addNoise(0.3, 50)
  addGasBands([20, 50, 80, 110, 140, 170, 200, 230])
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  
  // Generate simple normal map
  normalCtx.fillStyle = '#8080ff'
  normalCtx.fillRect(0, 0, 512, 256)
  
  const normalTexture = new THREE.CanvasTexture(normalCanvas)
  
  // Emissive glow for heat
  const emissiveCanvas = document.createElement('canvas')
  emissiveCanvas.width = 512
  emissiveCanvas.height = 256
  const emissiveCtx = emissiveCanvas.getContext('2d')!
  
  // Emissive colors based on planet temperature
  let emissiveColor: string
  let emissiveIntensity: number
  
  switch (config.type) {
    case 'venus':
      emissiveColor = '#FF4500'
      emissiveIntensity = 0.1
      break
    case 'earth':
      emissiveColor = '#4FC3F7'
      emissiveIntensity = 0.05
      break
    default:
      emissiveColor = '#000000'
      emissiveIntensity = 0
  }
  
  if (emissiveIntensity > 0) {
    const emissiveGradient = emissiveCtx.createRadialGradient(256, 128, 0, 256, 128, 256)
    emissiveGradient.addColorStop(0, emissiveColor)
    emissiveGradient.addColorStop(1, emissiveColor)
    
    emissiveCtx.globalAlpha = emissiveIntensity
    emissiveCtx.fillStyle = emissiveGradient
    emissiveCtx.fillRect(0, 0, 512, 256)
    
    const emissiveTexture = new THREE.CanvasTexture(emissiveCanvas)
    emissiveTexture.colorSpace = THREE.SRGBColorSpace
    
    return { texture, emissive: emissiveTexture }
  }
  
  return { texture }
}

export function createPlanetMaterial(
  config: PlanetTextureConfig,
  roughness: number = 0.5,
  metalness: number = 0.1
): JSX.Element {
  const { texture, emissive } = generatePlanetTexture(config)
  
  const emissiveColor = (() => {
    switch (config.type) {
      case 'mercury': return '#D2691E'
      case 'venus': return '#FF4500'
      case 'earth': return '#10B981'
      case 'mars': return '#E74C3C'
      case 'jupiter': return '#FF7F50'
      case 'saturn': return '#FFD700'
      case 'uranus': return '#87CEEB'
      case 'neptune': return '#4169E1'
      default: return '#000000'
    }
  })()
  
  return (
    <meshStandardMaterial
      map={texture}
      roughness={roughness}
      metalness={metalness}
      emissive={emissive}
      emissiveColor={emissiveColor}
      emissiveIntensity={emissive ? 0.3 : 0}
    />
  )
}
