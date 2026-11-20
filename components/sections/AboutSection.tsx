"use client"

import { ABOUT_CONTENT } from "@/constants"
import { SectionLabel } from "@/components/SectionLabel"

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-36 sm:scroll-mt-40 mt-6 px-6 py-20 lg:px-8"
    >
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
  )
}
