import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

const modelPath = '/3d_models/black_hole.glb'

useGLTF.preload(modelPath)

interface BlackHoleProps {
  position?: [number, number, number]
}

export const BlackHole: React.FC<BlackHoleProps> = ({ position = [30, -30, -250] }) => {
  const { scene } = useGLTF(modelPath)
  const groupRef = React.useRef<Group>(null)
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }
  })
  
  return (
    <group ref={groupRef} position={position}>
      <primitive object={scene} scale={0.03} />
    </group>
  )
}

export default BlackHole
