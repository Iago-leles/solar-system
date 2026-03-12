/* eslint-disable react-hooks/refs */
import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import * as THREE from 'three'

const modelPath = '/3d_models/fighter.glb'

useGLTF.preload(modelPath)

interface SpaceFighterProps {
  id: number
  falconData: React.RefObject<{ 
    x: number; y: number; z: number; 
    velocityX: number; velocityY: number; velocityZ: number;
  }>
}

// Start offset relative to group center (nose area)
const laserStartOffset: [number, number, number] = [0, 0.1, -2]

export const SpaceFighter: React.FC<SpaceFighterProps> = ({ id, falconData }) => {
  const { scene } = useGLTF(modelPath)
  const groupRef = React.useRef<Group>(null)
  const localSceneRef = useRef(scene.clone())
  const [lasers, setLasers] = useState<{ offset: [number, number, number]; birthTime: number; direction: [number, number, number] }[]>([])
  const lastAttackTime = useRef(0)
  const currentTimeRef = useRef(0)
  
  useEffect(() => {
    localSceneRef.current = scene.clone()
  }, [scene])
  
  useFrame((state) => {
    currentTimeRef.current = state.clock.getElapsedTime()
  })
  
  useFrame((state) => {
    if (groupRef.current && falconData.current) {
      const time = state.clock.getElapsedTime()
      const target = falconData.current
      
      const predictionFrames = 10
      const predictedX = target.x + target.velocityX * predictionFrames
      const predictedY = target.y + target.velocityY * predictionFrames
      const predictedZ = target.z + target.velocityZ * predictionFrames
      
      const tacticalDistance = id === 0 ? 15 : 20
      const lateralOffset = id === 0 ? 3 : 5
      const verticalOffset = 4 + id * 2
      
      const pursuitSpeed = 0.06
      const targetX = predictedX - tacticalDistance
      const targetY = predictedY + verticalOffset
      const targetZ = predictedZ + lateralOffset
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * pursuitSpeed
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * pursuitSpeed
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * pursuitSpeed
      
      const dx = targetX - groupRef.current.position.x
      const dy = targetY - groupRef.current.position.y
      const dz = targetZ - groupRef.current.position.z
      
      groupRef.current.rotation.y = Math.atan2(dx, dz) + Math.PI
      groupRef.current.rotation.x = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz))
      groupRef.current.rotation.z = 0
      
      const distToTarget = Math.sqrt(dx * dx + dy * dy + dz * dz)
      const fireInterval = 0.6
      
      // Fire lasers with current group rotation as dynamic direction
      if (time - lastAttackTime.current > fireInterval && Math.random() > 0.4 && distToTarget < 40 && groupRef.current) {
        const localDir = new THREE.Vector3(0, 0, 1)
        localDir.applyEuler(groupRef.current.rotation)
        const direction = localDir.clone().normalize()
        
        setLasers(prev => [...prev, {
          offset: laserStartOffset,
          direction: [direction.x, direction.y, direction.z] as [number, number, number],
          birthTime: state.clock.getElapsedTime()
        }].slice(-2))
        
        lastAttackTime.current = time
      }
    }
  })
  
  useFrame((state) => {
    if (groupRef.current) {
      setLasers(prev => prev.filter(laser => {
        const age = state.clock.getElapsedTime() - laser.birthTime
        return age >= 0 && age < 1
      }))
    }
  })
  
  return (
    <group>
      <group ref={groupRef} position={[-60 - id * 18, 25 + id * 8, -70 - id * 18]}>
        <primitive object={localSceneRef.current} scale={0.15} />
        <pointLight color="#ff4444" intensity={3} distance={12} />
        <ambientLight intensity={0.5} />
        
        {/* Lasers are inside the group, with relative positions */}
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
          
          // Fixed rotation offset for nose alignment
          const rotOffset = [-0.2, 0.05, 0]
          
          if (age < 0 || age > 1) return null
          
          return (
            <mesh 
              key={idx} 
              position={[laserPos.x, laserPos.y, laserPos.z]} 
              rotation={[dynRot[0] + rotOffset[0], dynRot[1] + rotOffset[1], dynRot[2] + rotOffset[2]]}
            >
              <cylinderGeometry args={[0.18, 0.18, 6]} />
              <meshBasicMaterial color="#ff0000" toneMapped={false} />
              <pointLight color="#ff0000" intensity={10} distance={15} />
            </mesh>
          )
        })} */}
      </group>
    </group>
  )
}
