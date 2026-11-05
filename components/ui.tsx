import type { ReactNode } from "react";

/* Shared interface primitives — the single dashboard design system
   used by the hero dashboard, What-We-Do previews and use-case demos
   (§5.6, §6.1, §7.5). Token-based so every surface adapts to the
   active theme; the hero scopes these tokens to dark via `.scope-dark`. */

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[14px] border border-line bg-card ${className}`}
    >
      {children}
    </div>
  );
}

export function Chip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-ink2 ${className}`}
    >
      {children}
    </span>
  );
}

/* KPI card — §5.6 main metrics. */
export function Kpi({
  label,
  value,
  delta,
  positive = true,
  icon,
}: {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  icon?: ReactNode;
}) {
  return (
    <Panel className="px-4 py-3.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-muted">{label}</span>
        {icon && <span className="text-muted">{icon}</span>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="tnum text-[20px] font-semibold leading-none tracking-[-0.01em] text-ink">
          {value}
        </span>
        {delta && (
          <span
            className={`tnum text-[11px] font-medium ${positive ? "text-lime" : "text-muted"}`}
          >
            {delta}
          </span>
        )}
      </div>
    </Panel>
  );
}

/* Segmented control — used for date ranges, metrics and filters. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className = "",
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-0.5 rounded-[10px] border border-line bg-surface p-0.5 ${className}`}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={`h-7 rounded-[8px] px-2.5 text-[12px] font-medium transition-colors ${
              active
                ? "bg-lime/15 text-lime"
                : "text-ink2 hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/* Campaign / item status chip. */
export type ItemStatus = "active" | "paused" | "completed";

export function StatusChip({ status }: { status: ItemStatus }) {
  const map: Record<ItemStatus, { label: string; dot: string }> = {
    active: { label: "Active", dot: "bg-lime" },
    paused: { label: "Paused", dot: "bg-muted" },
    completed: { label: "Completed", dot: "bg-ink2" },
  };
  const { label, dot } = map[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-ink2">
      <span className={`size-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

/* Priority indicator — §7.3. Lime marks the highest priority. */
export function PriorityBadge({ level }: { level: "high" | "medium" }) {
  if (level === "high") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-lime/15 px-2 py-0.5 text-[11px] font-semibold text-lime ring-1 ring-inset ring-lime/30">
        <span className="size-1.5 rounded-full bg-lime" />
        High priority
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 text-[11px] font-medium text-ink2">
      <span className="size-1.5 rounded-full bg-ink2" />
      Medium priority
    </span>
  );
}

/* Tiny horizontal progress / comparison bar. */
export function Bar({
  pct,
  className = "bg-lime",
}: {
  pct: number;
  className?: string;
}) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
      <div
        className={`h-full rounded-full transition-[width] duration-500 ${className}`}
        style={{ width: `${Math.min(100, Math.max(2, pct))}%` }}
      />
    </div>
  );
}

/* Buttons — 44px minimum interactive height (§13). */
export const btnPrimary =
  "inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-lime px-5 text-[13.5px] font-semibold text-[#101408] transition-colors hover:bg-lime2 disabled:cursor-not-allowed disabled:opacity-60";

export const btnSecondary =
  "inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-line bg-transparent px-5 text-[13.5px] font-medium text-ink transition-colors hover:bg-surface";

/* Small in-dashboard button variant. */
export const btnGhostSmall =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-[8px] border border-line px-3 text-[12px] font-medium text-ink2 transition-colors hover:bg-surface hover:text-ink disabled:cursor-not-allowed disabled:opacity-50";

export const btnLimeSmall =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-[8px] bg-lime px-3 text-[12px] font-semibold text-[#101408] transition-colors hover:bg-lime2 disabled:cursor-not-allowed disabled:opacity-60";

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

/* Section introduction — §6/§7/§8. */
export function SectionHead({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  const centered = align === "center";
  return (
    <div
      className={`max-w-[720px] ${centered ? "mx-auto text-center" : "text-left"}`}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase ${
          dark
            ? "border-lime/25 bg-lime/10 text-lime3"
            : "border-line bg-surface text-lime2"
        }`}
      >
        <span className="size-1.5 rounded-full bg-lime" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-[30px] leading-[1.12] font-semibold tracking-[-0.02em] text-ink md:text-[40px]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-[1.65] text-ink2 md:text-[16px]">
          {description}
        </p>
      )}
    </div>
  );
}
