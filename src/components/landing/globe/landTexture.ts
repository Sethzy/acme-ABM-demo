import * as THREE from "three";

export type Position = [number, number];

type CountryGeometry =
  | {
      type: "Polygon";
      coordinates: Position[][];
    }
  | {
      type: "MultiPolygon";
      coordinates: Position[][][];
    };

export type CountriesGeo = {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    geometry: CountryGeometry | null;
    properties: Record<string, unknown>;
  }>;
};

type Bounds = {
  minLng: number;
  maxLng: number;
  minLat: number;
  maxLat: number;
};

export type LandPolygon = {
  rings: Position[][];
  bounds: Bounds;
};

type LandDotOptions = {
  latStep?: number;
  lngStep?: number;
};

const DEG = Math.PI / 180;
const GLOBE_RADIUS = 1;
const LAND_DOT_RADIUS = 1.0025;
const LAND_LAT_STEP = 0.78;
const LAND_LNG_STEP = 0.82;
const LAND_DOT_WORLD_SIZE = 0.0068;
const LAND_DOT_COLOR = new THREE.Color("#084254");
const LAND_DOT_LIFT_COLOR = new THREE.Color("#09616a");

export const LAND_DOT_LIMB_FADE_START = 0.12;
export const LAND_DOT_LIMB_FADE_END = 0.46;

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export function getLandDotLimbAlpha(facing: number) {
  return smoothstep(LAND_DOT_LIMB_FADE_START, LAND_DOT_LIMB_FADE_END, facing);
}

export function normalizeCountries(countries: CountriesGeo): LandPolygon[] {
  const polygons: LandPolygon[] = [];

  for (const feature of countries.features) {
    const geometry = feature.geometry;
    if (!geometry) continue;

    if (geometry.type === "Polygon") {
      addPolygon(polygons, geometry.coordinates);
      continue;
    }

    for (const polygon of geometry.coordinates) {
      addPolygon(polygons, polygon);
    }
  }

  return polygons;
}

function addPolygon(polygons: LandPolygon[], rings: Position[][]) {
  const exterior = rings[0];
  if (!exterior?.length) return;

  polygons.push({
    rings,
    bounds: getBounds(exterior),
  });
}

function getBounds(ring: Position[]): Bounds {
  let minLng = Infinity;
  let maxLng = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  for (const [lng, lat] of ring) {
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  }

  return { minLng, maxLng, minLat, maxLat };
}

function pointInRing(lng: number, lat: number, ring: Position[]) {
  let inside = false;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [lngI, latI] = ring[i];
    const [lngJ, latJ] = ring[j];
    const crosses = latI > lat !== latJ > lat;

    if (!crosses) continue;

    const projectedLng =
      ((lngJ - lngI) * (lat - latI)) / (latJ - latI + Number.EPSILON) + lngI;

    if (lng < projectedLng) inside = !inside;
  }

  return inside;
}

function isLand(lng: number, lat: number, polygons: LandPolygon[]) {
  for (const polygon of polygons) {
    const { bounds, rings } = polygon;
    if (
      lng < bounds.minLng ||
      lng > bounds.maxLng ||
      lat < bounds.minLat ||
      lat > bounds.maxLat
    ) {
      continue;
    }

    if (!pointInRing(lng, lat, rings[0])) continue;

    for (let i = 1; i < rings.length; i += 1) {
      if (pointInRing(lng, lat, rings[i])) return false;
    }

    return true;
  }

  return false;
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

export function createLandDotAttributes(
  polygons: LandPolygon[],
  options: LandDotOptions = {},
) {
  const positions: number[] = [];
  const colors: number[] = [];
  const latStep = options.latStep ?? LAND_LAT_STEP;
  const lngStep = options.lngStep ?? LAND_LNG_STEP;
  let row = 0;

  for (let lat = -83.6; lat <= 83.6; lat += latStep) {
    const cosLat = Math.max(Math.cos(lat * DEG), 0.16);
    const count = Math.max(20, Math.round((360 / lngStep) * cosLat));
    const offset = row % 2 === 0 ? 0 : 0.5;

    for (let index = 0; index < count; index += 1) {
      const lng = -180 + ((index + offset) / count) * 360;
      if (!isLand(lng, lat, polygons)) continue;

      const point = latLngToVector(lat, lng, LAND_DOT_RADIUS);
      positions.push(point.x, point.y, point.z);

      const regionalTint = Math.max(0, Math.sin((lat + 12) * DEG)) * 0.16;
      const color = LAND_DOT_COLOR.clone().lerp(LAND_DOT_LIFT_COLOR, regionalTint);
      colors.push(color.r, color.g, color.b);
    }

    row += 1;
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
  };
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
        float alpha = circle * mix(0.48, 0.76, core) * vLimbAlpha;

        if (alpha < 0.02) discard;

        gl_FragColor = vec4(vColor, alpha);
      }
    `,
  });
}
