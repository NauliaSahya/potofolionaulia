import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Monitor,
  Tablet,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Lock,
  X,
  Activity,
  CheckCircle2,
} from 'lucide-react'
import { hime } from '@/data/projects'

type ScreenCategory = 'web' | 'device'

interface FlatScreen {
  id: string
  category: ScreenCategory
  title: string
  caption: string
  image: string
  alt: string
  tag: string
  url?: string
}

export function HiMeShowcase() {
  const [activeCategory, setActiveCategory] = useState<ScreenCategory>('web')
  const [screenIndex, setScreenIndex] = useState(0) // 0 or 1 within active category
  const [direction, setDirection] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalScreenIndex, setModalScreenIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // Flatten all 4 screens for seamless modal navigation
  const allScreens: FlatScreen[] = [
    { ...hime.screens.web[0], category: 'web' },
    { ...hime.screens.web[1], category: 'web' },
    { ...hime.screens.device[0], category: 'device' },
    { ...hime.screens.device[1], category: 'device' },
  ]

  const currentCategoryScreens = hime.screens[activeCategory]
  const currentScreen = currentCategoryScreens[screenIndex]

  // Sync modal index with current screen when opening
  const openModal = () => {
    const globalIdx = activeCategory === 'web' ? screenIndex : screenIndex + 2
    setModalScreenIndex(globalIdx)
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
    setIsModalOpen(true)
  }

  const switchCategory = (category: ScreenCategory) => {
    if (category !== activeCategory) {
      setActiveCategory(category)
      setScreenIndex(0)
      setDirection(1)
    }
  }

  const nextSubScreen = () => {
    setDirection(1)
    setScreenIndex((prev) => (prev === 0 ? 1 : 0))
  }

  const prevSubScreen = () => {
    setDirection(-1)
    setScreenIndex((prev) => (prev === 0 ? 1 : 0))
  }

  const modalPaginate = useCallback((dir: number) => {
    setModalScreenIndex((prev) => {
      let next = prev + dir
      if (next < 0) next = allScreens.length - 1
      if (next >= allScreens.length) next = 0
      return next
    })
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
  }, [allScreens.length])

  // Keyboard navigation when modal is open
  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
        setZoomLevel(1)
        setPanOffset({ x: 0, y: 0 })
      } else if (e.key === 'ArrowRight') {
        modalPaginate(1)
      } else if (e.key === 'ArrowLeft') {
        modalPaginate(-1)
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((prev) => Math.min(prev + 0.5, 3))
      } else if (e.key === '-') {
        setZoomLevel((prev) => Math.max(prev - 0.5, 1))
      } else if (e.key === '0') {
        setZoomLevel(1)
        setPanOffset({ x: 0, y: 0 })
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen, modalPaginate])

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

  const modalActiveScreen = allScreens[modalScreenIndex]

  return (
    <div className="w-full">
      {/* ------------------------------------------------------------- */}
      {/* Header Selector: Category Tabs & Sub-screen Pills            */}
      {/* ------------------------------------------------------------- */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Switcher: Web Platform vs Device UI */}
        <div className="inline-flex rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-1">
          <button
            type="button"
            onClick={() => switchCategory('web')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-all duration-200 sm:text-sm ${
              activeCategory === 'web'
                ? 'border border-[var(--color-cyan)]/40 bg-[var(--color-surface-raised)] text-[var(--color-paper)] shadow-sm'
                : 'text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]'
            }`}
          >
            <Monitor size={15} className={activeCategory === 'web' ? 'text-[var(--color-cyan)]' : ''} />
            <span>Web Platform</span>
            <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-[var(--color-paper-dim)]">
              2 screens
            </span>
          </button>

          <button
            type="button"
            onClick={() => switchCategory('device')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-all duration-200 sm:text-sm ${
              activeCategory === 'device'
                ? 'border border-[var(--color-cyan)]/40 bg-[var(--color-surface-raised)] text-[var(--color-paper)] shadow-sm'
                : 'text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]'
            }`}
          >
            <Tablet size={15} className={activeCategory === 'device' ? 'text-[var(--color-cyan)]' : ''} />
            <span>UI Alat Skrining</span>
            <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-[var(--color-paper-dim)]">
              2 screens
            </span>
          </button>
        </div>

        {/* Sub-screen Pills for Current Category */}
        <div className="flex items-center gap-2">
          {currentCategoryScreens.map((scr, idx) => {
            const isSelected = idx === screenIndex
            return (
              <button
                key={scr.id}
                type="button"
                onClick={() => {
                  setDirection(idx > screenIndex ? 1 : -1)
                  setScreenIndex(idx)
                }}
                className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'border-[var(--color-cyan)] bg-[var(--color-surface-raised)] text-[var(--color-paper)]'
                    : 'border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-paper-dim)] hover:border-[var(--color-line)] hover:text-[var(--color-paper)]'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
                <span>{scr.tag}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Showcase Frame (Browser or Hardware Terminal)                 */}
      {/* ------------------------------------------------------------- */}
      <div className="group relative overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-card)]">
        {/* Frame Top Header */}
        {activeCategory === 'web' ? (
          /* Web Browser Frame Chrome */
          <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[#0e1216] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/80" />
            </div>

            <div className="mx-4 flex max-w-sm flex-1 items-center gap-2 truncate rounded-md border border-[var(--color-line)]/60 bg-[#161b20] px-3 py-1 font-mono text-[11px] text-[var(--color-paper-dim)]">
              <Lock size={11} className="shrink-0 text-[var(--color-cyan)]" />
              <span className="truncate">{'url' in currentScreen ? currentScreen.url : 'hime.health/dashboard'}</span>
            </div>

            <button
              type="button"
              onClick={openModal}
              className="flex items-center gap-1.5 rounded-sm border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1 text-xs text-[var(--color-paper-dim)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
              title="Zoom & Inspect details"
            >
              <Maximize2 size={12} />
              <span className="hidden sm:inline">Zoom</span>
            </button>
          </div>
        ) : (
          /* Medical Touchscreen Device Hardware Bezel Chrome */
          <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[#0a0e13] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-cyan)] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-cyan)]" />
              </span>
              <span className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--color-cyan)]">
                Hi-Me! Embedded Device
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--color-paper-dim)]">
              <Activity size={12} className="text-[var(--color-cyan)]" />
              <span>Sensors Online · Active Screen</span>
            </div>

            <button
              type="button"
              onClick={openModal}
              className="flex items-center gap-1.5 rounded-sm border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1 text-xs text-[var(--color-paper-dim)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
              title="Zoom & Inspect details"
            >
              <Maximize2 size={12} />
              <span className="hidden sm:inline">Zoom</span>
            </button>
          </div>
        )}

        {/* Image Display Canvas */}
        <div
          className="relative aspect-[16/9.5] w-full cursor-zoom-in overflow-hidden bg-black/40"
          onClick={openModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              openModal()
            }
          }}
          aria-label={`Open high-resolution view of ${currentScreen.title}`}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentScreen.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction < 0 ? 40 : -40 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={currentScreen.image}
                alt={currentScreen.alt}
                className="h-full w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                loading="eager"
              />
            </motion.div>
          </AnimatePresence>

          {/* Hover Zoom Overlay Badge */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center gap-2 rounded-full border border-[var(--color-cyan)]/60 bg-[#080b0e]/85 px-4 py-2 text-xs font-medium text-[var(--color-paper)] shadow-lg shadow-black/60">
              <ZoomIn size={14} className="text-[var(--color-cyan)] animate-pulse" />
              <span>Click to zoom & inspect UI details</span>
            </div>
          </div>

          {/* Prev / Next Slide Arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prevSubScreen()
            }}
            aria-label="Previous Screen"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-line)] bg-[#0b0e11]/85 p-2 text-[var(--color-paper)] shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              nextSubScreen()
            }}
            aria-label="Next Screen"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-line)] bg-[#0b0e11]/85 p-2 text-[var(--color-paper)] shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Footer Info Strip */}
        <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-3 text-xs text-[var(--color-paper-dim)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <span className="font-semibold text-[var(--color-paper)]">{currentScreen.title}:</span>{' '}
            {currentScreen.caption}
          </div>
          <div className="flex items-center gap-1.5 shrink-0 text-xs font-mono text-[var(--color-paper-dim)]">
            <CheckCircle2 size={12} className="text-[var(--color-cyan)]" />
            <span>Screen {screenIndex + 1} of 2</span>
          </div>
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
            {/* Modal Top Toolbar */}
            <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[#0b0e11]/90 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-cyan)]/20 text-[var(--color-cyan)]">
                  {modalActiveScreen.category === 'web' ? <Monitor size={16} /> : <Tablet size={16} />}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-[var(--font-display)] text-sm font-medium text-[var(--color-paper)] sm:text-base">
                      {modalActiveScreen.title}
                    </h3>
                    <span className="rounded bg-[var(--color-cyan)]/15 px-2 py-0.5 font-mono text-[10px] text-[var(--color-cyan)]">
                      {String(modalScreenIndex + 1).padStart(2, '0')} / {String(allScreens.length).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="hidden text-xs text-[var(--color-paper-dim)] sm:block">
                    {modalActiveScreen.caption}
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

            {/* Modal Canvas */}
            <div
              className={`relative flex-1 overflow-hidden flex items-center justify-center p-3 sm:p-6 select-none ${
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
              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  modalPaginate(-1)
                }}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[var(--color-line)] bg-[#0b0e11]/80 p-3 text-[var(--color-paper)] shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
                aria-label="Previous Screen"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  modalPaginate(1)
                }}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[var(--color-line)] bg-[#0b0e11]/80 p-3 text-[var(--color-paper)] shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
                aria-label="Next Screen"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image Container with Zoom & Pan */}
              <motion.div
                className="max-h-full max-w-full transition-transform duration-200 ease-out"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${
                    panOffset.y / zoomLevel
                  }px)`,
                }}
              >
                <img
                  src={modalActiveScreen.image}
                  alt={modalActiveScreen.alt}
                  className="max-h-[75vh] w-auto max-w-[92vw] rounded-lg border border-[var(--color-line)] shadow-2xl object-contain"
                  draggable={false}
                />
              </motion.div>
            </div>

            {/* Modal Bottom Strip with All 4 Thumbnails */}
            <div className="border-t border-[var(--color-line)] bg-[#0b0e11]/90 px-4 py-3 sm:px-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-[var(--color-paper-dim)]">
                  {zoomLevel > 1 ? (
                    <span className="text-[var(--color-cyan)]">
                      Drag to pan around the interface · Click or press 0 to reset
                    </span>
                  ) : (
                    <span>Click image to zoom in · Use Arrow keys to navigate between all 4 screens</span>
                  )}
                </p>

                <div className="flex items-center gap-2">
                  {allScreens.map((scr, idx) => {
                    const isThumbActive = idx === modalScreenIndex
                    return (
                      <button
                        key={`modal-thumb-${scr.id}`}
                        type="button"
                        onClick={() => {
                          setModalScreenIndex(idx)
                          setZoomLevel(1)
                          setPanOffset({ x: 0, y: 0 })
                        }}
                        className={`group relative overflow-hidden rounded-md border transition-all duration-200 ${
                          isThumbActive
                            ? 'border-[var(--color-cyan)] ring-2 ring-[var(--color-cyan)]/40 scale-105'
                            : 'border-[var(--color-line)] opacity-60 hover:opacity-100'
                        }`}
                        title={scr.title}
                      >
                        <img
                          src={scr.image}
                          alt={scr.title}
                          className="h-10 w-16 object-cover object-center sm:h-11 sm:w-18"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/80 px-1 py-0.5 text-[8px] text-center font-medium truncate text-[var(--color-paper)]">
                          {scr.tag}
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
    </div>
  )
}
