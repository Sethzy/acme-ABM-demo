import Image from "next/image";
import { acmeContent } from "@/content/acme";
import { ActionLink } from "./VisualPrimitives";

export function HeroShell({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "map" | "globe";
}) {
  return (
    <section className="hero-stage relative isolate flex overflow-hidden">
      <div className="hero-blueprint-layer" aria-hidden="true" />
      <div className="hero-corner-marks" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1200px] flex-col px-5 pb-5 pt-[112px] sm:px-8 sm:pb-7 sm:pt-[116px] lg:px-10 lg:pt-[120px] xl:px-0">
        <div className="hero-reveal-layer grid flex-1 items-center gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10 xl:gap-14">
          <HeroNarrative variant={variant} />
          <div className="relative z-10 min-h-[22rem] lg:min-h-[34rem] lg:translate-x-8 lg:-translate-y-[3%] xl:translate-x-12 2xl:translate-x-16">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroNarrative({ variant }: { variant: "map" | "globe" }) {
  const kicker =
    variant === "map"
      ? { code: "API", label: "Singapore coverage map" }
      : { code: null, label: acmeContent.hero.eyebrow };

  return (
    <div className="relative z-20 max-w-[36.5rem] pt-2 lg:-translate-y-10 lg:pt-4 xl:-translate-y-14 2xl:-translate-y-[72px]">
      <div className="hero-kicker">
        {kicker.code ? (
          <span className="hero-kicker-code">{kicker.code}</span>
        ) : (
          <span className="hero-kicker-logo" data-fallback="R" aria-hidden="true">
            <Image src="/logos/revolut.webp" alt="" width={34} height={34} priority />
          </span>
        )}
        <span>{kicker.label}</span>
      </div>
      <h1 className="mt-7 max-w-[15.5ch] text-balance text-[48px] font-light leading-[1.08] tracking-normal text-[var(--color-ink-blue)] sm:max-w-[19ch] sm:text-[60px] lg:text-[60px]">
        {acmeContent.hero.headline}
      </h1>
      <p className="mt-6 max-w-[35rem] text-[18px] font-normal leading-[1.43] tracking-normal text-[color-mix(in_srgb,var(--color-ink-blue)_80%,var(--color-slate-text))] sm:text-[20px] sm:leading-[1.38]">
        {acmeContent.hero.subhead}
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <ActionLink href="#contact" variant="heroPrimary">
          {acmeContent.hero.primaryCta}
        </ActionLink>
        <ActionLink href="#api" variant="heroSecondary">
          {acmeContent.hero.secondaryCta}
        </ActionLink>
      </div>
    </div>
  );
}
