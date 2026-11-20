"use client"

import { SECTION_HEADINGS, SKILLS_CONTENT } from "@/constants"
import { SectionHeading, SkillBadgeGrid } from "@/components/PortfolioShowcase"

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
        <SkillBadgeGrid groups={SKILLS_CONTENT} />
      </div>
    </section>
  )
}
