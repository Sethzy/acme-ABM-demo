# Globe Architecture

The globe is split into a React DOM boundary and an imperative Three.js scene boundary.

## Boundaries

- `src/components/globe/GlobeCanvas.tsx` owns the DOM node, canvas element, container measurement, reduced-motion preference, and ready-state class.
- `src/components/globe/createGlobeScene.ts` owns the renderer, scene, camera, animation loop, route gate, reveal timing, resize updates, and disposal.
- `src/components/globe/globeMaterials.ts` owns sphere, atmosphere, rim, and camera constants.
- `src/components/globe/globeRoutes.ts` owns route mesh creation, marker meshes, draw windows, and route opacity.
- `src/components/globe/landTexture.ts` owns generated land-dot geometry and shader material.
- `src/components/globe/routeVisibility.ts` stays pure and testable.

## Startup

The server shell renders the hero and empty canvas frame immediately. The client scene starts transparent, compiles/renders live WebGL, then marks `.hero-globe-canvas` ready. No poster image or static placeholder is used.

## Land Dots

Country geometry is a source input only. Run `pnpm generate:globe` to convert `scripts/source/world-countries.json` into `src/generated/globe-land-dots.ts`. The browser imports that generated dot cloud directly.

## Cleanup

`destroy()` cancels animation frames, disposes scene geometries/materials, and disposes the renderer. React unmount should not leave a running render loop.
