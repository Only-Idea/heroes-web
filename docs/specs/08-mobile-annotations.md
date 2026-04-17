# Mobile App Service Annotations

Heroes is a mobile app — the website must constantly reinforce this is an app experience.

## Floating Download Bar

- **Mobile only** — sticky bottom bar
- Text: 「無料でダウンロード」 with Apple/Google icons
- Appears after scrolling past hero
- `backdrop-filter: blur`
- Slides up on entry, dismissible with X button

## Phone Frame Motif

UI elements framed within phone-shaped containers throughout the site:
- `border-radius: 44px`, `aspect-ratio: 9/19.5`
- Subconsciously reinforces "this is a mobile app"

Used for:
- App screenshots in features section
- Map preview in challenges section
- Achievement showcase cards

## QR Code (Desktop Only)

- Appears in final CTA section
- Links to app store
- Label: 「スマホでスキャン」
- Uses Heroes gradient colors (not standard black)

## App Store Badges

Official App Store and Google Play badges appear in **three locations**:
1. Hero CTA row
2. Medal section (below "earn your medal")
3. Final CTA section

Always show both platforms side by side.

## Haptic Hint Text

In breathwork/features section:
- Callout: 「手首で感じるリズム」 (Feel the rhythm on your wrist)
- Smartwatch icon
- Emphasizes physical connection between app and body

## "Try in Your Browser" Mini-Experience

One interactive section simulates app experience on website:
- Phone-framed container with mini interactive Mapbox map
- Simulated challenge route
- User can tap/click landmarks to see info popups
- Bridges gap between browsing and downloading
