import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * A fluid, ambient lighting canvas that smoothly trails the pointer with organic lerp inertia.
 * Provides a subtle atmospheric illumination without harsh edges or tacky artifacts.
 */
export function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const spotlight = spotlightRef.current
    if (!spotlight) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let currentX = mouseX
    let currentY = mouseY
    let isHoveringInteractive = false
    let targetScale = 1
    let currentScale = 1
    let animId: number

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      mouseX = e.clientX
      mouseY = e.clientY

      // Detect if hovering over clickable/interactive elements to gently expand glow
      const target = e.target as HTMLElement | null
      const isInteractive = Boolean(
        target?.closest('a, button, [role="button"], input, textarea, select, .interactive-card')
      )
      isHoveringInteractive = isInteractive
      targetScale = isHoveringInteractive ? 1.35 : 1
    }

    const updateLoop = () => {
      // Smooth linear interpolation (lerp) for liquid fluidity
      const ease = 0.09
      currentX += (mouseX - currentX) * ease
      currentY += (mouseY - currentY) * ease
      currentScale += (targetScale - currentScale) * ease

      spotlight.style.setProperty('--spot-x', `${currentX.toFixed(2)}px`)
      spotlight.style.setProperty('--spot-y', `${currentY.toFixed(2)}px`)
      spotlight.style.setProperty('--spot-scale', `${currentScale.toFixed(3)}`)

      animId = requestAnimationFrame(updateLoop)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    animId = requestAnimationFrame(updateLoop)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      cancelAnimationFrame(animId)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 hidden md:block overflow-hidden"
      style={
        {
          '--spot-x': '50vw',
          '--spot-y': '50vh',
          '--spot-scale': '1',
          background: `
            radial-gradient(
              calc(380px * var(--spot-scale)) circle at var(--spot-x) var(--spot-y),
              rgba(79, 214, 224, 0.065) 0%,
              rgba(79, 214, 224, 0.02) 40%,
              transparent 75%
            )
          `,
          transition: 'opacity 500ms ease-out',
        } as React.CSSProperties
      }
    />
  )
}
