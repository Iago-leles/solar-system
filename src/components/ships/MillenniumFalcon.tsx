 
import React, { useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'
import { Lasers, getNosePoint, type LasersHandle } from './Lasers'

const modelPath = '/3d_models/millennium_falcon.glb'

useGLTF.preload(modelPath)

const MODEL_SCALE = 0.5
// The heading below adds PI/2, so the model's nose points along local -X
const LOCAL_FORWARD = new THREE.Vector3(-1, 0, 0)

export const MillenniumFalcon: React.FC<{ 
  position?: [number, number, number]; 
  rotation?: number;
  onPositionUpdate?: (pos: { x: number; y: number; z: number; velocityX: number; velocityY: number; velocityZ: number }) => void;
}> = 
  ({ position = [-20, 0, -30], rotation = 0, onPositionUpdate }) => {
  const { scene } = useGLTF(modelPath)
  const groupRef = React.useRef<Group>(null)
  
  const baseY = position[1]
  const lastPos = useRef({ x: 0, y: 0, z: 0 })
  const velocityRef = useRef({ x: 0, y: 0, z: 0 })
  const lastTime = useRef(0)
  
  const lasersRef = useRef<LasersHandle>(null)
  const nextShot = useRef(1)
  const nose = useMemo(() => getNosePoint(scene, MODEL_SCALE, 'x', -1), [scene])
  const shotOrigin = useMemo(() => new THREE.Vector3(), [])
  const shotDirection = useMemo(() => new THREE.Vector3(), [])
  const worldQuaternion = useMemo(() => new THREE.Quaternion(), [])
  
  useFrame((state) => {
    lastTime.current = state.clock.getElapsedTime()
    
    if (groupRef.current) {
      const time = lastTime.current
      const cycleRadius = 60
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
      
      // Light shots from the nose, along the direction the ship is facing
      if (time > nextShot.current) {
        const group = groupRef.current
        group.updateMatrixWorld()
        shotOrigin.copy(nose)
        group.localToWorld(shotOrigin)
        shotDirection.copy(LOCAL_FORWARD).applyQuaternion(group.getWorldQuaternion(worldQuaternion)).normalize()
        lasersRef.current?.fire(shotOrigin, shotDirection)
        nextShot.current = time + 0.5 + Math.random() * 0.9
      }
    }
  })
  
  return (
    <group>
      <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
        <primitive object={scene} scale={MODEL_SCALE} />
      </group>
      <Lasers ref={lasersRef} color="#ff3b3b" />
    </group>
  )
}
