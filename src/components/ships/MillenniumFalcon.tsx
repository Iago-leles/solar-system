 
import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import * as THREE from 'three'

const modelPath = '/3d_models/millennium_falcon.glb'

useGLTF.preload(modelPath)

export const MillenniumFalcon: React.FC<{ 
  position?: [number, number, number]; 
  rotation?: number;
  onPositionUpdate?: (pos: { x: number; y: number; z: number; velocityX: number; velocityY: number; velocityZ: number }) => void;
  fightersData?: React.RefObject<{ x: number; y: number; z: number }[]>;
}> = 
  ({ position = [-20, 0, -30], rotation = 0, onPositionUpdate, fightersData }) => {
  const { scene } = useGLTF(modelPath)
  const groupRef = React.useRef<Group>(null)
  const [lasers, setLasers] = useState<{ offset: [number, number, number]; birthTime: number; direction: [number, number, number] }[]>([])
  
  const baseY = position[1]
  const lastPos = useRef({ x: 0, y: 0, z: 0 })
  const velocityRef = useRef({ x: 0, y: 0, z: 0 })
  const lastTime = useRef(0)
  const currentTimeRef = useRef(0)
  
  // Start offset relative to group center (nose area, like your example)
  const laserStartOffset: [number, number, number] = [0, 0.1, -3]
  
  useFrame((state) => {
    lastTime.current = state.clock.getElapsedTime()
    currentTimeRef.current = lastTime.current
    
    if (groupRef.current) {
      const time = lastTime.current
      const cycleRadius = 30
      const cycleTime = time * 0.15
      
      const centerX = position[0]
      const centerZ = position[2]
      
      groupRef.current.position.x = centerX + Math.sin(cycleTime) * cycleRadius
      groupRef.current.position.z = centerZ + Math.cos(cycleTime) * cycleRadius
      groupRef.current.position.y = baseY + Math.sin(time * 0.4) * 2
      
      const curX = groupRef.current.position.x
      const curY = groupRef.current.position.y
      const curZ = groupRef.current.position.z
      
      const prevX = lastPos.current.x
      const prevY = lastPos.current.y
      const prevZ = lastPos.current.z
      
      const vx = curX - prevX
      const vy = curY - prevY
      const vz = curZ - prevZ
      
      lastPos.current = { x: curX, y: curY, z: curZ }
      velocityRef.current = { x: vx, y: vy, z: vz }
      
      const horizSpeed = Math.sqrt(vx * vx + vz * vz)
      
      if (horizSpeed > 0.001) {
        groupRef.current.rotation.y = Math.atan2(vx, vz) + Math.PI / 2
        groupRef.current.rotation.x = Math.atan2(vy, horizSpeed) * 0.2
        groupRef.current.rotation.z = 0
      }
      
      if (onPositionUpdate) {
        onPositionUpdate({
          x: groupRef.current.position.x,
          y: groupRef.current.position.y,
          z: groupRef.current.position.z,
          velocityX: velocityRef.current.x,
          velocityY: velocityRef.current.y,
          velocityZ: velocityRef.current.z
        })
      }
      
      // Fire lasers aiming at nearest fighter
      if (Math.random() > 0.3 && groupRef.current && fightersData?.current) {
        const myPos = groupRef.current.position
        let nearestDist = Infinity
        let targetDir = new THREE.Vector3(0, 0, 1)
        
        for (const fighter of fightersData.current) {
          const dx = fighter.x - myPos.x
          const dy = fighter.y - myPos.y
          const dz = fighter.z - myPos.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          
          if (dist < nearestDist) {
            nearestDist = dist
            targetDir = new THREE.Vector3(dx, dy, dz).normalize()
          }
        }
        
        const direction = targetDir
        const birthTime = lastTime.current + 0.001
        
        setLasers(prev => [...prev, {
          offset: laserStartOffset,
          direction: [direction.x, direction.y, direction.z] as [number, number, number],
          birthTime
        }].slice(-3))
      }
    }
  })
  
  useFrame((state) => {
    currentTimeRef.current = state.clock.getElapsedTime()
    
    if (groupRef.current) {
      setLasers(prev => prev.filter(laser => {
        const age = currentTimeRef.current - laser.birthTime
        return age >= 0 && age < 1
      }))
    }
  })
  
  return (
    <group>
      <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
        <primitive object={scene} scale={0.5} />
        <pointLight color="#ffffff" intensity={2} distance={15} />
        
        {/* Lasers are inside the group now, with relative positions */}
        {/* {lasers.map((laser, idx) => {
          const age = currentTimeRef.current - laser.birthTime
          const dirVec = new THREE.Vector3(laser.direction[0], laser.direction[1], laser.direction[2])
          const offset = new THREE.Vector3(laser.offset[0], laser.offset[1], laser.offset[2])
          
          // Travel from start offset based on age and direction
          const speed = 40
          const travelDist = age * speed
          const laserPos = offset.add(dirVec.clone().multiplyScalar(travelDist))
          
          // Calculate dynamic rotations based on current group rotation
          const localDir = new THREE.Vector3(0, 0, 1).applyEuler(groupRef.current!.rotation)
          const dynRot = [-Math.PI / 2, 0, 0] // Base rotation for cylinders
          
          // Your fixed rotation offset: [-Math.PI / 3.5, 0.4, -10]
          const rotOffset = [-0.3, 0, 0]
          
          if (age < 0 || age > 1) return null
          
          return (
            <mesh 
              key={idx} 
              position={[laserPos.x, laserPos.y, laserPos.z]} 
              rotation={[dynRot[0] + rotOffset[0], dynRot[1] + rotOffset[1], dynRot[2] + rotOffset[2]]}
            >
              <cylinderGeometry args={[0.15, 0.15, 8]} />
              <meshBasicMaterial color="#00ff00" toneMapped={false} />
              <pointLight color="#00ff00" intensity={8} distance={12} />
            </mesh>
          )
        })} */}
      </group>
    </group>
  )
}
