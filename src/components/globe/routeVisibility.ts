import * as THREE from "three";
import type { City } from "./corridors";

export type RouteTiming = {
  delay: number;
  duration: number;
  hold: number;
  fade: number;
  rest: number;
};

export type RouteDrawState = {
  visible: boolean;
  progress: number;
  opacityRatio: number;
};

const DEG = Math.PI / 180;

export const ROTATION_SPEED = 0.036;
export const SINGAPORE_FRONT_ON = 0.28;
export const SINGAPORE_FRONT_OFF = 0.08;
export const ROUTE_FADE_SPEED = 6;
export const BASE_GROUP_ROTATION = {
  x: -0.1,
  y: 0.32,
  z: -0.045,
} as const;

export function smoothstep(edge0: number, edge1: number, value: number) {
  const t = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export function getAnchorViewPosition(group: THREE.Object3D, city: City) {
  const latRad = city.lat * DEG;
  const lngRad = city.lng * DEG;
  const cosLat = Math.cos(latRad);

  return new THREE.Vector3(
    cosLat * Math.cos(lngRad),
    Math.sin(latRad),
    cosLat * Math.sin(lngRad),
  ).applyEuler(group.rotation);
}

export function getAnchorFrontness(group: THREE.Object3D, city: City) {
  return getAnchorViewPosition(group, city).z;
}

export function getRouteGate(frontness: number) {
  const alpha = smoothstep(SINGAPORE_FRONT_OFF, SINGAPORE_FRONT_ON, frontness);

  return {
    alpha,
    isOpen: frontness > SINGAPORE_FRONT_OFF,
  };
}

export function approachRouteAlpha(current: number, target: number, delta: number) {
  const next = THREE.MathUtils.lerp(
    current,
    target,
    THREE.MathUtils.clamp(delta * ROUTE_FADE_SPEED, 0, 1),
  );

  if (target === 0 && next < 0.01) return 0;
  if (target === 1 && next > 0.99) return 1;
  return next;
}

export function easeOutQuart(value: number) {
  return 1 - Math.pow(1 - value, 4);
}

export function getRouteDrawState(timing: RouteTiming, routeClock: number): RouteDrawState {
  const local = routeClock - timing.delay;

  if (local < 0) {
    return { visible: false, progress: 0, opacityRatio: 0 };
  }

  const cycle = timing.duration + timing.hold + timing.fade + timing.rest;
  const cycleTime = local % cycle;

  if (cycleTime < timing.duration) {
    return {
      visible: true,
      progress: easeOutQuart(cycleTime / timing.duration),
      opacityRatio: 1,
    };
  }

  if (cycleTime < timing.duration + timing.hold) {
    return { visible: true, progress: 1, opacityRatio: 1 };
  }

  if (cycleTime < timing.duration + timing.hold + timing.fade) {
    return {
      visible: true,
      progress: 1,
      opacityRatio: 1 - (cycleTime - timing.duration - timing.hold) / timing.fade,
    };
  }

  return { visible: false, progress: 0, opacityRatio: 0 };
}

export function resetRouteClock(currentClock: number, isGateOpen: boolean, routeAlpha: number) {
  return !isGateOpen && routeAlpha === 0 ? 0 : currentClock;
}
