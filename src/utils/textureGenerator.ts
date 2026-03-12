// Procedural texture generation for planets
import * as THREE from 'three'

export interface PlanetTextureConfig {
  type: 'mercury' | 'venus' | 'earth' | 'jupiter' | 'saturn'
}

export function generatePlanetTexture(config: PlanetTextureConfig): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  const colors = {
    mercury: { primary: '#a0512d', secondary: '#654321', accent: '#8B4513' },
    venus: { primary: '#E6BE8A', secondary: '#DAA520', accent: '#B8860B' },
    earth: { primary: '#3B82F6', secondary: '#10B981', accent: '#60A5FA' },
    jupiter: { primary: '#D2691E', secondary: '#CD853F', accent: '#FCD5A5' },
    saturn: { primary: '#F5DEB3', secondary: '#DEB887', accent: '#DAA520' }
  }

  const planetColors = colors[config.type as keyof typeof colors]

  // Create gradient base
  const gradient = ctx.createLinearGradient(0, 0, 512, 256)
  gradient.addColorStop(0, planetColors.primary)
  gradient.addColorStop(0.5, planetColors.secondary)
  gradient.addColorStop(1, planetColors.accent)

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 512, 256)

  // Add procedural noise for surface detail
  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 256
    const intensity = 15 + Math.random() * 10
    const size = 2 + Math.random() * 3

    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(0, 0, 0, ${intensity / 100})`
    ctx.fill()
  }

  // Add bands for gas giants
  if (config.type === 'jupiter' || config.type === 'saturn') {
    const bandColors = ['#CD853F', '#DEB887', '#F5DEB3', '#FFA500']
    const bands = config.type === 'jupiter' ? [30, 80, 130, 180] : [25, 75, 125, 175, 225]

    bands.forEach((y, idx) => {
      ctx.fillStyle = bandColors[idx % bandColors.length]
      const bandHeight = 20 + Math.random() * 15
      ctx.fillRect(0, y, 512, bandHeight)
    })
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace

  return texture
}

export function getPlanetEmissiveColor(type: PlanetTextureConfig['type']): string {
  switch (type) {
    case 'mercury': return '#D2691E'
    case 'venus': return '#FF4500'
    case 'earth': return '#10B981'
    case 'jupiter': return '#FF7F50'
    case 'saturn': return '#FFD700'
    default: return '#000000'
  }
}
