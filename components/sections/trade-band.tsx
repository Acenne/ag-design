import { AssetImage } from "@/components/asset-image";
import { FloatingPaths } from "@/components/ui/background-paths";

/* Full-bleed authenticity band — a real HVAC field photo behind a navy
   wash, with flowing background paths reading as airflow. */
export function TradeBand() {
  return (
    <section className="dark relative isolate overflow-hidden bg-background">
      <AssetImage
        fill
        src="/images/hvac-technician.jpg"
        alt="HVAC technician servicing a rooftop unit"
        position="object-center"
        className="opacity-80"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#07182e] via-[#07182e]/90 to-[#07182e]/40 md:to-[#07182e]/20"
        aria-hidden="true"
      />
      {/* Flowing airflow paths over the wash */}
      <div className="absolute inset-0 opacity-50" aria-hidden="true">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      <div className="container-site relative z-10 py-24 text-foreground md:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Who this is for
        </p>
        <p className="mt-4 max-w-[20ch] font-heading text-[clamp(1.9rem,4.4vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-balance">
          For the crews who show up at 11pm with a dead furnace.
        </p>
        <p className="mt-5 max-w-[46ch] text-[16px] text-muted-foreground">
          You do the hard, physical work of keeping homes comfortable. Your
          website should pull its weight just as hard — and that&apos;s the only
          thing we build.
        </p>
      </div>
    </section>
  );
}
