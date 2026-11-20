"use client"

import { useRef, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { PROJECTS_CONTENT, SECTION_HEADINGS, type ProjectItem } from "@/constants"
import { GlassCard } from "@/components/GlassCard"
import { PlaceholderImage } from "@/components/PlaceholderImage"
import { SectionHeading } from "@/components/PortfolioShowcase"
import { cn } from "@/lib/utils"

function TiltProjectCard({ project }: Readonly<{ project: ProjectItem }>) {
  const cardRef = useRef<HTMLDivElement>(null)
  const springConfig = { damping: 25, stiffness: 300 }
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, springConfig)
  const rotateY = useSpring(rawRotateY, springConfig)

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = (event.clientX - centerX) / (rect.width / 2)
    const offsetY = (event.clientY - centerY) / (rect.height / 2)

    rawRotateX.set(-offsetY * 4)
    rawRotateY.set(offsetX * 4)
  }

  const handleMouseLeave = () => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[var(--glass-border)]",
        "bg-[var(--glass-bg)] [box-shadow:var(--glass-highlight),var(--glass-shadow)]",
        "backdrop-blur-[var(--glass-blur-mobile)] md:rounded-3xl",
        "md:backdrop-blur-[var(--glass-blur)] backdrop-saturate-[180%]",
        "transition-all duration-300 hover:[box-shadow:var(--glass-highlight),var(--glass-shadow-hover)]"
      )}
    >
      <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div className="space-y-4">
            <div
              className={cn(
                "flex items-center justify-between gap-4 text-xs font-semibold uppercase",
                "tracking-[0.22em] text-[var(--primary)] dark:text-[#7FA3FF]"
              )}
            >
              <span>{project.category}</span>
              <span
                className={cn(
                  "rounded-full border border-[var(--primary)]/20 bg-[var(--primary-soft)]",
                  "px-2.5 py-0.5 text-[10px] font-bold text-[var(--primary)] dark:text-[#7FA3FF]"
                )}
              >
                Featured Case Study
              </span>
            </div>

            <h3 className="text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl text-balance">
              {project.title}
            </h3>

            <p className="max-w-xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className={cn(
                    "rounded-full border border-[var(--border)] bg-[var(--surface-2)]",
                    "dark:bg-[rgba(255,255,255,0.05)] px-3 py-1 text-[11px]",
                    "font-medium text-[var(--text)]"
                  )}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/60",
              "dark:bg-[rgba(255,255,255,0.03)] p-4 text-sm"
            )}
          >
            <span
              className={cn(
                "block text-[10px] font-mono font-bold uppercase tracking-[0.2em]",
                "text-[var(--primary)] dark:text-[var(--accent-soft)]"
              )}
            >
              Impact &amp; Outcome
            </span>
            <span className="mt-1 block font-semibold text-[var(--text)]">
              {project.outcome}
            </span>
          </div>
        </div>

        <div className="relative flex items-center justify-center p-6 lg:p-8">
          <PlaceholderImage
            src={project.image}
            alt={project.title}
            aspectRatio="video"
            label="Interactive Preview"
            iconName="data"
            className="w-full"
          />

          <div
            className={cn(
              "pointer-events-none absolute inset-6 flex items-center justify-center",
              "rounded-2xl bg-[var(--surface)]/90 p-6 text-center opacity-0",
              "backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
            )}
          >
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] dark:text-[#7FA3FF]">
                Lihat Case Study <ExternalLink className="h-3.5 w-3.5" />
              </span>
              <p className="text-xs text-[var(--text-muted)]">{project.role}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MiniTiltProjectCard({ project }: Readonly<{ project: ProjectItem }>) {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className={cn(
        "flex flex-col justify-between rounded-2xl p-6 md:rounded-3xl md:p-6",
        "transition-all duration-300 hover:-translate-y-1",
        "hover:[box-shadow:var(--glass-highlight),var(--glass-shadow-hover)]"
      )}
    >
      <div>
        <div
          className={cn(
            "flex items-center justify-between gap-4 text-xs font-semibold uppercase",
            "tracking-[0.22em] text-[var(--primary)] dark:text-[#7FA3FF]"
          )}
        >
          <span>{project.category}</span>
          <span className="text-[11px] font-medium text-[var(--text-dim)]">
            {project.role}
          </span>
        </div>
        <h3 className="mt-3 text-xl font-bold tracking-tight text-[var(--text)]">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
          {project.description}
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className={cn(
                "rounded-full border border-[var(--border)] bg-[var(--surface-2)]",
                "dark:bg-[rgba(255,255,255,0.05)] px-2.5 py-0.5 text-[11px]",
                "font-medium text-[var(--text)]"
              )}
            >
              {tool}
            </span>
          ))}
        </div>
        <div
          className={cn(
            "rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/60",
            "dark:bg-[rgba(255,255,255,0.03)] px-3.5 py-2 text-xs",
            "text-[var(--text-muted)]"
          )}
        >
          <strong className="font-semibold text-[var(--text)]">Outcome: </strong>
          {project.outcome}
        </div>
      </div>
    </GlassCard>
  )
}

export function ProjectsSection() {
  const featured = PROJECTS_CONTENT[0]
  const supportingProjects = PROJECTS_CONTENT.slice(1, 3)

  return (
    <section
      id="projects"
      className="scroll-mt-36 sm:scroll-mt-40 px-6 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeading
          eyebrow={SECTION_HEADINGS.projects.eyebrow}
          title={SECTION_HEADINGS.projects.title}
          description={SECTION_HEADINGS.projects.description}
        />
        <div className="grid gap-6">
          {featured && <TiltProjectCard project={featured} />}
          <div className="grid gap-6 lg:grid-cols-2">
            {supportingProjects.map((project) => (
              <MiniTiltProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
