"use client";

import { m, useReducedMotion } from "motion/react";
import { FrameNav } from "@/components/nav";
import { HeroDashboard } from "./dashboard";

/* Atmosphere dots — extremely subtle, pure CSS (§5.3). */
const DOTS = [
  { left: "12%", top: "22%", delay: "0s" },
  { left: "28%", top: "12%", delay: "2.4s" },
  { left: "46%", top: "18%", delay: "4.1s" },
  { left: "64%", top: "10%", delay: "1.2s" },
  { left: "82%", top: "30%", delay: "3.3s" },
  { left: "88%", top: "52%", delay: "5s" },
  { left: "8%", top: "48%", delay: "4.6s" },
];

function Atmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-b-[18px]"
    >
      {/* base */}
      <div className="absolute inset-0 bg-[#080B08]" />

      {/* deep green gradient — lower center */}
      <div
        className="absolute inset-x-0 bottom-0 h-[70%] animate-[atmos-drift_22s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(58% 62% at 50% 92%, rgba(132,204,22,0.34) 0%, rgba(101,163,13,0.16) 38%, rgba(8,11,8,0) 72%)",
        }}
      />

      {/* bright lime illumination behind the dashboard */}
      <div
        className="absolute inset-x-0 bottom-0 h-[58%] animate-[atmos-drift_28s_ease-in-out_infinite_reverse]"
        style={{
          background:
            "radial-gradient(42% 46% at 50% 88%, rgba(163,230,53,0.42) 0%, rgba(163,230,53,0.12) 45%, rgba(8,11,8,0) 70%)",
          filter: "blur(6px)",
        }}
      />

      {/* soft lime halo behind the headline */}
      <div
        className="absolute left-[4%] top-[6%] h-[46%] w-[58%] animate-[atmos-drift_30s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(50% 50% at 42% 42%, rgba(163,230,53,0.13) 0%, rgba(8,11,8,0) 68%)",
        }}
      />

      {/* vertical light beam — right side */}
      <div
        className="absolute top-[-12%] right-[16%] h-[125%] w-[110px] animate-[atmos-beam_9s_ease-in-out_infinite]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.30) 0%, rgba(217,249,157,0.16) 34%, rgba(163,230,53,0.10) 58%, rgba(8,11,8,0) 86%)",
          filter: "blur(18px)",
          transform: "rotate(2deg)",
        }}
      />
      <div
        className="absolute top-[-8%] right-[13.4%] h-[118%] w-[2px] animate-[atmos-beam_9s_ease-in-out_infinite]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(217,249,157,0.22) 40%, transparent 80%)",
          filter: "blur(1px)",
        }}
      />

      {/* atmospheric particles */}
      {DOTS.map((dot, i) => (
        <span
          key={i}
          className="absolute size-[3px] rounded-full bg-[#D9F99D] animate-[dot-twinkle_6s_ease-in-out_infinite]"
          style={{
            left: dot.left,
            top: dot.top,
            animationDelay: dot.delay,
          }}
        />
      ))}

      {/* noise */}
      <div className="atmos-noise absolute inset-0" />
    </div>
  );
}

const easeOut: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function Hero() {
  const reduce = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 14 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: easeOut },
  });

  return (
    <section id="hero" className="relative overflow-hidden pb-16 md:pb-20">
      {/* outer neutral canvas (§5.1) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, var(--c-bg2) 0%, var(--c-bg) 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 pt-6 sm:px-6 md:pt-10">
        {/* browser frame (§5.2) */}
        <div className="relative rounded-[18px] border border-white/25 bg-[#101210] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
          {/* toolbar */}
          <div className="relative z-30 flex h-[42px] items-center gap-3 rounded-t-[18px] border-b border-black/40 bg-[#252725] px-4">
            <div className="flex w-14 items-center gap-1.5">
              <span className="size-[7px] rounded-full bg-[#E5645C]" />
              <span className="size-[7px] rounded-full bg-[#D8A657]" />
              <span className="size-[7px] rounded-full bg-[#7FB46C]" />
            </div>
            <div className="flex flex-1 justify-center">
              <div className="flex h-[26px] w-full max-w-[340px] items-center justify-center gap-2 rounded-[8px] bg-black/35 text-[11.5px] text-white/45">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                spearhead.ai
              </div>
            </div>
            <div className="flex w-14 items-center justify-end gap-2.5 text-white/25">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* website viewport inside the frame — always dark (§10) */}
          <div className="scope-dark relative bg-[#080B08]">
            <Atmosphere />
            <FrameNav />

            {/* hero content — upper-left (§5.5) */}
            <div className="relative z-10 px-6 pt-8 pb-20 md:px-10 md:pt-14 md:pb-28 lg:px-14">
              <m.div {...fade(0.05)}>
                <span className="inline-flex items-center gap-2 rounded-full border border-lime2/30 bg-[#84CC16]/10 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-lime3">
                  <span className="size-1.5 animate-[pulse-ring_2.4s_ease-in-out_infinite] rounded-full bg-lime" />
                  YOUR AI MARKETING TEAM
                </span>
              </m.div>

              <m.h1
                {...fade(0.15)}
                className="mt-5 text-[38px] leading-[1.08] font-semibold tracking-[-0.025em] text-white sm:text-[44px] md:text-[52px] xl:text-[56px]"
              >
                Your Marketing,{" "}
                <br className="hidden sm:inline" />
                Moving in the Right Direction.
              </m.h1>

              <m.p
                {...fade(0.3)}
                className="mt-5 max-w-[470px] text-[14px] leading-[1.6] text-white/60 md:text-[15px]"
              >
                Turn marketing data into actionable strategies and execute
                campaigns with one intelligent platform.
              </m.p>

              <m.div {...fade(0.42)} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#waitlist"
                  className="inline-flex h-11 items-center justify-center rounded-[10px] bg-lime px-5 text-[13px] font-semibold text-[#101408] transition-colors hover:bg-lime2"
                >
                  Join the Waitlist
                </a>
                <a
                  href="#what-we-do"
                  className="inline-flex h-11 items-center justify-center rounded-[10px] border border-white/15 px-5 text-[13px] font-medium text-white transition-colors hover:bg-white/5"
                >
                  Explore Spearhead
                </a>
              </m.div>
            </div>

            {/* overlapping dashboard (§5.6) */}
            <m.div
              initial={reduce ? false : { opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
              className="relative z-10 -mt-16 translate-y-8 px-4 sm:px-6 md:-mt-24 md:translate-y-10 md:px-10 lg:px-14"
            >
              <HeroDashboard />
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
