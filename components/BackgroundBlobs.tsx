"use client"

/* eslint-disable react-hooks/purity */

import { motion } from "framer-motion"
import { useMemo, useState, useEffect } from "react"

export function BackgroundBlobs() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Generate stars once using useMemo
  const stars = useMemo(() => Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 2,
  })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {isDark ? (
        <>
          {/* Dark mode: Cosmic Orbs and Stars */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7C3AED] rounded-full blur-[80px] opacity-18"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-80 h-80 bg-[#2563EB] rounded-full blur-[80px] opacity-18"
            animate={{
              x: [0, -40, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-[#C4B5FD] rounded-full blur-[80px] opacity-18"
            animate={{
              x: [0, 30, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Twinkling Stars */}
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      ) : (
        <>
          {/* Light mode: Subtle orbs and dot pattern */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ddd6fe] rounded-full blur-[80px] opacity-35"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-80 h-80 bg-[#bfdbfe] rounded-full blur-[80px] opacity-35"
            animate={{
              x: [0, -40, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-[#f3e8ff] rounded-full blur-[80px] opacity-35"
            animate={{
              x: [0, 30, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Subtle radial dot pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.08) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
        </>
      )}
    </div>
  )
}
