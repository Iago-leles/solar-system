import React, { useRef, useState } from 'react'
import { MillenniumFalcon } from './MillenniumFalcon'
import { SpaceFighter } from './SpaceFighter'

export const PursuitScene: React.FC = () => {
  const falconData = useRef({ 
    x: -40, y: 15, z: -60, 
    velocityX: 0, velocityY: 0, velocityZ: 0 
  })
  const [, forceUpdate] = useState(0)
  
  const handleFalconPositionUpdate = (data: { 
    x: number; y: number; z: number; 
    velocityX: number; velocityY: number; velocityZ: number;
  }) => {
    falconData.current = data
    forceUpdate((prev) => prev + 1)
  }
  
  return (
    <group>
      <MillenniumFalcon 
        position={[-40, 15, -40]} 
        rotation={0.3}
        onPositionUpdate={handleFalconPositionUpdate}
      />
      
      <SpaceFighter id={0} falconData={falconData} />
      <SpaceFighter id={1} falconData={falconData} />
    </group>
  )
}
