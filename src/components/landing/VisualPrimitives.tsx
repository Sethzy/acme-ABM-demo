import { ArrowUpRight, ChevronRight } from "lucide-react";

const iconStroke = 1.55;

export function ActionLink({
  href,
  children,
  variant = "heroPrimary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "heroPrimary" | "heroSecondary";
}) {
  const styles = {
    heroPrimary:
      "min-h-[48px] rounded-[8px] bg-[var(--color-deep-plum)] px-[20px] py-[12px] text-[14px] text-[var(--color-ghost-white)] shadow-[var(--shadow-subtle)] hover:translate-y-[-1px] hover:brightness-[1.04]",
    heroSecondary:
      "min-h-[48px] rounded-[8px] border border-[var(--color-steel-gray)] bg-[var(--color-ghost-white)] px-[16px] py-[12px] text-[14px] text-[var(--color-ink-blue)] shadow-[var(--shadow-subtle-2)] hover:translate-y-[-1px] hover:border-[color-mix(in_srgb,var(--color-ink-blue)_18%,var(--color-steel-gray))] hover:text-[var(--color-deep-plum)]",
  };

  const Icon = variant === "heroPrimary" ? ChevronRight : ArrowUpRight;

  return (
    <a
      href={href}
      className={`focus-ring inline-flex items-center justify-center gap-2 text-sm font-medium leading-none transition duration-200 active:translate-y-[1px] ${styles[variant]}`}
      style={variant === "heroPrimary" ? { color: "var(--color-ghost-white)" } : undefined}
    >
      {children}
      <Icon className="h-[14px] w-[14px]" strokeWidth={iconStroke} />
    </a>
  );
}
