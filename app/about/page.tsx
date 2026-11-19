"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/GlassCard"
import { ABOUT_CONTENT } from "@/constants"

export default function About() {
  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-8 text-center text-balance"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, type: "spring", damping: 12 }}
        >
          {ABOUT_CONTENT.title}
        </motion.h1>

        <GlassCard className="mb-12">
          <p className="text-lg text-white/90 leading-relaxed text-balance">
            {ABOUT_CONTENT.journey}
          </p>
        </GlassCard>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Core Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ABOUT_CONTENT.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <GlassCard className="text-center">
                  <span className="text-white/90 font-medium">{skill}</span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}