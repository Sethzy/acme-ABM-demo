import { HeroShell } from "./HeroShared";
import { GlobeVisual } from "./globe/GlobeVisual";

export function HeroSection3d() {
  return (
    <HeroShell variant="globe">
      <div className="hero-globe-scene">
        <GlobeVisual />
      </div>
    </HeroShell>
  );
}
