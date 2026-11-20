"use client"

import { motion } from "framer-motion"
import { SECTION_HEADINGS, SKILLS_CONTENT } from "@/constants"
import { SectionHeading } from "@/components/PortfolioShowcase"
import { SkillIcon } from "@/components/SkillIcon"
import { cn } from "@/lib/utils"

const toneStyles = {
  indigo: {
    ring: "ring-[var(--primary)]/20 dark:ring-[var(--accent)]/20",
  },
  amber: {
    ring: "ring-[var(--accent)]/20",
  },
  emerald: {
    ring: "ring-[var(--primary)]/20 dark:ring-[var(--accent)]/20",
  },
} as const

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-36 sm:scroll-mt-40 px-6 py-16 lg:px-8"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeading
          eyebrow={SECTION_HEADINGS.skills.eyebrow}
          title={SECTION_HEADINGS.skills.title}
          description={SECTION_HEADINGS.skills.description}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS_CONTENT.map((group, index) => {
            const tone = toneStyles[group.tone]

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={cn(
                  "relative rounded-2xl border border-[var(--glass-border)]",
                  "bg-[var(--glass-bg)] p-6 md:rounded-3xl",
                  "[box-shadow:var(--glass-highlight),var(--glass-shadow)]",
                  "backdrop-blur-[var(--glass-blur-mobile)] md:backdrop-blur-[var(--glass-blur)]",
                  "backdrop-saturate-[180%] transition-all duration-300 hover:-translate-y-1",
                  "hover:[box-shadow:var(--glass-highlight),var(--glass-shadow-hover)]",
                  tone.ring
                )}
              >
                <div
                  className={cn(
                    "mb-4 h-1.5 w-10 rounded-full bg-[var(--primary)]",
                    "dark:bg-gradient-to-r dark:from-[var(--primary)]",
                    "dark:to-[var(--accent)]"
                  )}
                />
                <h3 className="text-lg font-bold text-[var(--text)]">
                  {group.category}
                </h3>

                <div className="mt-5 flex flex-wrap gap-2" role="list">
                  {group.items.map((skill) => (
                    <div
                      key={skill.name}
                      role="listitem"
                      tabIndex={0}
                      className={cn(
                        "group inline-flex w-fit items-center gap-2 rounded-full border",
                        "border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5",
                        "whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5",
                        "hover:border-[var(--primary)] focus-visible:outline-none",
                        "focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                        "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
                      )}
                    >
                      <SkillIcon icon={skill.icon} />
                      <span className="whitespace-nowrap text-xs font-medium text-[var(--text)]">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
