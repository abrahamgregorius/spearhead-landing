import { Logo } from "@/components/logo";
import { DynamicYear } from "@/components/dynamic-year";

/* §9 — minimal footer. */

const LINKS = [
  { href: "#what-we-do", label: "What We Do" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#waitlist", label: "Join Waitlist" },
  { href: "/privacy", label: "Privacy Policy" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between md:gap-6">
        <div>
          <Logo wordmark="spearhead" size={20} />
          <p className="mt-2.5 text-[13px] text-ink2">
            Your AI-powered marketing team.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2.5 md:flex-row md:gap-7">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[13px] text-ink2 transition-colors hover:text-lime"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="shell border-t border-line/70 py-5">
        <p className="text-[12px] text-muted">
          © <DynamicYear /> Spearhead. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
