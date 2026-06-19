# Acme Demo Handover

## Source Location

Canonical local source:

```text
/Users/sethlim/Documents/acme-demo
```

Public deployment repo:

```text
https://github.com/Sethzy/acme-demo
```

Production target:

```text
https://acme-demo.vercel.app
```

## What This Is

This is a personalized Acme landing page proposal for Revolut. `/` is the canonical route; `/3d` is retained as a compatibility redirect. The experience is a polished ABM artifact, not a full product site.

## Key Files

- `app/page.tsx` and `app/3d/page.tsx`: page entrypoints.
- `app/layout.tsx`: metadata, favicon, and app shell.
- `app/globals.css`: imports the design CSS modules.
- `src/design/tokens.css`: global design tokens.
- `src/design/blueprint.css`: blueprint/grid background system.
- `src/design/landing.css`: landing, hero, globe frame, ABM card, and form styles.
- `src/content/accounts/revolut.ts`: account-specific Revolut campaign copy.
- `src/content/landingSchema.ts`: typed campaign content model.
- `src/components/landing/HeroShared.tsx`: shared hero layout, Revolut badge, headline, CTAs.
- `src/components/landing/HeroSection3d.tsx`: 3D hero composition.
- `src/components/globe/GlobeCanvas.tsx`: React wrapper for canvas sizing and reduced-motion preference.
- `src/components/globe/createGlobeScene.ts`: Three.js scene lifecycle, animation loop, reveal, resize, and cleanup.
- `src/components/globe/globeMaterials.ts`: sphere, atmosphere, rim, and camera constants.
- `src/components/globe/globeRoutes.ts`: route arcs, markers, draw timing, and opacity.
- `src/components/globe/routeVisibility.ts`: Singapore-frontness gate and route reset timing.
- `src/components/globe/landTexture.ts`: generated land-dot geometry and shader material.
- `src/generated/globe-land-dots.ts`: generated landmass dot cloud.
- `scripts/build-globe-assets.mjs`: regenerates `src/generated/globe-land-dots.ts`.
- `tests/e2e/globe-startup.spec.ts`: browser startup and reduced-motion smoke tests.
- `PRODUCT.md`, `DESIGN.md`, and `docs/`: product, design, and architecture context.

## Current Design/Behavior Notes

- Globe starts Singapore-facing.
- Globe rotates one way only.
- Routes originate from Singapore and fade out while Singapore leaves the front hemisphere.
- Route animation resets before routes reappear when Singapore comes back around.
- Reduced-motion users get a quiet static route state.
- Globe landmasses are generated as darker teal dots over an off-white sphere.
- The canvas is hidden until live WebGL is ready, preventing a poster/freeze-frame flash.
- Land dots are generated at build time and imported; the browser does not fetch country polygons at startup.

## Verification

```bash
pnpm install
pnpm generate:globe
pnpm lint
pnpm test -- --run
pnpm build
pnpm test:e2e
```

## Deployment

```bash
pnpm install
pnpm lint
pnpm test -- --run
pnpm build
vercel deploy --prod --yes --scope sethzys-projects
```

`vercel.json` pins the framework to Next.js, output directory to `.next`, and Vercel region to `sin1`.

## Handover Prompt For Another Dev

You are taking over the Acme Demo landing page. The canonical source lives at `/Users/sethlim/Documents/acme-demo`, and the public deployment repo is `https://github.com/Sethzy/acme-demo`. This is a Next.js App Router project for a personalized Revolut-facing Acme landing page. Start by reading `PRODUCT.md`, `DESIGN.md`, `src/content/accounts/revolut.ts`, `src/components/landing/HeroShared.tsx`, `src/components/globe/createGlobeScene.ts`, `src/components/globe/routeVisibility.ts`, and `src/components/landing/AbmReferenceSections.tsx`. Preserve the current visual direction: light technical blueprint surface, Revolut proposal hero, Singapore-anchored globe, off-white sphere, darker teal land dots, orange/teal/violet routes, subtle glow, and strict route gating while Singapore is visible. Before changing globe behavior, understand the route lifecycle in `routeVisibility.ts`: routes should fade out as Singapore approaches the limb, reset while hidden, and restart from Singapore when visible again. Verify every change with `pnpm lint`, `pnpm test -- --run`, `pnpm build`, and `pnpm test:e2e`.
