import { describe, expect, it } from "vitest";
import {
  createLandDotAttributes,
  getLandDotLimbAlpha,
  type LandPolygon,
} from "./landTexture";

const testIsland: LandPolygon = {
  rings: [
    [
      [-8, -8],
      [8, -8],
      [8, 8],
      [-8, 8],
      [-8, -8],
    ],
  ],
  bounds: {
    minLng: -8,
    maxLng: 8,
    minLat: -8,
    maxLat: 8,
  },
};

describe("landTexture", () => {
  it("generates a denser land texture than the coarse globe sampling", () => {
    const coarse = createLandDotAttributes([testIsland], {
      latStep: 1.05,
      lngStep: 1.08,
    });
    const refined = createLandDotAttributes([testIsland]);

    expect(refined.positions.length).toBeGreaterThan(coarse.positions.length);
  });

  it("fades land dots at the limb while leaving front-facing dots solid", () => {
    expect(getLandDotLimbAlpha(0)).toBe(0);
    expect(getLandDotLimbAlpha(0.18)).toBeGreaterThan(0);
    expect(getLandDotLimbAlpha(0.18)).toBeLessThan(1);
    expect(getLandDotLimbAlpha(0.46)).toBe(1);
    expect(getLandDotLimbAlpha(0.8)).toBe(1);
  });
});
