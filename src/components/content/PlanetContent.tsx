import React from 'react'
import { useUniverseStore } from '@/store/universeStore'
import solarSystemData from '@/data/solar-system.json'
import { DEATH_STAR_ID, deathStar } from '@/data/space-objects'
import { InfoSheet, StatGrid, FactList } from './InfoSheet'

type PlanetData = (typeof solarSystemData.planets)[number]
type TemperatureKey = 'day' | 'night' | 'surface' | 'average' | 'extreme' | 'cloudTops'

// One shared scale for every planet, so the bars can be compared between planets
const SCALE_MIN = -230
const SCALE_MAX = 470

const TEMPERATURE_LABELS: Record<TemperatureKey, string> = {
  day: 'Day side',
  night: 'Night side',
  surface: 'Surface',
  average: 'Average',
  extreme: 'Recorded range',
  cloudTops: 'Cloud tops'
}

const ordinal = (n: number) => {
  const suffix = n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'
  return `${n}${suffix}`
}

const toScalePercent = (celsius: number) =>
  ((celsius - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100

// "-89°C to 57°C" → [-89, 57], "430°C" → [430]
const parseCelsius = (value: string) =>
  Array.from(value.matchAll(/-?\d+(?:\.\d+)?(?=°C)/g), (m) => Number(m[0]))

const TemperatureScale: React.FC<{ planet: PlanetData; accent: string }> = ({ planet, accent }) => {
  const entries = (Object.entries(planet.temperature) as [TemperatureKey, string][])
    .map(([key, value]) => ({ key, value, numbers: parseCelsius(value) }))
    .filter((entry) => entry.numbers.length > 0)

  return (
    <div>
      <div className="relative h-10" aria-hidden="true">
        {/* Cold to hot track */}
        <div className="absolute inset-x-0 top-4 h-1.5 rounded-full bg-gradient-to-r from-[#5B8DEF] via-[#3A4150] to-[#F0703A] opacity-70" />
        {/* Water freezes at 0 °C: a fixed reference point on the scale */}
        <div
          className="absolute top-2.5 h-4 w-px bg-[#8B94AB]"
          style={{ left: `${toScalePercent(0)}%` }}
        />
        {entries.map(({ key, numbers }) =>
          numbers.length > 1 ? (
            <div
              key={key}
              className="absolute top-3.5 h-2.5 rounded-full"
              style={{
                left: `${toScalePercent(Math.min(...numbers))}%`,
                width: `${toScalePercent(Math.max(...numbers)) - toScalePercent(Math.min(...numbers))}%`,
                background: accent,
                opacity: 0.55
              }}
            />
          ) : (
            <div
              key={key}
              className="absolute top-2.5 h-4.5 w-4.5 -translate-x-1/2 rounded-full border-2 border-[#0A0E1C]"
              style={{ left: `${toScalePercent(numbers[0])}%`, background: accent }}
            />
          )
        )}
        <span className="absolute left-0 top-7 text-[11px] text-[#5E6680]">{SCALE_MIN}°</span>
        <span
          className="absolute top-7 -translate-x-1/2 text-[11px] text-[#5E6680]"
          style={{ left: `${toScalePercent(0)}%` }}
        >
          0°
        </span>
        <span className="absolute right-0 top-7 text-[11px] text-[#5E6680]">{SCALE_MAX}°</span>
      </div>

      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
        {entries.map(({ key, value }) => (
          <React.Fragment key={key}>
            <dt className="text-[#8B94AB]">{TEMPERATURE_LABELS[key]}</dt>
            <dd className="text-[#E8ECF5] tabular-nums">{value}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  )
}

// Sun plus the eight planets in order, with this one lit up
const OrbitPosition: React.FC<{ order: number; accent: string; name: string }> = ({ order, accent, name }) => (
  <div className="flex items-center gap-2" aria-label={`${name} is the ${ordinal(order)} planet from the Sun`} role="img">
    <span className="h-3 w-3 rounded-full bg-[#FFB347] shadow-[0_0_10px_#FF8C1A]" />
    <span className="h-px w-3 bg-[#2A3147]" />
    {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
      <span
        key={n}
        className="rounded-full transition-all"
        style={
          n === order
            ? { width: 10, height: 10, background: accent, boxShadow: `0 0 10px ${accent}` }
            : { width: 5, height: 5, background: '#3A4260' }
        }
      />
    ))}
  </div>
)

const PlanetSheet: React.FC<{ planet: PlanetData; onClose: () => void }> = ({ planet, onClose }) => {
  const accent = planet.colors.glow

  return (
    <InfoSheet
      title={planet.name}
      accent={accent}
      onClose={onClose}
      visual={
        <div
          className="planet-globe h-28 w-28 shrink-0 rounded-full md:h-36 md:w-36"
          style={{
            backgroundImage: `radial-gradient(circle at 32% 30%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(circle at 72% 72%, rgba(0,0,0,0.55), transparent 65%), url(/textures/${planet.id}.jpg)`,
            boxShadow: `0 0 50px -8px ${accent}, inset -14px -10px 30px rgba(0,0,0,0.65)`
          }}
          aria-hidden="true"
        />
      }
      subtitle={
        <>
          <OrbitPosition order={planet.order} accent={accent} name={planet.name} />
          <p className="mt-2 text-sm text-[#8B94AB]">{ordinal(planet.order)} planet from the Sun</p>
        </>
      }
    >
      <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-[#C3CADB]">{planet.description}</p>

      <StatGrid
        stats={[
          { label: 'Diameter', value: planet.diameter },
          { label: 'Distance from the Sun', value: planet.distance },
          { label: 'One year', value: planet.orbitalPeriod },
          { label: 'One day', value: planet.dayLength }
        ]}
      />

      <section className="mt-7">
        <h3 className="text-base font-medium">Temperature</h3>
        <div className="mt-3">
          <TemperatureScale planet={planet} accent={accent} />
        </div>
      </section>

      <section className="mt-8 grid grid-cols-[1fr_auto] items-start gap-6">
        <div>
          <h3 className="text-base font-medium">Atmosphere</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#C3CADB]">{planet.atmosphere}</p>
        </div>
        <div className="text-right">
          <p
            className="text-5xl leading-none tabular-nums"
            style={{ fontFamily: 'var(--font-instrument-serif)', color: accent }}
          >
            {planet.moons}
          </p>
          <p className="mt-1 text-[13px] text-[#8B94AB]">{planet.moons === 1 ? 'moon' : 'moons'}</p>
        </div>
      </section>

      <FactList facts={planet.facts} accent={accent} />
    </InfoSheet>
  )
}

// Drawn with CSS: grey hull, the equatorial trench and the superlaser dish in the northern half
const DeathStarPicture: React.FC = () => (
  <div
    className="relative h-28 w-28 shrink-0 rounded-full md:h-36 md:w-36"
    style={{
      background: 'radial-gradient(circle at 34% 30%, #C9CED6 0%, #8A919C 38%, #3B4049 75%, #1C1F25 100%)',
      boxShadow: `0 0 50px -12px ${deathStar.accent}, inset -14px -10px 30px rgba(0,0,0,0.6)`
    }}
    aria-hidden="true"
  >
    {/* Surface panels */}
    <div
      className="absolute inset-0 rounded-full opacity-25"
      style={{
        background:
          'repeating-linear-gradient(0deg, transparent 0 7px, rgba(0,0,0,0.45) 7px 8px), repeating-linear-gradient(90deg, transparent 0 11px, rgba(0,0,0,0.3) 11px 12px)'
      }}
    />
    {/* Equatorial trench */}
    <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-[#15181D]" />
    {/* Superlaser dish */}
    <div
      className="absolute left-[22%] top-[17%] h-[30%] w-[30%] rounded-full"
      style={{
        background: 'radial-gradient(circle at 55% 55%, #2A2F37 0 20%, #4E555F 21% 60%, #2E333B 61%)',
        boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.6)'
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: deathStar.accent, boxShadow: `0 0 8px ${deathStar.accent}` }}
      />
    </div>
  </div>
)

const DeathStarSheet: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <InfoSheet
    title={deathStar.name}
    accent={deathStar.accent}
    onClose={onClose}
    visual={<DeathStarPicture />}
    subtitle={<p className="text-sm text-[#8B94AB]">{deathStar.kind}</p>}
  >
    <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-[#C3CADB]">{deathStar.description}</p>

    <StatGrid stats={deathStar.stats} />

    <section className="mt-7 border-l-2 pl-4" style={{ borderColor: deathStar.accent }}>
      <h3 className="text-base font-medium">Its one weak point</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#C3CADB]">{deathStar.weakPoint}</p>
    </section>

    <FactList facts={deathStar.facts} accent={deathStar.accent} />
  </InfoSheet>
)

export const PlanetContent: React.FC = () => {
  const activePlanet = useUniverseStore((s) => s.activePlanet)
  const showPlanetModal = useUniverseStore((s) => s.showPlanetModal)

  if (!activePlanet || !showPlanetModal) return null

  const handleClose = () => {
    const { setShowPlanetModal, selectPlanet } = useUniverseStore.getState()
    setShowPlanetModal(false)
    selectPlanet(null)
  }

  if (activePlanet === DEATH_STAR_ID) return <DeathStarSheet onClose={handleClose} />

  const planet = solarSystemData.planets.find((p) => p.id === activePlanet)
  return planet ? <PlanetSheet key={planet.id} planet={planet} onClose={handleClose} /> : null
}
