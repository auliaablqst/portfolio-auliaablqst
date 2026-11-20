"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { SITE_CONFIG } from "@/constants"
import { ThemeToggle } from "@/components/ThemeToggle"

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#creative", label: "Creative" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  // Scroll detection to adapt navbar width (scrollY < 40px vs >= 40px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 40)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Section observer to highlight active item
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
      { threshold: [0.2, 0.45, 0.7] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Close mobile drawer on Escape key or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false)
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileMenuOpen])

  return (
    <header className="fixed inset-x-0 top-3 sm:top-5 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div
        ref={navRef}
        layout
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className={cn(
          "pointer-events-auto relative mx-auto flex flex-col items-center transition-all duration-300",
          isScrolled
            ? "w-full max-w-[640px]"
            : "w-full max-w-[1100px]"
        )}
      >
        {/* Floating Liquid Glass Pill */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className={cn(
            "flex w-full items-center justify-between rounded-full border",
            "border-[var(--glass-border)] bg-[var(--glass-bg)]",
            "[box-shadow:var(--glass-highlight),var(--glass-shadow)]",
            "dark:[box-shadow:var(--glass-highlight),0_12px_36px_rgba(0,0,0,0.7),0_0_24px_rgba(91,140,255,0.08)]",
            "backdrop-blur-[var(--glass-blur-mobile)] md:backdrop-blur-[var(--glass-blur)] backdrop-saturate-[180%]",
            "transition-all duration-300",
            isScrolled
              ? "px-3 py-1.5 sm:px-4 sm:py-2"
              : "px-4 py-2 sm:px-6 sm:py-2.5"
          )}
        >
          {/* Logo / Initials (Left) */}
          <Link
            href="#hero"
            className="group flex min-h-[38px] items-center rounded-full pr-1 text-[var(--text)] no-underline transition-transform hover:scale-[1.02] focus-visible:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary)] text-[11px] font-bold text-white shadow-sm">
              {SITE_CONFIG.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("") || "AB"}
            </span>
            <motion.span
              initial={false}
              animate={{
                width: isScrolled ? 0 : "auto",
                marginLeft: isScrolled ? 0 : 10,
                opacity: isScrolled ? 0 : 1,
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="inline-block overflow-hidden whitespace-nowrap text-xs font-bold tracking-tight text-[var(--text)] no-underline"
            >
              {SITE_CONFIG.name}
            </motion.span>
          </Link>

          {/* Desktop Nav Items (Center, Spacing adapts to scroll) */}
          <nav
            className={cn(
              "hidden items-center md:flex transition-all duration-300",
              isScrolled ? "gap-0.5 sm:gap-1" : "gap-1.5 sm:gap-2.5"
            )}
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex min-h-[32px] items-center rounded-full text-[11px] sm:text-xs font-medium tracking-wide no-underline transition-colors duration-200",
                    isScrolled ? "px-2.5 sm:px-3 py-1" : "px-3.5 py-1.5",
                    isActive
                      ? "text-[var(--primary)] font-semibold"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--primary-soft)] border border-[var(--primary)]/25 shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Actions: Theme Toggle & Mobile Menu (Right) */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle className="h-8 w-8 sm:h-9 sm:w-9" />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)]",
                "[box-shadow:var(--glass-highlight),var(--glass-shadow)]",
                "text-[var(--text)] transition-all md:hidden",
                "hover:bg-[var(--glass-bg-strong)] focus-visible:outline-none"
              )}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Drawer (Liquid Glass Dropdown) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "mt-2 w-full overflow-hidden rounded-2xl border border-[var(--glass-border-strong)]",
                "bg-[var(--glass-bg-strong)] dark:bg-[var(--bg-elevated)]/95 [box-shadow:var(--glass-highlight),0_20px_45px_-10px_rgba(0,0,0,0.5)]",
                "backdrop-blur-[var(--glass-blur)] backdrop-saturate-[180%] p-2 md:hidden"
              )}
            >
              <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.slice(1)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex min-h-[44px] items-center justify-between rounded-xl px-4 py-2 text-xs font-medium no-underline transition-colors",
                        isActive
                          ? "bg-[var(--primary-soft)] text-[var(--primary)] font-semibold"
                          : "text-[var(--text)] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />}
                    </Link>
                  )
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
