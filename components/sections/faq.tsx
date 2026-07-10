import { Plus, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Accent } from "@/components/accent";
import { ImagePlaceholder } from "@/components/image-placeholder";

const FAQS = [
  {
    q: "Why do you only work with HVAC companies?",
    a: "Focus compounds. We study what a good cost-per-lead looks like in your trade, which pages rank for emergency searches, and how homeowners choose a contractor at 11pm with a dead furnace. A generalist agency learns your business on your budget — we've made it our entire focus.",
  },
  {
    q: "How long does a project take?",
    a: "Starter sites go live in about two weeks; Complete in three to four, since it includes 12+ pages. The most common delay is waiting on photos and licensing info from your side — we give you a simple checklist on day one so nothing stalls.",
  },
  {
    q: "What do you build with?",
    a: "Webflow, by preference — it launches fast, stays secure, and you can edit text and photos yourself without calling a developer. That said, it's your website: if you'd rather be on WordPress, Framer, Squarespace, or hand-coded, we're happy to build on your stack instead.",
  },
  {
    q: "Do you work with our existing branding?",
    a: "Yes. If you have a logo and colors you love, we design around them. If your brand needs a refresh, we can include a light rebrand — most companies keep their trucks and uniforms as-is and we modernize everything digital.",
  },
  {
    q: "How does payment work?",
    a: "Simple: a 50% deposit books your project and locks your start date, and the remaining 50% is due at launch — after you've approved the final site. The Care plan bills monthly and you can cancel anytime.",
  },
  {
    q: "Can you integrate with our field software?",
    a: "We can wire booking and lead forms into ServiceTitan, Housecall Pro, Jobber, and most field-service tools. Tell us what runs your shop on the call and we'll confirm exactly what's possible before you commit.",
  },
];

export function Faq() {
  return (
    <section className="scroll-mt-16 bg-card py-20 md:py-32" id="faq">
      <div className="container-site max-w-3xl">
        <Reveal className="mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Common questions
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,4.6vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-balance">
            Before you <Accent variant="circle">ask.</Accent>
          </h2>
        </Reveal>

        <Reveal className="grid gap-3">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-border bg-background transition-colors duration-200 open:border-foreground/25 hover:border-foreground/25"
            >
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-heading text-[16.5px] font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
                {faq.q}
                <Plus
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-[62ch] px-6 pb-5 text-[15px] text-muted-foreground">
                {faq.a}
              </p>
            </details>
          ))}
        </Reveal>

        {/* Direct line to the founders — unique to FAQ */}
        <Reveal delay={1}>
          <div className="mt-10 flex flex-wrap items-center gap-5 rounded-2xl border border-border bg-background p-6 md:p-7">
            <div className="flex -space-x-3" aria-hidden="true">
              <ImagePlaceholder
                label="Founder headshot: Aaron — 96×96"
                compact
                className="size-12 rounded-full border-solid bg-card"
              />
              <ImagePlaceholder
                label="Founder headshot: Grace — 96×96"
                compact
                className="size-12 rounded-full border-solid bg-card"
              />
            </div>
            <p className="min-w-52 flex-1 text-[15px] text-muted-foreground">
              <strong className="font-semibold text-foreground">
                Still have a question?
              </strong>{" "}
              Ask Aaron or Grace directly — no ticket queue, no chatbot.
            </p>
            <a
              href="mailto:info@agdesignworks.com"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-px hover:border-foreground"
            >
              Email the founders
              <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
