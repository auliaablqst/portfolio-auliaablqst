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
}

export function PlaceholderImage({
  src,
  alt,
  className,
  aspectRatio = "video",
  label = "Preview Placeholder",
  iconName = "data",
  priority = false,
}: Readonly<PlaceholderImageProps>) {
  const aspectClass = {
    video: "aspect-[16/10]",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
  }[aspectRatio]

  // Jika src adalah file gambar lokal / svg yang valid dan bukan placeholder kosong
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

  // Visual gradient placeholder jika belum ada file foto asli
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-soft)] p-6 text-center shadow-inner transition-all duration-300",
        aspectClass,
        iconName === "data" && "bg-gradient-to-br from-[#1e1b4b]/20 via-[#312e81]/10 to-[var(--surface-2)]",
        iconName === "design" && "bg-gradient-to-br from-[#701a75]/20 via-[#4a044e]/10 to-[var(--surface-2)]",
        iconName === "creative" && "bg-gradient-to-br from-[#064e3b]/20 via-[#022c22]/10 to-[var(--surface-2)]",
        iconName === "user" && "bg-gradient-to-br from-[#312e81]/30 via-[var(--card-dark)] to-[#0f172a]",
        className
      )}
    >
      {/* Subtle grid background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(127,119,221,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(127,119,221,0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-[var(--card-bg)] text-xl shadow-sm backdrop-blur-sm">
          {iconName === "data" && "📊"}
          {iconName === "design" && "🎨"}
          {iconName === "creative" && "📸"}
          {iconName === "user" && "👤"}
        </span>
        <span className="rounded-full border border-[var(--border-soft)] bg-[var(--card-bg)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] backdrop-blur-sm">
          {label}
        </span>
        <p className="max-w-xs text-xs text-[var(--text-muted)] line-clamp-2">{alt}</p>
      </div>
    </div>
  )
}
