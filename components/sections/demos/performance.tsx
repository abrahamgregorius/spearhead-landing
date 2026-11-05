"use client";

import { useMemo, useState } from "react";
import { Panel, Kpi, Segmented, StatusChip, type ItemStatus } from "@/components/ui";
import { AreaChart } from "@/components/charts";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  MouseClick,
  Search,
  Sparkles,
  Target,
  Close,
  Bot,
} from "@/components/icons";
import { fmtCurrency, fmtNumber } from "@/lib/format";

/* §7.2 — Understand Performance: interactive analytics workspace with
   realistic sample data. */

type RangeId = "7d" | "30d" | "90d";
type MetricId = "revenue" | "spend" | "conversions" | "roas";
type SortKey = "name" | "spend" | "conversions" | "roas";

const CAMPAIGN_BASE = [
  { name: "Brand Core", channel: "Search", status: "active" as ItemStatus },
  { name: "Prospecting Wide", channel: "Social", status: "active" as ItemStatus },
  { name: "Retargeting ENG", channel: "Display", status: "paused" as ItemStatus },
  { name: "Awareness Launch", channel: "Video", status: "active" as ItemStatus },
  { name: "Competitor Terms", channel: "Search", status: "completed" as ItemStatus },
];

const RANGES: Record<
  RangeId,
  {
    label: string;
    labels: string[];
    kpis: {
      spend: number;
      impressions: number;
      clicks: number;
      conversions: number;
      roas: number;
    };
    deltas: Record<string, string>;
    positive: Record<string, boolean>;
    series: Record<MetricId, number[]>;
    campaigns: { spend: number; conversions: number; roas: number }[];
    insight: { headline: string; points: string[] };
  }
> = {
  "7d": {
    label: "7 days",
    labels: ["Oct 31", "Nov 1", "Nov 2", "Nov 3", "Nov 4", "Nov 5", "Nov 6"],
    kpis: {
      spend: 2450,
      impressions: 128400,
      clicks: 3210,
      conversions: 86,
      roas: 3.4,
    },
    deltas: {
      spend: "-12.4%",
      impressions: "-8.1%",
      clicks: "-10.5%",
      conversions: "-16.2%",
      roas: "-0.6x",
    },
    positive: { spend: false, impressions: false, clicks: false, conversions: false, roas: false },
    series: {
      revenue: [1300, 1240, 1180, 1150, 1120, 1180, 1160],
      spend: [370, 360, 340, 355, 335, 340, 350],
      conversions: [13, 13, 12, 12, 12, 12, 12],
      roas: [3.5, 3.4, 3.5, 3.2, 3.3, 3.5, 3.3],
    },
    campaigns: [
      { spend: 640, conversions: 28, roas: 4.2 },
      { spend: 520, conversions: 18, roas: 2.4 },
      { spend: 385, conversions: 14, roas: 2.8 },
      { spend: 450, conversions: 12, roas: 2.1 },
      { spend: 455, conversions: 14, roas: 3.6 },
    ],
    insight: {
      headline: "Performance declined vs. the previous week.",
      points: [
        "Conversions fell 16.2% while spend fell only 12.4% — efficiency, not budget, is the problem.",
        "Prospecting Wide dropped to 2.4x ROAS and is dragging the account average down.",
        "Brand Core held 4.2x — shifting budget toward it is the highest-impact lever.",
      ],
    },
  },
  "30d": {
    label: "30 days",
    labels: ["Oct 8", "Oct 15", "Oct 22", "Oct 29", "Nov 5"],
    kpis: {
      spend: 10480,
      impressions: 542900,
      clicks: 13760,
      conversions: 352,
      roas: 3.1,
    },
    deltas: {
      spend: "+1.8%",
      impressions: "+2.4%",
      clicks: "-4.2%",
      conversions: "-9.8%",
      roas: "-0.5x",
    },
    positive: { spend: true, impressions: true, clicks: false, conversions: false, roas: false },
    series: {
      revenue: [6500, 6480, 6520, 6500, 6488],
      spend: [2100, 2090, 2100, 2090, 2100],
      conversions: [70, 70, 71, 70, 71],
      roas: [3.1, 3.1, 3.1, 3.1, 3.1],
    },
    campaigns: [
      { spend: 2740, conversions: 112, roas: 4.0 },
      { spend: 2480, conversions: 74, roas: 2.1 },
      { spend: 1650, conversions: 58, roas: 2.9 },
      { spend: 1890, conversions: 52, roas: 1.9 },
      { spend: 1720, conversions: 56, roas: 3.4 },
    ],
    insight: {
      headline: "The 30-day decline traces to creative fatigue.",
      points: [
        "Prospecting Wide frequency crossed 3.4 — click-through rate is fading.",
        "Retargeting ENG stayed efficient but capped by a paused budget.",
        "Refreshing prospecting creatives is the fastest recovery path.",
      ],
    },
  },
  "90d": {
    label: "90 days",
    labels: ["Aug 8", "Aug 23", "Sep 6", "Sep 20", "Oct 4", "Nov 6"],
    kpis: {
      spend: 31940,
      impressions: 1655300,
      clicks: 41240,
      conversions: 1148,
      roas: 3.5,
    },
    deltas: {
      spend: "+8.2%",
      impressions: "+11.6%",
      clicks: "+6.9%",
      conversions: "+12.4%",
      roas: "+0.3x",
    },
    positive: { spend: true, impressions: true, clicks: true, conversions: true, roas: true },
    series: {
      revenue: [18400, 18500, 18600, 18700, 18800, 18790],
      spend: [5250, 5300, 5340, 5290, 5380, 5380],
      conversions: [190, 191, 191, 192, 192, 192],
      roas: [3.5, 3.5, 3.5, 3.5, 3.5, 3.5],
    },
    campaigns: [
      { spend: 8320, conversions: 348, roas: 4.1 },
      { spend: 7650, conversions: 226, roas: 2.3 },
      { spend: 5180, conversions: 182, roas: 3.0 },
      { spend: 5640, conversions: 164, roas: 2.2 },
      { spend: 5150, conversions: 228, roas: 3.7 },
    ],
    insight: {
      headline: "The long-run trend is healthy.",
      points: [
        "90-day ROAS improved to 3.5x despite the recent weekly dip.",
        "Search campaigns consistently outperform — they justify more budget.",
        "Video awareness is a long game: judge it on assisted conversions.",
      ],
    },
  },
};

const METRIC_META: Record<
  MetricId,
  { label: string; color: string; format: (v: number) => string }
> = {
  revenue: {
    label: "Revenue",
    color: "#A3E635",
    format: (v) => fmtCurrency(v, { compact: true }),
  },
  spend: {
    label: "Spend",
    color: "#A0A89A",
    format: (v) => fmtCurrency(v, { compact: true }),
  },
  conversions: {
    label: "Conversions",
    color: "#D9F99D",
    format: (v) => fmtNumber(Math.round(v)),
  },
  roas: {
    label: "ROAS",
    color: "#A3E635",
    format: (v) => `${v.toFixed(1)}x`,
  },
};

const SORT_HEADERS: { key: SortKey; label: string; numeric: boolean; className?: string }[] = [
  { key: "name", label: "Campaign", numeric: false },
  { key: "spend", label: "Spend", numeric: true },
  { key: "conversions", label: "Conv.", numeric: true, className: "hidden md:table-cell" },
  { key: "roas", label: "ROAS", numeric: true },
];

export function PerformanceDemo() {
  const [range, setRange] = useState<RangeId>("7d");
  const [metric, setMetric] = useState<MetricId>("revenue");
  const [status, setStatus] = useState<"all" | ItemStatus>("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({
    key: "roas",
    dir: -1,
  });
  const [selected, setSelected] = useState<string | null>(null);
  const [insightOpen, setInsightOpen] = useState(false);

  const data = RANGES[range];
  const meta = METRIC_META[metric];

  const campaigns = useMemo(() => {
    const rows = CAMPAIGN_BASE.map((base, i) => ({
      ...base,
      ...data.campaigns[i],
      ctr: (3210 / 128400) * 100 * (1 + i * 0.14),
      cpc: data.campaigns[i].spend / (data.campaigns[i].conversions * 22),
    }));
    const filtered =
      status === "all" ? rows : rows.filter((r) => r.status === status);
    const sorted = [...filtered].sort((a, b) => {
      const va = a[sort.key];
      const vb = b[sort.key];
      if (typeof va === "string" && typeof vb === "string") {
        return va.localeCompare(vb) * sort.dir;
      }
      return ((va as number) - (vb as number)) * sort.dir;
    });
    return sorted;
  }, [data, status, sort]);

  const selectedCampaign = campaigns.find((c) => c.name === selected) ?? null;

  const toggleSort = (key: SortKey) => {
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === "name" ? 1 : -1 },
    );
  };

  return (
    <Panel className="overflow-hidden">
      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line px-3.5 py-2.5">
        <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink">
          <Search size={14} className="text-muted" />
          Performance
        </span>
        <span className="rounded-full border border-line px-2 py-0.5 text-[10px] text-muted">
          Sample data
        </span>
        <div className="ml-auto flex items-center gap-1.5 text-[11.5px] text-muted">
          <Calendar size={13} />
          <Segmented<RangeId>
            ariaLabel="Date range"
            options={[
              { value: "7d", label: "7d" },
              { value: "30d", label: "30d" },
              { value: "90d", label: "90d" },
            ]}
            value={range}
            onChange={(r) => {
              setRange(r);
              setSelected(null);
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 p-3 md:p-3.5">
        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
          <Kpi
            label="Ad Spend"
            value={fmtCurrency(data.kpis.spend)}
            delta={data.deltas.spend}
            positive={data.positive.spend}
          />
          <Kpi
            label="Impressions"
            value={fmtNumber(data.kpis.impressions, { compact: true })}
            delta={data.deltas.impressions}
            positive={data.positive.impressions}
          />
          <Kpi
            label="Clicks"
            value={fmtNumber(data.kpis.clicks, { compact: true })}
            delta={data.deltas.clicks}
            positive={data.positive.clicks}
          />
          <Kpi
            label="Conversions"
            value={fmtNumber(data.kpis.conversions)}
            delta={data.deltas.conversions}
            positive={data.positive.conversions}
          />
          <Kpi
            label="ROAS"
            value={`${data.kpis.roas.toFixed(1)}x`}
            delta={data.deltas.roas}
            positive={data.positive.roas}
          />
        </div>

        {/* chart */}
        <div className="rounded-[12px] border border-line bg-surface/40 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11.5px] text-muted">
              <span
                className="size-1.5 rounded-full"
                style={{ background: meta.color }}
              />
              {meta.label} — {data.label.toLowerCase()}
            </span>
            <Segmented<MetricId>
              ariaLabel="Chart metric"
              options={[
                { value: "revenue", label: "Revenue" },
                { value: "spend", label: "Spend" },
                { value: "conversions", label: "Conv." },
                { value: "roas", label: "ROAS" },
              ]}
              value={metric}
              onChange={setMetric}
            />
          </div>
          <div className="mt-2 text-ink2">
            <AreaChart
              key={`${range}-${metric}`}
              idPrefix="perf-chart"
              height={190}
              labels={data.labels}
              formatValue={(v) =>
                metric === "roas"
                  ? meta.format(v)
                  : meta.format(Math.round(v))
              }
              series={[
                {
                  label: meta.label,
                  values: data.series[metric],
                  color: meta.color,
                  fill: true,
                },
              ]}
            />
          </div>
        </div>

        {/* AI insight — expandable */}
        <div
          className={`rounded-[12px] border p-3 ${insightOpen ? "border-lime/25 bg-lime/6" : "border-line bg-surface/40"}`}
        >
          <button
            onClick={() => setInsightOpen((v) => !v)}
            aria-expanded={insightOpen}
            className="flex w-full items-center gap-2 text-left"
          >
            <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-[8px] bg-lime/15 text-lime">
              <Sparkles size={13} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold tracking-[0.08em] text-lime2 uppercase">
                AI insight
              </span>
              <span className="block truncate text-[13px] font-medium text-ink">
                {data.insight.headline}
              </span>
            </span>
            {insightOpen ? (
              <ChevronUp size={15} className="shrink-0 text-muted" />
            ) : (
              <ChevronDown size={15} className="shrink-0 text-muted" />
            )}
          </button>
          {insightOpen && (
            <ul className="mt-3 flex flex-col gap-1.5 border-t border-line pt-3">
              {data.insight.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-[12.5px] leading-[1.5] text-ink2"
                >
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-lime" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* campaign table */}
        <div className="overflow-hidden rounded-[12px] border border-line bg-surface/40">
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5">
            <span className="text-[12.5px] font-semibold text-ink">
              Campaigns
            </span>
            <Segmented<"all" | ItemStatus>
              ariaLabel="Filter by status"
              options={[
                { value: "all", label: "All" },
                { value: "active", label: "Active" },
                { value: "paused", label: "Paused" },
                { value: "completed", label: "Done" },
              ]}
              value={status}
              onChange={(s) => {
                setStatus(s);
                setSelected(null);
              }}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[430px] text-left">
              <thead>
                <tr className="border-y border-line text-[11px] text-muted">
                  {SORT_HEADERS.map((h) => (
                    <th
                      key={h.key}
                      className={`px-3 py-2 font-medium ${h.numeric ? "text-right" : ""} ${h.className ?? ""}`}
                      aria-sort={
                        sort.key === h.key
                          ? sort.dir === 1
                            ? "ascending"
                            : "descending"
                          : undefined
                      }
                    >
                      <button
                        onClick={() => toggleSort(h.key)}
                        className={`inline-flex items-center gap-1 transition-colors hover:text-ink ${sort.key === h.key ? "text-lime" : ""}`}
                      >
                        {h.label}
                        {sort.key === h.key &&
                          (sort.dir === 1 ? (
                            <ChevronUp size={12} />
                          ) : (
                            <ChevronDown size={12} />
                          ))}
                      </button>
                    </th>
                  ))}
                  <th className="hidden px-3 py-2 font-medium sm:table-cell">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => {
                  const isSel = selected === c.name;
                  return (
                    <tr
                      key={c.name}
                      onClick={() => setSelected(isSel ? null : c.name)}
                      className={`cursor-pointer border-b border-line/60 text-[12.5px] text-ink transition-colors last:border-0 ${
                        isSel ? "bg-lime/8" : "hover:bg-surface/70"
                      }`}
                      aria-selected={isSel}
                    >
                      <td className="px-3 py-2 font-medium">{c.name}</td>
                      <td className="tnum px-3 py-2 text-right text-ink2">
                        {fmtCurrency(c.spend)}
                      </td>
                      <td className="tnum hidden px-3 py-2 text-right text-ink2 md:table-cell">
                        {fmtNumber(c.conversions)}
                      </td>
                      <td className="tnum px-3 py-2 text-right font-semibold text-lime">
                        {c.roas.toFixed(1)}x
                      </td>
                      <td className="hidden px-3 py-2 sm:table-cell">
                        <StatusChip status={c.status} />
                      </td>
                    </tr>
                  );
                })}
                {campaigns.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-6 text-center text-[12.5px] text-muted"
                    >
                      No campaigns with this status in the selected range.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* campaign detail — row select (§7.2) */}
          {selectedCampaign && (
            <div className="border-t border-line bg-card p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink">
                  {selectedCampaign.name}
                  <span className="text-[11px] font-normal text-muted">
                    {selectedCampaign.channel}
                  </span>
                </span>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close campaign details"
                  className="inline-flex size-7 items-center justify-center rounded-[8px] text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  <Close size={14} />
                </button>
              </div>
              <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  {
                    icon: <MouseClick size={12} />,
                    label: "Clicks",
                    value: fmtNumber(selectedCampaign.conversions * 22),
                  },
                  {
                    icon: <Target size={12} />,
                    label: "Conversions",
                    value: fmtNumber(selectedCampaign.conversions),
                  },
                  {
                    icon: <Search size={12} />,
                    label: "Avg. CPC",
                    value: fmtCurrency(selectedCampaign.cpc, {
                      compact: true,
                    }),
                  },
                  {
                    icon: <Sparkles size={12} />,
                    label: "ROAS",
                    value: `${selectedCampaign.roas.toFixed(1)}x`,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[10px] bg-surface/60 px-3 py-2"
                  >
                    <div className="flex items-center gap-1.5 text-[10.5px] text-muted">
                      {stat.icon}
                      {stat.label}
                    </div>
                    <div className="tnum mt-1 text-[15px] font-semibold text-ink">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2.5 flex items-start gap-2 rounded-[10px] border border-lime/20 bg-lime/6 p-2.5">
                <Bot size={13} className="mt-0.5 shrink-0 text-lime" />
                <p className="text-[12px] leading-[1.5] text-ink2">
                  {selectedCampaign.roas >= 3
                    ? `${selectedCampaign.name} is outperforming the account average — Spearhead would raise its daily budget.`
                    : `${selectedCampaign.name} is below the 3.0x target — Spearhead would tighten its audience or refresh creatives.`}
                </p>
              </div>
            </div>
          )}
        </div>

        <p className="px-1 text-[11px] leading-[1.5] text-muted">
          Demonstration with sample data — not connected to a live ad account.
          Switch ranges, chart metrics, filter and sort the table, and select a
          row for details.
        </p>
      </div>
    </Panel>
  );
}
