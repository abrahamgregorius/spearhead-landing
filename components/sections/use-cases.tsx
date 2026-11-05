"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Reveal } from "@/components/reveal";
import { SectionHead, Chip } from "@/components/ui";
import { useAttribution, type AttributionSource } from "@/components/providers";
import { ChartLine, Sparkles, Megaphone, Check } from "@/components/icons";
import { PerformanceDemo } from "./demos/performance";
import { StrategyDemo } from "./demos/strategy";
import { ExecutionDemo } from "./demos/execution";

/* §7 — Use Cases. Three interactive product demonstrations sharing one
   design system, switched through tabs without a page reload. */

type TabId = "performance" | "strategy" | "execution";

const TABS: {
  id: TabId;
  source: AttributionSource;
  label: string;
  icon: typeof ChartLine;
  title: string;
  scenario: string;
  points: string[];
}[] = [
  {
    id: "performance",
    source: "performance_analytics",
    label: "Understand Performance",
    icon: ChartLine,
    title: "Why did performance decline?",
    scenario:
      "A business owner wants to understand why advertising performance has declined.",
    points: [
      "Switch date ranges and chart metrics",
      "Filter and sort the campaign table",
      "Open AI insights on the data",
    ],
  },
  {
    id: "strategy",
    source: "ai_strategy",
    label: "Develop Strategy",
    icon: Sparkles,
    title: "Which actions improve results?",
    scenario:
      "A marketing manager wants to know which actions will improve campaign performance.",
    points: [
      "Ask questions with prompt suggestions",
      "Expand recommendations to see reasoning",
      "Approve or dismiss proposed actions",
    ],
  },
  {
    id: "execution",
    source: "campaign_execution",
    label: "Execute Campaigns",
    icon: Megaphone,
    title: "Launch a campaign in minutes",
    scenario:
      "A business wants to launch an advertising campaign without manually configuring every step.",
    points: [
      "Pick an objective, audience and budget",
      "Preview creatives before launch",
      "Review the full configuration summary",
    ],
  },
];

export function UseCases() {
  const [active, setActive] = useState<TabId>("performance");
  const { exploreUseCase } = useAttribution();

  const select = (id: TabId) => {
    setActive(id);
    const tab = TABS.find((t) => t.id === id);
    if (tab) exploreUseCase(tab.source);
  };

  const tab = TABS.find((t) => t.id === active)!;

  return (
    <section id="use-cases" className="bg-bg2 py-20 md:py-28 lg:py-36">
      <div className="shell">
        <Reveal>
          <SectionHead
            eyebrow="See Spearhead in Action"
            title="More Than Insights. Marketing That Moves."
            description="Explore how Spearhead transforms everyday marketing challenges into decisions and actionable outcomes."
          />
        </Reveal>

        {/* tab navigation — horizontally scrollable on mobile (§7.1) */}
        <Reveal>
          <div
            role="tablist"
            aria-label="Use cases"
            className="mx-auto mt-10 flex max-w-full gap-1.5 overflow-x-auto rounded-[14px] border border-line bg-card p-1.5 md:mt-14 md:w-fit"
          >
            {TABS.map((t, i) => {
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => select(t.id)}
                  className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-[10px] px-3.5 text-[13px] font-medium whitespace-nowrap transition-colors md:px-5 ${
                    isActive
                      ? "bg-lime/15 text-lime ring-1 ring-inset ring-lime/30"
                      : "text-ink2 hover:bg-surface hover:text-ink"
                  }`}
                >
                  <t.icon size={15} />
                  <span className="font-mono text-[10.5px] opacity-60">
                    0{i + 1}
                  </span>
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* active demonstration panel */}
        <Reveal delay={0.1}>
          <div className="mt-8 md:mt-10">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10"
              >
                {/* explanation — first on mobile (§7.1) */}
                <div className="flex flex-col justify-center lg:col-span-4">
                  <Chip>{tab.label}</Chip>
                  <h3 className="mt-4 text-[24px] leading-[1.2] font-semibold tracking-[-0.01em] text-ink md:text-[28px]">
                    {tab.title}
                  </h3>
                  <p className="mt-3 max-w-[380px] text-[14.5px] leading-[1.65] text-ink2">
                    {tab.scenario}
                  </p>
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {tab.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2.5 text-[13.5px] text-ink2"
                      >
                        <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/12 text-lime">
                          <Check size={12} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* interface */}
                <div className="min-w-0 lg:col-span-8">
                  {active === "performance" && <PerformanceDemo />}
                  {active === "strategy" && <StrategyDemo />}
                  {active === "execution" && <ExecutionDemo />}
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
