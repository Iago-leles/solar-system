import React from 'react'
import { useGLTF } from '@react-three/drei'
import type { Group } from 'three'
import { useFrame } from '@react-three/fiber'

const modelPath = '/3d_models/imperial_ship.glb'

useGLTF.preload(modelPath)

interface ImperialShipProps {
  position?: [number, number, number]
  scale?: number
}

export const ImperialShip: React.FC<ImperialShipProps> = ({ position = [0, 0, -150], scale = 0.03 }) => {
  const { scene } = useGLTF(modelPath)
  const groupRef = React.useRef<Group>(null)

  
  return (
    <group ref={groupRef} position={position} rotation={[0, 4.5, 0]}>
      <primitive object={scene} scale={scale} />
      
      {/* Ambient lighting for overall brightness */}
      <ambientLight color="#1d1919ff" intensity={0.8} />
    </group>
  )
}

export default ImperialShip
