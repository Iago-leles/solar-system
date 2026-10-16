import React, { useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'
import { Lasers, getNosePoint, type LasersHandle } from './Lasers'

const modelPath = '/3d_models/fighter.glb'

useGLTF.preload(modelPath)

const MODEL_SCALE = 0.15
// The heading below adds PI, so the model's nose points along local -Z
const LOCAL_FORWARD = new THREE.Vector3(0, 0, -1)

interface SpaceFighterProps {
  id: number
  falconData: React.RefObject<{ 
    x: number; y: number; z: number; 
    velocityX: number; velocityY: number; velocityZ: number;
  }>
  onPositionUpdate?: (pos: { x: number; y: number; z: number }) => void
}

export const SpaceFighter: React.FC<SpaceFighterProps> = ({ id, falconData, onPositionUpdate }) => {
  const { scene } = useGLTF(modelPath)
  const groupRef = React.useRef<Group>(null)
  // Each fighter needs its own copy of the model. Clone once, not on every render
  const localScene = useMemo(() => scene.clone(), [scene])
  
  const lasersRef = useRef<LasersHandle>(null)
  const nextShot = useRef(1 + id * 0.3)
  const nose = useMemo(() => getNosePoint(localScene, MODEL_SCALE, 'z', -1), [localScene])
  const shotOrigin = useMemo(() => new THREE.Vector3(), [])
  const shotDirection = useMemo(() => new THREE.Vector3(), [])
  const worldQuaternion = useMemo(() => new THREE.Quaternion(), [])
  
  useFrame((state) => {
    if (groupRef.current && falconData.current) {
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
      
      // Report position to parent
      if (onPositionUpdate) {
        onPositionUpdate({ 
          x: groupRef.current.position.x, 
          y: groupRef.current.position.y, 
          z: groupRef.current.position.z 
        })
      }
      
      const dx = targetX - groupRef.current.position.x
      const dy = targetY - groupRef.current.position.y
      const dz = targetZ - groupRef.current.position.z
      
      groupRef.current.rotation.y = Math.atan2(dx, dz) + Math.PI
      groupRef.current.rotation.x = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz))
      groupRef.current.rotation.z = 0
      
      // Light shots from the nose, along the direction the fighter is facing
      const time = state.clock.getElapsedTime()
      if (time > nextShot.current) {
        const group = groupRef.current
        group.updateMatrixWorld()
        shotOrigin.copy(nose)
        group.localToWorld(shotOrigin)
        shotDirection.copy(LOCAL_FORWARD).applyQuaternion(group.getWorldQuaternion(worldQuaternion)).normalize()
        lasersRef.current?.fire(shotOrigin, shotDirection)
        nextShot.current = time + 0.6 + Math.random() * 0.8
      }
    }
  })
  
  return (
    <group>
      <group ref={groupRef} position={[-60 - id * 18, 25 + id * 8, -70 - id * 18]}>
        <primitive object={localScene} scale={MODEL_SCALE} />
        <ambientLight intensity={0.5} />
      </group>
      <Lasers ref={lasersRef} color="#39ff6a" />
    </group>
  )
}
