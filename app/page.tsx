"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Mail, MapPin } from "lucide-react"
import { SITE_CONFIG } from "@/constants"
import {
  ExperienceTimeline,
  MetricTile,
  SectionHeading,
  SkillBadgeGrid,
} from "../components/PortfolioShowcase"
import { useToast } from "@/components/ToastProvider"
import { cn } from "@/lib/utils"

type ProjectCard = {
  title: string
  category: string
  year: string
  description: string
  tags: string[]
  accent: "purple" | "teal" | "amber"
  size: "large" | "small"
  highlights: string[]
}

const heroMetrics = [
  { value: "6+", label: "selected projects" },
  { value: "3+", label: "years learning" },
  { value: "4", label: "core disciplines" },
]

const featuredProjects: ProjectCard[] = [
  {
    title: "Customer Segmentation Analysis",
    category: "Data Science",
    year: "2024",
    description:
      "Analisis segmentasi pelanggan untuk menemukan pola pembelian dan mendukung strategi marketing yang lebih presisi.",
    tags: ["Python", "Scikit-learn", "Pandas"],
    accent: "purple",
    size: "large",
    highlights: ["K-Means clustering", "Behavior mapping", "Marketing segmentation"],
  },
  {
    title: "E-Commerce Dashboard",
    category: "Business Intelligence",
    year: "2024",
    description:
      "Dashboard interaktif untuk memantau penjualan, inventory, dan customer behavior dengan tampilan yang clean.",
    tags: ["Power BI", "Analytics", "Reporting"],
    accent: "teal",
    size: "small",
    highlights: ["Live KPI cards", "Revenue trends", "Inventory heatmap"],
  },
  {
    title: "UX Design System",
    category: "Design Systems",
    year: "2023",
    description:
      "System visual yang menjaga konsistensi komponen, spacing, dan hierarchy untuk UI yang terasa premium.",
    tags: ["Figma", "Design Tokens", "UI/UX"],
    accent: "amber",
    size: "small",
    highlights: ["Color tokens", "Reusable patterns", "Responsive layouts"],
  },
]

const experienceItems = [
  {
    period: "2023 - Present",
    role: "Ketua Divisi IT",
    organization: "Himpunan Mahasiswa Sistem Informasi Bisnis",
    summary:
      "Memimpin inisiatif digital, mengatur alur kerja teknis, dan mendukung kebutuhan sistem untuk kegiatan organisasi.",
    highlights: ["Leadership", "Digital Ops", "System Support"],
    tone: "indigo" as const,
  },
  {
    period: "2022 - 2023",
    role: "Anggota Media & IT",
    organization: "UKM Robotika Polinema",
    summary:
      "Berkontribusi pada dokumentasi, pengelolaan aset digital, dan dukungan teknis untuk kegiatan komunitas.",
    highlights: ["Documentation", "Web Support", "Content Production"],
    tone: "amber" as const,
  },
]

const skillGroups = [
  {
    category: "Data Science",
    tone: "indigo" as const,
    items: ["Python", "Pandas", "Scikit-learn", "SQL"],
  },
  {
    category: "Analytics",
    tone: "amber" as const,
    items: ["Power BI", "Tableau", "Dashboards", "Insights"],
  },
  {
    category: "Product Design",
    tone: "emerald" as const,
    items: ["Figma", "Wireframing", "Systems", "Prototyping"],
  },
  {
    category: "Web Development",
    tone: "indigo" as const,
    items: ["Next.js", "TypeScript", "Tailwind", "React"],
  },
]

const screenshotSource = "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"

function ProjectCardBlock({ project }: Readonly<{ project: ProjectCard }>) {
  const accentStyles = {
    purple: "bg-[var(--card-dark)] text-white border-[rgba(255,255,255,0.08)]",
    teal: "bg-[var(--teal-fill)] text-[var(--text)] border-[rgba(29,158,117,0.12)]",
    amber: "bg-[var(--amber-fill)] text-[var(--text)] border-[rgba(127,119,221,0.08)]",
  } as const

  const projectFrameStyles = {
    purple: "bg-[var(--card-dark)] text-white",
    teal: "bg-[var(--teal-fill)] text-[var(--text)]",
    amber: "bg-[var(--amber-fill)] text-[var(--text)]",
  } as const

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      className="rounded-[2rem]"
    >
      <div className={cn("overflow-hidden border", project.size === "large" ? "grid gap-0 lg:grid-cols-[1.15fr_0.85fr]" : "grid gap-0 lg:grid-cols-[0.9fr_1.1fr]", projectFrameStyles[project.accent])}>
        <div className="space-y-5 p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.26em] text-current/60">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <div className="space-y-3">
            <h3 className={project.size === "large" ? "text-3xl font-semibold tracking-tight sm:text-4xl" : "text-2xl font-semibold tracking-tight"}>
              {project.title}
            </h3>
            <p className={cn("max-w-xl text-sm leading-7", project.accent === "purple" ? "text-white/72" : "text-[var(--text-muted)]")}>{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className={cn("rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]", accentStyles[project.accent])}>
                {tag}
              </span>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {project.highlights.map((item) => (
              <div key={item} className={cn("rounded-2xl border px-3 py-3 text-sm", project.accent === "purple" ? "border-white/10 bg-white/5 text-white/80" : "border-[rgba(22,20,31,0.08)] bg-white/55 text-[var(--text)]")}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className={cn("min-h-[18rem] p-5 sm:p-6", project.accent === "purple" ? "bg-[#0f0d18]" : "bg-white")}>
          <div className="flex h-full items-center justify-center rounded-[1.5rem] border border-dashed border-current/10 p-4">
            <div className="w-full max-w-md rounded-[1.5rem] bg-[rgba(255,255,255,0.04)] p-4 shadow-none">
              <div className="space-y-3 rounded-[1.25rem] bg-current/5 p-4">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.26em] text-current/55">
                  <span>Snapshot</span>
                  <span>Preview</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="h-20 rounded-2xl bg-current/10" />
                  <div className="h-20 rounded-2xl bg-current/15" />
                  <div className="h-20 rounded-2xl bg-current/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectMiniCard({ project }: Readonly<{ project: ProjectCard }>) {
  let cardFill = "bg-[var(--purple-fill)]"
  if (project.accent === "teal") {
    cardFill = "bg-[var(--teal-fill)]"
  } else if (project.accent === "amber") {
    cardFill = "bg-[var(--amber-fill)]"
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className={cn("rounded-[1.6rem] border border-[var(--border-soft)] p-5", cardFill)}
    >
      <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.24em] text-[var(--text-muted)]">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-[var(--text)]">{project.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-[var(--border-soft)] bg-white/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text)]">
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

function ContactDetailCard({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-[1.4rem] border border-[var(--border-soft)] bg-white p-4">
      <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">{label}</div>
      <div className="mt-2 text-sm leading-6 text-[var(--text)]">{value}</div>
    </div>
  )
}

export default function Home() {
  const { showToast } = useToast()
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative">
      <div className="fixed left-0 top-0 z-50 h-1 bg-[var(--accent)]" style={{ width: `${scrollProgress}%` }} />

      <section id="hero" className="relative overflow-hidden px-6 pb-16 pt-20 lg:px-8 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,119,221,0.08),transparent_28%),radial-gradient(circle_at_88%_14%,rgba(29,158,117,0.08),transparent_25%)]" />
        <div className="absolute right-8 top-14 h-40 w-40 rounded-full bg-[var(--purple-fill)] blur-3xl" />
        <div className="absolute right-24 top-28 h-28 w-28 rounded-full bg-[var(--teal-fill)] blur-3xl" />
        <div className="absolute left-0 top-28 h-px w-full bg-gradient-to-r from-transparent via-[rgba(127,119,221,0.14)] to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#534ab7] shadow-[0_14px_30px_rgba(22,20,31,0.04)] backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              <span>Data science portfolio</span>
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-[var(--text)] text-balance sm:text-6xl lg:text-7xl">
                <span className="block">Aulia Bilqisty</span>
                <span className="mt-2 block text-[var(--text-muted)]">Data science, BI, and product thinking</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
                Mahasiswa Sistem Informasi Bisnis di Politeknik Negeri Malang yang fokus pada data, product thinking, dan visual storytelling.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--accent),#5f5ad3)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(127,119,221,0.28)] transition-transform hover:-translate-y-0.5">
                Featured projects
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/85 px-6 py-3.5 text-sm font-semibold text-[var(--text)] shadow-[0_14px_30px_rgba(22,20,31,0.04)] backdrop-blur-sm transition-colors hover:border-[var(--accent)]/35">
                Contact
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/80 px-4 py-2 shadow-[0_12px_24px_rgba(22,20,31,0.03)] backdrop-blur-sm">
                <MapPin className="h-4 w-4" /> Malang, Indonesia
              </span>
              <span className="inline-flex items-center rounded-full border border-[var(--border-soft)] bg-white/80 px-4 py-2 shadow-[0_12px_24px_rgba(22,20,31,0.03)] backdrop-blur-sm">SIB · Polinema</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:max-w-3xl">
              {heroMetrics.map((metric) => (
                <MetricTile key={metric.label} metric={metric} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="relative flex justify-center lg:justify-self-end"
          >
            <div className="relative mx-auto w-full max-w-[28rem]">
              <div className="absolute -right-5 -top-6 h-16 w-16 rounded-full bg-[var(--purple-fill)] blur-xl" />
              <div className="absolute -left-6 bottom-10 h-12 w-12 rounded-full bg-[var(--teal-fill)] blur-xl" />
              <div className="overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-white/80 p-3 shadow-[0_30px_80px_rgba(22,20,31,0.08)] backdrop-blur-xl">
                <div className="overflow-hidden rounded-[1.6rem] bg-[linear-gradient(180deg,#16141f_0%,#1a1824_100%)]">
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-white/45">
                    <span>Professional photo</span>
                    <span>Portfolio</span>
                  </div>
                  <img
                    src={screenshotSource}
                    alt="Professional portrait of Aulia Bilqisty"
                    className="h-[28rem] w-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="absolute -bottom-5 left-6 rounded-full border border-[var(--border-soft)] bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[var(--text-muted)] shadow-sm">
                Data Scientist · BI
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeading
            eyebrow="Selected Projects"
            title="Projects are the main focus"
            description="One large featured case study, followed by two smaller supporting projects."
          />
          <div className="grid gap-5">
            <ProjectCardBlock project={featuredProjects[0]} />
            <div className="grid gap-5 lg:grid-cols-2">
              {featuredProjects.slice(1).map((project) => (
                <ProjectMiniCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeading
            eyebrow="Experience"
            title="A compact timeline"
            description="Kept vertical and minimal, with purple dots to keep attention on the content."
          />
          <ExperienceTimeline items={experienceItems} />
        </div>
      </section>

      <section id="skills" className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeading
            eyebrow="Skills"
            title="Core capabilities as color groups"
            description="Four compact cards, each with its own calm color family."
          />
          <SkillBadgeGrid groups={skillGroups} />
        </div>
      </section>

      <section id="contact" className="px-6 py-16 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(246,244,251,0.9)_100%)] p-8 shadow-[0_30px_80px_rgba(22,20,31,0.06)] lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--text-muted)]">Contact</p>
              <h2 className="text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                Open to thoughtful projects and collaborations.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-[var(--text-muted)]">
                If you want a portfolio that feels cleaner, more premium, and recruiter-friendly, this layout now puts the right emphasis on your name, profession, and work.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(SITE_CONFIG.social.email)
                    showToast("Email copied", "success")
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" /> Copy email
                </button>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] px-6 py-3.5 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)]/40"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <ContactDetailCard label="Email" value={SITE_CONFIG.social.email} />
              <ContactDetailCard label="Institution" value={SITE_CONFIG.institution} />
              <ContactDetailCard label="Major" value={SITE_CONFIG.major} />
              <ContactDetailCard label="Focus" value={SITE_CONFIG.focus.join(" · ")} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
