import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Camera,
  Users,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  CheckCircle2,
} from 'lucide-react'
import { medicalCoding } from '@/data/projects'
import { Reveal } from '@/components/Reveal'

interface GalleryItem {
  id: string
  type: 'diagram' | 'photo'
  title: string
  subtitle: string
  description?: string
  image: string
  alt: string
  tag: string
}

export function ProjectMedicalCoding() {
  const [activeDiagramIdx, setActiveDiagramIdx] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalItemIndex, setModalItemIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // All 5 items in a single unified gallery for the modal
  const allGalleryItems: GalleryItem[] = [
    {
      ...medicalCoding.diagrams[0],
      type: 'diagram',
      description: medicalCoding.diagrams[0].subtitle,
    },
    {
      ...medicalCoding.diagrams[1],
      type: 'diagram',
      description: medicalCoding.diagrams[1].subtitle,
    },
    {
      ...medicalCoding.documentation[0],
      type: 'photo',
    },
    {
      ...medicalCoding.documentation[1],
      type: 'photo',
    },
    {
      ...medicalCoding.documentation[2],
      type: 'photo',
    },
  ]

  const openModalWithItem = (index: number) => {
    setModalItemIndex(index)
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
    setIsModalOpen(true)
  }

  const modalPaginate = useCallback(
    (dir: number) => {
      setModalItemIndex((prev) => {
        let next = prev + dir
        if (next < 0) next = allGalleryItems.length - 1
        if (next >= allGalleryItems.length) next = 0
        return next
      })
      setZoomLevel(1)
      setPanOffset({ x: 0, y: 0 })
    },
    [allGalleryItems.length]
  )

  // Keyboard navigation for modal
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
        setZoomLevel((prev) => Math.min(prev + 0.5, 3.5))
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
    setZoomLevel((prev) => (prev > 1 ? 1 : 2))
    setPanOffset({ x: 0, y: 0 })
  }

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3.5))
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

  const modalActiveItem = allGalleryItems[modalItemIndex]
  const currentDiagram = medicalCoding.diagrams[activeDiagramIdx]

  return (
    <section id="project-medical-coding" className="border-t border-[var(--color-line)] py-24 md:py-32">
      <div className="container-edit">
        {/* Header Section */}
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <Reveal className="font-mono text-xs text-[var(--color-cyan)]">04 · Selected work</Reveal>
            <Reveal as="h2" delay={60} className="mt-4 font-[var(--font-display)] text-4xl font-medium tracking-tight text-[var(--color-paper)] md:text-5xl">
              {medicalCoding.title}
            </Reveal>
            <Reveal delay={120} className="mt-3 text-lg text-[var(--color-paper-dim)]">
              {medicalCoding.organization}
            </Reveal>
            <Reveal delay={160} className="mt-2 text-sm text-[var(--color-paper-dim)]">
              {medicalCoding.role} · {medicalCoding.date}
            </Reveal>
          </div>

          <Reveal delay={100} className="text-base leading-relaxed text-[var(--color-paper-dim)]">
            <p>{medicalCoding.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {medicalCoding.contributions.map((item) => (
                <span key={item} className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-paper)]">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Stakeholder Attendance Callout Banner */}
        <Reveal delay={120} className="mt-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-cyan)]/15 text-[var(--color-cyan)]">
                <Users size={20} />
              </span>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-cyan)]">
                  Executive Presentation & Validation
                </p>
                <h4 className="font-[var(--font-display)] text-sm font-medium text-[var(--color-paper)] sm:text-base">
                  Dihadiri oleh Jajaran Pimpinan & Kepala Unit RS PHC
                </h4>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {medicalCoding.stakeholders.map((sh) => (
                <span
                  key={sh}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-line)] bg-[var(--color-surface-raised)] px-3 py-1.5 text-xs text-[var(--color-paper)]"
                >
                  <CheckCircle2 size={13} className="text-[var(--color-cyan)]" />
                  <span>{sh}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ------------------------------------------------------------- */}
        {/* PART 1: Analisis Alur Medical Coding (Workflow Diagrams)      */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-16">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-cyan)]/20 text-[var(--color-cyan)]">
                <FileText size={15} />
              </span>
              <div>
                <h3 className="font-[var(--font-display)] text-lg font-medium text-[var(--color-paper)]">
                  Analisis Alur & Desain Solusi Medical Coding
                </h3>
                <p className="text-xs text-[var(--color-paper-dim)]">
                  Klik diagram untuk memperbesar resolusi penuh dan membaca detail alur proses
                </p>
              </div>
            </div>

            {/* Diagram Switcher Tabs */}
            <div className="inline-flex rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-1 self-start sm:self-auto">
              {medicalCoding.diagrams.map((d, idx) => {
                const isActive = idx === activeDiagramIdx
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setActiveDiagramIdx(idx)}
                    className={`flex items-center gap-2 rounded-md px-3.5 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? 'border border-[var(--color-cyan)]/40 bg-[var(--color-surface-raised)] text-[var(--color-paper)] shadow-sm'
                        : 'text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]'
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
                    <span>Diagram 0{idx + 1}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Workflow Diagram Viewer */}
          <Reveal className="group relative overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[#0e1216] px-4 py-2.5">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-paper-dim)]">
                <FileText size={13} className="text-[var(--color-cyan)]" />
                <span>{currentDiagram.title}</span>
              </div>
              <button
                type="button"
                onClick={() => openModalWithItem(activeDiagramIdx)}
                className="flex items-center gap-1.5 rounded-sm border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1 text-xs text-[var(--color-paper-dim)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
              >
                <Maximize2 size={12} />
                <span className="hidden sm:inline">Zoom Full Diagram</span>
              </button>
            </div>

            <div
              className="relative aspect-[16/9] w-full cursor-zoom-in overflow-hidden bg-black/50 p-2 sm:p-4"
              onClick={() => openModalWithItem(activeDiagramIdx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openModalWithItem(activeDiagramIdx)
                }
              }}
              aria-label={`Open full resolution view of ${currentDiagram.title}`}
            >
              <img
                src={currentDiagram.image}
                alt={currentDiagram.alt}
                className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.01]"
              />

              {/* Hover Badge */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 backdrop-blur-[1.5px] transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2 rounded-full border border-[var(--color-cyan)]/60 bg-[#080b0e]/90 px-4 py-2 text-xs font-medium text-[var(--color-paper)] shadow-xl shadow-black/80">
                  <ZoomIn size={14} className="text-[var(--color-cyan)] animate-pulse" />
                  <span>Klik untuk zoom detail diagram alur</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-3 text-xs text-[var(--color-paper-dim)]">
              <span className="font-semibold text-[var(--color-paper)]">{currentDiagram.tag}:</span>{' '}
              {currentDiagram.subtitle}
            </div>
          </Reveal>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PART 2: Dokumentasi Lapangan & Presentasi Akhir (3 Photos)     */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-20">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-cyan)]/20 text-[var(--color-cyan)]">
              <Camera size={15} />
            </span>
            <div>
              <h3 className="font-[var(--font-display)] text-lg font-medium text-[var(--color-paper)]">
                Dokumentasi Lapangan & Presentasi Akhir
              </h3>
              <p className="text-xs text-[var(--color-paper-dim)]">
                Aktivitas observasi alur di RS PHC dan dokumentasi presentasi evaluasi di hadapan pimpinan unit
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {medicalCoding.documentation.map((doc, idx) => {
              // Map index to the global index (diagrams take 0 and 1, documentation starts at 2)
              const globalIdx = 2 + idx
              return (
                <Reveal
                  key={doc.id}
                  delay={idx * 60}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-card)] transition-all duration-300 hover:border-[var(--color-cyan)]/40"
                >
                  {/* Photo Container */}
                  <div
                    className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-black/40"
                    onClick={() => openModalWithItem(globalIdx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        openModalWithItem(globalIdx)
                      }
                    }}
                    aria-label={`Open full size photo of ${doc.title}`}
                  >
                    <img
                      src={doc.image}
                      alt={doc.alt}
                      className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Tag badge */}
                    <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/75 px-3 py-1 text-[11px] font-medium text-[var(--color-paper)] backdrop-blur-md">
                      {doc.tag}
                    </span>

                    {/* Hover Zoom pill */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex items-center gap-1.5 rounded-full border border-[var(--color-cyan)]/60 bg-[#080b0e]/85 px-3 py-1.5 text-xs text-[var(--color-paper)] shadow-lg">
                        <ZoomIn size={13} className="text-[var(--color-cyan)]" />
                        <span>Zoom</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Caption */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h4 className="font-[var(--font-display)] text-sm font-medium text-[var(--color-paper)] group-hover:text-[var(--color-cyan)] transition-colors">
                        {doc.title}
                      </h4>
                      <p className="mt-1 text-xs text-[var(--color-cyan)] font-mono">{doc.subtitle}</p>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--color-paper-dim)]">
                        {doc.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => openModalWithItem(globalIdx)}
                      className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-cyan)]"
                    >
                      <Maximize2 size={12} />
                      <span>Lihat ukuran penuh</span>
                    </button>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* Workflow Methodology Steps */}
        <Reveal delay={80} className="mt-16 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 md:p-8">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-cyan)]">Methodology</p>
          <h4 className="mt-1 font-[var(--font-display)] text-base font-medium text-[var(--color-paper)]">
            Pendekatan Analisis Alur Kerja Administrasi Rumah Sakit
          </h4>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {medicalCoding.flow.map((step, index) => (
              <div key={step} className="rounded-md border border-[var(--color-line)] bg-[var(--color-surface-raised)] p-4 text-center">
                <span className="font-mono text-xs text-[var(--color-cyan)]">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-2 text-sm font-medium text-[var(--color-paper)]">{step}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Full-Screen Unified Lightbox & Zoom Modal (All 5 Items)       */}
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
                  {modalActiveItem.type === 'diagram' ? <FileText size={16} /> : <Camera size={16} />}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-[var(--font-display)] text-sm font-medium text-[var(--color-paper)] sm:text-base">
                      {modalActiveItem.title}
                    </h3>
                    <span className="rounded bg-[var(--color-cyan)]/15 px-2 py-0.5 font-mono text-[10px] text-[var(--color-cyan)]">
                      {String(modalItemIndex + 1).padStart(2, '0')} / {String(allGalleryItems.length).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="hidden text-xs text-[var(--color-paper-dim)] sm:block">
                    {modalActiveItem.subtitle}
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
                  title="Toggle Zoom (100% / 200%)"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>

                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={zoomLevel >= 3.5}
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
                aria-label="Previous Item"
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
                aria-label="Next Item"
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
                  src={modalActiveItem.image}
                  alt={modalActiveItem.alt}
                  className="max-h-[75vh] w-auto max-w-[92vw] rounded-lg border border-[var(--color-line)] shadow-2xl object-contain"
                  draggable={false}
                />
              </motion.div>
            </div>

            {/* Modal Bottom Strip with All 5 Thumbnails */}
            <div className="border-t border-[var(--color-line)] bg-[#0b0e11]/90 px-4 py-3 sm:px-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-[var(--color-paper-dim)]">
                  {zoomLevel > 1 ? (
                    <span className="text-[var(--color-cyan)]">
                      Drag to pan around diagram / photo · Click or press 0 to reset zoom
                    </span>
                  ) : (
                    <span>Click image to zoom in · Use Arrow keys to navigate between all 5 items</span>
                  )}
                </p>

                <div className="flex items-center gap-2">
                  {allGalleryItems.map((item, idx) => {
                    const isThumbActive = idx === modalItemIndex
                    return (
                      <button
                        key={`modal-thumb-${item.id}`}
                        type="button"
                        onClick={() => {
                          setModalItemIndex(idx)
                          setZoomLevel(1)
                          setPanOffset({ x: 0, y: 0 })
                        }}
                        className={`group relative overflow-hidden rounded-md border transition-all duration-200 ${
                          isThumbActive
                            ? 'border-[var(--color-cyan)] ring-2 ring-[var(--color-cyan)]/40 scale-105'
                            : 'border-[var(--color-line)] opacity-60 hover:opacity-100'
                        }`}
                        title={item.title}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-10 w-16 object-cover object-center sm:h-11 sm:w-18"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/80 px-1 py-0.5 text-[8px] text-center font-medium truncate text-[var(--color-paper)]">
                          {item.tag}
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
    </section>
  )
}
