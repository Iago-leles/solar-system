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
      {/* Intense white lights for clear visibility */}
      <pointLight color="#131212ff" intensity={500} distance={200} decay={2} position={[0, 10, 0]} />
      <pointLight color="#141313ff" intensity={400} distance={200} decay={2} position={[0, -10, 0]} />
      
      <primitive object={scene} scale={scale} />
      
      {/* Ambient lighting for overall brightness */}
      <ambientLight color="#1d1919ff" intensity={0.8} />
      
      {/* Side lights for depth */}
      <pointLight color="#393c3dff" intensity={300} distance={150} decay={2} position={[15, 0, 0]} />
      <pointLight color="#1b1e1fff" intensity={300} distance={150} decay={2} position={[-15, 0, 0]} />
    </group>
  )
}

export default ImperialShip
