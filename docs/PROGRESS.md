# Heroes Website — Implementation Progress

## Phase 1: Foundation (Week 1–2)

### 1. Project Setup (Next.js 15 + TypeScript + Tailwind CSS 4 + ESLint/Prettier)

- [x] Initialize Next.js 15 project with App Router
- [x] TypeScript configured (`tsconfig.json` with strict mode, path aliases `@/*`)
- [x] Tailwind CSS 4 installed and configured (`@tailwindcss/postcss`, `postcss.config.mjs`)
- [x] ESLint 9 with `eslint-config-next` (core-web-vitals + typescript)
- [x] Prettier installed with `eslint-config-prettier` integration
- [x] `.prettierrc` configured (single quotes, trailing commas, 100 print width)
- [x] `.prettierignore` configured
- [x] `npm run format` and `npm run format:check` scripts added
- [x] Project directory structure created per spec:
  - [x] `components/three/` — 3D scene components
  - [x] `components/sections/` — page section components
  - [x] `components/ui/` — shared UI components
  - [x] `public/models/` — 3D model assets
  - [x] `public/images/` — optimized images
  - [x] `public/fonts/` — self-hosted font subsets
- [x] Design system CSS variables defined in `globals.css`:
  - [x] Brand colors (coral, amber, teal, void, carbon, slate, ivory, stone, ash, border)
  - [x] Font families (display, body, mono) with Apple Japan system font stack
  - [x] Heroes easing curve (`cubic-bezier(0.65, 0, 0.35, 1)`)
- [x] `layout.tsx` customized:
  - [x] Noto Sans JP loaded via `next/font/google` (weights: 100, 300, 400, 500, 700, 900)
  - [x] `<html lang="ja">` set
  - [x] Preconnect to Google Fonts CDN
  - [x] Heroes metadata (title + description in Japanese)
- [x] `page.tsx` replaced with minimal Heroes placeholder (brand colors + Japanese copy)
- [x] Default Next.js template files removed (SVGs, favicon, Geist fonts)
- [x] Build passes successfully (Turbopack, < 3s)
- [x] TypeScript type check passes (`tsc --noEmit`)
- [x] ESLint passes clean
- [x] Prettier formatting applied
- [x] Dev server starts (`npm run dev`, ~250ms ready)

### 2. Configure i18n routing (ja default, /en for English)

- [x] Install `next-intl` package
- [x] Create `i18n/routing.ts` — defineRouting with `locales: ['ja', 'en']`, `defaultLocale: 'ja'`, `localePrefix: 'as-needed'`
- [x] Create `i18n/request.ts` — getRequestConfig with dynamic message loading
- [x] Create `proxy.ts` — next-intl middleware (Next.js 16 proxy convention)
- [x] Update `next.config.ts` — createNextIntlPlugin with custom request path
- [x] Create `messages/ja.json` — Japanese translations (Meta + Hero namespaces)
- [x] Create `messages/en.json` — English translations (Meta + Hero namespaces)
- [x] Move `app/layout.tsx` → `app/[locale]/layout.tsx` with NextIntlClientProvider
- [x] Move `app/page.tsx` → `app/[locale]/page.tsx` with useTranslations hook
- [x] Dynamic `<html lang>` set from locale
- [x] Metadata generated from translations (`generateMetadata`)
- [x] Route `/` serves Japanese content (`lang="ja"`)
- [x] Route `/en` serves English content (`lang="en"`)
- [x] Build passes clean (no warnings)
- [x] TypeScript + ESLint + Prettier all pass

### 3. Implement design system: CSS variables for colors, spacing, typography

- [x] Spacing tokens in `@theme` (xs/sm/md/lg/xl/2xl/3xl → 4px–200px)
- [x] Border radius tokens (sm/card/phone-inner/phone/pill → 8px–999px)
- [x] Full type scale in `@theme` — 10 sizes with line-height + letter-spacing:
  - [x] `text-hero` — clamp(45px, 8vw, 96px), weight 900
  - [x] `text-section` — clamp(32px, 4.5vw, 60px), weight 700
  - [x] `text-challenge` — 28px, weight 700
  - [x] `text-stat` — clamp(45px, 5vw, 72px), weight 700
  - [x] `text-body-lg` — 17px, weight 300
  - [x] `text-body` — 17px, weight 300
  - [x] `text-nav` — 13px, weight 400
  - [x] `text-label` — 11px, mono, weight 500, uppercase
  - [x] `text-btn` — 12px, mono, weight 500
  - [x] `text-footer` — 11px, mono, weight 400
- [x] Typography utility classes with correct font-family + weight per role
- [x] Gradient utilities:
  - [x] `.bg-heroes-gradient` — CTA backgrounds
  - [x] `.text-heroes-gradient` — gradient text fill (background-clip)
  - [x] `.border-heroes-gradient` — 1px section dividers
  - [x] `.bg-heroes-gradient-hover` — 20% brighter hover variant
- [x] Component patterns:
  - [x] `.card` — carbon bg, border, 20px radius
  - [x] `.card-hover` — gradient border + translateY on hover
  - [x] `.btn-primary` — pill gradient button with hover effects
  - [x] `.btn-ghost` — pill border button with hover
  - [x] `.phone-frame` / `.phone-frame-inner` — 44px/34px radius, aspect-ratio
- [x] `.reveal` / `.reveal.visible` — scroll reveal pattern (IntersectionObserver)
- [x] `prefers-reduced-motion` — disables all animations
- [x] Mobile type scale override (body → 15px below 768px)
- [x] `--ease` custom property — `cubic-bezier(0.65, 0, 0.35, 1)`
- [x] `--gradient-heroes` CSS variable
- [x] Build passes (3.0s, 0 errors)
- [x] TypeScript + ESLint + Prettier all pass

### 4. Load Japanese Google Fonts with proper subsets and display strategies

- [x] Noto Sans JP loaded via `next/font/google` (weights: 100, 300, 400, 500, 700, 900)
- [x] Subsets: `latin` + `latin-ext` for broad character coverage
- [x] `font-display: swap` for non-blocking load
- [x] `preload: true` for priority loading
- [x] `adjustFontFallback: false` to prevent CLS from fallback metrics
- [x] CSS variable `--font-noto-sans-jp` integrated into font stacks
- [x] Preconnect to `fonts.googleapis.com` + `fonts.gstatic.com` in `<head>`
- [x] System fonts load instantly on Apple devices (zero network cost)
- [x] Build passes, all font weights available

### 5. Build layout components: Navbar, Footer, GrainOverlay, CustomCursor

- [x] **Navbar** (`components/ui/Navbar.tsx`):
  - [x] Fixed top, z-50, backdrop blur on scroll past hero
  - [x] Left: "Heroes" logo (bold 700)
  - [x] Center: 4 anchor links (チャレンジ/機能/インパクト/お問い合わせ) with hover opacity
  - [x] Right: ダウンロード pill button with gradient border
  - [x] Mobile: hamburger with full-screen overlay menu
  - [x] All text from `next-intl` translations (Nav namespace)
- [x] **Footer** (`components/ui/Footer.tsx`):
  - [x] Links: プライバシー/利用規約/お問い合わせ
  - [x] Social: Twitter, Instagram
  - [x] Copyright: © 2026 Heroes Inc.
  - [x] `text-footer` typography, hover underline transitions
  - [x] All text from translations (Footer namespace)
- [x] **GrainOverlay** (`components/ui/GrainOverlay.tsx`):
  - [x] Full-viewport SVG feTurbulence noise filter
  - [x] 5% opacity, `mix-blend-mode: overlay`
  - [x] `pointer-events: none`, z-100, `aria-hidden`
- [x] **CustomCursor** (`components/ui/CustomCursor.tsx`):
  - [x] 6px dot with instant mouse tracking
  - [x] 36px ring with 0.18 lerp factor
  - [x] Ring expands to 64px on interactive elements, border → coral
  - [x] Hidden on touch devices via `@media (pointer: coarse)`
  - [x] `cursor: none` on body for fine pointer devices
  - [x] MutationObserver for dynamically added interactive elements
- [x] **ScrollProgress** (`components/ui/ScrollProgress.tsx`):
  - [x] Fixed top bar, gradient fill, scaleX tied to scroll position
- [x] All components integrated in `app/[locale]/layout.tsx`
- [x] Nav + Footer i18n messages added (ja + en)
- [x] Build passes (2.3s, 0 errors, 0 warnings)
- [x] TypeScript + ESLint + Prettier all pass
- [x] All components verified rendering via curl

### 6. Set up Lenis smooth scroll integration

- [x] Install `lenis` and `gsap` packages
- [x] Create `components/ui/SmoothScroll.tsx` (client component):
  - [x] Lenis config: `lerp: 0.1`, `smoothWheel: true`, `syncTouch: true`, `touchMultiplier: 1.5`
  - [x] GSAP ScrollTrigger registered and connected to Lenis scroll events
  - [x] `gsap.ticker` drives Lenis RAF loop (synced animation frame)
  - [x] `gsap.ticker.lagSmoothing(0)` for smooth high-FPS performance
  - [x] Anchor link click handler — smooth scroll to `#section` with -80px offset (navbar clearance)
  - [x] `prefers-reduced-motion` — destroys Lenis, falls back to native scroll
  - [x] Proper cleanup: removes ticker, destroys Lenis, kills all ScrollTriggers
- [x] Integrated in `app/[locale]/layout.tsx` wrapping all page content
- [x] Build passes (1.9s, 0 errors, 0 warnings)
- [x] TypeScript + ESLint + Prettier all pass

### 7. Deploy skeleton to Vercel for continuous preview

- [x] Connect repository to Vercel
- [x] Configure build settings
- [x] Verify preview deployment

---

## Phase 2: 3D & Hero (Week 3–4)

### 1. Install 3D dependencies (React Three Fiber + Drei + Three.js)
- [x] Install `three`, `@react-three/fiber`, `@react-three/drei`
- [x] Install `@types/three` as devDependency
- [x] Verify build passes with new dependencies
- [x] Create `components/three/` base structure

### 2. Build Hero Orb scene with React Three Fiber
- [x] Create `HeroOrb.tsx` component with R3F Canvas
- [x] Inner core: IcosahedronGeometry (detail 2, radius 0.45), MeshBasicMaterial `#F2BE5E`
- [x] Core glow: SphereGeometry (radius 0.7), custom ShaderMaterial with Fresnel glow, AdditiveBlending
- [x] Wireframe shell: IcosahedronGeometry (detail 1, radius 1.4), wireframe 25% opacity
- [x] Outer shell: IcosahedronGeometry (detail 0, radius 1.9), wireframe 8% opacity, counter-rotates
- [x] Ambient particles: 400 points in spherical shell (radius 3–8), PointsMaterial 2% size, 50% opacity
- [x] Lighting: AmbientLight `#E8E2D6` 0.3, PointLight coral 1.5, PointLight cool blue 0.8
- [x] Canvas configured: transparent background, camera position, antialiasing

### 3. Implement breathing animation + mouse parallax
- [x] Breathing cycle: inner core opacity pulses 0.7–1.0 on 4s cycle
- [x] Wireframe shell: independent X/Z axis rotation
- [x] Outer shell: counter-rotation for depth parallax
- [x] Particles: sine/cosine drift oscillation
- [x] Mouse parallax: orb tilts toward cursor position
- [x] Mobile fallback: gentle auto-rotate instead of mouse tracking
- [x] `prefers-reduced-motion`: disable all orb animations

### 4. Build Hero section with text, animations, and CTAs
- [x] Full-viewport hero layout (100vh+) with 3D orb centered behind text
- [x] Top label: 「バーチャルチャレンジ · 2026」 monospace, uppercase, 11px
- [x] Main headline: gradient text fill, clamp 45–96px, weight 900
- [x] Subtitle: 18px, dimmed ivory
- [x] CTA buttons: gradient primary + ghost pill
- [x] Scroll hint: 「Scroll」 with animated line at bottom
- [x] Page load stagger sequence (0–1600ms per spec)
- [x] Content pointer-events-through to 3D canvas
- [x] Hero i18n translations added (ja + en)

### 5. Implement hero scroll-away effects
- [x] Past 50vh: content fades out (opacity 1→0, translateY 0→-40px)
- [x] Orb scales 1.0→0.85 on scroll past hero
- [x] Wireframe opacity decreases past hero ("dissolving" effect)
- [x] Particles drift outward past hero
- [x] GSAP ScrollTrigger integration for all hero scroll effects

### 6. Build medal placeholder scene (procedural cylinder)
- [x] Create `MedalScene.tsx` component
- [x] CylinderGeometry (radius 1.2, height 0.15, segments 64)
- [x] TorusGeometry rim edge (radius 1.2, tube 0.04)
- [x] MeshStandardMaterial: metalness 0.85, roughness 0.15, color `#D4A84B`
- [x] Heroes gradient as environment map reflection
- [x] Gentle float: Y-axis oscillation (amplitude 0.1, period 3s)

### 7. Set up ScrollTrigger integration for 3D scenes
- [x] GSAP ScrollTrigger `scrub: true` for medal rotation (80°→0°)
- [x] Medal scale 0.8→1.0 on scroll
- [x] Medal text fade-in at appropriate scroll position
- [x] Shared scroll-state module for R3F ↔ GSAP communication
- [x] ScrollTrigger properly synced with Lenis (via SmoothScroll component)

### 8. WebGL fallback for devices without GPU support
- [x] Detect WebGL support (canvas.getContext check)
- [x] Fallback: static gradient background + CSS animations instead of 3D
- [x] Mobile optimizations: reduce particles 400→100
- [x] Mobile DPR capped at 1.5, antialiasing disabled
- [x] Shared `lib/webgl.ts` utility for WebGL + mobile detection
- [x] Build passes, TypeScript + ESLint + Prettier all pass

## Phase 3: Content Sections (Week 5–6)
- [ ] Not started

## Phase 4: Polish & Responsive (Week 7–8)
- [ ] Not started

## Phase 5: Production Assets (Week 9–10)
- [ ] Not started

## Phase 6: Launch (Week 11)
- [ ] Not started

---

## Validation Evidence

### Phase 1.1 — Project Setup
| Check | Result |
|-------|--------|
| `npm run build` | Compiled in 2.5s, 0 errors |
| `tsc --noEmit` | 0 errors |
| `npm run lint` | 0 warnings, 0 errors |
| `npm run format:check` | All files formatted |
| `npm run dev` | Ready in ~250ms on localhost:3000 |
| Next.js version | 16.2.4 (Turbopack) |
| React version | 19.2.4 |
| Tailwind CSS | v4 |
| TypeScript | v5 (strict) |
| ESLint | v9 (flat config) |
| Prettier | v3.8.3 |

### Phase 1.2 — i18n Routing
| Check | Result |
|-------|--------|
| `npm run build` | Compiled in 2.2s, 0 warnings |
| `tsc --noEmit` | 0 errors |
| `npm run lint` | 0 warnings, 0 errors |
| `npm run format` | All files formatted |
| `curl localhost:3000` | `lang="ja"`, Japanese content |
| `curl localhost:3000/en` | `lang="en"`, English content |
| next-intl | installed, routing + request + proxy configured |
| Locale prefix | `as-needed` — `/` = ja (no prefix), `/en` = English |

### Phase 1.3 — Design System
| Check | Result |
|-------|--------|
| `npm run build` | Compiled in 3.0s, 0 errors |
| `tsc --noEmit` | 0 errors |
| `npm run lint` | 0 warnings, 0 errors |
| `npm run format` | All files formatted |
| Theme tokens | 7 spacing, 5 radius, 10 type sizes, 10 colors |
| Gradient utilities | 4 classes (bg, text, border, hover) |
| Component patterns | card, btn-primary, btn-ghost, phone-frame, reveal |
| Accessibility | `prefers-reduced-motion` disables all animations |
| HTML classes verified | All design system classes render in output |

### Phase 1.4 & 1.5 — Fonts & Layout Components
| Check | Result |
|-------|--------|
| `npm run build` | Compiled in 2.3s, 0 errors, 0 warnings |
| `tsc --noEmit` | 0 errors |
| `npm run lint` | 0 warnings, 0 errors |
| `npm run format` | All files formatted |
| Noto Sans JP | 6 weights, latin + latin-ext, swap, preload |
| Navbar | Fixed, backdrop blur, 4 nav links, download CTA, mobile hamburger |
| Footer | 3 links, 2 social, copyright, all translated |
| GrainOverlay | SVG feTurbulence, 5% opacity, mix-blend overlay |
| CustomCursor | Dot (6px) + ring (36px→64px), lerp 0.18, touch hidden |
| ScrollProgress | Gradient bar, scaleX on scroll |
| HTML verified | All components + translations render in curl output |

### Phase 1.6 — Lenis Smooth Scroll
| Check | Result |
|-------|--------|
| `npm run build` | Compiled in 1.9s, 0 errors, 0 warnings |
| `tsc --noEmit` | 0 errors |
| `npm run lint` | 0 warnings, 0 errors |
| `npm run format` | All files formatted |
| Lenis | lerp 0.1, smoothWheel, syncTouch, touchMultiplier 1.5 |
| GSAP ScrollTrigger | Registered, connected to Lenis scroll events |
| Ticker sync | gsap.ticker drives Lenis RAF, lagSmoothing(0) |
| Anchor scroll | Smooth scroll to #section with -80px navbar offset |
| Reduced motion | Lenis destroyed, falls back to native scroll |
| Cleanup | Removes ticker, destroys Lenis, kills all ScrollTriggers |
