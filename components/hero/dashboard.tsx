"use client";

import { useMemo, useState } from "react";
import { LogoMark } from "@/components/logo";
import { AreaChart } from "@/components/charts";
import { Kpi, Segmented, StatusChip, type ItemStatus } from "@/components/ui";
import {
  Calendar,
  ChartLine,
  Download,
  Gear,
  LayoutDashboard,
  Megaphone,
  Search,
  Sparkles,
  Check,
  Bot,
} from "@/components/icons";
import { fmtCurrency, fmtNumber } from "@/lib/format";

/* Sample demonstration data (§5.6 — labeled as a sample). */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const REVENUE = [980, 1140, 1060, 1280, 1210, 1350, 1310];
const SPEND = [310, 345, 325, 365, 350, 395, 355];

const CAMPAIGNS: {
  name: string;
  channel: string;
  status: ItemStatus;
  spend: number;
  conversions: number;
  roas: number;
}[] = [
  { name: "Brand Core", channel: "Search", status: "active", spend: 640, conversions: 28, roas: 4.2 },
  { name: "Prospecting Wide", channel: "Social", status: "active", spend: 520, conversions: 18, roas: 2.4 },
  { name: "Retargeting ENG", channel: "Display", status: "paused", spend: 385, conversions: 14, roas: 2.8 },
  { name: "Awareness Launch", channel: "Video", status: "active", spend: 450, conversions: 12, roas: 2.1 },
  { name: "Competitor Terms", channel: "Search", status: "completed", spend: 455, conversions: 14, roas: 3.6 },
];

const SIDEBAR = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Analytics", icon: ChartLine, active: false },
  { label: "Campaigns", icon: Megaphone, active: false },
  { label: "AI Strategy", icon: Sparkles, active: false },
  { label: "Settings", icon: Gear, active: false },
];

type Metric = "revenue" | "spend";

export function HeroDashboard() {
  const [metric, setMetric] = useState<Metric>("revenue");
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState(false);

  const campaigns = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CAMPAIGNS;
    return CAMPAIGNS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.channel.toLowerCase().includes(q),
    );
  }, [query]);

  const exportCsv = () => {
    try {
      const rows = [
        ["Metric", "Value"],
        ["Total Ad Spend", "$2,450"],
        ["Total Revenue", "$8,330"],
        ["Average ROAS", "3.4x"],
        ["Total Conversions", "86"],
        [],
        ["Campaign", "Channel", "Status", "Spend", "Conversions", "ROAS"],
        ...CAMPAIGNS.map((c) => [
          c.name,
          c.channel,
          c.status,
          `$${c.spend}`,
          String(c.conversions),
          `${c.roas.toFixed(1)}x`,
        ]),
      ];
      const csv = rows.map((r) => r.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "spearhead-sample-data.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      /* download unavailable — ignore */
    }
  };

  return (
    <div className="scope-dark overflow-hidden rounded-[14px] border border-line bg-card text-left shadow-[0_30px_90px_-20px_rgba(0,0,0,0.75)]">
      {/* top bar */}
      <div className="flex h-12 items-center gap-3 border-b border-line px-3 md:px-4">
        <LogoMark size={16} />
        <span className="hidden text-[13px] font-semibold text-ink sm:inline">
          Overview
        </span>
        <span className="hidden rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] font-medium text-muted md:inline">
          Sample data
        </span>

        <div className="relative ml-auto hidden md:block">
          <Search
            size={13}
            className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter campaigns…"
            aria-label="Filter campaigns"
            className="h-8 w-44 rounded-[8px] border border-line bg-surface pr-2 pl-7 text-[12px] text-ink placeholder:text-muted focus:border-lime/40 focus:outline-none lg:w-52"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5 md:ml-0">
          <span className="hidden h-8 items-center gap-1.5 rounded-[8px] border border-line bg-surface px-2.5 text-[11.5px] text-ink2 sm:inline-flex">
            <Calendar size={13} className="text-muted" />
            Last 7 days
          </span>
          <a
            href="#use-cases"
            title="See the AI Strategy demo"
            className="hidden h-8 items-center gap-1.5 rounded-[8px] bg-lime/15 px-2.5 text-[11.5px] font-semibold text-lime ring-1 ring-inset ring-lime/30 transition-colors hover:bg-lime/25 sm:inline-flex"
          >
            <Sparkles size={13} />
            AI Insights
          </a>
          <button
            onClick={exportCsv}
            title="Download sample data (CSV)"
            className="inline-flex h-8 items-center gap-1.5 rounded-[8px] border border-line px-2.5 text-[11.5px] font-medium text-ink2 transition-colors hover:bg-surface hover:text-ink"
          >
            <Download size={13} />
            <span className="hidden lg:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* sidebar — desktop */}
        <aside className="hidden w-[180px] shrink-0 flex-col gap-0.5 border-r border-line p-2 lg:flex">
          {SIDEBAR.map((item) => (
            <a
              key={item.label}
              href="#use-cases"
              title={`See the live ${item.label} demo`}
              className={`flex h-9 items-center gap-2.5 rounded-[8px] px-3 text-[12.5px] font-medium transition-colors ${
                item.active
                  ? "bg-lime/12 text-lime"
                  : "text-ink2 hover:bg-surface hover:text-ink"
              }`}
            >
              <item.icon size={15} />
              {item.label}
            </a>
          ))}
        </aside>

        <div className="min-w-0 flex-1">
          {/* compact sidebar — mobile/tablet (§5.7) */}
          <div className="flex items-center gap-1 overflow-x-auto border-b border-line p-2 lg:hidden">
            {SIDEBAR.map((item) => (
              <a
                key={item.label}
                href="#use-cases"
                title={`See the live ${item.label} demo`}
                className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-[8px] px-2.5 text-[12px] font-medium whitespace-nowrap ${
                  item.active
                    ? "bg-lime/12 text-lime"
                    : "text-ink2 hover:bg-surface"
                }`}
              >
                <item.icon size={14} />
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 p-2.5 md:p-3.5">
            {/* KPI cards */}
            <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
              <Kpi label="Total Ad Spend" value="$2,450" delta="+12.4%" icon={<Search size={13} />} />
              <Kpi label="Total Revenue" value="$8,330" delta="+18.2%" icon={<ChartLine size={13} />} />
              <Kpi label="Average ROAS" value="3.4x" delta="+0.4x" icon={<Sparkles size={13} />} />
              <Kpi label="Total Conversions" value="86" delta="+14" icon={<Check size={13} />} />
            </div>

            <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-12">
              {/* performance chart */}
              <div className="rounded-[14px] border border-line bg-surface/40 p-3 lg:col-span-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-semibold text-ink">
                      Performance
                    </span>
                    <span className="hidden items-center gap-1.5 text-[11px] text-muted sm:inline-flex">
                      <span className="size-1.5 rounded-full bg-lime" /> Revenue
                    </span>
                    <span className="hidden items-center gap-1.5 text-[11px] text-muted sm:inline-flex">
                      <span className="size-1.5 rounded-full bg-ink2" /> Spend
                    </span>
                  </div>
                  <Segmented<Metric>
                    ariaLabel="Chart metric"
                    options={[
                      { value: "revenue", label: "Revenue" },
                      { value: "spend", label: "Spend" },
                    ]}
                    value={metric}
                    onChange={setMetric}
                  />
                </div>
                <div className="mt-2 text-ink2">
                  <AreaChart
                    idPrefix="hero-chart"
                    height={200}
                    labels={DAYS}
                    formatValue={(v) => fmtCurrency(Math.round(v), { compact: true })}
                    series={[
                      {
                        label: metric === "revenue" ? "Revenue" : "Spend",
                        values: metric === "revenue" ? REVENUE : SPEND,
                        color: "#A3E635",
                        fill: true,
                      },
                      {
                        label: metric === "revenue" ? "Spend" : "Revenue",
                        values: metric === "revenue" ? SPEND : REVENUE,
                        color: "#A0A89A",
                      },
                    ]}
                  />
                </div>
              </div>

              {/* AI recommendation panel */}
              <div className="flex flex-col rounded-[14px] border border-lime/20 bg-surface/40 p-3 lg:col-span-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-6 items-center justify-center rounded-[8px] bg-lime/15 text-lime">
                    <Bot size={14} />
                  </span>
                  <span className="text-[12.5px] font-semibold text-ink">
                    AI recommendation
                  </span>
                </div>
                <p className="mt-2.5 text-[12.5px] leading-[1.55] text-ink2">
                  Shift{" "}
                  <span className="font-semibold text-ink">$85/day</span> from
                  Awareness Launch to Brand Core. Expected ROAS{" "}
                  <span className="font-semibold text-lime">+0.6x</span> within
                  7 days.
                </p>
                <div className="mt-auto pt-3">
                  {applied ? (
                    <span className="inline-flex h-8 items-center gap-1.5 rounded-[8px] bg-lime/15 px-3 text-[12px] font-semibold text-lime ring-1 ring-inset ring-lime/30">
                      <Check size={13} />
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => setApplied(true)}
                      className="inline-flex h-8 items-center gap-1.5 rounded-[8px] bg-lime px-3 text-[12px] font-semibold text-[#101408] transition-colors hover:bg-lime2"
                    >
                      Apply shift
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* campaign table */}
            <div className="rounded-[14px] border border-line bg-surface/40">
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-[13px] font-semibold text-ink">
                  Campaigns
                </span>
                <span className="text-[11px] text-muted">
                  {campaigns.length} of {CAMPAIGNS.length}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-left">
                  <thead>
                    <tr className="border-y border-line text-[11px] text-muted">
                      <th className="px-3 py-2 font-medium">Campaign</th>
                      <th className="hidden px-3 py-2 font-medium sm:table-cell">
                        Channel
                      </th>
                      <th className="px-3 py-2 font-medium">Status</th>
                      <th className="px-3 py-2 text-right font-medium">Spend</th>
                      <th className="hidden px-3 py-2 text-right font-medium md:table-cell">
                        Conv.
                      </th>
                      <th className="px-3 py-2 text-right font-medium">ROAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((c) => (
                      <tr
                        key={c.name}
                        className="border-b border-line/60 text-[12.5px] text-ink last:border-0"
                      >
                        <td className="px-3 py-2 font-medium">{c.name}</td>
                        <td className="hidden px-3 py-2 text-ink2 sm:table-cell">
                          {c.channel}
                        </td>
                        <td className="px-3 py-2">
                          <StatusChip status={c.status} />
                        </td>
                        <td className="tnum px-3 py-2 text-right text-ink2">
                          {fmtCurrency(c.spend)}
                        </td>
                        <td className="tnum hidden px-3 py-2 text-right text-ink2 md:table-cell">
                          {fmtNumber(c.conversions)}
                        </td>
                        <td className="tnum px-3 py-2 text-right font-semibold text-lime">
                          {c.roas.toFixed(1)}x
                        </td>
                      </tr>
                    ))}
                    {campaigns.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-3 py-6 text-center text-[12.5px] text-muted"
                        >
                          No campaigns match “{query}”.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
