import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LandingPage3d from "../../../../app/3d/page";
import LandingPage from "../../../../app/page";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

beforeEach(async () => {
  const { redirect } = await import("next/navigation");
  vi.mocked(redirect).mockClear();
});

describe("LandingPage", () => {
  it("renders the 3D globe hero as the root page", () => {
    render(React.createElement(LandingPage));

    expect(screen.getByRole("heading", { name: /Expand into SEA markets faster with implementation-ready bank connectivity/i })).toBeInTheDocument();
    expect(screen.getByText("Proposal for Revolut")).toBeInTheDocument();
    expect(screen.getByText("acme")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Products/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Developers/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Open navigation/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Get started" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore Acme coverage" })).toBeInTheDocument();
    expect(screen.queryByText("Funding Societies")).not.toBeInTheDocument();
    expect(screen.queryByText("DBS / UOB / OCBC")).not.toBeInTheDocument();
    expect(screen.queryByText("Payouts + feeds")).not.toBeInTheDocument();
    expect(screen.queryByText("API-first")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Map hero" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "3D globe" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Recommended starting points for Revolut." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What Revolut can launch faster." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "See the Singapore launch path" })).toBeInTheDocument();
  });

  it("keeps the first paint visually close to the hydrated globe hero", () => {
    render(React.createElement(LandingPage));

    expect(document.querySelector(".hero-globe-placeholder")).not.toBeInTheDocument();
    expect(document.querySelector(".hero-globe-halo")).toBeInTheDocument();
    expect(document.querySelector(".hero-globe-scene-mobile-tight")).toBeInTheDocument();
    expect(document.querySelector(".hero-kicker-logo")).toHaveAttribute("data-fallback", "R");
  });

  it("keeps the globe startup to one stable render path", () => {
    const hero = readFileSync(
      join(process.cwd(), "src/components/landing/HeroSection3d.tsx"),
      "utf8",
    );
    const canvas = readFileSync(
      join(process.cwd(), "src/components/globe/GlobeCanvas.tsx"),
      "utf8",
    );
    const scene = readFileSync(
      join(process.cwd(), "src/components/globe/createGlobeScene.ts"),
      "utf8",
    );
    const landTexture = readFileSync(
      join(process.cwd(), "src/components/globe/landTexture.ts"),
      "utf8",
    );
    const css = readFileSync(join(process.cwd(), "src/design/landing.css"), "utf8");

    expect(hero).toContain("hero-globe-frame");
    expect(hero).toContain("GlobeCanvas");
    expect(canvas).toContain("DEFAULT_GLOBE_SIZE");
    expect(canvas).toContain("createGlobeScene");
    expect(canvas).not.toContain("hero-globe-frame");
    expect(scene).toContain("compileAsync(scene, camera)");
    expect(scene).toContain("createLandDotGeometry()");
    expect(landTexture).toContain("@/generated/globe-land-dots");
    expect(scene).not.toContain("fetch(");
    expect(landTexture).not.toContain("normalizeCountries");
    expect(css).toMatch(/\.hero-reveal-layer\s*\{\s*opacity:\s*0;/);
    expect(css).toContain(".landing-shell:has(.hero-globe-canvas.is-ready) .hero-reveal-layer");
    expect(css).not.toContain(".landing-shell:not(:has(.hero-globe-canvas.is-ready)) .hero-reveal-layer");
  });

  it("keeps the proposal badge optically balanced with extra right padding", () => {
    const css = readFileSync(join(process.cwd(), "src/design/landing.css"), "utf8");

    expect(css).toContain("padding: 6px 14px 6px 10px;");
  });

  it("keeps the hero headline roomy while anchoring the globe to the right", () => {
    const hero = readFileSync(
      join(process.cwd(), "src/components/landing/HeroShared.tsx"),
      "utf8",
    );

    expect(hero).toContain("hero-content-layer");
    expect(hero).toContain("max-w-[1280px]");
    expect(hero).toContain("lg:grid-cols-[0.92fr_1.08fr]");
    expect(hero).toContain("sm:max-w-[21ch]");
    expect(hero).toContain("lg:ml-4");
    expect(hero).toContain("xl:ml-6");
    expect(hero).toContain("lg:text-[57px]");
    expect(hero).toContain("-translate-y-[5%]");
    expect(hero).toContain("xl:translate-x-6");
    expect(hero).not.toContain("lg:grid-cols-[0.8fr_1.2fr]");
    expect(hero).not.toContain("lg:translate-x-4");

    const css = readFileSync(join(process.cwd(), "src/design/landing.css"), "utf8");

    expect(css).toContain(".hero-content-layer {\n    --hero-shift-y: -34px;");
    expect(css).toContain(".hero-globe-halo {\n  pointer-events: none;");
    expect(css).toContain("left: 54%;");
    expect(css).toContain("color-mix(in srgb, #ffffff 10%, transparent) 0%");
    expect(css).toContain("filter: blur(38px);");
    expect(css).toContain(".hero-globe-frame:has(.hero-globe-canvas.is-ready) .hero-globe-halo {\n  opacity: 0.42;");
    expect(css).toContain(".hero-globe-frame:has(.hero-globe-canvas.is-ready) .hero-globe-halo-inner {\n  opacity: 0.5;");
  });

  it("tones the globe ocean without adding overlay polish", () => {
    const materials = readFileSync(
      join(process.cwd(), "src/components/globe/globeMaterials.ts"),
      "utf8",
    );
    const scene = readFileSync(
      join(process.cwd(), "src/components/globe/createGlobeScene.ts"),
      "utf8",
    );
    const blueprintCss = readFileSync(join(process.cwd(), "src/design/blueprint.css"), "utf8");

    expect(materials).toContain('OCEAN_COLOR = new THREE.Color("#e5f0fa");');
    expect(materials).toContain('OCEAN_EMISSIVE_COLOR = new THREE.Color("#cddff0");');
    expect(materials).toContain("emissiveIntensity: 0.09");
    expect(scene).toContain("new THREE.DirectionalLight(0xf0f6ff, 2.15)");
    expect(blueprintCss).not.toContain(".hero-blueprint-layer::after");
    expect(materials).not.toContain("upperLeftLift");
  });

  it("uses a standard single-weight grid and stays cleaner behind the globe", () => {
    const blueprintCss = readFileSync(join(process.cwd(), "src/design/blueprint.css"), "utf8");

    expect(blueprintCss).toContain("var(--color-border) 36%");
    expect(blueprintCss).toContain("background-size: 24px 24px;");
    expect(blueprintCss).not.toContain("192px 192px");
    expect(blueprintCss).not.toContain("var(--color-revolut-blue) 7%");
    expect(blueprintCss).toContain("color-mix(in srgb, #ffffff 58%, transparent)");
  });

  it("staggers post-hero cards without scaling them", () => {
    const sections = readFileSync(
      join(process.cwd(), "src/components/landing/AbmReferenceSections.tsx"),
      "utf8",
    );
    const css = readFileSync(join(process.cwd(), "src/design/landing.css"), "utf8");

    expect(sections).toContain("getRevealDelay(index)");
    expect(sections).toContain("reveal-stagger-item");
    expect(sections).toContain("--reveal-delay");
    expect(css).toContain(".reveal-section .reveal-stagger-item");
    expect(css).toContain("translateY(8px)");
    expect(css).toContain("transition-delay: var(--reveal-delay, 0ms);");
    const staggerBlock = css.slice(
      css.indexOf(".reveal-section .reveal-stagger-item"),
      css.indexOf(".reveal-section.is-visible .reveal-stagger-item"),
    );
    expect(staggerBlock).not.toContain("scale(");
  });

  it("presents the second fold as a bank capability ledger instead of another card grid", () => {
    render(React.createElement(LandingPage));

    expect(screen.getByText("Top 3 Singapore banks for Revolut")).toBeInTheDocument();
    expect(screen.getByText("Recommended sequence")).toBeInTheDocument();
    expect(screen.queryByText("Bank readiness · 8-12 week path")).not.toBeInTheDocument();
    expect(screen.getByText("DBS")).toBeInTheDocument();
    expect(screen.getByText("UOB")).toBeInTheDocument();
    expect(screen.getByText("OCBC")).toBeInTheDocument();
    expect(screen.queryByText("Global banks")).not.toBeInTheDocument();
    expect(screen.getByText("Primary first-bank path")).toBeInTheDocument();
    expect(screen.getByText("FAST + PayNow collections")).toBeInTheDocument();
    expect(screen.getByText("Static virtual accounts and named-account mapping")).toBeInTheDocument();

    const sections = readFileSync(
      join(process.cwd(), "src/components/landing/AbmReferenceSections.tsx"),
      "utf8",
    );
    const css = readFileSync(join(process.cwd(), "src/design/landing.css"), "utf8");

    expect(sections).toContain("abm-ledger");
    expect(sections).toContain("<colgroup>");
    expect(sections).toContain("abm-ledger-bank-inner");
    expect(sections).not.toContain("abm-ledger-status");
    expect(sections).not.toContain("Global banks");
    expect(sections).not.toContain("abm-card-grid abm-card-grid-3 abm-process-grid");
    expect(sections).not.toContain("Bank review");
    expect(sections).not.toContain("Map gaps");
    expect(sections).not.toContain("VA policy check");
    expect(sections).not.toContain("In scope");
    expect(sections).not.toContain("Dependency map");
    expect(css).toContain("table-layout: fixed;");
    expect(css).toContain(".abm-ledger-col-bank");
    expect(css).toContain(".abm-ledger-col-capability");
    expect(css).toContain(".abm-ledger-bank-inner");
    expect(css).toContain(".abm-ledger-table th:first-child,");
    expect(css).toContain("padding-left: 1.75rem;");
    expect(css).toContain("padding-left: 1.25rem;");
  });

  it("keeps rendered landing copy client-ready for a Revolut presentation", () => {
    const { container } = render(React.createElement(LandingPage));
    const renderedCopy = container.textContent?.toLowerCase() ?? "";
    const internalPhrases = [
      "based on our research",
      "we think",
      "pressure-test",
      "prototype",
      "mock",
      "restart bank discovery from zero",
      "usually slow",
      "where bank policy",
      "we'll return",
    ];

    for (const phrase of internalPhrases) {
      expect(renderedCopy).not.toContain(phrase);
    }
  });

  it("brings the globe earlier in the mobile hero viewport", () => {
    const hero = readFileSync(
      join(process.cwd(), "src/components/landing/HeroShared.tsx"),
      "utf8",
    );
    const globe = readFileSync(
      join(process.cwd(), "src/components/landing/HeroSection3d.tsx"),
      "utf8",
    );
    const css = readFileSync(join(process.cwd(), "src/design/landing.css"), "utf8");

    expect(hero).toContain("pt-[88px]");
    expect(hero).toContain("gap-4");
    expect(hero).toContain("text-[44px]");
    expect(hero).toContain("mt-5 max-w-[34rem]");
    expect(hero).toContain("mt-6 flex flex-wrap");
    expect(globe).toContain("h-[26rem]");
    expect(css).toContain(".hero-globe-scene-mobile-tight {\n    min-height: 25rem;");
  });

  it("keeps hero CTAs tactile while preserving clean focus", () => {
    const primitives = readFileSync(
      join(process.cwd(), "src/components/landing/VisualPrimitives.tsx"),
      "utf8",
    );

    expect(primitives).toContain("hover:shadow-[0_16px_34px_-16px_rgba(0,117,235,0.48)]");
    expect(primitives).toContain("hover:bg-[color-mix(in_srgb,var(--color-revolut-blue)_20%,var(--color-revolut-blue-tint))]");
    expect(primitives).toContain("group-hover:translate-x-[2px]");
    expect(primitives).toContain("focus-ring");
  });

  it("redirects the legacy 3D route to the canonical root page", async () => {
    const { redirect } = await import("next/navigation");

    LandingPage3d();

    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("keeps post-hero typography on the same semantic scale as the hero", () => {
    render(React.createElement(LandingPage));

    const sectionHeading = screen.getByRole("heading", { name: "What Revolut can launch faster." });
    const sectionCopy = screen.getByText(
      "These are the Singapore workflows Revolut can sequence first, then map bank by bank against the partners and rails selected for go-live.",
    );
    const cardCopy = screen.getByText(/For Revolut Business, prioritize static virtual-account setups/i);

    expect(sectionHeading).toHaveClass("abm-section-title");
    expect(sectionHeading.className).not.toContain("text-[96px]");
    expect(sectionCopy).toHaveClass("abm-section-copy");
    expect(cardCopy).toHaveClass("abm-card-copy");
  });

  it("keeps post-hero proof cards dense after the normalized type scale", () => {
    render(React.createElement(LandingPage));

    const card = screen.getByRole("heading", { name: "Named virtual accounts" }).closest("article");

    expect(card).toHaveClass("abm-card");
    expect(card?.className).not.toContain("min-h-[316px]");
    expect(card?.className).not.toContain("min-h-[310px]");
  });

  it("keeps mobile ABM section spacing normalized", () => {
    render(React.createElement(LandingPage));

    const coverageSection = screen
      .getByRole("heading", { name: "Recommended starting points for Revolut." })
      .closest("section");
    const shipCard = screen.getByRole("heading", { name: "Named virtual accounts" }).closest("article");
    const form = screen.getByRole("button", { name: "Request Singapore coverage review" }).closest("form");

    expect(coverageSection).toHaveClass("pt-[64px]");
    expect(coverageSection?.className).not.toContain("pt-[116px]");
    expect(shipCard).toHaveClass("px-9", "py-10");
    expect(form).toHaveClass("px-9", "py-10");
    expect(form?.className).not.toContain("px-4");
    expect(form?.className).not.toContain("py-5");
  });
});
