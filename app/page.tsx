import { FloatingNav } from "@/components/nav";
import { Hero } from "@/components/hero/hero";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { UseCases } from "@/components/sections/use-cases";
import { Waitlist } from "@/components/sections/waitlist";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main className="flex-1">
        <Hero />
        <WhatWeDo />
        <UseCases />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
