# Design

## Visual Theme

Light, precise, and infrastructural. The page uses a luminous fog-white banking surface with visible technical structure: dotted maps, route arcs, soft ledger panels, coordinate labels, and restrained animation. The 3D route should feel more cinematic without leaving the same product world.

## Color

Use the existing Column-inspired palette as the base, but tint neutrals and avoid pure black/white in new code.

- Page: `oklch(0.985 0.006 220)` for luminous off-white.
- Fog band: `oklch(0.955 0.008 235)`.
- Ink: `oklch(0.19 0.055 245)`.
- Muted ink: `oklch(0.45 0.028 245)`.
- Deep plum: `#111a4a`.
- Action orange: `#ec652b`.
- Faded grid blue: `#023247`.
- Signal teal: `#167e6c`.

Color strategy: restrained with a precise accent system. Orange is the action and motion signal; plum is authority; teal/blue carry data infrastructure.

## Typography

Use the existing system sans stack. Large headlines should be compact, confident, and tightly controlled through line height and max-width rather than negative letter-spacing in new rules. Labels and data can use the existing mono stack sparingly for coordinates, rails, and code-like metadata.

## Layout

The hero is the artifact. Use the first viewport as a composed product poster: left narrative, right interactive infrastructure visual, bottom proof rail. Maintain asymmetry and avoid centered generic SaaS stacking on desktop. On mobile, keep hierarchy crisp: nav, label, headline, supporting copy, CTAs, visual, proof.

## Components

- Header: quiet floating rail, not a heavy app nav.
- CTA buttons: 8px radius, tactile borders, visible focus rings.
- Hero badge: compact product-coordinate label, not a pill for decoration.
- Proof logos: subdued but legible, with enough spacing to read as a curated strip.
- Map variant: technical route-control/product card.
- Globe variant: cinematic route-orchestration scene with the globe as the primary signal.

## Motion

Use purposeful, low-amplitude motion only. Route pulses and globe motion should support the bank-connectivity story. Respect `prefers-reduced-motion`; do not animate layout properties.

## Do

- Make both hero variants look finished enough for a portfolio case study.
- Keep the implementation scoped to hero-related components and shared hero styling.
- Use existing content and customer names.
- Verify desktop and mobile screenshots.

## Don't

- Rebuild the whole landing page.
- Add unrelated sections.
- Introduce decorative orbs, bokeh, heavy glass cards, or gradient text.
- Let text overlap or depend on viewport-scaled font sizes that can break.
