import { useEffect, useRef, useState } from 'react'

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5)

/**
 * Animates a number from 0 to `target` over `duration` ms, starting when
 * `trigger` becomes true. Runs once. Respects reduced motion by snapping
 * straight to the target.
 */
export function useCountUp(target: number, trigger: boolean, duration = 1400, reducedMotion = false) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!trigger || started.current) return
    started.current = true

    if (reducedMotion) {
      setValue(target)
      return
    }

    let frame: number
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setValue(target * easeOutQuint(progress))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [trigger, target, duration, reducedMotion])

  return value
}
