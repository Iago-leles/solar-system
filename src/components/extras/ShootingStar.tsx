import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

export const ShootingStar: React.FC = () => {
  const groupRef = useRef<Mesh>(null)
  const [active, setActive] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [startPos, setStartPos] = useState({ x: 0, y: 0, z: 0 })
  const [direction, setDirection] = useState({ x: 1, y: -0.3, z: 0 })
  const isRunning = useRef(false)
  
  useEffect(() => {
    const triggerShootingStar = () => {
      if (isRunning.current) return
      
      const startX = -120 + Math.random() * 10
      const startY = 10 + Math.random() * 20
      const startZ = -80 - Math.random() * 40
      
      setStartPos({ x: startX, y: startY, z: startZ })
      setDirection({ x: 1, y: -0.1 + Math.random() * 0.4, z: 0.3 })
      setStartTime(Date.now())
      isRunning.current = true
      setActive(true)
      
      setTimeout(() => {
        isRunning.current = false
        setActive(false)
      }, 2500)
    }
    
    const interval = setInterval(triggerShootingStar, 12000)
    triggerShootingStar()
    
    return () => {
      clearInterval(interval)
      isRunning.current = false
    }
  }, [])
  
  useFrame(() => {
    if (groupRef.current && active) {
      const elapsed = (Date.now() - startTime) / 1000
      const distance = elapsed * 1000
      
      groupRef.current.position.x = startPos.x + direction.x * distance
      groupRef.current.position.y = startPos.y + direction.y * distance
      groupRef.current.position.z = startPos.z + direction.z * distance
      
      if (distance > 500) {
        setActive(false)
        isRunning.current = false
      }
    }
  })
  
  if (!active) return null
  
  const trailLength = 15
  
  return (
    <group ref={groupRef}>
      {/* Trail */}
      {[...Array(trailLength).keys()].map((i) => (
        <mesh key={i} position={[-i * 1.2, 0, 0]} scale={1 - i / trailLength}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial 
            color="#FFD700" 
            roughness={0.3} 
            emissive="#FFD700" 
            emissiveIntensity={3 - i * 0.15} 
            transparent 
            opacity={1 - i / trailLength} 
          />
        </mesh>
      ))}
      
      {/* Main star */}
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#FFD700" roughness={0.2} emissive="#FFD700" emissiveIntensity={4} />
        <pointLight color="#FFD700" intensity={2} distance={6} />
      </mesh>
    </group>
  )
}
