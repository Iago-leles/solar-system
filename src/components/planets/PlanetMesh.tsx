import React, { useMemo, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'
import { Planet } from '@/types/universe'
import { useUniverseStore } from '@/store/universeStore'
import { planetConfig } from '@/utils/constants/colors'
import { generatePlanetTexture } from '@/utils/textureGenerator'
import { Rings, Moons } from './Rings'

interface PlanetMeshProps {
  planet: Planet
  onHover: (hovered: boolean) => void
  onClick: () => void
}

export const PlanetMesh: React.FC<PlanetMeshProps> = ({
  planet,
  onHover,
  onClick
}) => {
  const meshRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)
  // Boolean selectors: this planet only re-renders when its own hover/selection changes
  const isHovered = useUniverseStore((s) => s.hoveredPlanet === planet.id)
  const isSelected = useUniverseStore((s) => s.activePlanet === planet.id)
  const isTransitioning = useUniverseStore((s) => s.isTransitioning)
  
  // Get orbit configuration from constants
  const orbitRadius = useMemo(() => {
    const config = (planetConfig as any)[planet.id as keyof typeof planetConfig]
    return config?.orbit?.radius || planet.orbit.radius
  }, [planet.id, planet.orbit])
  
  const orbitSpeed = useMemo(() => {
    const config = (planetConfig as any)[planet.id as keyof typeof planetConfig]
    return config?.orbit?.speed || 0.05
  }, [planet.id])
  
  const orbitInclination = useMemo(() => {
    const config = (planetConfig as any)[planet.id as keyof typeof planetConfig]
    return config?.orbit?.inclination || 0
  }, [planet.id])
  
  const orbitAngle = useMemo(() => {
    const config = (planetConfig as any)[planet.id as keyof typeof planetConfig]
    return config?.orbit?.angle || (planet.orbit as { angle?: number })?.angle || 0
  }, [planet.id])
  
  // Generate procedural texture
  const planetType = planet.id === 'mercury' ? 'mercury' :
                      planet.id === 'venus' ? 'venus' :
                      planet.id === 'earth' ? 'earth' :
                      planet.id === 'mars' ? 'mars' :
                      planet.id === 'jupiter' ? 'jupiter' :
                      planet.id === 'saturn' ? 'saturn' :
                      planet.id === 'uranus' ? 'uranus' :
                      planet.id === 'neptune' ? 'neptune' : 'earth'
  
  const proceduralTexture = useMemo(() => generatePlanetTexture({ 
    type: planetType as any
  }), [planetType])
  
  const [externalTexture, setExternalTexture] = useState<THREE.Texture | null>(null)
  
  useEffect(() => {
    if (planet.textures?.imageUrl) {
      const loader = new THREE.TextureLoader()
      loader.load(planet.textures.imageUrl,
        (texture) => {
          setExternalTexture(texture)
        },
        undefined,
        (error) => {
          console.warn('Could not load external texture, using procedural fallback')
        }
      )
    }
  }, [planet.textures?.imageUrl])
  
  const planetTexture = useMemo(() => {
    if (externalTexture) {
      return externalTexture
    }
    const textureObj = proceduralTexture as any
    return textureObj?.texture || proceduralTexture
  }, [externalTexture, proceduralTexture])
  
  // Animate orbital movement and rotation in each frame
  useFrame((state, delta) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      const currentAngle = orbitAngle + time * orbitSpeed
      
      // Calculate orbital position continuously
      const direction = (planetConfig as any)[planet.id as keyof typeof planetConfig]?.orbit?.direction || 1
      
      const x = orbitRadius * Math.cos(currentAngle) * direction
      const y = orbitRadius * Math.sin(orbitInclination) * Math.sin(currentAngle)
      const z = orbitRadius * Math.sin(currentAngle) * direction
      
      groupRef.current.position.set(x, y, z)
    }
    
    if (meshRef.current) {
      const rotationSpeed = (planet.orbit?.rotationSpeed || 0.5) * 0.3
      meshRef.current.rotation.y += delta * rotationSpeed
      
      // Smooth scale animation on hover/selection
      const targetScale = isHovered || isSelected ? 1.15 : 1
      const currentScale = meshRef.current.scale.x
      const newScale = currentScale + (targetScale - currentScale) * 0.1
      meshRef.current.scale.set(newScale, newScale, newScale)
    }
  })
  
  // Material with procedural textures
  const material = useMemo(() => {
    const emissiveColor = (() => {
      switch (planetType) {
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
    const hasEmissive = planetType !== 'mercury' && planetType !== 'earth'
    const materials = planet.materials as any || {}
    
    const textureObj = planetTexture as any
    const texture = textureObj?.texture || planetTexture
    const normalMap = textureObj?.normal
    
    return (
      <meshStandardMaterial
        map={texture}
        normalMap={normalMap}
        roughness={materials.roughness || 0.5}
        metalness={materials.metalness || 0.1}
        emissive={emissiveColor}
        emissiveIntensity={0.08}
      />
    )
  }, [planetTexture, planet.materials, planet.color.glow, isHovered, planetType, planet.id])
  
  const handlePointerEnter = (e: any) => {
    if (e.stopPropagation) e.stopPropagation()
    onHover(true)
  }
  
  const handlePointerLeave = (e: any) => {
    if (e.stopPropagation) e.stopPropagation()
    onHover(false)
  }
  
  const handleClick = (e: any) => {
    if (e.stopPropagation) e.stopPropagation()
    if (!isTransitioning) {
      onClick()
    }
  }
  
  return (
    <>
      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[planet.size.radius, 64, 64]} />
          {material}
        </mesh>
        
        {/* Saturn's Rings */}
        {planet.rings?.hasRings && (
          <Rings
            innerRadius={planet.rings.innerRadius || 3}
            outerRadius={planet.rings.outerRadius || 5}
            planetColor={planet.color.primary}
          />
        )}
        
        {/* Moons */}
        {planet.moons && planet.moons.count > 0 && (
          <Moons moonCount={Math.min(planet.moons.count, 3)} planetRadius={planet.size.radius} />
        )}
      </group>
      
      {/* Orbit path visualization */}
      <mesh 
        rotation={[Math.PI / 2 - orbitInclination, 0, 0]}
        position={[0, 0, 0]}
      >
        <ringGeometry args={[orbitRadius, orbitRadius + 0.15, 128]} />
        <meshBasicMaterial
          color={planet.color.secondary}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}

export default PlanetMesh

