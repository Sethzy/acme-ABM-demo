"use client";

import { useMemo, useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

type LatLng = { lat: number; lng: number; label?: string };

export type WorldMapDot = { start: LatLng; end: LatLng };

type WorldMapProps = {
  dots?: WorldMapDot[];
  lineColor?: string;
  className?: string;
};

function projectPoint(lat: number, lng: number) {
  return {
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  };
}

function createCurvedPath(
  start: { x: number; y: number },
  end: { x: number; y: number },
) {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 50;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

export function WorldMap({
  dots = [],
  lineColor = "#111a4a",
  className = "",
}: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const svgDataUri = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    const svg = map.getSVG({
      radius: 0.22,
      color: "#ffffff",
      shape: "circle",
      backgroundColor: "transparent",
    });
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, []);

  return (
    <div className={`relative aspect-[2/1] w-full font-sans ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #b8d4e8 0%, #a8c8e0 18%, #95b9d6 36%, #86adcd 54%, #7ba2c4 72%, #7398bd 88%, #6f93b8 100%)",
            maskImage: `url("${svgDataUri}")`,
            WebkitMaskImage: `url("${svgDataUri}")`,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        {dots.map((dot, i) => {
          const s = projectPoint(dot.start.lat, dot.start.lng);
          const e = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <motion.path
              key={`p-${i}`}
              d={createCurvedPath(s, e)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 * i, ease: "easeOut" }}
            />
          );
        })}
        {dots.flatMap((dot, i) => {
          const s = projectPoint(dot.start.lat, dot.start.lng);
          const e = projectPoint(dot.end.lat, dot.end.lng);
          return [s, e].map((p, k) => (
            <g key={`pt-${i}-${k}`}>
              <circle cx={p.x} cy={p.y} r="2" fill={lineColor} />
              <circle cx={p.x} cy={p.y} r="2" fill={lineColor} opacity="0.5">
                <animate attributeName="r" from="2" to="8" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </g>
          ));
        })}
      </svg>
    </div>
  );
}
