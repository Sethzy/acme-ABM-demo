"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

export function HeroBackdrop() {
  const svgDataUri = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    const svg = map.getSVG({
      radius: 0.23,
      color: "#ffffff",
      shape: "circle",
      backgroundColor: "transparent",
    });
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] overflow-hidden"
    >
      <motion.div
        className="absolute left-[80%] top-[-100px] aspect-[2/1] w-[120%] -translate-x-1/2"
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0 0)" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background:
            "linear-gradient(180deg, #d8eadb 0%, #c4dfd9 12%, #a8c8d2 24%, #87adc4 36%, #6c93b6 48%, #527aa3 60%, #436a93 72%, #3b5d83 86%, #36577b 100%)",
          opacity: 0.9,
          maskImage: `url("${svgDataUri}")`,
          WebkitMaskImage: `url("${svgDataUri}")`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, var(--color-info-blue) 24%, transparent) 0 1px, transparent 1.22px)",
          backgroundSize: "10px 10px",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 48% 60% at 18% 45%, color-mix(in srgb, var(--color-ghost-white) 88%, transparent) 0%, color-mix(in srgb, var(--color-ghost-white) 55%, transparent) 28%, color-mix(in srgb, var(--color-ghost-white) 18%, transparent) 50%, transparent 68%)",
            "radial-gradient(ellipse 30% 45% at 102% 55%, color-mix(in srgb, var(--color-ghost-white) 65%, transparent) 0%, color-mix(in srgb, var(--color-ghost-white) 22%, transparent) 35%, transparent 60%)",
            "linear-gradient(to bottom, var(--color-ghost-white) 0%, color-mix(in srgb, var(--color-ghost-white) 88%, transparent) 4%, color-mix(in srgb, var(--color-ghost-white) 55%, transparent) 9%, color-mix(in srgb, var(--color-ghost-white) 22%, transparent) 15%, transparent 24%)",
          ].join(", "),
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[280px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--color-ghost-white) 35%, transparent) 35%, color-mix(in srgb, var(--color-ghost-white) 78%, transparent) 65%, var(--color-ghost-white) 100%)",
        }}
      />
    </div>
  );
}

export function HeroTopWash() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px]"
      style={{
        background:
          "radial-gradient(80% 70% at 78% -10%, color-mix(in srgb, var(--color-radial-twilight-gradient) 5%, transparent) 0%, transparent 60%), radial-gradient(60% 60% at -10% -10%, color-mix(in srgb, var(--color-info-blue) 4%, transparent) 0%, transparent 65%)",
      }}
    />
  );
}
