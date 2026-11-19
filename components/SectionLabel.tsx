"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionLabelProps {
  label: string
  className?: string
}

export function SectionLabel({ label, className }: Readonly<SectionLabelProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("mb-8 flex items-center gap-4", className)}
    >
      <div className="h-px w-10 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]" />
      <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
        {label}
      </span>
    </motion.div>
  )
}