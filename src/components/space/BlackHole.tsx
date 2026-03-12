import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import type { Mesh, Points } from 'three'

interface BlackHoleProps {
  position?: [number, number, number]
}

export const BlackHole: React.FC<BlackHoleProps> = ({ position = [70, 0, 0] }) => {
  const blackHoleRef = useRef<Mesh>(null)
  const particlesRef = useRef<Points>(null)
  
  // Generate accretion disk particles
  const particles = useMemo(() => {
    /* eslint-disable react-hooks/purity */
    const positions: number[] = []
    const colors: number[] = []
    
    for (let i = 0; i < 500; i++) {
      // Random radius for accretion disk (8-15 units from center)
      const angle = Math.random() * Math.PI * 2
      const radius = 8 + Math.random() * 7
      
      positions.push(
        radius * Math.cos(angle),
        0,
        radius * Math.sin(angle)
      )
      
      // Orange/red colors for hot matter
      const hue = 0.8 + Math.random() * 0.2
      colors.push(hue, 0.6 + Math.random() * 0.2, 1)
    }
    /* eslint-enable react-hooks/purity */
    
    return { positions, colors }
  }, [])
  
  // Rotate accretion disk
  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.75
    }
    
    if (blackHoleRef.current) {
      // Black hole pulsing effect
      blackHoleRef.current.scale.setScalar(2.35)
    }
  })
  
  return (
    <group position={position}>
      {/* Black hole event horizon */}
      <mesh ref={blackHoleRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Accretion disk (glow ring) */}
      <mesh rotation={[Math.PI / 1.75, 0, 0]}>
        <ringGeometry args={[4.5, 8, 64]} />
        <meshBasicMaterial 
          color="#FF6B35" 
          transparent 
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8.5, 12, 64]} />
        <meshBasicMaterial 
          color="#FF512F" 
          transparent 
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Particles for accretion disk */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={new Float32Array(particles.positions)}
            itemSize={3}
            args={[new Float32Array(particles.positions), 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={new Float32Array(particles.colors)}
            itemSize={3}
            args={[new Float32Array(particles.colors), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.3}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      {/* Subtle gravitational distortion (visual effect) */}
      <mesh>
        <sphereGeometry args={[16, 32, 32]} />
        <meshBasicMaterial 
          color="#0F0F23" 
          transparent 
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Event horizon glow */}
      <pointLight 
        position={[0, 0, 0]} 
        intensity={0.3} 
        color="#FF4500"
        distance={30}
      />
    </group>
  )
}

export default BlackHole
