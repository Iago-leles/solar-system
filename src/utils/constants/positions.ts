// Planet positions and camera presets
export const cameraPresets = {
  overview: {
    position: [40, 40, 40] as [number, number, number],
    target: [0, 0, 0] as [number, number, number]
  },
  projects: {
    position: [15, 10, 15] as [number, number, number],
    target: [15, 0, 0] as [number, number, number],
    distance: 12
  },
  experience: {
    position: [0, 15, 25] as [number, number, number],
    target: [0, 0, 22] as [number, number, number],
    distance: 14
  },
  skills: {
    position: [25, -10, 20] as [number, number, number],
    target: [25, 0, 0] as [number, number, number],
    distance: 10
  },
  ai: {
    position: [40, -15, 10] as [number, number, number],
    target: [35, 0, 0] as [number, number, number],
    distance: 13
  },
  contact: {
    position: [50, 5, 0] as [number, number, number],
    target: [45, 0, 0] as [number, number, number],
    distance: 11
  }
}

export const orbitConfig = {
  projects: {
    radius: 15,
    inclination: 0,
    speed: 0.05,
    angle: 0
  },
  experience: {
    radius: 22,
    inclination: 0.15,
    speed: 0.04,
    angle: Math.PI / 3
  },
  skills: {
    radius: 30,
    inclination: 0.2,
    speed: 0.03,
    angle: Math.PI * 2 / 3
  },
  ai: {
    radius: 38,
    inclination: -0.2,
    speed: 0.035,
    angle: Math.PI
  },
  contact: {
    radius: 45,
    inclination: 0,
    speed: 0.025,
    angle: -Math.PI / 3
  }
}
