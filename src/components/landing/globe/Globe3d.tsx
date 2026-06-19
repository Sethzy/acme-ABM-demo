"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { cities, corridors, type City, type Corridor } from "./corridors";
import {
  ROTATION_SPEED,
  approachRouteAlpha,
  getAnchorFrontness,
  getRouteDrawState,
  getRouteGate,
  resetRouteClock,
  type RouteTiming,
} from "./routeVisibility";
import {
  createLandDotAttributes,
  createLandDotMaterial,
  latLngToVector,
  normalizeCountries,
  type CountriesGeo,
  type LandPolygon,
} from "./landTexture";

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

type RouteDraw = RouteTiming & {
  mesh: THREE.Mesh;
  drawCount: number;
  opacity: number;
  progress: number;
  opacityRatio: number;
};

const GLOBE_RADIUS = 1;
const ARC_RADIUS = 1.008;
const MARKER_RADIUS = 1.012;
const CAMERA_Z = 4.3;
const BASE_GROUP_ROTATION = {
  x: -0.1,
  y: 0.56,
  z: -0.045,
};

const INK_COLOR = new THREE.Color("#123653");
const OCEAN_COLOR = new THREE.Color("#fbfaf6");
const OCEAN_EMISSIVE_COLOR = new THREE.Color("#dfeeea");
const ATMOSPHERE_COLOR = new THREE.Color("#a8cad7");
const RIM_MATTE_COLOR = new THREE.Color("#fbfaf6");

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

function getCameraDistance(width: number) {
  return width < 640 ? 4.82 : CAMERA_Z;
}

function getCorridorStyle(corridor: Corridor) {
  return TONE_STYLES[corridor.tone ?? "quiet"];
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

function createGlobeShell() {
  const group = new THREE.Group();

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS, 96, 96),
    new THREE.MeshStandardMaterial({
      color: OCEAN_COLOR,
      roughness: 0.86,
      metalness: 0,
      emissive: OCEAN_EMISSIVE_COLOR,
      emissiveIntensity: 0.18,
    }),
  );
  group.add(sphere);

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.032, 96, 96),
    new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        glowColor: { value: ATMOSPHERE_COLOR },
      },
      vertexShader: `
        varying vec3 vNormal;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;

        void main() {
          float edge = 1.0 - abs(vNormal.z);
          float alpha = pow(edge, 3.1) * 0.045;
          gl_FragColor = vec4(glowColor, alpha);
        }
      `,
    }),
  );
  group.add(atmosphere);

  return group;
}

function createDotsMesh(polygons: LandPolygon[], viewportHeight: number) {
  const { positions, colors } = createLandDotAttributes(polygons);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  return new THREE.Points(geometry, createLandDotMaterial(viewportHeight));
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

function updateRouteDraws(draws: RouteDraw[], routeClock: number) {
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

function resetRouteDraws(draws: RouteDraw[]) {
  for (const draw of draws) {
    draw.progress = -1;
    draw.opacityRatio = 0;
    draw.mesh.visible = false;
    draw.mesh.geometry.setDrawRange(0, 0);
  }
}

function showReducedMotionRoute(draws: RouteDraw[]) {
  draws.forEach((draw, index) => {
    const isPrimary = index === 0;
    draw.progress = isPrimary ? 1 : -1;
    draw.opacityRatio = isPrimary ? 0.72 : 0;
    draw.mesh.visible = isPrimary;
    draw.mesh.geometry.setDrawRange(0, isPrimary ? draw.drawCount : 0);
  });
}

function getFadableMaterials(object: THREE.Object3D) {
  const mesh = object as THREE.Mesh;
  const material = mesh.material;
  if (!material) return [];
  return Array.isArray(material) ? material : [material];
}

function setRouteLayerOpacity(routeGroup: THREE.Group, routeDraws: RouteDraw[], alpha: number) {
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

function corridorIsPrimary(marker: Marker) {
  return marker.style.color === TONE_STYLES.primary.color;
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh | THREE.Points;
    mesh.geometry?.dispose();

    const material = mesh.material;
    if (Array.isArray(material)) {
      material.forEach((item) => item.dispose());
    } else {
      material?.dispose();
    }
  });
}

export default function Globe3d({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const reduceMotionRef = useRef(false);
  const [countries, setCountries] = useState<CountriesGeo | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const landPolygons = useMemo(() => {
    if (!countries) return null;
    return normalizeCountries(countries);
  }, [countries]);

  useEffect(() => {
    fetch("/globe/world-countries.json")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load globe country data");
        return response.json() as Promise<CountriesGeo>;
      })
      .then(setCountries)
      .catch(() => setCountries({ type: "FeatureCollection", features: [] }));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    reduceMotionRef.current = reduceMotion;
  }, [reduceMotion]);

  useEffect(() => {
    const renderer = rendererRef.current;
    const camera = cameraRef.current;

    if (!renderer || !camera) return;

    renderer.setSize(width, height, false);
    camera.position.z = getCameraDistance(width);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !landPolygons) return;

    setIsRevealed(false);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, getCameraDistance(width));

    const light = new THREE.DirectionalLight(0xf8fbfc, 2.5);
    light.position.set(-2.8, 2.6, 4.2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xb9d3dd, 1.65));

    const globeGroup = createGlobeShell();
    globeGroup.rotation.set(
      BASE_GROUP_ROTATION.x,
      BASE_GROUP_ROTATION.y,
      BASE_GROUP_ROTATION.z,
    );

    const dots = createDotsMesh(landPolygons, height * renderer.getPixelRatio());
    globeGroup.add(dots);

    const routeGroup = new THREE.Group();
    const routeDraws: RouteDraw[] = [];
    corridors.forEach((corridor, index) => {
      routeGroup.add(createArcMesh(corridor));
      const draw = createRouteDraw(corridor, index);
      routeDraws.push(draw);
      routeGroup.add(draw.mesh);
    });
    for (const marker of collectMarkers(corridors)) {
      routeGroup.add(createMarkerMesh(marker));
    }
    updateRouteDraws(routeDraws, 0);
    setRouteLayerOpacity(
      routeGroup,
      routeDraws,
      getRouteGate(getAnchorFrontness(globeGroup, cities.singapore)).alpha,
    );
    globeGroup.add(routeGroup);

    const limbMatte = new THREE.Mesh(
      new THREE.SphereGeometry(1.004, 96, 96),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.FrontSide,
        depthWrite: false,
        depthTest: false,
        uniforms: {
          matteColor: { value: RIM_MATTE_COLOR },
        },
        vertexShader: `
          varying vec3 vNormal;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 matteColor;
          varying vec3 vNormal;

          void main() {
            float edge = 1.0 - abs(vNormal.z);
            float alpha = smoothstep(0.8, 1.0, edge) * 0.18;
            gl_FragColor = vec4(matteColor, alpha);
          }
        `,
      }),
    );
    limbMatte.renderOrder = 8;
    globeGroup.add(limbMatte);

    const rim = new THREE.Mesh(
      new THREE.SphereGeometry(1.012, 96, 96),
      new THREE.MeshBasicMaterial({
        color: INK_COLOR,
        transparent: true,
        opacity: 0.006,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    );
    globeGroup.add(rim);
    scene.add(globeGroup);

    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;

    let frame = 0;
    let secondFrame = 0;
    let lastFrameAt = performance.now() / 1000;
    let routeClock = 0;
    let routeAlpha = getRouteGate(getAnchorFrontness(globeGroup, cities.singapore)).alpha;
    let wasReducedMotion = reduceMotionRef.current;

    if (wasReducedMotion) {
      showReducedMotionRoute(routeDraws);
      setRouteLayerOpacity(routeGroup, routeDraws, 1);
    }

    const revealFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setIsRevealed(true));
    });

    const animate = () => {
      const now = performance.now() / 1000;
      const delta = Math.min(0.05, Math.max(0, now - lastFrameAt));
      lastFrameAt = now;

      if (reduceMotionRef.current) {
        if (!wasReducedMotion) {
          routeClock = 0;
          routeAlpha = 1;
          showReducedMotionRoute(routeDraws);
          wasReducedMotion = true;
        }

        setRouteLayerOpacity(routeGroup, routeDraws, 1);
      } else {
        if (wasReducedMotion) {
          routeClock = 0;
          routeAlpha = getRouteGate(getAnchorFrontness(globeGroup, cities.singapore)).alpha;
          resetRouteDraws(routeDraws);
          wasReducedMotion = false;
        }

        globeGroup.rotation.y += ROTATION_SPEED * delta;

        const gate = getRouteGate(getAnchorFrontness(globeGroup, cities.singapore));
        routeAlpha = approachRouteAlpha(routeAlpha, gate.alpha, delta);

        if (gate.isOpen) {
          routeClock += delta;
          updateRouteDraws(routeDraws, routeClock);
        } else {
          routeClock = resetRouteClock(routeClock, gate.isOpen, routeAlpha);
          if (routeClock === 0) resetRouteDraws(routeDraws);
        }

        setRouteLayerOpacity(routeGroup, routeDraws, routeAlpha);
      }

      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(revealFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
      disposeObject(scene);
      renderer.dispose();

      if (rendererRef.current === renderer) rendererRef.current = null;
      if (sceneRef.current === scene) sceneRef.current = null;
      if (cameraRef.current === camera) cameraRef.current = null;
    };
  }, [landPolygons, width, height]);

  if (!countries) return null;

  return (
    <div className={`hero-globe-canvas ${isRevealed ? "is-ready" : ""}`}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
