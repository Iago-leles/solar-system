import React from 'react'
import { Canvas } from '@react-three/fiber'
import { cn } from '@/utils/helpers'
import * as THREE from 'three'

interface SceneProps {
  children: React.ReactNode
  className?: string
}

export const Scene: React.FC<SceneProps> = ({ children, className }) => {
  return (
    <div className={cn('w-full h-screen', className)}>
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 75,
          near: 0.1,
          far: 500,
          position: [0, 60, 80]
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        onCreated={(state) => {
          // ?debug exposes the R3F state so renderer.info can be read from the console
          if (new URLSearchParams(window.location.search).has('debug')) {
            ;(window as unknown as { __r3f: typeof state }).__r3f = state
          }
        }}
      >
        {children}
      </Canvas>
    </div>
  )
}
