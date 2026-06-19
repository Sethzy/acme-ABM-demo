import { WorldMap } from "./WorldMap";
import { HeroShell } from "./HeroShared";
import { HeroVisual } from "./HeroVisual";

export function HeroSection() {
  return (
    <HeroShell variant="map">
      <div className="hero-map-scene">
        <WorldMap
          className="hero-map-field"
          dots={[
            {
              start: { lat: 1.3521, lng: 103.8198 },
              end: { lat: 51.5074, lng: -0.1278 },
            },
            {
              start: { lat: 1.3521, lng: 103.8198 },
              end: { lat: 40.7128, lng: -74.006 },
            },
            {
              start: { lat: 22.3193, lng: 114.1694 },
              end: { lat: 35.6762, lng: 139.6503 },
            },
          ]}
        />
        <div className="hero-map-coordinates" aria-hidden="true">
          <span>SG-HQ 01.3521 N</span>
          <span>103.8198 E</span>
        </div>
        <div className="hero-map-panel">
          <HeroVisual />
        </div>
      </div>
    </HeroShell>
  );
}
