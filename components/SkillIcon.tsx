"use client"

import type { ComponentType } from "react"
import {
  Aperture,
  AudioLines,
  ChartNoAxesCombined,
  Clapperboard,
  Component,
  Database,
  Image,
  Lightbulb,
  MonitorSmartphone,
  Network,
  Package,
  PanelsTopLeft,
  Palette,
  SlidersHorizontal,
  Sparkles,
  UsersRound,
  Video,
} from "lucide-react"
import {
  SiDavinciresolve,
  SiFigma,
  SiMysql,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiScikitlearn,
} from "react-icons/si"
import { FaJava } from "react-icons/fa6"
import { cn } from "@/lib/utils"

type IconComponent = ComponentType<{ className?: string }>

interface SkillIconVariant {
  component: IconComponent
  colorClass: string
}

const skillIcons: Record<string, SkillIconVariant> = {
  python: { component: SiPython, colorClass: "text-[var(--primary)]" },
  pandas: { component: SiPandas, colorClass: "text-[var(--accent-deep)]" },
  numpy: { component: SiNumpy, colorClass: "text-[var(--primary)]" },
  "scikit-learn": { component: SiScikitlearn, colorClass: "text-[var(--accent)]" },
  postgresql: { component: SiPostgresql, colorClass: "text-[var(--primary)]" },
  mysql: { component: SiMysql, colorClass: "text-[var(--accent-deep)]" },
  "power-bi": {
    component: ChartNoAxesCombined,
    colorClass: "text-[var(--accent)]",
  },
  tableau: {
    component: ChartNoAxesCombined,
    colorClass: "text-[var(--primary)]",
  },
  "data-cleaning": { component: Database, colorClass: "text-[var(--text-muted)]" },
  figma: { component: SiFigma, colorClass: "text-[var(--accent)]" },
  "design-systems": { component: Component, colorClass: "text-[var(--text-muted)]" },
  wireframing: { component: PanelsTopLeft, colorClass: "text-[var(--text-muted)]" },
  "user-research": { component: UsersRound, colorClass: "text-[var(--text-muted)]" },
  "information-architecture": {
    component: Network,
    colorClass: "text-[var(--text-muted)]",
  },
  "responsive-layouts": {
    component: MonitorSmartphone,
    colorClass: "text-[var(--text-muted)]",
  },
  composition: { component: Aperture, colorClass: "text-[var(--text-muted)]" },
  lighting: { component: Lightbulb, colorClass: "text-[var(--text-muted)]" },
  "editorial-photography": {
    component: Image,
    colorClass: "text-[var(--text-muted)]",
  },
  lightroom: { component: Image, colorClass: "text-[var(--primary)]" },
  "color-correction": {
    component: SlidersHorizontal,
    colorClass: "text-[var(--text-muted)]",
  },
  "product-photography": {
    component: Package,
    colorClass: "text-[var(--text-muted)]",
  },
  storyboarding: { component: Clapperboard, colorClass: "text-[var(--text-muted)]" },
  cinematography: { component: Video, colorClass: "text-[var(--text-muted)]" },
  "premiere-pro": {
    component: Clapperboard,
    colorClass: "text-[var(--accent-deep)]",
  },
  "davinci-resolve": {
    component: SiDavinciresolve,
    colorClass: "text-[var(--primary)]",
  },
  "color-grading": { component: Palette, colorClass: "text-[var(--text-muted)]" },
  "audio-mixing": { component: AudioLines, colorClass: "text-[var(--text-muted)]" },
  java: { component: FaJava, colorClass: "text-[var(--primary)]" },
}

const fallbackIcon: SkillIconVariant = {
  component: Sparkles,
  colorClass: "text-[var(--text-muted)]",
}

export function SkillIcon({ icon }: Readonly<{ icon: string }>) {
  const { component: Icon, colorClass } = skillIcons[icon] ?? fallbackIcon

  return (
    <span className="inline-flex shrink-0 items-center" aria-hidden="true">
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          "group-hover:-translate-y-0.5",
          colorClass
        )}
      />
    </span>
  )
}
