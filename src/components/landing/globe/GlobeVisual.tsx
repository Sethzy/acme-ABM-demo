"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const Globe3d = dynamic(() => import("./Globe3d"), {
  ssr: false,
  loading: () => null,
});

const GLOBE_POSTER_SRC = "/globe/globe-initial-poster.webp";

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
      <div className="hero-globe-poster" data-poster-src={GLOBE_POSTER_SRC} aria-hidden="true">
        <Image
          src={GLOBE_POSTER_SRC}
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 672px, (min-width: 1024px) 608px, 82vw"
        />
      </div>
      {size ? (
        <div className="absolute inset-0">
          <Globe3d width={size.w} height={size.h} onReady={handleGlobeReady} />
        </div>
      ) : null}
    </div>
  );
}
