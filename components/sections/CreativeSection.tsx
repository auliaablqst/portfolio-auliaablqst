"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { CREATIVE_CONTENT } from "@/constants"
import { SectionHeading } from "@/components/PortfolioShowcase"
import { cn } from "@/lib/utils"

export function CreativeSection() {
  return (
    <section
      id="creative"
      className="scroll-mt-36 sm:scroll-mt-40 px-6 py-16 lg:px-8"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeading
          eyebrow={CREATIVE_CONTENT.eyebrow}
          title={CREATIVE_CONTENT.title}
          description={CREATIVE_CONTENT.description}
        />

        <div className="grid gap-6 pt-2 sm:grid-cols-2 lg:grid-cols-4">
          {CREATIVE_CONTENT.photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
              className={cn(
                "group rounded-2xl border border-[var(--border)] bg-[var(--surface)]",
                "p-3 pb-6 shadow-md transition-all duration-300"
              )}
            >
              <div
                className={cn(
                  "flex aspect-[4/3] flex-col items-center justify-center",
                  "overflow-hidden rounded-xl bg-[var(--surface-2)] p-4 text-center"
                )}
              >
                <span className="text-3xl">📸</span>
                <span className="mt-2 text-xs font-semibold text-[var(--primary)] dark:text-[#7FA3FF]">
                  {photo.category}
                </span>
              </div>
              <div className="mt-4 px-1">
                <h4 className="text-sm font-bold text-[var(--text)]">{photo.title}</h4>
                <p className="mt-1 line-clamp-2 text-xs text-[var(--text-muted)]">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 pt-4 md:grid-cols-2">
          {CREATIVE_CONTENT.videos.map((video) => (
            <div
              key={video.id}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-[var(--border)]",
                "bg-[var(--surface)] [box-shadow:var(--glass-highlight),var(--glass-shadow)]"
              )}
            >
              <div className="flex justify-between border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-1.5 opacity-60">
                {Array.from({ length: 8 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-2 w-3 rounded-xs border border-[var(--border)] bg-[var(--bg)]"
                  />
                ))}
              </div>

              <div className="p-6">
                <div
                  className={cn(
                    "flex items-center justify-between text-xs font-mono font-semibold",
                    "text-[var(--primary)] dark:text-[#7FA3FF]"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <Play className="h-3.5 w-3.5 fill-current" /> {video.role}
                  </span>
                  <span>{video.duration}</span>
                </div>
                <h4 className="mt-3 text-lg font-bold text-[var(--text)]">
                  {video.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {video.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {video.tools.map((tool) => (
                    <span
                      key={tool}
                      className={cn(
                        "rounded-full border border-[var(--border)] bg-[var(--surface-2)]",
                        "px-2.5 py-0.5 text-[11px] font-medium text-[var(--text)]"
                      )}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between border-t border-[var(--border)] bg-[var(--surface-2)] px-4 py-1.5 opacity-60">
                {Array.from({ length: 8 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-2 w-3 rounded-xs border border-[var(--border)] bg-[var(--bg)]"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
