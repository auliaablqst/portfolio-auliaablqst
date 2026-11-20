"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { CreativePhoto } from "@/constants"
import { PlaceholderImage } from "@/components/PlaceholderImage"
import { cn } from "@/lib/utils"

const photoShape = {
  landscape: {
    frame: "aspect-[16/10] w-[min(90vw,90vh)]",
    aspectRatio: "video",
  },
  portrait: {
    frame: "aspect-[3/4] w-[min(70vw,51vh)]",
    aspectRatio: "portrait",
  },
  square: {
    frame: "aspect-square w-[min(88vw,68vh)]",
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

export function PhotoLightbox({
  photo,
  layoutId,
  onClose,
  onNavigate,
  returnFocusTo,
}: Readonly<PhotoLightboxProps>) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const isOpen = photo !== null

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

  return (
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)]/90 p-4 backdrop-blur-xl"
        >
          <div
            className="relative flex w-full flex-col items-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Tutup foto"
              className={cn(
                "absolute -right-1 -top-12 z-10 rounded-full border",
                "border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text)]",
                "transition-colors hover:bg-[var(--surface-2)]",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
                "focus-visible:ring-offset-[var(--bg)] sm:-right-12 sm:top-0"
              )}
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              key={photo.id}
              layoutId={layoutId ?? undefined}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className={cn(
                "relative mx-auto overflow-hidden rounded-2xl",
                "shadow-[var(--glass-shadow-hover)]",
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

            <div className="max-w-2xl space-y-1 text-center">
              <h3 className="text-lg font-semibold text-[var(--text)]">
                {photo.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                {photo.caption}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate(-1)}
              aria-label="Foto sebelumnya"
              className={cn(
                "absolute left-0 top-1/2 rounded-full border",
                "border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text)]",
                "transition-colors hover:bg-[var(--surface-2)]",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
                "focus-visible:ring-offset-[var(--bg)] sm:left-4"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate(1)}
              aria-label="Foto berikutnya"
              className={cn(
                "absolute right-0 top-1/2 rounded-full border",
                "border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text)]",
                "transition-colors hover:bg-[var(--surface-2)]",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
                "focus-visible:ring-offset-[var(--bg)] sm:right-4"
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
