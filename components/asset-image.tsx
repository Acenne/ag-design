"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* Renders a real image once the file exists in /public, and falls back to
   the labeled dashed placeholder until then (or if the file 404s). Lets us
   wire the layout now and drop assets in later without breaking the build.
   `alt` doubles as the placeholder caption, so keep it descriptive.

   Uses next/image (not a raw <img>) so the server resamples each photo down
   to the size it's actually displayed at. A raw <img> ships the full-res
   file and leans on the browser's cheap bilinear filter to shrink it —
   fine for a 2x downscale, but visibly blurry/aliased once a large source
   (e.g. a 2000px photo in a 48px avatar) is squeezed down by 10-30x.

   Non-fill mode always resolves to an explicit aspect ratio (defaulting to
   1/1) so the container has a real height for the fill image to size
   against — without one, a percentage height resolves against the parent's
   auto height per spec and the box collapses or the image overflows it. */
export function AssetImage({
  src,
  alt,
  ratio,
  className = "",
  fill = false,
  position = "object-center",
  imgClassName = "",
  sizes = "100vw",
  quality = 90,
}: {
  src?: string;
  alt: string;
  ratio?: string;
  className?: string;
  fill?: boolean;
  position?: string;
  imgClassName?: string;
  sizes?: string;
  quality?: number;
}) {
  const [ok, setOk] = useState(true);
  const shell = fill ? "absolute inset-0 h-full w-full" : "relative w-full";

  return (
    <div
      style={!fill ? { aspectRatio: ratio ?? "1/1" } : undefined}
      className={cn("overflow-hidden", shell, className)}
    >
      {src && ok ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          onError={() => setOk(false)}
          className={cn("object-cover", position, imgClassName)}
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
