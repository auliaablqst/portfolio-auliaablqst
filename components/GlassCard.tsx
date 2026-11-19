"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-[var(--card-bg)] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6 backdrop-blur-sm",
        hover && "hover:bg-[rgba(255,255,255,0.06)] transition-all duration-300",
        className
      )}
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      transition={{ type: "spring", damping: 15, stiffness: 300 }}
    >
      {children}
    </motion.div>
  )
}