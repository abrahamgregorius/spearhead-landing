"use client";

import { useMemo } from "react";
import { m } from "motion/react";

/* Lightweight hand-rolled SVG charts — no charting dependency (§12).
   Paths keep a constant point count so Motion can interpolate `d`
   between datasets for animated metric changes (§11D). */

export type ChartSeries = {
  label: string;
  values: number[];
  color: string;
  fill?: boolean;
};

const W = 560;
const PAD_L = 40;
const PAD_R = 10;
const PAD_T = 12;
const PAD_B = 26;

function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export function AreaChart({
  series,
  labels,
  formatValue,
  height = 220,
  idPrefix = "chart",
}: {
  series: ChartSeries[];
  labels: string[];
  formatValue: (value: number) => string;
  height?: number;
  idPrefix?: string;
}) {
  const n = series[0]?.values.length ?? 0;
  const H = height;

  const { min, max } = useMemo(() => {
    const all = series.flatMap((s) => s.values);
    const lo = Math.min(...all);
    const hi = Math.max(...all);
    const span = hi - lo || hi || 1;
    return { min: Math.max(0, lo - span * 0.15), max: hi + span * 0.12 };
  }, [series]);

  const x = (i: number) =>
    PAD_L + (i / Math.max(1, n - 1)) * (W - PAD_L - PAD_R);
  const y = (v: number) =>
    PAD_T + (1 - (v - min) / (max - min || 1)) * (H - PAD_T - PAD_B);

  const gridValues = [0, 0.25, 0.5, 0.75, 1].map((t) => min + t * (max - min));
  const primary = series[0];
  const primaryPoints = primary
    ? primary.values.map((v, i) => ({ x: x(i), y: y(v) }))
    : [];
  const primaryPath = smoothPath(primaryPoints);
  const fillPath =
    primaryPoints.length > 1
      ? `${primaryPath} L ${primaryPoints[primaryPoints.length - 1].x} ${H - PAD_B} L ${primaryPoints[0].x} ${H - PAD_B} Z`
      : "";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "auto" }}
      role="img"
      aria-label={`Chart of ${series.map((s) => s.label).join(" and ")}`}
      className="overflow-visible"
    >
      <defs>
        <linearGradient id={`${idPrefix}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={primary?.color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={primary?.color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* fine gridlines + y labels */}
      {gridValues.map((v, i) => (
        <g key={i}>
          <line
            x1={PAD_L}
            x2={W - PAD_R}
            y1={y(v)}
            y2={y(v)}
            stroke="currentColor"
            className="text-ink2"
            strokeOpacity={0.12}
            strokeWidth={1}
          />
          <text
            x={PAD_L - 6}
            y={y(v) + 3}
            textAnchor="end"
            className="tnum fill-current text-muted"
            fontSize="9"
          >
            {formatValue(v)}
          </text>
        </g>
      ))}

      {/* x labels */}
      {labels.map((label, i) =>
        i % 2 === 0 || i === labels.length - 1 ? (
          <text
            key={i}
            x={x(i)}
            y={H - 8}
            textAnchor="middle"
            className="fill-current text-muted"
            fontSize="9"
          >
            {label}
          </text>
        ) : null,
      )}

      {/* fills */}
      {primary && fillPath && (
        <m.path
          d={fillPath}
          fill={`url(#${idPrefix}-fill)`}
          initial={false}
          animate={{ d: fillPath, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      )}

      {/* lines */}
      {series.map((s, si) => {
        const pts = s.values.map((v, i) => ({ x: x(i), y: y(v) }));
        const d = smoothPath(pts);
        return (
          <m.path
            key={s.label}
            d={d}
            fill="none"
            stroke={s.color}
            strokeWidth={si === 0 ? 2 : 1.5}
            strokeLinecap="round"
            strokeOpacity={si === 0 ? 1 : 0.55}
            initial={false}
            animate={{ d }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        );
      })}

      {/* end-point marker on primary series */}
      {primaryPoints.length > 0 && (
        <m.g
          key={`${primary.label}-${primaryPoints.length}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: primaryPoints[primaryPoints.length - 1].x,
            y: primaryPoints[primaryPoints.length - 1].y,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <circle r="7" fill={primary.color} fillOpacity="0.2" />
          <circle r="3" fill={primary.color} />
        </m.g>
      )}
    </svg>
  );
}

/* Tiny sparkline for compact previews. */
export function Sparkline({
  values,
  color = "#A3E635",
  width = 120,
  height = 36,
  fill = false,
}: {
  values: number[];
  color?: string;
  width?: number;
  height?: number;
  fill?: boolean;
}) {
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const span = hi - lo || 1;
  const pts = values.map(
    (v, i) =>
      [
        (i / (values.length - 1)) * width,
        height - 3 - ((v - lo) / span) * (height - 6),
      ] as const,
  );
  const d = pts
    .map(([px, py], i) => `${i === 0 ? "M" : "L"} ${px} ${py}`)
    .join(" ");
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
    >
      {fill && (
        <path
          d={`${d} L ${width} ${height} L 0 ${height} Z`}
          fill={color}
          fillOpacity="0.14"
        />
      )}
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
