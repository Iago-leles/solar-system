import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

const modelPath = '/3d_models/ufo.glb'

useGLTF.preload(modelPath)

export const AlienShip: React.FC = () => {
  const { scene } = useGLTF(modelPath)
  const shipRef = useRef<Group>(null)
  
  useEffect(() => {
    // Keep ship out of main orbital path
    if (shipRef.current) {
      shipRef.current.position.set(60, 10, -40)
    }
  }, [])
  
  useFrame((state) => {
    if (shipRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Hovering motion
      shipRef.current.position.y = 10 + Math.sin(time * 2) * 1
      shipRef.current.rotation.y = time * 0.1
      
      // Gentle bobbing
      shipRef.current.position.z = -40 + Math.sin(time * 3) * 1
    }
  })
  
  return (
    <group ref={shipRef}>
      <primitive object={scene} scale={4} />
      <ambientLight intensity={0.3} />
    </group>
  )
}
