import React, { useRef, useEffect, useState } from 'react'
import { OrbitControls } from '@react-three/drei'

type CameraControlsProps = {
  trackedObject?: { id: string; type: 'planet' | 'ship' | 'object' } | null
}

export const UniverseCameraControls: React.FC<CameraControlsProps> = ({
  trackedObject
}) => {
  const controlsRef = useRef<any>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => setIsMounted(true), [])

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enableRotate={true}
      enablePan={true}
      minDistance={30}
      maxDistance={200}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI * 3 / 4}
      autoRotate={!trackedObject}
      autoRotateSpeed={0.5}
      zoomSpeed={1.5}
    />
  )
}
