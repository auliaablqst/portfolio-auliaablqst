"use client"

import { useRef, useEffect, ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  strength?: number
  href?: string
  target?: string
  rel?: string
  type?: "button" | "submit" | "reset"
  ariaLabel?: string
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.25,
  href,
  target,
  rel,
  type = "button",
  ariaLabel,
}: Readonly<MagneticButtonProps>) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 280, damping: 24 })
  const springY = useSpring(y, { stiffness: 280, damping: 24 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY

      x.set(distanceX * strength)
      y.set(distanceY * strength)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [x, y, strength])

  const motionStyle = {
    x: springX,
    y: springY,
  }

  const baseClasses = cn(
    "relative inline-flex items-center justify-center no-underline cursor-pointer select-none transition-all duration-200",
    className
  )

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={baseClasses}
        style={motionStyle}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={baseClasses}
      style={motionStyle}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  )
}
