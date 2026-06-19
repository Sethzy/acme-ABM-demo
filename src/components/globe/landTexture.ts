import * as THREE from "three";
import {
  globeLandDotColors,
  globeLandDotPositions,
} from "@/generated/globe-land-dots";

const DEG = Math.PI / 180;
const GLOBE_RADIUS = 1;
export const LAND_DOT_WORLD_SIZE = 0.0082;
export const LAND_DOT_LIMB_FADE_START = 0.12;
export const LAND_DOT_LIMB_FADE_END = 0.46;

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export function getLandDotLimbAlpha(facing: number) {
  return smoothstep(LAND_DOT_LIMB_FADE_START, LAND_DOT_LIMB_FADE_END, facing);
}

export function latLngToVector(lat: number, lng: number, radius = GLOBE_RADIUS) {
  const latRad = lat * DEG;
  const lngRad = lng * DEG;
  const cosLat = Math.cos(latRad);

  return new THREE.Vector3(
    radius * cosLat * Math.cos(lngRad),
    radius * Math.sin(latRad),
    radius * cosLat * Math.sin(lngRad),
  );
}

export function createLandDotGeometry() {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(globeLandDotPositions), 3),
  );
  geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(globeLandDotColors), 3),
  );

  return geometry;
}

export function createLandDotMaterial(viewportHeight: number) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthTest: true,
    depthWrite: false,
    vertexColors: true,
    uniforms: {
      dotWorldSize: { value: LAND_DOT_WORLD_SIZE },
      limbFadeStart: { value: LAND_DOT_LIMB_FADE_START },
      limbFadeEnd: { value: LAND_DOT_LIMB_FADE_END },
      viewportHeight: { value: viewportHeight },
    },
    vertexShader: `
      uniform float dotWorldSize;
      uniform float limbFadeStart;
      uniform float limbFadeEnd;
      uniform float viewportHeight;

      varying vec3 vColor;
      varying float vLimbAlpha;

      void main() {
        vColor = color;

        vec3 unitNormal = normalize(position);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vec3 viewNormal = normalize((modelViewMatrix * vec4(unitNormal, 0.0)).xyz);
        vLimbAlpha = smoothstep(limbFadeStart, limbFadeEnd, viewNormal.z);

        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = max(1.0, dotWorldSize * viewportHeight / max(0.2, -mvPosition.z));
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vLimbAlpha;

      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        float circle = 1.0 - smoothstep(0.34, 0.5, dist);
        float core = 1.0 - smoothstep(0.12, 0.46, dist);
        float alpha = circle * mix(0.46, 0.74, core) * vLimbAlpha;

        if (alpha < 0.02) discard;

        gl_FragColor = vec4(vColor, alpha);
      }
    `,
  });
}
