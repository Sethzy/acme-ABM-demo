import { render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LandingPage3d from "../../../../app/3d/page";
import LandingPage from "../../../../app/page";
import { ProductSignalCard } from "../VisualPrimitives";

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

  it("locks the hero headline into explicit first-paint lines", () => {
    render(React.createElement(LandingPage));

    const heading = screen.getByRole("heading", {
      name: "Expand into SEA markets faster with done for you bank connectivity",
    });
    const lines = Array.from(heading.querySelectorAll(".hero-title-line")).map((line) =>
      line.textContent?.trim(),
    );

    expect(lines).toEqual([
      "Expand into",
      "SEA markets",
      "faster with done",
      "for you bank",
      "connectivity",
    ]);
    expect(heading.className).not.toContain("text-balance");
    expect(heading.className).not.toContain("ch");
  });

  it("uses a static globe poster for the first paint instead of a CSS placeholder", () => {
    render(React.createElement(LandingPage));

    expect(document.querySelector(".hero-globe-poster")).toHaveAttribute(
      "data-poster-src",
      "/globe/globe-initial-poster.webp",
    );
    expect(document.querySelector(".hero-globe-placeholder")).not.toBeInTheDocument();
    expect(document.querySelector(".hero-kicker-logo")).toHaveAttribute("data-fallback", "R");
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
      "Singapore workflows that get easier when bank relationships, rails, and implementation detail are already mapped.",
    );
    const cardCopy = screen.getByText(/Move faster on deposit recognition/i);

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
});

describe("VisualPrimitives", () => {
  it("renders accessible product visual labels", () => {
    render(React.createElement(ProductSignalCard));

    expect(screen.getByText("Realtime transaction feed")).toBeInTheDocument();
    expect(screen.getByText("Bank feed connected")).toBeInTheDocument();
  });
});
