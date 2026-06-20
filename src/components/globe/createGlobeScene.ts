import * as THREE from "three";
import { createLandDotGeometry, createLandDotMaterial } from "./landTexture";
import {
  BASE_GROUP_ROTATION,
  ROTATION_SPEED,
  approachRouteAlpha,
  getAnchorFrontness,
  getRouteGate,
  resetRouteClock,
} from "./routeVisibility";
import {
  createGlobeShell,
  createLimbMatte,
  createRim,
  getCameraDistance,
} from "./globeMaterials";
import {
  cities,
  createRouteLayer,
  resetRouteDraws,
  setRouteLayerOpacity,
  showReducedMotionRoute,
  updateRouteDraws,
} from "./globeRoutes";

type GlobeSceneOptions = {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  reducedMotion: boolean;
  onReady: () => void;
};

export type GlobeSceneController = {
  resize: (width: number, height: number) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  destroy: () => void;
};

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

export function createGlobeScene({
  canvas,
  width,
  height,
  reducedMotion,
  onReady,
}: GlobeSceneOptions): GlobeSceneController | null {
  if (typeof window === "undefined") return null;
  if (typeof WebGLRenderingContext === "undefined") return null;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch {
    return null;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
  camera.position.set(0, 0, getCameraDistance(width));

  const light = new THREE.DirectionalLight(0xf0f6ff, 2.15);
  light.position.set(-2.8, 2.6, 4.2);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xc8d8f0, 1.65));

  const globeGroup = createGlobeShell();
  globeGroup.rotation.set(
    BASE_GROUP_ROTATION.x,
    BASE_GROUP_ROTATION.y,
    BASE_GROUP_ROTATION.z,
  );

  const landDotMaterial = createLandDotMaterial(height * renderer.getPixelRatio());
  const dots = new THREE.Points(createLandDotGeometry(), landDotMaterial);
  globeGroup.add(dots);

  const routeLayer = createRouteLayer();
  updateRouteDraws(routeLayer.draws, 0);
  setRouteLayerOpacity(
    routeLayer.group,
    routeLayer.draws,
    getRouteGate(getAnchorFrontness(globeGroup, cities.singapore)).alpha,
  );
  globeGroup.add(routeLayer.group);

  globeGroup.add(createLimbMatte());
  globeGroup.add(createRim());
  scene.add(globeGroup);

  let currentWidth = width;
  let currentHeight = height;
  let frame = 0;
  let revealFrame = 0;
  let lastFrameAt = performance.now() / 1000;
  let routeClock = 0;
  let routeAlpha = getRouteGate(getAnchorFrontness(globeGroup, cities.singapore)).alpha;
  let isReducedMotion = reducedMotion;
  let wasReducedMotion = reducedMotion;
  let compileComplete = false;
  let renderedFrames = 0;
  let revealed = false;
  let revealScheduled = false;
  let destroyed = false;

  const resize = (nextWidth: number, nextHeight: number) => {
    currentWidth = nextWidth;
    currentHeight = nextHeight;
    renderer.setSize(nextWidth, nextHeight, false);
    camera.position.z = getCameraDistance(nextWidth);
    camera.aspect = nextWidth / nextHeight;
    camera.updateProjectionMatrix();
    landDotMaterial.uniforms.viewportHeight.value =
      nextHeight * renderer.getPixelRatio();
  };

  const reveal = () => {
    revealScheduled = false;
    if (revealed || destroyed) return;
    revealed = true;
    routeClock = 0;
    if (isReducedMotion) {
      showReducedMotionRoute(routeLayer.draws);
    } else {
      resetRouteDraws(routeLayer.draws);
    }
    onReady();
  };

  const scheduleReveal = () => {
    if (revealed || revealScheduled || destroyed) return;
    revealScheduled = true;
    revealFrame = window.requestAnimationFrame(reveal);
  };

  const animate = () => {
    if (destroyed) return;

    const now = performance.now() / 1000;
    const delta = Math.min(0.05, Math.max(0, now - lastFrameAt));
    lastFrameAt = now;

    if (isReducedMotion) {
      if (!wasReducedMotion) {
        routeClock = 0;
        routeAlpha = 1;
        showReducedMotionRoute(routeLayer.draws);
        wasReducedMotion = true;
      }

      setRouteLayerOpacity(routeLayer.group, routeLayer.draws, 1);
    } else {
      if (wasReducedMotion) {
        routeClock = 0;
        routeAlpha = getRouteGate(getAnchorFrontness(globeGroup, cities.singapore)).alpha;
        resetRouteDraws(routeLayer.draws);
        wasReducedMotion = false;
      }

      globeGroup.rotation.y += ROTATION_SPEED * delta;

      const gate = getRouteGate(getAnchorFrontness(globeGroup, cities.singapore));
      routeAlpha = approachRouteAlpha(routeAlpha, gate.alpha, delta);

      if (gate.isOpen && revealed) {
        routeClock += delta;
        updateRouteDraws(routeLayer.draws, routeClock);
      } else if (revealed) {
        routeClock = resetRouteClock(routeClock, gate.isOpen, routeAlpha);
        if (routeClock === 0) resetRouteDraws(routeLayer.draws);
      } else {
        resetRouteDraws(routeLayer.draws);
      }

      setRouteLayerOpacity(routeLayer.group, routeLayer.draws, routeAlpha);
    }

    renderer.render(scene, camera);

    renderedFrames += 1;
    if (isReducedMotion && renderedFrames >= 1) {
      scheduleReveal();
    } else if (!revealed && compileComplete && renderedFrames >= 1) {
      scheduleReveal();
    }

    frame = window.requestAnimationFrame(animate);
  };

  resize(currentWidth, currentHeight);

  if (isReducedMotion) {
    showReducedMotionRoute(routeLayer.draws);
    setRouteLayerOpacity(routeLayer.group, routeLayer.draws, 1);
  }

  void renderer
    .compileAsync(scene, camera)
    .catch(() => undefined)
    .then(() => {
      compileComplete = true;
    });

  animate();

  return {
    resize,
    setReducedMotion(nextReducedMotion) {
      isReducedMotion = nextReducedMotion;
    },
    destroy() {
      destroyed = true;
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(revealFrame);
      disposeObject(scene);
      renderer.dispose();
    },
  };
}
