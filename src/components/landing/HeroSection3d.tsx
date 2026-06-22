import { HeroShell } from "./HeroShared";
import { GlobeCanvas } from "@/components/globe/GlobeCanvas";

export function HeroSection3d() {
  return (
    <HeroShell variant="globe">
      <div className="hero-globe-scene hero-globe-scene-mobile-tight">
        <div
          className="hero-globe-frame relative h-[26rem] w-full sm:h-[36rem] lg:h-[40rem] xl:h-[46rem]"
          aria-hidden="true"
        >
          <div className="hero-globe-halo" aria-hidden="true" />
          <div className="hero-globe-halo-inner" aria-hidden="true" />
          <GlobeCanvas />
        </div>
      </div>
    </HeroShell>
  );
}
