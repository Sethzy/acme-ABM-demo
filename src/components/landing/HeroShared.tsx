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
      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1280px] flex-col px-5 pb-5 pt-[112px] sm:px-8 sm:pb-7 sm:pt-[116px] lg:px-10 lg:pt-[120px] xl:px-0">
        <div className="hero-reveal-layer hero-content-layer grid flex-1 items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 xl:gap-10">
          <HeroNarrative variant={variant} />
          <div className="relative z-10 min-h-[24rem] lg:min-h-[36rem] xl:translate-x-6 2xl:translate-x-10">
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
    <div className="relative z-20 max-w-[36.5rem] -translate-y-[5%] pt-1 lg:ml-4 lg:pt-3 xl:ml-6">
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
      <h1 className="mt-6 max-w-[15.5ch] text-balance text-[48px] font-light leading-[1.07] tracking-normal text-[var(--color-ink)] sm:max-w-[21ch] sm:text-[60px] lg:text-[57px]">
        {acmeContent.hero.headline}
      </h1>
      <p className="mt-6 max-w-[34rem] text-[18px] font-normal leading-[1.45] tracking-normal text-[color-mix(in_srgb,var(--color-ink)_78%,var(--color-ink-muted))] sm:text-[20px] sm:leading-[1.4]">
        {acmeContent.hero.subhead}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
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
