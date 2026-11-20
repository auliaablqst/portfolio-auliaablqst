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
      viewport={{ once: true, amount: 0.5 }}
      className={cn("mb-4 text-xs font-medium tracking-[0.12em] text-[var(--text-muted)]", className)}
    >
      {label}
    </motion.div>
  )
}