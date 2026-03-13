import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Sun: React.FC = () => {
  const sunMeshRef = useRef<Mesh>(null)
  const [externalTexture, setExternalTexture] = useState<THREE.Texture | null>(null)
  
  const proceduralTexture = useMemo(() => {
    /* eslint-disable react-hooks/purity */
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 256
    const ctx = canvas.getContext('2d')!
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 256)
    gradient.addColorStop(0, '#FF4500')
    gradient.addColorStop(0.3, '#FF6347')
    gradient.addColorStop(0.6, '#FFD700')
    gradient.addColorStop(0.8, '#FFF8DC')
    gradient.addColorStop(1, '#FFFFFF')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 512, 256)
    
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 256
      const intensity = 0.7 + Math.random() * 0.3
      const size = 2 + Math.random() * 4
      
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 150, 50, ${intensity * 0.3})`
      ctx.fill()
    }
    /* eslint-enable react-hooks/purity */
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    
    return texture
  }, [])

  // Rotate sun on its axis
  useFrame((state, delta) => {
    if (sunMeshRef.current) {
      sunMeshRef.current.rotation.y += delta * 0.2
    }
  })
  
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load('/textures/sun.jpg',
      (texture) => setExternalTexture(texture),
      undefined,
      () => {}
    )
  }, [])

  const sunTexture = externalTexture || proceduralTexture

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={sunMeshRef}>
        <sphereGeometry args={[12, 64, 64]} />
        <meshBasicMaterial 
          map={sunTexture}
          toneMapped={false}
        />
      </mesh>
      
      {/* Multiple soft glow layers for smooth gradient effect */}
      {[14, 16, 18, 20, 22].map((radius, idx) => (
        <mesh key={`glow-${idx}`}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial 
            color="#FF6B22"
            transparent 
            opacity={0.1 - idx * 0.015}
            toneMapped={false}
            side={THREE.BackSide}
          />
        </mesh>
      ))}
      
      {/* Gradual soft illumination - multiple spaced lights */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#FFF8E7" distance={900} decay={3} />
      <pointLight position={[5, 0, 0]} intensity={1.5} color="#FFE4B5" distance={850} decay={3.2} />
      <pointLight position={[-5, 0, 0]} intensity={1.5} color="#FFE4B5" distance={850} decay={3.2} />
      <pointLight position={[0, 5, 0]} intensity={1.2} color="#FFF0D0" distance={750} decay={3.5} />
      <pointLight position={[0, -5, 0]} intensity={1.2} color="#FFF0D0" distance={750} decay={3.5} />
      
      {/* Wide ambient for soft fill */}
      <ambientLight intensity={0.3} color="#505070" />
    </group>
  )
}

export default Sun
