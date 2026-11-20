"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight, Mail, MapPin, Play, ExternalLink } from "lucide-react"
import {
  HERO_CONTENT,
  ABOUT_CONTENT,
  SECTION_HEADINGS,
  PROJECTS_CONTENT,
  EXPERIENCE_CONTENT,
  SKILLS_CONTENT,
  CREATIVE_CONTENT,
  CONTACT_CONTENT,
  ProjectItem,
} from "@/constants"
import {
  ExperienceList,
  MetricTile,
  SectionHeading,
  SkillBadgeGrid,
} from "@/components/PortfolioShowcase"
import { SectionLabel } from "@/components/SectionLabel"
import { useToast } from "@/components/ToastProvider"
import { MagneticButton } from "@/components/MagneticButton"
import { PlaceholderImage } from "@/components/PlaceholderImage"
import { ViewfinderCarousel } from "@/components/ViewfinderCarousel"

// Card dengan efek 3D tilt halus yang merespons posisi mouse
function TiltProjectCard({ project }: Readonly<{ project: ProjectItem }>) {
  const cardRef = useRef<HTMLDivElement>(null)
  const springConfig = { damping: 25, stiffness: 300 }
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, springConfig)
  const rotateY = useSpring(rawRotateY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = (e.clientX - centerX) / (rect.width / 2)
    const offsetY = (e.clientY - centerY) / (rect.height / 2)

    rawRotateX.set(-offsetY * 4) // max 4 deg
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
      className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] [box-shadow:var(--glass-highlight),var(--glass-shadow)] backdrop-blur-[var(--glass-blur-mobile)] md:backdrop-blur-[var(--glass-blur)] backdrop-saturate-[180%] transition-all duration-300 hover:[box-shadow:var(--glass-highlight),var(--glass-shadow-hover)]"
    >
      <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)] dark:text-[#7FA3FF]">
              <span>{project.category}</span>
              <span className="rounded-full border border-[var(--primary)]/20 bg-[var(--primary-soft)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--primary)] dark:text-[#7FA3FF]">
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
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] dark:bg-[rgba(255,255,255,0.05)] px-3 py-1 text-[11px] font-medium text-[var(--text)]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/60 dark:bg-[rgba(255,255,255,0.03)] p-4 text-sm">
            <span className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--primary)] dark:text-[var(--accent-soft)]">
              Impact & Outcome
            </span>
            <span className="mt-1 block font-semibold text-[var(--text)]">{project.outcome}</span>
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

          {/* Hover Detail Overlay */}
          <div className="pointer-events-none absolute inset-6 flex items-center justify-center rounded-2xl bg-[var(--surface)]/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 p-6 text-center">
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
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="group flex flex-col justify-between rounded-2xl md:rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 [box-shadow:var(--glass-highlight),var(--glass-shadow)] backdrop-blur-[var(--glass-blur-mobile)] md:backdrop-blur-[var(--glass-blur)] backdrop-saturate-[180%] transition-all duration-300 hover:-translate-y-1 hover:[box-shadow:var(--glass-highlight),var(--glass-shadow-hover)]"
    >
      <div>
        <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)] dark:text-[#7FA3FF]">
          <span>{project.category}</span>
          <span className="text-[11px] font-medium text-[var(--text-dim)]">{project.role}</span>
        </div>
        <h3 className="mt-3 text-xl font-bold tracking-tight text-[var(--text)]">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{project.description}</p>
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] dark:bg-[rgba(255,255,255,0.05)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text)]"
            >
              {tool}
            </span>
          ))}
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/60 dark:bg-[rgba(255,255,255,0.03)] px-3.5 py-2 text-xs text-[var(--text-muted)]">
          <strong className="font-semibold text-[var(--text)]">Outcome: </strong>
          {project.outcome}
        </div>
      </div>
    </motion.article>
  )
}

function ContactDetailCard({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4 [box-shadow:var(--glass-highlight),var(--glass-shadow)] backdrop-blur-md">
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-dim)]">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold leading-relaxed text-[var(--text)]">{value}</div>
    </div>
  )
}

export default function Home() {
  const { showToast } = useToast()

  const featured = PROJECTS_CONTENT[0]
  const supportingProjects = PROJECTS_CONTENT.slice(1, 3)

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative scroll-mt-32 overflow-hidden px-6 pb-20 pt-28 sm:pt-32 lg:px-8 lg:pt-36"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-7"
          >
            {/* Top Row: Circular Rotating Badge + Status */}
            <div className="flex items-center gap-4">
              {/* Circular Rotating Sticker "Open for work" */}
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
                    <text className="text-[9.5px] font-mono font-bold uppercase tracking-[0.18em] fill-[var(--text-muted)] dark:fill-[var(--accent-soft)]">
                      <textPath href="#circlePath">
                        ★ OPEN FOR WORK ★ OPEN FOR COLLAB
                      </textPath>
                    </text>
                  </svg>
                </motion.div>
                {/* Center dot in soft lavender with gentle glow in dark mode */}
                <span className="h-3 w-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--accent-pale)] dark:shadow-[0_0_12px_var(--accent)]" />
              </div>

              {/* Status pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)] dark:text-[var(--accent-soft)] [box-shadow:var(--glass-highlight),var(--glass-shadow)] backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[var(--primary)] dark:bg-[var(--accent)]" aria-hidden="true" />
                <span>{HERO_CONTENT.badge}</span>
              </div>
            </div>

            {/* Headline with Sans Bold Name + Serif Italic Keyword (Gradient in Dark Mode) */}
            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl text-balance">
                <span className="block">{HERO_CONTENT.name}</span>
                <span className="mt-2 block font-serif italic font-normal text-3xl sm:text-4xl lg:text-5xl text-[var(--primary)] dark:bg-gradient-to-r dark:from-[#5B8CFF] dark:to-[#C4B5FD] dark:bg-clip-text dark:text-transparent">
                  Data Scientist &amp; UI/UX Designer
                </span>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg text-balance">
                {HERO_CONTENT.description}
              </p>
            </div>

            {/* CTAs using MagneticButton */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <MagneticButton
                href={HERO_CONTENT.ctaPrimary.href}
                className="rounded-full bg-[var(--primary)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(36,87,214,0.3)] dark:shadow-[0_10px_25px_rgba(91,140,255,0.35)] hover:bg-[var(--primary-hover)]"
              >
                <span>{HERO_CONTENT.ctaPrimary.label}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>

              <MagneticButton
                href={HERO_CONTENT.ctaSecondary.href}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-7 py-3.5 text-sm font-semibold text-[var(--text)] shadow-xs hover:border-[var(--primary)]/40 hover:bg-[var(--surface-2)]"
              >
                <span>{HERO_CONTENT.ctaSecondary.label}</span>
              </MagneticButton>
            </div>

            {/* Location & Affiliation badges */}
            <div className="flex flex-wrap gap-3 text-sm text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-medium shadow-2xs">
                <MapPin className="h-3.5 w-3.5 text-[var(--primary)] dark:text-[var(--accent-soft)]" /> {HERO_CONTENT.location}
              </span>
              <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-medium shadow-2xs">
                {HERO_CONTENT.affiliation}
              </span>
            </div>

            {/* Metric counters with dominant blue numbers */}
            <div className="grid gap-3 sm:grid-cols-3 lg:max-w-2xl">
              {HERO_CONTENT.metrics.map((metric) => (
                <MetricTile key={metric.label} metric={metric} />
              ))}
            </div>
          </motion.div>

          {/* Hero Visual Card: Viewfinder Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="relative flex w-full justify-center lg:justify-end"
          >
            <div className="relative mx-auto w-full max-w-[28rem]">
              {/* Carousel dalam frame tipis */}
              <div className="group overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-3 [box-shadow:var(--glass-highlight),var(--glass-shadow)] backdrop-blur-[var(--glass-blur-mobile)] md:backdrop-blur-[var(--glass-blur)]">
                <ViewfinderCarousel />
              </div>

              {/* Decorative Data-Viz Widget (Insight Engine) */}
              <div className="absolute -bottom-10 -left-4 sm:-left-8 whitespace-nowrap z-30 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg-strong)] p-3.5 [box-shadow:var(--glass-highlight),var(--glass-shadow)] dark:[box-shadow:var(--glass-highlight),0_12px_28px_rgba(0,0,0,0.65),0_0_20px_rgba(167,139,250,0.15)] backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex items-end gap-1 h-7">
                    <span className="w-1.5 rounded-full bg-[var(--accent)] h-3 animate-pulse" />
                    <span className="w-1.5 rounded-full bg-[var(--accent)] h-6 animate-pulse" style={{ animationDelay: "200ms" }} />
                    <span className="w-1.5 rounded-full bg-[var(--accent-soft)] h-4 animate-pulse" style={{ animationDelay: "400ms" }} />
                    <span className="w-1.5 rounded-full bg-[var(--primary)] h-7 animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 rounded-full bg-[var(--accent)] h-5 animate-pulse" style={{ animationDelay: "300ms" }} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--primary)] dark:text-[var(--accent-soft)]">
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

      <section id="about" className="scroll-mt-36 sm:scroll-mt-40 px-6 py-20 mt-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-[65ch]">
            <SectionLabel label={ABOUT_CONTENT.label} />
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] text-balance sm:text-4xl md:text-5xl">
              {ABOUT_CONTENT.heading}
            </h2>
            <div className="mt-8 space-y-5 text-base leading-8 text-[var(--text-muted)] sm:text-lg">
              <p>{ABOUT_CONTENT.bioLeft}</p>
              <p>{ABOUT_CONTENT.bioRight}</p>
            </div>
            <p className="mt-8 text-sm font-medium tracking-wide text-[var(--text-muted)]">
              {ABOUT_CONTENT.focusAreas.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      {/* Section 02: Projects */}
      <section id="projects" className="scroll-mt-36 sm:scroll-mt-40 px-6 py-20 lg:px-8">
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

      {/* Section 03: Experience */}
      <section id="experience" className="scroll-mt-36 sm:scroll-mt-40 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeading
            eyebrow={SECTION_HEADINGS.experience.eyebrow}
            title={SECTION_HEADINGS.experience.title}
            description={SECTION_HEADINGS.experience.description}
          />
          <ExperienceList
            items={EXPERIENCE_CONTENT.map((item) => ({
              period: item.period,
              role: item.role,
              organization: item.organization,
              summary: item.summary ?? "",
              highlights: item.highlights,
              tools: item.tools,
            }))}
          />
        </div>
      </section>

      {/* Section 04: Skills (4 Groups: Data Science, UI/UX & Design, Fotografi, Videografi) */}
      <section id="skills" className="scroll-mt-36 sm:scroll-mt-40 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeading
            eyebrow={SECTION_HEADINGS.skills.eyebrow}
            title={SECTION_HEADINGS.skills.title}
            description={SECTION_HEADINGS.skills.description}
          />
          <SkillBadgeGrid groups={SKILLS_CONTENT} />
        </div>
      </section>

      {/* Section 05: Creative Works (Polaroid Photo Gallery + Film Strip Video Cards) */}
      <section id="creative" className="scroll-mt-36 sm:scroll-mt-40 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeading
            eyebrow={CREATIVE_CONTENT.eyebrow}
            title={CREATIVE_CONTENT.title}
            description={CREATIVE_CONTENT.description}
          />

          {/* Polaroid Photo Gallery */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-2">
            {CREATIVE_CONTENT.photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 pb-6 shadow-md transition-all duration-300"
              >
                <div className="overflow-hidden rounded-xl bg-[var(--surface-2)] aspect-[4/3] flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-3xl">📸</span>
                  <span className="mt-2 text-xs font-semibold text-[var(--primary)] dark:text-[#7FA3FF]">{photo.category}</span>
                </div>
                <div className="mt-4 px-1">
                  <h4 className="text-sm font-bold text-[var(--text)]">{photo.title}</h4>
                  <p className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Film Strip Video Cards */}
          <div className="grid gap-6 md:grid-cols-2 pt-4">
            {CREATIVE_CONTENT.videos.map((video) => (
              <div
                key={video.id}
                className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] [box-shadow:var(--glass-highlight),var(--glass-shadow)]"
              >
                {/* Film Perforations (Sprocket Holes) Top */}
                <div className="flex justify-between border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-1.5 opacity-60">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <span key={idx} className="h-2 w-3 rounded-xs border border-[var(--border)] bg-[var(--bg)]" />
                  ))}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-mono font-semibold text-[var(--primary)] dark:text-[#7FA3FF]">
                    <span className="flex items-center gap-1.5">
                      <Play className="h-3.5 w-3.5 fill-current" /> {video.role}
                    </span>
                    <span>{video.duration}</span>
                  </div>
                  <h4 className="mt-3 text-lg font-bold text-[var(--text)]">{video.title}</h4>
                  <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">{video.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {video.tools.map((t) => (
                      <span key={t} className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Film Perforations (Sprocket Holes) Bottom */}
                <div className="flex justify-between border-t border-[var(--border)] bg-[var(--surface-2)] px-4 py-1.5 opacity-60">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <span key={idx} className="h-2 w-3 rounded-xs border border-[var(--border)] bg-[var(--bg)]" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 06: Contact */}
      <section id="contact" className="scroll-mt-36 sm:scroll-mt-40 px-6 py-16 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-8 [box-shadow:var(--glass-highlight),var(--glass-shadow)] backdrop-blur-[var(--glass-blur-mobile)] md:backdrop-blur-[var(--glass-blur)] backdrop-saturate-[180%] lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <SectionLabel label={SECTION_HEADINGS.contact.eyebrow} />

              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] md:text-4xl text-balance">
                {SECTION_HEADINGS.contact.title}
              </h2>

              <p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
                {SECTION_HEADINGS.contact.description}
              </p>

              <div className="flex flex-wrap gap-3 pt-3">
                <MagneticButton
                  onClick={() => {
                    navigator.clipboard.writeText(CONTACT_CONTENT.email)
                    showToast("Email berhasil disalin!", "success")
                  }}
                  className="rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(36,87,214,0.3)] dark:shadow-[0_10px_25px_rgba(91,140,255,0.35)] hover:bg-[var(--primary-hover)]"
                >
                  <Mail className="mr-2 h-4 w-4" /> Salin Email
                </MagneticButton>

                <MagneticButton
                  href={CONTACT_CONTENT.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3.5 text-sm font-semibold text-[var(--text)] shadow-xs hover:border-[var(--primary)]/40 hover:bg-[var(--surface-2)]"
                >
                  LinkedIn
                </MagneticButton>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <ContactDetailCard label="Email" value={CONTACT_CONTENT.email} />
              <ContactDetailCard label="Institusi" value={CONTACT_CONTENT.institution} />
              <ContactDetailCard label="Program Studi" value={CONTACT_CONTENT.major} />
              <ContactDetailCard label="Fokus Utama" value={CONTACT_CONTENT.focus.join(" · ")} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
