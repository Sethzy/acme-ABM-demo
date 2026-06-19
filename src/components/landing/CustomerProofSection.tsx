"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import {
  Activity,
  ArrowDownToLine,
  ArrowUpFromLine,
  Banknote,
  CheckCircle2,
  CircleDollarSign,
  Coins,
  Landmark,
  RefreshCw,
  Wallet,
} from "lucide-react";
import { acmeContent } from "@/content/acme";
import { Container } from "./Container";

const tagIcon: Record<
  string,
  React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>
> = {
  "Direct Bank Integrations": Landmark,
  Collections: ArrowDownToLine,
  "Automated Reconciliation": RefreshCw,
  "eGIRO Collections": ArrowDownToLine,
  "Real-time Recognition": Activity,
  "Wealth Platform": Wallet,
  PayNow: Banknote,
  "PayLah!": CircleDollarSign,
  "Automated Payouts": ArrowUpFromLine,
  "Investment Platform": Coins,
};

type Featured = (typeof acmeContent.customer.featured)[number];
type Accent = Featured["accent"];

const easing: Transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

export function CustomerProofSection() {
  const featured = acmeContent.customer.featured;
  const [activeId, setActiveId] = useState<string>(featured[0].id);
  const active = featured.find((c) => c.id === activeId) ?? featured[0];
  const pillId = useId();

  return (
    <section
      id="customers"
      className="section-shell bg-[var(--color-fog-gray)]"
      style={{ paddingBlock: "clamp(48px, 5vw, 80px)" }}
    >
      <Container>
        {/* Hero card — tabs live INSIDE at the top */}
        <div
          className="relative overflow-hidden rounded-[14px] bg-[var(--color-ghost-white)]"
          style={
            {
              "--c-accent": active.accent.hex,
              "--c-accent-soft": active.accent.soft,
              boxShadow:
                "0 18px 36px -22px rgba(17,26,74,0.08), 0 4px 10px -6px rgba(17,26,74,0.04)",
            } as React.CSSProperties
          }
        >
          {/* Tab strip — full-width grid inside card, no divider for cleaner Column-style frame */}
          <div
            className="grid grid-cols-2 items-stretch gap-2 p-4 sm:grid-cols-4 sm:gap-3 sm:p-5"
            role="tablist"
            aria-label="Customer stories"
          >
            {featured.map((c) => {
              const isActive = c.id === active.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(c.id)}
                  className="group relative flex h-[48px] items-center justify-center gap-2.5 rounded-[10px] px-4 transition-all duration-300 focus-ring hover:bg-[color-mix(in_srgb,var(--color-steel-gray)_18%,transparent)] aria-selected:hover:bg-transparent sm:h-[52px]"
                >
                  {isActive ? (
                    <motion.span
                      layoutId={pillId}
                      className="absolute inset-0 -z-0 rounded-[10px]"
                      style={{ backgroundColor: c.accent.hex }}
                      transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative z-10 flex items-center">
                    <span
                      className={
                        "text-[15px] font-semibold tracking-[-0.2px] sm:text-[17px] " +
                        (isActive
                          ? "text-white"
                          : "text-[var(--color-ink-blue)] group-hover:text-[var(--color-ink-blue)]")
                      }
                    >
                      {c.company}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
            <LeftPane active={active} />
            <RightPane active={active} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────────────────────────────────── */
/* LEFT PANE — Narrative                                     */
/* ───────────────────────────────────────────────────────── */

function LeftPane({ active }: { active: Featured }) {
  return (
    <div className="relative flex flex-col justify-between gap-y-10 px-12 pb-12 pt-14 sm:px-16 sm:pb-14 sm:pt-16 lg:h-[520px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id + "-left-top"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={easing}
        >
          {/* Headline — anchored top, tight to chips below */}
          <h2 className="max-w-[20ch] text-[30px] font-bold leading-[1.08] tracking-[-1.0px] text-[var(--color-ink-blue)] sm:text-[38px]">
            {active.headline}
          </h2>

          {/* Capability chips — Column-style: larger pills, wrap to 2 rows for 3+ tags */}
          <div className="mt-8 flex max-w-[26rem] flex-wrap gap-2.5">
            {active.tags.map((tag) => {
              const Icon = tagIcon[tag] ?? CheckCircle2;
              return (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-steel-gray)_85%,transparent)] bg-white px-4 py-2 text-[14px] font-medium text-[var(--color-ink-blue)] shadow-[0_1px_2px_rgba(17,26,74,0.04)]"
                >
                  <Icon
                    className="h-[15px] w-[15px] text-[var(--color-slate-text)]"
                    strokeWidth={1.8}
                  />
                  {tag}
                </span>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Quote — anchored bottom; rhythm comes from justify-between, not arbitrary mt */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id + "-left-quote"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={easing}
          className="max-w-[42ch]"
        >
          <span
            aria-hidden="true"
            className="block text-[42px] leading-none text-[color-mix(in_srgb,var(--color-slate-text)_45%,transparent)]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            &ldquo;
          </span>
          <blockquote className="mt-7 text-[18px] font-semibold leading-[1.45] tracking-[-0.2px] text-[var(--color-ink-blue)]">
            {active.quote}
          </blockquote>
          <p className="mt-7 text-[13px] tracking-[0.01em] text-[var(--color-slate-text)]">
            {active.attribution}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────────────────────────────────────── */
/* RIGHT PANE — Stacked Operating Account cards (Column)     */
/* ───────────────────────────────────────────────────────── */

function RightPane({ active }: { active: Featured }) {
  const isStack = active.asset === "stack";
  return (
    <div className="relative min-h-[520px] overflow-hidden lg:h-[520px]">
      {/* Background — halftone dots; neutral slate for stack asset, accent-tinted for flow asset.
          Dots fade in from sparse-left to denser-right per Column reference. */}
      <motion.div
        key={active.id + "-bg"}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={
          isStack
            ? {
                backgroundColor: "var(--color-ghost-white)",
                backgroundImage: `
                  radial-gradient(circle, color-mix(in srgb, var(--color-slate-text) 35%, transparent) 1px, transparent 1.4px)
                `,
                backgroundSize: "12px 12px",
                backgroundRepeat: "repeat",
                maskImage:
                  "linear-gradient(90deg, transparent 0%, transparent 18%, rgba(0,0,0,0.4) 38%, #000 60%, #000 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, transparent 18%, rgba(0,0,0,0.4) 38%, #000 60%, #000 100%)",
              }
            : {
                backgroundColor: "var(--color-ghost-white)",
                backgroundImage: `
                  radial-gradient(ellipse 60% 70% at 100% 50%, color-mix(in srgb, ${active.accent.hex} 12%, transparent), transparent 60%),
                  radial-gradient(circle, color-mix(in srgb, ${active.accent.hex} 22%, transparent) 0.8px, transparent 1.2px)
                `,
                backgroundSize: "100% 100%, 14px 14px",
                backgroundRepeat: "no-repeat, repeat",
                maskImage:
                  "linear-gradient(90deg, transparent 0%, transparent 25%, #000 55%, #000 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, transparent 25%, #000 55%, #000 100%)",
              }
        }
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id + "-asset"}
          className="relative flex h-full items-center justify-center px-8 py-12 sm:px-10 sm:py-14"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: {},
            enter: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
            exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
          }}
        >
          <div className="relative flex h-[420px] w-full max-w-[500px] items-center justify-center">
            {active.asset === "flow" ? (
              <MoneyCorridorCard active={active} />
            ) : (
              <CardStack active={active} />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  enter: { opacity: 1, y: 0, transition: easing },
  exit: { opacity: 0, y: -8, transition: { duration: 0.28 } },
};

type Loan = { name: string; amount: string; pill: string; meta: string };

/* Loan-stack: three frosted-glass cards stacked diagonally (Column "Best Egg" pattern).
   Composition uses absolute positioning for precise diagonal offsets. */
function CardStack({ active }: { active: Featured }) {
  const loans = (active as Featured & { loanStack?: readonly Loan[] }).loanStack;
  if (!loans) return null;

  // Stagger: back cards reveal first, foreground card lands last
  const orchestrate = {
    initial: {},
    enter: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
    exit: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
  } as const;

  return (
    <motion.div
      variants={orchestrate}
      initial="initial"
      animate="enter"
      exit="exit"
      className="relative h-full w-full"
    >
      {/* Card 1 — top-left, recessed back */}
      <div className="absolute left-0 top-0 z-0 w-[72%]">
        <LoanCard loan={loans[0]} variant="back" delay={0} />
      </div>

      {/* Card 3 — bottom-left, recessed back */}
      <div className="absolute left-0 top-[200px] z-10 w-[72%]">
        <LoanCard loan={loans[2]} variant="back" delay={0.08} />
      </div>

      {/* Card 2 — center, foregrounded glass, lands last */}
      <div className="absolute right-0 top-[110px] z-20 w-[74%]">
        <LoanCard loan={loans[1]} variant="front" delay={0.18} />
      </div>
    </motion.div>
  );
}

function LoanCard({
  loan,
  variant,
  delay,
}: {
  loan: Loan;
  variant: "back" | "front";
  delay: number;
}) {
  const isFront = variant === "front";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.985 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-[14px] px-6 py-6 sm:px-7 sm:py-7"
      style={
        isFront
          ? {
              backgroundColor: "rgba(255,255,255,0.92)",
              backgroundImage:
                "linear-gradient(160deg, rgba(255,255,255,1) 0%, rgba(247,248,250,0.9) 100%)",
              border:
                "1px solid color-mix(in srgb, var(--color-steel-gray) 70%, transparent)",
              boxShadow:
                "0 32px 56px -28px rgba(17,26,74,0.18), 0 12px 24px -14px rgba(17,26,74,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }
          : {
              backgroundColor: "rgba(247,248,250,0.94)",
              backgroundImage:
                "linear-gradient(155deg, rgba(252,253,254,1) 0%, rgba(243,245,248,0.96) 100%)",
              border:
                "1px solid color-mix(in srgb, var(--color-steel-gray) 60%, transparent)",
              boxShadow:
                "0 18px 32px -22px rgba(17,26,74,0.10), 0 4px 10px -8px rgba(17,26,74,0.04)",
            }
      }
    >
      {/* Customer name — subdued, regular weight */}
      <p className="text-[14px] font-normal leading-none text-[var(--color-slate-text)]">
        {loan.name}
      </p>

      {/* Dollar amount — the visual anchor */}
      <p
        className="mt-3 text-[28px] font-semibold leading-[1.05] tracking-[-0.6px] text-[var(--color-ink-blue)] sm:text-[34px]"
      >
        {loan.amount}
      </p>

      {/* Pill + meta row */}
      <div className="mt-6 flex items-center justify-between gap-2">
        <span
          className="inline-flex items-center rounded-[8px] bg-[var(--color-ink-blue)] px-3.5 py-2 text-[12px] font-medium leading-none text-white"
          style={{
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.06) inset, 0 6px 16px -10px rgba(17,26,74,0.4)",
          }}
        >
          {loan.pill}
        </span>
        <span className="text-[12px] text-[var(--color-slate-text)]">
          {loan.meta}
        </span>
      </div>
    </motion.div>
  );
}

// Legacy helpers retained (used by "flow" asset)
function _unusedTail(bank?: string) {
  if (!bank) return "";
  const m = bank.match(/(\d{3,})\s*$/);
  return m ? m[1] : bank.split(/\s+/).pop() ?? bank;
}
void _unusedTail;

/* ───────────────────────────────────────────────────────── */
/* ASSET B — Money flow + live activity                      */
/* ───────────────────────────────────────────────────────── */

function MoneyCorridorCard({ active }: { active: Featured }) {
  const accent = active.accent;
  const flow = active.flow;
  const sideMetric = active.side_metric;
  const id = useId();

  return (
    <motion.div
      variants={fadeUp}
      className="relative flex h-full w-full flex-col justify-between rounded-[16px] border border-[var(--color-steel-gray)] bg-white p-7 sm:p-8"
      style={{
        boxShadow:
          "0 24px 50px -22px rgba(17,26,74,0.10), 0 6px 16px -10px rgba(17,26,74,0.05)",
      }}
    >
      {/* Header row */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-slate-text)]">
            Money flow
          </span>
          <span className="font-mono text-[10px] tracking-[0.04em] text-[var(--color-slate-text)] opacity-60">
            · T+0 · idempotent
          </span>
        </div>
        <div className="flex flex-col items-end leading-none">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--color-slate-text)]">
            {sideMetric.label}
          </span>
          <span
            className="mt-1 text-[18px] font-semibold tracking-[-0.3px]"
            style={{ color: accent.hex }}
          >
            {sideMetric.value}
          </span>
        </div>
      </div>

      {/* SVG corridor */}
      <svg
        viewBox="0 0 480 150"
        className="block w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${id}-wire`} x1="0" y1="0" x2="1" y2="0">
            <stop
              offset="0%"
              stopColor={`color-mix(in srgb, ${accent.hex} 35%, transparent)`}
            />
            <stop offset="50%" stopColor={accent.hex} />
            <stop
              offset="100%"
              stopColor={`color-mix(in srgb, ${accent.hex} 35%, transparent)`}
            />
          </linearGradient>
        </defs>

        <CorridorNode x={28} y={75} accent={accent} variant="source" />
        <CorridorNode x={240} y={75} accent={accent} variant="hub" />
        <CorridorNode x={452} y={32} accent={accent} variant="dest" />
        <CorridorNode x={452} y={118} accent={accent} variant="dest" />

        <CorridorWire from={{ x: 28, y: 75 }} to={{ x: 240, y: 75 }} stroke={`url(#${id}-wire)`} delay={0} />
        <CorridorWire from={{ x: 240, y: 75 }} to={{ x: 452, y: 32 }} stroke={`url(#${id}-wire)`} delay={0.15} />
        <CorridorWire from={{ x: 240, y: 75 }} to={{ x: 452, y: 118 }} stroke={`url(#${id}-wire)`} delay={0.3} />

        <Packet
          path={[{ x: 28, y: 75 }, { x: 240, y: 75 }, { x: 452, y: 32 }]}
          accent={accent}
          delay={0.6}
        />
        <Packet
          path={[{ x: 28, y: 75 }, { x: 240, y: 75 }, { x: 452, y: 118 }]}
          accent={accent}
          delay={1.4}
        />
      </svg>

      {/* 3-column flow labels */}
      <div className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
        <FlowLabel label={flow.source.label} sub={flow.source.sub} align="left" />
        <FlowLabel label={flow.hub.label} sub={flow.hub.sub} align="center" accent={accent} isHub />
        <div className="flex flex-col items-end gap-2 text-right">
          {flow.destinations.map((d) => (
            <div key={d.bank} className="flex flex-col leading-tight">
              <span className="text-[11px] font-medium text-[var(--color-ink-blue)]">
                {d.label}
              </span>
              <span className="font-mono text-[10px] text-[var(--color-slate-text)]">
                {d.bank}
              </span>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}

function CorridorNode({
  x,
  y,
  accent,
  variant,
}: {
  x: number;
  y: number;
  accent: Accent;
  variant: "source" | "hub" | "dest";
}) {
  if (variant === "hub") {
    return (
      <g>
        <motion.rect
          x={x - 32}
          y={y - 24}
          width={64}
          height={48}
          rx={14}
          fill={accent.hex}
          opacity={0.18}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.18, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        />
        <motion.rect
          x={x - 26}
          y={y - 19}
          width={52}
          height={38}
          rx={10}
          fill={accent.hex}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />
        <motion.text
          x={x}
          y={y + 4}
          textAnchor="middle"
          fontFamily="SFMono, ui-monospace, Menlo, monospace"
          fontSize={11}
          fontWeight={600}
          letterSpacing="0.12em"
          fill="white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          ACME
        </motion.text>
      </g>
    );
  }

  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r={8}
        fill="white"
        stroke={accent.hex}
        strokeWidth={1.5}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: variant === "source" ? 0.05 : 0.2 }}
      />
      <motion.circle
        cx={x}
        cy={y}
        r={3}
        fill={accent.hex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: variant === "source" ? 0.2 : 0.35 }}
      />
    </g>
  );
}

function CorridorWire({
  from,
  to,
  stroke,
  delay,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  stroke: string;
  delay: number;
}) {
  return (
    <motion.line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={stroke}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeDasharray="3 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    />
  );
}

function Packet({
  path,
  accent,
  delay,
}: {
  path: Array<{ x: number; y: number }>;
  accent: Accent;
  delay: number;
}) {
  // For source→hub→destination paths, insert hub-edge waypoints so the
  // packet visually disappears as it enters the ACME card and reappears on
  // the other side. The hub rect is ~52×38 centered at the middle waypoint.
  if (path.length === 3) {
    const [src, hub, dest] = path;
    const hubHalfW = 26; // half-width of the hub rect (52/2)
    const entry = { x: hub.x - hubHalfW, y: hub.y };
    // Interpolate cy at exit-edge along the hub→dest leg
    const t2 = (hubHalfW) / (dest.x - hub.x);
    const exit = { x: hub.x + hubHalfW, y: hub.y + (dest.y - hub.y) * t2 };

    const xs = [src.x, src.x, entry.x, hub.x, exit.x, dest.x, dest.x];
    const ys = [src.y, src.y, entry.y, hub.y, exit.y, dest.y, dest.y];
    return (
      <motion.circle
        r={3.6}
        fill={accent.hex}
        style={{ filter: `drop-shadow(0 0 6px ${accent.hex})` }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0, 1, 1, 0],
          cx: xs,
          cy: ys,
        }}
        transition={{
          duration: 2.6,
          delay,
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: "easeInOut",
          times: [0, 0.05, 0.43, 0.5, 0.57, 0.95, 1],
        }}
      />
    );
  }

  const xs = path.map((p) => p.x);
  const ys = path.map((p) => p.y);
  return (
    <motion.circle
      r={3.6}
      fill={accent.hex}
      style={{ filter: `drop-shadow(0 0 6px ${accent.hex})` }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 1, 0],
        cx: xs,
        cy: ys,
      }}
      transition={{
        duration: 2.6,
        delay,
        repeat: Infinity,
        repeatDelay: 1.4,
        ease: "easeInOut",
        times: [0, 0.05, 0.5, 0.95, 1],
      }}
    />
  );
}

function FlowLabel({
  label,
  sub,
  align,
  accent,
  isHub,
}: {
  label: string;
  sub: string;
  align: "left" | "center" | "right";
  accent?: Accent;
  isHub?: boolean;
}) {
  const alignClass =
    align === "left"
      ? "text-left items-start"
      : align === "right"
        ? "text-right items-end"
        : "text-center items-center";
  return (
    <div className={`flex flex-col gap-0.5 ${alignClass}`}>
      <span
        className="text-[11px] font-medium text-[var(--color-ink-blue)]"
        style={isHub && accent ? { color: accent.hex } : undefined}
      >
        {label}
      </span>
      <span className="font-mono text-[10px] text-[var(--color-slate-text)]">
        {sub}
      </span>
    </div>
  );
}
