# Animated Pixel Header Brand Design

## Goal

Refine the upper-left homepage brand into a compact, animated pixel lockup without changing its navigation behavior or causing layout overlap.

## Final visual direction

- Keep the existing 48 × 48 pixel-avatar artwork.
- Replace the current custom 5 × 7 wordmark with the Silkscreen pixel typeface at weight 700.
- Use a compact desktop letter spacing of `-2.7px` and a narrow-screen letter spacing of `-2.25px`.
- Keep the avatar-to-wordmark gap at `10px` on desktop and `9px` on narrow screens.
- Preserve the existing blue-gray brand color so the lockup remains consistent with the rest of the portfolio.

## Motion

- The avatar remains stationary.
- Three square snow pixels sit just outside the avatar at the upper-left, right edge, and lower-left edge.
- The snow pixels illuminate one at a time in a slow stepped loop of `3.2s`.
- Each snow pixel is about 3 × 3 CSS pixels, with a pale icy fill and blue outline.
- The animation must stay inside the brand component's reserved area. It must not change layout dimensions, move the wordmark, or overlap the navigation.
- When `prefers-reduced-motion: reduce` is active, the snow animation is disabled.

CSS animation is preferred over an encoded GIF because it keeps the pixels crisp, adds no image payload, and can respect reduced-motion preferences while matching the approved preview.

## Behavior and accessibility

- The avatar, snow frame, and wordmark remain inside one link with `href="#overview"` and the accessible name `Hao Chen`.
- Keyboard focus behavior remains unchanged.
- The decorative avatar, wordmark graphic, and snow pixels do not introduce duplicate accessible text.
- The animation is decorative and does not communicate state or information.

## Asset strategy

- Bundle the selected Silkscreen font locally in the repository rather than loading Google Fonts at runtime.
- Use a WOFF2 webfont asset and declare it with `@font-face` and `font-display: swap`.
- Keep the existing header-avatar PNG and transparent favicon assets unchanged.
- The browser-tab favicon remains static; this design affects only the upper-left header brand selected in the browser comment.

## Responsive behavior

- Desktop: 48 × 48 avatar, 10px lockup gap, compact Silkscreen wordmark.
- Narrow screens: preserve the current responsive avatar size and reduce type size/spacing proportionally.
- The brand remains `flex: 0 0 auto`; navigation retains its current wrapping behavior.
- No element may expand the header beyond its existing responsive structure.

## Verification

- Add an end-to-end assertion that the brand still links to `#overview` and retains the accessible name `Hao Chen`.
- Assert that the snow-pixel elements exist and are decorative.
- Assert that the wordmark uses the local Silkscreen font class rather than the removed SVG wordmark.
- Re-run the existing overlap checks at desktop and narrow viewport widths.
- Verify the production build contains the local font and updated brand markup.
- Inspect the running page visually at desktop and narrow widths, including reduced-motion emulation.
