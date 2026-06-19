"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

export function MetricChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const baseline = 244;
  const bars = [
    { x: 16, top: 200 },
    { x: 36, top: 184 },
    { x: 56, top: 192 },
    { x: 76, top: 168 },
    { x: 96, top: 158 },
    { x: 116, top: 172 },
    { x: 136, top: 144 },
    { x: 156, top: 136 },
    { x: 176, top: 150 },
    { x: 196, top: 122 },
    { x: 216, top: 110 },
    { x: 236, top: 120 },
    { x: 256, top: 96 },
    { x: 276, top: 86 },
    { x: 296, top: 102 },
    { x: 316, top: 74 },
    { x: 336, top: 60 },
    { x: 356, top: 70 },
    { x: 376, top: 48 },
    { x: 396, top: 36 },
    { x: 416, top: 44 },
    { x: 436, top: 22 },
  ];
  const trailWidth = 5;
  const dotR = 3.75;
  const haloR = 9;

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div
      ref={containerRef}
      className="relative h-full min-h-[22rem] overflow-hidden"
      aria-hidden="true"
    >
      {/* Background dot grid — quieted */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, var(--color-callout-cyan) 10%, transparent) 0.9px, transparent 1.2px)",
          backgroundSize: "20px 20px",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 55% 45%, black 0%, black 50%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 55% 45%, black 0%, black 50%, transparent 95%)",
        }}
      />

      <svg
        className="relative h-full w-full"
        viewBox="0 0 460 260"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="bar-fade" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="color-mix(in srgb, var(--color-callout-cyan) 32%, transparent)"
            />
            <stop
              offset="65%"
              stopColor="color-mix(in srgb, var(--color-callout-cyan) 8%, transparent)"
            />
            <stop
              offset="100%"
              stopColor="color-mix(in srgb, var(--color-callout-cyan) 0%, transparent)"
            />
          </linearGradient>
          <radialGradient id="dot-halo" cx="0.5" cy="0.5" r="0.5">
            <stop
              offset="0%"
              stopColor="color-mix(in srgb, var(--color-callout-cyan) 38%, transparent)"
            />
            <stop
              offset="60%"
              stopColor="color-mix(in srgb, var(--color-callout-cyan) 12%, transparent)"
            />
            <stop
              offset="100%"
              stopColor="color-mix(in srgb, var(--color-callout-cyan) 0%, transparent)"
            />
          </radialGradient>
        </defs>

{bars.map((b, i) => {
          const delay = i * 0.05;
          return (
            <g key={b.x}>
              {/* Comet trail */}
              <motion.rect
                x={b.x - trailWidth / 2}
                y={b.top}
                width={trailWidth}
                height={baseline - b.top}
                rx={trailWidth / 2}
                ry={trailWidth / 2}
                fill="url(#bar-fade)"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  delay: delay + 0.25,
                  duration: 0.7,
                  ease,
                }}
              />
              {/* Hairline stem — draws from baseline up */}
              <motion.line
                x1={b.x}
                x2={b.x}
                y1={baseline}
                y2={b.top}
                strokeWidth="0.9"
                strokeLinecap="round"
                stroke="color-mix(in srgb, var(--color-callout-cyan) 24%, transparent)"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                  delay,
                  duration: 0.55,
                  ease,
                }}
              />
              {/* Halo */}
              <motion.circle
                cx={b.x}
                cy={b.top}
                r={haloR}
                fill="url(#dot-halo)"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.6 }
                }
                transition={{
                  delay: delay + 0.5,
                  duration: 0.5,
                  ease,
                }}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
              {/* Dot */}
              <motion.circle
                cx={b.x}
                cy={b.top}
                r={dotR}
                fill="color-mix(in srgb, var(--color-callout-cyan) 78%, transparent)"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{
                  delay: delay + 0.55,
                  duration: 0.45,
                  ease: [0.34, 1.4, 0.64, 1],
                }}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
            </g>
          );
        })}

        {/* Gentle pulse on the latest dot to add life */}
        <motion.circle
          cx={bars[bars.length - 1].x}
          cy={bars[bars.length - 1].top}
          r={haloR}
          fill="url(#dot-halo)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView
              ? {
                  opacity: [0, 0.55, 0],
                  scale: [0.8, 1.6, 1.9],
                }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{
            delay: bars.length * 0.05 + 1.0,
            duration: 2.6,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 1.4,
          }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      </svg>

      {/* Right-edge fade — softer */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-40"
        style={{
          background:
            "linear-gradient(to left, var(--color-ghost-white) 0%, color-mix(in srgb, var(--color-ghost-white) 65%, transparent) 50%, color-mix(in srgb, var(--color-ghost-white) 0%, transparent) 100%)",
        }}
      />
      {/* Top fade so the highest dot doesn't feel clipped */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-12"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-ghost-white) 0%, color-mix(in srgb, var(--color-ghost-white) 0%, transparent) 100%)",
        }}
      />
    </div>
  );
}
