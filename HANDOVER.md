# Acme Demo Handover

## Source Location

Canonical working source in Seth's local workspace:

```text
/Users/sethlim/Documents/gtm-workspace/archive/takehome-2026-04/landing/site
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

This is a personalized Acme landing page proposal for Revolut. The default route and `/3d` route both render the 3D globe hero. The experience is designed as a polished portfolio/take-home artifact, not a full product site.

## Key Files

- `app/page.tsx` and `app/3d/page.tsx`: page entrypoints.
- `app/layout.tsx`: metadata, favicon, and app shell.
- `app/globals.css`: global tokens, hero system, badge/card styling, globe preload/fade behavior.
- `src/content/acme.ts`: page copy, CTA labels, and legacy content data.
- `src/components/landing/HeroShared.tsx`: shared hero layout, Revolut badge, headline, CTAs.
- `src/components/landing/HeroSection3d.tsx`: 3D hero composition.
- `src/components/landing/globe/GlobeVisual.tsx`: responsive globe sizing wrapper.
- `src/components/landing/globe/Globe3d.tsx`: custom Three.js globe, land dots, route arcs, markers, glow, animation loop.
- `src/components/landing/globe/routeVisibility.ts`: Singapore-frontness gate and route reset timing.
- `src/components/landing/globe/corridors.ts`: city coordinates and Singapore-origin route list.
- `src/components/landing/AbmReferenceSections.tsx`: post-hero Revolut sections, cards, and contact form.
- `public/globe/world-countries.json`: country geometry used to generate dotted landmasses.
- `public/logos/revolut.webp`: Revolut logo used in the hero badge.
- `PRODUCT.md` and `DESIGN.md`: design context for future polish passes.

## Current Design/Behavior Notes

- Globe starts Singapore-facing.
- Globe rotates one way only.
- Routes originate from Singapore and fade out while Singapore leaves the front hemisphere.
- Route animation resets before routes reappear when Singapore comes back around.
- Reduced-motion users get a quiet static route state.
- Globe landmasses are generated as darker teal dots over an off-white sphere.
- The canvas is hidden until the first rendered frames are ready, preventing a white preload flash.

## Deployment

The public repo should contain only this app, not the parent GTM workspace.

```bash
pnpm install
pnpm lint
pnpm test -- --run
pnpm build
vercel deploy --prod --yes --scope sethzys-projects
```

`vercel.json` pins the framework to Next.js, output directory to `.next`, and Vercel region to `sin1`, mirroring the NeoBot deployment style.

## Handover Prompt For Another Dev

You are taking over the Acme Demo landing page. The canonical source lives at `/Users/sethlim/Documents/gtm-workspace/archive/takehome-2026-04/landing/site`, and the public deployment repo is `https://github.com/Sethzy/acme-demo`. This is a Next.js App Router project for a personalized Revolut-facing Acme landing page. Start by reading `PRODUCT.md`, `DESIGN.md`, `app/globals.css`, `src/components/landing/HeroShared.tsx`, `src/components/landing/globe/Globe3d.tsx`, `src/components/landing/globe/routeVisibility.ts`, and `src/components/landing/AbmReferenceSections.tsx`. Preserve the current visual direction: light technical blueprint surface, Revolut proposal hero, Singapore-anchored globe, off-white sphere, darker teal land dots, orange/teal/violet routes, subtle glow, and strict route gating while Singapore is visible. Before changing globe behavior, understand the route lifecycle in `routeVisibility.ts`: routes should fade out as Singapore approaches the limb, reset while hidden, and restart from Singapore when visible again. Verify every change with `pnpm lint`, `pnpm test -- --run`, `pnpm build`, and a browser check of `/3d` on desktop and mobile.

