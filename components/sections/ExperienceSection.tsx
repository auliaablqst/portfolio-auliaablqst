"use client"

import { EXPERIENCE_CONTENT, SECTION_HEADINGS } from "@/constants"
import { ExperienceList, SectionHeading } from "@/components/PortfolioShowcase"

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-36 sm:scroll-mt-40 px-6 py-16 lg:px-8"
    >
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
  )
}
