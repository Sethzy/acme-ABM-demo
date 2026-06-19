import { describe, expect, it } from "vitest";
import {
  createLandDotMaterial,
  createLandDotGeometry,
  LAND_DOT_WORLD_SIZE,
  getLandDotLimbAlpha,
} from "./landTexture";
import { globeLandDotCount } from "@/generated/globe-land-dots";

describe("landTexture", () => {
  it("uses a generated land dot cloud instead of runtime polygon sampling", () => {
    const geometry = createLandDotGeometry();
    const positions = geometry.getAttribute("position");
    const colors = geometry.getAttribute("color");

    expect(globeLandDotCount).toBeGreaterThan(18_000);
    expect(positions.count).toBe(globeLandDotCount);
    expect(colors.count).toBe(globeLandDotCount);
  });

  it("uses the original soft limb fade for land dots", () => {
    expect(getLandDotLimbAlpha(0)).toBe(0);
    expect(getLandDotLimbAlpha(0.18)).toBeGreaterThan(0);
    expect(getLandDotLimbAlpha(0.18)).toBeLessThan(1);
    expect(getLandDotLimbAlpha(0.36)).toBeLessThan(1);
    expect(getLandDotLimbAlpha(0.46)).toBe(1);
    expect(getLandDotLimbAlpha(0.8)).toBe(1);
  });

  it("keeps the checkpoint land density with a modest contrast lift", () => {
    const material = createLandDotMaterial(720);

    expect(LAND_DOT_WORLD_SIZE).toBe(0.0082);
    expect(material.uniforms.dotWorldSize.value).toBe(LAND_DOT_WORLD_SIZE);
    expect(material.fragmentShader).toContain("float core = 1.0 - smoothstep(0.12, 0.46, dist);");
    expect(material.fragmentShader).toContain("mix(0.46, 0.74, core)");
  });

  it("uses a deeper teal land color matched to the cooler globe", () => {
    const geometry = createLandDotGeometry();
    const colors = geometry.getAttribute("color");

    expect(colors.count).toBeGreaterThan(0);
    expect(colors.getX(0)).toBeGreaterThan(0.05);
    expect(colors.getX(0)).toBeLessThan(0.052);
    expect(colors.getY(0)).toBeGreaterThan(0.25);
    expect(colors.getY(0)).toBeLessThan(0.258);
    expect(colors.getZ(0)).toBeGreaterThan(0.29);
    expect(colors.getZ(0)).toBeLessThan(0.292);
  });
});
