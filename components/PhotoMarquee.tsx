"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type RefObject,
} from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import type { MotionValue } from "framer-motion"
import type { CreativePhoto } from "@/constants"
import { PlaceholderImage } from "@/components/PlaceholderImage"
import { PhotoLightbox } from "@/components/PhotoLightbox"
import { cn } from "@/lib/utils"

const photoShape = {
  landscape: {
    thumbnail: "aspect-[16/10] w-56 sm:w-64",
    aspectRatio: "video",
  },
  portrait: {
    thumbnail: "aspect-[3/4] w-40 sm:w-48",
    aspectRatio: "portrait",
  },
  square: {
    thumbnail: "aspect-square w-48 sm:w-56",
    aspectRatio: "square",
  },
} as const

interface DockPhotoProps {
  photo: CreativePhoto
  pointerX: MotionValue<number>
  trackX: MotionValue<number>
  enabled: boolean
  duplicate: boolean
  manualScroll: boolean
  registerOriginal: (
    id: string,
    button: HTMLButtonElement | null
  ) => void
  onSelect: (
    photo: CreativePhoto,
    button: HTMLButtonElement,
    duplicate: boolean
  ) => void
}

function DockPhoto({
  photo,
  pointerX,
  trackX,
  enabled,
  duplicate,
  manualScroll,
  registerOriginal,
  onSelect,
}: Readonly<DockPhotoProps>) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const baseCenterX = useMotionValue(0)
  const distance = useTransform(() => {
    if (!enabled) return Number.POSITIVE_INFINITY
    return Math.abs(
      pointerX.get() - baseCenterX.get() - trackX.get()
    )
  })
  const scale = useTransform(distance, [0, 110, 220], [1.18, 1.08, 1])
  const springScale = useSpring(scale, { stiffness: 280, damping: 24 })

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const updateCenter = () => {
      const rect = button.getBoundingClientRect()
      baseCenterX.set(rect.left + rect.width / 2 - trackX.get())
    }

    updateCenter()
    const resizeObserver = new ResizeObserver(updateCenter)
    resizeObserver.observe(button)
    window.addEventListener("resize", updateCenter)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateCenter)
    }
  }, [baseCenterX, trackX])

  return (
    <motion.button
      ref={(button) => {
        buttonRef.current = button
        if (!duplicate) registerOriginal(photo.id, button)
      }}
      type="button"
      layoutId={`creative-photo-${photo.id}-${duplicate ? "copy" : "main"}`}
      onClick={(event) => onSelect(photo, event.currentTarget, duplicate)}
      aria-label={`Buka foto: ${photo.title}`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : 0}
      style={{ scale: springScale }}
      className={cn(
        "origin-bottom shrink-0 overflow-hidden rounded-2xl border-0 p-0",
        "bg-transparent shadow-[var(--glass-shadow)]",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[var(--bg)]",
        manualScroll && "snap-center",
        photoShape[photo.aspect].thumbnail
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
    </motion.button>
  )
}

interface PhotoGroupProps {
  photos: CreativePhoto[]
  duplicate: boolean
  pointerX: MotionValue<number>
  trackX: MotionValue<number>
  dockEnabled: boolean
  manualScroll: boolean
  registerOriginal: (
    id: string,
    button: HTMLButtonElement | null
  ) => void
  groupRef?: RefObject<HTMLDivElement | null>
  onSelect: (
    photo: CreativePhoto,
    button: HTMLButtonElement,
    duplicate: boolean
  ) => void
}

function PhotoGroup({
  photos,
  duplicate,
  pointerX,
  trackX,
  dockEnabled,
  manualScroll,
  registerOriginal,
  groupRef,
  onSelect,
}: Readonly<PhotoGroupProps>) {
  return (
    <div
      ref={groupRef}
      aria-hidden={duplicate || undefined}
      className="flex w-max shrink-0 items-center gap-4 pr-4"
    >
      {photos.map((photo) => (
        <DockPhoto
          key={`${photo.id}-${duplicate ? "duplicate" : "original"}`}
          photo={photo}
          pointerX={pointerX}
          trackX={trackX}
          enabled={dockEnabled}
          duplicate={duplicate}
          manualScroll={manualScroll}
          registerOriginal={registerOriginal}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

export function PhotoMarquee({
  photos,
}: Readonly<{ photos: CreativePhoto[] }>) {
  const prefersReducedMotion = useReducedMotion()
  const trackX = useMotionValue(0)
  const pointerX = useMotionValue(-10000)
  const groupRef = useRef<HTMLDivElement>(null)
  const originalPhotoButtonsRef = useRef(new Map<string, HTMLButtonElement>())
  const [loopWidth, setLoopWidth] = useState(0)
  const [hasFinePointer, setHasFinePointer] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)
  const [activeLayoutSuffix, setActiveLayoutSuffix] =
    useState<"copy" | "main">("main")
  const [returnFocusTo, setReturnFocusTo] = useState<HTMLElement | null>(null)
  const manualScroll = prefersReducedMotion === true
  const dockEnabled = hasFinePointer && !manualScroll
  const isPaused =
    isHovered ||
    isFocused ||
    isTouching ||
    activePhotoIndex !== null ||
    manualScroll
  const activePhoto =
    activePhotoIndex === null ? null : photos[activePhotoIndex] ?? null
  const activeLayoutId = activePhoto
    ? `creative-photo-${activePhoto.id}-${activeLayoutSuffix}`
    : null

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)")
    const updatePointer = () => setHasFinePointer(pointerQuery.matches)
    updatePointer()
    pointerQuery.addEventListener("change", updatePointer)
    return () => pointerQuery.removeEventListener("change", updatePointer)
  }, [])

  useEffect(() => {
    const group = groupRef.current
    if (!group) return

    const measure = () => setLoopWidth(group.getBoundingClientRect().width)
    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(group)
    return () => resizeObserver.disconnect()
  }, [photos.length])

  useEffect(() => {
    if (manualScroll) {
      trackX.set(0)
      pointerX.set(-10000)
    }
  }, [manualScroll, pointerX, trackX])

  useAnimationFrame((_time, delta) => {
    if (isPaused || loopWidth <= 0) return

    const offset = -trackX.get() + (delta * loopWidth) / 40000
    trackX.set(-(offset % loopWidth))
  })

  const handleSelect = useCallback(
    (photo: CreativePhoto, button: HTMLButtonElement, duplicate: boolean) => {
      const photoIndex = photos.findIndex((item) => item.id === photo.id)
      if (photoIndex < 0) return
      setActiveLayoutSuffix(duplicate ? "copy" : "main")
      setReturnFocusTo(
        duplicate
          ? originalPhotoButtonsRef.current.get(photo.id) ?? button
          : button
      )
      setActivePhotoIndex(photoIndex)
    },
    [photos]
  )

  const registerOriginalPhoto = useCallback(
    (id: string, button: HTMLButtonElement | null) => {
      if (button) {
        originalPhotoButtonsRef.current.set(id, button)
      } else {
        originalPhotoButtonsRef.current.delete(id)
      }
    },
    []
  )

  const handleClose = useCallback(() => {
    setActivePhotoIndex(null)
  }, [])

  const handleNavigate = useCallback(
    (direction: -1 | 1) => {
      setActivePhotoIndex((current) => {
        if (current === null || photos.length === 0) return current
        return (current + direction + photos.length) % photos.length
      })
    },
    [photos.length]
  )

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget
    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setIsFocused(false)
    }
  }

  return (
    <>
      <div
        className={cn(
          "relative -mx-6 max-w-[calc(100%+3rem)] px-6 py-6",
          manualScroll
            ? "overflow-x-auto overscroll-x-contain snap-x snap-mandatory"
            : "overflow-hidden"
        )}
        style={{ scrollbarWidth: "none" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          pointerX.set(-10000)
        }}
        onPointerMove={(event) => {
          if (dockEnabled) pointerX.set(event.clientX)
        }}
        onPointerLeave={() => pointerX.set(-10000)}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={handleBlur}
        onTouchStart={() => setIsTouching(true)}
        onTouchEnd={() => setIsTouching(false)}
        onTouchCancel={() => setIsTouching(false)}
      >
        <motion.div
          style={{ x: trackX }}
          className="flex w-max items-center"
        >
          <PhotoGroup
            groupRef={groupRef}
            photos={photos}
            duplicate={false}
            pointerX={pointerX}
            trackX={trackX}
            dockEnabled={dockEnabled}
            manualScroll={manualScroll}
            registerOriginal={registerOriginalPhoto}
            onSelect={handleSelect}
          />
          {!manualScroll && (
            <PhotoGroup
              photos={photos}
              duplicate
              pointerX={pointerX}
              trackX={trackX}
              dockEnabled={dockEnabled}
              manualScroll={manualScroll}
              registerOriginal={registerOriginalPhoto}
              onSelect={handleSelect}
            />
          )}
        </motion.div>
      </div>

      <PhotoLightbox
        photo={activePhoto}
        layoutId={activeLayoutId}
        onClose={handleClose}
        onNavigate={handleNavigate}
        returnFocusTo={returnFocusTo}
      />
    </>
  )
}
