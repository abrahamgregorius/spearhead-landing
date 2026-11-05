"use client";

import { useState } from "react";
import { Panel, Chip, btnPrimary, btnGhostSmall } from "@/components/ui";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Dollar,
  Megaphone,
  MouseClick,
  Refresh,
  ShieldCheck,
  Target,
} from "@/components/icons";
import { fmtCurrency } from "@/lib/format";

/* §7.4 — Execute Campaigns: a simplified interactive campaign builder.
   Submission is a simulation; no real ad platform is connected. */

type Objective = "awareness" | "traffic" | "leads" | "sales";
type Audience = "owners" | "shoppers" | "marketers";
type Creative = "a" | "b";

const OBJECTIVES: {
  id: Objective;
  label: string;
  desc: string;
  icon: typeof Target;
}[] = [
  {
    id: "awareness",
    label: "Awareness",
    desc: "Reach more people and build recognition.",
    icon: Megaphone,
  },
  {
    id: "traffic",
    label: "Traffic",
    desc: "Drive visits to your website or landing page.",
    icon: MouseClick,
  },
  {
    id: "leads",
    label: "Leads",
    desc: "Collect signups and inquiries from prospects.",
    icon: Target,
  },
  {
    id: "sales",
    label: "Sales",
    desc: "Convert existing demand into purchases.",
    icon: Dollar,
  },
];

const AUDIENCES: { id: Audience; label: string; desc: string }[] = [
  {
    id: "owners",
    label: "Small business owners",
    desc: "Founders and operators running their own marketing.",
  },
  {
    id: "shoppers",
    label: "Online shoppers",
    desc: "Consumers actively browsing and buying online.",
  },
  {
    id: "marketers",
    label: "Marketing professionals",
    desc: "In-house marketers and agency practitioners.",
  },
];

const STEP_LABELS = ["Objective", "Audience", "Budget", "Creative", "Review"];

export function ExecutionDemo() {
  const [step, setStep] = useState(1);
  const [objective, setObjective] = useState<Objective | null>(null);
  const [audience, setAudience] = useState<Audience | null>(null);
  const [budget, setBudget] = useState(25);
  const [creative, setCreative] = useState<Creative | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const canContinue =
    (step === 1 && objective !== null) ||
    (step === 2 && audience !== null) ||
    step === 3 ||
    (step === 4 && creative !== null) ||
    step === 5;

  const reset = () => {
    setObjective(null);
    setAudience(null);
    setBudget(25);
    setCreative(null);
    setStep(1);
    setSubmitted(false);
  };

  const objectiveLabel = OBJECTIVES.find((o) => o.id === objective)?.label;
  const audienceLabel = AUDIENCES.find((a) => a.id === audience)?.label;
  const creativeLabel = creative ? `Creative ${creative.toUpperCase()}` : null;

  if (submitted) {
    return (
      <Panel className="overflow-hidden">
        <div className="flex flex-col items-center px-6 py-14 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-lime/15 text-lime ring-1 ring-lime/30">
            <ShieldCheck size={26} />
          </span>
          <h3 className="mt-5 text-[22px] font-semibold tracking-[-0.01em] text-ink">
            Demo configuration approved.
          </h3>
          <p className="mt-3 max-w-[420px] text-[13.5px] leading-[1.65] text-ink2">
            This configuration was simulated for demonstration purposes — no
            real advertising campaign was deployed.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button onClick={reset} className={btnGhostSmall}>
              <Refresh size={13} />
              Reset demo
            </button>
            <a href="#waitlist" className={btnGhostSmall}>
              Join the waitlist
            </a>
          </div>
        </div>
      </Panel>
    );
  }

  return (
    <Panel className="overflow-hidden">
      {/* stepper header */}
      <div className="border-b border-line px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-ink">
            New campaign
          </span>
          <Chip>
            Step {Math.min(step, 5)} of 5 — {STEP_LABELS[Math.min(step, 5) - 1]}
          </Chip>
        </div>
        <div className="mt-2.5 hidden items-center gap-1 sm:flex">
          {STEP_LABELS.map((label, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <div key={label} className="flex flex-1 items-center gap-1">
                <span
                  className={`inline-flex size-5.5 items-center justify-center rounded-full text-[10.5px] font-semibold ${
                    done
                      ? "bg-lime text-[#101408]"
                      : active
                        ? "bg-lime/15 text-lime ring-1 ring-inset ring-lime/40"
                        : "bg-surface text-muted"
                  }`}
                >
                  {done ? <Check size={11} /> : n}
                </span>
                <span
                  className={`text-[11px] font-medium whitespace-nowrap ${
                    active ? "text-ink" : "text-muted"
                  }`}
                >
                  {label}
                </span>
                {n < STEP_LABELS.length && (
                  <span className="mx-0.5 h-px flex-1 bg-line" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* wizard body */}
        <div className="min-w-0 flex-1 p-3.5">
          {step === 1 && (
            <div>
              <h4 className="text-[14px] font-semibold text-ink">
                What is the campaign objective?
              </h4>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {OBJECTIVES.map((o) => {
                  const selected = objective === o.id;
                  return (
                    <button
                      key={o.id}
                      onClick={() => setObjective(o.id)}
                      aria-pressed={selected}
                      className={`flex items-start gap-2.5 rounded-[12px] border p-3 text-left transition-colors ${
                        selected
                          ? "border-lime/40 bg-lime/8"
                          : "border-line bg-surface/40 hover:border-ink2/40"
                      }`}
                    >
                      <span
                        className={`inline-flex size-8 shrink-0 items-center justify-center rounded-[10px] ${
                          selected
                            ? "bg-lime text-[#101408]"
                            : "bg-surface text-ink2"
                        }`}
                      >
                        <o.icon size={15} />
                      </span>
                      <span>
                        <span className="block text-[13px] font-semibold text-ink">
                          {o.label}
                        </span>
                        <span className="mt-0.5 block text-[11.5px] leading-[1.45] text-muted">
                          {o.desc}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h4 className="text-[14px] font-semibold text-ink">
                Who should see this campaign?
              </h4>
              <div className="mt-3 flex flex-col gap-2">
                {AUDIENCES.map((a) => {
                  const selected = audience === a.id;
                  return (
                    <button
                      key={a.id}
                      onClick={() => setAudience(a.id)}
                      aria-pressed={selected}
                      className={`flex items-center justify-between gap-3 rounded-[12px] border p-3 text-left transition-colors ${
                        selected
                          ? "border-lime/40 bg-lime/8"
                          : "border-line bg-surface/40 hover:border-ink2/40"
                      }`}
                    >
                      <span>
                        <span className="block text-[13px] font-semibold text-ink">
                          {a.label}
                        </span>
                        <span className="mt-0.5 block text-[11.5px] leading-[1.45] text-muted">
                          {a.desc}
                        </span>
                      </span>
                      {selected && (
                        <span className="inline-flex size-5.5 shrink-0 items-center justify-center rounded-full bg-lime text-[#101408]">
                          <Check size={12} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h4 className="text-[14px] font-semibold text-ink">
                Set a daily budget
              </h4>
              <div className="mt-6 px-1">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-muted">$5 / day</span>
                  <span className="tnum rounded-[8px] bg-lime/12 px-3 py-1 text-[18px] font-semibold text-lime ring-1 ring-inset ring-lime/30">
                    {fmtCurrency(budget)} / day
                  </span>
                  <span className="text-[12px] text-muted">$100 / day</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  aria-label="Daily budget in dollars"
                  className="budget-range mt-4 w-full"
                />
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {[10, 25, 50, 100].map((v) => (
                    <button
                      key={v}
                      onClick={() => setBudget(v)}
                      className={`h-8 rounded-full px-3.5 text-[12px] font-medium transition-colors ${
                        budget === v
                          ? "bg-lime text-[#101408]"
                          : "border border-line text-ink2 hover:text-ink"
                      }`}
                    >
                      ${v}/day
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-[12px] leading-[1.5] text-muted">
                  Projected 30-day spend:{" "}
                  <span className="tnum font-semibold text-ink2">
                    {fmtCurrency(budget * 30)}
                  </span>
                  . You can change the budget any time after launch.
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h4 className="text-[14px] font-semibold text-ink">
                Choose an advertisement creative
              </h4>
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {(
                  [
                    {
                      id: "a" as Creative,
                      headline: "Marketing that moves while you sleep.",
                      cta: "Join the Waitlist",
                      bg: "linear-gradient(135deg, #1B2119 0%, #22301A 55%, #2E4218 100%)",
                      frame: "",
                    },
                    {
                      id: "b" as Creative,
                      headline: "Your AI marketing team, on call.",
                      cta: "Get Early Access",
                      bg: "linear-gradient(160deg, #101408 0%, #141914 60%, #1B2119 100%)",
                      frame: "ring-1 ring-lime/30",
                    },
                  ] as const
                ).map((c) => {
                  const selected = creative === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCreative(c.id)}
                      aria-pressed={selected}
                      className={`overflow-hidden rounded-[12px] text-left transition-all ${
                        selected
                          ? "ring-2 ring-lime"
                          : "ring-1 ring-line hover:ring-ink2/40"
                      }`}
                    >
                      <div
                        className={`flex min-h-[130px] flex-col justify-between p-3.5 ${c.frame}`}
                        style={{ background: c.bg }}
                      >
                        <div>
                          <div className="text-[10px] font-semibold tracking-[0.12em] text-lime3">
                            SPEARHEAD
                          </div>
                          <div className="mt-1.5 text-[14.5px] leading-[1.3] font-semibold text-white">
                            {c.headline}
                          </div>
                        </div>
                        <div className="mt-2.5 inline-flex w-fit rounded-[8px] bg-lime px-2.5 py-1 text-[10.5px] font-semibold text-[#101408]">
                          {c.cta}
                        </div>
                      </div>
                      <div className="flex items-center justify-between bg-surface/50 px-3 py-2">
                        <span className="text-[12px] font-semibold text-ink">
                          Creative {c.id.toUpperCase()}
                        </span>
                        {selected && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-lime">
                            <Check size={12} /> Selected
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h4 className="text-[14px] font-semibold text-ink">
                Review your campaign
              </h4>
              <div className="mt-3 flex flex-col divide-y divide-line/70 rounded-[12px] border border-line">
                {[
                  {
                    label: "Objective",
                    value: objectiveLabel,
                    step: 1,
                  },
                  { label: "Audience", value: audienceLabel, step: 2 },
                  {
                    label: "Daily budget",
                    value: `${fmtCurrency(budget)} / day`,
                    step: 3,
                  },
                  { label: "Creative", value: creativeLabel, step: 4 },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 px-3 py-2.5"
                  >
                    <span className="text-[12.5px] text-muted">
                      {row.label}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-[12.5px] font-semibold text-ink">
                        {row.value ?? "—"}
                      </span>
                      <button
                        onClick={() => setStep(row.step)}
                        className="text-[11.5px] font-medium text-lime2 transition-colors hover:text-lime"
                      >
                        Edit
                      </button>
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[12px] leading-[1.5] text-muted">
                Confirming submits this demonstration configuration. No real ad
                campaign is created and no payment method is required.
              </p>
            </div>
          )}

          {/* wizard navigation */}
          <div className="mt-5 flex items-center justify-between gap-2 border-t border-line pt-3.5">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className={`${btnGhostSmall} disabled:invisible`}
            >
              <ChevronLeft size={13} />
              Back
            </button>
            {step < 5 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canContinue}
                className={btnPrimary + " h-10"}
              >
                Continue
                <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                className={btnPrimary + " h-10"}
              >
                <Megaphone size={14} />
                Confirm &amp; Launch (Demo)
              </button>
            )}
          </div>
        </div>

        {/* live summary — updates on every change (§7.4) */}
        <aside className="border-t border-line bg-surface/30 p-3.5 md:w-[230px] md:border-t-0 md:border-l">
          <div className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
            Summary
          </div>
          <div className="mt-3 flex flex-col gap-2.5 text-[12.5px]">
            {[
              { label: "Objective", value: objectiveLabel },
              { label: "Audience", value: audienceLabel },
              { label: "Daily budget", value: budget ? `${fmtCurrency(budget)}/day` : null },
              { label: "Creative", value: creativeLabel },
              {
                label: "30-day estimate",
                value: budget ? fmtCurrency(budget * 30) : null,
                accent: true,
              },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-2">
                <span className="text-muted">{row.label}</span>
                <span
                  className={`font-semibold ${row.accent ? "tnum text-lime" : "text-ink"}`}
                >
                  {row.value ?? "—"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-line pt-3">
            <p className="flex items-start gap-2 text-[11px] leading-[1.5] text-muted">
              <ShieldCheck size={13} className="mt-0.5 shrink-0 text-lime2" />
              Demonstration only — no live advertising platform is connected.
            </p>
          </div>
        </aside>
      </div>
    </Panel>
  );
}
