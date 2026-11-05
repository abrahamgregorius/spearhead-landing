"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./providers";
import { useAttribution } from "./providers";
import { LogoLink } from "./logo";
import { Close, Menu, Moon, Sun } from "./icons";

const LINKS = [
  { href: "#what-we-do", label: "What We Do" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#waitlist", label: "Waitlist" },
];

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={`inline-flex size-9 items-center justify-center rounded-[10px] text-ink2 transition-colors hover:bg-surface hover:text-ink ${className}`}
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={16} />}
    </button>
  );
}

function JoinWaitlistCta({
  source,
  compact = false,
}: {
  source: "hero" | "general";
  compact?: boolean;
}) {
  const { markSignupIntent } = useAttribution();
  return (
    <a
      href="#waitlist"
      onClick={() => markSignupIntent(source)}
      className={`inline-flex items-center justify-center rounded-[10px] bg-lime font-semibold text-[#101408] transition-colors hover:bg-lime2 ${
        compact ? "h-9 px-3.5 text-[12.5px]" : "h-10 px-4 text-[13px]"
      }`}
    >
      Join Waitlist
    </a>
  );
}

function NavLinks({
  onNavigate,
  className = "",
  linkClassName = "",
}: {
  onNavigate?: () => void;
  className?: string;
  linkClassName?: string;
}) {
  return (
    <nav className={className} aria-label="Primary">
      <ul className={`flex items-center gap-8 ${linkClassName}`}>
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={onNavigate}
              className="text-ink2 transition-colors hover:text-lime"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* In-frame navigation — the hero's primary website navigation (§5.4). */
/* ------------------------------------------------------------------ */

export function FrameNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30">
      <div className="flex h-[60px] items-center justify-between gap-4 px-5 md:h-[68px] md:px-8">
        <LogoLink size={20} wordmark="spearhead" />

        <NavLinks
          className="hidden lg:block"
          linkClassName="text-[13px] font-medium"
        />

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <JoinWaitlistCta source="general" />
        </div>

        {/* Mobile: logo left; theme toggle + hamburger right (§4) */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-[10px] text-ink2 transition-colors hover:bg-surface hover:text-ink"
          >
            {open ? <Close size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute inset-x-4 top-full z-40 rounded-[14px] border border-line bg-surface p-3 shadow-2xl lg:hidden">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex h-11 items-center rounded-[8px] px-3 text-[14px] font-medium text-ink2 transition-colors hover:bg-card hover:text-lime"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-2 border-t border-line pt-3">
            <div onClick={() => setOpen(false)}>
              <JoinWaitlistCta source="general" compact />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Floating navigation — appears after scrolling past the hero. This   */
/* is the same global navigation; it never sits above the browser      */
/* mockup (§5.4) — it only shows once the hero is out of view.         */
/* ------------------------------------------------------------------ */

export function FloatingNav() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const hero = document.getElementById("hero");
      const threshold = hero
        ? hero.offsetTop + hero.offsetHeight - 80
        : window.innerHeight;
      const next = window.scrollY > threshold;
      setShow(next);
      if (!next) setOpen(false);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
      aria-hidden={!show}
    >
      <div className="border-b border-line bg-bg/92 backdrop-blur-sm">
        <div className="shell flex h-[64px] items-center justify-between gap-4">
          <LogoLink size={20} wordmark="spearhead" />

          <NavLinks
            className="hidden md:block"
            linkClassName="text-[13px] font-medium"
          />

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <JoinWaitlistCta source="general" compact />
          </div>

          <div className="flex items-center gap-1.5 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-9 items-center justify-center rounded-[10px] text-ink2 transition-colors hover:bg-surface hover:text-ink"
            >
              {open ? <Close size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="shell pb-4 md:hidden">
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex h-11 items-center rounded-[8px] px-3 text-[14px] font-medium text-ink2 transition-colors hover:bg-surface hover:text-lime"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-2" onClick={() => setOpen(false)}>
              <JoinWaitlistCta source="general" compact />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
