"use client";

import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { useAttribution } from "@/components/providers";
import { Spinner } from "@/components/ui";
import { Check, ShieldCheck } from "@/components/icons";

/* §8 — Waitlist CTA. Dark cinematic section in both themes (§10),
   with a single email field (§8.1) and full form state handling (§8.2).
   Submissions are persisted server-side via /api/waitlist (§8.3). */

type FormStatus = "idle" | "loading" | "success" | "duplicate" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Waitlist() {
  const { useCaseSource, signupSource } = useAttribution();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const mountedAt = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    setValidationMessage(null);

    /* basic client-side validation (§8.2) */
    const value = email.trim();
    if (!value) {
      setValidationMessage("Please enter your email address.");
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setValidationMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value,
          honeypot,
          elapsedMs: Date.now() - mountedAt.current,
          use_case_source: useCaseSource,
          signup_source: signupSource,
        }),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }
      if (response.status === 409) {
        setStatus("duplicate");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="waitlist" className="scope-dark relative overflow-hidden">      {/* cinematic background — lime radial illumination (§8) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-bg" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 60% at 50% 62%, rgba(163,230,53,0.16) 0%, rgba(132,204,22,0.07) 42%, transparent 72%)",
          }}
        />
        <div
          className="absolute top-[10%] right-[8%] h-[90%] w-[90px] animate-[atmos-beam_10s_ease-in-out_infinite]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(217,249,157,0.14) 40%, transparent 90%)",
            filter: "blur(16px)",
          }}
        />
        <div className="atmos-noise absolute inset-0" />
      </div>

      <div className="shell relative py-24 text-center md:py-32 lg:py-36">
        <m.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto max-w-[720px]"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/10 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-lime3 uppercase">
            <span className="size-1.5 rounded-full bg-lime" />
            Early Access
          </span>
          <h2 className="mt-6 text-[32px] leading-[1.1] font-semibold tracking-[-0.02em] text-ink md:text-[44px]">
            Be Part of the Future of Marketing.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-[1.65] text-ink2">
            Get early access to Spearhead and experience a smarter way to plan,
            manage, and execute your marketing.
          </p>

          {/* form — single visible input (§8.1) */}
          <div className="mx-auto mt-9 max-w-[520px]">
            {status === "success" ? (
              <div
                role="status"
                className="flex flex-col items-center gap-3 rounded-[14px] border border-lime/25 bg-lime/8 px-6 py-8"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-lime/15 text-lime ring-1 ring-lime/30">
                  <Check size={20} />
                </span>
                <div>
                  <div className="text-[16px] font-semibold text-ink">
                    You&apos;re on the list.
                  </div>
                  <div className="mt-1 text-[13.5px] text-ink2">
                    We&apos;ll reach out when Spearhead is ready for early
                    access.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <label className="sr-only" htmlFor="waitlist-email">
                    Email address
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (validationMessage) setValidationMessage(null);
                      if (status === "duplicate" || status === "error") {
                        setStatus("idle");
                      }
                    }}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="h-12 min-w-0 flex-1 rounded-[10px] border border-line bg-surface/80 px-4 text-[14px] text-ink placeholder:text-muted focus:border-lime/50 focus:outline-none"
                  />
                  {/* honeypot — hidden from users, catches bots (§8.2) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="waitlist-company">Company</label>
                    <input
                      id="waitlist-company"
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-lime px-6 text-[13.5px] font-semibold text-[#101408] transition-colors hover:bg-lime2 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "loading" && <Spinner className="size-4" />}
                    Join the Waitlist
                  </button>
                </div>

                <div aria-live="polite" className="min-h-[24px] pt-2.5">
                  {validationMessage && (
                    <p className="text-[12.5px] font-medium text-lime3">
                      {validationMessage}
                    </p>
                  )}
                  {status === "duplicate" && (
                    <p className="text-[12.5px] font-medium text-lime3">
                      You&apos;re already on the list.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-[12.5px] font-medium text-lime3">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  {status !== "error" && status !== "duplicate" && !validationMessage && (
                    <p className="flex items-center justify-center gap-1.5 text-[11.5px] text-muted">
                      <ShieldCheck size={12} className="text-lime2" />
                      No spam — we&apos;ll only email you about early access.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
}
