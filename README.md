# 3D Solar System Explorer

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Three.js](https://img.shields.io/badge/Three.js-r160-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 About

A fully interactive 3D Solar System Explorer built with modern web technologies. Explore the solar system like never before - navigate through space in real-time, zoom in on planets, discover moons and rings, and experience dynamic space phenomena including black holes, asteroids, comets, and epic space pursuit scenes.

## 🚀 Features

### Interactive Solar System
- **8 Planets** - Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune with realistic textures
- **Orbital Mechanics** - Watch planets orbit the sun with accurate relative speeds and inclinations
- **Moons & Rings** - Saturn's iconic rings, Earth's Moon, and multiple moons for gas giants
- **Click to Explore** - Select any planet to view detailed information

### Space Phenomena
- **Black Holes** - Mysterious objects that warp space-time
- **Asteroid Fields** - Massive asteroid belt system
- **Shooting Stars** - Dynamic meteor showers
- **Comets** - Long-tailed space wanderers
- **Pulsars** - Blinking cosmic beacons
- **Alien Ships** - Mysterious UFO encounters

### Space Pursuit Scenes
- **MillenniumFalcon** - Iconic spacecraft with dynamic pursuit patterns
- **SpaceFighters** - Aggressive fighter squadrons hunting their target
- **Epic Space Battles** - Watch ships navigate and engage in tactical maneuvers

### Visual Effects
- **Realistic Lighting** - Dynamic sun illumination and planet shadows
- **Particle Systems** - Stars, nebulae, and cosmic dust
- **Camera Controls** - Full 3D navigation with mouse/touch
- **Responsive Design** - Optimized for all screen sizes

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📚 Tech Stack

### Core
- **Next.js 16** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety

### 3D & Graphics
- **Three.js** - 3D rendering engine
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Helpers and abstractions

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### State & Logic
- **Zustand** - Lightweight state management
- **React Spring** - Animation physics

## 📖 Project Structure

```
solar-system-explorer/
├── src/
│   ├── app/                # Next.js App Router pages
│   ├── components/         # React components
│   │   ├── ui/            # Base UI components
│   │   ├── universe/      # 3D universe components
│   │   ├── planets/       # Planet components
│   │   ├── space/         # Space objects (Sun, BlackHole)
│   │   ├── ships/         # Spacecraft (MillenniumFalcon, SpaceFighters)
│   │   ├── extras/        # Space phenomena (Comets, Asteroids, etc.)
│   │   ├── navigation/    # Navigation components
│   │   └── content/       # Content display components
│   ├── store/             # Zustand global state
│   ├── hooks/             # Custom React hooks
│   ├── services/          # External service integrations
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript interfaces
│   └── data/              # Space data (JSON)
├── public/
│   ├── 3d_models/         # 3D model files (.glb, .gltf)
│   ├── textures/          # Planet textures
│   └── assets/            # Static assets
└── package.json
```

## 🎮 Controls

### Navigation
- **Mouse Drag** - Rotate camera
- **Scroll/Pinch** - Zoom in/out
- **Click Planet** - View planet details
- **Right Click** - Pan camera

### Shortcuts
- **R** - Reset camera
- **Space** - Pause/Resume time
- **H** - Toggle HUD

## 🛠️ Development

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

### Customization

#### Planets Configuration

Edit `src/components/universe/Universe.tsx` to adjust:
- Planet colors and materials
- Orbit parameters (radius, speed, inclination)
- Moon configurations
- Ring settings for Saturn

#### Space Objects

Modify individual components in:
- `src/components/space/` - Sun, BlackHole
- `src/components/ships/` - Spacecraft behaviors
- `src/components/extras/` - Space phenomena

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test
```

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Build the project and deploy the `.next` folder to any Node.js hosting platform.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🌟 Credits

- Built with [Next.js](https://nextjs.org/)
- 3D powered by [Three.js](https://threejs.org/) and [React Three Fiber](https://react-three-fiber.org/)
- 3D Models from [Sketchfab](https://sketchfab.com/) and creative commons sources
- Planet textures from NASA and space agencies
- Design inspired by space exploration games