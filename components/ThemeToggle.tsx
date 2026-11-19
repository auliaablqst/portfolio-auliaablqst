"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useSyncExternalStore } from "react"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {}
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

function getThemeSnapshot(): boolean {
  if (typeof document === "undefined") return false
  return document.documentElement.classList.contains("dark")
}

function getThemeServerSnapshot(): boolean {
  return false // Default is always light mode
}

export function ThemeToggle({ className }: Readonly<ThemeToggleProps>) {
  const isDark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  )

  const toggleTheme = () => {
    const nextDark = !isDark
    if (nextDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
      className={cn(
        "relative flex h-11 w-11 items-center justify-center rounded-full",
        "border border-[var(--glass-border)] bg-[var(--glass-bg)]",
        "[box-shadow:var(--glass-highlight),var(--glass-shadow)]",
        "backdrop-blur-[var(--glass-blur-mobile)] md:backdrop-blur-[var(--glass-blur)]",
        "text-[var(--text)] transition-all duration-300",
        "hover:border-[var(--accent)]/40 hover:bg-[var(--glass-bg-strong)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-4 w-4 text-amber-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-4 w-4 text-[var(--accent)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
