import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/logo";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <div className="shell max-w-[720px] py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-ink2 transition-colors hover:text-lime"
        >
          <LogoMark size={16} />
          ← Back to spearhead.ai
        </Link>

        <h1 className="mt-8 text-[32px] font-semibold tracking-[-0.02em] text-ink md:text-[40px]">
          Privacy Policy
        </h1>
        <p className="mt-3 text-[13px] text-muted">
          Last updated: November 2026
        </p>

        <div className="mt-10 flex flex-col gap-8 text-[14.5px] leading-[1.7] text-ink2 [&_h2]:text-[17px] [&_h2]:font-semibold [&_h2]:text-ink">
          <section>
            <h2>What we collect</h2>
            <p className="mt-2">
              When you join the Spearhead waitlist, we store the email address
              you provide, along with basic attribution information (which part
              of the page you explored before signing up) and the submission
              timestamp. No additional personal data is collected and no
              tracking cookies are used.
            </p>
          </section>
          <section>
            <h2>How we use it</h2>
            <p className="mt-2">
              Your email address is used exclusively to contact you about
              Spearhead early access. Attribution data helps us understand which
              product demonstrations interest people most. We do not sell or
              share your information with third parties.
            </p>
          </section>
          <section>
            <h2>Your rights</h2>
            <p className="mt-2">
              You can request removal from the waitlist at any time by replying
              to any email we send you, and we will delete your entry from our
              records.
            </p>
          </section>
          <section>
            <h2>Demonstration content</h2>
            <p className="mt-2">
              Product interfaces shown on this page are interactive
              demonstrations running on sample data. No advertising platforms
              are connected and no live campaigns are created.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
