import React, { useMemo } from 'react'
import { useSettingsStore } from '@/store/settingsStore'

export const Background: React.FC = () => {
  const { performanceTier, enableParticles } = useSettingsStore()
  
  const particleCount = useMemo(() => {
    if (!enableParticles) return 0
    return performanceTier === 'high' ? 8000 : performanceTier === 'medium' ? 4000 : 2000
  }, [performanceTier, enableParticles])
  
  const starData = useMemo(() => {
    /* eslint-disable react-hooks/purity */
    if (!particleCount) return null
    
    const positions: number[] = []
    const colors: number[] = []
    const sizes: number[] = []
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 100 + Math.random() * 200
      
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      )
      
      const colorType = Math.random()
      if (colorType < 0.7) {
        colors.push(1, 1, 1)
      } else if (colorType < 0.85) {
        colors.push(0.8, 0.9, 1)
      } else {
        colors.push(1, 1, 0.8)
      }
      
      sizes.push(0.3 + Math.random() * 0.4)
    }
    /* eslint-enable react-hooks/purity */
    
    return { positions, colors, sizes }
  }, [particleCount])
  
  return (
    <>
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 100, 600]} />
      
      {starData && particleCount > 0 && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={new Float32Array(starData.positions)}
              itemSize={3}
              args={[new Float32Array(starData.positions), 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              count={particleCount}
              array={new Float32Array(starData.colors)}
              itemSize={3}
              args={[new Float32Array(starData.colors), 3]}
            />
            <bufferAttribute
              attach="attributes-size"
              count={particleCount}
              array={new Float32Array(starData.sizes)}
              itemSize={1}
              args={[new Float32Array(starData.sizes), 1]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.3}
            vertexColors
            sizeAttenuation
            transparent
            opacity={0.9}
          />
        </points>
      )}
    </>
  )
}
