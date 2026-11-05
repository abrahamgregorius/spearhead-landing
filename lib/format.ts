/* Number and currency formatters shared across dashboards and demos. */

export function fmtCurrency(value: number, opts?: { compact?: boolean }) {
  if (opts?.compact && Math.abs(value) >= 10_000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function fmtNumber(value: number, opts?: { compact?: boolean }) {
  if (opts?.compact && Math.abs(value) >= 10_000) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

export function fmtMultiple(value: number) {
  return `${value.toFixed(1)}x`;
}

export function fmtPercent(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}
