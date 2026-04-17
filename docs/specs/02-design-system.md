# Design System

## Color Palette

### Primary Gradient
The Heroes gradient (top-right EC7A5C → center F2BE5E → bottom-left 375E65) is the brand's signature.

| Hex | Name | Usage |
|-----|------|-------|
| `#EC7A5C` | Coral Sunset | Top-right gradient anchor, CTA hover, accent highlights |
| `#F2BE5E` | Golden Amber | Center gradient anchor, achievement badges, warm accents |
| `#375E65` | Deep Teal | Bottom-left gradient anchor, section labels, subheadings |

**CSS**: `background: linear-gradient(135deg, #375E65 0%, #F2BE5E 50%, #EC7A5C 100%);`

### Backgrounds

| Hex | Name | Usage |
|-----|------|-------|
| `#0F1114` | Void | Page background (primary) |
| `#181B21` | Carbon | Card backgrounds, elevated surfaces |
| `#1E2128` | Slate | Navbar background (with backdrop blur) |

### Text & UI

| Hex | Name | Usage |
|-----|------|-------|
| `#E8E2D6` | Warm Ivory | Primary text on dark backgrounds |
| `#A0998A` | Stone | Secondary/dimmed text |
| `#5A5550` | Ash | Disabled text, faint labels |
| `#2A2E35` | Border | Card borders, divider lines |

## Gradient Usage Rules

- **Hero section**: Gradient as light source for 3D orb/scene, warm atmospheric glow
- **CTAs**: Full gradient as button background. Hover: shift 20% brighter
- **Section dividers**: 1px gradient line (horizontal) between major sections
- **Medal glow**: Gradient as environment reflection map for 3D medal
- **Typography accent**: Gradient text fill ONLY for hero headline and section numbers (background-clip: text)
- **Never**: Do not use gradient as full-page background. It is an accent, not a surface.

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Icon padding, tight gaps |
| `--space-sm` | 8px | Inline element spacing |
| `--space-md` | 16px | Component internal padding |
| `--space-lg` | 32px | Card padding, grid gaps |
| `--space-xl` | 64px | Section internal spacing |
| `--space-2xl` | 128px | Section vertical padding (desktop) |
| `--space-3xl` | 200px | Hero section vertical space |

## Border & Radius

- **Cards**: `border-radius: 20px` with 1px border in `#2A2E35`. Hover: border transitions to gradient (border-image)
- **Buttons**: `border-radius: 999px` (pill shape). Primary: gradient background. Ghost: 1px border
- **Phone frames**: `border-radius: 44px` (outer), `34px` (inner screen). Subtle inset shadow for realism
- **No sharp corners anywhere**. Minimum radius: 8px for any UI element

## Grain & Texture

Full-viewport SVG noise grain overlay at 4–6% opacity with `mix-blend-mode: overlay` on top of all content (`pointer-events: none`). Adds analog warmth to prevent "flat digital" feel.
