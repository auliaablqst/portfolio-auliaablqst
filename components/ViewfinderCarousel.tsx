"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { HERO_SLIDES, type HeroSlide } from "@/constants"

function SlideIcon({ iconName }: { iconName: HeroSlide["iconName"] }) {
  const icons: Record<HeroSlide["iconName"], string> = {
    user: "👤",
    data: "📊",
    design: "🎨",
    creative: "📸",
  }
  return <span className="text-4xl">{icons[iconName]}</span>
}

export function ViewfinderCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const touchStartX = useRef<number | null>(null)
  const slides = HERO_SLIDES
  const total = slides.length

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total)
    },
    [total]
  )

  const prev = useCallback(() => goTo(current - 1), [current, goTo])
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  // Autoplay
  useEffect(() => {
    if (shouldReduceMotion || paused) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % total), 4000)
    return () => clearInterval(id)
  }, [shouldReduceMotion, paused, total])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [prev, next])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) {
      if (delta > 0) { next() } else { prev() }
    }
    touchStartX.current = null
  }

  const slide = slides[current]

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]
        [box-shadow:var(--glass-highlight),var(--glass-shadow)]
        backdrop-blur-[var(--glass-blur-mobile)] md:backdrop-blur-[var(--glass-blur)]
        h-[26rem] sm:h-[30rem] w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Hero highlight carousel"
    >
      {/* Viewfinder HUD: corner brackets */}
      <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-[var(--primary)] opacity-80 z-20" />
      <div className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-[var(--primary)] opacity-80 z-20" />
      <div className="pointer-events-none absolute bottom-14 left-3 h-5 w-5 border-b-2 border-l-2 border-[var(--primary)] opacity-80 z-20" />
      <div className="pointer-events-none absolute bottom-14 right-3 h-5 w-5 border-b-2 border-r-2 border-[var(--primary)] opacity-80 z-20" />

      {/* Top HUD */}
      <div className="pointer-events-none absolute inset-x-5 top-4 flex items-center justify-between text-[10px] font-mono font-medium tracking-widest text-[var(--text-muted)] z-20">
        <span className="flex items-center gap-1.5 font-bold text-red-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          REC
        </span>
        <span>4K RAW 60FPS</span>
        <span>ISO 400</span>
      </div>

      {/* Center crosshair */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20 z-20">
        <div className="h-6 w-px bg-[var(--text)]" />
        <div className="absolute h-px w-6 bg-[var(--text)]" />
      </div>

      {/* Bottom HUD */}
      <div className="pointer-events-none absolute inset-x-5 bottom-[3.75rem] flex items-center justify-between text-[9px] font-mono tracking-widest text-[var(--text-dim)] z-20">
        <span>F/2.8 · 1/250s</span>
        <span>AF-C [TRACKING]</span>
        <span>+0.3 EV</span>
      </div>

      {/* Slides */}
      <div className="relative h-full w-full" aria-live="off" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.38, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center"
            aria-label={`Slide ${current + 1} dari ${total}: ${slide.alt}`}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
              <SlideIcon iconName={slide.iconName} />
            </div>
            <div className="space-y-2">
              <span className="inline-block rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--primary)] shadow-xs">
                {slide.tag}
              </span>
              <p className="max-w-[200px] text-xs font-medium text-[var(--text-muted)] leading-relaxed">
                {slide.caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next buttons */}
      <button
        type="button"
        onClick={prev}
        aria-label="Slide sebelumnya"
        className="absolute left-2 top-1/2 z-30 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full
          border border-[var(--glass-border)] bg-[var(--glass-bg-strong)] text-[var(--text)]
          hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Slide berikutnya"
        className="absolute right-2 top-1/2 z-30 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full
          border border-[var(--glass-border)] bg-[var(--glass-bg-strong)] text-[var(--text)]
          hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>

      {/* Dot indicator */}
      <div className="absolute bottom-3 inset-x-0 flex flex-col items-center gap-1.5 z-20">
        <div className="flex gap-1.5" role="tablist" aria-label="Pilih slide">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}: ${s.tag}`}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              style={{
                width: i === current ? "1.5rem" : "0.4rem",
                height: "0.4rem",
                backgroundColor: i === current ? "var(--primary)" : "var(--text-dim)",
                opacity: i === current ? 1 : 0.5,
              }}
            />
          ))}
        </div>
        <span className="text-[9px] font-mono tracking-widest text-[var(--text-dim)]">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  )
}

