import { AbmReferenceSections } from "./AbmReferenceSections";
import { Header } from "./Header";
import { HeroSection3d } from "./HeroSection3d";

export function AcmeDemoPage() {
  return (
    <div className="min-h-[100dvh] bg-[var(--color-ghost-white)] text-[var(--color-ink-blue)]">
      <Header />
      <main>
        <HeroSection3d />
        <AbmReferenceSections />
      </main>
    </div>
  );
}
