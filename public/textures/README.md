# Planet Textures Guide

This Solar System Explorer uses procedural textures by default, but you can replace them with high-quality images for a more realistic appearance.

## How to Add Planetary Textures

1. **Place images in the correct directory**:
   - Put your texture images in `public/textures/`
   - Required images:
     - `mercury.jpg` (or .png)
     - `venus.jpg` (or .png)
     - `earth.jpg` (or .png)
     - `jupiter.jpg` (or .png)
     - `saturn.jpg` (or .png)
     - `sun.jpg` (or .png) - Optional for Sun enhancement

2. **Recommended Sources for Textures**:
   - For high-quality planetary textures, NASA's image library
   - Solar System Scope (solarsystemscope.com)
   - Or search for:
     - "Mercury surface texture map"
     - "Venus texture map"
     - "Earth texture map" (night/day map preferred)
     - "Jupiter texture map"
     - "Saturn texture map"
     - "Sun texture map"

3. **Image Specifications**:
   - **Resolution**: 2048x1024 or 4096x2048 for best quality
   - **Format**: JPG or PNG
   - **Coverage**: Full equirectangular projection (flat map of sphere surface)
   - **Size**: Each file should be 1-5 MB approximately

4. **What the System Does**:
   - Tries to load external texture from `/textures/[planet-name].jpg`
   - Falls back to procedural generation if external image fails
   - Procedural textures are already built-in and coded for each planet type
   - Moons now have procedurally generated crater textures

## File Locations

```
repositorio/
├── public/
│   └── textures/
│       ├── mercury.jpg     ← Add your mercury texture here
│       ├── venus.jpg       ← Add your venus texture here
│       ├── earth.jpg       ← Add your earth texture here
│       ├── jupiter.jpg     ← Add your jupiter texture here
│       ├── saturn.jpg      ← Add your saturn texture here
│       └── sun.jpg         ← Add your sun texture here (optional)
│
└── src/
    └── components/
        └── planets/
            ├── PlanetMesh.tsx   ← Uses textures
            └── Rings.tsx
```

## After Adding Images

1. Restart the development server: `npm run dev`
2. The textures will automatically load on your planets
3. If images don't load (e.g., incorrect file name), the system uses procedural textures

## Troubleshooting

**Problem**: Textures still show procedural patterns
- **Solution**: Check filenames match exactly (case-sensitive)
- Ensure they are in `/public/textures/` folder (not inside `src/`)

**Problem**: Images don't appear at all
- **Solution**: Check your browser console for 404 errors
- Verify file formats (JPG or PNG)

**Problem**: Planet appears dark/black
- **Solution**: Ensure your texture is not too dark - it should have good contrast
- Verify the image is properly equirectangular (flat map projection)

Built entirely in code with procedural generation as fallback
