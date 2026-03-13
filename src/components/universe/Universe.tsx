import React from 'react'
import { Scene } from './Scene'
import { Lighting } from './Lighting'
import { Background } from './Background'
import { UniverseCameraControls } from './CameraControls'
import PlanetMesh from '../planets/PlanetMesh'
import { PlanetOverlay } from './PlanetOverlay'
import { PlanetContent } from '../content/PlanetContent'
import { Sun } from '../space/Sun'
import { BlackHole } from '../space/BlackHole'
import { DeathStar } from '../space/DeathStar'
import { useUniverseStore } from '@/store/universeStore'
import type { Planet } from '@/types/universe'
import { AsteroidField, BlinkingPulsar } from '../extras/SpaceExtras'
import { ShootingStar } from '../extras/ShootingStar'
import { SmallRocket } from '../extras/SmallRocket'
import { AlienShip } from '../extras/AlienShip'
import { PursuitScene } from '../ships/PursuitScene'
import ImperialShip from '../ships/ImperialShip'

export const Universe: React.FC = () => {
  const { 
    activePlanet, 
    hoveredPlanet, 
    selectPlanet
  } = useUniverseStore()
  
  const planets: Planet[] = [
    {
      id: 'mercury',
      name: 'Mercury',
      emoji: '☿',
      color: { primary: '#A0522D', secondary: '#8B4513', glow: '#D2691E' },
      size: { radius: 4.0 },
      orbit: { radius: 35, inclination: 0.05, speed: 0.2, angle: 0 },
      materials: { type: 'standard' as const, roughness: 0.2, metalness: 0.2 },
      type: 'skills' as const,
      textures: {
        imageUrl: '/textures/mercury.jpg'
      }
    },
    {
      id: 'venus',
      name: 'Venus',
      emoji: '♀',
      color: { primary: '#E6BE8A', secondary: '#C4A484', glow: '#FFC266' },
      size: { radius: 5.0 },
      orbit: { radius: 50, inclination: 0.1, speed: 0.15, angle: Math.PI / 4 },
      materials: { type: 'physical' as const, roughness: 0.15, metalness: 0.1 },
      type: 'projects' as const,
      textures: {
        imageUrl: '/textures/venus.jpg'
      }
    },
    {
      id: 'earth',
      name: 'Earth',
      emoji: '🌍',
      color: { primary: '#3B82F6', secondary: '#60A5FA', glow: '#10B981' },
      size: { radius: 5.5 },
      orbit: { radius: 70, inclination: 0, speed: 0.12, angle: Math.PI / 2 },
      materials: { type: 'standard' as const, roughness: 0.15, metalness: 0.15 },
      type: 'projects' as const,
      moons: { count: 1 },
      textures: {
        imageUrl: '/textures/earth.jpg'
      }
    },
    {
      id: 'mars',
      name: 'Mars',
      emoji: '♂',
      color: { primary: '#E74C3C', secondary: '#C0392B', glow: '#FF6B6B' },
      size: { radius: 4.5 },
      orbit: { radius: 90, inclination: 0.05, speed: 0.10, angle: Math.PI * 1.5 },
      materials: { type: 'standard' as const, roughness: 0.5, metalness: 0.1 },
      type: 'experience' as const,
      moons: { count: 2 },
      textures: {
        imageUrl: '/textures/mars.jpg'
      }
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      emoji: '♃',
      color: { primary: '#D2691E', secondary: '#CD853F', glow: '#FF8C00' },
      size: { radius: 12.0 },
      orbit: { radius: 120, inclination: 0.05, speed: 0.08, angle: Math.PI * 3 / 4 },
      materials: { type: 'physical' as const, roughness: 0.2, metalness: 0.3 },
      type: 'experience' as const,
      moons: { count: 3 },
      textures: {
        imageUrl: '/textures/jupiter.jpg'
      }
    },
    {
      id: 'saturn',
      name: 'Saturn',
      emoji: '🪐',
      color: { primary: '#F5DEB3', secondary: '#DEB887', glow: '#FFD700' },
      size: { radius: 10.0 },
      orbit: { radius: 150, inclination: 0.15, speed: 0.06, angle: Math.PI },
      materials: { type: 'standard' as const, roughness: 0.25, metalness: 0.2 },
      type: 'contact' as const,
      moons: { count: 3 },
      rings: { hasRings: true, innerRadius: 12, outerRadius: 20 },
      textures: {
        imageUrl: '/textures/saturn.jpg'
      }
    },
    {
      id: 'uranus',
      name: 'Uranus',
      emoji: '⛢',
      color: { primary: '#87CEEB', secondary: '#4682B4', glow: '#ADD8E6' },
      size: { radius: 7.0 },
      orbit: { radius: 180, inclination: 0.1, speed: 0.045, angle: Math.PI * 1.25 },
      materials: { type: 'standard' as const, roughness: 0.2, metalness: 0.1 },
      type: 'contact' as const,
      moons: { count: 3 },
      textures: {
        imageUrl: '/textures/uranus.jpg'
      }
    },
    {
      id: 'neptune',
      name: 'Neptune',
      emoji: '♆',
      color: { primary: '#4169E1', secondary: '#1E90FF', glow: '#6495ED' },
      size: { radius: 6.8 },
      orbit: { radius: 210, inclination: 0.08, speed: 0.04, angle: Math.PI * 1.75 },
      materials: { type: 'standard' as const, roughness: 0.25, metalness: 0.15 },
      type: 'ai' as const,
      moons: { count: 1 },
      textures: {
        imageUrl: '/textures/neptune.jpg'
      }
    }
  ]
  
  const handlePlanetClick = (planetId: string) => {
    selectPlanet(planetId)
  }
  
  const handlePlanetHover = (planetId: string | null, hovering: boolean) => {
    if (hovering) {
      useUniverseStore.getState().hoverPlanet(planetId)
    } else {
      useUniverseStore.getState().hoverPlanet(null)
    }
  }
  
  return (
    <>
      <Scene>
        <Lighting />
        <Background />
        <UniverseCameraControls />
        
        <Sun />
        
        {planets.map((planet) => (
          <PlanetMesh
            key={planet.id}
            planet={planet}
            isHovered={hoveredPlanet === planet.id}
            onHover={(hovering) => handlePlanetHover(planet.id, hovering)}
            onClick={() => handlePlanetClick(planet.id)}
          />
        ))}
        
        <DeathStar position={[10, 50, 100]} scale={0.02} />
        <BlackHole position={[30, -30, -250]} />
        
        <PursuitScene />
        
        <ShootingStar />
        <AlienShip />
        <ImperialShip  position={[10, 50, 110]} scale={0.004}/>
        <AsteroidField />
        <BlinkingPulsar />
      </Scene>
      
      <PlanetOverlay />
      <PlanetContent />
    </>
  )
}
