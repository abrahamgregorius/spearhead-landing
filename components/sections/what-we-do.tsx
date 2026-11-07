import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHead, Panel, PriorityBadge, StatusChip, Bar } from "@/components/ui";
import { Sparkline } from "@/components/charts";
import { Bot, Check, User, Target, Users, Gear, Zap } from "@/components/icons";

/* §6 — What We Do. All capability rows share ONE 12-column grid
   (text 4 / preview 8, 32–40px column gap, 64–80px row gap) with
   standardized 280px interface previews, per the layout refinement
   spec (prompt/landing-redesign.md). Copy and design system are
   preserved exactly — this is a layout-only refinement. */

function CapabilityNumber({ n }: { n: string }) {
  return (
    <span className="font-mono text-[12px] font-semibold tracking-[0.1em] text-lime2">
      {n}
    </span>
  );
}

function CapabilityText({
  n,
  title,
  description,
}: {
  n: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex h-full flex-col justify-center">
      <CapabilityNumber n={n} />
      <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.01em] text-ink md:text-[22px]">
        {title}
      </h3>
      <p className="mt-3 max-w-[420px] text-[14.5px] leading-[1.65] text-ink2">
        {description}
      </p>
    </div>
  );
}

/* Shared preview frame — every interface gets identical outer
   dimensions: 100% of the right column, exactly 280px tall on md+,
   1px line border, overflow hidden (§2 of the refinement spec). */
function PreviewFrame({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Panel className="flex flex-col overflow-hidden md:h-[280px]">
      {children}
    </Panel>
  );
}

/* 01 — compact analytics preview */
function IntelligencePreview() {
  return (
    <PreviewFrame>
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="text-[12.5px] font-semibold text-ink">
          Marketing intelligence
        </span>
        <span className="rounded-full border border-line px-2 py-0.5 text-[10px] text-muted">
          Last 30 days
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-2.5">
        {[
          { label: "Revenue", value: "$8,330", delta: "+18.2%" },
          { label: "ROAS", value: "3.4x", delta: "+0.4x" },
          { label: "Conversions", value: "86", delta: "+14" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-[10px] bg-surface/50 px-2.5 py-2">
            <div className="text-[10px] text-muted">{kpi.label}</div>
            <div className="tnum mt-1 text-[14px] font-semibold text-ink">
              {kpi.value}
            </div>
            <div className="tnum mt-0.5 text-[10px] font-medium text-lime">
              {kpi.delta}
            </div>
          </div>
        ))}
      </div>
      <div className="flex min-h-0 flex-1 items-center px-3 text-ink2">
        <Sparkline
          width={420}
          height={52}
          fill
          className="w-full"
          preserveAspectRatio="none"
          values={[28, 32, 30, 38, 35, 42, 40, 47, 45, 52]}
        />
      </div>
      <div className="border-t border-line px-4 py-2.5">
        <div className="mb-2 text-[11px] font-medium text-muted">
          Campaign comparison — ROAS
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { name: "Brand Core", pct: 96, value: "4.2x" },
            { name: "Retargeting ENG", pct: 64, value: "2.8x" },
            { name: "Prospecting Wide", pct: 55, value: "2.4x" },
          ].map((row) => (
            <div key={row.name} className="flex items-center gap-3">
              <span className="w-[118px] shrink-0 truncate text-[11px] text-ink2">
                {row.name}
              </span>
              <Bar pct={row.pct} />
              <span className="tnum w-9 shrink-0 text-right text-[11px] font-semibold text-lime">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

/* 02 — AI assistant preview */
function StrategyPreview() {
  return (
    <PreviewFrame>
      <div className="flex items-center gap-2.5 border-b border-line px-4 py-2">
        <span className="inline-flex size-5 items-center justify-center rounded-[8px] bg-lime/15 text-lime">
          <Bot size={13} />
        </span>
        <span className="text-[12.5px] font-semibold text-ink">Spearhead AI</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10.5px] text-muted">
          <span className="size-1.5 rounded-full bg-lime" />
          Analyzing campaigns
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 p-3">
        <div className="flex justify-end">
          <div className="flex max-w-[75%] items-center gap-2 rounded-[12px] rounded-br-[4px] bg-surface px-3 py-1.5 text-[12px] text-ink">
            <User size={13} className="shrink-0 text-muted" />
            How do I improve ROAS this week?
          </div>
        </div>
        <div className="min-h-0 flex-1 rounded-[12px] rounded-bl-[4px] border border-line bg-surface/40 p-2.5">
          <div className="flex items-start gap-2">
            <Bot size={13} className="mt-0.5 shrink-0 text-lime" />
            <p className="text-[12px] leading-[1.5] text-ink2">
              Based on your current performance, I recommend two actions.
            </p>
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            <div className="rounded-[10px] border border-line bg-card p-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11.5px] font-medium text-ink">
                  Reduce inefficient spending
                </span>
                <PriorityBadge level="high" />
              </div>
              <p className="mt-1 text-[10.5px] leading-[1.5] text-muted">
                Prospecting Wide acquires clicks at 2.4x ROAS — below target.
              </p>
            </div>
            <div className="rounded-[10px] border border-line bg-card p-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11.5px] font-medium text-ink">
                  Reallocate campaign budget
                </span>
                <PriorityBadge level="medium" />
              </div>
              <p className="mt-1 text-[10.5px] leading-[1.5] text-muted">
                Prioritize Brand Core — strongest conversion performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

/* 03 — campaign configuration preview */
function ExecutionPreview() {
  return (
    <PreviewFrame>
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="text-[12.5px] font-semibold text-ink">New campaign</span>
        <span className="inline-flex items-center gap-1.5 text-[10.5px] text-muted">
          <Zap size={11} className="text-lime" />
          AI-assisted setup
        </span>
      </div>
      <div className="grid min-h-0 flex-1 gap-3 p-3 sm:grid-cols-2">
        <div className="flex flex-col justify-between gap-2.5">
          <div>
            <div className="mb-1 flex items-center gap-1.5 text-[10.5px] font-medium text-muted">
              <Target size={12} /> Objective
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Awareness", "Traffic", "Leads", "Sales"].map((o) => (
                <span
                  key={o}
                  className={`rounded-[8px] px-2 py-1 text-[11px] font-medium ${
                    o === "Sales"
                      ? "bg-lime text-[#101408]"
                      : "border border-line bg-surface/40 text-ink2"
                  }`}
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center gap-1.5 text-[10.5px] font-medium text-muted">
              <Users size={12} /> Audience
            </div>
            <div className="flex items-center justify-between rounded-[10px] border border-line bg-surface/40 px-3 py-2">
              <span className="text-[11.5px] text-ink">Online shoppers</span>
              <Check size={13} className="text-lime" />
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center gap-1.5 text-[10.5px] font-medium text-muted">
              <Gear size={12} /> Daily budget
            </div>
            <div className="rounded-[10px] border border-line bg-surface/40 p-2">
              <div className="flex items-center justify-between text-[11.5px]">
                <span className="text-ink2">$5</span>
                <span className="tnum font-semibold text-lime">$40 / day</span>
                <span className="text-ink2">$100</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-card">
                <div className="h-full w-[37%] rounded-full bg-lime" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-h-0 flex-col">
          <div className="mb-1 text-[10.5px] font-medium text-muted">
            Creative preview
          </div>
          <div className="min-h-0 flex-1 overflow-hidden rounded-[10px] border border-line">
            <div
              className="flex h-full min-h-[96px] flex-col justify-between p-3"
              style={{
                background:
                  "linear-gradient(135deg, #1B2119 0%, #22301A 55%, #2E4218 100%)",
              }}
            >
              <div>
                <div className="text-[10px] font-semibold tracking-[0.1em] text-lime3">
                  SPEARHEAD
                </div>
                <div className="mt-2 text-[13.5px] leading-[1.3] font-semibold text-white">
                  Marketing that moves while you sleep.
                </div>
              </div>
              <div className="mt-3 inline-flex w-fit rounded-[8px] bg-lime px-2.5 py-1 text-[10.5px] font-semibold text-[#101408]">
                Join the Waitlist
              </div>
            </div>
          </div>
          <div className="mt-2 flex gap-1.5">
            <span className="rounded-[8px] bg-lime/15 px-2.5 py-1 text-[10.5px] font-semibold text-lime ring-1 ring-inset ring-lime/30">
              Creative A
            </span>
            <span className="rounded-[8px] border border-line px-2.5 py-1 text-[10.5px] font-medium text-ink2">
              Creative B
            </span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

/* 04 — optimization preview */
function OptimizationPreview() {
  return (
    <PreviewFrame>
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="text-[12.5px] font-semibold text-ink">
          Continuous optimization
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10.5px] text-muted">
          <span className="size-1.5 animate-[pulse-ring_2.4s_ease-in-out_infinite] rounded-full bg-lime" />
          Monitoring live
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <div className="rounded-[10px] border border-line bg-surface/40 px-3 py-2">
          <div className="text-[10px] text-muted">Before — last 30 days</div>
          <div className="tnum mt-1 text-[20px] font-semibold text-ink2">
            2.1x
          </div>
          <div className="mt-0.5 text-[10px] text-muted">Average ROAS</div>
        </div>
        <div className="rounded-[10px] border border-lime/25 bg-lime/8 px-3 py-2">
          <div className="text-[10px] text-lime2">After — Spearhead</div>
          <div className="tnum mt-1 text-[20px] font-semibold text-ink">
            3.4x{" "}
            <span className="text-[11.5px] font-semibold text-lime">+62%</span>
          </div>
          <div className="mt-0.5 text-[10px] text-muted">Average ROAS</div>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-1 px-3">
        {[
          "Paused 2 underperforming ad sets",
          "Shifted budget to high-intent audiences",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-[8px] px-1 py-1 text-[12px] text-ink2"
          >
            <span className="inline-flex size-4.5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
              <Check size={11} />
            </span>
            {item}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-2">
        <span className="text-[11px] text-muted">Campaign status</span>
        <div className="flex items-center gap-3">
          <StatusChip status="active" />
          <span className="text-[12px] text-muted">3 optimized</span>
        </div>
      </div>
    </PreviewFrame>
  );
}

/* Shared row grid — one definition for every capability block:
   text column 4/12, preview column 8/12, identical gaps and
   alignment on all rows (§1/§3 of the refinement spec). */
const ROW_GRID =
  "mt-14 grid grid-cols-1 items-center gap-x-8 gap-y-12 md:mt-20 md:grid-cols-12 md:gap-y-16 lg:gap-x-10 lg:gap-y-20";

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-20 md:py-28 lg:py-36">
      <div className="shell">
        <Reveal>
          <SectionHead
            eyebrow="What We Do"
            title="From Marketing Intelligence to Execution."
            description="Spearhead connects your business goals, marketing data, and advertising operations into one intelligent workflow."
          />
        </Reveal>

        <div className={ROW_GRID}>
          {/* 01 — Understand */}
          <Reveal className="md:col-span-4">
            <CapabilityText
              n="01"
              title="Marketing Intelligence"
              description="Understand business performance, identify trends, and uncover opportunities through consolidated marketing data."
            />
          </Reveal>
          <Reveal className="md:col-span-8" delay={0.1}>
            <IntelligencePreview />
          </Reveal>

          {/* 02 — Decide */}
          <Reveal className="md:col-span-4">
            <CapabilityText
              n="02"
              title="AI-Driven Strategy"
              description="Transform marketing insights into actionable strategies and campaign recommendations aligned with your business objectives."
            />
          </Reveal>
          <Reveal className="md:col-span-8" delay={0.1}>
            <StrategyPreview />
          </Reveal>

          {/* 03 — Execute */}
          <Reveal className="md:col-span-4">
            <CapabilityText
              n="03"
              title="Campaign Execution"
              description="Create, manage, and deploy advertising campaigns across supported marketing platforms."
            />
          </Reveal>
          <Reveal className="md:col-span-8" delay={0.1}>
            <ExecutionPreview />
          </Reveal>

          {/* 04 — continuous optimization keeps the same row structure */}
          <Reveal className="md:col-span-4">
            <CapabilityText
              n="04"
              title="Continuous Optimization"
              description="Monitor performance, identify inefficiencies, and improve campaigns based on measurable results."
            />
          </Reveal>
          <Reveal className="md:col-span-8" delay={0.1}>
            <OptimizationPreview />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
