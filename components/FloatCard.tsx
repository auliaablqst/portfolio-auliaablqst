"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface FloatCardProps {
  children: ReactNode
  className?: string
}

export function FloatCard({ children, className }: FloatCardProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}