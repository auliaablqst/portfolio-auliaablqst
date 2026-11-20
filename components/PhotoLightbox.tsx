"use client"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { CREATIVE_CONTENT, type CreativePhoto } from "@/constants"
import { PlaceholderImage } from "@/components/PlaceholderImage"
import { cn } from "@/lib/utils"

const photoShape = {
  landscape: {
    frame: "aspect-[16/10] w-[min(90vw,120vh)] max-h-[75vh]",
    aspectRatio: "video",
  },
  portrait: {
    frame: "aspect-[3/4] w-[min(70vw,56.25vh)] max-h-[75vh]",
    aspectRatio: "portrait",
  },
  square: {
    frame: "aspect-square w-[min(88vw,75vh)] max-h-[75vh]",
    aspectRatio: "square",
  },
} as const

interface PhotoLightboxProps {
  photo: CreativePhoto | null
  layoutId: string | null
  onClose: () => void
  onNavigate: (direction: -1 | 1) => void
  returnFocusTo: HTMLElement | null
}

const photos = CREATIVE_CONTENT.photos

export function PhotoLightbox({
  photo,
  layoutId,
  onClose,
  onNavigate,
  returnFocusTo,
}: Readonly<PhotoLightboxProps>) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const touchStartYRef = useRef<number | null>(null)
  const isOpen = photo !== null
  const photoIndex = photo
    ? Math.max(0, photos.findIndex((item) => item.id === photo.id))
    : 0

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = "hidden"
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        onNavigate(-1)
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        onNavigate(1)
      } else if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable?.length) return

        const first = focusable.item(0)
        const last = focusable.item(focusable.length - 1)
        if (!first || !last) return
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      returnFocusTo?.focus({ preventScroll: true })
    }
  }, [isOpen, onClose, onNavigate, returnFocusTo])

  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {photo && (
        <motion.div
          key="photo-lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={photo.title}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          onTouchStart={(event) => {
            touchStartYRef.current = event.touches[0]?.clientY ?? null
          }}
          onTouchEnd={(event) => {
            const startY = touchStartYRef.current
            const endY = event.changedTouches[0]?.clientY
            touchStartYRef.current = null
            if (startY !== null && endY !== undefined && endY - startY > 80) {
              onClose()
            }
          }}
          className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-[var(--bg)]/90 p-4 backdrop-blur-xl"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className={cn(
              "fixed right-4 top-4 z-[2147483647] grid h-11 w-11 place-items-center rounded-full border",
              "border-[color-mix(in_srgb,var(--text)_24%,transparent)]",
              "bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] text-[var(--text)]",
              "shadow-[var(--glass-highlight),var(--glass-shadow)] backdrop-blur-xl",
              "transition-transform hover:scale-105",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:right-6 sm:top-6"
            )}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div
            aria-live="polite"
            className="fixed left-1/2 top-4 z-[10001] -translate-x-1/2 rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] px-3 py-1 font-mono text-xs text-[var(--text)] shadow-[var(--glass-highlight)] backdrop-blur-md sm:top-6"
          >
            {photoIndex + 1} / {photos.length}
          </div>

          <div
            className="flex max-h-[calc(100dvh-5rem)] w-full flex-col items-center gap-3 sm:gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex w-full items-center justify-center gap-3 sm:contents">
              <button
                type="button"
                onClick={() => onNavigate(-1)}
                aria-label="Foto sebelumnya"
                className={cn(
                  "grid h-11 w-11 shrink-0 place-items-center rounded-full border",
                  "border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] text-[var(--text)]",
                  "shadow-[var(--glass-highlight)] backdrop-blur-md transition-transform hover:scale-105",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:fixed sm:left-6 sm:top-1/2 sm:z-[10002] sm:-translate-y-1/2"
                )}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              {photo && (
                <motion.div
                  key={photo.id}
                  layoutId={layoutId ?? undefined}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  className={cn(
                    "relative mx-auto max-w-[90vw] overflow-hidden rounded-2xl",
                    "max-h-[75vh] shadow-[var(--glass-shadow-hover)]",
                    photoShape[photo.aspect].frame
                  )}
                >
                  <PlaceholderImage
                    src={photo.src}
                    alt={photo.alt}
                    aspectRatio={photoShape[photo.aspect].aspectRatio}
                    label=""
                    iconName="creative"
                    variant="default"
                    className="h-full w-full border-0 bg-transparent p-0 shadow-none"
                  />
                </motion.div>
              )}

              <button
                type="button"
                onClick={() => onNavigate(1)}
                aria-label="Foto berikutnya"
                className={cn(
                  "grid h-11 w-11 shrink-0 place-items-center rounded-full border",
                  "border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] text-[var(--text)]",
                  "shadow-[var(--glass-highlight)] backdrop-blur-md transition-transform hover:scale-105",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:fixed sm:right-6 sm:top-1/2 sm:z-[10002] sm:-translate-y-1/2"
                )}
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="max-w-2xl space-y-1 px-2 text-center">
              <h3 className="text-lg font-semibold text-[var(--text)]">
                {photo.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                {photo.caption}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
