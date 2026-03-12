import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

function createRandom(min = 0, max = 1): number {
  return min + Math.random() * (max - min)
}

export const SmallRocket: React.FC = () => {
  const rocketRef = useRef<Mesh>(null)
  const pos = useMemo(() => ({
    x: createRandom(-40, 40),
    y: createRandom(20, 50),
    z: createRandom(-40, 40)
  }), [])
  
  useFrame((state) => {
    if (rocketRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Orbiting movement
      const angle = time * 0.3
      rocketRef.current.position.x = pos.x + Math.cos(angle) * 25
      rocketRef.current.position.z = pos.z + Math.sin(angle) * 25
      rocketRef.current.position.y = pos.y + Math.sin(time * 0.5) * 5
      
      // Always face direction of movement
      rocketRef.current.lookAt(
        pos.x + Math.cos(angle + 0.01) * 25,
        rocketRef.current.position.y,
        pos.z + Math.sin(angle + 0.01) * 25
      )
    }
  })
  
  return (
    <group ref={rocketRef}>
      {/* Rocket body */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 1.5]} />
        <meshStandardMaterial color="#E74C3C" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Nose cone */}
      <mesh position={[0, 0.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.3, 0, 1]} />
        <meshStandardMaterial color="#C0392B" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Fins */}
      <mesh position={[0.4, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.6, 0.1, 0.05]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
      <mesh position={[-0.4, -0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.6, 0.1, 0.05]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
      
      {/* Engine glow */}
      <pointLight position={[0, -1, 0]} color="#FF4500" intensity={1} distance={5} />
    </group>
  )
}
