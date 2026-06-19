"use client";

import { useEffect, useRef, useState } from "react";
import { createGlobeScene, type GlobeSceneController } from "./createGlobeScene";

const DEFAULT_GLOBE_SIZE = { w: 720, h: 672 };

function getReducedMotionPreference() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function GlobeCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<GlobeSceneController | null>(null);
  const lastSizeRef = useRef(DEFAULT_GLOBE_SIZE);
  const [isReady, setIsReady] = useState(false);
  const [size, setSize] = useState(DEFAULT_GLOBE_SIZE);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const nextSize = {
        w: Math.round(rect.width),
        h: Math.round(rect.height),
      };

      if (
        nextSize.w <= 0 ||
        nextSize.h <= 0 ||
        (lastSizeRef.current.w === nextSize.w && lastSizeRef.current.h === nextSize.h)
      ) {
        return;
      }

      lastSizeRef.current = nextSize;
      setSize(nextSize);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    sceneRef.current?.resize(size.w, size.h);
  }, [size]);

  useEffect(() => {
    sceneRef.current?.setReducedMotion(reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = createGlobeScene({
      canvas,
      width: lastSizeRef.current.w,
      height: lastSizeRef.current.h,
      reducedMotion: getReducedMotionPreference(),
      onReady: () => setIsReady(true),
    });
    sceneRef.current = scene;

    return () => {
      scene?.destroy();
      if (sceneRef.current === scene) sceneRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <div className={`hero-globe-canvas ${isReady ? "is-ready" : ""}`} data-ready={isReady}>
        <canvas ref={canvasRef} aria-hidden="true" />
      </div>
    </div>
  );
}
