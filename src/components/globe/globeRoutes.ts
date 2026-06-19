import * as THREE from "three";
import { cities, corridors, type City, type Corridor } from "./corridors";
import { latLngToVector } from "./landTexture";
import {
  getRouteDrawState,
  type RouteTiming,
} from "./routeVisibility";
import { ARC_RADIUS, MARKER_RADIUS } from "./globeMaterials";

type ArcStyle = {
  color: string;
  opacity: number;
  radius: number;
  altitude: number;
};

type Marker = {
  city: City;
  style: ArcStyle;
};

export type RouteDraw = RouteTiming & {
  mesh: THREE.Mesh;
  drawCount: number;
  opacity: number;
  progress: number;
  opacityRatio: number;
};

const TONE_STYLES = {
  primary: {
    color: "#c94a1b",
    opacity: 0.9,
    radius: 0.0039,
    altitude: 0.3,
  },
  secondary: {
    color: "#08736b",
    opacity: 0.82,
    radius: 0.0028,
    altitude: 0.2,
  },
  quiet: {
    color: "#7055ad",
    opacity: 0.72,
    radius: 0.0024,
    altitude: 0.105,
  },
} satisfies Record<NonNullable<Corridor["tone"]>, ArcStyle>;

function getCorridorStyle(corridor: Corridor) {
  return TONE_STYLES[corridor.tone ?? "quiet"];
}

function corridorIsPrimary(marker: Marker) {
  return marker.style.color === TONE_STYLES.primary.color;
}

function slerpUnitVectors(start: THREE.Vector3, end: THREE.Vector3, t: number) {
  const dot = THREE.MathUtils.clamp(start.dot(end), -1, 1);
  const theta = Math.acos(dot) * t;
  const relative = end
    .clone()
    .sub(start.clone().multiplyScalar(dot))
    .normalize();

  return start
    .clone()
    .multiplyScalar(Math.cos(theta))
    .add(relative.multiplyScalar(Math.sin(theta)));
}

function makeArcCurve(corridor: Corridor, style: ArcStyle) {
  const start = latLngToVector(corridor.from.lat, corridor.from.lng, 1).normalize();
  const end = latLngToVector(corridor.to.lat, corridor.to.lng, 1).normalize();
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= 110; i += 1) {
    const t = i / 110;
    const liftedRadius = ARC_RADIUS + Math.sin(Math.PI * t) * style.altitude;
    const point = slerpUnitVectors(start, end, t).normalize().multiplyScalar(liftedRadius);
    points.push(point);
  }

  return new THREE.CatmullRomCurve3(points);
}

function createArcMesh(corridor: Corridor) {
  const style = getCorridorStyle(corridor);
  const curve = makeArcCurve(corridor, style);

  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 128, style.radius * 0.62, 8, false),
    new THREE.MeshBasicMaterial({
      color: style.color,
      transparent: true,
      opacity: style.opacity * 0.24,
      depthTest: true,
      depthWrite: false,
    }),
  );
  mesh.renderOrder = 4;
  return mesh;
}

function createRouteDraw(corridor: Corridor, index: number): RouteDraw {
  const style = getCorridorStyle(corridor);
  const isPrimary = corridor.tone === "primary";
  const curve = makeArcCurve(corridor, style);
  const geometry = new THREE.TubeGeometry(curve, 128, style.radius * 1.14, 8, false);
  geometry.setDrawRange(0, 0);

  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      color: style.color,
      transparent: true,
      opacity: style.opacity,
      depthTest: true,
      depthWrite: false,
    }),
  );

  mesh.visible = false;
  mesh.renderOrder = 7;

  return {
    mesh,
    drawCount: geometry.index?.count ?? geometry.getAttribute("position").count,
    opacity: style.opacity,
    delay: index * 0.72,
    duration: isPrimary ? 2.55 : 2.25,
    hold: isPrimary ? 0.5 : 0.42,
    fade: 0.4,
    rest: isPrimary ? 1.05 : 1.55,
    progress: -1,
    opacityRatio: 0,
  };
}

function collectMarkers(input: Corridor[]) {
  const markers = new Map<string, Marker>();

  for (const corridor of input) {
    const style = getCorridorStyle(corridor);
    const fromKey = `${corridor.from.lat}:${corridor.from.lng}`;
    const toKey = `${corridor.to.lat}:${corridor.to.lng}`;

    if (!markers.has(fromKey) || corridor.active) {
      markers.set(fromKey, { city: corridor.from, style: TONE_STYLES.primary });
    }

    markers.set(toKey, {
      city: corridor.to,
      style: corridor.active ? TONE_STYLES.primary : style,
    });
  }

  return Array.from(markers.values());
}

function createMarkerMesh(marker: Marker) {
  const normal = latLngToVector(marker.city.lat, marker.city.lng, 1).normalize();
  const markerGroup = new THREE.Group();
  const markerColor = marker.style.color;

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.018, 0.0024, 8, 36),
    new THREE.MeshBasicMaterial({
      color: markerColor,
      transparent: true,
      opacity: Math.min(marker.style.opacity + 0.1, 0.92),
      depthTest: true,
      depthWrite: false,
    }),
  );
  ring.renderOrder = 5;
  ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  markerGroup.add(ring);

  const pin = new THREE.Mesh(
    new THREE.SphereGeometry(0.0056, 14, 14),
    new THREE.MeshBasicMaterial({
      color: corridorIsPrimary(marker) ? TONE_STYLES.primary.color : marker.style.color,
      transparent: true,
      opacity: 0.92,
      depthTest: true,
      depthWrite: false,
    }),
  );
  pin.renderOrder = 6;
  markerGroup.add(pin);

  markerGroup.position.copy(normal.multiplyScalar(MARKER_RADIUS));
  return markerGroup;
}

function getFadableMaterials(object: THREE.Object3D) {
  const mesh = object as THREE.Mesh;
  const material = mesh.material;
  if (!material) return [];
  return Array.isArray(material) ? material : [material];
}

export function createRouteLayer() {
  const group = new THREE.Group();
  const draws: RouteDraw[] = [];

  corridors.forEach((corridor, index) => {
    group.add(createArcMesh(corridor));
    const draw = createRouteDraw(corridor, index);
    draws.push(draw);
    group.add(draw.mesh);
  });

  for (const marker of collectMarkers(corridors)) {
    group.add(createMarkerMesh(marker));
  }

  return { group, draws };
}

export function updateRouteDraws(draws: RouteDraw[], routeClock: number) {
  for (const draw of draws) {
    const state = getRouteDrawState(draw, routeClock);

    draw.opacityRatio = state.opacityRatio;
    draw.mesh.visible = state.visible;
    if (!state.visible) {
      draw.progress = -1;
      draw.mesh.geometry.setDrawRange(0, 0);
      continue;
    }

    if (Math.abs(draw.progress - state.progress) > 0.006 || state.progress === 1) {
      const nextDrawCount =
        state.progress >= 1
          ? draw.drawCount
          : state.progress <= 0
            ? 0
            : Math.max(6, Math.floor((draw.drawCount * state.progress) / 6) * 6);
      draw.mesh.geometry.setDrawRange(0, nextDrawCount);
      draw.progress = state.progress;
    }
  }
}

export function resetRouteDraws(draws: RouteDraw[]) {
  for (const draw of draws) {
    draw.progress = -1;
    draw.opacityRatio = 0;
    draw.mesh.visible = false;
    draw.mesh.geometry.setDrawRange(0, 0);
  }
}

export function showReducedMotionRoute(draws: RouteDraw[]) {
  draws.forEach((draw, index) => {
    const isPrimary = index === 0;
    draw.progress = isPrimary ? 1 : -1;
    draw.opacityRatio = isPrimary ? 0.72 : 0;
    draw.mesh.visible = isPrimary;
    draw.mesh.geometry.setDrawRange(0, isPrimary ? draw.drawCount : 0);
  });
}

export function setRouteLayerOpacity(routeGroup: THREE.Group, routeDraws: RouteDraw[], alpha: number) {
  const drawsByMesh = new Map(routeDraws.map((draw) => [draw.mesh, draw]));

  routeGroup.visible = alpha > 0;
  routeGroup.traverse((child) => {
    const draw = drawsByMesh.get(child as THREE.Mesh);

    for (const material of getFadableMaterials(child)) {
      if (!("opacity" in material)) continue;

      const baseOpacity =
        typeof material.userData.baseOpacity === "number"
          ? material.userData.baseOpacity
          : material.opacity;

      material.userData.baseOpacity = baseOpacity;
      material.transparent = true;
      material.opacity = baseOpacity * alpha * (draw?.opacityRatio ?? 1);
    }
  });
}

export { cities };
