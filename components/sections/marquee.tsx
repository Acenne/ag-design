const INCLUDED = [
  "Webflow-first builds",
  "Mobile is designed, not shrunk",
  "Local SEO structure",
  "Click-to-call everywhere",
  "Online booking forms",
  "Analytics & call tracking",
  "Two-week turnaround",
  "Tailored for HVAC conversion",
];

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex items-center gap-10 whitespace-nowrap pr-10"
      aria-hidden={ariaHidden || undefined}
    >
      {INCLUDED.map((item) => (
        <span key={item} className="flex items-center gap-10">
          <span className="text-[17px] font-semibold tracking-tight text-muted-foreground">
            {item}
          </span>
          <span className="text-xs text-[#e8b06a]">✳</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section
      className="overflow-hidden border-y border-border bg-secondary/40 py-6"
      aria-label="What every build includes"
    >
      <p className="mb-4 px-5 text-center text-xs uppercase tracking-[0.14em] text-muted-foreground/70">
        Every build includes
      </p>
      <div className="flex w-max animate-marquee motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center">
        <Track />
        <Track ariaHidden />
      </div>
    </section>
  );
}
