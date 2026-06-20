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

    expect(screen.getByRole("heading", { name: /Expand into SEA markets faster with done for you bank connectivity/i })).toBeInTheDocument();
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
    expect(screen.getByRole("heading", { name: "Start from existing SEA bank coverage." })).toBeInTheDocument();
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

  it("keeps the hero globe column centered against the narrative", () => {
    const hero = readFileSync(
      join(process.cwd(), "src/components/landing/HeroShared.tsx"),
      "utf8",
    );

    expect(hero).toContain("hero-content-layer");
    expect(hero).toContain("lg:grid-cols-[0.8fr_1.2fr]");
    expect(hero).toContain("-translate-y-[5%]");
    expect(hero).toContain("xl:translate-x-4");
    expect(hero).not.toContain("lg:translate-x-4");

    const css = readFileSync(join(process.cwd(), "src/design/landing.css"), "utf8");

    expect(css).toContain(".hero-content-layer {\n    --hero-shift-y: -34px;");
    expect(css).toContain(".hero-globe-frame:has(.hero-globe-canvas.is-ready) .hero-globe-halo {\n  opacity: 0.72;");
    expect(css).toContain(".hero-globe-frame:has(.hero-globe-canvas.is-ready) .hero-globe-halo-inner {\n  opacity: 0.78;");
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

    expect(materials).toContain('OCEAN_COLOR = new THREE.Color("#edf4fb");');
    expect(materials).toContain('OCEAN_EMISSIVE_COLOR = new THREE.Color("#d6e8f7");');
    expect(materials).toContain("emissiveIntensity: 0.13");
    expect(scene).toContain("new THREE.DirectionalLight(0xf0f6ff, 2.15)");
    expect(blueprintCss).not.toContain(".hero-blueprint-layer::after");
    expect(materials).not.toContain("upperLeftLift");
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
      "Based on our research, these are the Singapore workflows we think Revolut should pressure-test first, then map bank by bank against the partners you want live.",
    );
    const cardCopy = screen.getByText(/For Revolut Business, prioritize static VA setups/i);

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
      .getByRole("heading", { name: "Start from existing SEA bank coverage." })
      .closest("section");
    const processCard = screen
      .getByRole("heading", { name: "Existing local bank coverage" })
      .closest("article");
    const shipCard = screen.getByRole("heading", { name: "Named virtual accounts" }).closest("article");
    const form = screen.getByRole("button", { name: "Request Singapore coverage review" }).closest("form");

    expect(coverageSection).toHaveClass("pt-[64px]");
    expect(coverageSection?.className).not.toContain("pt-[116px]");
    expect(processCard).toHaveClass("px-9", "py-10");
    expect(shipCard).toHaveClass("px-9", "py-10");
    expect(form).toHaveClass("px-9", "py-10");
    expect(form?.className).not.toContain("px-4");
    expect(form?.className).not.toContain("py-5");
  });
});
