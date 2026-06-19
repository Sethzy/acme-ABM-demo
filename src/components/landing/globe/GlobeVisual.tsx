"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

const Globe3d = dynamic(() => import("./Globe3d"), {
  ssr: false,
  loading: () => null,
});

export function GlobeVisual() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [isWebglReady, setIsWebglReady] = useState(false);

  const handleGlobeReady = useCallback(() => {
    setIsWebglReady(true);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`hero-globe-frame relative h-[25rem] w-full sm:h-[31rem] lg:h-[38rem] xl:h-[42rem] ${
        isWebglReady ? "is-webgl-ready" : ""
      }`}
      aria-hidden="true"
    >
      <div className="hero-globe-halo" aria-hidden="true" />
      {size ? (
        <div className="absolute inset-0">
          <Globe3d width={size.w} height={size.h} onReady={handleGlobeReady} />
        </div>
      ) : null}
    </div>
  );
}
