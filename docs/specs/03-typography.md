# Typography (Apple Japan Style)

## Design Philosophy

Follows Apple Japan's web approach: system-native sans-serif stack. SF Pro on Apple devices, Hiragino Sans / Noto Sans JP on other platforms. Zero external font loading on Apple devices.

- All typography is sans-serif. No Mincho (serif) fonts anywhere.
- Headlines: extra-bold (700–900) for impact. Body: thin (300) for elegance.
- Visual distinction comes from font-weight, not different font families.

## Font Stack

| Role | CSS Font Stack | Weight | Usage |
|------|---------------|--------|-------|
| Display / Headlines | -apple-system, BlinkMacSystemFont, Hiragino Sans, Hiragino Kaku Gothic ProN, Noto Sans JP, Yu Gothic, Segoe UI, sans-serif | 700–900 | Hero title, section titles, stat numbers, challenge names |
| Body / UI | (same stack) | 300–500 | Body copy, navigation, descriptions, card text |
| Monospace / Labels | ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Noto Sans JP, monospace | 300–500 | Section labels (01 /), button text, footer, technical UI |

## Platform Resolution

| Platform | Resolved Font | Notes |
|----------|--------------|-------|
| macOS / iOS | SF Pro (via -apple-system) | Best rendering. No external load. |
| Windows 10/11 | Noto Sans JP (Google Fonts) | Yu Gothic as secondary fallback |
| Android | Noto Sans JP (Google Fonts) | Noto Sans CJK JP may be pre-installed |
| Linux | Noto Sans JP (Google Fonts) | Often pre-installed on Japanese Linux |

## Type Scale

| Element | Desktop Size | Mobile Size | Weight | Line Height | Letter Spacing |
|---------|-------------|-------------|--------|-------------|----------------|
| Hero title | clamp(45px, 8vw, 96px) | 34px | 900 | 1.15 | 0.02em |
| Section title | clamp(32px, 4.5vw, 60px) | 26px | 700 | 1.2 | 0.01em |
| Challenge name | 28px | 22px | 700 | 1.2 | 0.08em |
| Section label | 11px | 10px | 500 (mono) | 1.0 | 0.25em |
| Body large | 17px | 16px | 300 | 1.59 | normal |
| Body | 17px | 15px | 300 | 1.59 | normal |
| Button text | 12px | 11px | 500 (mono) | 1.0 | 0.1em |
| Nav link | 13px | 14px | 400 | 1.0 | 0.06em |
| Footer | 11px | 10px | 400 (mono) | 1.4 | 0.08em |
| Stat number | clamp(45px, 5vw, 72px) | 34px | 700 | 1.0 | 0em |

## Font Loading Strategy

- **Primary**: System fonts load instantly with zero network cost on Apple devices (majority of Japanese mobile market)
- **Fallback**: Noto Sans JP from Google Fonts CDN with `font-display: swap`. Weights: 100, 300, 400, 500, 700, 900
- **Preconnect**: `fonts.googleapis.com` and `fonts.gstatic.com` in `<head>`
- **Monospace**: ui-monospace and SFMono-Regular are system-native on Apple. No external mono font needed.

## CSS Custom Properties

```css
:root {
  --display: -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic", "Segoe UI", sans-serif;
  --body: var(--display);
  --mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Noto Sans JP", monospace;
}
```

Note: `--display` and `--body` use the same stack. The visual distinction comes entirely from font-weight (900 for display, 300 for body).
