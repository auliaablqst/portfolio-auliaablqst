"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type Tone = "indigo" | "amber" | "emerald"

export interface HeroMetric {
  value: string
  label: string
}

export interface ExperienceItem {
  period: string
  role: string
  organization: string
  summary: string
  highlights: string[]
  tone: Tone
}

export interface SkillGroup {
  category: string
  tone: Tone
  items: string[]
}

const toneStyles = {
  indigo: {
    badge:
      "border-[var(--primary)]/20 bg-[var(--primary-soft)] text-[var(--primary)] dark:border-[rgba(167,139,250,0.25)] dark:bg-[rgba(167,139,250,0.12)] dark:text-[var(--accent-soft)] font-semibold",
    dot: "bg-[var(--primary)] dark:bg-[var(--accent)]",
    ring: "ring-[var(--primary)]/20 dark:ring-[var(--accent)]/20",
  },
  amber: {
    badge:
      "border-[var(--accent)]/30 bg-[var(--accent-pale)] text-[var(--text)] dark:border-[rgba(167,139,250,0.25)] dark:bg-[rgba(167,139,250,0.12)] dark:text-[var(--accent-soft)] font-semibold",
    dot: "bg-[var(--accent)]",
    ring: "ring-[var(--accent)]/20",
  },
  emerald: {
    badge:
      "border-[var(--primary)]/20 bg-[var(--primary-soft)] text-[var(--primary)] dark:border-[rgba(167,139,250,0.25)] dark:bg-[rgba(167,139,250,0.12)] dark:text-[var(--accent-soft)] font-semibold",
    dot: "bg-[var(--primary)] dark:bg-[var(--accent-soft)]",
    ring: "ring-[var(--primary)]/20 dark:ring-[var(--accent)]/20",
  },
} satisfies Record<Tone, { badge: string; dot: string; ring: string }>

type SectionHeadingProps = Readonly<{
  number?: string
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
}>

export function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45 }}
      className={cn("space-y-4", align === "center" && "mx-auto max-w-3xl text-center")}
    >
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        {number && (
          <span className="font-mono text-xs font-bold text-[var(--primary)] bg-[var(--primary-soft)] border border-[var(--primary)]/25 dark:border-[var(--accent)]/30 dark:bg-[rgba(167,139,250,0.15)] dark:text-[var(--accent-soft)] px-2.5 py-0.5 rounded-md shadow-2xs">
            {number}
          </span>
        )}
        <span className="h-px w-10 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-transparent" />
        <p className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)] dark:text-[var(--accent-soft)] [box-shadow:var(--glass-highlight),var(--glass-shadow)] backdrop-blur-md">
          {eyebrow}
        </p>
      </div>

      <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] md:text-5xl text-balance">
        {title}
      </h2>

      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg text-balance">
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}

export function MetricTile({ metric }: Readonly<{ metric: HeroMetric }>) {
  return (
    <div className="group relative rounded-2xl md:rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 [box-shadow:var(--glass-highlight),var(--glass-shadow)] backdrop-blur-[var(--glass-blur-mobile)] md:backdrop-blur-[var(--glass-blur)] backdrop-saturate-[180%] transition-all duration-300 hover:-translate-y-1 hover:[box-shadow:var(--glass-highlight),var(--glass-shadow-hover)] dark:hover:shadow-[0_0_25px_rgba(91,140,255,0.2)]">
      <div className="mb-4 h-1.5 w-10 rounded-full bg-[var(--primary)] dark:bg-gradient-to-r dark:from-[var(--primary)] dark:to-[var(--accent)]" />
      <div className="text-3xl font-extrabold tracking-tight text-[var(--primary)] dark:text-[#7FA3FF] md:text-4xl">
        {metric.value}
      </div>
      <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        {metric.label}
      </div>
    </div>
  )
}

export function ExperienceTimeline({ items }: Readonly<{ items: ExperienceItem[] }>) {
  return (
    <div className="relative space-y-8 md:space-y-10">
      <div className="absolute bottom-4 left-5 top-4 w-px bg-[var(--border)] md:left-1/2 md:-translate-x-1/2" />
      {items.map((item, index) => {
        const tone = toneStyles[item.tone]
        const isEven = index % 2 === 0

        return (
          <motion.div
            key={`${item.period}-${item.role}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-start"
          >
            <div className={cn("pl-12 md:pl-0", isEven ? "md:pr-10 md:text-right" : "md:order-3 md:pl-10")}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl md:rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 md:p-7 [box-shadow:var(--glass-highlight),var(--glass-shadow)] backdrop-blur-[var(--glass-blur-mobile)] md:backdrop-blur-[var(--glass-blur)] backdrop-saturate-[180%] transition-all duration-300 hover:[box-shadow:var(--glass-highlight),var(--glass-shadow-hover)] dark:hover:shadow-[0_0_30px_rgba(91,140,255,0.15)]",
                  isEven ? "md:ml-auto" : ""
                )}
              >
                <div className={cn("absolute inset-y-0 left-0 w-1.5", tone.dot)} />
                <div
                  className={cn(
                    "mb-3 inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.2em]",
                    tone.badge
                  )}
                >
                  {item.period}
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[var(--text)]">{item.role}</h3>
                <p className="mt-1 text-sm font-semibold text-[var(--primary)] dark:text-[#7FA3FF] md:text-base">
                  {item.organization}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                  {item.summary}
                </p>
                <div className={cn("mt-5 flex flex-wrap gap-2", isEven ? "md:justify-end" : "")}>
                  {item.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] dark:bg-[rgba(255,255,255,0.04)] px-3 py-1 text-[11px] font-medium tracking-wide text-[var(--text)]"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute left-5 top-7 z-10 md:static md:flex md:justify-center">
              <span
                className={cn(
                  "relative flex h-4 w-4 rounded-full ring-4 ring-[var(--bg)]",
                  tone.dot
                )}
              >
                <span className={cn("absolute inset-0 rounded-full opacity-70", tone.dot)} />
              </span>
            </div>

            <div className="hidden md:block" />
          </motion.div>
        )
      })}
    </div>
  )
}

export function SkillBadgeGrid({ groups }: Readonly<{ groups: SkillGroup[] }>) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((group, index) => {
        const tone = toneStyles[group.tone]

        return (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={cn(
              "relative rounded-2xl md:rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6",
              "[box-shadow:var(--glass-highlight),var(--glass-shadow)]",
              "backdrop-blur-[var(--glass-blur-mobile)] md:backdrop-blur-[var(--glass-blur)] backdrop-saturate-[180%]",
              "transition-all duration-300 hover:-translate-y-1 hover:[box-shadow:var(--glass-highlight),var(--glass-shadow-hover)] dark:hover:shadow-[0_0_30px_rgba(91,140,255,0.18)]",
              tone.ring
            )}
          >
            <div className="mb-4 h-1.5 w-10 rounded-full bg-[var(--primary)] dark:bg-gradient-to-r dark:from-[var(--primary)] dark:to-[var(--accent)]" />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-[var(--text-dim)]">
                  Disiplin 0{index + 1}
                </p>
                <h3 className="mt-1 text-lg font-bold text-[var(--text)]">{group.category}</h3>
              </div>
              <span className={cn("h-3 w-3 rounded-full", tone.dot)} />
            </div>
            {/* Lavender-tinted chips in dark mode */}
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] dark:bg-[rgba(167,139,250,0.12)] dark:border-[rgba(167,139,250,0.25)] dark:text-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--text)] transition-colors hover:border-[var(--primary)]/40"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export function ProjectLink({ href, label }: Readonly<{ href: string; label: string }>) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] dark:text-[#7FA3FF] no-underline transition-colors hover:opacity-85"
    >
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  )
}
