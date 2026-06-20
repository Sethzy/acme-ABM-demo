import { AbmReferenceSections } from "./AbmReferenceSections";
import { Header } from "./Header";
import { HeroSection3d } from "./HeroSection3d";

export function AcmeDemoPage() {
  return (
    <div className="landing-shell min-h-[100dvh] bg-[var(--color-surface)] text-[var(--color-ink)]">
      <Header />
      <main>
        <HeroSection3d />
        <AbmReferenceSections />
      </main>
    </div>
  );
}
