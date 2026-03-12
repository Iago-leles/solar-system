import React from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

type CameraControlsProps = {
  target?: THREE.Vector3
  activePlanet?: string | null
}

export const UniverseCameraControls: React.FC<CameraControlsProps> = ({
  target,
  activePlanet
}) => {
  return (
    <OrbitControls
      enableZoom={!activePlanet}
      enableRotate={!activePlanet}
      enablePan={!activePlanet}
      minDistance={10}
      maxDistance={100}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI * 3 / 4}
      autoRotate={!activePlanet}
      autoRotateSpeed={0.5}
    />
  )
}
