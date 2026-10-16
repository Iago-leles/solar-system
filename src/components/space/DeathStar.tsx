import React from 'react'
import { useGLTF } from '@react-three/drei'
import type { Group } from 'three'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { useUniverseStore } from '@/store/universeStore'
import { DEATH_STAR_ID } from '@/data/space-objects'

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
  
  // Same hover/select flow as the planets, so the Death Star opens its own details sheet
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    useUniverseStore.getState().hoverPlanet(DEATH_STAR_ID)
  }
  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    if (useUniverseStore.getState().hoveredPlanet === DEATH_STAR_ID) {
      useUniverseStore.getState().hoverPlanet(null)
    }
  }
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    useUniverseStore.getState().selectPlanet(DEATH_STAR_ID)
  }
  
  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
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
