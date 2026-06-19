# Visual And Browser Verification

## Commands

```bash
pnpm lint
pnpm test -- --run
pnpm build
pnpm test:e2e
```

## What Browser Smoke Covers

`tests/e2e/globe-startup.spec.ts` checks:

- `/` renders the hero.
- No poster/placeholder appears.
- Exactly one globe canvas exists.
- The live canvas reaches ready state.
- `/3d` redirects to `/`.
- Reduced-motion still renders one ready static globe.

## Screenshot Baselines

The current suite intentionally uses DOM and ready-state smoke checks instead of screenshot baselines. Add `toHaveScreenshot()` baselines once the visual state is frozen enough that snapshot churn will not slow down art direction.
