import {
  ArrowLeftRight,
  ArrowUpRight,
  BarChart2,
  BookOpen,
  Box,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Database,
  FileCheck,
  FileCode2,
  Globe,
  Landmark,
  LockKeyhole,
  MessageSquareText,
  Network,
  Package,
  RefreshCw,
  Split,
  TrendingUp,
  Wallet,
  WalletCards,
} from "lucide-react";

const iconStroke = 1.55;

type IconProps = {
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
};

type IconComponent = React.ComponentType<IconProps>;

export function LogoMark({
  className = "",
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  const isLarge = size === "lg";
  return (
    <div className={`flex items-center gap-2.5 ${className}`} aria-label="Acme">
      <span
        className={`grid place-items-center rounded-[8px] bg-[var(--color-ink-blue)] font-semibold text-[var(--color-ghost-white)] shadow-[var(--shadow-subtle)] ${
          isLarge ? "h-9 w-9 text-[18px]" : "h-6 w-6 text-[11px]"
        }`}
      >
        a
      </span>
      <span
        className={`font-semibold leading-none text-[var(--color-ink-blue)] ${
          isLarge ? "text-[26px] tracking-[-0.02em]" : "text-[15px]"
        }`}
      >
        acme
      </span>
    </div>
  );
}

export function SectionEyebrow({
  children,
  pill = false,
  tone = "cyan",
}: {
  children: React.ReactNode;
  pill?: boolean;
  tone?: "cyan" | "plum";
}) {
  const toneVar =
    tone === "plum"
      ? "var(--color-radial-twilight-gradient)"
      : "var(--color-callout-cyan)";
  if (pill) {
    return (
      <span
        className="mb-6 inline-flex items-center rounded-md px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em]"
        style={{
          backgroundColor: `color-mix(in srgb, ${toneVar} 7%, var(--color-ghost-white))`,
          color: `color-mix(in srgb, ${toneVar} 75%, var(--color-slate-text))`,
        }}
      >
        {children}
      </span>
    );
  }
  return (
    <p
      className="mb-4 font-mono text-[11px] uppercase leading-none"
      style={{ color: toneVar }}
    >
      {children}
    </p>
  );
}

export function ActionLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outlinedPill" | "heroPrimary" | "heroSecondary";
}) {
  const styles = {
    primary:
      "rounded-[8px] px-4 py-2.5 bg-[var(--color-action-orange)] text-[var(--color-ghost-white)] shadow-[var(--shadow-subtle)] hover:translate-y-[-1px] hover:brightness-[0.96]",
    secondary:
      "rounded-[8px] px-4 py-2.5 text-[var(--color-deep-plum)] hover:text-[var(--color-action-orange)]",
    ghost:
      "rounded-[8px] px-4 py-2.5 border border-[var(--border-inverted-subtle)] bg-[var(--surface-inverted-muted)] text-[var(--color-inverted-copy)] hover:translate-y-[-1px] hover:bg-[color-mix(in_srgb,var(--color-ghost-white)_10%,transparent)]",
    outlinedPill:
      "rounded-full px-5 py-2.5 border border-[color-mix(in_srgb,var(--color-ink-blue)_18%,transparent)] bg-[var(--color-ghost-white)] text-[var(--color-ink-blue)] shadow-[var(--shadow-subtle-5)] hover:translate-y-[-1px] hover:bg-[var(--color-fog-gray)]",
    heroPrimary:
      "min-h-[48px] rounded-[8px] bg-[var(--color-deep-plum)] px-[20px] py-[12px] text-[14px] text-[var(--color-ghost-white)] shadow-[var(--shadow-subtle)] hover:translate-y-[-1px] hover:brightness-[1.04]",
    heroSecondary:
      "min-h-[48px] rounded-[8px] border border-[var(--color-steel-gray)] bg-[var(--color-ghost-white)] px-[16px] py-[12px] text-[14px] text-[var(--color-ink-blue)] shadow-[var(--shadow-subtle-2)] hover:translate-y-[-1px] hover:border-[color-mix(in_srgb,var(--color-ink-blue)_18%,var(--color-steel-gray))] hover:text-[var(--color-deep-plum)]",
  };

  const Icon = variant === "outlinedPill" || variant === "heroPrimary" ? ChevronRight : ArrowUpRight;
  const iconClass = variant === "heroPrimary" || variant === "heroSecondary" ? "h-[14px] w-[14px]" : "h-3.5 w-3.5";

  return (
    <a
      href={href}
      className={`focus-ring inline-flex items-center justify-center gap-2 text-sm font-medium leading-none transition duration-200 active:translate-y-[1px] ${styles[variant]}`}
      style={variant === "heroPrimary" ? { color: "var(--color-ghost-white)" } : undefined}
    >
      {children}
      <Icon className={iconClass} strokeWidth={iconStroke} />
    </a>
  );
}

export function DottedMap({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 soft-map opacity-80 ${className}`}
    />
  );
}

export function ProductSignalCard() {
  const rows = [
    { label: "Realtime transaction feed", value: "Synced 12s ago", tone: "text-[var(--color-success-moss)]" },
    { label: "Bank feed connected", value: "DBS operating account", tone: "text-[var(--color-callout-cyan)]" },
    { label: "Reconciliation status", value: "42 invoices matched", tone: "text-[var(--color-deep-plum)]" },
  ];

  return (
    <div className="float-slow w-full max-w-[25rem] rounded-[8px] border border-[var(--color-steel-gray)] bg-[var(--surface-ghost-88)] p-4 shadow-[var(--shadow-xl)] backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase text-[var(--color-slate-text)]">
            Acme bank console
          </p>
          <h3 className="mt-1 text-base font-semibold text-[var(--color-ink-blue)]">
            Live bank connectivity
          </h3>
        </div>
        <span className="rounded-[8px] bg-[var(--color-fog-gray)] px-2.5 py-1 font-mono text-[10px] text-[var(--color-callout-cyan)]">
          LIVE
        </span>
      </div>
      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-[8px] border border-[var(--color-steel-gray)] bg-[var(--color-ghost-white)] p-3 shadow-[var(--shadow-subtle)]"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-medium text-[var(--color-ink-blue)]">{row.label}</p>
              <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${row.tone}`} strokeWidth={iconStroke} />
            </div>
            <p className="mt-1 font-mono text-[11px] text-[var(--color-slate-text)]">{row.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 overflow-hidden rounded-[8px] border border-[var(--color-steel-gray)] bg-[var(--color-fog-gray)]">
        <div className="h-1.5 w-[72%] bg-[var(--color-action-orange)]" />
        <div className="flex items-center justify-between px-3 py-2 font-mono text-[10px] text-[var(--color-slate-text)]">
          <span>bank_feed.created</span>
          <span>200 OK</span>
        </div>
      </div>
    </div>
  );
}

export function CodeWindow({
  title,
  lines,
  dark = false,
}: {
  title: string;
  lines: readonly string[];
  dark?: boolean;
}) {
  return (
    <div
      className={`min-w-0 max-w-full overflow-hidden rounded-[8px] border shadow-[var(--shadow-subtle)] ${
        dark
          ? "border-[var(--border-inverted-subtle)] bg-[var(--surface-inverted-panel)] text-[var(--color-inverted-copy)]"
          : "border-[var(--color-steel-gray)] bg-[var(--color-ghost-white)] text-[var(--color-ink-blue)]"
      }`}
    >
      <div
        className={`flex items-center justify-between border-b px-4 py-3 ${
          dark ? "border-[var(--border-inverted-subtle)] bg-[var(--surface-inverted-header)]" : "border-[var(--color-steel-gray)] bg-[var(--color-fog-gray)]"
        }`}
      >
        <span className="font-mono text-[11px]">{title}</span>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[var(--color-action-orange)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--color-success-moss)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--color-info-blue)]" />
        </div>
      </div>
      <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-all p-4 font-mono text-[12px] leading-6">
        {lines.join("\n")}
      </pre>
    </div>
  );
}

export function ProtocolCard({
  icon: Icon,
  title,
  body,
}: {
  icon: IconComponent;
  title: string;
  body: string;
}) {
  return (
    <div className="min-w-0 rounded-[8px] border border-[var(--color-steel-gray)] bg-[var(--color-ghost-white)] p-5 shadow-[var(--shadow-subtle)]">
      <Icon className="h-5 w-5 text-[var(--color-callout-cyan)]" strokeWidth={iconStroke} />
      <h3 className="mt-5 text-lg font-semibold text-[var(--color-ink-blue)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--color-slate-text)]">{body}</p>
    </div>
  );
}

export function InfrastructureStack() {
  return (
    <div className="relative mx-auto grid min-h-[23rem] w-full max-w-[25rem] place-items-center">
      <div className="dark-grid absolute inset-0 rounded-[8px] border border-[var(--border-inverted-subtle)] bg-[var(--surface-inverted-card)]" />
      <div className="relative h-48 w-56">
        {[0, 1, 2].map((layer) => (
          <div
            key={layer}
            className="absolute left-1/2 h-28 w-48 -translate-x-1/2 rotate-45 rounded-[8px] border border-[var(--border-notification-subtle)] bg-gradient-to-br from-[var(--surface-inverted-gradient-start)] to-[var(--surface-inverted-gradient-end)] shadow-[var(--shadow-inverted-layer)]"
            style={{ top: `${layer * 44}px`, transform: `translateX(-50%) rotate(45deg) skew(-10deg, -10deg)` }}
          />
        ))}
      </div>
      <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {["API", "SFTP", "Webhooks", "Bank files"].map((item) => (
          <span key={item} className="rounded-[6px] border border-[var(--border-inverted-subtle)] bg-[var(--surface-inverted-muted)] px-2 py-2 text-center font-mono text-[10px] text-[var(--color-inverted-copy)]">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export const moduleIcons = {
  api: FileCode2,
  bank: Landmark,
  data: Database,
  network: Network,
  cards: WalletCards,
  money: CircleDollarSign,
  lock: LockKeyhole,
  docs: BookOpen,
  chat: MessageSquareText,
};

export function ModuleChip({
  children,
  icon: Icon = CheckCircle2,
}: {
  children: React.ReactNode;
  icon?: IconComponent;
}) {
  return (
    <span className="inline-flex min-h-10 items-center gap-2 rounded-[8px] border border-[var(--color-steel-gray)] bg-[var(--color-ghost-white)] px-3 py-2 text-sm font-medium text-[var(--color-ink-blue)] shadow-[var(--shadow-subtle)]">
      <Icon className="h-4 w-4 text-[var(--color-callout-cyan)]" strokeWidth={iconStroke} />
      {children}
    </span>
  );
}

export const moduleItemIcons: Record<string, IconComponent> = {
  ACH: TrendingUp,
  Checks: FileCheck,
  Wire: ArrowLeftRight,
  Realtime: RefreshCw,
  "Book Transfers": Split,
  "International Wire": Globe,
  "Bank Accounts": Wallet,
  Credit: CreditCard,
  Debit: CreditCard,
  Prepaid: CreditCard,
  "Loan Origination": Package,
  "Loan Purchase": Box,
  "Debt Financing": BarChart2,
};

export function ModuleCard({
  children,
  icon: Icon = CheckCircle2,
  tone = "navy",
}: {
  children: React.ReactNode;
  icon?: IconComponent;
  tone?: "navy" | "green" | "red";
}) {
  const toneVar =
    tone === "green"
      ? "var(--color-success-moss)"
      : tone === "red"
        ? "var(--color-error-red)"
        : "var(--color-deep-plum)";
  return (
    <span
      className="inline-flex w-full items-center gap-3 rounded-[10px] px-5 py-4 text-[15px] font-medium leading-none text-[var(--color-deep-plum)]"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-deep-plum) 5%, var(--color-fog-gray))",
      }}
    >
      <Icon className="h-5 w-5 shrink-0" strokeWidth={1.6} style={{ color: toneVar }} />
      {children}
    </span>
  );
}
