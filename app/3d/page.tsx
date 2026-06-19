import { AbmReferenceSections } from "@/components/landing/AbmReferenceSections";
import { Header } from "@/components/landing/Header";
import { HeroSection3d } from "@/components/landing/HeroSection3d";

export default function LandingPage3d() {
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
