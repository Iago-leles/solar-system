import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh, Group } from 'three'

type AsteroidData = {
  position: [number, number, number]
  size: number
  speed: number
  rotationSpeed: number
  radius: number
}

function createRandom(min = 0, max = 1) {
  return min + Math.random() * (max - min)
}

export const AsteroidField: React.FC = () => {
  const asteroids = useMemo((): AsteroidData[] => {
    const asteroidData: AsteroidData[] = []
    for (let i = 0; i < 200; i++) {
      asteroidData.push({
        position: [
          createRandom(-100, 100),
          createRandom(-20, 110),
          createRandom(-100, 100)
        ],
        size: createRandom(0.08, 0.2),
        speed: createRandom(0.05, 0.13),
        rotationSpeed: createRandom(-0.005, 0.005),
        radius: createRandom(70, 150)
      })
    }
    return asteroidData
  }, [])
  
  return (
    <>
      {asteroids.map((asteroid, idx) => (
        <Asteroid key={`asteroid-${idx}`} asteroid={asteroid} />
      ))}
    </>
  )
}

const Asteroid: React.FC<{ asteroid: AsteroidData }> = ({ asteroid }) => {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * asteroid.speed
      
      meshRef.current.position.x = Math.cos(time) * asteroid.radius
      meshRef.current.position.z = Math.sin(time) * asteroid.radius
      meshRef.current.rotation.y += asteroid.rotationSpeed
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[asteroid.size, 0]} />
      <meshStandardMaterial color="#3a4050" roughness={0.8} metalness={0.2} />
    </mesh>
  )
}

export const Comet: React.FC = () => {
  const groupRef = useRef<Group>(null)
  const [active, setActive] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [startPos, setStartPos] = useState({ x: 0, y: 0, z: 0 })
  const direction = useRef({ x: 0, y: 0, z: 0 })
  const isRunning = useRef(false)
  
  useEffect(() => {
    const triggerComet = () => {
      if (isRunning.current) return
      
      const startX = -90 + Math.random() * 15
      const startY = 25 + Math.random() * 25
      const startZ = -70 - Math.random() * 40
      
      setStartPos({ x: startX, y: startY, z: startZ })
      direction.current = { x: 1, y: -0.2 + Math.random() * 0.4, z: 0.3 }
      setStartTime(Date.now() / 1000)
      isRunning.current = true
      setActive(true)
      
      setTimeout(() => {
        isRunning.current = false
        setActive(false)
      }, 3500)
    }
    
    const interval = setInterval(triggerComet, 10000)
    triggerComet()
    
    return () => {
      clearInterval(interval)
      isRunning.current = false
    }
  }, [])
  
  useFrame((state) => {
    if (groupRef.current && active) {
      const time = state.clock.getElapsedTime()
      const elapsed = Math.max(0, time - startTime)
      const speed = 25 + Math.random() * 15
      
      groupRef.current.position.x = startPos.x + direction.current.x * elapsed * speed
      groupRef.current.position.y = startPos.y + direction.current.y * elapsed * speed
      groupRef.current.position.z = startPos.z + direction.current.z * elapsed * speed
      
      if (elapsed * speed > 180) {
        setActive(false)
        isRunning.current = false
      }
    }
  })
  
  if (!active) return null
  
  const tailLength = 20
  
  return (
    <group ref={groupRef}>
      {[...Array(tailLength).keys()].map((i) => (
        <mesh key={i} position={[-i * 0.8, 0, 0]} scale={1 - i / tailLength}>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshStandardMaterial 
            color="#87CEEB" 
            roughness={0.3} 
            emissive="#87CEEB" 
            emissiveIntensity={2 - i * 0.08} 
            transparent 
            opacity={1 - i / tailLength} 
          />
        </mesh>
      ))}
      
      <mesh>
        <sphereGeometry args={[0.4]} />
        <meshStandardMaterial color="#E3F2FD" roughness={0.15} emissive="#E3F2FD" emissiveIntensity={3} />
      </mesh>
      
      <pointLight color="#87CEEB" intensity={2} distance={8} />
    </group>
  )
}

export const BlinkingPulsar: React.FC = () => {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const time = state.clock.getElapsedTime()
      const intensity = 0.5 + Math.sin(time * 2) * 0.5
      
      ;(meshRef.current.material as { emissiveIntensity?: number }).emissiveIntensity = intensity
    }
  })
  
  return (
    <mesh position={[60, 50, -80]} ref={meshRef}>
      <sphereGeometry args={[1]} />
      <meshStandardMaterial color="#1E90FF" emissive="#1E90FF" emissiveIntensity={1} />
      <pointLight color="#1E90FF" intensity={2} distance={20} />
    </mesh>
  )
}
