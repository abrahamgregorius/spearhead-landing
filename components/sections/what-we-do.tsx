import { Reveal } from "@/components/reveal";
import { SectionHead, Panel, PriorityBadge, StatusChip, Bar } from "@/components/ui";
import { Sparkline } from "@/components/charts";
import { Bot, Check, User, Target, Users, Gear, Zap } from "@/components/icons";

/* §6 — What We Do. 2×2 asymmetric editorial grid with interface
   previews sharing the same design system as the demos. */

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
    <div className="flex flex-col justify-center">
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

/* 01 — compact analytics preview */
function IntelligencePreview() {
  return (
    <Panel className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="text-[12.5px] font-semibold text-ink">
          Marketing intelligence
        </span>
        <span className="rounded-full border border-line px-2 py-0.5 text-[10px] text-muted">
          Last 30 days
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {[
          { label: "Revenue", value: "$8,330", delta: "+18.2%" },
          { label: "ROAS", value: "3.4x", delta: "+0.4x" },
          { label: "Conversions", value: "86", delta: "+14" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-[10px] bg-surface/50 px-3 py-2.5">
            <div className="text-[10.5px] text-muted">{kpi.label}</div>
            <div className="tnum mt-1 text-[15px] font-semibold text-ink">
              {kpi.value}
            </div>
            <div className="tnum mt-0.5 text-[10.5px] font-medium text-lime">
              {kpi.delta}
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 pb-1 text-ink2">
        <Sparkline
          width={420}
          height={70}
          fill
          values={[28, 32, 30, 38, 35, 42, 40, 47, 45, 52]}
        />
      </div>
      <div className="border-t border-line px-4 py-3">
        <div className="mb-2.5 text-[11px] font-medium text-muted">
          Campaign comparison — ROAS
        </div>
        <div className="flex flex-col gap-2.5">
          {[
            { name: "Brand Core", pct: 96, value: "4.2x" },
            { name: "Retargeting ENG", pct: 64, value: "2.8x" },
            { name: "Prospecting Wide", pct: 55, value: "2.4x" },
          ].map((row) => (
            <div key={row.name} className="flex items-center gap-3">
              <span className="w-[118px] shrink-0 truncate text-[11.5px] text-ink2">
                {row.name}
              </span>
              <Bar pct={row.pct} />
              <span className="tnum w-9 shrink-0 text-right text-[11.5px] font-semibold text-lime">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* 02 — AI assistant preview */
function StrategyPreview() {
  return (
    <Panel className="overflow-hidden">
      <div className="flex items-center gap-2.5 border-b border-line px-4 py-2.5">
        <span className="inline-flex size-6 items-center justify-center rounded-[8px] bg-lime/15 text-lime">
          <Bot size={14} />
        </span>
        <span className="text-[12.5px] font-semibold text-ink">Spearhead AI</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10.5px] text-muted">
          <span className="size-1.5 rounded-full bg-lime" />
          Analyzing campaigns
        </span>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex justify-end">
          <div className="flex max-w-[75%] items-center gap-2 rounded-[12px] rounded-br-[4px] bg-surface px-3 py-2 text-[12.5px] text-ink">
            <User size={13} className="shrink-0 text-muted" />
            How do I improve ROAS this week?
          </div>
        </div>
        <div className="rounded-[12px] rounded-bl-[4px] border border-line bg-surface/40 p-3">
          <div className="flex items-start gap-2">
            <Bot size={13} className="mt-0.5 shrink-0 text-lime" />
            <p className="text-[12.5px] leading-[1.5] text-ink2">
              Based on your current performance, I recommend two actions.
            </p>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <div className="rounded-[10px] border border-line bg-card p-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[12px] font-medium text-ink">
                  Reduce inefficient spending
                </span>
                <PriorityBadge level="high" />
              </div>
              <p className="mt-1.5 text-[11.5px] leading-[1.5] text-muted">
                Prospecting Wide acquires clicks at 2.4x ROAS — below target.
              </p>
            </div>
            <div className="rounded-[10px] border border-line bg-card p-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[12px] font-medium text-ink">
                  Reallocate campaign budget
                </span>
                <PriorityBadge level="medium" />
              </div>
              <p className="mt-1.5 text-[11.5px] leading-[1.5] text-muted">
                Prioritize Brand Core — strongest conversion performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* 03 — campaign configuration preview */
function ExecutionPreview() {
  return (
    <Panel className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="text-[12.5px] font-semibold text-ink">New campaign</span>
        <span className="inline-flex items-center gap-1.5 text-[10.5px] text-muted">
          <Zap size={11} className="text-lime" />
          AI-assisted setup
        </span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div className="flex flex-col gap-3.5">
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-muted">
              <Target size={12} /> Objective
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Awareness", "Traffic", "Leads", "Sales"].map((o) => (
                <span
                  key={o}
                  className={`rounded-[8px] px-2.5 py-1.5 text-[11.5px] font-medium ${
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
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-muted">
              <Users size={12} /> Audience
            </div>
            <div className="flex items-center justify-between rounded-[10px] border border-line bg-surface/40 px-3 py-2.5">
              <span className="text-[12px] text-ink">Online shoppers</span>
              <Check size={13} className="text-lime" />
            </div>
          </div>
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-muted">
              <Gear size={12} /> Daily budget
            </div>
            <div className="rounded-[10px] border border-line bg-surface/40 px-3 py-2.5">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-ink2">$5</span>
                <span className="tnum font-semibold text-lime">$40 / day</span>
                <span className="text-ink2">$100</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-card">
                <div className="h-full w-[37%] rounded-full bg-lime" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-1.5 text-[11px] font-medium text-muted">
            Creative preview
          </div>
          <div className="flex-1 overflow-hidden rounded-[10px] border border-line">
            <div
              className="flex h-full min-h-[150px] flex-col justify-between p-3"
              style={{
                background:
                  "linear-gradient(135deg, #1B2119 0%, #22301A 55%, #2E4218 100%)",
              }}
            >
              <div>
                <div className="text-[11px] font-semibold tracking-[0.1em] text-lime3">
                  SPEARHEAD
                </div>
                <div className="mt-2 text-[15px] leading-[1.25] font-semibold text-white">
                  Marketing that moves while you sleep.
                </div>
              </div>
              <div className="mt-3 inline-flex w-fit rounded-[8px] bg-lime px-3 py-1.5 text-[11px] font-semibold text-[#101408]">
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
    </Panel>
  );
}

/* 04 — optimization preview */
function OptimizationPreview() {
  return (
    <Panel className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="text-[12.5px] font-semibold text-ink">
          Continuous optimization
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10.5px] text-muted">
          <span className="size-1.5 animate-[pulse-ring_2.4s_ease-in-out_infinite] rounded-full bg-lime" />
          Monitoring live
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        <div className="rounded-[10px] border border-line bg-surface/40 px-3 py-3">
          <div className="text-[10.5px] text-muted">Before — last 30 days</div>
          <div className="tnum mt-1.5 text-[22px] font-semibold text-ink2">
            2.1x
          </div>
          <div className="mt-0.5 text-[10.5px] text-muted">Average ROAS</div>
        </div>
        <div className="rounded-[10px] border border-lime/25 bg-lime/8 px-3 py-3">
          <div className="text-[10.5px] text-lime2">After — Spearhead</div>
          <div className="tnum mt-1.5 text-[22px] font-semibold text-ink">
            3.4x{" "}
            <span className="text-[12px] font-semibold text-lime">+62%</span>
          </div>
          <div className="mt-0.5 text-[10.5px] text-muted">Average ROAS</div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 px-3 pb-1">
        {[
          "Paused 2 underperforming ad sets",
          "Shifted budget to high-intent audiences",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-[8px] px-1 py-1 text-[12px] text-ink2"
          >
            <span className="inline-flex size-4.5 items-center justify-center rounded-full bg-lime/15 text-lime">
              <Check size={11} />
            </span>
            {item}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-3">
        <span className="text-[11px] text-muted">Campaign status</span>
        <div className="flex items-center gap-3">
          <StatusChip status="active" />
          <span className="text-[12px] text-muted">3 optimized</span>
        </div>
      </div>
    </Panel>
  );
}

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

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-20 lg:grid-cols-12 lg:gap-y-20">
          {/* 01 */}
          <Reveal className="lg:col-span-4 lg:order-1">
            <CapabilityText
              n="01"
              title="Marketing Intelligence"
              description="Understand business performance, identify trends, and uncover opportunities through consolidated marketing data."
            />
          </Reveal>
          <Reveal className="lg:col-span-8 lg:order-2" delay={0.1}>
            <IntelligencePreview />
          </Reveal>

          {/* 02 */}
          <Reveal className="lg:col-span-7 lg:order-4">
            <StrategyPreview />
          </Reveal>
          <Reveal className="lg:col-span-5 lg:order-3" delay={0.1}>
            <CapabilityText
              n="02"
              title="AI-Driven Strategy"
              description="Transform marketing insights into actionable strategies and campaign recommendations aligned with your business objectives."
            />
          </Reveal>

          {/* 03 */}
          <Reveal className="lg:col-span-4 lg:order-5">
            <CapabilityText
              n="03"
              title="Campaign Execution"
              description="Create, manage, and deploy advertising campaigns across supported marketing platforms."
            />
          </Reveal>
          <Reveal className="lg:col-span-8 lg:order-6" delay={0.1}>
            <ExecutionPreview />
          </Reveal>

          {/* 04 */}
          <Reveal className="lg:col-span-7 lg:order-8">
            <OptimizationPreview />
          </Reveal>
          <Reveal className="lg:col-span-5 lg:order-7" delay={0.1}>
            <CapabilityText
              n="04"
              title="Continuous Optimization"
              description="Monitor performance, identify inefficiencies, and improve campaigns based on measurable results."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
