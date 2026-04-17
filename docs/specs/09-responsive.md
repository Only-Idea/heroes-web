# Responsive Design Strategy

## Breakpoints

| Name | Range | Target Devices | Key Changes |
|------|-------|----------------|-------------|
| Mobile S | 320–374px | iPhone SE, older Androids | Single column, reduced spacing, no 3D particles |
| Mobile | 375–767px | Standard phones | Single column, simplified 3D, sticky download bar |
| Tablet | 768–1023px | iPad, tablets | 2-column grid, 3D at reduced quality |
| Desktop | 1024–1439px | Laptops | Full layout, custom cursor, all 3D effects |
| Desktop L | 1440px+ | Monitors | Max-width container (1400px centered), full particle count |

## Mobile-Specific Adaptations

- **Custom cursor**: Hidden on touch devices (`pointer: coarse`). Remove all `cursor: none` styles
- **3D scenes**: Particles 400→100. Wireframe shells 2→1. Draw calls halved. Target 30fps
- **Navigation**: Hamburger menu with full-screen overlay. Vertical links, min 48px touch targets
- **Cards**: Stack vertically. Remove horizontal scroll in challenges section
- **Typography**: All `clamp()` values have mobile-safe minimums. Body min 15px
- **Spacing**: Section padding 200px → 80px vertical
- **Images**: Next.js Image with responsive srcSet. WebP/AVIF with fallback
- **Sticky download bar**: Mobile only. 60px height, fixed bottom, z-index: 50
- **Touch**: Replace hover with active/focus states. `touch-action: manipulation` for buttons

## Performance by Device

| Metric | Mobile Target | Desktop Target |
|--------|--------------|----------------|
| First Contentful Paint | < 1.5s | < 1.0s |
| Largest Contentful Paint | < 2.5s | < 2.0s |
| Total Bundle Size (JS) | < 300KB gzipped | < 500KB gzipped |
| 3D Scene Init Time | < 1s (deferred) | < 500ms |
| Cumulative Layout Shift | < 0.05 | < 0.05 |
| Lighthouse Score | 90+ | 95+ |
