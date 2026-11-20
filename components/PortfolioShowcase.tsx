"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionLabel } from "@/components/SectionLabel"

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
  tools: string[]
}

export interface SkillGroup {
  category: string
  tone: Tone
  items: string[]
}

const toneStyles = {
  indigo: {
    dot: "bg-[var(--primary)] dark:bg-[var(--accent)]",
    ring: "ring-[var(--primary)]/20 dark:ring-[var(--accent)]/20",
  },
  amber: {
    dot: "bg-[var(--accent)]",
    ring: "ring-[var(--accent)]/20",
  },
  emerald: {
    dot: "bg-[var(--primary)] dark:bg-[var(--accent-soft)]",
    ring: "ring-[var(--primary)]/20 dark:ring-[var(--accent)]/20",
  },
} satisfies Record<Tone, { dot: string; ring: string }>

type SectionHeadingProps = Readonly<{
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
}>

export function SectionHeading({
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
      <SectionLabel label={eyebrow} className={cn("mb-0", align === "center" && "text-center")} />

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

export function ExperienceList({ items }: Readonly<{ items: ExperienceItem[] }>) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="divide-y divide-[var(--border)]">
      {items.map((item, index) => (
        <motion.article
          key={`${item.period}-${item.role}`}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : index * 0.05 }}
          className="group grid gap-2 py-7 opacity-90 transition-opacity duration-300 first:pt-0 last:pb-0 hover:opacity-100 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8"
        >
          <p className="font-mono text-xs text-[var(--text-muted)]">{item.period}</p>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-[var(--text)] transition-transform duration-300 group-hover:translate-x-1">
              {item.role}
            </h3>
            <p className="mt-1 text-sm font-medium text-[var(--primary)]">{item.organization}</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.summary}</p>
            <p className="mt-3 text-xs leading-relaxed text-[var(--text-dim)]">
              {[...item.tools, ...item.highlights].join(" · ")}
            </p>
          </div>
        </motion.article>
      ))}
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
