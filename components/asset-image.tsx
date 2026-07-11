"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* Renders a real image once the file exists in /public, and falls back to
   the labeled dashed placeholder until then (or if the file 404s). Lets us
   wire the layout now and drop assets in later without breaking the build.
   `alt` doubles as the placeholder caption, so keep it descriptive.

   Non-fill mode always resolves to an explicit aspect ratio (defaulting to
   1/1) so the container has a real height for h-full/object-cover to size
   against — without one, a percentage height resolves against the parent's
   auto height per spec, so the <img> falls back to its natural intrinsic
   size and blows out of the box instead of being clipped by it. */
export function AssetImage({
  src,
  alt,
  ratio,
  className = "",
  fill = false,
  position = "object-center",
  imgClassName = "",
}: {
  src?: string;
  alt: string;
  ratio?: string;
  className?: string;
  fill?: boolean;
  position?: string;
  imgClassName?: string;
}) {
  const [ok, setOk] = useState(true);
  const shell = fill ? "absolute inset-0 h-full w-full" : "relative w-full";

  return (
    <div
      style={!fill ? { aspectRatio: ratio ?? "1/1" } : undefined}
      className={cn("overflow-hidden", shell, className)}
    >
      {src && ok ? (
        // eslint-disable-next-line @next/next/no-img-element -- graceful fallback needs onError; file may not exist yet
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setOk(false)}
          className={cn("h-full w-full object-cover", position, imgClassName)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-foreground/20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,currentColor_10px,currentColor_11px)] text-foreground/[0.06]">
          <ImageIcon
            className="size-5 shrink-0 text-muted-foreground/60"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="max-w-[26ch] px-3 text-center text-[11px] font-medium leading-snug text-muted-foreground/80">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
