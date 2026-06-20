import { ArrowUpRight, ChevronRight } from "lucide-react";

const iconStroke = 1.6;

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
      "min-h-[48px] rounded-[8px] border border-transparent bg-[var(--color-surface-raised)] px-[22px] py-[13px] text-[14px] text-[var(--color-revolut-blue)] shadow-[var(--shadow-subtle)] transition duration-200 hover:-translate-y-[1px] hover:text-[var(--color-revolut-blue-dark)] hover:shadow-[0_10px_28px_-14px_rgba(0,117,235,0.4)] active:translate-y-[1px] active:bg-[var(--color-revolut-blue-tint)]",
    heroSecondary:
      "min-h-[48px] rounded-[8px] border border-transparent bg-[var(--color-revolut-blue-tint)] px-[18px] py-[13px] text-[14px] text-[var(--color-revolut-blue-dark)] transition duration-200 hover:-translate-y-[1px] hover:bg-[color-mix(in_srgb,var(--color-revolut-blue)_14%,var(--color-revolut-blue-tint))] active:translate-y-[1px] active:bg-[var(--color-revolut-blue-tint)]",
  };

  const Icon = variant === "heroPrimary" ? ChevronRight : ArrowUpRight;

  return (
    <a
      href={href}
      className={`focus-ring group inline-flex items-center justify-center gap-2 text-sm font-medium leading-none transition ${styles[variant]}`}
    >
      {children}
      <Icon
        className="h-[14px] w-[14px] translate-y-[0.5px] transition-transform duration-200 group-hover:translate-x-[1px]"
        strokeWidth={iconStroke}
      />
    </a>
  );
}
