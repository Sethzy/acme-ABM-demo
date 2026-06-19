# Acme Demo

Standalone personalized Acme landing page for Revolut, built with Next.js App Router, React, Tailwind CSS, and a custom Three.js globe.

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://127.0.0.1:3000/`. The legacy `/3d` route redirects to `/`.

## Generated Globe Asset

The dotted landmass cloud is generated from `scripts/source/world-countries.json` into `src/generated/globe-land-dots.ts`.

```bash
pnpm generate:globe
```

Commit the generated file when the source geography or dot sampling changes.

## Verification

```bash
pnpm lint
pnpm test -- --run
pnpm build
pnpm test:e2e
```

`pnpm test:e2e` runs Chromium desktop and mobile-emulated smoke checks for the globe startup path, `/3d` redirect, and reduced-motion readiness.

## Deployment

The app deploys to Vercel as `acme-demo`. This repository is the canonical app source; the GTM workspace is not the app source of truth.
