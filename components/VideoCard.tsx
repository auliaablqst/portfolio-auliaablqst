"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Play, X } from "lucide-react"
import type { CreativeVideo } from "@/constants"
import { cn } from "@/lib/utils"

interface VideoCardProps {
  video: CreativeVideo
}

function getEmbedUrl(rawUrl: string): string | null {
  if (!rawUrl || /(?:VIDEO_ID|placeholder|example\.com)/i.test(rawUrl)) {
    return null
  }

  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    return null
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") return null

  const host = url.hostname.toLowerCase()
  if (
    host === "youtube.com" ||
    host === "www.youtube.com" ||
    host === "m.youtube.com"
  ) {
    const videoId =
      url.pathname.startsWith("/embed/")
        ? url.pathname.split("/")[2]
        : url.searchParams.get("v")
    return videoId
      ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1`
      : null
  }

  if (host === "youtu.be") {
    const videoId = url.pathname.split("/").filter(Boolean)[0]
    return videoId
      ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1`
      : null
  }

  if (host === "vimeo.com" || host === "www.vimeo.com") {
    const videoId = url.pathname.split("/").filter(Boolean)[0]
    return videoId && /^\d+$/.test(videoId)
      ? `https://player.vimeo.com/video/${videoId}?autoplay=1`
      : null
  }

  if (host === "player.vimeo.com") {
    const videoId = url.pathname.match(/^\/video\/(\d+)/)?.[1]
    return videoId
      ? `https://player.vimeo.com/video/${videoId}?autoplay=1`
      : null
  }

  return null
}

export function VideoCard({ video }: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const embedUrl = getEmbedUrl(video.url)

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const trigger = triggerRef.current
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close()
        return
      }

      if (event.key !== "Tab") return
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]):not([tabindex="-1"]), iframe, a[href], [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable?.length) {
        event.preventDefault()
        dialogRef.current?.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
      trigger?.focus()
    }
  }, [close, isOpen])

  const handlePlay = () => {
    if (embedUrl) {
      setIsOpen(true)
      return
    }

    window.open(video.url || "about:blank", "_blank", "noopener,noreferrer")
  }

  return (
    <>
      <article className="border-b border-[var(--border)] pb-7">
        <div className="group relative isolate aspect-video overflow-hidden rounded-2xl border border-[var(--border)]">
          <div
            className={cn(
              "absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,color-mix(in_srgb,var(--primary)_55%,transparent),transparent_58%),linear-gradient(135deg,color-mix(in_srgb,var(--text)_94%,var(--primary)_6%),color-mix(in_srgb,var(--text)_68%,var(--primary)_32%))]",
              "dark:bg-[radial-gradient(ellipse_at_75%_25%,color-mix(in_srgb,var(--primary)_55%,transparent),transparent_58%),linear-gradient(135deg,color-mix(in_srgb,var(--bg)_90%,var(--primary)_10%),color-mix(in_srgb,var(--bg)_62%,var(--primary)_38%))]",
              "transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            )}
          >
            {video.poster && (
              <div
                role="img"
                aria-label={`${video.title} poster`}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url("${video.poster}")` }}
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(color-mix(in srgb, var(--text-muted) 70%, transparent) 0.5px, transparent 0.8px)",
                backgroundSize: "4px 4px",
              }}
            />
          </div>

          <span className="absolute left-4 top-4 rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] px-3 py-1 text-[11px] font-medium text-[var(--text)] shadow-[var(--glass-highlight)] backdrop-blur-md">
            {video.role}
          </span>

          <button
            ref={triggerRef}
            type="button"
            onClick={handlePlay}
            aria-label={`Putar video: ${video.title}`}
            className={cn(
              "absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center",
              "rounded-full border border-[color-mix(in_srgb,var(--text)_24%,transparent)]",
              "bg-[color-mix(in_srgb,var(--surface)_52%,transparent)] text-[var(--text)]",
              "shadow-[var(--glass-highlight),var(--glass-shadow)] backdrop-blur-xl",
              "transition-transform duration-300 group-hover:scale-105 hover:scale-110",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            )}
          >
            <Play className="ml-1 h-6 w-6 fill-current" aria-hidden="true" />
          </button>

          <span className="absolute bottom-4 right-4 rounded-md border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] px-2 py-1 font-mono text-xs font-medium text-[var(--text)] shadow-[var(--glass-highlight)] backdrop-blur-md">
            {video.duration}
          </span>
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-bold text-[var(--text)]">{video.title}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-[var(--text-muted)]">
            {video.description}
          </p>
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            {video.tools.join(" · ")}
          </p>
        </div>
      </article>

      {isOpen && embedUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Tutup pemutar video"
            onClick={close}
            className="absolute inset-0 bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-md"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`video-${video.id}-title`}
            tabIndex={-1}
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--glass-highlight),var(--glass-shadow)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-4 py-3">
              <h2
                id={`video-${video.id}-title`}
                className="min-w-0 truncate font-semibold text-[var(--text)]"
              >
                {video.title}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Tutup video"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="aspect-video bg-[var(--bg)]">
              <iframe
                src={embedUrl}
                title={video.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
