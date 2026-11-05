"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "motion/react";
import { Panel, PriorityBadge, Chip, btnLimeSmall, btnGhostSmall } from "@/components/ui";
import { Bot, Check, ChevronDown, Close, Send, Sparkles, User } from "@/components/icons";

/* §7.3 — Develop Strategy: a simulated AI marketing assistant. All
   responses are canned — clearly labeled, no real model is connected. */

type Priority = "high" | "medium";
type RecState = "idle" | "approved" | "dismissed";

type Rec = {
  id: string;
  title: string;
  priority: Priority;
  reason: string;
  detail: string;
  state: RecState;
  expanded: boolean;
};

type Message = {
  id: number;
  role: "user" | "ai";
  text: string;
  recs?: Rec[];
};

const INITIAL_RECS: Rec[] = [
  {
    id: "r1",
    title: "Reduce inefficient spending",
    priority: "high",
    reason:
      "Identify campaigns with high acquisition costs and low conversion rates.",
    detail:
      "Prospecting Wide converts at $28.90 each — 64% above your $17.60 account target. Pausing its two weakest ad sets and capping spend at $40/day recovers an estimated +0.6x ROAS within a week.",
    state: "idle",
    expanded: false,
  },
  {
    id: "r2",
    title: "Reallocate campaign budget",
    priority: "medium",
    reason: "Prioritize campaigns with stronger conversion performance.",
    detail:
      "Brand Core converts at 4.2x with untapped search impression share. Moving $340/week from prospecting to Brand Core projects weekly conversions rising from 86 to ~104.",
    state: "idle",
    expanded: false,
  },
  {
    id: "r3",
    title: "Test new creatives",
    priority: "medium",
    reason: "Experiment with alternative creative messaging.",
    detail:
      "Prospecting creative frequency has reached 3.4 and click-through is fading. Two new hooks — problem-first and social-proof — would restart learning at a $40/day test budget.",
    state: "idle",
    expanded: false,
  },
];

let nextId = 100;

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "user",
    text: "What should I improve in my advertising campaigns this week?",
  },
  {
    id: 2,
    role: "ai",
    text: "Based on your current performance, I recommend three actions.",
    recs: INITIAL_RECS,
  },
];

const SUGGESTIONS: {
  label: string;
  reply: string;
  rec?: Omit<Rec, "state" | "expanded">;
}[] = [
  {
    label: "Where am I wasting budget?",
    reply:
      "Prospecting Wide is the main leak: $520/week at 2.4x ROAS with a CPA 64% above target. Capping it and shifting budget to Brand Core is the fastest fix.",
    rec: {
      id: "r4",
      title: "Cap Prospecting Wide at $40/day",
      priority: "high",
      reason: "High acquisition cost with low conversion rate.",
      detail:
        "At $40/day the campaign keeps learning without draining budget. Re-assess after 30 conversions.",
    },
  },
  {
    label: "Which audience converts best?",
    reply:
      "Returning visitors convert 2.8x better than cold audiences this month. Retargeting ENG converts at 2.9x even while paused — reactivate it with a modest budget.",
    rec: {
      id: "r5",
      title: "Reactivate Retargeting ENG",
      priority: "medium",
      reason: "Strong conversion performance with capped reach.",
      detail:
        "A $30/day budget on retargeting is projected to add ~12 conversions/week at a 2.9x ROAS.",
    },
  },
  {
    label: "How do I prepare a launch?",
    reply:
      "For a launch week I recommend a 70/20/10 split: 70% on proven search terms, 20% on prospecting with launch creatives, 10% reserved for reallocation once data arrives.",
    rec: {
      id: "r6",
      title: "Set a launch budget guardrail",
      priority: "medium",
      reason: "Protect performance during unpredictable launch periods.",
      detail:
        "Spearhead would hold 10% of the launch budget and shift it automatically toward whichever channel hits its CPA target first.",
    },
  },
  {
    label: "Summarize last week",
    reply:
      "Last week: $2,450 spend, $8,330 revenue, 86 conversions at 3.4x ROAS. Performance dipped late in the week — driven by prospecting fatigue, while search stayed strong.",
  },
];

const SIMULATED_NOTE =
  "This demonstration uses simulated responses. In the product, Spearhead analyzes your connected marketing data to answer with specific, prioritized actions.";

function RecCard({
  rec,
  onToggleExpand,
  onApprove,
  onDismiss,
}: {
  rec: Rec;
  onToggleExpand: () => void;
  onApprove: () => void;
  onDismiss: () => void;
}) {
  return (
    <div
      className={`rounded-[12px] border p-3 transition-colors ${
        rec.state === "approved"
          ? "border-lime/30 bg-lime/8"
          : rec.state === "dismissed"
            ? "border-line bg-surface/30 opacity-60"
            : "border-line bg-card"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[13px] font-semibold text-ink">{rec.title}</span>
        <PriorityBadge level={rec.priority} />
      </div>
      <p className="mt-1.5 text-[12.5px] leading-[1.5] text-ink2">
        {rec.reason}
      </p>

      {rec.state === "idle" && (
        <>
          <button
            onClick={onToggleExpand}
            aria-expanded={rec.expanded}
            className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-lime2 transition-colors hover:text-lime"
          >
            {rec.expanded ? "Hide reasoning" : "Why this action?"}
            <ChevronDown
              size={13}
              className={`transition-transform ${rec.expanded ? "rotate-180" : ""}`}
            />
          </button>
          {rec.expanded && (
            <p className="mt-2 rounded-[10px] bg-surface/60 p-2.5 text-[12px] leading-[1.55] text-ink2">
              {rec.detail}
            </p>
          )}
          <div className="mt-3 flex items-center gap-2">
            <button onClick={onApprove} className={btnLimeSmall}>
              <Check size={13} />
              Approve
            </button>
            <button onClick={onDismiss} className={btnGhostSmall}>
              <Close size={12} />
              Dismiss
            </button>
          </div>
        </>
      )}

      {rec.state === "approved" && (
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-[8px] bg-lime/15 px-2.5 py-1 text-[12px] font-semibold text-lime ring-1 ring-inset ring-lime/30">
            <Check size={12} />
            Approved — queued for your review
          </span>
        </div>
      )}

      {rec.state === "dismissed" && (
        <div className="mt-2 flex items-center gap-2.5">
          <span className="text-[12px] text-muted">Dismissed</span>
          <button
            onClick={onApprove}
            className="text-[12px] font-medium text-lime2 transition-colors hover:text-lime"
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
}

export function StrategyDemo() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const pushExchange = (userText: string, aiText: string, rec?: Omit<Rec, "state" | "expanded">) => {
    if (typing) return;
    setMessages((prev) => [
      ...prev,
      { id: nextId++, role: "user", text: userText },
    ]);
    setTyping(true);
    timerRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId++,
          role: "ai",
          text: aiText,
          recs: rec
            ? [{ ...rec, state: "idle" as RecState, expanded: false }]
            : undefined,
        },
      ]);
      setTyping(false);
    }, 1100);
  };

  const updateRec = (messageId: number, recId: string, patch: Partial<Rec>) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              recs: msg.recs?.map((r) =>
                r.id === recId ? { ...r, ...patch } : r,
              ),
            }
          : msg,
      ),
    );
  };

  const sendCustom = () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    pushExchange(text, SIMULATED_NOTE);
  };

  return (
    <Panel className="overflow-hidden">
      {/* assistant identity */}
      <div className="flex items-center gap-2.5 border-b border-line px-3.5 py-2.5">
        <span className="inline-flex size-8 items-center justify-center rounded-[10px] bg-lime/15 text-lime">
          <Bot size={16} />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
            Spearhead AI
            <Chip className="!px-2 !py-0.5 !text-[10px]">
              <Sparkles size={10} className="text-lime" />
              Simulated demo
            </Chip>
          </div>
          <div className="text-[11px] text-muted">AI marketing strategist</div>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10.5px] text-muted">
          <span className="size-1.5 rounded-full bg-lime" />
          Online
        </span>
      </div>

      {/* conversation */}
      <div
        ref={scrollRef}
        className="flex max-h-[440px] min-h-[380px] flex-col gap-4 overflow-y-auto p-3.5"
        aria-live="polite"
      >
        {messages.map((msg) =>
          msg.role === "user" ? (
            <div key={msg.id} className="flex justify-end">
              <div className="flex max-w-[85%] items-start gap-2 rounded-[12px] rounded-br-[4px] bg-surface px-3 py-2 text-[12.5px] leading-[1.5] text-ink">
                <User size={13} className="mt-0.5 shrink-0 text-muted" />
                {msg.text}
              </div>
            </div>
          ) : (
            <div
              key={msg.id}
              className="rounded-[12px] rounded-bl-[4px] border border-line bg-surface/40 p-3"
            >
              <div className="flex items-start gap-2">
                <Bot size={13} className="mt-0.5 shrink-0 text-lime" />
                <p className="text-[12.5px] leading-[1.55] text-ink2">
                  {msg.text}
                </p>
              </div>
              {msg.recs && (
                <div className="mt-3 flex flex-col gap-2">
                  {msg.recs.map((rec) => (
                    <RecCard
                      key={rec.id}
                      rec={rec}
                      onToggleExpand={() =>
                        updateRec(msg.id, rec.id, { expanded: !rec.expanded })
                      }
                      onApprove={() => {
                        updateRec(msg.id, rec.id, {
                          state: rec.state === "dismissed" ? "idle" : "approved",
                          expanded: false,
                        });
                      }}
                      onDismiss={() =>
                        updateRec(msg.id, rec.id, {
                          state: "dismissed",
                          expanded: false,
                        })
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          ),
        )}

        {typing && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex w-fit items-center gap-1.5 rounded-[12px] rounded-bl-[4px] border border-line bg-surface/40 px-3 py-2.5"
            role="status"
            aria-label="Spearhead AI is typing"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1.5 rounded-full bg-ink2 animate-[typing-bounce_1.2s_ease-in-out_infinite]"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </m.div>
        )}
      </div>

      {/* prompt suggestions */}
      <div className="flex gap-1.5 overflow-x-auto border-t border-line px-3.5 pt-3 pb-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => pushExchange(s.label, s.reply, s.rec)}
            disabled={typing}
            className="h-8 shrink-0 rounded-full border border-line px-3 text-[12px] font-medium whitespace-nowrap text-ink2 transition-colors hover:border-lime/40 hover:text-lime disabled:cursor-not-allowed disabled:opacity-50"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* input */}
      <div className="flex items-center gap-2 px-3.5 pb-3.5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendCustom();
          }}
          placeholder="Ask about your marketing…"
          aria-label="Ask Spearhead AI"
          className="h-10 min-w-0 flex-1 rounded-[10px] border border-line bg-surface px-3 text-[12.5px] text-ink placeholder:text-muted focus:border-lime/40 focus:outline-none"
        />
        <button
          onClick={sendCustom}
          disabled={typing || !input.trim()}
          aria-label="Send message"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-lime text-[#101408] transition-colors hover:bg-lime2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={15} />
        </button>
      </div>
    </Panel>
  );
}
