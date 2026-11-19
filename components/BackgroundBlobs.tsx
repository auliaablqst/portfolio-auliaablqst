"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useSyncExternalStore } from "react"

// 96 deterministic stars generated once at module load (pure render, no Math.random during render)
const DARK_STARS = Array.from({ length: 96 }, (_, i) => {
  const x = (i * 37 + 13) % 100
  const y = (i * 47 + 29) % 100
  const size = i % 3 === 0 ? 2 : 1
  const isLavender = i % 2 === 0
  const color = isLavender ? "#C4B5FD" : "#E0E7FF"
  const delay = (i * 0.12) % 4
  const duration = 2.8 + ((i * 0.18) % 3)
  const isMobileHidden = i >= 48 // Tampilkan 48 bintang di mobile, 96 di desktop
  return { id: i, x, y, size, color, delay, duration, isMobileHidden }
})

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

function subscribeMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {}
  const query = window.matchMedia("(prefers-reduced-motion: reduce)")
  query.addEventListener("change", callback)
  return () => query.removeEventListener("change", callback)
}

function getMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function getServerSnapshot(): boolean {
  return false
}

export function BackgroundBlobs() {
  const isDark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerSnapshot)
  const reducedMotion = useSyncExternalStore(subscribeMotion, getMotionSnapshot, getServerSnapshot)

  // Parallax scroll halus untuk bintang
  const { scrollY } = useScroll()
  const rawParallaxY = useTransform(scrollY, [0, 3000], [0, -90])
  const parallaxY = useSpring(rawParallaxY, { stiffness: 100, damping: 30 })

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {isDark ? (
        <>
          {/* Dark Mode: Deep Ink-Navy Canvas (#05081A) dengan Glow Minimalis (0.12-0.18) */}
          {/* 1. Subtle Lavender Glow Orb */}
          <motion.div
            className="absolute -top-24 left-1/4 h-80 w-80 md:h-[34rem] md:w-[34rem] rounded-full bg-[#A78BFA] opacity-16 blur-[70px] md:blur-[120px]"
            animate={
              reducedMotion
                ? undefined
                : {
                    x: [0, 40, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.04, 1],
                  }
            }
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* 2. Deep Royal Blue Glow Orb */}
          <motion.div
            className="absolute top-1/3 right-6 md:right-1/6 h-72 w-72 md:h-[32rem] md:w-[32rem] rounded-full bg-[#2457D6] opacity-18 blur-[70px] md:blur-[120px]"
            animate={
              reducedMotion
                ? undefined
                : {
                    x: [0, -35, 0],
                    y: [0, 25, 0],
                    scale: [1, 1.05, 1],
                  }
            }
            transition={{
              duration: 29,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* 3. Deep Navy-Violet Accent */}
          <motion.div
            className="absolute -bottom-10 left-1/3 h-80 w-80 md:h-[30rem] md:w-[30rem] rounded-full bg-[#6D4BC3] opacity-14 blur-[70px] md:blur-[120px]"
            animate={
              reducedMotion
                ? undefined
                : {
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.03, 1],
                  }
            }
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Twinkling Starfield dengan Parallax Scroll */}
          <motion.div
            className="absolute inset-0"
            style={{ y: reducedMotion ? 0 : parallaxY }}
          >
            {DARK_STARS.map((star) => (
              <motion.div
                key={star.id}
                className={`absolute rounded-full ${star.isMobileHidden ? "hidden sm:block" : "block"}`}
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  backgroundColor: star.color,
                }}
                animate={
                  reducedMotion
                    ? { opacity: 0.5 }
                    : {
                        opacity: [0.15, 0.9, 0.15],
                        scale: star.size > 1 ? [0.8, 1.25, 0.8] : [0.9, 1.1, 0.9],
                      }
                }
                transition={{
                  duration: star.duration,
                  delay: star.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Bintang Jatuh Tipis (Shooting Star) setiap ~10 detik */}
            {!reducedMotion && (
              <motion.div
                className="absolute h-px w-28 bg-gradient-to-r from-transparent via-[#E0E7FF] to-transparent shadow-[0_0_8px_#C4B5FD]"
                initial={{ x: "-15vw", y: "10vh", opacity: 0, rotate: -25 }}
                animate={{
                  x: ["-15vw", "115vw"],
                  y: ["10vh", "80vh"],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  repeatDelay: 10,
                  ease: "easeOut",
                }}
              />
            )}
          </motion.div>

          {/* Micro Grain Texture */}
          <div
            className="absolute inset-0 opacity-12"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(167, 139, 250, 0.16) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </>
      ) : (
        <>
          {/* Light Mode: Light Blue, Soft Lavender, Pale Lavender Blobs (TETAP SAMA PERSIS) */}
          <motion.div
            className="absolute -top-16 left-1/6 h-80 w-80 md:h-[34rem] md:w-[34rem] rounded-full bg-[#BAE6FD] opacity-55 blur-[60px] md:blur-[100px]"
            animate={
              reducedMotion
                ? undefined
                : {
                    x: [0, 45, 0],
                    y: [0, -35, 0],
                    scale: [1, 1.06, 1],
                  }
            }
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute top-1/3 right-6 md:right-1/6 h-72 w-72 md:h-[30rem] md:w-[30rem] rounded-full bg-[#C4B5FD] opacity-45 blur-[60px] md:blur-[100px]"
            animate={
              reducedMotion
                ? undefined
                : {
                    x: [0, -40, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.05, 1],
                  }
            }
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-10 left-1/4 h-80 w-80 md:h-[32rem] md:w-[32rem] rounded-full bg-[#EDE9FE] opacity-60 blur-[60px] md:blur-[100px]"
            animate={
              reducedMotion
                ? undefined
                : {
                    x: [0, 35, 0],
                    y: [0, -25, 0],
                    scale: [1, 1.04, 1],
                  }
            }
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(36, 87, 214, 0.12) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </>
      )}
    </div>
  )
}
