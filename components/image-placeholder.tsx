import { ImageIcon } from "lucide-react";

/* Labeled stand-in for a real photo/screenshot. Swap for <Image> once
   assets exist — the label states exactly what belongs there. */
export function ImagePlaceholder({
  label,
  ratio,
  className = "",
  compact = false,
}: {
  label: string;
  ratio?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={`flex flex-col items-center justify-center gap-2 overflow-hidden border-2 border-dashed border-foreground/20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,currentColor_10px,currentColor_11px)] text-foreground/[0.06] ${className}`}
    >
      {!compact && (
        <>
          <ImageIcon
            className="size-6 shrink-0 text-muted-foreground/60"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="max-w-[26ch] px-3 text-center text-[11px] font-medium leading-snug tracking-wide text-muted-foreground/80">
            {label}
          </span>
        </>
      )}
      {compact && (
        <ImageIcon
          className="size-4 shrink-0 text-muted-foreground/60"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
