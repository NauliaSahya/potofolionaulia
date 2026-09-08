import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Play,
  Pause,
  Lock,
  ExternalLink,
  X,
  Shield,
  Stethoscope,
  UserCheck,
} from 'lucide-react'
import { sirj } from '@/data/projects'

const portalIcons = {
  admin: Shield,
  dokter: Stethoscope,
  pasien: UserCheck,
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 300, damping: 32 },
      opacity: { duration: 0.35 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: {
      x: { type: 'spring' as const, stiffness: 300, damping: 32 },
      opacity: { duration: 0.25 },
    },
  }),
}

export function SIRJWebShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const portals = sirj.portals
  const activePortal = portals[currentIndex]
  const IconComponent = portalIcons[activePortal.id as keyof typeof portalIcons] ?? Shield

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection)
      setCurrentIndex((prevIndex) => {
        let next = prevIndex + newDirection
        if (next < 0) next = portals.length - 1
        if (next >= portals.length) next = 0
        return next
      })
      setZoomLevel(1)
      setPanOffset({ x: 0, y: 0 })
    },
    [portals.length]
  )

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
  }, [currentIndex])

  // Auto-play timer (cycles every 6s when not paused, not hovered, and modal closed)
  useEffect(() => {
    if (!isPlaying || isHovered || isModalOpen) return

    const timer = setInterval(() => {
      paginate(1)
    }, 6000)

    return () => clearInterval(timer)
  }, [isPlaying, isHovered, isModalOpen, paginate])

  // Keyboard navigation when modal is open
  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
        setZoomLevel(1)
        setPanOffset({ x: 0, y: 0 })
      } else if (e.key === 'ArrowRight') {
        paginate(1)
      } else if (e.key === 'ArrowLeft') {
        paginate(-1)
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((prev) => Math.min(prev + 0.5, 3))
      } else if (e.key === '-') {
        setZoomLevel((prev) => Math.max(prev - 0.5, 1))
      } else if (e.key === '0') {
        setZoomLevel(1)
        setPanOffset({ x: 0, y: 0 })
      }
    }

    // Lock body scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen, paginate])

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev > 1 ? 1 : 1.75))
    setPanOffset({ x: 0, y: 0 })
  }

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3))
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1))
  const resetZoom = () => {
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
  }

  // Pan / Drag handling in lightbox
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return
    setIsDragging(true)
    dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="w-full">
      {/* ------------------------------------------------------------- */}
      {/* Slide Selection Tabs & Controls                               */}
      {/* ------------------------------------------------------------- */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Portal Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3" role="tablist" aria-label="SIRJ Web Portals">
          {portals.map((portal, idx) => {
            const isActive = idx === currentIndex
            const TabIcon = portalIcons[portal.id as keyof typeof portalIcons] ?? Shield
            return (
              <button
                key={portal.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => goToSlide(idx)}
                className={`relative flex items-center gap-2.5 rounded-md border px-4 py-2.5 text-xs font-medium transition-all duration-300 md:text-sm ${
                  isActive
                    ? 'border-[var(--color-cyan)] bg-[var(--color-surface-raised)] text-[var(--color-paper)] shadow-[0_0_20px_-5px_rgba(79,214,224,0.3)]'
                    : 'border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-paper-dim)] hover:border-[var(--color-line)] hover:text-[var(--color-paper)]'
                }`}
              >
                <TabIcon
                  size={15}
                  className={`transition-colors duration-300 ${
                    isActive ? 'text-[var(--color-cyan)]' : 'text-[var(--color-paper-dim)]'
                  }`}
                />
                <span>{portal.name}</span>
                <span
                  className={`hidden rounded px-1.5 py-0.5 text-[10px] font-mono tracking-wider sm:inline-block ${
                    isActive
                      ? 'bg-[var(--color-cyan)]/15 text-[var(--color-cyan)]'
                      : 'bg-white/5 text-[var(--color-paper-dim)]'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Animated active timer bar */}
                {isActive && isPlaying && !isHovered && !isModalOpen && (
                  <span
                    key={`progress-${currentIndex}`}
                    className="absolute bottom-0 left-0 h-[2px] rounded-full bg-[var(--color-cyan)]"
                    style={{
                      animation: 'progressFill 6000ms linear forwards',
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Action Controls: Auto-Play toggle & Slide Counter */}
        <div className="flex items-center gap-3 self-end text-xs sm:self-auto">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause auto-rotation' : 'Resume auto-rotation'}
            className="flex items-center gap-1.5 rounded-sm border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1.5 text-xs text-[var(--color-paper-dim)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-paper)]"
          >
            {isPlaying ? (
              <>
                <Pause size={12} className="text-[var(--color-cyan)]" />
                <span className="hidden sm:inline">Auto-rotate</span>
              </>
            ) : (
              <>
                <Play size={12} className="text-[var(--color-paper-dim)]" />
                <span className="hidden sm:inline">Paused</span>
              </>
            )}
          </button>

          <span className="font-mono text-xs text-[var(--color-paper-dim)]">
            <span className="text-[var(--color-cyan)]">{String(currentIndex + 1).padStart(2, '0')}</span> /{' '}
            {String(portals.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Interactive Browser Window Container                          */}
      {/* ------------------------------------------------------------- */}
      <div
        className="group relative overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-card)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Browser Top Navigation Chrome */}
        <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[#0e1216] px-4 py-3">
          {/* macOS traffic light dots */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]/80 transition-opacity hover:opacity-100" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/80 transition-opacity hover:opacity-100" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]/80 transition-opacity hover:opacity-100" />
          </div>

          {/* Dynamic URL address bar */}
          <div className="mx-4 flex max-w-md flex-1 items-center gap-2 truncate rounded-md bg-[#161b20] px-3.5 py-1.5 font-mono text-xs text-[var(--color-paper-dim)] border border-[var(--color-line)]/50">
            <Lock size={12} className="shrink-0 text-[var(--color-cyan)]" />
            <span className="truncate">{activePortal.url}</span>
          </div>

          {/* Quick Expand / Zoom action button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 rounded-sm border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1 text-xs text-[var(--color-paper-dim)] transition-colors duration-200 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
            title="Open in full-screen zoom preview"
          >
            <Maximize2 size={13} />
            <span className="hidden sm:inline">Zoom & Expand</span>
          </button>
        </div>

        {/* Main Screenshot Viewport with Smooth Animated Transitions */}
        <div
          className="relative aspect-[16/10] w-full cursor-zoom-in overflow-hidden bg-black/40"
          onClick={() => setIsModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsModalOpen(true)
            }
          }}
          aria-label={`Open high-resolution view of ${activePortal.name}`}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activePortal.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={activePortal.image}
                alt={activePortal.alt}
                className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                loading="eager"
              />
            </motion.div>
          </AnimatePresence>

          {/* Hover Zoom Overlay Badge */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center gap-2.5 rounded-full border border-[var(--color-cyan)]/60 bg-[#080b0e]/85 px-4 py-2 text-xs font-medium text-[var(--color-paper)] shadow-lg shadow-black/60">
              <ZoomIn size={15} className="text-[var(--color-cyan)] animate-pulse" />
              <span>Click to zoom and view interface detail</span>
            </div>
          </div>

          {/* Left / Right Carousel Arrow Buttons */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              paginate(-1)
            }}
            aria-label="Previous Portal Screenshot"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-line)] bg-[#0b0e11]/85 p-2.5 text-[var(--color-paper)] shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-[var(--color-cyan)] hover:bg-[#10141a] hover:text-[var(--color-cyan)] focus:outline-none"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              paginate(1)
            }}
            aria-label="Next Portal Screenshot"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-line)] bg-[#0b0e11]/85 p-2.5 text-[var(--color-paper)] shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-[var(--color-cyan)] hover:bg-[#10141a] hover:text-[var(--color-cyan)] focus:outline-none"
          >
            <ChevronRight size={20} />
          </button>

          {/* Bottom Info Bar Overlay */}
          <div className="pointer-events-none absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0b0e11]/95 via-[#0b0e11]/70 to-transparent p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-[var(--color-cyan)]/20 text-[var(--color-cyan)]">
                  <IconComponent size={14} />
                </span>
                <div>
                  <h4 className="font-[var(--font-display)] text-sm font-medium text-[var(--color-paper)] sm:text-base">
                    {activePortal.name}
                  </h4>
                  <p className="text-xs text-[var(--color-paper-dim)]">
                    {activePortal.role}
                  </p>
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="pointer-events-auto flex items-center gap-1.5">
                {portals.map((_, idx) => (
                  <button
                    key={`dot-${idx}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      goToSlide(idx)
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'w-6 bg-[var(--color-cyan)]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Portal Brief Description */}
        <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-3.5 text-xs text-[var(--color-paper-dim)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="leading-relaxed">
            <span className="font-semibold text-[var(--color-paper)]">{activePortal.tag}:</span>{' '}
            {activePortal.description}
          </p>
          <a
            href={`https://${activePortal.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-[var(--color-cyan)] hover:underline"
          >
            <span>Live server demo</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Full-Screen Lightbox & Zoom Modal                             */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#050708]/96 backdrop-blur-2xl text-[var(--color-paper)]"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsModalOpen(false)
                setZoomLevel(1)
                setPanOffset({ x: 0, y: 0 })
              }
            }}
          >
            {/* Modal Header Toolbar */}
            <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[#0b0e11]/90 px-4 py-3 sm:px-6">
              {/* Active Portal Title */}
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-cyan)]/20 text-[var(--color-cyan)]">
                  <IconComponent size={16} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-[var(--font-display)] text-sm font-medium text-[var(--color-paper)] sm:text-base">
                      {activePortal.name}
                    </h3>
                    <span className="rounded bg-[var(--color-cyan)]/15 px-2 py-0.5 font-mono text-[10px] text-[var(--color-cyan)]">
                      {String(currentIndex + 1).padStart(2, '0')} / {String(portals.length).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="hidden text-xs text-[var(--color-paper-dim)] sm:block font-mono">
                    {activePortal.url}
                  </p>
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={zoomOut}
                  disabled={zoomLevel <= 1}
                  className="rounded border border-[var(--color-line)] bg-[var(--color-surface)] p-2 text-[var(--color-paper-dim)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-paper)] disabled:opacity-40"
                  title="Zoom Out (-)"
                >
                  <ZoomOut size={15} />
                </button>

                <button
                  type="button"
                  onClick={toggleZoom}
                  className="rounded border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1.5 font-mono text-xs text-[var(--color-cyan)] transition-colors hover:border-[var(--color-cyan)]"
                  title="Toggle Zoom (100% / 175%)"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>

                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={zoomLevel >= 3}
                  className="rounded border border-[var(--color-line)] bg-[var(--color-surface)] p-2 text-[var(--color-paper-dim)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-paper)] disabled:opacity-40"
                  title="Zoom In (+)"
                >
                  <ZoomIn size={15} />
                </button>

                {zoomLevel > 1 && (
                  <button
                    type="button"
                    onClick={resetZoom}
                    className="rounded border border-[var(--color-line)] bg-[var(--color-surface)] p-2 text-[var(--color-paper-dim)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-paper)]"
                    title="Reset Zoom (0)"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}

                <div className="mx-1 h-5 w-[1px] bg-[var(--color-line)] sm:mx-2" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setZoomLevel(1)
                    setPanOffset({ x: 0, y: 0 })
                  }}
                  className="flex items-center gap-1.5 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-paper)] transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                  title="Close (Esc)"
                >
                  <X size={15} />
                  <span className="hidden sm:inline font-mono">ESC</span>
                </button>
              </div>
            </div>

            {/* Modal Main Zoomable Image Canvas */}
            <div
              className={`relative flex-1 overflow-hidden flex items-center justify-center p-2 sm:p-6 select-none ${
                zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={() => {
                if (!isDragging && zoomLevel === 1) {
                  toggleZoom()
                }
              }}
            >
              {/* Prev Slide Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  paginate(-1)
                }}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[var(--color-line)] bg-[#0b0e11]/80 p-3 text-[var(--color-paper)] shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
                aria-label="Previous Portal"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Slide Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  paginate(1)
                }}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[var(--color-line)] bg-[#0b0e11]/80 p-3 text-[var(--color-paper)] shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
                aria-label="Next Portal"
              >
                <ChevronRight size={24} />
              </button>

              {/* The Zoomed Image Container */}
              <motion.div
                className="max-h-full max-w-full transition-transform duration-200 ease-out"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${
                    panOffset.y / zoomLevel
                  }px)`,
                }}
              >
                <img
                  src={activePortal.image}
                  alt={activePortal.alt}
                  className="max-h-[75vh] w-auto max-w-[92vw] rounded-lg border border-[var(--color-line)] shadow-2xl object-contain"
                  draggable={false}
                />
              </motion.div>
            </div>

            {/* Modal Bottom Thumbnail Strip & Information */}
            <div className="border-t border-[var(--color-line)] bg-[#0b0e11]/90 px-4 py-3 sm:px-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Information hint */}
                <p className="text-xs text-[var(--color-paper-dim)]">
                  {zoomLevel > 1 ? (
                    <span className="text-[var(--color-cyan)]">
                      Drag to pan around the interface · Click or press 0 to reset
                    </span>
                  ) : (
                    <span>Click anywhere on image to zoom in · Use Arrow keys to navigate slides</span>
                  )}
                </p>

                {/* Thumbnails of 3 portals */}
                <div className="flex items-center gap-3">
                  {portals.map((portal, idx) => {
                    const isThumbActive = idx === currentIndex
                    return (
                      <button
                        key={`thumb-${portal.id}`}
                        type="button"
                        onClick={() => goToSlide(idx)}
                        className={`group relative overflow-hidden rounded-md border transition-all duration-200 ${
                          isThumbActive
                            ? 'border-[var(--color-cyan)] ring-2 ring-[var(--color-cyan)]/40 scale-105'
                            : 'border-[var(--color-line)] opacity-60 hover:opacity-100'
                        }`}
                        title={portal.name}
                      >
                        <img
                          src={portal.image}
                          alt={portal.name}
                          className="h-10 w-16 object-cover object-top sm:h-12 sm:w-20"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/80 px-1 py-0.5 text-[9px] text-center font-medium truncate text-[var(--color-paper)]">
                          {portal.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
