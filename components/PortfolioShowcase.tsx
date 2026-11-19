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
    badge: "border-[rgba(127,119,221,0.14)] bg-[var(--purple-fill)] text-[#534ab7]",
    dot: "bg-[var(--accent)]",
    ring: "ring-[rgba(127,119,221,0.12)]",
  },
  amber: {
    badge: "border-[rgba(29,158,117,0.14)] bg-[var(--teal-fill)] text-[#1d7d60]",
    dot: "bg-[var(--accent-2)]",
    ring: "ring-[rgba(29,158,117,0.12)]",
  },
  emerald: {
    badge: "border-[rgba(250,238,218,0.7)] bg-[var(--amber-fill)] text-[#8b6a1a]",
    dot: "bg-[#d9b45a]",
    ring: "ring-[rgba(217,180,90,0.12)]",
  },
} satisfies Record<Tone, { badge: string; dot: string; ring: string }>

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
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45 }}
      className={cn("space-y-4", align === "center" && "mx-auto max-w-3xl text-center")}
    >
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        <span className="h-px w-12 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-transparent" />
        <p className="rounded-full border border-[var(--border-soft)] bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.26em] text-[var(--text-muted)] shadow-[0_10px_24px_rgba(22,20,31,0.03)]">
          {eyebrow}
        </p>
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-7 text-[var(--text-muted)] md:text-lg">
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}

export function MetricTile({ metric }: Readonly<{ metric: HeroMetric }>) {
  return (
    <div className="group rounded-[1.4rem] border border-[var(--border-soft)] bg-white p-5 shadow-[0_16px_45px_rgba(22,20,31,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(22,20,31,0.08)]">
      <div className="mb-4 h-1.5 w-12 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]" />
      <div className="text-2xl font-semibold tracking-tight text-[var(--text)] md:text-3xl">
        {metric.value}
      </div>
      <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
        {metric.label}
      </div>
    </div>
  )
}

export function ExperienceTimeline({ items }: Readonly<{ items: ExperienceItem[] }>) {
  return (
    <div className="relative space-y-8 md:space-y-10">
      <div className="absolute left-5 top-4 bottom-4 w-px bg-[rgba(127,119,221,0.22)] md:left-1/2 md:-translate-x-1/2" />
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
              <div className={cn("relative overflow-hidden rounded-[1.5rem] border border-[var(--border-soft)] bg-white p-6 shadow-[0_16px_45px_rgba(22,20,31,0.04)]", isEven ? "md:ml-auto" : "")}>
                <div className={cn("absolute inset-y-0 left-0 w-1.5", tone.dot)} />
                <div className={cn("mb-3 inline-flex rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em]", tone.badge)}>
                  {item.period}
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-[var(--text)]">{item.role}</h3>
                <p className="mt-2 text-sm font-medium text-[var(--text-muted)] md:text-base">{item.organization}</p>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)] md:text-base">{item.summary}</p>
                <div className={cn("mt-5 flex flex-wrap gap-2", isEven ? "md:justify-end" : "")}>
                  {item.highlights.map((highlight) => (
                    <span key={highlight} className="rounded-full border border-[var(--border-soft)] bg-[var(--bg2)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text)]">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute left-5 top-7 z-10 md:static md:flex md:justify-center">
              <span className={cn("relative flex h-4 w-4 rounded-full ring-4 ring-[var(--bg)]", tone.dot)}>
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
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {groups.map((group, index) => {
        const tone = toneStyles[group.tone]

        return (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={cn("rounded-[1.5rem] border border-[var(--border-soft)] bg-white p-5 shadow-[0_16px_40px_rgba(22,20,31,0.04)]", tone.ring)}
          >
            <div className="mb-4 h-1.5 w-10 rounded-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-transparent" />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--text-muted)]">Skill group</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--text)]">{group.category}</h3>
              </div>
              <span className={cn("h-3 w-3 rounded-full", tone.dot)} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className={cn("rounded-full border px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em]", tone.badge)}>
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
    <Link href={href} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--accent)]">
      {label}
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  )
}
