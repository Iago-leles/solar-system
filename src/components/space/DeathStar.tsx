import React from 'react'
import { useGLTF } from '@react-three/drei'
import type { Group } from 'three'
import { useFrame } from '@react-three/fiber'

const modelPath = '/3d_models/death_star.glb'

useGLTF.preload(modelPath)

interface DeathStarProps {
  position?: [number, number, number]
  scale?: number
}

export const DeathStar: React.FC<DeathStarProps> = ({ position = [0, 0, -150], scale = 0.03 }) => {
  const { scene } = useGLTF(modelPath)
  const groupRef = React.useRef<Group>(null)
  
  //Rotate on its axis
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05
    }
  })
  
  return (
    <group ref={groupRef} position={position}>
      {/* Intense white lights for clear visibility */}
      <pointLight color="#FFFFFF" intensity={500} distance={200} decay={2} position={[0, 10, 0]} />
      <pointLight color="#FFFFFF" intensity={400} distance={200} decay={2} position={[0, -10, 0]} />
      
      <primitive object={scene} scale={scale} />
      
      {/* Ambient lighting for overall brightness */}
      <ambientLight color="#FFFFFF" intensity={0.8} />
      
      {/* Side lights for depth */}
      <pointLight color="#E8F4F8" intensity={300} distance={150} decay={2} position={[15, 0, 0]} />
      <pointLight color="#E8F4F8" intensity={300} distance={150} decay={2} position={[-15, 0, 0]} />
    </group>
  )
}

export default DeathStar
