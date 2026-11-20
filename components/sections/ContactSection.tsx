"use client"

import { Mail } from "lucide-react"
import { CONTACT_CONTENT, SECTION_HEADINGS } from "@/constants"
import { GlassCard } from "@/components/GlassCard"
import { MagneticButton } from "@/components/MagneticButton"
import { SectionLabel } from "@/components/SectionLabel"
import { useToast } from "@/components/ToastProvider"
import { cn } from "@/lib/utils"

function ContactDetailCard({
  label,
  value,
}: Readonly<{ label: string; value: string }>) {
  return (
    <GlassCard
      className={cn(
        "rounded-2xl p-4 md:rounded-2xl md:p-4 backdrop-blur-md md:backdrop-blur-md",
        "backdrop-saturate-100",
        "transition-none"
      )}
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-dim)]">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold leading-relaxed text-[var(--text)]">
        {value}
      </div>
    </GlassCard>
  )
}

export function ContactSection() {
  const { showToast } = useToast()

  return (
    <section
      id="contact"
      className="scroll-mt-36 sm:scroll-mt-40 px-6 py-16 lg:px-8 lg:pb-24"
    >
      <GlassCard
        className={cn(
          "rounded-3xl p-8 md:rounded-3xl md:p-8 lg:p-12",
          "transition-none"
        )}
      >
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
                className={cn(
                  "rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-bold",
                  "text-white shadow-[0_10px_25px_rgba(36,87,214,0.3)]",
                  "dark:shadow-[0_10px_25px_rgba(91,140,255,0.35)]",
                  "hover:bg-[var(--primary-hover)]"
                )}
              >
                <Mail className="mr-2 h-4 w-4" /> Salin Email
              </MagneticButton>

              <MagneticButton
                href={CONTACT_CONTENT.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  "rounded-full border border-[var(--border)] bg-[var(--surface)]",
                  "px-6 py-3.5 text-sm font-semibold text-[var(--text)] shadow-xs",
                  "hover:border-[var(--primary)]/40 hover:bg-[var(--surface-2)]"
                )}
              >
                LinkedIn
              </MagneticButton>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ContactDetailCard label="Email" value={CONTACT_CONTENT.email} />
            <ContactDetailCard label="Institusi" value={CONTACT_CONTENT.institution} />
            <ContactDetailCard label="Program Studi" value={CONTACT_CONTENT.major} />
            <ContactDetailCard
              label="Fokus Utama"
              value={CONTACT_CONTENT.focus.join(" · ")}
            />
          </div>
        </div>
      </GlassCard>
    </section>
  )
}
