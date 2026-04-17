# Performance & SEO

## Core Web Vitals Strategy

- **LCP**: Hero text is the LCP element. Preload fonts, render hero text within 2s. 3D loads after text.
- **FID/INP**: All interactions respond within 200ms. 3D scenes on requestAnimationFrame, never blocking main thread.
- **CLS**: All elements have explicit dimensions. Font fallback stacks prevent layout shift. Phone frames use `aspect-ratio`.

## SEO for Single-Page Scroll Site

- **SSR**: Server-side render all text content (Next.js SSR). 3D scenes hydrate client-side.
- **Semantic HTML**: `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`. Heading hierarchy h1 > h2 > h3.
- **Meta tags**: Unique `<title>` and `<meta description>` in Japanese. Open Graph with app screenshot as `og:image`.
- **Structured data**: Organization, MobileApplication, and FAQ schema (JSON-LD).
- **Canonical URL**: `https://medalhero.com/` with hreflang tags for `ja` and `en`.
- **Sitemap**: Include `sitemap.xml` with main URL.
- **robots.txt**: Allow all crawlers. Disallow `/api/` routes.

## Accessibility

- All 3D scenes: `aria-hidden="true"`, supplemented by descriptive text
- **Keyboard**: All interactive elements focusable. Custom cursor does NOT replace system focus indicators
- **Color contrast**: Warm Ivory `#E8E2D6` on Void `#0F1114` = 11.8:1 ratio (AAA)
- **Reduced motion**: Respect `prefers-reduced-motion`. Disable all scroll animations, GSAP tweens, 3D rotations. Show static fallbacks
- **Screen reader**: All sections have `aria-label` in Japanese. Image placeholders have alt text
- **Language**: `<html lang="ja">` with `lang="en"` on English-only elements
