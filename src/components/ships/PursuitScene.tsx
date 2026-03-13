import React, { useRef, useState } from 'react'
import { MillenniumFalcon } from './MillenniumFalcon'
import { SpaceFighter } from './SpaceFighter'

export const PursuitScene: React.FC = () => {
  const falconData = useRef({ 
    x: 20, y: 60, z: 120,
    velocityX: 0, velocityY: 0, velocityZ: 0 
  })
  const fightersData = useRef([
    { x: 30, y: 70, z: 110 },
    { x: 0, y: 75, z: 115 }
  ])
  const [, forceUpdate] = useState(0)
  
  const handleFalconPositionUpdate = (data: { 
    x: number; y: number; z: number; 
    velocityX: number; velocityY: number; velocityZ: number;
  }) => {
    falconData.current = data
    forceUpdate((prev) => prev + 1)
  }
  
  const handleFighterPositionUpdate = (id: number, data: { x: number; y: number; z: number }) => {
    fightersData.current[id] = data
  }
  
  return (
    <group>
      <MillenniumFalcon 
        position={[10, 50, 100]} 
        onPositionUpdate={handleFalconPositionUpdate}
      />
      
      <SpaceFighter 
        id={0} 
        falconData={falconData} 
        onPositionUpdate={(data) => handleFighterPositionUpdate(0, data)} 
      />
      <SpaceFighter 
        id={1} 
        falconData={falconData} 
        onPositionUpdate={(data) => handleFighterPositionUpdate(1, data)} 
      />
    </group>
  )
}
