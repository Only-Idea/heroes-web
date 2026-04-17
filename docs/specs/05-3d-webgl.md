# 3D / WebGL Specifications

## 3D Scenes Overview

| Scene | Location | Type | Model Source | Interaction |
|-------|----------|------|-------------|-------------|
| Hero Orb | Hero section | Procedural (Three.js) | Code-generated geometry | Mouse parallax + auto-breathe |
| Medal | Medal section | glTF model | Custom 3D model or placeholder | Scroll-driven rotation |
| Fuji Landscape | Challenge card | glTF or heightmap | Placeholder terrain mesh | Gentle auto-rotate |
| Phone Float | Features section | CSS 3D + images | Screenshot images in CSS frame | Cursor tilt (gyroscope on mobile) |
| Globe | Optional hero alt | Procedural sphere | Mapbox-style texture | Drag to rotate |

## Hero Orb — Detailed Spec

Four layers:

1. **Inner core**: IcosahedronGeometry (detail: 2, radius: 0.45). MeshBasicMaterial color `#F2BE5E`. Opacity pulses 0.7–1.0 on 4s breathing cycle.

2. **Core glow**: SphereGeometry (radius: 0.7). Custom ShaderMaterial with Fresnel-based glow using gradient colors. AdditiveBlending, transparent, BackSide rendering.

3. **Wireframe shell**: IcosahedronGeometry (detail: 1, radius: 1.4). Wireframe MeshBasicMaterial in `#E8E2D6` at 25% opacity. Rotates on X and Z axes independently.

4. **Outer shell**: IcosahedronGeometry (detail: 0, radius: 1.9). Wireframe at 8% opacity. Counter-rotates for depth parallax.

**Ambient particles**: 400 points in spherical shell (radius 3–8). PointsMaterial 2% size, 50% opacity. Drift with sine/cosine oscillation.

**Lighting**:
- AmbientLight (`#E8E2D6`, 0.3 intensity)
- PointLight at (3, 2, 4) coral (`#F0A07C`, 1.5 intensity)
- PointLight at (-4, -2, 2) cool blue (`#8AB4D4`, 0.8 intensity)

## Medal Scene — Detailed Spec

Procedural placeholder (if no custom glTF):
- CylinderGeometry (radius: 1.2, height: 0.15, segments: 64)
- TorusGeometry (radius: 1.2, tube: 0.04) for rim edge
- MeshStandardMaterial: metalness 0.85, roughness 0.15, color `#D4A84B`
- Environment map: Heroes gradient as equirectangular HDR
- Scroll-driven: entry 80° profile → midpoint 0° front (GSAP ScrollTrigger interpolate rotation.y)
- Gentle float: Y-axis oscillation (amplitude: 0.1, period: 3s)

## Performance Budgets

| Metric | Target | Fallback Strategy |
|--------|--------|-------------------|
| Total 3D model weight | < 1.5 MB (all combined) | Draco compression; LOD for mobile |
| Texture resolution | Max 1024×1024 | 512×512 on mobile |
| Draw calls per scene | < 50 | Merge geometries |
| Target FPS | 60fps desktop, 30fps mobile | Reduce particles 400 → 100 on mobile |
| WebGL context | 1 shared renderer | R3F portals to share GL context |
| Fallback (no WebGL) | Static gradient bg + CSS anims | Detect with Modernizr or manual check |
