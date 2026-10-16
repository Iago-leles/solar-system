import solarSystemData from './solar-system.json'

export const DEATH_STAR_ID = 'death-star'

// Fictional object from Star Wars. Numbers follow the films and the current canon
export const deathStar = {
  id: DEATH_STAR_ID,
  name: 'Death Star',
  kind: 'Imperial battle station',
  // Superlaser green
  accent: '#7CF29A',
  description:
    'A battle station the size of a small moon, built by the Galactic Empire. Its superlaser can destroy a whole planet with a single shot.',
  stats: [
    { label: 'Diameter', value: 'About 160 km' },
    { label: 'Built by', value: 'Galactic Empire' },
    { label: 'Main weapon', value: 'Superlaser' },
    { label: 'Fate', value: 'Destroyed at Yavin' }
  ],
  weakPoint:
    'A thermal exhaust port, two meters wide, led straight to the main reactor. One hit there was enough to set off a chain reaction.',
  facts: [
    'Its first full-power shot destroyed Alderaan, as a show of force.',
    'The weak point was planted on purpose by Galen Erso, the engineer forced to design it.',
    'The Rebel Alliance stole the plans and found the exhaust port in them.',
    'Luke Skywalker sent two proton torpedoes into the port at the Battle of Yavin.'
  ]
}

export interface ObjectSummary {
  name: string
  accent: string
}

// Name and color for anything that can be hovered or selected in the scene
export function getObjectSummary(id: string | null): ObjectSummary | null {
  if (!id) return null
  if (id === DEATH_STAR_ID) return { name: deathStar.name, accent: deathStar.accent }
  const planet = solarSystemData.planets.find((p) => p.id === id)
  return planet ? { name: planet.name, accent: planet.colors.glow } : null
}
