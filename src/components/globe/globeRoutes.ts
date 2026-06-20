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
  isHub?: boolean;
};

export type RouteDraw = RouteTiming & {
  mesh: THREE.Mesh;
  drawCount: number;
  opacity: number;
  progress: number;
  opacityRatio: number;
};

export type RouteLayer = {
  group: THREE.Group;
  draws: RouteDraw[];
  hubRing: THREE.Mesh | null;
  hubFlag: THREE.Mesh | null;
};

const TONE_STYLES = {
  primary: {
    color: "#0075eb",
    opacity: 0.92,
    radius: 0.0042,
    altitude: 0.34,
  },
  secondary: {
    color: "#4d9bf0",
    opacity: 0.84,
    radius: 0.003,
    altitude: 0.22,
  },
  quiet: {
    color: "#6fa8dc",
    opacity: 0.74,
    radius: 0.0025,
    altitude: 0.115,
  },
} satisfies Record<NonNullable<Corridor["tone"]>, ArcStyle>;

const HUB_ACCENT_COLOR = "#ef3340";

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
    delay: index * 0.78,
    duration: isPrimary ? 2.7 : 2.3,
    hold: isPrimary ? 0.55 : 0.45,
    fade: 0.4,
    rest: isPrimary ? 1.1 : 1.6,
    progress: -1,
    opacityRatio: 0,
  };
}

function collectMarkers(input: Corridor[]) {
  const markers = new Map<string, Marker>();
  const originCount = new Map<string, number>();

  for (const corridor of input) {
    const fromKey = `${corridor.from.lat}:${corridor.from.lng}`;
    originCount.set(fromKey, (originCount.get(fromKey) ?? 0) + 1);
  }

  let hubKey: string | null = null;
  let hubMax = 0;
  for (const [key, count] of originCount) {
    if (count > hubMax) {
      hubMax = count;
      hubKey = key;
    }
  }

  for (const corridor of input) {
    const style = getCorridorStyle(corridor);
    const fromKey = `${corridor.from.lat}:${corridor.from.lng}`;
    const toKey = `${corridor.to.lat}:${corridor.to.lng}`;

    if (!markers.has(fromKey) || corridor.active) {
      markers.set(fromKey, {
        city: corridor.from,
        style: TONE_STYLES.primary,
        isHub: fromKey === hubKey,
      });
    }

    markers.set(toKey, {
      city: corridor.to,
      style: corridor.active ? TONE_STYLES.primary : style,
    });
  }

  return Array.from(markers.values());
}

function createMarkerMesh(marker: Marker): THREE.Group {
  const normal = latLngToVector(marker.city.lat, marker.city.lng, 1).normalize();
  const markerGroup = new THREE.Group();
  const isHub = marker.isHub ?? false;
  const markerColor = isHub ? HUB_ACCENT_COLOR : marker.style.color;

  const ringRadius = isHub ? 0.024 : 0.018;
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(ringRadius, 0.0024, 8, 36),
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

  const pinRadius = isHub ? 0.009 : 0.0056;
  const pin = new THREE.Mesh(
    new THREE.SphereGeometry(pinRadius, 14, 14),
    new THREE.MeshBasicMaterial({
      color: isHub
        ? HUB_ACCENT_COLOR
        : corridorIsPrimary(marker)
          ? TONE_STYLES.primary.color
          : marker.style.color,
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

function drawStar(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
) {
  context.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const pointRadius = i % 2 === 0 ? radius : radius * 0.42;
    const px = x + Math.cos(angle) * pointRadius;
    const py = y + Math.sin(angle) * pointRadius;
    if (i === 0) context.moveTo(px, py);
    else context.lineTo(px, py);
  }
  context.closePath();
  context.fill();
}

function createHubFlag(normal: THREE.Vector3) {
  const flag = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.96,
      depthTest: true,
      depthWrite: false,
      side: THREE.FrontSide,
    }),
  );
  flag.scale.set(0.14, 0.087, 1);
  const globeUp = new THREE.Vector3(0, 1, 0);
  const east = globeUp.clone().cross(normal).normalize();
  const north = normal.clone().cross(east).normalize();
  flag.position.copy(
    east.multiplyScalar(0.044)
      .add(north.multiplyScalar(-0.092))
      .add(normal.clone().multiplyScalar(0.018)),
  );
  flag.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  flag.renderOrder = 9;
  flag.userData.label = "SG flag";

  if (
    typeof document === "undefined" ||
    (typeof navigator !== "undefined" && navigator.userAgent.includes("jsdom"))
  ) {
    return flag;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 192;
  canvas.height = 120;

  const context = canvas.getContext("2d");
  if (!context) return flag;

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.shadowColor = "rgba(0, 43, 92, 0.18)";
  context.shadowBlur = 12;
  context.shadowOffsetY = 4;
  context.fillStyle = "rgba(255, 255, 255, 0.96)";
  context.beginPath();
  context.roundRect(28, 24, 136, 80, 12);
  context.fill();

  context.shadowColor = "transparent";
  context.fillStyle = "#ef3340";
  context.beginPath();
  context.roundRect(32, 28, 128, 36, 8);
  context.fill();
  context.fillRect(32, 48, 128, 18);

  context.fillStyle = "#ffffff";
  context.beginPath();
  context.arc(58, 46, 14, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#ef3340";
  context.beginPath();
  context.arc(64, 46, 12, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#ffffff";
  [
    [88, 34],
    [98, 42],
    [94, 55],
    [82, 55],
    [78, 42],
  ].forEach(([x, y]) => drawStar(context, x, y, 5));

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = flag.material as THREE.MeshBasicMaterial;
  material.map = texture;
  material.needsUpdate = true;

  return flag;
}

function getFadableMaterials(object: THREE.Object3D) {
  const mesh = object as THREE.Mesh;
  const material = mesh.material;
  if (!material) return [];
  return Array.isArray(material) ? material : [material];
}

export function createRouteLayer(): RouteLayer {
  const group = new THREE.Group();
  const draws: RouteDraw[] = [];
  let hubFlag: THREE.Mesh | null = null;

  corridors.forEach((corridor, index) => {
    group.add(createArcMesh(corridor));
    const draw = createRouteDraw(corridor, index);
    draws.push(draw);
    group.add(draw.mesh);
  });

  for (const marker of collectMarkers(corridors)) {
    const markerGroup = createMarkerMesh(marker);
    if (marker.isHub) {
      const normal = latLngToVector(marker.city.lat, marker.city.lng, 1).normalize();
      hubFlag = createHubFlag(normal);
      if (hubFlag) markerGroup.add(hubFlag);
    }
    group.add(markerGroup);
  }

  return { group, draws, hubRing: null, hubFlag };
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
      if (child.userData.routeLayerOpacity === "skip") continue;

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
