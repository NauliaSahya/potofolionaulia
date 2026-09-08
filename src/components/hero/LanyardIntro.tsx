import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { hero } from '@/data/content'
import { assets } from '@/data/assets'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const THRESHOLD = 160
const RUBBER_LIMIT = 230

type LanyardIntroProps = {
  onUnlock: () => void
}

export function LanyardIntro({ onUnlock }: LanyardIntroProps) {
  const [dragging, setDragging] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, sheenX: 50, sheenY: 50 })
  const [unlocking, setUnlocking] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const startRef = useRef({ x: 0, y: 0 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const triggerUnlock = useMemo(
    () => () => {
      if (unlocking) return
      setUnlocking(true)
      setPos({ x: 0, y: 380 })
      document.body.style.overflow = ''
      window.setTimeout(() => {
        setDismissed(true)
        onUnlock()
      }, 550)
    },
    [onUnlock, unlocking],
  )

  if (dismissed) return null

  const progress = Math.min(pos.y / THRESHOLD, 1)

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (unlocking) return
    setDragging(true)
    startRef.current = { x: event.clientX - pos.x, y: event.clientY - pos.y }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    // 3D Card tilt calculation
    if (cardRef.current && !reducedMotion) {
      const rect = cardRef.current.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      setTilt({
        rx: (0.5 - py) * 16,
        ry: (px - 0.5) * 16,
        sheenX: px * 100,
        sheenY: py * 100,
      })
    }

    if (!dragging || unlocking) return
    const rawY = event.clientY - startRef.current.y
    const rawX = event.clientX - startRef.current.x
    const y = rawY <= 0 ? 0 : rawY <= RUBBER_LIMIT ? rawY : RUBBER_LIMIT + (rawY - RUBBER_LIMIT) * 0.15
    const x = Math.max(-32, Math.min(32, rawX * 0.35))
    setPos({ x, y })
  }

  const handlePointerUp = () => {
    if (unlocking) return
    setDragging(false)
    if (pos.y >= THRESHOLD) {
      triggerUnlock()
    } else {
      setPos({ x: 0, y: 0 })
      setTilt({ rx: 0, ry: 0, sheenX: 50, sheenY: 50 })
    }
  }

  const sag = 36 + pos.y * 0.5
  const strapPath = `M 88 0 Q ${88 + pos.x * 0.5} ${sag} ${88 + pos.x} ${96 + pos.y}`

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: `rgba(5, 7, 8, ${unlocking ? 0 : Math.max(0.7, 0.98 - progress * 0.3)})`,
        backdropFilter: unlocking ? 'blur(0px)' : 'blur(16px)',
        transition: unlocking ? 'background-color 500ms ease-out, backdrop-filter 500ms ease-out' : 'background-color 300ms ease-out',
      }}
      role="dialog"
      aria-label="Portfolio credential pass"
    >
      <div
        className="relative flex flex-col items-center"
        style={{
          opacity: unlocking ? 0 : 1,
          transform: unlocking ? 'translateY(40px) scale(0.96)' : 'translateY(0) scale(1)',
          transition: 'opacity 500ms ease-out, transform 500ms ease-out',
          perspective: '1200px',
        }}
      >
        {/* Lanyard Cord */}
        <svg width="176" height="140" className="pointer-events-none" aria-hidden="true">
          <path d={strapPath} stroke="#1e252c" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d={strapPath} stroke="#323b44" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>

        {/* 3D Holographic Pass Card */}
        <div
          ref={cardRef}
          role="button"
          tabIndex={0}
          aria-label="Drag down to enter portfolio, or click"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClick={() => {
            if (!dragging && pos.y < 20) {
              triggerUnlock()
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              triggerUnlock()
            }
          }}
          className="-mt-2 relative flex w-[260px] cursor-grab select-none touch-none flex-col items-center gap-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface-raised)] px-6 py-7 shadow-[var(--shadow-card)] active:cursor-grabbing overflow-hidden"
          style={{
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) rotateZ(${pos.x * 0.1}deg)`,
            transformStyle: 'preserve-3d',
            transition: dragging ? 'none' : 'transform 450ms cubic-bezier(0.2, 0.9, 0.3, 1.2)',
          }}
        >
          {/* Specular Light Reflection / Holographic Sheen */}
          <div
            className="pointer-events-none absolute inset-0 rounded-lg opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.sheenX}% ${tilt.sheenY}%, rgba(79, 214, 224, 0.25) 0%, rgba(255, 255, 255, 0.08) 25%, transparent 60%)`,
            }}
            aria-hidden="true"
          />

          {/* Badge Clip Slot */}
          <div className="flex flex-col items-center gap-1.5" aria-hidden="true">
            <span className="h-1.5 w-10 rounded-full bg-[#1e252c]" />
            <span className="h-1 w-1 rounded-full bg-[var(--color-cyan)]" />
          </div>

          {/* ID Badge Photo (2:3 Aspect Ratio) */}
          <div className="relative w-24 aspect-[2/3] overflow-hidden rounded-md border border-[var(--color-line)] bg-[#0c1014] shadow-inner">
            <img
              src={assets.lanyardProfile}
              alt="Portrait of Naulia Sahya"
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Identity Information */}
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="font-[var(--font-display)] text-base font-medium tracking-tight text-[var(--color-paper)]">
              {hero.badgeName}
            </span>
            <span className="text-xs text-[var(--color-paper-dim)]">{hero.badgeRole}</span>
            <span className="mt-1 font-mono text-[11px] text-[var(--color-cyan)]">
              {hero.badgeMeta}
            </span>
          </div>

          {/* Action indicator pill */}
          <div className="mt-1 flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-3.5 py-1 text-[10px] font-mono uppercase tracking-widest text-[var(--color-paper-dim)]">
            <ArrowDown size={11} className="text-[var(--color-cyan)] animate-bounce" />
            Pull or click to enter
          </div>
        </div>

        {/* Enter link fallback */}
        <button
          type="button"
          onClick={triggerUnlock}
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-[var(--color-paper-dim)] underline decoration-[var(--color-line)] underline-offset-4 transition-colors duration-200 hover:text-[var(--color-cyan)]"
        >
          {hero.enterLabel}
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  )
}
