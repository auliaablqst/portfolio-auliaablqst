"use client"

import { motion } from "framer-motion"
import { ArrowRight, MapPin } from "lucide-react"
import { HERO_CONTENT } from "@/constants"
import { GlassCard } from "@/components/GlassCard"
import { MagneticButton } from "@/components/MagneticButton"
import { MetricTile } from "@/components/PortfolioShowcase"
import { ViewfinderCarousel } from "@/components/ViewfinderCarousel"
import { cn } from "@/lib/utils"

export function HeroSection() {
  return (
    <section
      id="hero"
      className={cn(
        "relative scroll-mt-32 overflow-hidden px-6 pb-20 pt-28 sm:pt-32",
        "lg:px-8 lg:pt-36"
      )}
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="space-y-7"
        >
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text
                    className={cn(
                      "text-[9.5px] font-mono font-bold uppercase tracking-[0.18em]",
                      "fill-[var(--text-muted)] dark:fill-[var(--accent-soft)]"
                    )}
                  >
                    <textPath href="#circlePath">
                      ★ OPEN FOR WORK ★ OPEN FOR COLLAB
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              <span
                className={cn(
                  "h-3 w-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--accent-pale)]",
                  "dark:shadow-[0_0_12px_var(--accent)]"
                )}
              />
            </div>

            <div
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)]",
                "bg-[var(--glass-bg)] px-3.5 py-1.5 text-xs font-semibold uppercase",
                "tracking-[0.2em] text-[var(--primary)] dark:text-[var(--accent-soft)]",
                "[box-shadow:var(--glass-highlight),var(--glass-shadow)] backdrop-blur-md"
              )}
            >
              <span
                className="h-2 w-2 rounded-full bg-[var(--primary)] dark:bg-[var(--accent)]"
                aria-hidden="true"
              />
              <span>{HERO_CONTENT.badge}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h1
              className={cn(
                "max-w-4xl text-4xl font-black tracking-tight text-[var(--text)]",
                "sm:text-5xl lg:text-6xl text-balance"
              )}
            >
              <span className="block">{HERO_CONTENT.name}</span>
              <span
                className={cn(
                  "mt-2 block font-serif italic font-normal text-3xl sm:text-4xl",
                  "lg:text-5xl text-[var(--primary)] dark:bg-gradient-to-r",
                  "dark:from-[#5B8CFF] dark:to-[#C4B5FD] dark:bg-clip-text",
                  "dark:text-transparent"
                )}
              >
                Data Scientist &amp; UI/UX Designer
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg text-balance">
              {HERO_CONTENT.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <MagneticButton
              href={HERO_CONTENT.ctaPrimary.href}
              className={cn(
                "rounded-full bg-[var(--primary)] px-7 py-3.5 text-sm font-bold text-white",
                "shadow-[0_12px_28px_rgba(36,87,214,0.3)]",
                "dark:shadow-[0_10px_25px_rgba(91,140,255,0.35)]",
                "hover:bg-[var(--primary-hover)]"
              )}
            >
              <span>{HERO_CONTENT.ctaPrimary.label}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticButton>

            <MagneticButton
              href={HERO_CONTENT.ctaSecondary.href}
              className={cn(
                "rounded-full border border-[var(--border)] bg-[var(--surface)]",
                "px-7 py-3.5 text-sm font-semibold text-[var(--text)] shadow-xs",
                "hover:border-[var(--primary)]/40 hover:bg-[var(--surface-2)]"
              )}
            >
              <span>{HERO_CONTENT.ctaSecondary.label}</span>
            </MagneticButton>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-[var(--text-muted)]">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-[var(--border)]",
                "bg-[var(--surface)] px-3.5 py-1.5 text-xs font-medium shadow-2xs"
              )}
            >
              <MapPin className="h-3.5 w-3.5 text-[var(--primary)] dark:text-[var(--accent-soft)]" />{" "}
              {HERO_CONTENT.location}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full border border-[var(--border)]",
                "bg-[var(--surface)] px-3.5 py-1.5 text-xs font-medium shadow-2xs"
              )}
            >
              {HERO_CONTENT.affiliation}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:max-w-2xl">
            {HERO_CONTENT.metrics.map((metric) => (
              <MetricTile key={metric.label} metric={metric} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="relative flex w-full justify-center lg:justify-end"
        >
          <div className="relative mx-auto w-full max-w-[28rem]">
            <GlassCard
              className={cn(
                "group overflow-hidden rounded-3xl p-3 md:p-3",
                "transition-none"
              )}
            >
              <ViewfinderCarousel />
            </GlassCard>

            <div
              className={cn(
                "absolute -bottom-10 -left-4 z-30 whitespace-nowrap rounded-2xl",
                "border border-[var(--glass-border)] bg-[var(--glass-bg-strong)] p-3.5",
                "[box-shadow:var(--glass-highlight),var(--glass-shadow)]",
                "dark:[box-shadow:var(--glass-highlight),0_12px_28px_rgba(0,0,0,0.65),0_0_20px_rgba(167,139,250,0.15)]",
                "backdrop-blur-md sm:-left-8"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 items-end gap-1">
                  <span className="h-3 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                  <span
                    className="h-6 w-1.5 animate-pulse rounded-full bg-[var(--accent)]"
                    style={{ animationDelay: "200ms" }}
                  />
                  <span
                    className="h-4 w-1.5 animate-pulse rounded-full bg-[var(--accent-soft)]"
                    style={{ animationDelay: "400ms" }}
                  />
                  <span
                    className="h-7 w-1.5 animate-pulse rounded-full bg-[var(--primary)]"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
                <div>
                  <span
                    className={cn(
                      "block text-[10px] font-mono font-bold uppercase tracking-wider",
                      "text-[var(--primary)] dark:text-[var(--accent-soft)]"
                    )}
                  >
                    Insight Engine
                  </span>
                  <span className="block text-[11px] font-semibold text-[var(--text)]">
                    Data &amp; User Behavior
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
