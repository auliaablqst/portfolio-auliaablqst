"use client"

import React, { ReactNode } from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export type GlassCardVariant = "default" | "strong" | "subtle"

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode
  className?: string
  variant?: GlassCardVariant
  hover?: boolean
}

export function GlassCard({
  children,
  className,
  variant = "default",
  hover = false,
  ...motionProps
}: GlassCardProps) {
  const variantClasses: Record<GlassCardVariant, string> = {
    default:
      "bg-[var(--glass-bg)] border-[var(--glass-border)] [box-shadow:var(--glass-highlight),var(--glass-shadow)]",
    strong:
      "bg-[var(--glass-bg-strong)] border-[var(--glass-border-strong)] [box-shadow:var(--glass-highlight),var(--glass-shadow)]",
    subtle:
      "bg-[var(--glass-bg-subtle)] border-[var(--glass-border-subtle)] [box-shadow:var(--glass-highlight),var(--glass-shadow)]",
  }

  return (
    <motion.div
      className={cn(
        "group relative rounded-2xl md:rounded-3xl border p-6 md:p-8",
        "backdrop-blur-[var(--glass-blur-mobile)] md:backdrop-blur-[var(--glass-blur)] backdrop-saturate-[180%]",
        "transition-colors duration-300",
        variantClasses[variant],
        hover &&
          "transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:[box-shadow:var(--glass-highlight),var(--glass-shadow-hover)]",
        className
      )}
      whileHover={
        hover
          ? {
              y: -3,
              transition: { duration: 0.25, ease: "easeOut" },
            }
          : undefined
      }
      {...motionProps}
    >
      {/* Light sheen refraction overlay on hover */}
      {hover && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Content wrapper with isolation for crisp contrast */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
