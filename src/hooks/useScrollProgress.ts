import { useEffect, useRef, useState } from 'react'

/**
 * Returns 0-1 progress representing how far the viewport has scrolled
 * through the referenced element (0 = element start reaches viewport
 * bottom, 1 = element end reaches viewport top). Uses a single passive
 * scroll listener throttled with requestAnimationFrame.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let frame = 0

    const update = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + vh
      const covered = vh - rect.top
      const raw = covered / total
      setProgress(Math.min(1, Math.max(0, raw)))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return { ref, progress }
}
