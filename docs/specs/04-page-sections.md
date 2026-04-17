# Page Sections & Content Mapping

The website is a single continuous scroll experience divided into 10 distinct sections. Each section occupies at least 100vh with scroll-triggered entrance animations.

## Section 1: Navigation Bar (Fixed)

Fixed top navigation with backdrop blur.
- **Left**: "Heroes" logo text (system sans-serif, bold 700)
- **Center**: Anchor links — チャレンジ / 機能 / インパクト / お問い合わせ
- **Right**: 「ダウンロード」 pill button with gradient border
- On scroll past hero: background becomes solid `#1E2128` with 80% opacity

## Section 2: Hero (100vh+)

Full-viewport hero with breathing 3D orb at center. The orb uses Heroes gradient as light source.

**Overlaid content** (centered, pointer-events through to 3D):
- **Top label**: 「バーチャルチャレンジ · 2026」 monospace, uppercase, 11px
- **Main headline**: 「すべての一歩が、冒険になる。」 weight 900, clamp 45–96px, gradient text fill
- **Subtitle**: 「富士山、四十七士、日本の鉄道。歩くほど、世界が変わる。」 18px, dimmed ivory
- **CTA buttons**: 「App Storeでダウンロード」 (gradient primary) + 「もっと知る」 (ghost)
- **Scroll hint**: 「Scroll」 with animated line, monospace

**3D interaction**: Orb parallax-tilts toward cursor. Mobile: gentle auto-rotate. Breathing: 4s cycle.

## Section 3: Stats Bar

Horizontal strip with 1px gradient border top and bottom. Three animated counters (count up on scroll):
- 「3」+ チャレンジルート (Challenge routes)
- 「12」アクティビティタイプ (Activity types, including 車いす)
- 「32」+ 対応国 (Countries supported)

## Section 4: Challenge Showcase

Three horizontal cards, each representing a challenge route:
- Placeholder 3D scene or parallax image (Fuji mountain, samurai path, railway track)
- Challenge name bold 700 (富士山 / 浪人 / 鉄道)
- Brief description from brand knowledge
- CTA to explore the challenge

**Scroll**: Cards slide in from right. Desktop: horizontally scrollable. Mobile: stack vertically, staggered entrance.

## Section 5: Medal Showcase

Conversion section. 3D medal rotates center viewport, Heroes gradient as environment reflection.
- **Label**: 「本物を手に入れる」 monospace, uppercase
- **Headline**: 「デジタルバッジではない。本物のメダルを。」
- **Copy**: Each challenge unlocks a unique, premium medal shipped worldwide in original packaging
- **3D**: Gold/bronze disc with embossed design, ~400×400px viewport space

Scroll: medal rotates from profile (80°) to front-facing (0°).

## Section 6: App Feature Showcase

Floating phone mockup (3D or CSS-perspective) with cursor tilt. Feature cards fade in with scroll:
- インタラクティブマップ (Interactive Map — Mapbox, 3 styles)
- リアルタイム参加者トラッキング (Real-time participant tracking)
- チーム機能 (Team features with live chat)
- アチーブメント (10 categories, 5 rarities)
- ストリーク (Streak tracking)
- コミュニティフィード (Social feed)

**Annotations**: Each feature has 「アプリ機能」 pill badge + dotted SVG line to phone mockup (desktop). Mobile: badge inline, phone-frame border on card.

## Section 7: Environmental Impact

Split layout.
- **Left**: Animated tree/ocean illustration (or 3D scene of trees growing)
- **Right**: Text about Tree Care and Clean Ocean initiatives
- Animated counter: number of trees planted (placeholder value)

## Section 8: Activity Types

Scrolling horizontal ribbon of 12 activity type icons with labels:
ステップ / ランニング / ウォーキング / サイクリング / 水泳 / ローイング / エリプティカル / スキー / 車いす

Infinite horizontal scroll animation. Below: 「自分のペースで動く」 message.

## Section 9: Final CTA

- **Headline**: 「あなたの冒険を始めよう。」
- App Store and Google Play buttons with gradient backgrounds
- Mockup of both iOS and Android devices side by side

## Section 10: Contact & Footer

- **Form**: お名前 / メール / メッセージ (minimal styling, dark background)
- **Footer links**: プライバシー / 利用規約 / お問い合わせ
- **Social**: Twitter, Instagram
- **Copyright**: © 2026 Heroes Inc.
