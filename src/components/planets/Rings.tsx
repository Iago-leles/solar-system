import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

interface RingsProps {
  innerRadius: number
  outerRadius: number
  planetColor: string
  moonCount?: number
  orbitalSpeed?: number
}

export const Rings: React.FC<RingsProps> = ({
  innerRadius,
  outerRadius,
  planetColor,
}) => {
  const ringGeometry = useMemo(
    () => new THREE.RingGeometry(innerRadius, outerRadius, 128),
    [innerRadius, outerRadius]
  )

  const ringTexture = useMemo(() => {
    /* eslint-disable react-hooks/purity */
    const ctx = document.createElement('canvas')
    ctx.width = 512
    ctx.height = 256
    const c = ctx.getContext('2d')!
    
    for (let i = 0; i < 10; i++) {
      const y = i * 25
      const opacity = 0.3 + Math.random() * 0.5
      c.fillStyle = `rgba(${parseInt(planetColor.slice(1, 3), 16)}, ${parseInt(planetColor.slice(3, 5), 16)}, ${parseInt(planetColor.slice(5, 7), 16)}, ${opacity})`
      c.fillRect(0, y, 512, 20 + Math.random() * 10)
    }
    /* eslint-enable react-hooks/purity */
    
    const texture = new THREE.CanvasTexture(ctx)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return texture
  }, [planetColor])

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerRadius, outerRadius, 128]} />
        <meshStandardMaterial
          map={ringTexture}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerRadius + 0.4, outerRadius - 0.4, 64]} />
        <meshStandardMaterial
          color="#D4AF37"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

const MoonComponent: React.FC<{
  moon: {
    radius: number
    angle: number
    distance: number
    speed: number
    seed: number
    yOffset?: number
  }
}> = ({ moon }) => {
  const meshRef = useRef<Mesh>(null)

  const moonTexture = useMemo(() => {
    /* eslint-disable react-hooks/purity */
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const c = canvas.getContext('2d')!
    
    c.fillStyle = '#808080'
    c.fillRect(0, 0, 128, 128)
    
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 128
      const y = Math.random() * 128
      const radius = 2 + Math.random() * 8
      
      c.beginPath()
      c.arc(x, y, radius, 0, Math.PI * 2)
      c.fillStyle = `rgba(80, 80, 80, ${0.3 + Math.random() * 0.4})`
      c.fill()
    }
    /* eslint-enable react-hooks/purity */
    
    return new THREE.CanvasTexture(canvas)
  }, [moon.seed])

  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      const x = moon.distance * Math.cos(moon.angle + time * moon.speed)
      const z = moon.distance * Math.sin(moon.angle + time * moon.speed)
      const y = moon.yOffset || 0
      meshRef.current.position.set(x, y, z)
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[moon.radius, 16, 16]} />
      <meshStandardMaterial roughness={0.9} map={moonTexture} />
    </mesh>
  )
}

export const Moons: React.FC<{
  moonCount: number
  planetRadius: number
}> = ({ moonCount, planetRadius }) => {
  const moons = useMemo(() => {
    /* eslint-disable react-hooks/purity */
    const moonData = []
    for (let i = 0; i < moonCount; i++) {
      const angle = (i / moonCount) * Math.PI * 2
      const distance = planetRadius * (1.6 + i * 0.5)
      const speed = 0.01 + Math.random() * 0.3
      const yOffset = planetRadius * (Math.random() * 1.6 - 0.8)
      
      moonData.push({
        radius: planetRadius * (0.08 + i * 0.02),
        angle,
        distance,
        speed,
        seed: i,
        yOffset
      })
    }
    /* eslint-enable react-hooks/purity */
    return moonData
  }, [moonCount, planetRadius])

  return (
    <>
      {moons.map((moon, idx) => (
        <MoonComponent key={`moon-${idx}`} moon={moon} />
      ))}
    </>
  )
}

export default Rings
