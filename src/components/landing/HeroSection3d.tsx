import { HeroShell } from "./HeroShared";
import { GlobeCanvas } from "@/components/globe/GlobeCanvas";

export function HeroSection3d() {
  return (
    <HeroShell variant="globe">
      <div className="hero-globe-scene hero-globe-scene-mobile-tight">
        <div
          className="hero-globe-frame relative h-[25rem] w-full sm:h-[31rem] lg:h-[38rem] xl:h-[42rem]"
          aria-hidden="true"
        >
          <div className="hero-globe-halo" aria-hidden="true" />
          <GlobeCanvas />
        </div>
      </div>
    </HeroShell>
  );
}
