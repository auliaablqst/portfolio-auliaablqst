"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveSection(visible.target.id)
        }
      },
      { threshold: [0.35, 0.5, 0.65] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 bg-transparent px-4 py-3 sm:px-6"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <Link href="#hero" className="inline-flex items-center gap-3 text-[var(--text)]">
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-[var(--accent)] text-[10px] font-medium text-white">
            AB
          </span>
          <span className="text-sm font-medium tracking-[0.08em] text-[var(--text)]">
            Aulia Bilqisty
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[11px] font-normal uppercase tracking-[0.09em] transition-colors",
                  isActive ? "font-medium text-[#534AB7]" : "text-[var(--text-muted)] hover:text-[var(--text)]"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-normal uppercase tracking-[0.09em] text-[var(--text-muted)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
