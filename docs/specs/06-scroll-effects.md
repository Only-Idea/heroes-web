# Scroll-Interactive Effects

## Scroll Engine Setup

Lenis for smooth scrolling (lerp-based, ~0.1 lerp factor). GSAP ScrollTrigger hooks into Lenis's scroll event.

**Lenis config**:
```js
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
  syncTouch: true,
  touchMultiplier: 1.5,
  infinite: false
});
```

## Scroll Timeline

| Scroll Range | Section | Effect |
|-------------|---------|--------|
| 0–100vh | Hero | 3D orb breathes + mouse react. Past 50vh: content fades out (opacity 1→0, translateY 0→-40px). Orb scales 1.0→0.85 |
| 100vh–130vh | Stats Bar | 3 stat numbers count up from 0. Stagger 200ms each. Gradient border fades in |
| 130vh–280vh | Challenges | Cards enter from right (translateX: 100px→0) with stagger. 3D scenes begin rendering on enter. Desktop: horizontal scroll |
| 280vh–400vh | Medal | Medal rotates 80°→0° (profile to front). Scale 0.8→1.0. Text fades in at 320vh |
| 400vh–520vh | Features | Phone mockup floats in from bottom. Feature cards fade in 150ms stagger. SVG annotation lines draw (stroke-dashoffset) |
| 520vh–620vh | Impact | Tree/ocean animates (grow/wave). Counter ticks up. Split layout slides in from opposing sides |
| 620vh–700vh | Activities | Horizontal ribbon auto-scrolls. Activity icons scale up on enter |
| 700vh–800vh | CTA | Headline typewriter effect. Buttons pulse with gradient animation |
| 800vh+ | Contact/Footer | Form fields fade in. Footer slides up |

## Scroll-Linked 3D Behaviors

- **Hero orb**: Past hero, wireframe opacity decreases + particles drift outward ("dissolving" effect)
- **Medal**: Rotation directly mapped to scroll progress (scrub: true). Scrollbar directly controls medal angle
- **Phone mockup**: CSS perspective transform. Scrolling features section: rotateY -15deg → 0deg
- **Parallax layers**: Background at 50% scroll speed, foreground at 100%. Creates depth without 3D
