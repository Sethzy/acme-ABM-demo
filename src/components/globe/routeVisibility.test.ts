import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { cities } from "./corridors";
import {
  BASE_GROUP_ROTATION,
  GLOBE_YAW_AMPLITUDE,
  GLOBE_YAW_FREQUENCY,
  getAnchorFrontness,
  getAnchorViewPosition,
  getPendulumRotationY,
  getRouteGate,
  getRouteDrawState,
  resetRouteClock,
  type RouteTiming,
} from "./routeVisibility";

describe("routeVisibility", () => {
  it("treats Singapore as visible at the initial globe rotation", () => {
    const group = new THREE.Group();
    group.rotation.set(
      BASE_GROUP_ROTATION.x,
      BASE_GROUP_ROTATION.y,
      BASE_GROUP_ROTATION.z,
    );

    const singaporeViewPosition = getAnchorViewPosition(group, cities.singapore);

    expect(BASE_GROUP_ROTATION.y).toBe(0.32);
    expect(singaporeViewPosition.x).toBeGreaterThan(0.04);
    expect(singaporeViewPosition.x).toBeLessThan(0.12);
    expect(singaporeViewPosition.z).toBeGreaterThan(0.9);
    expect(getAnchorFrontness(group, cities.singapore)).toBe(singaporeViewPosition.z);
    expect(getRouteGate(getAnchorFrontness(group, cities.singapore))).toEqual({
      alpha: 1,
      isOpen: true,
    });
  });

  it("smoothly fades routes near the limb and closes behind the globe", () => {
    expect(getRouteGate(0.28)).toEqual({ alpha: 1, isOpen: true });

    const fading = getRouteGate(0.18);
    expect(fading.isOpen).toBe(true);
    expect(fading.alpha).toBeGreaterThan(0);
    expect(fading.alpha).toBeLessThan(1);

    expect(getRouteGate(0.08)).toEqual({ alpha: 0, isOpen: false });
  });

  it("resets the route clock while hidden and delays new draws from Singapore", () => {
    const timing: RouteTiming = {
      delay: 0.72,
      duration: 2,
      hold: 0.5,
      fade: 0.4,
      rest: 1,
    };

    expect(resetRouteClock(4.5, false, 1)).toBe(4.5);
    expect(resetRouteClock(4.5, false, 0)).toBe(0);
    expect(getRouteDrawState(timing, 0.5)).toEqual({
      visible: false,
      progress: 0,
      opacityRatio: 0,
    });
  });

  it("restarts the route draw from the Singapore origin after the globe returns", () => {
    const timing: RouteTiming = {
      delay: 0.72,
      duration: 2,
      hold: 0.5,
      fade: 0.4,
      rest: 1,
    };

    const resetClock = resetRouteClock(8.4, false, 0);
    expect(resetClock).toBe(0);

    expect(getRouteDrawState(timing, resetClock)).toEqual({
      visible: false,
      progress: 0,
      opacityRatio: 0,
    });

    const restartedDraw = getRouteDrawState(timing, timing.delay + 0.16);
    expect(restartedDraw.visible).toBe(true);
    expect(restartedDraw.progress).toBeGreaterThan(0);
    expect(restartedDraw.opacityRatio).toBe(1);
  });

  it("keeps the animated globe yaw bounded instead of drifting to ocean", () => {
    const group = new THREE.Group();
    const sampleTimes = [
      0,
      (Math.PI / 2) / GLOBE_YAW_FREQUENCY,
      Math.PI / GLOBE_YAW_FREQUENCY,
      (Math.PI * 3 / 2) / GLOBE_YAW_FREQUENCY,
    ];

    const yawSamples = sampleTimes.map((time) => getPendulumRotationY(time));

    expect(GLOBE_YAW_AMPLITUDE).toBe(0.34);
    expect(yawSamples[0]).toBeCloseTo(BASE_GROUP_ROTATION.y, 4);
    expect(Math.max(...yawSamples)).toBeCloseTo(
      BASE_GROUP_ROTATION.y + GLOBE_YAW_AMPLITUDE,
      4,
    );
    expect(Math.min(...yawSamples)).toBeCloseTo(
      BASE_GROUP_ROTATION.y - GLOBE_YAW_AMPLITUDE,
      4,
    );

    for (const yaw of yawSamples) {
      group.rotation.set(BASE_GROUP_ROTATION.x, yaw, BASE_GROUP_ROTATION.z);
      expect(getAnchorFrontness(group, cities.singapore)).toBeGreaterThan(0.55);
    }
  });
});
