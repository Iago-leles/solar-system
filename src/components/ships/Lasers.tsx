import React, { useImperativeHandle, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export interface LasersHandle {
  // origin and direction are in world space. direction must be normalized
  fire: (origin: THREE.Vector3, direction: THREE.Vector3) => void
}

interface LasersProps {
  ref?: React.Ref<LasersHandle>
  color: string
  max?: number
  speed?: number
  life?: number
  length?: number
  thickness?: number
}

interface Bolt {
  origin: THREE.Vector3
  direction: THREE.Vector3
  quaternion: THREE.Quaternion
  birth: number
}

const FORWARD = new THREE.Vector3(0, 0, 1)

// Pool of laser bolts drawn as one InstancedMesh: one draw call, no lights, no React state.
// Must be mounted in world space (outside the moving ship group) so fired bolts don't follow the ship.
export const Lasers: React.FC<LasersProps> = ({
  ref,
  color,
  max = 10,
  speed = 70,
  life = 0.7,
  length = 2.4,
  thickness = 0.12
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const clockRef = useRef(0)
  const nextSlot = useRef(0)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const bolts = useMemo<Bolt[]>(
    () =>
      Array.from({ length: max }, () => ({
        origin: new THREE.Vector3(),
        direction: new THREE.Vector3(),
        quaternion: new THREE.Quaternion(),
        birth: -Infinity
      })),
    [max]
  )

  useImperativeHandle(ref, () => ({
    fire: (origin, direction) => {
      const bolt = bolts[nextSlot.current]
      nextSlot.current = (nextSlot.current + 1) % bolts.length
      bolt.origin.copy(origin)
      bolt.direction.copy(direction)
      bolt.quaternion.setFromUnitVectors(FORWARD, direction)
      bolt.birth = clockRef.current
    }
  }), [bolts])

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const now = state.clock.getElapsedTime()
    clockRef.current = now

    for (let i = 0; i < bolts.length; i++) {
      const bolt = bolts[i]
      const age = now - bolt.birth
      if (age < 0 || age > life) {
        dummy.scale.setScalar(0)
      } else {
        // The bolt's back starts at the origin, so it always leaves from the nose
        dummy.position.copy(bolt.origin).addScaledVector(bolt.direction, age * speed + length / 2)
        dummy.quaternion.copy(bolt.quaternion)
        dummy.scale.set(thickness, thickness, length)
      }
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, max]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        color={color}
        toneMapped={false}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  )
}

// Finds the tip of a model along one local axis, in the parent group's space.
// Used to place the laser origin on the nose instead of a hand-tuned offset.
export function getNosePoint(
  model: THREE.Object3D,
  scale: number,
  axis: 'x' | 'z',
  sign: 1 | -1
): THREE.Vector3 {
  const box = new THREE.Box3()
  const meshBox = new THREE.Box3()
  const toModel = new THREE.Matrix4()

  model.updateMatrixWorld(true)
  const modelInverse = model.matrixWorld.clone().invert()

  model.traverse((child) => {
    const mesh = child as THREE.Mesh
    if (!mesh.isMesh) return
    if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox()
    // Box relative to the model root, so parent transforms and the current scale don't matter
    toModel.multiplyMatrices(modelInverse, mesh.matrixWorld)
    meshBox.copy(mesh.geometry.boundingBox!).applyMatrix4(toModel)
    box.union(meshBox)
  })

  const nose = box.getCenter(new THREE.Vector3())
  nose[axis] = sign > 0 ? box.max[axis] : box.min[axis]
  return nose.multiplyScalar(scale)
}
