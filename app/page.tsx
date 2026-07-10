import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Work } from "@/components/sections/work";
import { Services } from "@/components/sections/services";
import { TradeBand } from "@/components/sections/trade-band";
import { Process } from "@/components/sections/process";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div id="top" className="w-full">
      <a
        href="#main"
        className="absolute -left-[9999px] top-3 z-[100] rounded-lg bg-foreground px-4 py-2.5 font-semibold text-background focus:left-3"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main">
        {/* Navy sections */}
        <div className="dark">
          <Hero />
        </div>

        {/* Off-white sections */}
        <Marquee />
        <Work />
        <Services />

        {/* Navy authenticity band */}
        <TradeBand />

        <Process />

        {/* Testimonials archived until real client quotes exist —
            re-add <Testimonials /> (in a dark wrapper) when ready. */}

        <Pricing />
        <Faq />

        {/* Navy */}
        <div className="dark">
          <Contact />
        </div>
      </main>

      <div className="dark">
        <SiteFooter />
      </div>
    </div>
  );
}
