import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface PlaceholderImageProps {
  src?: string
  alt: string
  className?: string
  aspectRatio?: "video" | "square" | "portrait" | "wide"
  label?: string
  iconName?: "data" | "design" | "creative" | "user"
  priority?: boolean
  variant?: "viewfinder" | "polaroid" | "default"
}

export function PlaceholderImage({
  src,
  alt,
  className,
  aspectRatio = "video",
  label = "Preview",
  iconName = "data",
  priority = false,
  variant = "viewfinder",
}: Readonly<PlaceholderImageProps>) {
  const aspectClass = {
    video: "aspect-[16/10]",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
  }[aspectRatio]

  // Jika src adalah file gambar lokal asli yang valid
  if (src && !src.startsWith("#") && !src.includes("placeholder")) {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl bg-[var(--surface-2)]", aspectClass, className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 hover:scale-105"
          priority={priority}
        />
      </div>
    )
  }

  // Varian Viewfinder Kamera (khusus potret hero / preview teknis)
  if (variant === "viewfinder") {
    return (
      <div
        className={cn(
          "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--glass-border)]",
          "bg-gradient-to-b from-[var(--surface)] via-[var(--surface-2)] to-[var(--surface)] p-6 text-center",
          "[box-shadow:var(--glass-highlight),var(--glass-shadow)]",
          aspectClass,
          className
        )}
      >
        {/* Viewfinder 4 Corner Brackets (Sudut Siku) */}
        <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-[var(--primary)] opacity-80" />
        <div className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-[var(--primary)] opacity-80" />
        <div className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-[var(--primary)] opacity-80" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-[var(--primary)] opacity-80" />

        {/* Viewfinder Camera HUD Info */}
        <div className="pointer-events-none absolute inset-x-5 top-4 flex items-center justify-between text-[10px] font-mono font-medium tracking-widest text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5 font-bold text-red-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            REC
          </span>
          <span>4K RAW 60FPS</span>
          <span>ISO 400</span>
        </div>

        {/* Center Crosshair */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25">
          <div className="h-6 w-px bg-[var(--text)]" />
          <div className="absolute h-px w-6 bg-[var(--text)]" />
        </div>

        {/* Viewfinder Bottom Status */}
        <div className="pointer-events-none absolute inset-x-5 bottom-4 flex items-center justify-between text-[9px] font-mono tracking-widest text-[var(--text-dim)]">
          <span>F/2.8 · 1/250s</span>
          <span>AF-C [TRACKING]</span>
          <span>+0.3 EV</span>
        </div>

        {/* Center Content: Avatar & Single Clean Label */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-2xl shadow-sm">
            {iconName === "user" ? "👤" : "📸"}
          </div>
          {label && (
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--primary)] shadow-xs">
              {label}
            </span>
          )}
          <p className="max-w-[200px] text-xs font-medium text-[var(--text-muted)]">{alt}</p>
        </div>
      </div>
    )
  }

  // Varian Polaroid
  if (variant === "polaroid") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 pb-8 shadow-md transition-transform duration-300 hover:-rotate-1",
          aspectClass,
          className
        )}
      >
        <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-[var(--surface-2)] p-4 text-center">
          <span className="text-2xl">📸</span>
          <p className="mt-2 text-xs font-medium text-[var(--text)]">{alt}</p>
        </div>
        <div className="absolute bottom-2 left-4 font-mono text-[10px] text-[var(--text-dim)]">
          {label}
        </div>
      </div>
    )
  }

  // Default clean visual
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--surface-2)] p-6 text-center",
        aspectClass,
        className
      )}
    >
      <div className="relative z-10 flex flex-col items-center gap-2">
        <span className="text-xl">
          {iconName === "data" && "📊"}
          {iconName === "design" && "🎨"}
          {iconName === "creative" && "📸"}
          {iconName === "user" && "👤"}
        </span>
        <span className="text-xs font-semibold text-[var(--text)]">{label}</span>
      </div>
    </div>
  )
}
