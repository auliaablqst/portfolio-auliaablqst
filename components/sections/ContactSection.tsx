"use client"

import type { ComponentType } from "react"
import {
  ArrowUpRight,
  Mail,
} from "lucide-react"
import {
  FaBehance,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6"
import { CONTACT_CONTENT, SECTION_HEADINGS, SOCIAL_LINKS } from "@/constants"
import { GlassCard } from "@/components/GlassCard"
import { MagneticButton } from "@/components/MagneticButton"
import { SectionLabel } from "@/components/SectionLabel"
import { useToast } from "@/components/ToastProvider"
import { cn } from "@/lib/utils"

type SocialKey = keyof typeof SOCIAL_LINKS

interface SocialCard {
  key: SocialKey
  label: string
  Icon: ComponentType<{ className?: string }>
  hoverIconClass: string
}

const socialCards: SocialCard[] = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    Icon: FaWhatsapp,
    hoverIconClass: "group-hover:text-[#25D366]",
  },
  {
    key: "instagram",
    label: "Instagram",
    Icon: FaInstagram,
    hoverIconClass: "group-hover:text-[#E4405F] dark:group-hover:text-[#FF6B9A]",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    Icon: FaLinkedinIn,
    hoverIconClass: "group-hover:text-[#0A66C2] dark:group-hover:text-[#70B7FF]",
  },
  {
    key: "email",
    label: "Email",
    Icon: Mail,
    hoverIconClass: "group-hover:text-[var(--primary)]",
  },
  {
    key: "github",
    label: "GitHub",
    Icon: FaGithub,
    hoverIconClass: "group-hover:text-[#181717] dark:group-hover:text-[#F0F6FC]",
  },
  {
    key: "youtube",
    label: "YouTube",
    Icon: FaYoutube,
    hoverIconClass: "group-hover:text-[#FF0000] dark:group-hover:text-[#FF6666]",
  },
  {
    key: "behance",
    label: "Behance",
    Icon: FaBehance,
    hoverIconClass: "group-hover:text-[#1769FF] dark:group-hover:text-[#78A8FF]",
  },
]

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
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
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
                href={SOCIAL_LINKS.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "rounded-full border border-[var(--border)] bg-[var(--surface)]",
                  "px-6 py-3.5 text-sm font-semibold text-[var(--text)] shadow-xs",
                  "hover:border-[var(--primary)]/40 hover:bg-[var(--surface-2)]"
                )}
              >
                <FaWhatsapp className="mr-2 h-4 w-4" />
                Chat WhatsApp
              </MagneticButton>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {socialCards.map(({ key, label, Icon, hoverIconClass }) => {
              const social = SOCIAL_LINKS[key]

              return (
                <a
                  key={key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label}: ${social.handle}`}
                  className={cn(
                    "group flex min-w-0 items-center justify-between gap-3 rounded-2xl",
                    "border border-[var(--border)] bg-[var(--surface)] p-4",
                    "transition-all duration-200 hover:-translate-y-1",
                    "hover:border-[var(--primary)]/30 hover:shadow-sm",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-[var(--bg)]"
                  )}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon
                      className={cn(
                        "h-5 w-5 shrink-0 text-[var(--text-muted)]",
                        "transition-colors duration-200",
                        hoverIconClass
                      )}
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[var(--text)]">
                        {label}
                      </span>
                      <span className="block truncate text-xs text-[var(--text-muted)]">
                        {social.handle}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "h-4 w-4 shrink-0 text-[var(--text-dim)]",
                      "transition-transform duration-200 group-hover:translate-x-0.5",
                      "group-hover:-translate-y-0.5"
                    )}
                    aria-hidden="true"
                  />
                </a>
              )
            })}
          </div>
        </div>
      </GlassCard>
    </section>
  )
}
