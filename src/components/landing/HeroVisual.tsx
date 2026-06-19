"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, CheckCircle2, Globe2, Send } from "lucide-react";

const iconStroke = 1.55;

type Scene = {
  card: "curl" | "transfer";
};

const scenes: Scene[] = [
  { card: "transfer" },
  { card: "curl" },
];

const SCENE_DURATION_MS = 3200;

export function HeroVisual() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % scenes.length);
    }, SCENE_DURATION_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="hero-route-command relative min-h-[24rem] w-full overflow-hidden rounded-[12px] border border-[color-mix(in_srgb,var(--color-steel-gray)_72%,var(--color-ghost-white))] bg-[color-mix(in_srgb,var(--color-ghost-white)_88%,var(--color-fog-gray))] p-3 shadow-[0_34px_80px_-48px_rgba(17,26,74,0.28),0_1px_1px_rgba(17,26,74,0.08)]">
      <div className="hero-panel-grid" aria-hidden="true" />
      <div className="relative z-10 flex items-center justify-between border-b border-[color-mix(in_srgb,var(--color-steel-gray)_70%,var(--color-ghost-white))] px-1 pb-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-normal text-[var(--color-slate-text)]">
            Route command
          </p>
          <p className="mt-1 text-[15px] font-semibold tracking-normal text-[var(--color-deep-plum)]">
            One schema, many banks
          </p>
        </div>
        <span className="rounded-[7px] border border-[color-mix(in_srgb,var(--color-success-moss)_32%,var(--color-ghost-white))] bg-[color-mix(in_srgb,var(--color-success-moss)_9%,var(--color-ghost-white))] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-normal text-[color-mix(in_srgb,var(--color-success-moss)_88%,var(--color-deep-plum))]">
          200 OK
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={`card-${activeIndex}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="pointer-events-auto relative z-10 mt-3 w-full"
        >
          {scenes[activeIndex].card === "curl" ? <HeroCurlCard /> : <HeroTransferCard />}
        </motion.div>
      </AnimatePresence>
      <div className="relative z-10 mt-3 grid grid-cols-3 gap-2">
        {[
          ["DBS", "source"],
          ["UOB", "backup"],
          ["OCBC", "feed"],
        ].map(([bank, role]) => (
          <div
            key={bank}
            className="rounded-[8px] border border-[color-mix(in_srgb,var(--color-steel-gray)_66%,var(--color-ghost-white))] bg-[color-mix(in_srgb,var(--color-ghost-white)_76%,transparent)] px-3 py-2"
          >
            <span className="block text-[13px] font-semibold tracking-normal text-[var(--color-deep-plum)]">
              {bank}
            </span>
            <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-normal text-[var(--color-slate-text)]">
              {role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroCurlCard() {
  const lines = [
    "curl api.tryacme.com/v1/transfers \\",
    "  -u :prod_•••••••••• \\",
    "  -d source=bacc_dbs_operating \\",
    "  -d counterparty=cp_vendor_london \\",
    "  -d amount=1029329 \\",
    "  -d currency=GBP \\",
    '  -d memo="Supplier payout"',
  ];

  return (
    <div className="overflow-hidden rounded-[10px] border border-[color-mix(in_srgb,var(--color-steel-gray)_66%,var(--color-ghost-white))] bg-[var(--color-ghost-white)] shadow-[0_18px_42px_-30px_rgba(17,26,74,0.2),0_1px_2px_rgba(17,26,74,0.06)]">
      <div className="flex items-center justify-between border-b border-[color-mix(in_srgb,var(--color-steel-gray)_55%,var(--color-ghost-white))] bg-[color-mix(in_srgb,var(--color-fog-gray)_60%,var(--color-ghost-white))] px-4 py-3">
        <span className="truncate font-mono text-[13px] tracking-normal text-[color-mix(in_srgb,var(--color-deep-plum)_82%,var(--color-slate-text))]">
          POST /v1/transfers/international-wire
        </span>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-action-orange)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-success-moss)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-info-blue)]" />
        </div>
      </div>
      <pre className="overflow-hidden p-4 font-mono text-[12px] leading-[1.6] tracking-normal text-[color-mix(in_srgb,var(--color-deep-plum)_70%,var(--color-slate-text))]">
        {lines.join("\n")}
      </pre>
    </div>
  );
}

function HeroTransferCard() {
  return (
    <div className="w-full rounded-[10px] border border-[color-mix(in_srgb,var(--color-steel-gray)_66%,var(--color-ghost-white))] bg-[var(--color-ghost-white)] p-3.5 shadow-[0_18px_42px_-30px_rgba(17,26,74,0.2),0_1px_2px_rgba(17,26,74,0.06)]">
      <div className="space-y-2.5">
        <AccountRow
          marker="SGD"
          markerClass="bg-[color-mix(in_srgb,var(--color-action-orange)_16%,var(--color-ghost-white))] text-[var(--color-action-orange)]"
          name="DBS Operating Account"
          amount="$10,293.29"
          currency="SGD"
          location="Singapore"
        />
        <div className="flex justify-center">
          <ArrowDown
            className="h-3.5 w-3.5 text-[color-mix(in_srgb,var(--color-slate-text)_72%,transparent)]"
            strokeWidth={iconStroke}
          />
        </div>
        <AccountRow
          marker="GBP"
          markerClass="bg-[color-mix(in_srgb,var(--color-deep-plum)_9%,var(--color-ghost-white))] text-[var(--color-deep-plum)]"
          name="Supplier payout"
          amount="£9,102.07"
          currency="GBP"
          location="London, UK"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Pill icon={CheckCircle2} label="Completed" tone="text-[var(--color-success-moss)]" />
        <Pill icon={Globe2} label="Direct Bank API" tone="text-[var(--color-callout-cyan)]" />
        <Pill icon={Send} label="Outgoing" tone="text-[var(--color-slate-text)]" />
      </div>

      <pre className="mt-3 overflow-hidden rounded-[7px] border border-[color-mix(in_srgb,var(--color-steel-gray)_70%,var(--color-ghost-white))] bg-[color-mix(in_srgb,var(--color-fog-gray)_72%,var(--color-ghost-white))] p-4 font-mono text-[12px] leading-[1.65] tracking-normal text-[color-mix(in_srgb,var(--color-deep-plum)_70%,var(--color-slate-text))]">
        <span>{"{"}</span>
        {"\n  "}
        <JsonKey>source_account_id</JsonKey>: <JsonStr>bacc_dbs_operating</JsonStr>,
        {"\n  "}
        <JsonKey>destination</JsonKey>: <JsonStr>supplier_payout</JsonStr>,
        {"\n  "}
        <JsonKey>amount</JsonKey>: <JsonNum>1029329</JsonNum>,
        {"\n  "}
        <JsonKey>status</JsonKey>: <JsonStr>completed</JsonStr>
        {"\n"}
        <span>{"}"}</span>
      </pre>
    </div>
  );
}

function AccountRow({
  marker,
  markerClass,
  name,
  amount,
  currency,
  location,
}: {
  marker: string;
  markerClass: string;
  name: string;
  amount: string;
  currency: string;
  location: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[7px] border border-[color-mix(in_srgb,var(--color-steel-gray)_74%,var(--color-ghost-white))] bg-[var(--color-ghost-white)] px-3 py-2.5 shadow-[0_1px_2px_rgba(17,26,74,0.05)]">
      <span className={`grid h-9 w-9 place-items-center rounded-full font-mono text-[10px] font-semibold ${markerClass}`}>
        {marker}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-mono tracking-normal text-[var(--color-slate-text)]">
          {name}
        </p>
        <p className="truncate text-[16px] font-semibold tracking-normal text-[var(--color-ink-blue)]">
          {amount}{" "}
          <span className="text-[12px] font-mono font-normal text-[var(--color-slate-text)]">
            {currency}
          </span>
        </p>
      </div>
      <p className="shrink-0 text-[12px] font-mono tracking-normal text-[var(--color-slate-text)]">
        {location}
      </p>
    </div>
  );
}

function JsonKey({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--color-deep-plum)]">&quot;{children}&quot;</span>;
}
function JsonStr({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--color-success-moss)]">&quot;{children}&quot;</span>;
}
function JsonNum({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--color-callout-cyan)]">{children}</span>;
}

function Pill({
  icon: Icon,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  tone: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-steel-gray)] bg-[var(--color-ghost-white)] px-2.5 py-0.5 text-[12px] font-medium tracking-normal text-[var(--color-ink-blue)]">
      <Icon className={`h-3.5 w-3.5 ${tone}`} strokeWidth={iconStroke} />
      {label}
    </span>
  );
}
