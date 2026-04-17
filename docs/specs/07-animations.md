# Animations & Micro-Interactions

## Page Load Sequence

| Time | Element | Animation |
|------|---------|-----------|
| 0ms | Dark background + grain overlay | Renders immediately |
| 200ms | Navigation bar | opacity 0→1, 600ms |
| 400ms | Hero label | translateY 20px→0, opacity 0→1 |
| 600ms | Hero title line 1 | Slides up (mask-based reveal) |
| 750ms | Hero title line 2 | Slides up (italic, gradient color) |
| 1000ms | Hero subtitle | Fades up |
| 1200ms | CTA buttons | Fade up, scale 0.95→1.0 |
| 1400ms | 3D orb | opacity 0→1 over 800ms, breathing begins |
| 1600ms | Scroll hint | Fades in at bottom |

## Easing Curve

**Primary easing**: `cubic-bezier(0.65, 0, 0.35, 1)` — smooth deceleration for all entrance animations, scroll reveals, and UI transitions. Define as CSS custom property AND GSAP ease.

## Custom Cursor (Desktop Only)

Two-element cursor:
- **Dot**: 6px, instant tracking
- **Ring**: 36px, lerped with 0.18 factor
- Ring expands to 64px on interactive elements (buttons, links, cards), border color → coral
- Hidden on touch devices: `@media (pointer: coarse)`

## Hover Effects

| Element | Hover Effect | Duration |
|---------|-------------|----------|
| Nav links | Opacity 0.7 → 1.0 | 300ms |
| Primary button | Gradient shifts 20% brighter, translateY: -2px, subtle shadow | 400ms |
| Ghost button | Border color transitions to ivory | 300ms |
| Challenge cards | Border → gradient, translateY: -6px, card glows | 500ms |
| Feature cards | Border → coral, subtle scale(1.02) | 400ms |
| Footer links | Underline draws left to right (width 0% → 100%) | 300ms |

## Scroll Reveal Pattern

All text blocks and cards use IntersectionObserver at 15% threshold:

```css
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s var(--ease), transform 1s var(--ease);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

## Mobile App Annotation Animations

Feature cards include annotation system:
- **Desktop**: Dotted SVG line draws itself from 「アプリ機能」 badge to phone mockup (stroke-dashoffset triggered on scroll)
- **Mobile**: Badge sits inline, subtle phone-frame border appears around card
- App Store / Google Play badges appear near every section mentioning app features
